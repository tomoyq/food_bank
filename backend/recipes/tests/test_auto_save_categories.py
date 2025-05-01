import json

from django.test import TestCase

import recipes.auto_save_categories
from recipes.models import LargeCategories, MediumCategories, SmallCategories
from recipes.serializer import LargeCategoriesSerializer, MediumCategoriesSerializer, SmallCategoriesSerializer

class AutoSaveCategoriesTests(TestCase):
    def setUp(self):
        #json形式のダミーデータ
        self.api_response = json.load(open('recipes/dummy_data.json', 'r'))

    #大カテゴリを取得して保存
    def test_save_json_response_large_type(self):
        #初期は何も保存されていないはず
        self.assertEqual(len(LargeCategories.objects.all()), 0)

        recipes.auto_save_categories.save_json_response(self.api_response, 'large', LargeCategoriesSerializer)

        #関数の中でdbにカテゴリがすべて保存されているはず
        self.assertEqual(len(LargeCategories.objects.all()), len(self.api_response['result']['large']))

    #中カテゴリを取得して保存
    def test_save_json_response_large_type(self):
        recipes.auto_save_categories.save_json_response(self.api_response, 'large', LargeCategoriesSerializer)
        
        #初期は何も保存されていないはず
        self.assertEqual(len(MediumCategories.objects.all()), 0)

        recipes.auto_save_categories.save_json_response(self.api_response, 'medium', MediumCategoriesSerializer)

        #関数の中でdbにカテゴリがすべて保存されているはず
        self.assertEqual(len(MediumCategories.objects.all()), len(self.api_response['result']['medium']))

    #小カテゴリ
    def test_save_json_response_large_type(self):
        recipes.auto_save_categories.save_json_response(self.api_response, 'large', LargeCategoriesSerializer)
        recipes.auto_save_categories.save_json_response(self.api_response, 'medium', MediumCategoriesSerializer)
        
        #初期は何も保存されていないはず
        self.assertEqual(len(SmallCategories.objects.all()), 0)

        recipes.auto_save_categories.save_json_response(self.api_response, 'small', SmallCategoriesSerializer)

        #関数の中でdbにカテゴリがすべて保存されているはず
        self.assertEqual(len(SmallCategories.objects.all()), len(self.api_response['result']['small']))

