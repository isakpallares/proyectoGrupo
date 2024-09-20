from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from django.utils import timezone
from .models import Propiedad, Unidad, Pago, Usuario
from .serializers import PropiedadSerializer, UnidadSerializer,  PagoSerializer, UsuarioSerializer
import json
from django.http import JsonResponse
from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view

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

        
    @action(detail=True, methods=['patch'])
    def cambiar_estado(self, request, pk=None):
        try:
            unidad = self.get_object()
            # Cambiar el estado de la unidad
            nuevo_estado = request.data.get('estado', False)
            unidad.estado = nuevo_estado
            unidad.save()
            return Response({'status': 'Estado actualizado correctamente'}, status=status.HTTP_200_OK)
        except Unidad.DoesNotExist:
            return Response({'error': 'Unidad no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    

    
# ViewSet para Pago

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    
    @action(detail=True, methods=['patch'])
    def cambiar_estado(self, request, pk=None):
        pago = self.get_object()
        pago.estado = not pago.estado  # Cambiar el estado
        pago.save()
        return Response({'estado': pago.estado})

    def create(self, request, *args, **kwargs):
        fecha_pago = request.data.get('fecha_pago')
        
        if fecha_pago:
            fecha_pago = timezone.datetime.strptime(fecha_pago, '%Y-%m-%d').date()
        
        return super().create(request, *args, **kwargs)
    




class usuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    usuarios = Usuario.objects.filter(email=email)

    if usuarios.exists():
        if usuarios.count() > 1:
            return Response({'exists': False, 'message': 'Hay múltiples usuarios con este correo. Contacta al soporte.'}, status=status.HTTP_400_BAD_REQUEST)

        usuario = usuarios.first()  

        if usuario.password == password:
            return Response({'exists': True, 'message': 'Usuario autenticado correctamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'exists': False, 'message': 'Contraseña incorrecta'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'exists': False, 'message': 'El usuario no existe'}, status=status.HTTP_400_BAD_REQUEST)

