from django.urls import path

from entidades.models import oferta_materia
from entidades.views import alumno_views, materia_views, oferta_materia_views, inscripciones_views
from entidades.views import docente_views

app_name = 'entidades'

urlpatterns = [
    # Alumnos
    path('', alumno_views.index, name="alumno.index"),
    path('create', alumno_views.create, name="alumno.create"),
    path('<int:alumno_id>/edit', alumno_views.edit, name="alumno.edit"),
    path('<int:alumno_id>/delete', alumno_views.delete, name="alumno.delete"),

    # Docentes
    path('docentes', docente_views.index, name="docente.index"),
    path('docentes/create', docente_views.create, name="docente.create"),
    path('docentes/<int:docente_id>/edit', docente_views.edit, name="docente.edit"),
    path('docentes/<int:docente_id>/delete', docente_views.delete, name="docente.delete"),

    # materias
    path('materias', materia_views.index, name="materia.index"),
    path('materias/create', materia_views.create, name="materia.create"),
    path('materias/<int:materia_id>/edit', materia_views.edit, name="materia.edit"),
    path('materias/<int:materia_id>/delete', materia_views.delete, name="materia.delete"),

    # Ofertas Materias
    path('ofertamaterias', oferta_materia_views.index, name="ofertamateria.index"),
    path('ofertamaterias/create', oferta_materia_views.create, name="ofertamateria.create"),
    path('ofertamaterias/<int:ofertamateria_id>/edit', oferta_materia_views.edit, name="ofertamateria.edit"),
    path('ofertamaterias/<int:ofertamateria_id>/delete', oferta_materia_views.delete, name="ofertamateria.delete"),

    # Inscripciones
    path('inscripciones', inscripciones_views.index, name="inscripciones.index"),
    path('inscripciones/<int:alumno_id>/create', inscripciones_views.create, name="inscripciones.create"),
    path('inscripciones/<int:inscripcion_id>/edit', inscripciones_views.edit, name="inscripciones.edit"),
    path('inscripciones/<int:inscripcion_id>/delete', inscripciones_views.delete, name="inscripciones.delete"),
]
