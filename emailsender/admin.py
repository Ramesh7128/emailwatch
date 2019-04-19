from django.contrib import admin
from emailsender.models import Contact, Group, SentEmail
# Register your models here.
admin.site.register(Contact)
admin.site.register(Group)
admin.site.register(SentEmail)
