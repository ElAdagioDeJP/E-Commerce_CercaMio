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
    resenas = producto.get('reviews')
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
    if resenas is None: break
    for resena in resenas:
        nuevo.resenas.create(
            calificacion = resena['rating'],
            comentario = resena['comment'],
            fecha = datetime.fromisoformat(resena['date']),
            nombre_usuario = resena['reviewerName'],
            email_usuario = resena['reviewerEmail']
        )
