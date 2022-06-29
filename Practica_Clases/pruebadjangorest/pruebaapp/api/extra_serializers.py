from rest_framework import serializers

from pruebaapp.models import Persona


class PersonaSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = ['id', 'nombres', 'apellidos']
