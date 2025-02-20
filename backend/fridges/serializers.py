import datetime

from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Fridges

User = get_user_model()

class FridgeContentsSerializer(serializers.ModelSerializer):
    #get時はuserの名前だけを返す
    owner_name = serializers.ReadOnlyField(source='owner.username')
    #post時はuserのpkを送信する
    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)

    class Meta:
        model = Fridges
        fields = ('owner_name','owner', 'name', 'expiry_date', 'quantity')

    #賞味期限が今の日付よりも前の日付を入力していたらエラーを返す
    def validate_expiry_date(self, value):
        if value < datetime.date.today():
            raise serializers.ValidationError('期限が切れているため、保存できません。')
        return value