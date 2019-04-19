from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from authentication.views import (
    RegisterationAPIView,
    LoginAPIView,
    UserRetreiveUpdateView,
    SocialLoginRegisterationAPIView
)

app_name = 'authentication'

urlpatterns = [
    url(r'^users/?$', RegisterationAPIView.as_view()),
    url(r'^users/login/?$', LoginAPIView.as_view()),
    url(r'^socialusers/login/?$', SocialLoginRegisterationAPIView.as_view()),
    url(r'^user', UserRetreiveUpdateView.as_view()),
]
