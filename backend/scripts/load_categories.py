from products.models import Categoria
import json

with open('categories.json') as archivo:
    categorias = json.load(archivo)

# En caso de tener que vaciar la base de datos primero
#Categoria.objects.all().delete()
Categoria.objects.bulk_create(
    Categoria(nombre=categoria['name']) for categoria in categorias)
