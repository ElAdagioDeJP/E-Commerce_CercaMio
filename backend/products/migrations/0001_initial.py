# Generated by Django 5.1.3 on 2024-11-22 03:11

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dimensiones',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ancho', models.DecimalField(decimal_places=2, max_digits=5)),
                ('alto', models.DecimalField(decimal_places=2, max_digits=5)),
                ('profundidad', models.DecimalField(decimal_places=2, max_digits=5)),
                ('peso', models.DecimalField(decimal_places=2, max_digits=5)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('telefono', models.CharField(blank=True, max_length=20, null=True)),
                ('direccion', models.CharField(blank=True, max_length=255, null=True)),
                ('fecha_nacimiento', models.DateField(blank=True, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='Los grupos a los que pertenece este usuario.', related_name='usuario_set', to='auth.group', verbose_name='grupos')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Permisos específicos para este usuario.', related_name='usuario_set', to='auth.permission', verbose_name='permisos de usuario')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=200)),
                ('descripcion', models.TextField()),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('descuento', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('stock', models.PositiveIntegerField()),
                ('categoria', models.CharField(max_length=100)),
                ('marca', models.CharField(max_length=100)),
                ('imagen', models.URLField()),
                ('informacion_envio', models.CharField(max_length=200)),
                ('estado_disponibilidad', models.CharField(max_length=50)),
                ('informacion_garantia', models.CharField(max_length=200)),
                ('politica_devolucion', models.CharField(max_length=200)),
                ('cantidad_minima', models.PositiveIntegerField()),
                ('sku', models.CharField(max_length=20, unique=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_actualizacion', models.DateTimeField(auto_now=True)),
                ('dimensiones', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='producto', to='products.dimensiones')),
            ],
        ),
        migrations.AddField(
            model_name='dimensiones',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dimensiones_producto', to='products.producto'),
        ),
        migrations.CreateModel(
            name='Reseña',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calificacion', models.PositiveSmallIntegerField()),
                ('comentario', models.TextField()),
                ('fecha', models.DateTimeField()),
                ('nombre_usuario', models.CharField(max_length=100)),
                ('email_usuario', models.EmailField(max_length=254)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reseñas', to='products.producto')),
            ],
        ),
    ]
