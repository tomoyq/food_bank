from rest_framework import HTTP_HEADER_ENCODING
from rest_framework_simplejwt.authentication import JWTAuthentication

class CustomJWTAuthentication(JWTAuthentication):
    #リクエストヘッダーにクッキーから取得したaccess tokenを付与
    def get_header(self, request):
        #クッキーにaccess tokenがなければnoneを返す
        try:
            access = request.COOKIES['access']
        except KeyError :
            return None
        
        header = f"Bearer {access}"

        return header.encode(HTTP_HEADER_ENCODING)