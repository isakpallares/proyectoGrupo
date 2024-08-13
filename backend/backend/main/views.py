from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Propiedad, Unidad, Propietario, Inquilino, CuotaMantenimiento, GastoComun, Pago, ContratoServicio
from .serializers import PropiedadSerializer, UnidadSerializer, PropietarioSerializer, InquilinoSerializer, CuotaMantenimientoSerializer, GastoComunSerializer, PagoSerializer, ContratoServicioSerializer


# ViewSet para Propiedad
class PropiedadViewSet(viewsets.ModelViewSet):
    queryset = Propiedad.objects.all()
    serializer_class = PropiedadSerializer

# ViewSet para Unidad
class UnidadViewSet(viewsets.ModelViewSet):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer

# ViewSet para Propietario
class PropietarioViewSet(viewsets.ModelViewSet):
    queryset = Propietario.objects.all()
    serializer_class = PropietarioSerializer

class PropietarioCreateView(APIView):
    def post(self, request, *args, **kwargs):
        documento_identidad = request.data.get('documento_identidad', None)
        if Propietario.objects.filter(documento_identidad=documento_identidad).exists():
            return Response(
                {"error": "Ya existe un propietario con este documento de identidad."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = PropietarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# ViewSet para Inquilino
class InquilinoViewSet(viewsets.ModelViewSet):
    queryset = Inquilino.objects.all()
    serializer_class = InquilinoSerializer

# ViewSet para CuotaMantenimiento
class CuotaMantenimientoViewSet(viewsets.ModelViewSet):
    queryset = CuotaMantenimiento.objects.all()
    serializer_class = CuotaMantenimientoSerializer

# ViewSet para GastoComun
class GastoComunViewSet(viewsets.ModelViewSet):
    queryset = GastoComun.objects.all()
    serializer_class = GastoComunSerializer

# ViewSet para Pago
class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

# ViewSet para ContratoServicio
class ContratoServicioViewSet(viewsets.ModelViewSet):
    queryset = ContratoServicio.objects.all()
    serializer_class = ContratoServicioSerializer
