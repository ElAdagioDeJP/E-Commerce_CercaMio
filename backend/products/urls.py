from rest_framework import routers
from django.urls import path, include
from .views import ProductoViewSet, CategoriaViewSet, ResenaViewSet, DimensionesViewSet, UsuarioViewSet

# Instancia del router
router = routers.DefaultRouter()

# Registramos cada ViewSet sin el prefijo 'api' en la URL
router.register('productos', ProductoViewSet, basename='producto')
router.register('categorias', CategoriaViewSet, basename='categoria')
router.register('resenas', ResenaViewSet, basename='resena')
router.register('dimensiones', DimensionesViewSet, basename='dimensiones')
router.register('usuarios', UsuarioViewSet, basename='usuario')

# Incluimos las rutas generadas
urlpatterns = [
    path('api/', include(router.urls)),  # Asegúrate de que todas las rutas estén bajo el prefijo 'api/'
]
