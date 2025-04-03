from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    #レスポンスのdetailキーのエラーメッセージを変更している
    if response is not None:
        response.data['status_code'] = response.status_code
        response.data['detail'] = '対象の在庫食材が見つかりませんでした。'

    return response