from rest_framework import routers
from django.urls import path, include
from .views import ProductoViewSet, CategoriaViewSet, ResenaViewSet, DimensionesViewSet, UsuarioViewSet, ProductoResenasAPIView

# Instancia del router
router = routers.DefaultRouter()

# Registramos cada ViewSet sin el prefijo 'api' en la URL
router.register('api/productos', ProductoViewSet, basename='producto')
router.register('api/categorias', CategoriaViewSet, basename='categoria')
router.register('api/resenas', ResenaViewSet, basename='resena')
router.register('api/dimensiones', DimensionesViewSet, basename='dimensiones')
router.register('api/usuarios', UsuarioViewSet, basename='usuario')

# Incluimos las rutas generadas
urlpatterns = [
    path('', include(router.urls)),  # Asegúrate de que todas las rutas estén bajo el prefijo 'api/'
    path('api/productos/<int:producto_id>/resenas/', ProductoResenasAPIView.as_view(), name='producto-resenas'),
]
