from django.urls import path

from entidades.views import user_views
from entidades.views.reunion_views import ReunionListView, ReunionCreateView
from entidades.views.user_views import UserListView
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    # Users
    path('users/', UserListView.as_view(), name='user.list'),
    path('register/', user_views.register, name='user.register'),
    path('login/', LoginView.as_view(template_name='users/login.html'), name='user.login'),
    # path('login/', LogoutView.as_view(template_name='users/login.html'), name='user.logout'), # Implementar logau
    path('<int:user_id>/delete', user_views.delete, name="user.delete"),

    # Reuniones
    path('reuniones/', ReunionListView.as_view(), name='reunion.list'),
    path('reuniones/create', ReunionCreateView.as_view(), name='reunion.create'),
    path('<int:reunion_id>/delete', user_views.delete, name="reunion.delete"),
]
