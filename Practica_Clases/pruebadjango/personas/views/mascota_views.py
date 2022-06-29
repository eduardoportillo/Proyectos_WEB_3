from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse

from personas.forms import MascotaForm
from personas.models import Mascota


def create(request):
    if request.method == 'GET':
        form = MascotaForm()
    else:
        form = MascotaForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect(reverse('personas:mascotas.index'))
    return render(request, 'mascotas/form.html', {'form': form})


def index(request):
    mascotas_list = Mascota.objects.all()
    return render(request, 'mascotas/index.html', {"mascotas_list": mascotas_list})


def edit(request, mascota_id):
    mascota = get_object_or_404(Mascota, pk=mascota_id).first()

    if request.method == 'GET':
        form = MascotaForm(instance=mascota)
        return render(request, 'mascotas/form.html', {'form': form})
    else:
        form = MascotaForm(request.POST, instance=mascota)
        if form.is_valid():
            form.save()
    return redirect(reverse('personas:mascotas.index'))


def delete(request, mascota_id):
    mascota = get_object_or_404(Mascota, pk=mascota_id)
    mascota.delete()
    return redirect(reverse('personas:mascotas.index'))
