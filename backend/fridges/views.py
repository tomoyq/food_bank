from rest_framework.generics import ListCreateAPIView

from .serializers import FridgeContentsSerializer
from .models import Fridges

class FridgeContentListView(ListCreateAPIView):
    serializer_class = FridgeContentsSerializer

    #リクエストしたユーザーが保存している食材を期限の短い順で返す
    def get_queryset(self):
        user = self.request.user
        return Fridges.objects.filter(owner=user).order_by('expiry_date')