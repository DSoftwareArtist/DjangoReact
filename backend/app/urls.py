# app/urls.py

from django.urls import path, re_path
from .views import landing
from django.contrib.auth import views as auth_views
from django.views.generic.base import TemplateView

urlpatterns = [
    path('', landing, name='landing'),
]