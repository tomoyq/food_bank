from django.contrib.auth import logout
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from .serializers import CustomTokenObtainPairSerializer
from api.settings import SIMPLE_JWT
from api.authentication import CustomJWTAuthentication
from rest_framework.permissions import IsAuthenticated

access_time = SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']
refresh_time = SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']

#tokenの有効確認
class CustomTokenRefreshView(generics.GenericAPIView):
    #cookieから検証するtokenを取得
    def post(self, request, *args, **kwargs) -> Response:
        #access tokenがある場合は200を返す
        try: 
            request.COOKIES['access']
        except KeyError as e:
            return self.silent_refresh(request=request)
        
        return Response(status=status.HTTP_200_OK)
        
    #cookieにrefresh tokenがある時はaccess tokenを再生成
    def silent_refresh(self, request, *args, **kwargs):
        #refresh tokenがあるか確認、なければエラーを返す
        try: 
            refresh = request.COOKIES['refresh']
        except KeyError as e:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        try:
            serializer = TokenRefreshSerializer(data={"refresh": f"{refresh}"})
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        
        
        response = Response(status=status.HTTP_200_OK)

        access = serializer.validated_data['access']
        #新しいトークンをcookieに保存
        response.set_cookie(key='access',
                            value=access,
                            max_age=access_time.total_seconds(),
                            httponly=True,
                            path='/',
                            secure=True,
                            samesite='none'
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
                            max_age=access_time.total_seconds(),
                            httponly=True,
                            path='/',
                            secure=True,
                            samesite='none'
                            )
        response.set_cookie(key='refresh',
                            value=refresh,
                            max_age=refresh_time.total_seconds(),
                            httponly=True,
                            path='/',
                            secure=True,
                            samesite='none'
                            )

        return response
    
class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomJWTAuthentication]

    def post(self, request, *args, **kwargs):
        logout(request)
        response = Response(status=status.HTTP_200_OK)

        #クッキーからtokenを削除
        response.delete_cookie('access', samesite='none')
        response.delete_cookie('refresh', samesite='none')
        return response