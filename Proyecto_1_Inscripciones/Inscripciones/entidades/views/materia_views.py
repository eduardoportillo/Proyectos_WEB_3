from django.http import HttpResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.template import loader
from django.urls import reverse

from entidades.models import Materia

def index(request):
    materia_list = Materia.objects.all()
    template = loader.get_template('materias/index.html')
    context = {
        'materia_list': materia_list
    }
    return HttpResponse(template.render(context, request))

def create(request):
    if request.method == 'GET':
        return render(request, 'materias/form.html')
    else:
        materia = Materia()
        materia.nombres = request.POST['nombres']
        materia.semestre = request.POST['semestre']
        materia.carrera = request.POST['carrera']
        materia.save()
        return redirect(reverse('entidades:materia.index'))


def edit(request, materia_id):
    materia = get_object_or_404(Materia, pk=materia_id)
    if request.method == 'GET':
        return render(request, 'materias/edit.html', {'materia': materia})
    else:
        materia.nombres = request.POST['nombres']
        materia.semestre = request.POST['semestre']
        materia.carrera = request.POST['carrera']
        materia.save()
        return redirect(reverse('entidades:materia.index'))

def delete(request, materia_id):
    materia = get_object_or_404(Materia, pk=materia_id)
    materia.delete()
    return redirect(reverse('entidades:materia.index'))