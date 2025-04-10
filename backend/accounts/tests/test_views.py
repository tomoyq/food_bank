from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='test', email=None, password='test')

    #statusが200の時はcookieにaccessキー
    def test_login(self):
        res = self.client.post(reverse('token_obtain_pair'), data={'username': 'test', 'password': 'test', 'isRemenber': False})
        
        self.assertEqual(res.status_code, 200)
        self.assertTrue('access' in res.cookies.keys())
        self.assertTrue('refresh' in res.cookies.keys())

class SignUpViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='test', email=None, password='test')

    #statusが200の時はユーザーが追加されてcookieにaccessキー
    def test_signup(self):
        #test2というユーザー名で登録されているユーザーはいない
        with self.assertRaises(User.DoesNotExist):
            User.objects.get(username='test2')

        res = self.client.post(reverse('signup'), data={'username': 'test2',
                                                        'email': 'test@test.com',
                                                        'password': 'test',
                                                        'password2': 'test',
                                                        'isRemenber': False})
        
        self.assertEqual(res.status_code, 200)
        #test2というユーザー名で登録されているユーザーが取得できるようになっている
        self.assertTrue(User.objects.get(username='test2'))

        self.assertTrue('access' in res.cookies.keys())
        self.assertTrue('refresh' in res.cookies.keys())
        