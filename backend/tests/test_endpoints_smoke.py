import pytest
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient


PUBLIC_ENDPOINTS = [
    "/api/lugares/",
    "/api/servicios/alojamiento/",
    "/api/servicios/gastronomia/",
    "/api/excursiones/",
    "/api/servicios/culturales/",
    "/api/servicios/otros/",
    "/api/proyectos/comunitarios/",
    "/api/eventos/",
    "/api/eventos/espacios/",
    "/api/eventos/culturales/",
    "/api/empresa/",
    "/api/empresa/proyectos/",
]


ADMIN_ENDPOINTS = [
    "/api/admin/lugares/",
    "/api/admin/servicios/alojamiento/",
    "/api/admin/servicios/gastronomia/",
    "/api/admin/excursiones/",
    "/api/admin/eventos/",
    "/api/admin/servicios/culturales/",
    "/api/admin/servicios/otros/",
    "/api/admin/proyectos/comunitarios/",
    "/api/admin/habitaciones/",
    "/api/admin/excursiones-reservas/",
    "/api/admin/mesas/",
    "/api/admin/empresa/",
    "/api/admin/habitaciones/estadisticas/",
    "/api/admin/excursiones-reservas/estadisticas/",
    "/api/admin/mesas/estadisticas/",
]


@pytest.mark.django_db
@pytest.mark.parametrize("endpoint", PUBLIC_ENDPOINTS)
def test_public_endpoints_return_200(endpoint):
    client = APIClient()
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def test_auth_endpoints_login_and_refresh_work():
    user_model = get_user_model()
    user_model.objects.create_user(username="smoke_user", password="safe-pass-123")

    client = APIClient()

    login_response = client.post(
        "/api/auth/login/",
        {"username": "smoke_user", "password": "safe-pass-123"},
        format="json",
    )
    assert login_response.status_code == status.HTTP_200_OK
    payload = login_response.json()
    assert "access" in payload
    assert "refresh" in payload

    refresh_response = client.post(
        "/api/auth/refresh/",
        {"refresh": payload["refresh"]},
        format="json",
    )
    assert refresh_response.status_code == status.HTTP_200_OK
    assert "access" in refresh_response.json()


@pytest.mark.django_db
@pytest.mark.parametrize("endpoint", ADMIN_ENDPOINTS)
def test_admin_endpoints_require_staff_and_work_for_staff(endpoint):
    client = APIClient()

    unauthenticated = client.get(endpoint)
    assert unauthenticated.status_code in (
        status.HTTP_401_UNAUTHORIZED,
        status.HTTP_403_FORBIDDEN,
    )

    user_model = get_user_model()
    staff = user_model.objects.create_user(
        username=f"staff_{endpoint.replace('/', '_')}",
        password="safe-pass-123",
        is_staff=True,
    )
    client.force_authenticate(user=staff)

    authenticated = client.get(endpoint)
    assert authenticated.status_code == status.HTTP_200_OK
