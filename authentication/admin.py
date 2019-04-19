from django.contrib import admin
from authentication.models import User, UserSocialCredentials

# Register your models here.
admin.site.register(User)
admin.site.register(UserSocialCredentials)
