from rest_framework import serializers, viewsets

from mercado.models import Empresa

class EmpresaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class EmpresaViewSet(viewsets.ModelViewSet):
    serializer_class = EmpresaSerializers
    queryset = Empresa.objects.all()
