from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AlojamientoAdminViewSet,
    AlojamientoPublicViewSet,
    EspacioEventoAdminViewSet,
    EspacioEventoPublicViewSet,
    ExcursionAdminViewSet,
    ExcursionPublicViewSet,
    RestauranteAdminViewSet,
    RestaurantePublicViewSet,
    HabitacionAdminViewSet,
    InformacionEmpresaAdminViewSet,
    InformacionEmpresaPublicViewSet,
    LugarTuristicoAdminViewSet,
    LugarTuristicoPublicViewSet,
    MesaAdminViewSet,
    OtroServicioAdminViewSet,
    OtroServicioPublicViewSet,
    ProyectoComunitarioAdminViewSet,
    ProyectoComunitarioPublicViewSet,
    ReservaExcursionAdminViewSet,
    ServicioCulturalAdminViewSet,
    ServicioCulturalPublicViewSet,
)


public_router = DefaultRouter()
public_router.register(r"lugares", LugarTuristicoPublicViewSet, basename="lugares-public")
public_router.register(r"servicios/alojamiento", AlojamientoPublicViewSet, basename="alojamiento-public")
public_router.register(r"servicios/gastronomia", RestaurantePublicViewSet, basename="gastronomia-public")
public_router.register(r"excursiones", ExcursionPublicViewSet, basename="excursiones-public")
public_router.register(r"servicios/culturales", ServicioCulturalPublicViewSet, basename="servicios-culturales-public")
public_router.register(r"servicios/otros", OtroServicioPublicViewSet, basename="otros-servicios-public")
public_router.register(r"proyectos/comunitarios", ProyectoComunitarioPublicViewSet, basename="proyectos-comunitarios-public")


admin_router = DefaultRouter()
admin_router.register(r"admin/lugares", LugarTuristicoAdminViewSet, basename="lugares-admin")
admin_router.register(r"admin/servicios/alojamiento", AlojamientoAdminViewSet, basename="alojamiento-admin")
admin_router.register(r"admin/servicios/gastronomia", RestauranteAdminViewSet, basename="gastronomia-admin")
admin_router.register(r"admin/excursiones", ExcursionAdminViewSet, basename="excursiones-admin")
admin_router.register(r"admin/eventos", EspacioEventoAdminViewSet, basename="eventos-admin")
admin_router.register(r"admin/servicios/culturales", ServicioCulturalAdminViewSet, basename="servicios-culturales-admin")
admin_router.register(r"admin/servicios/otros", OtroServicioAdminViewSet, basename="otros-servicios-admin")
admin_router.register(r"admin/proyectos/comunitarios", ProyectoComunitarioAdminViewSet, basename="proyectos-comunitarios-admin")
admin_router.register(r"admin/habitaciones", HabitacionAdminViewSet, basename="habitaciones-admin")
admin_router.register(r"admin/excursiones-reservas", ReservaExcursionAdminViewSet, basename="excursiones-reservas-admin")
admin_router.register(r"admin/mesas", MesaAdminViewSet, basename="mesas-admin")


urlpatterns = [
    path("", include(public_router.urls)),
    path("", include(admin_router.urls)),
    path("eventos/", EspacioEventoPublicViewSet.as_view({"get": "list"}), name="eventos-public"),
    path("empresa/", InformacionEmpresaPublicViewSet.as_view({"get": "list"}), name="empresa-public"),
    path("empresa/proyectos/", ProyectoComunitarioPublicViewSet.as_view({"get": "list"}), name="empresa-proyectos-public"),
    path("eventos/espacios/", EspacioEventoPublicViewSet.as_view({"get": "list"}), name="eventos-espacios-public"),
    path("eventos/culturales/", ServicioCulturalPublicViewSet.as_view({"get": "list"}), name="eventos-culturales-public"),
    path("servicios/otros/", OtroServicioPublicViewSet.as_view({"get": "list"}), name="servicios-otros-public"),
    path("admin/empresa/", InformacionEmpresaAdminViewSet.as_view({"get": "list", "post": "create"}), name="empresa-admin"),
]
