import pytest
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

from aldaba_api.models import Excursion, LugarTuristico


@pytest.mark.django_db
def test_lugares_public_list_and_detail():
    LugarTuristico.objects.create(
        slug="plaza-mayor",
        nombre="Plaza Mayor",
        categoria="Patrimonio",
        categoria_color="#1B4F8A",
        foto="https://example.com/plaza.jpg",
        foto_hero="https://example.com/plaza-hero.jpg",
        resumen="Centro historico de Trinidad.",
        descripcion="Descripcion larga",
        horario="24h",
        entrada="Gratuita",
        ubicacion="Trinidad",
        distancia="0 km",
        consejos="Lleva agua",
    )

    client = APIClient()

    list_response = client.get("/api/lugares/")
    assert list_response.status_code == status.HTTP_200_OK

    list_data = list_response.json()
    if isinstance(list_data, dict):
        list_data = list_data["results"]

    assert any(item["slug"] == "plaza-mayor" for item in list_data)

    detail_response = client.get("/api/lugares/plaza-mayor/")
    assert detail_response.status_code == status.HTTP_200_OK
    assert detail_response.json()["nombre"] == "Plaza Mayor"


@pytest.mark.django_db
def test_excursiones_public_list_uses_destino_field():
    Excursion.objects.create(
        destino="Valle de los Ingenios",
        duracion="4 horas",
        foto="https://example.com/excursion.jpg",
        icono="map",
        precio=45,
        personas=6,
    )

    client = APIClient()
    response = client.get("/api/excursiones/")
    assert response.status_code == status.HTTP_200_OK

    data = response.json()
    if isinstance(data, dict):
        data = data["results"]

    assert any(item["destino"] == "Valle de los Ingenios" for item in data)


@pytest.mark.django_db
def test_admin_lugares_requires_staff_user():
    client = APIClient()
    anonymous_response = client.get("/api/admin/lugares/")
    assert anonymous_response.status_code in (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN)

    user_model = get_user_model()
    staff_user = user_model.objects.create_user(
        username="admin_test",
        password="admin12345",
        is_staff=True,
    )
    client.force_authenticate(user=staff_user)

    staff_response = client.get("/api/admin/lugares/")
    assert staff_response.status_code == status.HTTP_200_OK
