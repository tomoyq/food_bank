from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from .serializers import FridgeContentsSerializer
from .models import Fridges

User = get_user_model()

#リクエストデータのjsonをserializerのfieldにマッチしたオブジェクトを作成
def request_data_to_serializer_field(request):
    return {
                'owner': request.user.pk,
                'name': request.data['name'],
                'expiry_date': request.data['expiryDate'],
                'quantity': request.data['quantity'],
            }

class FridgeContentListView(ListCreateAPIView):
    serializer_class = FridgeContentsSerializer

    #リクエストしたユーザーが保存している食材を期限の短い順で返す
    def get_queryset(self):
        user = self.request.user
        return Fridges.objects.filter(owner=user).order_by('expiry_date')
    
    #送信されたjsonデータを整形してserializerに渡す
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request_data_to_serializer_field(request))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        #レスポンスに追加した後のすべての在庫を渡す
        res = self.list(request, *args, **kwargs)
        res.status_code = status.HTTP_201_CREATED
        res.headers = self.get_success_headers(serializer.data)

        return res