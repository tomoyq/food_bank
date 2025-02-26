from django.contrib import admin
from django.urls import path

from accounts.views import CustomTokenRefreshView, LoginView, LogoutView
from fridges.views import FridgeContentListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_verify'),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('fridges/', FridgeContentListView.as_view(), name='fridge_contents'),
]
