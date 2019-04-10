from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from emailsender.views import (
    ContactView,
    GroupView
)

app_name = 'emailwatch'

urlpatterns = [
    path('contacts/', ContactView.as_view()),
    path('groups/', GroupView.as_view()),
]
