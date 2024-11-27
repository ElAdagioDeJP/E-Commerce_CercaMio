from rest_framework import routers
from django.urls import path, include
from .views import (
    ProductoViewSet,
    CategoriaViewSet,
    ReseñaViewSet,
    DimensionesViewSet,
    UsuarioViewSet
)

# Instancia del router
router = routers.DefaultRouter()

# Registramos cada ViewSet
router.register('api/productos', ProductoViewSet, basename='producto')
router.register('api/categorias', CategoriaViewSet, basename='categoria')
router.register('api/reseñas', ReseñaViewSet, basename='reseña')
router.register('api/dimensiones', DimensionesViewSet, basename='dimensiones')
router.register('api/usuarios', UsuarioViewSet, basename='usuario')

# Incluimos las rutas generadas
urlpatterns = router.urls
