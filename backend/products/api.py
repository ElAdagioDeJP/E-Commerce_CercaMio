from .models import Producto, Categoria, Resena, Dimensiones, Usuario
from rest_framework import viewsets, permissions, status
from .serializers import (
    ProductoSerializer,
    CategoriaSerializer,
    ResenaSerializer,
    DimensionesSerializer,
    UsuarioSerializer,
)
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView


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

class ResenaViewSet(viewsets.ModelViewSet):
    queryset = Resena.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ResenaSerializer

class DimensionesViewSet(viewsets.ModelViewSet):
    queryset = Dimensiones.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DimensionesSerializer

class ProductoResenasAPIView(APIView):
    def get(self, request, producto_id):
        try:
            producto = Producto.objects.get(id=producto_id)
            resenas = producto.resenas.all()
            serializer = ResenaSerializer(resenas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Producto.DoesNotExist:
            return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UsuarioSerializer

    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        """
        Verifica si un usuario con el email y password existe.
        """
        email = request.data.get("email")
        password = request.data.get("password")
        
        if not email or not password:
            return Response(
                {"error": "Email y contraseña son requeridos"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(username=email, password=password)
        if user:
            return Response({"message": "Usuario autenticado exitosamente"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

