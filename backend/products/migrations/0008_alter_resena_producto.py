# Generated by Django 5.1.4 on 2024-12-05 02:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_rename_reseña_to_resena'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resena',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resenas', to='products.producto'),
        ),
    ]