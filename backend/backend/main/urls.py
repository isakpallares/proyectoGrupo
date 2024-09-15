from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropiedadViewSet, UnidadViewSet,PagoViewSet, UsuarioViewSet

router = DefaultRouter()
router.register(r'propiedades', PropiedadViewSet)
router.register(r'unidades', UnidadViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'pagos', PagoViewSet)

urlpatterns = [ 
    path('api/', include(router.urls)),
]