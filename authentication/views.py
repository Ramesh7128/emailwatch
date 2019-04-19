from django.shortcuts import render
import requests
from requests.exceptions import HTTPError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from rest_framework import status
from authentication.renderers import UserJSONRenderer

from emailsender.creds import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
from emailsender.constants import GOOGLE_GET_TOKEN_URL, GOOGLE_TOKEN_INFO_URL

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView
from authentication.serializers import (
    RegisterationSerializer,
    UserSerializer,
    LoginSerializer,
    SocialRegisterationLoginSerializer
)


# Create your views here.
class RegisterationAPIView(APIView):
    # Allow any user with/without authentication to hit this endpoint.
    permission_classes = (AllowAny,)
    serializer_class = RegisterationSerializer
    renderer_classes = (UserJSONRenderer,)

    def post(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):

    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRetreiveUpdateView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        """
        Returns the user in a json serializable manner.
        """
        serializer = self.serializer_class(request.user)
        print("this is method handling")
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        serializer_data = request.data.get('user', {})
        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class SocialLoginRegisterationAPIView(APIView):
    # allow any user without authentication to access this api view.
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)

    def post(self, request):
        code = request.data.get('code', "")
        provider = request.data.get('provider', '')
        # get access token and refresh token
        payload = { 
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": 'http://localhost:3000',
            "grant_type": "authorization_code"
        }
        res = requests.post(GOOGLE_GET_TOKEN_URL, data=payload)
        access_token = res.json()['access_token']
        refresh_token = res.json()['refresh_token']
        res = requests.get(GOOGLE_TOKEN_INFO_URL % access_token)
        email = res.json()['email']
        payload = {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "email": email
        }
        serializer = SocialRegisterationLoginSerializer(data=payload)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        
        