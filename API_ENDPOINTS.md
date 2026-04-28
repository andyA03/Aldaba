# Endpoints API Aldaba

## Comando para levantar el backend

```powershell
c:/Users/user/Desktop/App/Aldaba/.venv/Scripts/python.exe c:/Users/user/Desktop/App/Aldaba/backend/manage.py runserver 0.0.0.0:8000
```

Base URL local:
- http://127.0.0.1:8000

## Credenciales

### API JWT (login)
- Endpoint: `POST /api/auth/login/`
- Body esperado:

```json
{
	"username": "tu_usuario",
	"password": "tu_password"
}
```

Importante:
- El backend no define credenciales hardcodeadas para JWT.
- Debes usar un usuario real de Django.
- Para acceder a endpoints `/api/admin/*` el usuario debe ser `is_staff=True`.

Si aun no tienes usuario admin/staff, crealo con:

```powershell
c:/Users/user/Desktop/App/Aldaba/.venv/Scripts/python.exe c:/Users/user/Desktop/App/Aldaba/backend/manage.py createsuperuser
```

### Django Admin
- URL: `GET /django-admin/`
- Credenciales: las mismas del superusuario creado con `createsuperuser`.

## Para que sirve cada operacion CRUD

- `GET` (list): listar colecciones (ejemplo: todos los lugares).
- `GET` (detail): obtener un recurso puntual por `id` o `slug`.
- `POST`: crear un nuevo registro.
- `PUT`: reemplazar completamente un registro existente.
- `PATCH`: actualizar parcialmente campos de un registro.
- `DELETE`: eliminar un registro.

Uso recomendado:
- Usa `PUT` cuando envias el objeto completo.
- Usa `PATCH` cuando solo cambia uno o pocos campos.
- En reportes (`/estadisticas/`) se usa `GET` porque solo consulta datos agregados.

## Autenticacion

- POST /api/auth/login/
- POST /api/auth/refresh/

## Admin Django

- GET /django-admin/

## Endpoints publicos

### Lugares turisticos
- GET /api/lugares/
- GET /api/lugares/{slug}/

### Servicios de alojamiento
- GET /api/servicios/alojamiento/
- GET /api/servicios/alojamiento/{id}/

### Servicios de gastronomia
- GET /api/servicios/gastronomia/
- GET /api/servicios/gastronomia/{id}/

### Excursiones
- GET /api/excursiones/
- GET /api/excursiones/{id}/

### Servicios culturales
- GET /api/servicios/culturales/
- GET /api/servicios/culturales/{id}/

### Otros servicios
- GET /api/servicios/otros/
- GET /api/servicios/otros/{id}/

### Proyectos comunitarios
- GET /api/proyectos/comunitarios/
- GET /api/proyectos/comunitarios/{id}/

### Endpoints publicos adicionales
- GET /api/eventos/
- GET /api/eventos/espacios/
- GET /api/eventos/culturales/
- GET /api/empresa/
- GET /api/empresa/proyectos/
- GET /api/servicios/otros/

## Endpoints admin (requieren usuario staff)

### Lugares turisticos admin
- GET /api/admin/lugares/
- POST /api/admin/lugares/
- GET /api/admin/lugares/{slug}/
- PUT /api/admin/lugares/{slug}/
- PATCH /api/admin/lugares/{slug}/
- DELETE /api/admin/lugares/{slug}/

### Alojamiento admin
- GET /api/admin/servicios/alojamiento/
- POST /api/admin/servicios/alojamiento/
- GET /api/admin/servicios/alojamiento/{id}/
- PUT /api/admin/servicios/alojamiento/{id}/
- PATCH /api/admin/servicios/alojamiento/{id}/
- DELETE /api/admin/servicios/alojamiento/{id}/

### Gastronomia admin
- GET /api/admin/servicios/gastronomia/
- POST /api/admin/servicios/gastronomia/
- GET /api/admin/servicios/gastronomia/{id}/
- PUT /api/admin/servicios/gastronomia/{id}/
- PATCH /api/admin/servicios/gastronomia/{id}/
- DELETE /api/admin/servicios/gastronomia/{id}/

### Excursiones admin
- GET /api/admin/excursiones/
- POST /api/admin/excursiones/
- GET /api/admin/excursiones/{id}/
- PUT /api/admin/excursiones/{id}/
- PATCH /api/admin/excursiones/{id}/
- DELETE /api/admin/excursiones/{id}/

### Eventos admin
- GET /api/admin/eventos/
- POST /api/admin/eventos/
- GET /api/admin/eventos/{id}/
- PUT /api/admin/eventos/{id}/
- PATCH /api/admin/eventos/{id}/
- DELETE /api/admin/eventos/{id}/

### Servicios culturales admin
- GET /api/admin/servicios/culturales/
- POST /api/admin/servicios/culturales/
- GET /api/admin/servicios/culturales/{id}/
- PUT /api/admin/servicios/culturales/{id}/
- PATCH /api/admin/servicios/culturales/{id}/
- DELETE /api/admin/servicios/culturales/{id}/

### Otros servicios admin
- GET /api/admin/servicios/otros/
- POST /api/admin/servicios/otros/
- GET /api/admin/servicios/otros/{id}/
- PUT /api/admin/servicios/otros/{id}/
- PATCH /api/admin/servicios/otros/{id}/
- DELETE /api/admin/servicios/otros/{id}/

### Proyectos comunitarios admin
- GET /api/admin/proyectos/comunitarios/
- POST /api/admin/proyectos/comunitarios/
- GET /api/admin/proyectos/comunitarios/{id}/
- PUT /api/admin/proyectos/comunitarios/{id}/
- PATCH /api/admin/proyectos/comunitarios/{id}/
- DELETE /api/admin/proyectos/comunitarios/{id}/

### Empresa admin
- GET /api/admin/empresa/
- POST /api/admin/empresa/

### Habitaciones admin
- GET /api/admin/habitaciones/
- POST /api/admin/habitaciones/
- GET /api/admin/habitaciones/{id}/
- PUT /api/admin/habitaciones/{id}/
- PATCH /api/admin/habitaciones/{id}/
- DELETE /api/admin/habitaciones/{id}/
- GET /api/admin/habitaciones/estadisticas/

### Reservas de excursiones admin
- GET /api/admin/excursiones-reservas/
- POST /api/admin/excursiones-reservas/
- GET /api/admin/excursiones-reservas/{id}/
- PUT /api/admin/excursiones-reservas/{id}/
- PATCH /api/admin/excursiones-reservas/{id}/
- DELETE /api/admin/excursiones-reservas/{id}/
- GET /api/admin/excursiones-reservas/estadisticas/

### Mesas admin
- GET /api/admin/mesas/
- POST /api/admin/mesas/
- GET /api/admin/mesas/{id}/
- PUT /api/admin/mesas/{id}/
- PATCH /api/admin/mesas/{id}/
- DELETE /api/admin/mesas/{id}/
- GET /api/admin/mesas/estadisticas/
