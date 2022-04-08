from django.http import HttpResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.template import loader
from django.urls import reverse

from entidades.models import Inscripcion, OfertaMateria


def index(request):
    inscripcion_list = Inscripcion.objects.all()
    template = loader.get_template('inscripciones/index.html')
    context = {
        'inscripcion_list': inscripcion_list
    }
    return HttpResponse(template.render(context, request))


def create(request,alumno_id):

    if request.method == 'GET':
        oferta_materia_list = OfertaMateria.objects.all()
        template = loader.get_template('inscripciones/form.html')
        context = {
            'oferta_materia_list': oferta_materia_list,
            'alumno_id': alumno_id
        }

        return HttpResponse(template.render(context, request))
    else:
        inscripcion = Inscripcion()
        inscripcion.alumno_id = alumno_id
        inscripcion.oferta_materia_id = request.POST['oferta_materia_id']
        inscripcion.save()
        return redirect(reverse('entidades:inscripciones.index'))


def edit(request, inscripcion_id):
    oferta_materia_list = OfertaMateria.objects.all()
    inscripcion = get_object_or_404(Inscripcion, pk=inscripcion_id)
    if request.method == 'GET':
        return render(request, 'inscripciones/edit.html', {'inscripcion': inscripcion, 'oferta_materia_list':oferta_materia_list})
    else:
        # inscripcion.alumno_id = request.POST['alumno_id']
        inscripcion.oferta_materia_id = request.POST['oferta_materia_id']
        inscripcion.save()
        return redirect(reverse('entidades:inscripciones.index'))

def delete(request, inscripcion_id):
    inscripcion = get_object_or_404(Inscripcion, pk=inscripcion_id)
    inscripcion.delete()
    return redirect(reverse('entidades:inscripciones.index'))