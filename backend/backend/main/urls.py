from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropiedadViewSet, UnidadViewSet,PagoViewSet, login_usuario

router = DefaultRouter()
router.register(r'propiedades', PropiedadViewSet)
router.register(r'unidades', UnidadViewSet)
router.register(r'pagos', PagoViewSet)

urlpatterns = [ 
    path('api/', include(router.urls)),
    path('api/usuarios/', login_usuario, name='login_usuario'),
]
