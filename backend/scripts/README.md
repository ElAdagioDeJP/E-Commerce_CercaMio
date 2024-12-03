## Notas

Para ejecutar varios de estos scripts, es necesario realizarlo de la
siguiente forma:

	python manage.py shell < scripts/el_script_a_ejecutar.py

Puede que tenga que vaciar las tablas antes de recargar los datos para
evitar problemas de registros duplicados:

	python manage.py shell
	>>> from products.models import *
	>>> Dimensiones.objects.all().delete()
	>>> exit()
