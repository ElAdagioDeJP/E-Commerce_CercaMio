from products.models import Producto, Dimensiones, Categoria
from datetime import datetime
import json

with open('products.json') as archivo:
    productos = json.load(archivo)['products']

with open('categories.json') as archivo:
    categorias_json = json.load(archivo)

categorias = {}

for categoria in categorias_json:
    categorias[categoria['slug']] = Categoria.objects.get(nombre=categoria['name']).pk

del categorias_json

for producto in productos:
    dimensiones = producto.get('dimensions')
    reseñas = producto.get('reviews')
    nuevo = Producto(
        titulo = producto['title'],
        descripcion = producto['description'],
        precio = producto['price'],
        descuento = producto.get('discountPercentage'),
        stock = producto['stock'],
        categoria_id = categorias[producto['category']],
        marca = producto.get('brand', ''),
        dimensiones = Dimensiones.objects.create(
            ancho = dimensiones['width'],
            alto = dimensiones['height'],
            profundidad = dimensiones['depth'],
            peso = producto['weight']
        ) if dimensiones is not None else None,
        estado_disponibilidad = producto.get('availabilityStatus', ''),
        politica_devolucion = producto.get('returnPolicy', ''),
        cantidad_minima = producto.get('minimumOrderQuantity', 0),
        sku = producto['sku']
    )
    nuevo.save()
    if reseñas is None: break
    for reseña in reseñas:
        nuevo.reseñas.create(
            calificacion = reseña['rating'],
            comentario = reseña['comment'],
            fecha = datetime.fromisoformat(reseña['date']),
            nombre_usuario = reseña['reviewerName'],
            email_usuario = reseña['reviewerEmail']
        )
