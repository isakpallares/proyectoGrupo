from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Propiedad, Unidad, Inquilino, CuotaMantenimiento, Pago, ContratoServicio
from .serializers import PropiedadSerializer, UnidadSerializer, InquilinoSerializer, CuotaMantenimientoSerializer,  PagoSerializer, ContratoServicioSerializer


# ViewSet para Propiedad
class PropiedadViewSet(viewsets.ModelViewSet):
    queryset = Propiedad.objects.all()
    serializer_class = PropiedadSerializer

# ViewSet para Unidad
class UnidadViewSet(viewsets.ModelViewSet):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer


# ViewSet para Inquilino
class InquilinoViewSet(viewsets.ModelViewSet):
    queryset = Inquilino.objects.all()
    serializer_class = InquilinoSerializer

class InquilinoCreateView(APIView):
    def post(self, request, *args, **kwargs):
        documento_identidad = request.data.get('documento_identidad', None)
        if Inquilino.objects.filter(documento_identidad=documento_identidad).exists():
            return Response(
                {"error": "Ya existe un propietario con este documento de identidad."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = InquilinoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ViewSet para CuotaMantenimiento
class CuotaMantenimientoViewSet(viewsets.ModelViewSet):
    queryset = CuotaMantenimiento.objects.all()
    serializer_class = CuotaMantenimientoSerializer

# ViewSet para Pago
class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

# ViewSet para ContratoServicio
class ContratoServicioViewSet(viewsets.ModelViewSet):
    queryset = ContratoServicio.objects.all()
    serializer_class = ContratoServicioSerializer
