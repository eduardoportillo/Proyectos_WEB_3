from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect
from django.template import loader
from django.urls import reverse_lazy
from django.views.generic import CreateView

from entidades.models import Reunion, ReunionUser

def participantesByReunion(request, reunion_id):
    reunion_list = Reunion.objects.raw(
        "SELECT eru.id, er.id as id_reunion,er.nombres_reunion, er.user_owner_id ,au.username FROM entidades_reunionuser eru JOIN entidades_reunion er on er.id = eru.reunion_id JOIN  auth_user au ON au.id  =eru.user_id WHERE er.id =" + str(
            reunion_id))
    template = loader.get_template('participantes/list.html')
    context = {
        'reunion_by_user_list': reunion_list
    }
    return HttpResponse(template.render(context, request))

class ParticipanteCreateView(CreateView):
    model = ReunionUser
    fields = ['reunion', 'user']
    template_name = "participantes/form.html"
    success_url = reverse_lazy('reunion.list')

# TODO SOLUCIONAR ELIMINAR PARTICIPANTE
def delete(request, reunion_id,reunion_user_id):
    participante = get_object_or_404(ReunionUser, pk=str(reunion_user_id))
    participante.delete()
    return redirect("/participantes/"+str(reunion_id))
