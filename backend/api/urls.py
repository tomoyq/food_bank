from django.contrib import admin
from django.urls import path

from accounts.views import CustomTokenRefreshView, LoginView, LogoutView, SignUpView
from fridges.views import FridgeContentListView, UpdateDestroyFridgeContentView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_verify'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('fridges/', FridgeContentListView.as_view(), name='fridge_contents'),
    path('fridges/<int:pk>/', UpdateDestroyFridgeContentView.as_view(), name='update_or_delete_fridge_contents'),
]
