from django.db.models import Count, Sum
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

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
from .permissions import AllowCreateAnyOtherwiseStaff, IsStaffUser
from .serializers import (
    AlojamientoSerializer,
    EspacioEventoSerializer,
    ExcursionSerializer,
    HabitacionSerializer,
    GastronomiaSerializer,
    InformacionEmpresaSerializer,
    LugarTuristicoSerializer,
    MesaSerializer,
    OtroServicioSerializer,
    ProyectoComunitarioSerializer,
    ReservaExcursionSerializer,
    ReservaSerializer,
    ServicioCulturalSerializer,
)


class PublicReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]


class LugarTuristicoPublicViewSet(PublicReadOnlyViewSet):
    queryset = LugarTuristico.objects.all()
    serializer_class = LugarTuristicoSerializer
    lookup_field = "slug"
    search_fields = ["nombre", "categoria", "resumen"]
    ordering_fields = ["id", "nombre", "categoria"]


class AlojamientoPublicViewSet(PublicReadOnlyViewSet):
    queryset = Alojamiento.objects.all()
    serializer_class = AlojamientoSerializer
    search_fields = ["nombre", "descripcion"]
    ordering_fields = ["id", "nombre"]


class GastronomiaPublicViewSet(PublicReadOnlyViewSet):
    queryset = Gastronomia.objects.all()
    serializer_class = GastronomiaSerializer
    search_fields = ["nombre", "descripcion"]
    ordering_fields = ["id", "nombre"]


class ExcursionPublicViewSet(PublicReadOnlyViewSet):
    queryset = Excursion.objects.all()
    serializer_class = ExcursionSerializer
    search_fields = ["nombre", "descripcion"]
    ordering_fields = ["id", "nombre"]


class EspacioEventoPublicViewSet(PublicReadOnlyViewSet):
    queryset = EspacioEvento.objects.all()
    serializer_class = EspacioEventoSerializer
    search_fields = ["nombre", "descripcion"]
    ordering_fields = ["id", "nombre"]


class ServicioCulturalPublicViewSet(PublicReadOnlyViewSet):
    queryset = ServicioCultural.objects.all()
    serializer_class = ServicioCulturalSerializer
    search_fields = ["nombre", "descripcion"]
    ordering_fields = ["id", "nombre"]


class OtroServicioPublicViewSet(PublicReadOnlyViewSet):
    queryset = OtroServicio.objects.all()
    serializer_class = OtroServicioSerializer
    search_fields = ["nombre", "descripcion"]
    ordering_fields = ["id", "nombre"]


class ProyectoComunitarioPublicViewSet(PublicReadOnlyViewSet):
    queryset = ProyectoComunitario.objects.all()
    serializer_class = ProyectoComunitarioSerializer
    search_fields = ["titulo", "descripcion", "anio"]
    ordering_fields = ["id", "anio", "titulo"]


class InformacionEmpresaPublicViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = InformacionEmpresa.objects.all()
    serializer_class = InformacionEmpresaSerializer
    permission_classes = [AllowAny]
    ordering_fields = ["id", "nombre"]


class AdminModelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsStaffUser]


class LugarTuristicoAdminViewSet(AdminModelViewSet):
    queryset = LugarTuristico.objects.all()
    serializer_class = LugarTuristicoSerializer
    lookup_field = "slug"


class AlojamientoAdminViewSet(AdminModelViewSet):
    queryset = Alojamiento.objects.all()
    serializer_class = AlojamientoSerializer


class GastronomiaAdminViewSet(AdminModelViewSet):
    queryset = Gastronomia.objects.all()
    serializer_class = GastronomiaSerializer


class ExcursionAdminViewSet(AdminModelViewSet):
    queryset = Excursion.objects.all()
    serializer_class = ExcursionSerializer


class EspacioEventoAdminViewSet(AdminModelViewSet):
    queryset = EspacioEvento.objects.all()
    serializer_class = EspacioEventoSerializer


class ServicioCulturalAdminViewSet(AdminModelViewSet):
    queryset = ServicioCultural.objects.all()
    serializer_class = ServicioCulturalSerializer


class OtroServicioAdminViewSet(AdminModelViewSet):
    queryset = OtroServicio.objects.all()
    serializer_class = OtroServicioSerializer


class ProyectoComunitarioAdminViewSet(AdminModelViewSet):
    queryset = ProyectoComunitario.objects.all()
    serializer_class = ProyectoComunitarioSerializer


class InformacionEmpresaAdminViewSet(AdminModelViewSet):
    queryset = InformacionEmpresa.objects.all()
    serializer_class = InformacionEmpresaSerializer


class ReservaPublicViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [AllowCreateAnyOtherwiseStaff]
    http_method_names = ["post", "get", "head", "options"]
    ordering_fields = ["id", "created_at", "estado", "tipo"]


class HabitacionAdminViewSet(AdminModelViewSet):
    queryset = Habitacion.objects.all()
    serializer_class = HabitacionSerializer

    @action(detail=False, methods=["get"], url_path="estadisticas")
    def estadisticas(self, request):
        total = Habitacion.objects.count()
        disponibles = Habitacion.objects.filter(disponible=True).count()
        ocupadas = Habitacion.objects.filter(disponible=False).count()
        reservadas = Habitacion.objects.exclude(reserva="—").count()
        return Response(
            {
                "total": total,
                "disponibles": disponibles,
                "ocupadas": ocupadas,
                "reservadas": reservadas,
            }
        )


class ReservaExcursionAdminViewSet(AdminModelViewSet):
    queryset = ReservaExcursion.objects.all()
    serializer_class = ReservaExcursionSerializer

    @action(detail=False, methods=["get"], url_path="estadisticas")
    def estadisticas(self, request):
        total = ReservaExcursion.objects.count()
        por_estado = dict(
            ReservaExcursion.objects.values_list("estado")
            .annotate(total=Count("id"))
            .values_list("estado", "total")
        )
        return Response({"total": total, "por_estado": por_estado})


class MesaAdminViewSet(AdminModelViewSet):
    queryset = Mesa.objects.all()
    serializer_class = MesaSerializer

    @action(detail=False, methods=["get"], url_path="estadisticas")
    def estadisticas(self, request):
        total = Mesa.objects.count()
        libres = Mesa.objects.filter(estado="Libre").count()
        ocupadas = Mesa.objects.filter(estado="Ocupada").count()
        reservadas = Mesa.objects.filter(estado="Reservada").count()
        ingresos = Mesa.objects.aggregate(total=Sum("pago"))["total"] or 0
        return Response(
            {
                "total": total,
                "libres": libres,
                "ocupadas": ocupadas,
                "reservadas": reservadas,
                "ingresos": ingresos,
            }
        )
