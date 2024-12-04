from .models import Producto, Categoria, Resena, Dimensiones, Usuario
from rest_framework import viewsets , permissions
from .serializers import ProductoSerializer, CategoriaSerializer, ResenaSerializer, DimensionesSerializer, UsuarioSerializer
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

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

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UsuarioSerializer
    @action(detail=False, methods=['post'], url_path='verificar-usuario')
    def verificar_usuario(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {"error": "Se requieren ambos campos: email y password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            usuario = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            return Response(
                {"error": "Usuario no encontrado."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if check_password(password, usuario.password):
            return Response(
                {"message": "Usuario autenticado con éxito."},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Contraseña incorrecta."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

    
# Compare this snippet from backend/products/urls.py: