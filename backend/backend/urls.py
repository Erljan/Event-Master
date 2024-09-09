
from django.contrib import admin
from django.urls import path, include
from user_app.views import CreateUserViews, GetUserInfo, UpdateProfileInfo
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserViews.as_view()),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/profile/', GetUserInfo.as_view()),
    path('api/profile/update/', UpdateProfileInfo.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include("add_event.urls")),
    path('api/', include("my_events.urls")),
]
