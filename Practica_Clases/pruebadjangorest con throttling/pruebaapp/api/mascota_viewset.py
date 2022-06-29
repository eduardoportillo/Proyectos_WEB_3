from rest_framework import viewsets, serializers

from pruebaapp.api import PersonaSimpleSerializer
from pruebaapp.models import Mascota, Persona


class MascotaSerializer(serializers.ModelSerializer):
    persona_id = serializers.PrimaryKeyRelatedField(
        many=False,
        write_only=True,
        queryset=Persona.objects.all(),
        source="persona"
    )
    persona = PersonaSimpleSerializer(many=False, read_only=True)

    class Meta:
        model = Mascota
        fields = '__all__'


class MascotaViewSet(viewsets.ModelViewSet):
    serializer_class = MascotaSerializer
    queryset = Mascota.objects.all()
