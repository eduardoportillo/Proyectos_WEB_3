from django.urls import path

from entidades.views import user_views, reunion_views, participante_views
from entidades.views.participante_views import ParticipanteCreateView
from entidades.views.reunion_views import ReunionListView, ReunionCreateView, ReunionUpdateView
from entidades.views.user_views import UserListView, UserUpdateView
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    # Users
    path('users/', UserListView.as_view(), name='user.list'),
    path('register/', user_views.register, name='user.register'),
    path('user/<int:pk>/edit', UserUpdateView.as_view(), name="user.edit"),
    path('login/', LoginView.as_view(template_name='users/login.html'), name='user.login'),
    path('logout/', LogoutView.as_view(template_name='users/logout.html'), name='user.logout'),  # Implementar logout
    path('<int:user_id>/delete', user_views.delete, name="user.delete"),

    # Reuniones
    path('reuniones/', ReunionListView.as_view(), name='reunion.list'),
    path('reuniones/create', ReunionCreateView.as_view(), name='reunion.create'),
    path('reuniones/<int:pk>/edit', ReunionUpdateView.as_view(), name="reunion.edit"),
    path('reuniones/<int:reunion_id>/delete', reunion_views.delete, name="reunion.delete"),

    path('misreuniones/<int:owner_id>', reunion_views.misReuniones, name="misreuniones"),
    path('reunionesasignadas/<int:owner_id>', reunion_views.reunionesAsignadas, name="reunionesasignadas"),

    # Participantes
    path('participantes/<int:reunion_id>', participante_views.participantesByReunion, name="participantes.list"),
    path('participantes/create', ParticipanteCreateView.as_view(), name='participante.create'),
    path('participantes/<int:reunion_id>/<int:reunion_user_id>/delete', participante_views.delete,
         name="participantes.delete"),
]
