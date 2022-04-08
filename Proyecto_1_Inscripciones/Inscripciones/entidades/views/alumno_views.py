from django.http import HttpResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.template import loader
from django.urls import reverse

from entidades.models import Alumno


def index(request):
    alumno_list = Alumno.objects.all()
    template = loader.get_template('alumnos/index.html')
    context = {
        'alumno_list': alumno_list
    }
    return HttpResponse(template.render(context, request))

def create(request):
    if request.method == 'GET':
        return render(request, 'alumnos/form.html')
    else:
        alumno = Alumno()
        alumno.nombres = request.POST['nombres']
        alumno.apellidos = request.POST['apellidos']
        alumno.registro = request.POST['registro']
        alumno.semestre = request.POST['semestre']
        alumno.edad = request.POST['edad']
        alumno.ci = request.POST['ci']
        alumno.genero = request.POST['genero']
        alumno.save()
        return redirect(reverse('entidades:alumno.index'))


def edit(request, alumno_id):
    alumno = get_object_or_404(Alumno, pk=alumno_id)
    if request.method == 'GET':
        return render(request, 'alumnos/edit.html', {'alumno': alumno})
    else:
        alumno.nombres = request.POST['nombres']
        alumno.apellidos = request.POST['apellidos']
        alumno.registro = request.POST['registro']
        alumno.semestre = request.POST['semestre']
        alumno.edad = request.POST['edad']
        alumno.ci = request.POST['ci']
        alumno.genero = request.POST['genero']
        alumno.save()
        return redirect(reverse('entidades:alumno.index'))

def delete(request, alumno_id):
    alumno = get_object_or_404(Alumno, pk=alumno_id)
    alumno.delete()
    return redirect(reverse('entidades:alumno.index'))