import datetime

from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model

from ..models import Fridges

User = get_user_model()

class FridgeContentListViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='test')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    #中身がリスト形式で取得できている
    def test_login(self):
        Fridges.objects.create(owner=self.user,
                                name='肉',
                                expiry_date=datetime.date.today() + datetime.timedelta(days=2),
                                quantity=1)
        Fridges.objects.create(owner=self.user,
                                name='卵',
                                expiry_date=datetime.date.today() + datetime.timedelta(days=1),
                                quantity=1)

        res = self.client.get(reverse('fridge_contents'))
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 2)
        #期限の短い順に出力されている
        self.assertEqual(res.data[0]["name"], '卵')

        