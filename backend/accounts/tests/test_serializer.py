from django.contrib.auth import get_user_model
from django.test import TestCase

from ..serializers import CreateUserSerializer

User = get_user_model()

class CreateUserSerializerTests(TestCase):
    def setUp(self):
        User.objects.all().delete()
        self.user = User.objects.create_user(username='owner', email=None, password='password')

        self.data = {
            'email': 'test@test.com',
            'username': 'test',
            'password': 'testtest',
            'password2': 'testtest'
        }
    
    #usernameが被るとエラーが発生する
    def test_validate_username(self):
        error_data = {
            'email': 'test@test.com',
            'username': 'owner',
            'password': 'testtest',
            'password2': 'testtest'
        }

        serializer = CreateUserSerializer(data=error_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('username', serializer.errors)

    #有効なデータのバリデーション
    def test_serializer_with_validate(self):
        serializer = CreateUserSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())

    #デシリアライズとインスタンスの作成
    def test_deserialization_creates_proper_instance(self):
        serializer = CreateUserSerializer(data=self.data)
        serializer.is_valid()
        serializer.save()

        self.assertEqual(len(User.objects.all()), 2)
        self.assertTrue(User.objects.get(username='test'))
        #passwordはハッシュ化されて保存されているはずなのでdataのpasswordではない物が保存されている
        self.assertNotEqual(User.objects.get(username='test').password, serializer.validated_data['password'])

    #saveするとvalidated_dataにjwt tokenが入っているはず
    def test_token_in_validated_data(self):
        serializer = CreateUserSerializer(data=self.data)
        serializer.is_valid()
        serializer.save()

        self.assertIn('access', serializer.validated_data)
        self.assertIn('refresh', serializer.validated_data)