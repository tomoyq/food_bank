from datetime import date
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

import django

# Djangoアプリケーションの初期化
django.setup()

import requests
import time

from .serializer import LargeCategoriesSerializer, MediumCategoriesSerializer, SmallCategoriesSerializer

#リクエストパラメーターの日付の8桁の数字を作成
def date_to_iso_format():
    today = date.today()

    #isoformatメソッドの戻り値からハイフンを削除して8文字のみの形式にする
    return today.isoformat().replace('-', '')

#jsonデータをdbに保存
def save_json_response(res, categoryType, serializer):
    target_serializer = serializer
    #辞書型のresponseの中のcategoryTypeがキーになっている配列を取得
    categories = res['result'][categoryType]
    
    #配列の要素を一つずつデシリアライズしてdbに保存する
    for category in categories:
        serializer = target_serializer(data=category)
        serializer.is_valid(raise_exception=True)
        serializer.save()

#エンドポイントとアプリケーションID
END_POINT = os.environ.get('RAKUTEN_END_POINT')
APPLICATION_ID = os.environ.get('APPLICATIONID')

categoryTypeAndSerializer = [
    {
        'type': 'large',
        'serializer': LargeCategoriesSerializer
    },
    {
        'type': 'medium',
        'serializer': MediumCategoriesSerializer
    },
    {
        'type': 'small',
        'serializer': SmallCategoriesSerializer
    }
]

params = {
    'format': 'json',
    'applicationId' : APPLICATION_ID
}

if __name__ == '__main__':
    #すべてのカテゴリを取得して保存する
    for category in categoryTypeAndSerializer:
        try:
            r = requests.get(END_POINT, params=params)
            #status_codeが200以外の時に例外を投げる
            r.raise_for_status()
        except requests.exceptions.RequestException as e:
            print('エラー:', e)
        else:
            #responseをjsonにデコードして渡す
            save_json_response(r.json(), category['type'], category['serializer'])

            print('成功:', category['type'])
            time.sleep(5)