from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropiedadViewSet, UnidadViewSet,PagoViewSet, usuarioViewSet

router = DefaultRouter()
router.register(r'propiedades', PropiedadViewSet)
router.register(r'unidades', UnidadViewSet)
router.register(r'pagos', PagoViewSet)
router.register(r'usuarios', usuarioViewSet)


urlpatterns = [ 
    path('api/', include(router.urls)),

]
