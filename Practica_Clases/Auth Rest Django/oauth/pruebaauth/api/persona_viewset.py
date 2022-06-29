from rest_framework import viewsets, serializers
from rest_framework.permissions import IsAuthenticated

from pruebaauth.models import Persona


class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'


class PersonaViewSet(viewsets.ModelViewSet):
    serializer_class = PersonaSerializer
    queryset = Persona.objects.all()
    permission_classes = [IsAuthenticated]
