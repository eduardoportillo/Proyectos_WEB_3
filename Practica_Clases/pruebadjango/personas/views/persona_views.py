from django.http import HttpResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.template import loader
from django.urls import reverse

from personas.models import Persona


def index(request):
    personas_list = Persona.objects.all()
    template = loader.get_template('personas/index.html')
    context = {
        'personas_list': personas_list
    }
    return HttpResponse(template.render(context, request))


def detail(request, persona_id):
    persona = Persona.objects.filter(pk=persona_id).first()
    return HttpResponse("Intentaste ver el detalle de: " + str(persona))


def create(request):
    if request.method == 'GET':
        return render(request, 'personas/form.html')
    else:
        persona = Persona()
        persona.nombres = request.POST['nombres']
        persona.apellidos = request.POST['apellidos']
        persona.ciudad = request.POST['ciudad']
        persona.edad = request.POST['edad']
        persona.fecha_nacimiento = request.POST['fecha_nacimiento']
        persona.genero = request.POST['genero']
        persona.save()
        return redirect(reverse('personas:personas.index'))


def edit(request, persona_id):
    persona = get_object_or_404(Persona, pk=persona_id)
    if request.method == 'GET':
        return render(request, 'personas/edit.html', {'persona': persona})
    else:
        persona.nombres = request.POST['nombres']
        persona.apellidos = request.POST['apellidos']
        persona.ciudad = request.POST['ciudad']
        persona.edad = request.POST['edad']
        persona.fecha_nacimiento = request.POST['fecha_nacimiento']
        persona.genero = request.POST['genero']
        persona.save()
        return redirect(reverse('personas:personas.index'))


def delete(request, persona_id):
    persona = get_object_or_404(Persona, pk=persona_id)
    persona.delete()
    return redirect(reverse('personas:personas.index'))
