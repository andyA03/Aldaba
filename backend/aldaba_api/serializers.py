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
        fields = "__all__"


class AlojamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alojamiento
        fields = "__all__"


class GastronomiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gastronomia
        fields = "__all__"


class ExcursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excursion
        fields = "__all__"


class EspacioEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EspacioEvento
        fields = "__all__"


class ServicioCulturalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicioCultural
        fields = "__all__"


class OtroServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtroServicio
        fields = "__all__"


class ProyectoComunitarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProyectoComunitario
        fields = "__all__"


class InformacionEmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformacionEmpresa
        fields = "__all__"


class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = "__all__"


class HabitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitacion
        fields = "__all__"


class ReservaExcursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservaExcursion
        fields = "__all__"


class MesaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mesa
        fields = "__all__"
