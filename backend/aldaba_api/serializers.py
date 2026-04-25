from rest_framework import serializers

from .models import (
    Alojamiento,
    EspacioEvento,
    Excursion,
    Habitacion,
    Gastronomia,
    InformacionEmpresa,
    LugarTuristico,
    Mesa,
    OtroServicio,
    ProyectoComunitario,
    Reserva,
    ReservaExcursion,
    ServicioCultural,
)


class LugarTuristicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LugarTuristico
        fields = (
            "id",
            "slug",
            "nombre",
            "categoria",
            "categoria_color",
            "foto",
            "foto_hero",
            "resumen",
            "descripcion",
            "horario",
            "entrada",
            "ubicacion",
            "distancia",
            "consejos",
            "created_at",
            "updated_at",
        )


class AlojamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alojamiento
        fields = (
            "id",
            "nombre",
            "descripcion",
            "amenidades",
            "habitaciones",
            "foto",
            "icono",
            "created_at",
            "updated_at",
        )


class GastronomiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gastronomia
        fields = (
            "id",
            "nombre",
            "descripcion",
            "oferta",
            "foto",
            "icono",
            "created_at",
            "updated_at",
        )


class ExcursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excursion
        fields = (
            "id",
            "nombre",
            "descripcion",
            "caracteristicas",
            "duracion",
            "foto",
            "icono",
            "created_at",
            "updated_at",
        )


class EspacioEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EspacioEvento
        fields = (
            "id",
            "nombre",
            "capacidad",
            "descripcion",
            "tipos_evento",
            "foto",
            "icono",
            "created_at",
            "updated_at",
        )


class ServicioCulturalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicioCultural
        fields = (
            "id",
            "nombre",
            "descripcion",
            "foto",
            "icono",
            "created_at",
            "updated_at",
        )


class OtroServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtroServicio
        fields = (
            "id",
            "nombre",
            "descripcion",
            "icono",
            "created_at",
            "updated_at",
        )


class ProyectoComunitarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProyectoComunitario
        fields = (
            "id",
            "titulo",
            "descripcion",
            "anio",
            "icono",
            "created_at",
            "updated_at",
        )


class InformacionEmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformacionEmpresa
        fields = (
            "id",
            "nombre",
            "tagline",
            "ubicacion",
            "descripcion",
            "mision",
            "valores",
            "direccion",
            "telefono",
            "email",
            "created_at",
            "updated_at",
        )


class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = (
            "id",
            "tipo",
            "establecimiento",
            "nombre_cliente",
            "email",
            "telefono",
            "fecha_inicio",
            "fecha_fin",
            "personas",
            "mensaje",
            "estado",
            "created_at",
            "updated_at",
        )


class HabitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitacion
        fields = (
            "id",
            "hostal",
            "foto",
            "numero",
            "tipo",
            "huespedes",
            "disponible",
            "precio",
            "reserva",
            "created_at",
            "updated_at",
        )


class ReservaExcursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservaExcursion
        fields = (
            "id",
            "nombre",
            "foto",
            "fecha",
            "hora",
            "personas",
            "guia",
            "precio",
            "estado",
            "created_at",
            "updated_at",
        )


class MesaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mesa
        fields = (
            "id",
            "restaurante",
            "foto",
            "numero",
            "capacidad",
            "ocupada",
            "reserva",
            "pago",
            "estado",
            "created_at",
            "updated_at",
        )
