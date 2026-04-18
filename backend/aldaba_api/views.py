from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny

from .models import (
    Alojamiento,
    EspacioEvento,
    Excursion,
    Gastronomia,
    InformacionEmpresa,
    LugarTuristico,
    OtroServicio,
    ProyectoComunitario,
    ServicioCultural,
)
from .permissions import IsStaffUser
from .serializers import (
    AlojamientoSerializer,
    EspacioEventoSerializer,
    ExcursionSerializer,
    GastronomiaSerializer,
    InformacionEmpresaSerializer,
    LugarTuristicoSerializer,
    OtroServicioSerializer,
    ProyectoComunitarioSerializer,
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
