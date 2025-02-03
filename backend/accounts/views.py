from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CustomTokenObtainPairSerializer

class LoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        serializer = CustomTokenObtainPairSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        #アクセスキーとリフレッシュキーをcookieに保存
        #cookieの有効期限はtokenの期限と同じ
        access = serializer.validated_data['access']
        refresh = serializer.validated_data['refresh']

        responce = Response(status=status.HTTP_200_OK)
        responce.set_cookie(key='access',
                            value=access,
                            max_age=5 * 60,
                            httponly=True
                            )
        responce.set_cookie(key='refresh',
                            value=refresh,
                            max_age=60 * 60 * 24,
                            httponly=True
                            )

        return responce