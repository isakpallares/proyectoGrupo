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


# ViewSet para Propiedad
class PropiedadViewSet(viewsets.ModelViewSet):
    queryset = Propiedad.objects.all()
    serializer_class = PropiedadSerializer
    def perform_create(self, serializer):
        direccion = serializer.validated_data.get('direccion_propiedad',None)
        if Propiedad.objects.filter(direccion_propiedad=direccion).exists():
            raise ValidationError("Ya existe esta propiedad.")
        serializer.save()

# ViewSet para Unidad
class UnidadViewSet(viewsets.ModelViewSet):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer
    def perform_create(self, serializer):
        numeroUnidad = serializer.validated_data.get('numero_unidad', None)
        if Unidad.objects.filter(numero_unidad=numeroUnidad).exists():
            raise ValidationError("Ya existe esta unidad.")
        serializer.save()
      
    

    
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


@csrf_exempt
@require_POST
def login_usuario(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        contraseña = data.get('password')  # Asegúrate de que este nombre coincida con el nombre del campo en el frontend
        
        # Busca al usuario en la base de datos
        usuario = Usuario.objects.filter(email=email).first()

        if usuario and check_password(contraseña, usuario.contraseña):  # Verifica la contraseña
            return JsonResponse({"exists": True}, status=200)
        else:
            return JsonResponse({"exists": False}, status=400)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Datos JSON inválidos"}, status=400)