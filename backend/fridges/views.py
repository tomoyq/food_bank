from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from .models import Fridges
from .utils import custom_exception_handler
from .serializers import FridgeContentsSerializer

User = get_user_model()

#リクエストデータのjsonをserializerのfieldにマッチしたオブジェクトを作成
def request_data_to_serializer_field(request):
    return {
                'owner': request.user.pk,
                'name': request.data['name'],
                'expiry_date': request.data['expiryDate'],
                'quantity': request.data['quantity'],
            }

#リクエストしたユーザーが保存している食材を期限の短い順で返す
def get_queryset_custom(self):
    user = self.request.user
    return Fridges.objects.filter(owner=user).order_by('expiry_date')

class FridgeContentListView(ListCreateAPIView):
    serializer_class = FridgeContentsSerializer

    def get_queryset(self):
        return get_queryset_custom(self)
    
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
    
class UpdateDestroyFridgeContentView(RetrieveUpdateDestroyAPIView):
    serializer_class = FridgeContentsSerializer

    def get_queryset(self):
        return get_queryset_custom(self)
    
    #対象の在庫が見つからなかった時のエラーメッセージを変更
    def get_exception_handler(self):
        return custom_exception_handler
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request_data_to_serializer_field(request), partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(data=serializer.data, status=status.HTTP_200_OK)