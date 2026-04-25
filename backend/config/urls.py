from django.contrib import admin
from django.urls import include, path

from aldaba_api.auth_views import ThrottledTokenObtainPairView, ThrottledTokenRefreshView


urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("api/auth/login/", ThrottledTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", ThrottledTokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include("aldaba_api.urls")),
]
