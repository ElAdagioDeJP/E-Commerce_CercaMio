from rest_framework import serializers
from .models import Usuario, Categoria, Producto, Dimensiones, Reseña


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'telefono', 'direccion', 'fecha_nacimiento']
        
        
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'descripcion']


class DimensionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimensiones
        fields = ['ancho', 'alto', 'profundidad', 'peso']


class ReseñaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reseña
        fields = ['id', 'calificacion', 'comentario', 'fecha', 'nombre_usuario', 'email_usuario']


class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    dimensiones = DimensionesSerializer(read_only=True)
    reseñas = ReseñaSerializer(many=True, read_only=True)

    class Meta:
        model = Producto
        fields = [
            'id', 'titulo', 'descripcion', 'precio', 'descuento', 'stock',
            'categoria', 'marca', 'imagen', 'dimensiones', 'informacion_envio',
            'estado_disponibilidad', 'informacion_garantia', 'politica_devolucion',
            'cantidad_minima', 'sku', 'fecha_creacion', 'fecha_actualizacion', 'reseñas'
        ]