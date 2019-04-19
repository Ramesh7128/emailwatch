from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from emailsender.views import (
    ContactView,
    GroupView,
    SentEmailview,
    TrackEmailView,
)

app_name = 'emailwatch'

urlpatterns = [
    path('contacts/', ContactView.as_view()),
    path('groups/', GroupView.as_view()),
    path('sendemails/', SentEmailview.as_view()),
    path('tracker/<slug:slug>/', TrackEmailView.as_view()),
]
