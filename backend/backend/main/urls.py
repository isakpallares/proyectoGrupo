from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropiedadViewSet, UnidadViewSet, InquilinoViewSet, CuotaMantenimientoViewSet, GastoComunViewSet, PagoViewSet, ContratoServicioViewSet, PropietarioViewSet, PropietarioCreateView

router = DefaultRouter()
router.register(r'propiedad', PropiedadViewSet)
router.register(r'unidad', UnidadViewSet)
router.register(r'inquilino', InquilinoViewSet)
router.register(r'cuotamantenimiento', CuotaMantenimientoViewSet)
router.register(r'pago', PagoViewSet)
router.register(r'contratoservicio', ContratoServicioViewSet)
router.register(r'propietario', PropietarioViewSet)
router.register(r'gastoComun', GastoComunViewSet)
router.register(r'propietario', PropietarioCreateView)

urlpatterns = [
    path('api/', include(router.urls)),
]