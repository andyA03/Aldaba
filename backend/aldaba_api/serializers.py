from rest_framework import serializers

from .models import (
    Alojamiento,
    EspacioEvento,
    Excursion,
    Habitacion,
    Restaurante,
    InformacionEmpresa,
    LugarTuristico,
    Mesa,
    OtroServicio,
    ProyectoComunitario,
    ReservaExcursion,
    ServicioCultural,
)


# ====== FRONTEND SERIALIZERS (Catalogos y contenido publico) ======


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
    habitaciones_count = serializers.SerializerMethodField()

    def get_habitaciones_count(self, obj):
        return obj.habitaciones.count()

    class Meta:
        model = Alojamiento
        fields = (
            "id",
            "nombre",
            "foto",
            "icono",
            "habitaciones_count",
            "created_at",
            "updated_at",
        )


class RestauranteSerializer(serializers.ModelSerializer):
    mesas_count = serializers.SerializerMethodField()

    def get_mesas_count(self, obj):
        return obj.mesas.count()

    class Meta:
        model = Restaurante
        fields = (
            "id",
            "nombre",
            "icono",
            "mesas_count",
            "created_at",
            "updated_at",
        )


class ExcursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excursion
        fields = (
            "id",
            "destino",
            "duracion",
            "foto",
            "icono",
            "precio",
            "personas",
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


# ====== BACKEND SERIALIZERS (Gestion interna del panel admin) ======


class HabitacionSerializer(serializers.ModelSerializer):
    hostal_id = serializers.IntegerField(source="hostal.id", read_only=True)
    hostal_nombre = serializers.CharField(source="hostal.nombre", read_only=True)

    class Meta:
        model = Habitacion
        fields = (
            "id",
            "foto",
            "hostal_id",
            "hostal_nombre",
            "numero",
            "tipo",
            "estado",
            "precio",
            "created_at",
            "updated_at",
        )


class MesaSerializer(serializers.ModelSerializer):
    restaurante_id = serializers.IntegerField(source="restaurante.id", read_only=True)
    restaurante_nombre = serializers.CharField(source="restaurante.nombre", read_only=True)

    class Meta:
        model = Mesa
        fields = (
            "id",
            "restaurante_id",
            "restaurante_nombre",
            "foto",
            "numero",
            "capacidad",
            "pago",
            "precio",
            "estado",
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
