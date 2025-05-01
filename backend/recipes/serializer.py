from rest_framework import serializers
from .models import LargeCategories, MediumCategories, SmallCategories

class LargeCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LargeCategories
        fields = '__all__'

class MediumCategoriesSerializer(serializers.ModelSerializer):
    parentCategoryId = serializers.PrimaryKeyRelatedField(queryset=LargeCategories.objects.all())

    class Meta:
        model = MediumCategories
        fields = '__all__'

class SmallCategoriesSerializer(serializers.ModelSerializer):
    parentCategoryId = serializers.PrimaryKeyRelatedField(queryset=MediumCategories.objects.all())

    class Meta:
        model = SmallCategories
        fields = '__all__'