from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserAuth(AbstractUser):
    username = models.CharField(max_length=125)
    email = models.EmailField(max_length=125, unique=True)
    password = models.CharField(max_length=125)
    created = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        extra_fields = {'is_staff': False, 'is_superuser': False, **extra_fields}
        if not email:
            raise ValueError("Email is required")
        user = UserAuth(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields = {'is_staff': True, 'is_superuser': True, **extra_fields}
        user = self.create_user(email=email, password=password, **extra_fields)
        user.username = "admin"
        return user


