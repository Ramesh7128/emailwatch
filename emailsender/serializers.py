from rest_framework import serializers
from emailsender.models import Contact, Group
from authentication.models import User
import json
from authentication.serializers import UserSerializer


class GroupSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=20)
    description = serializers.CharField(max_length=200)
    user = UserSerializer()

class ContactListSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.CharField(max_length=100)
    phone_no = serializers.CharField(max_length=20)
    user = UserSerializer()
    groups = GroupSerializer(many=True)

class TagSerializer(serializers.Serializer):
    name =  serializers.CharField(max_length=255)
    user =  UserSerializer()

class TemplateListSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    body = serializers.CharField()
    tags = TagSerializer(many=True)

    

