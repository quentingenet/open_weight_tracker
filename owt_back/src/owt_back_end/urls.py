"""
URL configuration for owt_back_end project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from owt_api.views import AppUserModelViewSet, ContactModelViewSet, CustomTokenObtainPairView, InitialDataModelViewSet, PasswordResetTokenModelViewSet, PersonModelViewSet, WeightRecordModelViewSet

router = routers.SimpleRouter()
router.register('users', AppUserModelViewSet, basename='users')
router.register('password-reset', PasswordResetTokenModelViewSet, basename='password-reset')
router.register('persons', PersonModelViewSet, basename='person')
router.register('initialdata', InitialDataModelViewSet, basename='initialdata')
router.register('weights', WeightRecordModelViewSet, basename='weights')
router.register('contact', ContactModelViewSet, basename='contact')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    #path('api/register/', register_user_step_one, name='register'),
    #path('api/init/first-connexion/', set_initial_data_first_connexion, name='set_initial_data_first_connexion'),
    path('api/auth/', include('rest_framework.urls')),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
