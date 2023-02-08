from django.urls import include, path
from rest_framework import routers

from api.views import UserViewset

router = routers.DefaultRouter()
router.register('users', UserViewset)

urlpatterns = [
    path('', include(router.urls))
]
