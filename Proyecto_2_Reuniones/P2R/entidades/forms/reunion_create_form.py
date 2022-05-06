from django import forms

from entidades.models import Reunion

class DateTimeInput(forms.DateTimeInput):
    input_type = 'datetime-local'

class ReunionForm(forms.ModelForm):
    fecha_hora_reunion = forms.DateTimeField(widget=DateTimeInput)
    class Meta:
        model = Reunion
        fields = ['nombres_reunion', 'fecha_hora_reunion', 'user_owner']