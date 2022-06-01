
from django.urls import path, include
from rest_framework import routers

from entidades.api import GenderViewSet
from entidades.api.movie_viewset import MovieViewSet
from entidades.api.movie_gender_viewset import MovieGenderViewSet

router = routers.DefaultRouter()
router.register(r'movie', MovieViewSet)
router.register(r'gender', GenderViewSet)
router.register(r'movie-gender', MovieGenderViewSet)

urlpatterns = [
    path('', include(router.urls))
]
