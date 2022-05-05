from django.shortcuts import get_object_or_404, redirect
from django.views.generic import ListView, CreateView, UpdateView
from django.urls import reverse, reverse_lazy

from entidades.forms.reunion_create_form import ReunionForm
from entidades.models import Reunion


class ReunionListView(ListView):
    model = Reunion
    template_name = "reuniones/list.html"


class ReunionCreateView(CreateView):
    model = Reunion
    form_class = ReunionForm
    template_name = "reuniones/form.html"
    success_url = reverse_lazy('reunion.list')


class ReunionUpdateView(UpdateView):
    model = Reunion
    form_class = ReunionForm
    template_name = "reuniones/form.html"
    success_url = reverse_lazy('reunion.list')


def delete(request, reunion_id):
    reunion = get_object_or_404(Reunion, pk=reunion_id)
    reunion.delete()
    return redirect(reverse_lazy('reunion.list'))
