from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import CustomTokenObtainPairSerializer

#tokenの有効確認
class CustomTokenRefreshView(TokenRefreshView):
    #cookieから検証するtokenを取得
    def post(self, request, *args, **kwargs) -> Response:
        #refresh tokenがあるか確認、なければエラーを返す
        try:
            refresh = request.COOKIES['refresh']
        except KeyError as e:
            return Response(status.HTTP_404_NOT_FOUND)
        
        request.POST['token'] = refresh
        response = super().post(request=request)

        access = response.data['access']
        refresh = response.data['refresh']
        #新しいトークンをcookieに保存
        response.set_cookie(key='access',
                            value=access,
                            max_age=5 * 60,
                            httponly=True
                            )
        response.set_cookie(key='refresh',
                            value=refresh,
                            max_age=60 * 60 * 24,
                            httponly=True
                            )
        
        return response


class LoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        serializer = CustomTokenObtainPairSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        response = Response(status=status.HTTP_200_OK)

        #アクセスキーとリフレッシュキーをcookieに保存
        #cookieの有効期限はtokenの期限と同じ
        access = serializer.validated_data['access']
        refresh = serializer.validated_data['refresh']

        response.set_cookie(key='access',
                            value=access,
                            max_age=5 * 60,
                            httponly=True
                            )
        response.set_cookie(key='refresh',
                            value=refresh,
                            max_age=60 * 60 * 24,
                            httponly=True
                            )

        return response