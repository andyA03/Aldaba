# Funcionalidades de Aldaba y ubicación en la app

Este documento indica en qué pantalla y en qué parte de la pantalla está implementada cada funcionalidad que sí está presente en la app.

## Frontend público

| Funcionalidad | Dónde está | Parte exacta |
|---|---|---|
| Carrusel principal | [client/src/landing/pages/Home.tsx](client/src/landing/pages/Home.tsx) | Bloque superior principal, primer `div` de la página con `SLIDES` |
| Botones de acceso rápido | [client/src/landing/pages/Home.tsx](client/src/landing/pages/Home.tsx) | Debajo del carrusel, sección `QUICK_ACCESS` |
| Sección de highlights | [client/src/landing/pages/Home.tsx](client/src/landing/pages/Home.tsx) | Bloque “Lo que nos distingue” con `HIGHLIGHTS` |
| Lugares destacados en home | [client/src/landing/pages/Home.tsx](client/src/landing/pages/Home.tsx) | Bloque “Lugares Turísticos” con tarjetas grandes/medianas |
| Filtros de lugares | [client/src/landing/pages/Lugares.tsx](client/src/landing/pages/Lugares.tsx) | Hero superior y barra de filtros justo debajo |
| Búsqueda de lugares | [client/src/landing/pages/Lugares.tsx](client/src/landing/pages/Lugares.tsx) | Input de búsqueda dentro del hero |
| Detalle de lugar | [client/src/landing/pages/LugarDetalle.tsx](client/src/landing/pages/LugarDetalle.tsx) | Hero del detalle, bloque “Sobre este lugar” e “Información Práctica” |
| Sección de servicios | [client/src/landing/pages/Services.tsx](client/src/landing/pages/Services.tsx) | Tabs de Alojamiento, Gastronomía y Otros en la parte superior |
| Tarjetas de alojamiento/gastronomía | [client/src/landing/pages/Services.tsx](client/src/landing/pages/Services.tsx) | Grid central de tarjetas por sección |
| Excursiones | [client/src/landing/pages/Excursions.tsx](client/src/landing/pages/Excursions.tsx) | Hero superior, barra informativa y grid de excursiones |
| Eventos y cultura | [client/src/landing/pages/Events.tsx](client/src/landing/pages/Events.tsx) | Tres bloques: espacios para eventos, servicios culturales y otros servicios |
| Información institucional | [client/src/landing/pages/About.tsx](client/src/landing/pages/About.tsx) | Secciones “Quiénes somos”, “Misión”, “Valores”, “Proyectos comunitarios” y “Contacto” |
| Navegación principal | [client/src/landing/components/NavBar.tsx](client/src/landing/components/NavBar.tsx) | Barra fija superior en todo el frontend público |

## Panel de administración

| Funcionalidad | Dónde está | Parte exacta |
|---|---|---|
| Login de admin | [client/src/admin/components/AdminLogin.tsx](client/src/admin/components/AdminLogin.tsx) | Formulario inicial del panel |
| Estructura del dashboard | [client/src/admin/AdminDashboard.tsx](client/src/admin/AdminDashboard.tsx) | Layout con sidebar, topbar y contenido |
| Gestión de hostales/habitaciones | [client/src/admin/sections/HostalesManager.tsx](client/src/admin/sections/HostalesManager.tsx) | Tabla, buscador, estadísticas y CRUD |
| Gestión de excursiones | [client/src/admin/sections/ExcursionesManager.tsx](client/src/admin/sections/ExcursionesManager.tsx) | Tabla, buscador, estadísticas y CRUD |
| Gestión de restaurantes/mesas | [client/src/admin/sections/RestaurantesManager.tsx](client/src/admin/sections/RestaurantesManager.tsx) | Tabla, buscador, estadísticas y CRUD |

## Backend / API

| Funcionalidad | Dónde está | Parte exacta |
|---|---|---|
| Modelos de datos | [backend/aldaba_api/models.py](backend/aldaba_api/models.py) | `Hostal`, `Habitacion`, `Restaurante`, `Mesa`, `Excursion`, `LugarTuristico`, etc. |
| Serialización API | [backend/aldaba_api/serializers.py](backend/aldaba_api/serializers.py) | Conversión de modelos a JSON |
| Permisos admin | [backend/aldaba_api/permissions.py](backend/aldaba_api/permissions.py) | Restricción de staff para rutas protegidas |
| ViewSets públicos y admin | [backend/aldaba_api/views.py](backend/aldaba_api/views.py) | Endpoints públicos y CRUD admin |
| Login JWT | [backend/aldaba_api/auth_views.py](backend/aldaba_api/auth_views.py) | Token obtain pair con throttling |
| Refresh JWT | [backend/aldaba_api/auth_views.py](backend/aldaba_api/auth_views.py) | Renovación de token |
| Rutas raíz del backend | [backend/config/urls.py](backend/config/urls.py) | `/django-admin/`, `/api/auth/login/`, `/api/auth/refresh/`, `/api/` |

## Cambios importantes recientes

- El filtro de `Lugares` ya no incluye `UNESCO`; se dejaron `Todos`, `Patrimonio`, `Naturaleza`, `Cultura` y `Costa`.
- `Valle de los Ingenios` quedó clasificado como `Naturaleza`.
- El campo `entrada` del Valle quedó vacío para completarlo después.
- Se agregó un texto visible encima de los filtros para que se entienda su función.
