from rest_framework import serializers
from .models import Usuario, Categoria, Producto, Dimensiones, Resena


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'email', 'telefono', 'direccion', 'fecha_nacimiento']
        
        
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'descripcion']


class DimensionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimensiones
        fields = ['ancho', 'alto', 'profundidad', 'peso']


class ResenaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resena
        fields = ['id', 'producto','calificacion', 'comentario', 'fecha', 'nombre_usuario', 'email_usuario']

class ProductoResenaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['calificacion', 'comentario', 'fecha', 'nombre_usuario', 'email_usuario']

class ProductoSerializer(serializers.ModelSerializer):
    categoria_id = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(), source='categoria'
    )
    dimensiones = DimensionesSerializer()  # Habilitar lectura y escritura
    resenas = ResenaSerializer(many=True, read_only=True)

    class Meta:
        model = Producto
        fields = [
            'id', 'titulo', 'descripcion', 'precio', 'descuento', 'stock',
            'categoria_id', 'marca', 'imagen', 'dimensiones',
            'estado_disponibilidad', 'politica_devolucion',
            'cantidad_minima', 'sku', 'fecha_creacion', 'fecha_actualizacion', 'resenas'
        ]

    def create(self, validated_data):
        dimensiones_data = validated_data.pop('dimensiones', None)
        producto = Producto.objects.create(**validated_data)
        if dimensiones_data:
            dimensiones = Dimensiones.objects.create(**dimensiones_data)
            producto.dimensiones = dimensiones
            producto.save()
        return producto

    def update(self, instance, validated_data):
        dimensiones_data = validated_data.pop('dimensiones', None)

        # Actualizar los campos del producto
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Manejar las dimensiones asociadas
        if dimensiones_data:
            if instance.dimensiones:
                # Actualizar dimensiones existentes
                for attr, value in dimensiones_data.items():
                    setattr(instance.dimensiones, attr, value)
                instance.dimensiones.save()
            else:
                # Crear nuevas dimensiones si no existen
                dimensiones = Dimensiones.objects.create(**dimensiones_data)
                instance.dimensiones = dimensiones
                instance.save()

        return instance