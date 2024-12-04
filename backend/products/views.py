from rest_framework import viewsets, permissions
from .models import Producto, Categoria, Resena, Dimensiones, Usuario
from .serializers import (
    ProductoSerializer, 
    CategoriaSerializer, 
    ResenaSerializer, 
    DimensionesSerializer, 
    UsuarioSerializer
)

# Vistas para Producto
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    permission_classes = [permissions.AllowAny]  # Permitir acceso público (ajustar según necesidad)
    serializer_class = ProductoSerializer

# Vistas para Categoria
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CategoriaSerializer

# Vistas para Reseña
class ResenaViewSet(viewsets.ModelViewSet):
    queryset = Resena.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ResenaSerializer

# Vistas para Dimensiones
class DimensionesViewSet(viewsets.ModelViewSet):
    queryset = Dimensiones.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = DimensionesSerializer

# Vistas para Usuario
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UsuarioSerializer
