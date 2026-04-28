from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


ROOM_TABLE_STATES = [
    ("Libre", "Libre"),
    ("Ocupada", "Ocupada"),
    ("Reservada", "Reservada"),
]


# ====== FRONTEND MODELS (Catalogos y contenido publico) ======


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


class Hostal(TimeStampedModel):
    nombre = models.CharField(max_length=180)
    foto = models.URLField(max_length=500)
    icono = models.CharField(max_length=80, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.nombre


class Restaurante(TimeStampedModel):
    nombre = models.CharField(max_length=180)
    icono = models.CharField(max_length=80, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.nombre


class Excursion(TimeStampedModel):
    destino = models.CharField(max_length=180)
    duracion = models.CharField(max_length=50, blank=True)
    foto = models.URLField(max_length=500, blank=True)
    icono = models.CharField(max_length=80, blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    personas = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.destino


class EspacioEvento(TimeStampedModel):
    nombre = models.CharField(max_length=180)
    capacidad = models.CharField(max_length=80)
    descripcion = models.TextField()
    tipos_evento = models.JSONField(default=list, blank=True)
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
    valores = models.JSONField(default=list, blank=True)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=80)
    email = models.EmailField(max_length=255)

    class Meta:
        ordering = ["id"]
        verbose_name = "Informacion de la empresa"
        verbose_name_plural = "Informacion de la empresa"

    def __str__(self) -> str:
        return self.nombre


# ====== BACKEND MODELS (Gestion interna del panel admin) ======


class Habitacion(TimeStampedModel):
    TIPOS = [
        ("Simple", "Simple"),
        ("Doble", "Doble"),
        ("Triple", "Triple"),
        ("Suite", "Suite"),
    ]

    foto = models.URLField(max_length=500, blank=True)
    hostal = models.ForeignKey(
        "Hostal",
        on_delete=models.PROTECT,
        related_name="habitaciones",
    )
    numero = models.CharField(max_length=3, unique=True)
    tipo = models.CharField(max_length=20, choices=TIPOS)
    estado = models.CharField(max_length=20, choices=ROOM_TABLE_STATES, default="Libre")
    precio = models.DecimalField(max_digits=8, decimal_places=2)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return f"Habitacion {self.numero}"


class ReservaExcursion(TimeStampedModel):
    ESTADOS = [
        ("Pendiente", "Pendiente"),
        ("Confirmada", "Confirmada"),
        ("Cancelada", "Cancelada"),
    ]

    nombre = models.CharField(max_length=200)
    foto = models.URLField(max_length=500, blank=True)
    fecha = models.DateField()
    hora = models.TimeField()
    personas = models.PositiveIntegerField()
    guia = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    estado = models.CharField(max_length=20, choices=ESTADOS, default="Pendiente")

    class Meta:
        ordering = ["-fecha", "-hora"]

    def __str__(self) -> str:
        return f"{self.nombre} — {self.fecha}"


class Mesa(TimeStampedModel):
    restaurante = models.ForeignKey(
        "Restaurante",
        on_delete=models.PROTECT,
        related_name="mesas",
    )
    
    ESTADOS = [
        ("Libre", "Libre"),
        ("Ocupada", "Ocupada"),
        
    ]
   
    foto = models.URLField(max_length=500, blank=True)
    numero = models.PositiveIntegerField(unique=True)
    capacidad = models.PositiveIntegerField()
    pago = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    precio = models.FloatField(default=0)
    estado = models.CharField(max_length=20, choices=ESTADOS, default="Libre")

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return f"{self.restaurante.nombre} — Mesa {self.numero}"
