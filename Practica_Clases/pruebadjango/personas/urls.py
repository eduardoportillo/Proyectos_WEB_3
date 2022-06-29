from django.urls import path

from personas.views import persona_views, mascota_views
from personas.views.vehiculo_views import VehiculoListView

app_name = 'personas'
urlpatterns = [
    path('', persona_views.index, name="personas.index"),
    path('<int:persona_id>/', persona_views.detail, name="personas.detail"),
    path('create', persona_views.create, name="personas.create"),
    path('<int:persona_id>/edit', persona_views.edit, name="personas.edit"),
    path('<int:persona_id>/delete', persona_views.delete, name="personas.delete"),
    path('mascotas/create', mascota_views.create, name="mascotas.create"),
    path('mascotas/', mascota_views.index, name="mascotas.index"),
    path('mascotas/<int:mascota_id>/edit', mascota_views.edit, name="mascotas.edit"),
    path('mascotas/<int:mascota_id>/delete', mascota_views.delete, name="mascotas.delete"),
    path('vehiculos/', VehiculoListView.as_view())
]
