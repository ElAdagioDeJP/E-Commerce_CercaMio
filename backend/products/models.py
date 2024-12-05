from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class Usuario(AbstractUser):
    telefono = models.CharField(max_length=20, blank=True, null=True)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
        # Agregar related_name a los campos de grupos y permisos
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='usuario_set',
        blank=True,
        help_text='Los grupos a los que pertenece este usuario.',
        verbose_name='grupos'
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='usuario_set',
        blank=True,
        help_text='Permisos específicos para este usuario.',
        verbose_name='permisos de usuario'
    )

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=20, decimal_places=2)
    descuento = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    stock = models.PositiveIntegerField()
    categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE, related_name='productos')
    marca = models.CharField(max_length=100)
    imagen = models.URLField(max_length=500)
    dimensiones = models.ForeignKey('Dimensiones', on_delete=models.CASCADE, null=True, blank=True, related_name='producto')
    estado_disponibilidad = models.CharField(max_length=50)
    politica_devolucion = models.CharField(max_length=200)
    cantidad_minima = models.PositiveIntegerField()
    sku = models.CharField(max_length=20, unique=True)
    #vendedor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="productos_ofrecidos")
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo


class Dimensiones(models.Model):
    ancho = models.DecimalField(max_digits=5, decimal_places=2)
    alto = models.DecimalField(max_digits=5, decimal_places=2)
    profundidad = models.DecimalField(max_digits=5, decimal_places=2)
    peso = models.DecimalField(max_digits=5, decimal_places=2)
    def __str__(self):
        return f'{self.ancho} x {self.alto} x {self.profundidad}'
    # Aquí se añade related_name para evitar conflictos


class Resena(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='resenas')
    calificacion = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(1),  # Valor mínimo permitido
            MaxValueValidator(5)   # Valor máximo permitido
        ]
    )
    comentario = models.TextField()
    fecha = models.DateTimeField()
    nombre_usuario = models.CharField(max_length=100)
    email_usuario = models.EmailField()

    def __str__(self):
        return f'{self.calificacion} por {self.nombre_usuario} del producto {self.producto}'





