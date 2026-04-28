import pytest
from decimal import Decimal
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from aldaba_api.models import Hostal, Restaurante, Habitacion, Mesa, Excursion


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def admin_user():
    return User.objects.create_superuser(
        username='admin',
        email='admin@test.com',
        password='adminpass123'
    )


@pytest.fixture
def hostal_data():
    hostal = Hostal.objects.create(
        nombre="Hostal Premium",
        foto="https://example.com/hostal.jpg",
        icono="bed"
    )
    return hostal


@pytest.fixture
def restaurante_data():
    restaurante = Restaurante.objects.create(
        nombre="Restaurante Premium",
        icono="fork"
    )
    return restaurante


@pytest.mark.django_db
class TestHostalAPIPublic:
    """Pruebas de integración API pública de Hostales"""
    
    def test_get_hostales_publico(self, api_client, hostal_data):
        """BE-03: GET público de lugares (hostales)"""
        response = api_client.get('/api/servicios/alojamiento/')
        assert response.status_code == status.HTTP_200_OK
        # aceptamos lista directa o paginación DRF {'count','results',...}
        if isinstance(response.data, dict):
            assert isinstance(response.data.get('results', []), list)
        else:
            assert isinstance(response.data, list)
        
    def test_get_hostal_detail(self, api_client, hostal_data):
        """BE-03: GET detalle de hostal"""
        response = api_client.get(f'/api/servicios/alojamiento/{hostal_data.id}/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['nombre'] == "Hostal Premium"
        assert 'habitaciones_count' in response.data


@pytest.mark.django_db
class TestHostalAPIAdmin:
    """Pruebas de integración API admin de Hostales"""
    
    def test_post_hostal_sin_token(self, api_client):
        """BE-04: POST admin sin token"""
        data = {
            'nombre': 'Nuevo Hostal',
            'foto': 'https://example.com/nuevo.jpg',
            'icono': 'bed'
        }
        response = api_client.post('/api/admin/servicios/alojamiento/', data)
        # la API puede responder 401 (no autenticado) o 403 (prohibido)
        assert response.status_code in (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN)
        
    def test_post_hostal_con_token_admin(self, api_client, admin_user):
        """BE-05: POST admin con token válido"""
        api_client.force_authenticate(user=admin_user)
        data = {
            'nombre': 'Hostal Admin',
            'foto': 'https://example.com/admin.jpg',
            'icono': 'building'
        }
        response = api_client.post('/api/admin/servicios/alojamiento/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Hostal.objects.filter(nombre='Hostal Admin').exists()


@pytest.mark.django_db
class TestRestauranteAPI:
    """Pruebas de integración API de Restaurantes"""
    
    def test_get_restaurantes_publico(self, api_client, restaurante_data):
        """BE-03: GET público de restaurantes"""
        response = api_client.get('/api/servicios/gastronomia/')
        assert response.status_code == status.HTTP_200_OK
        # manejar lista directa o paginación
        items = None
        if isinstance(response.data, dict):
            items = response.data.get('results', [])
        else:
            items = response.data
        assert isinstance(items, list)
        if len(items) > 0:
            assert 'mesas_count' in items[0]
        
    def test_post_restaurante_sin_auth(self, api_client):
        """BE-04: POST restaurante sin autenticación"""
        data = {'nombre': 'Nuevo Restaurante', 'icono': 'fork'}
        response = api_client.post('/api/admin/servicios/gastronomia/', data)
        assert response.status_code in (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN)


@pytest.mark.django_db
class TestHabitacionAPI:
    """Pruebas de integración API de Habitaciones"""
    
    def test_get_habitaciones_admin(self, api_client, admin_user, hostal_data):
        """BE-03: GET habitaciones con admin"""
        Habitacion.objects.create(
            hostal=hostal_data,
            numero="201",
            tipo="Doble",
            precio=Decimal("60.00")
        )
        api_client.force_authenticate(user=admin_user)
        response = api_client.get('/api/admin/habitaciones/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) > 0
        
    def test_habitacion_fk_correcto(self, api_client, admin_user, hostal_data):
        """Verificar que FK hostal está correcto en serializer"""
        hab = Habitacion.objects.create(
            hostal=hostal_data,
            numero="301",
            tipo="Suite",
            precio=Decimal("100.00")
        )
        api_client.force_authenticate(user=admin_user)
        response = api_client.get(f'/api/admin/habitaciones/{hab.id}/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['hostal_id'] == hostal_data.id
        assert 'hostal_nombre' in response.data


@pytest.mark.django_db
class TestMesaAPI:
    """Pruebas de integración API de Mesas"""
    
    def test_get_mesas_admin(self, api_client, admin_user, restaurante_data):
        """BE-03: GET mesas con admin"""
        Mesa.objects.create(
            restaurante=restaurante_data,
            numero=1,
            capacidad=4,
            precio=0.0
        )
        api_client.force_authenticate(user=admin_user)
        response = api_client.get('/api/admin/mesas/')
        assert response.status_code == status.HTTP_200_OK
        
    def test_mesa_fk_correcto(self, api_client, admin_user, restaurante_data):
        """Verificar que FK restaurante está correcto en serializer"""
        mesa = Mesa.objects.create(
            restaurante=restaurante_data,
            numero=2,
            capacidad=6,
            precio=0.0
        )
        api_client.force_authenticate(user=admin_user)
        response = api_client.get(f'/api/admin/mesas/{mesa.id}/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['restaurante_id'] == restaurante_data.id
        assert 'restaurante_nombre' in response.data


@pytest.mark.django_db
class TestValidacionDatos:
    """Pruebas de validación de datos BE-08"""
    
    def test_caracteres_especiales_nombre(self, api_client, admin_user):
        """BE-08: Entrada con caracteres especiales"""
        api_client.force_authenticate(user=admin_user)
        data = {
            'nombre': 'Hotel Rincón Criollo — Café',
            'foto': 'https://example.com/test.jpg',
            'icono': 'building'
        }
        response = api_client.post('/api/admin/servicios/alojamiento/', data)
        assert response.status_code == status.HTTP_201_CREATED
        hostal = Hostal.objects.get(nombre='Hotel Rincón Criollo — Café')
        assert hostal.nombre == 'Hotel Rincón Criollo — Café'


@pytest.mark.django_db
class TestPermisosSeguridad:
    """Pruebas de seguridad y permisos"""
    
    def test_usuario_no_admin_no_puede_crear(self, api_client):
        """BE-07: Usuario sin permisos no puede ejecutar operaciones admin"""
        user = User.objects.create_user(
            username='regular_user',
            password='userpass123'
        )
        api_client.force_authenticate(user=user)
        data = {'nombre': 'Hostal Test', 'foto': 'https://example.com/test.jpg'}
        response = api_client.post('/api/admin/servicios/alojamiento/', data)
        # Debería ser 403 o 405 dependiendo de permisos
        assert response.status_code in [status.HTTP_403_FORBIDDEN, status.HTTP_405_METHOD_NOT_ALLOWED]
