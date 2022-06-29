from rest_framework import viewsets, serializers, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from pruebaapp.api import VehiculoSerializer
from pruebaapp.models import Persona, Vehiculo


class PersonaSerializer(serializers.ModelSerializer):
    vehiculos = VehiculoSerializer(many=True, read_only=True)
    vehiculos_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
        queryset=Vehiculo.objects.all(),
        source="vehiculos"
    )

    class Meta:
        model = Persona
        fields = '__all__'


class PersonaViewSet(viewsets.ModelViewSet):
    serializer_class = PersonaSerializer
    queryset = Persona.objects.all()

    @action(detail=False, methods=['get'], url_path='toyota', name='Obtener lista de personas con auto toyota',
            permission_classes=([IsAuthenticated]))
    def get_persona_toyota(self, request, pk=None):
        lista_personas = Persona.objects.filter(vehiculos__marca='Toyota')
        serializer = PersonaSerializer(lista_personas, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        if request.data['vehiculo_list']:
            car_list = request.data['vehiculo_list']
            id_persona = serializer.data['id']
            persona_insertada = Persona.objects.filter(pk=id_persona).get()
            for car in car_list:
                obj_vehiculo = Vehiculo()
                obj_vehiculo.modelo = car['modelo']
                obj_vehiculo.marca = car['marca']
                obj_vehiculo.anio = car['anio']
                obj_vehiculo.save()
                persona_insertada.vehiculos.add(obj_vehiculo)
            persona_insertada.save()
            serializer = PersonaSerializer(persona_insertada, many=False)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
