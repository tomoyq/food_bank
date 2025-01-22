from django.db import IntegrityError
from django.test import TestCase

from ..models import User

class UserModelTests(TestCase):
    def setUp(self):
        User.objects.create_user(username='test', password='test')
    
    #名前が被るためエラーになるはず
    def test_unique_name(self):
        with self.assertRaises(IntegrityError):
            User.objects.create_user(username='test', password='test')

    #ユーザーを作成したときには共有状態は未共有になっているはず
    def test_default_share_status(self):
        user = User.objects.get(username='test')
        self.assertEqual(user.get_share_status_display(), '未共有')