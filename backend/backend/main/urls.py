from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropiedadViewSet, UnidadViewSet, PropietarioViewSet, CuotaMantenimientoViewSet, PagoViewSet, ContratoServicioViewSet, PresupuestoViewSet

router = DefaultRouter()
router.register(r'propiedades', PropiedadViewSet)
router.register(r'unidades', UnidadViewSet)
router.register(r'inquilinos', PropietarioViewSet)
router.register(r'cuotaMantenimiento', CuotaMantenimientoViewSet)
router.register(r'pagos', PagoViewSet)
router.register(r'contratoServicios', ContratoServicioViewSet)
router.register(r'presupuesto', PresupuestoViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]