from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect
from django.template import loader
from django.urls import reverse_lazy

from entidades.models import Reunion


def participantesByReunion(request, reunion_id):
    reunion_list = Reunion.objects.raw(
        "SELECT eru.id, er.id as id_reunion,er.nombres_reunion,au.username FROM entidades_reunion_users eru JOIN entidades_reunion er on er.id = eru.reunion_id JOIN  auth_user au ON au.id  =eru.user_id WHERE er.id =" + str(
            reunion_id))
    template = loader.get_template('participantes/list.html')
    context = {
        'reunion_by_user_list': reunion_list
    }
    return HttpResponse(template.render(context, request))

# TODO SOLUCIONAR ELIMINAR PARTICIPANTE
def delete(request, reunion_id,participante_id):
    participante = Reunion.objects.raw("SELECT * FROM entidades_reunion_users WHERE id ="+str(participante_id))
    participante.delete()
    return redirect(reverse_lazy('participantes.list' +  reunion_id))
