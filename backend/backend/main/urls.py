from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropiedadViewSet, UnidadViewSet, InquilinoViewSet, CuotaMantenimientoViewSet, PagoViewSet, ContratoServicioViewSet

router = DefaultRouter()
router.register(r'propiedades', PropiedadViewSet)
router.register(r'unidades', UnidadViewSet)
router.register(r'inquilinos', InquilinoViewSet)
router.register(r'cuotaMantenimiento', CuotaMantenimientoViewSet)
router.register(r'pagos', PagoViewSet)
router.register(r'contratoServicios', ContratoServicioViewSet)
# router.register(r'propietario', PropietarioCreateView)

urlpatterns = [
    path('api/', include(router.urls)),
]