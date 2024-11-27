from .models import Producto, Categoria, Reseña, Dimensiones, Usuario
from rest_framework import viewsets , permissions
from .serializers import ProductoSerializer, CategoriaSerializer, ReseñaSerializer, DimensionesSerializer, UsuarioSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProductoSerializer
    
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CategoriaSerializer

class ReseñaViewSet(viewsets.ModelViewSet):
    queryset = Reseña.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ReseñaSerializer

class DimensionesViewSet(viewsets.ModelViewSet):
    queryset = Dimensiones.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DimensionesSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UsuarioSerializer
    
# Compare this snippet from backend/products/urls.py: