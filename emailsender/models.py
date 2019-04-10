from django.db import models
from authentication.models import User

# Create your models here.

class Group(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=100)
    phone_no = models.CharField(max_length=20)
    groups = models.ManyToManyField(Group, related_name='groups')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Template(models.Model):
    name =  models.CharField(max_length=255)
    body = models.TextField()
    tags = models.ManyToManyField(Tag, related_name='tag')

    def __str__(self):
        return self.name


class EMailSent(models.Model):
    receiver = models.ForeignKey(Contact, on_delete=models.SET_NULL, null=True)
    template = models.ForeignKey(Template, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=50)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.receiver

