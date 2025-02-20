import datetime

from django.contrib.auth import get_user_model
from django.test import TestCase

from ..serializers import FridgeContentsSerializer
from ..models import Fridges

User = get_user_model()

class FridgeContentsSerializerTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='test', password='test')
        self.model_instance = Fridges.objects.create(owner=self.user,
                                                     name='肉',
                                                     expiry_date=datetime.date.today() + datetime.timedelta(days=1),
                                                     quantity=1)
        self.data = {
            'owner': self.user.pk,
            'name': '卵',
            'expiry_date': datetime.date.today() + datetime.timedelta(days=1),
            'quantity': '1'
        }
    
    #期限を過去の日付で作成するとエラーが出る
    def test_validate_expiry_date_error(self):
        error_data = {
            'owner': self.user.pk,
            'name': '卵',
            'expiry_date': datetime.date.today() - datetime.timedelta(days=1),
            'quantity': '1'
        }

        serializer = FridgeContentsSerializer(data=error_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('expiry_date', serializer.errors)

    #有効なデータのバリデーション
    def test_serializer_with_validate(self):
        serializer = FridgeContentsSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())

    #デシリアライズとインスタンスの作成
    def test_deserialization_creates_proper_instance(self):
        serializer = FridgeContentsSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())
        instance = serializer.save()
        self.assertEqual(instance.name, '卵')
        self.assertEqual(instance.owner, self.user)

    #シリアライズプロセスの検証
    def test_serializer_outputs_expected_data(self):
        serializer = FridgeContentsSerializer(self.model_instance)
        self.assertEqual(serializer.data['name'], '肉')
        self.assertEqual(serializer.data['owner_name'], self.user.username)