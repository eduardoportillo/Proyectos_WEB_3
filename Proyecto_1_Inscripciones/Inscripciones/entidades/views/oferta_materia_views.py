from django.http import HttpResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.template import loader
from django.urls import reverse

from entidades.models import OfertaMateria, Docente, Materia


def index(request):
    ofertamateria_list = OfertaMateria.objects.all()
    template = loader.get_template('oferta_materia/index.html')
    context = {
        'ofertamateria_list': ofertamateria_list
    }
    return HttpResponse(template.render(context, request))

def create(request):
    if request.method == 'GET':
        docente_list = Docente.objects.all()
        materia_list = Materia.objects.all()

        template = loader.get_template('oferta_materia/form.html')

        context = {
            'docente_list': docente_list,
            'materia_list': materia_list
        }

        return HttpResponse(template.render(context, request))
    else:
        ofertamateria = OfertaMateria()
        ofertamateria.horario = request.POST['horario']
        ofertamateria.docente_id = request.POST['docente_id']
        ofertamateria.materia_id = request.POST['materia_id']
        ofertamateria.save()
        return redirect(reverse('entidades:ofertamateria.index'))


def edit(request, ofertamateria_id):
    ofertamateria = get_object_or_404(OfertaMateria, pk=ofertamateria_id)
    if request.method == 'GET':
        return render(request, 'oferta_materia/edit.html', {'ofertamateria': ofertamateria})
    else:
        ofertamateria.horario = request.POST['horario']
        ofertamateria.docente_id = request.POST['docente_id']
        ofertamateria.materia_id = request.POST['materia_id']
        ofertamateria.genero = request.POST['genero']
        ofertamateria.save()
        return redirect(reverse('entidades:ofertamateria.index'))

def delete(request, ofertamateria_id):
    ofertamateria = get_object_or_404(OfertaMateria, pk=ofertamateria_id)
    ofertamateria.delete()
    return redirect(reverse('entidades:ofertamateria.index'))