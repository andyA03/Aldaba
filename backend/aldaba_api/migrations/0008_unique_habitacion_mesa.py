from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("aldaba_api", "0007_rename_alojamiento_hostal"),
    ]

    operations = [
        migrations.AlterField(
            model_name="habitacion",
            name="numero",
            field=models.CharField(max_length=3),
        ),
        migrations.AlterField(
            model_name="mesa",
            name="numero",
            field=models.PositiveIntegerField(),
        ),
        migrations.AddConstraint(
            model_name="habitacion",
            constraint=models.UniqueConstraint(fields=["hostal", "numero"], name="unique_habitacion_hostal_numero"),
        ),
        migrations.AddConstraint(
            model_name="mesa",
            constraint=models.UniqueConstraint(fields=["restaurante", "numero"], name="unique_mesa_restaurante_numero"),
        ),
    ]
