from django.views.generic import ListView

from personas.models import Vehiculo


class VehiculoListView(ListView):
    model = Vehiculo
    template_name = "vehiculos/index.html"

