from rest_framework import viewsets, permissions
from .models import Producto, Categoria, Resena, Dimensiones, Usuario
from .serializers import (
    ProductoSerializer, 
    CategoriaSerializer, 
    ResenaSerializer, 
    DimensionesSerializer, 
    UsuarioSerializer
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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

class ProductoResenasAPIView(APIView):
    """
    Vista para obtener las reseñas asociadas a un producto.
    """
    def get(self, request, producto_id):
        try:
            producto = Producto.objects.get(id=producto_id)
            resenas = producto.resenas.all()  # Accede a las reseñas relacionadas
            serializer = ResenaSerializer(resenas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Producto.DoesNotExist:
            return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)
    def post(self, request, producto_id):
        try:
            producto = Producto.objects.get(id=producto_id)
        except Producto.DoesNotExist:
            return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        data = request.data
        data['producto'] = producto.id

        serializer = ResenaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()  # Guarda la reseña en la base de datos
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)