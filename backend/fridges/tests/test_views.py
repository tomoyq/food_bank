import datetime

from django.urls import reverse
from rest_framework.test import APITestCase, APIClient, APIRequestFactory, force_authenticate
from django.contrib.auth import get_user_model

from ..models import Fridges
from ..views import request_data_to_serializer_field

User = get_user_model()

class FridgeContentListViewTests(APITestCase):
    def setUp(self):
        User.objects.all().delete()
        Fridges.objects.all().delete()
        self.user = User.objects._create_user(username='test', password='test')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        #test_requetの作成
        self.factory = APIRequestFactory()

    #中身がリスト形式で取得できている
    def test_get(self):
        Fridges.objects.create( id=1,
                                owner=self.user,
                                name='肉',
                                expiry_date=datetime.date.today() + datetime.timedelta(days=2),
                                quantity=1)
        Fridges.objects.create( id=2,
                                owner=self.user,
                                name='卵',
                                expiry_date=datetime.date.today() + datetime.timedelta(days=1),
                                quantity=1)

        res = self.client.get(reverse('fridge_contents'))
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 2)
        #期限の短い順に出力されている
        self.assertEqual(res.data[0]["name"], '卵')

    #リクエストデータのjsonをserializerのfieldにマッチしたオブジェクトを作成
    def test_request_user_pk(self):
        #self.userがログインしているリクエストオブジェクトを取得
        request = self.factory.get(reverse('fridge_contents'))
        force_authenticate(request, user=self.user)
        request.user = self.user

        #リクエストデータのjsonを作成
        request.data = {
                            'category': "肉類",
                            'expiryDate': "2025-03-19",
                            'name': "卵",
                            'quantity': 1
                        }
        
        data = request_data_to_serializer_field(request)

        #dataのフォーマットが一致するはず
        self.assertEqual(data, {
                                    'owner': self.user.pk,
                                    'name': "卵",
                                    'expiry_date': "2025-03-19",
                                    'quantity': 1,
                                }
                        )
        
    #リクエストデータの期限が今日の日付よりも前のため、エラーになるはず
    def test_error_post(self):
        error_data = {
                        'category': "肉類",
                        'expiryDate': datetime.date.today() - datetime.timedelta(days=1),
                        'name': "卵",
                        'quantity': 1
                    }

        res = self.client.post(reverse('fridge_contents'), data=error_data)

        self.assertEqual(res.status_code, 400)
        #expiry_date fieldでバリデーションエラーが発生するためcontentの中にexpiry_dateをキーとして持っているはず
        self.assertIn('expiry_date', res.content.decode())

    #リクエストデータに問題がなければデータベースに保存されるはず
    def test_success_post(self):
        Fridges.objects.create(owner=self.user,
                                name='肉',
                                expiry_date=datetime.date.today() + datetime.timedelta(days=2),
                                quantity=1)

        success_data = {
                        'category': "肉類",
                        'expiryDate': datetime.date.today() + datetime.timedelta(days=1),
                        'name': "卵",
                        'quantity': 1
                    }

        res = self.client.post(reverse('fridge_contents'), data=success_data)

        self.assertEqual(res.status_code, 201)
        #データベースに保存された後の在庫数は2個のため、レスポンスのデータの個数も2になるはず
        self.assertEqual(len(res.data), 2)

class UpdateDestroyFridgeContentViewTests(APITestCase):
    def setUp(self):
        User.objects.all().delete()
        Fridges.objects.all().delete()
        self.user = User.objects._create_user(username='test', password='test')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        #test_requetの作成
        self.factory = APIRequestFactory()
        #テストデータ作成
        Fridges.objects.create( id=1,
                                owner=self.user,
                                name='肉',
                                expiry_date=datetime.date.today() + datetime.timedelta(days=5),
                                quantity=1)
        Fridges.objects.create( id=2,
                                owner=self.user,
                                name='魚',
                                expiry_date=datetime.date.today() + datetime.timedelta(days=2),
                                quantity=1)

    #初期の在庫数は2つだけ
    def test_initial_content_length(self):
        res = self.client.get(reverse('fridge_contents'))
        
        self.assertEqual(len(res.data), 2)
        #期限の短い順に出力されている
        self.assertEqual(res.data[0]["name"], '魚')

    #リクエストデータに問題がなければ更新されるはず
    def test_success_post(self):
        #更新データを送信する前はpkが1のデータの個数は１になっている
        self.assertEqual(Fridges.objects.get(pk=1).quantity, 1)

        data = {
                    'category': "肉類",
                    'expiryDate': datetime.date.today() + datetime.timedelta(days=5),
                    'name': "肉",
                    'quantity': 5
                }

        res = self.client.put(reverse('update_or_delete_fridge_contents', args=[1],), data=data)

        self.assertEqual(res.status_code, 200)
        #更新が成功した場合、個数は5になっているはず
        self.assertEqual(res.data['quantity'], 5)
        self.assertEqual(Fridges.objects.get(pk=1).quantity, 5)
