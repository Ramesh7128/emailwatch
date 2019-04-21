from django.contrib import admin
from emailsender.models import Contact, Group, SentEmail, EmailLinks, Template
# Register your models here.
admin.site.register(Contact)
admin.site.register(Group)
admin.site.register(SentEmail)
admin.site.register(EmailLinks)
admin.site.register(Template)
