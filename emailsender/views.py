from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets
from authentication.models import User
from emailsender.models import Contact, Group
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from emailsender.serializers import ContactListSerializer, GroupSerializer
from rest_framework import generics, status


class ContactView(APIView):
    
    def get(self, request):
        # contacts = Contact.objects.all()
        contacts = Contact.objects.filter(user=request.user)
        serializer = ContactListSerializer(contacts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.POST.copy()
        post_obj = {}
        post_obj['name'] = data.get('name', '')
        post_obj['email'] = data.get('email', '')
        post_obj['phone_no'] = data.get('phone_no', '')
        post_obj['user'] = request.user
        groups = data.get('groups', '')
        print(groups, 'groups list')
        groups = groups.split(',')
        if post_obj['name'] and post_obj['email']:
            contact, created = Contact.objects.get_or_create(email=post_obj['email'], user=request.user)
            if created:
                contact.name =  post_obj['name']
                if post_obj['phone_no']:
                    contact.phone_no = post_obj['phone_no']
                contact.save()
                if groups:
                    for group in groups:
                        group = Group.objects.get(name=group)
                        contact.groups.add(group)
            else:
                return Response('Contact exists already', status=status.HTTP_400_BAD_REQUEST)
        serializer = ContactListSerializer(contact)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GroupView(APIView):

    def get(self, request):
        groups = Group.objects.filter(user=request.user)
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.POST.copy()
        name = data.get('name', '')
        description = data.get('description', '')
        user = request.user
        # user = User.objects.get(email='ramesh7128@gmail.com')
        group, created = Group.objects.get_or_create(name=name, user=user)
        if created:
            group.description = description
            group.save()
            serializer = GroupSerializer(group)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response('Group already exists with the name', status=status.HTTP_400_BAD_REQUEST)
            