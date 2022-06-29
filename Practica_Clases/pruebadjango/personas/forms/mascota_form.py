from django import forms

from personas.models import Mascota


class MascotaForm(forms.ModelForm):
    class Meta:
        model = Mascota
        fields = ['nombre', 'tipo', 'persona']

    # TIPO_CHOICES = [
    #     (0, 'Perro'),
    #     (1, 'Gato'),
    #     (2, 'Loro'),
    #     (3, 'Mapache'),
    # ]
    # nombre = forms.CharField(label='Nombre', max_length=200)
    # tipo = forms.ChoiceField(choices=TIPO_CHOICES)
    # persona = forms.ModelChoiceField(queryset=Persona.objects.all(), empty_label="Seleccione una persona")
