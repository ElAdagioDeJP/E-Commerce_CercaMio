from django.db import models

# Producto
class Producto(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descuento = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    stock = models.PositiveIntegerField()

    # Información de categoría, marca e imágenes integradas dentro del Producto
    categoria = models.CharField(max_length=100)
    marca = models.CharField(max_length=100)
    imagen = models.URLField()

    dimensiones = models.OneToOneField('Dimensiones', on_delete=models.CASCADE, null=True, blank=True)
    informacion_envio = models.CharField(max_length=200)
    estado_disponibilidad = models.CharField(max_length=50)
    informacion_garantia = models.CharField(max_length=200)
    politica_devolucion = models.CharField(max_length=200)
    cantidad_minima = models.PositiveIntegerField()
    sku = models.CharField(max_length=20, unique=True)
    codigo_barras = models.CharField(max_length=50, blank=True, null=True)
    codigo_qr = models.URLField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo

# Imágenes del Producto dentro del modelo Producto
    


# Dimensiones del Producto
class Dimensiones(models.Model):
    ancho = models.DecimalField(max_digits=5, decimal_places=2)
    alto = models.DecimalField(max_digits=5, decimal_places=2)
    profundidad = models.DecimalField(max_digits=5, decimal_places=2)
    peso = models.DecimalField(max_digits=5, decimal_places=2)

# Etiquetas (Tags)
class Etiqueta(models.Model):
    nombre = models.CharField(max_length=50)
    productos = models.ManyToManyField(Producto, related_name='etiquetas')

    def __str__(self):
        return self.nombre

# Reseña del Producto
class Reseña(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='reseñas')
    calificacion = models.PositiveSmallIntegerField()
    comentario = models.TextField()
    fecha = models.DateTimeField()
    nombre_usuario = models.CharField(max_length=100)
    email_usuario = models.EmailField()

    def __str__(self):
        return f"{self.nombre_usuario} - {self.calificacion}"

