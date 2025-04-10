from typing import Any

from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    #アカウントが見つからなかった時のエラーメッセージ
    default_error_messages = {
        "no_active_account" : "ログインに失敗しました。入力されたログイン情報が間違っています。"
    }

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

        #TokenObtainPairSerializerのインスタンスを作成してクラスメソッドを利用してjwt tokenを発行できるようにする
        self.token_serializer = TokenObtainPairSerializer()

    def create(self, validated_data):
        return User.objects.create_user(
                    email=validated_data['email'],
                    username=validated_data['username'],
                    password=validated_data['password']
                )
   
    def save(self, **kwargs):
        self.instance = super().save(**kwargs)

        attrs = {
            'username': self.validated_data['username'],
            'password': self.validated_data['password']
        }

        self.get_token(attrs=attrs)

        return self.instance
    
    def get_token(self, attrs: dict[str, Any]):
        #ログイン情報を渡してjwt tokenを取得する
        data = self.token_serializer.validate(attrs)

        #tokenをシリアライザーのvalidated_dataに入れる
        self.validated_data['access'] = data['access']
        self.validated_data['refresh'] = data['refresh']