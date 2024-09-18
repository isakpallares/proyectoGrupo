from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from django.utils import timezone
from .models import Propiedad, Unidad, Pago, Usuario
from .serializers import PropiedadSerializer, UnidadSerializer,  PagoSerializer, UsuarioSerializer
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.hashers import check_password


class PropiedadViewSet(viewsets.ModelViewSet):
    queryset = Propiedad.objects.all()
    serializer_class = PropiedadSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        propiedad = serializer.save()

        numero_unidades = serializer.validated_data.get('numero_unidades')
        presupuesto_anual = serializer.validated_data.get('Presupuesto')
        cuota = serializer.validated_data.get('cuota')

        if numero_unidades is None or presupuesto_anual is None or cuota is None:
            return Response(
                {"detail": "Faltan datos necesarios para crear la propiedad."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        coeficiente = (presupuesto_anual * cuota / 100) / 12

        for i in range(1, numero_unidades + 1):
            try:
                Unidad.objects.create(
                    id_propiedad=propiedad,
                    numero_unidad=i,
                    coeficiente=coeficiente,
                )
            except Exception as e:
                return Response(
                    {"detail": f"Error al crear unidad: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        

# ViewSet para Unidad
class UnidadViewSet(viewsets.ModelViewSet):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer
    def perform_create(self, serializer):
        numeroUnidad = serializer.validated_data.get('numero_unidad', None)
        if Unidad.objects.filter(numero_unidad=numeroUnidad).exists():
            raise ValidationError("Ya existe esta unidad.")
        serializer.save()

    def update(self, request, *args, **kwargs):
        try:
            unidad = Unidad.objects.get(numero_unidad=kwargs['pk'])
            serializer = self.get_serializer(unidad, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        except Unidad.DoesNotExist:
            return Response({'error': 'No unidad matches the given query'}, status=status.HTTP_404_NOT_FOUND)
      
    

    
# ViewSet para Pago

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    
    def create(self, request, *args, **kwargs):
        fecha_pago = request.data.get('fecha_pago')
        
        if fecha_pago:
            fecha_pago = timezone.datetime.strptime(fecha_pago, '%Y-%m-%d').date()
            if fecha_pago < timezone.now().date():
                raise ValidationError({"detail": "El pago ya ha vencido."})
        
        return super().create(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        fecha_pago = request.data.get('fecha_pago')

        if fecha_pago:
            fecha_pago = timezone.datetime.strptime(fecha_pago, '%Y-%m-%d').date()
            if fecha_pago < timezone.now().date():
                raise ValidationError({"detail": "El pago ya ha vencido y no puede ser actualizado."})

        return super().update(request, *args, **kwargs)




class usuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
