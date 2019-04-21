import json
from datetime import datetime
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets
from authentication.models import User, UserSocialCredentials
from emailsender.models import Contact, Group, Template, SentEmail, EmailLinks
from django.http import Http404
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from rest_framework.permissions import AllowAny, IsAuthenticated
from emailsender.serializers import (
    ContactListSerializer,
    GroupSerializer,
    TemplateListSerializer,
    SentEmailListSerailizer,
)
from rest_framework import generics, status
from emailsender.constants import GOOGLE_EMAIL_SEND_URL, GOOGLE_RENEW_TOKEN_URL
from emailsender.helpers.helpers import renewToken

import requests

from email.mime.text import MIMEText
import base64

# gmail api service imports
# from googleapiclient.discovery import build
# from apiclient import errors
# from httplib2 import Http
# from email.mime.text import MIMEText
# import base64
# from google.oauth2 import service_account

# from apiclient.discovery import build

# service = build_service(credentials)

# def build_service(credentials):
#     """Build a Gmail service object.

#     Args:
#       credentials: OAuth 2.0 credentials.

#     Returns:
#       Gmail service object.
#     """
#     http = httplib2.Http()
#     http = credentials.authorize(http)
#     return build('gmail', 'v1', http=http)


# def service_account_login():
#     SCOPES = ['https://www.googleapis.com/auth/gmail.send']
#     SERVICE_ACCOUNT_FILE = 'service-key.json'

#     credentials = service_account.Credentials.from_service_account_file(
#         SERVICE_ACCOUNT_FILE, scopes=SCOPES)
#     delegated_credentials = credentials.with_subject(EMAIL_FROM)
#     service = build('gmail', 'v1', credentials=delegated_credentials)
#     return service


