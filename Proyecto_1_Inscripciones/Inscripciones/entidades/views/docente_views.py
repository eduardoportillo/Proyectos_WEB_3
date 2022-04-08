from django.http import HttpResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.template import loader
from django.urls import reverse

from entidades.models import Docente

def index(request):
    docente_list = Docente.objects.all()
    template = loader.get_template('docentes/index.html')
    context = {
        'docente_list': docente_list
    }
    return HttpResponse(template.render(context, request))

def create(request):
    if request.method == 'GET':
        return render(request, 'docentes/form.html')
    else:
        docente = Docente()
        docente.nombres = request.POST['nombres']
        docente.apellidos = request.POST['apellidos']
        docente.ci = request.POST['ci']
        docente.genero = request.POST['genero']
        docente.save()
        return redirect(reverse('entidades:docente.index'))


def edit(request, docente_id):
    docente = get_object_or_404(Docente, pk=docente_id)
    if request.method == 'GET':
        return render(request, 'docentes/edit.html', {'docente': docente})
    else:
        docente.nombres = request.POST['nombres']
        docente.apellidos = request.POST['apellidos']
        docente.ci = request.POST['ci']
        docente.genero = request.POST['genero']
        docente.save()
        return redirect(reverse('entidades:docente.index'))

def delete(request, docente_id):
    docente = get_object_or_404(Docente, pk=docente_id)
    docente.delete()
    return redirect(reverse('entidades:docente.index'))