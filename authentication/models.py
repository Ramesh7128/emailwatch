import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager)

# Create your models here.


class UserManger(BaseUserManager):
    """
    custom create_user method for user model.
    """

    def create_user(self, username, email, password=None):
        """
        create and return a user object with username, email and password.
        """
        if username is None:
            raise TypeError('user must have a username')
        if email is None:
            raise TypeError('user must have a email')
        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def creat_social_user(self, username=None, email=None, password=None, access_token=None, refresh_token=None):
        """
        Create a user object for social login users.
        """
        if username is None:
            username = email.split('@')[0]
        if email is None:
            raise TypeError('user must have an email')
        try:
            user, created = self.model.objects.get_or_create(email=self.normalize_email(email))
            if created:
                user.username = username
                password = User.objects.make_random_password()
                user.set_password(password)
                user.save()
            user_creds, created = UserSocialCredentials.objects.get_or_create(user=user)
            user_creds.access_token = access_token
            user_creds.refresh_token = refresh_token
            user_creds.save()
            return user
        except Exception as error:
            print(error)

    def create_superuser(self, username, email, password):
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """
    An abstract base class implementing fully featured User model with
    admin-compliant permissions.
    """
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=40, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManger()

    def __str__(self):
        """
        Returns a spring representation of this user
        """
        return self.email

    @property
    def token(self):
        """
        Allows us to get user token with user.token. @property decorator lets you do it.
        """
        return self._generate_jwt_token()

    def get_full_name(self):
        """
        This is required by django when handling emails.
        which is ideally first name and last name.
        But since we are not handling first name and last name
        we use username instead.
        """
        return self.username

    def get_short_name(self):
        """
        This method is used by django for handling emails.
        """
        return self.username

    def _generate_jwt_token(self):
        """
        Generates jwt that stores user ids and has an expiry date set to 50 days
        """
        dt = datetime.now() + timedelta(days=50)
        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')


class UserSocialCredentials(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=200)
    refresh_token = models.CharField(max_length=200)

    def __str__(self):
        return self.user.email