class ContactView(APIView):

    def get_object(self, pk):
        try:
            return Contact.objects.get(pk=pk)
        except Contact.DoesNotExist:
            raise Http404

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
            contact, created = Contact.objects.get_or_create(
                email=post_obj['email'], user=request.user)
            if created:
                contact.name = post_obj['name']
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

    def delete(self, request, pk, format=None):
        contact = self.get_object(pk)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GroupView(APIView):

    def get_object(self, pk):
        try:
            return Group.objects.get(pk=pk)
        except Group.DoesNotExist:
            raise Http404

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

    def delete(self, request, pk, format=None):
        group = self.get_object(pk)
        group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TemplateView(APIView):
    def get(self, request):
        template = Template.objects.all()
        serializer = TemplateListSerializer(template, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.POST.copy()
        name = data.get('name', '')
        body = data.get('value', '')
        print(name, body, "check input")
        if (name and body):
            email_template = Template()
            email_template.name = name
            email_template.body = body
            email_template.user = request.user
            email_template.save()
            serializer = TemplateListSerializer(email_template)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class SendEmail(APIView):

    def create_message(self, sender, to, subject, message_text):
        """Create a message for an email.

        Args:
            sender: Email address of the sender.
            to: Email address of the receiver.
            subject: The subject of the email message.
            message_text: The text of the email message.

        Returns:
            An object containing a base64url encoded email object.
        """
        message = MIMEText(message_text, 'html')
        message['to'] = str(to)
        message['from'] = str(sender)
        message['subject'] = str(subject)
        encoded_message = base64.urlsafe_b64encode(
            message.as_string().encode('utf-8')).decode('ascii')
        print(encoded_message, 'this is encoded_message')
        return {'raw': encoded_message}

    def create_sent_email(self, *args, **kwargs):
        """
        create a sent email entry on successfull message sending.
        Args:
            sender: Email address of the sender.
            receiver: Email address of the receiver.
            subject: subject of the email.
            body: Body of the email.
        """
        receiver = kwargs['receiver']
        sender = kwargs['sender']
        user = kwargs['user']
        body = kwargs['body']
        subject = kwargs['subject']
        if receiver and sender and subject and body:
            sent_email = SentEmail()
            sent_email.receiver = receiver
            sent_email.subject = subject
            sent_email.sender = sender
            sent_email.status = 'sent'
            sent_email.user = user
            sent_email.body = body
            sent_email.save()
            return True
        else:
            return False

    def post(self, request):
        data = request.POST.copy()
        to = data.get('to', '')
        body = data.get('body', '')
        subject = data.get('subject', '')
        user = request.user
        access_token = UserSocialCredentials.objects.get(
            user=user).access_token
        if (to and body):
            sender = request.user.email
            encoded_message = self.create_message(
                sender, to, subject, body)
            auth_header = 'Bearer %s' % access_token
            headers = {'Authorization': auth_header}
            headers['Accept'] = 'application/json'
            headers['Content-Type'] = 'application/json'
            res = requests.post(GOOGLE_EMAIL_SEND_URL,
                                json=encoded_message, headers=headers)
            if (res.status_code == 200):
                # create a sent item entry.
                data = {
                    'sender': sender,
                    'receiver': to,
                    'user': request.user,
                    'body': body,
                    'subject': subject
                }
                self.create_sent_email(**data)
                return Response('Successfully sent', status=status.HTTP_200_OK)
            else:
                return Response('Email sending failed', status=status.HTTP_400_BAD_REQUEST)


class SentEmailview(APIView):
    def get(self, request):
        sent_emails = SentEmail.objects.filter(user=request.user)
        serializer = SentEmailListSerailizer(sent_emails, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create_message(self, sender, to, subject, message_text):
        """Create a message for an email.
        Args:
            sender: Email address of the sender.
            to: Email address of the receiver.
            subject: The subject of the email message.
            message_text: The text of the email message.

        Returns:
            An object containing a base64url encoded email object.
        """
        message = MIMEText(message_text, 'html')
        message['to'] = str(to)
        message['from'] = str(sender)
        message['subject'] = str(subject)
        encoded_message = base64.urlsafe_b64encode(
            message.as_string().encode('utf-8')).decode('ascii')
        print(encoded_message, 'this is encoded_message')
        return {'raw': encoded_message}

    def create_sent_email(self, *args, **kwargs):
        """
        create a sent email entry on successfull message sending.
        Args:
            sender: Email address of the sender.
            receiver: Email address of the receiver.
            subject: subject of the email.
            body: Body of the email.
        """
        receiver = kwargs['receiver']
        sender = kwargs['sender']
        user = kwargs['user']
        body = kwargs['body']
        subject = kwargs['subject']
        tracker_id = kwargs['tracker_id']
        if receiver and sender and subject and body:
            sent_email = SentEmail()
            if tracker_id:
                sent_email.tracker_id = tracker_id
                sent_email.read_status = 'Tracking'
            else:
                sent_email.read_status = 'Not Tracking'
            sent_email.receiver = receiver
            sent_email.subject = subject
            sent_email.sender = sender
            sent_email.status = 'sent'
            sent_email.user = user
            sent_email.body = body
            sent_email.save()
            return sent_email
        else:
            return False

    def create_sent_email_links(self, *args, **kwargs):
        """
        Create sent email links that are getting tracked
        """
        links = kwargs['links']
        email_instance = kwargs['email_instance']
        for link in links:
            tracking_link = EmailLinks()
            tracking_link.link_url = link['linkUrl']
            tracking_link.link_tracking_id = link['linkId']
            tracking_link.email = email_instance
            tracking_link.save()
        return True

    def post(self, request):
        data = request.POST.copy()
        to = data.get('to', '')
        body = data.get('body', '')
        subject = data.get('subject', '')
        links = request.data.get('links', '')
        links = json.loads(links)
        print(type(links))
        for link in links:
            print(link, 'link URL')
        tracker_id = data.get('trackerId', '')
        user = request.user
        access_token = UserSocialCredentials.objects.get(
            user=user).access_token
        if (to and body):
            # check access token validity
            sender = request.user.email
            encoded_message = self.create_message(
                sender, to, subject, body)
            auth_header = 'Bearer %s' % access_token
            headers = {'Authorization': auth_header}
            headers['Accept'] = 'application/json'
            headers['Content-Type'] = 'application/json'
            res = requests.post(GOOGLE_EMAIL_SEND_URL,
                                json=encoded_message, headers=headers)
            if(res.status_code == 401):
                # access_token failure.
                access_token = renewToken(request.user)
                auth_header = 'Bearer %s' % access_token
                headers['Authorization'] = auth_header
                res = requests.post(GOOGLE_EMAIL_SEND_URL,
                                    json=encoded_message, headers=headers)
            if (res.status_code == 200):
                # create a sent item entry.
                data = {
                    'sender': sender,
                    'receiver': to,
                    'user': request.user,
                    'body': body,
                    'subject': subject,
                    'tracker_id': tracker_id
                }
                email_instance = self.create_sent_email(**data)
                print(email_instance.id, "this is email_instance")
                if (links):
                    links_data = {
                        'links': links,
                        'email_instance': email_instance
                    }
                    print(links, 'check')
                    self.create_sent_email_links(**links_data)
                return Response('Successfully sent', status=status.HTTP_200_OK)
            else:
                return Response('Email sending failed', status=status.HTTP_400_BAD_REQUEST)


class TrackEmailView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, slug=None):
        """
        Function to change the state of the email based on tracker id.
        """
        if (slug):
            sent_email = SentEmail.objects.get(tracker_id=slug)
            sent_email.read_status = "Read"
            sent_email.read_date = datetime.now()
            sent_email.save()
            return Response(status=status.HTTP_204_NO_CONTENT)


class TrackEmailLinkView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, slug=None):
        """
        Funtion to monitor link click in email content.
        """
        if (slug):
            email_link = EmailLinks.objects.get(link_tracking_id=slug)
            email_link.clicked_time = datetime.now()
            email_link.clicked_status = True
            email_link.save()
            redirect_url = email_link.link_url
            return HttpResponseRedirect(redirect_to=redirect_url)
