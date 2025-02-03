from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    #アカウントが見つからなかった時のエラーメッセージ
    default_error_messages = {
        "no_active_account" : "ログインに失敗しました。入力されたログイン情報が間違っています。"
    }