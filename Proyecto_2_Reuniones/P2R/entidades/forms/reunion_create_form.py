from django import forms

from entidades.models import Reunion

class DateTimeInput(forms.DateInput):
    input_type = 'date'

class ReunionForm(forms.ModelForm):
    fecha_hora_reunion = forms.DateField(widget=DateTimeInput)
    class Meta:
        model = Reunion
        fields = '__all__'