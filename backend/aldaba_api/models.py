from django.contrib.postgres.fields import ArrayField
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class LugarTuristico(TimeStampedModel):
    CATEGORIAS = [
        ("Patrimonio", "Patrimonio"),
        ("UNESCO", "UNESCO"),
        ("Naturaleza", "Naturaleza"),
        ("Cultura", "Cultura"),
        ("Costa", "Costa"),
    ]

    slug = models.SlugField(max_length=120, unique=True)
    nombre = models.CharField(max_length=180)
    categoria = models.CharField(max_length=20, choices=CATEGORIAS)
    categoria_color = models.CharField(max_length=20, default="#1B4F8A")
    foto = models.URLField(max_length=500)
    foto_hero = models.URLField(max_length=500)
    resumen = models.TextField()
    descripcion = models.TextField()
    horario = models.CharField(max_length=160)
    entrada = models.CharField(max_length=160)
    ubicacion = models.CharField(max_length=255)
    distancia = models.CharField(max_length=120)
    consejos = models.TextField(blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.nombre


class Alojamiento(TimeStampedModel):
    nombre = models.CharField(max_length=180)
    descripcion = models.TextField()
    amenidades = ArrayField(models.CharField(max_length=180), default=list, blank=True)
    habitaciones = models.CharField(max_length=100)
    foto = models.URLField(max_length=500)
    icono = models.CharField(max_length=80, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.nombre


class Gastronomia(TimeStampedModel):
    nombre = models.CharField(max_length=180)
    descripcion = models.TextField()
    oferta = ArrayField(models.CharField(max_length=220), default=list, blank=True)
    foto = models.URLField(max_length=500)
    icono = models.CharField(max_length=80, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.nombre


class Excursion(TimeStampedModel):
    nombre = models.CharField(max_length=180)
    descripcion = models.TextField()
    caracteristicas = ArrayField(models.CharField(max_length=220), default=list, blank=True)
    foto = models.URLField(max_length=500, blank=True)
    icono = models.CharField(max_length=80, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.nombre


class EspacioEvento(TimeStampedModel):
    nombre = models.CharField(max_length=180)
    capacidad = models.CharField(max_length=80)
    descripcion = models.TextField()
    tipos_evento = ArrayField(models.CharField(max_length=120), default=list, blank=True)
    foto = models.URLField(max_length=500, blank=True)
    icono = models.CharField(max_length=80, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.nombre


class ServicioCultural(TimeStampedModel):
    nombre = models.CharField(max_length=180)
    descripcion = models.TextField()
    foto = models.URLField(max_length=500, blank=True)
    icono = models.CharField(max_length=80, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.nombre


class OtroServicio(TimeStampedModel):
    nombre = models.CharField(max_length=180)
    descripcion = models.TextField()
    icono = models.CharField(max_length=80, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.nombre


class ProyectoComunitario(TimeStampedModel):
    titulo = models.CharField(max_length=180)
    descripcion = models.TextField()
    anio = models.CharField(max_length=10)
    icono = models.CharField(max_length=80, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return f"{self.anio} - {self.titulo}"


class InformacionEmpresa(TimeStampedModel):
    nombre = models.CharField(max_length=180)
    tagline = models.CharField(max_length=255)
    ubicacion = models.CharField(max_length=255)
    descripcion = models.TextField()
    mision = models.TextField()
    valores = ArrayField(models.CharField(max_length=120), default=list, blank=True)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=80)
    email = models.EmailField(max_length=255)

    class Meta:
        verbose_name = "Informacion de la empresa"
        verbose_name_plural = "Informacion de la empresa"

    def __str__(self) -> str:
        return self.nombre
