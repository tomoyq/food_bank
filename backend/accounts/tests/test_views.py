from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='test', password='test')

    #statusが200の時はcookieにaccessキー
    def test_login(self):
        res = self.client.post(reverse('token_obtain_pair'), data={'username': 'test', 'password': 'test'})
        
        self.assertEqual(res.status_code, 200)
        self.assertTrue('access' in res.cookies.keys())
        self.assertTrue('refresh' in res.cookies.keys())
        