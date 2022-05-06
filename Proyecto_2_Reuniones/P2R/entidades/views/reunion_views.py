from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect
from django.template import loader
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

def misReuniones(request, owner_id):
    reunion_list = Reunion.objects.filter(user_owner_id=owner_id)
    template = loader.get_template('reuniones/misreuniones.html')
    context = {
        'reunion_by_user_list': reunion_list
    }
    return HttpResponse(template.render(context, request))

def reunionesAsignadas(request, owner_id):
    reunion_list = Reunion.objects.raw("SELECT er.* FROM entidades_reunion_users eru JOIN entidades_reunion er on er.id = eru.reunion_id JOIN  auth_user au ON au.id=eru.user_id WHERE au.id ="+str(owner_id) )
    template = loader.get_template('reuniones/reunionesasignadas.html')
    context = {
        'reunion_asignada_list': reunion_list
    }
    return HttpResponse(template.render(context, request))
