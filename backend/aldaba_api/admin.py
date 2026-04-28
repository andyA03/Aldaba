from django.contrib import admin

from .models import (
    Hostal,
    EspacioEvento,
    Excursion,
    Restaurante,
    Habitacion,
    InformacionEmpresa,
    LugarTuristico,
    Mesa,
    OtroServicio,
    ProyectoComunitario,
    ReservaExcursion,
    ServicioCultural,
)


@admin.register(LugarTuristico)
class LugarTuristicoAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "categoria", "slug")
    search_fields = ("nombre", "categoria", "slug")
    list_filter = ("categoria",)


admin.site.register(
    [
        Hostal,
        Restaurante,
        Excursion,
        EspacioEvento,
        ServicioCultural,
        OtroServicio,
        ProyectoComunitario,
        InformacionEmpresa,
        Habitacion,
        ReservaExcursion,
        Mesa,
    ]
)
