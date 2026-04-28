# Estructura actual de la app Aldaba

Este archivo resume la estructura real del proyecto para que puedas ubicar rápido dónde hacer cambios manuales en frontend o backend.

## Raíz del repositorio

- `ALDABA.md`: documentación general del proyecto.
- `API_ENDPOINTS.md`: referencia de endpoints y acceso a admin.
- `DJANGO_API.md`: guía de integración entre frontend y backend.
- `ESTRATEGIA_PRUEBAS.md`: estrategia de pruebas.
- `ESTRUCTURA_APP.md`: documento histórico de estructura.
- `FUNCIONALIDADES_APP.md`: mapa de funcionalidades por pantalla.
- `APP_STRUCTURE_ACTUAL.md`: este documento.
- `REPORTE_PRUEBAS.md`: reporte de pruebas automatizadas.
- `package.json`: scripts y dependencias del frontend.
- `vite.config.ts`: configuración de Vite y alias.
- `tsconfig.json`: TypeScript del workspace.
- `eslint.config.js`: reglas de lint.

## `client/` - Frontend React

### `client/src/`
- `main.tsx`: entrada de React.
- `app/App.tsx`: router principal.
- `landing/`: sitio público.
- `admin/`: panel de administración.
- `shared/`: UI, estilos, tema, datos y API compartida.
- `entities/`: entidades y catálogos de dominio.
- `test/` y `test.setup.ts`: soporte de pruebas frontend.
- `tests/`: pruebas de integración frontend.

### `client/src/landing/`
- `components/NavBar.tsx`: barra de navegación.
- `pages/Home.tsx`: home principal con carrusel, accesos y destacados.
- `pages/Lugares.tsx`: listado y filtros de lugares.
- `pages/LugarDetalle.tsx`: detalle de cada lugar.
- `pages/Services.tsx`: alojamiento, gastronomía y otros servicios.
- `pages/Excursions.tsx`: excursiones.
- `pages/Events.tsx`: eventos y cultura.
- `pages/About.tsx`: información institucional.

### `client/src/admin/`
- `AdminPanel.tsx`: export del panel principal.
- `AdminDashboard.tsx`: layout principal del panel.
- `components/`: login, buscador, confirmación, etc.
- `sections/`: gestores de hostales, excursiones y restaurantes.
- `data/`: seed y tipos del panel.
- `styles/`: estilos del admin.

### `client/src/shared/`
- `api/`: cliente HTTP y transformadores.
- `data/`: catálogos y datos compartidos.
- `styles/global.css`: estilos globales.
- `theme/colors.ts`: colores base.
- `ui/`: footer y modal reutilizables.

### `client/src/entities/`
- `lugares/model/lugaresData.ts`: catálogo completo de lugares turísticos.

## `backend/` - Django REST Framework

### `backend/config/`
- `settings.py`: configuración principal.
- `settings_test.py`: configuración de pruebas con SQLite.
- `urls.py`: rutas principales.
- `wsgi.py` / `asgi.py`: entrada del backend.

### `backend/aldaba_api/`
- `models.py`: modelos del dominio.
- `serializers.py`: serializers DRF.
- `views.py`: viewsets y acciones.
- `permissions.py`: permisos personalizados.
- `auth_views.py`: login y refresh JWT.
- `middleware.py`: middleware propio.
- `urls.py`: URLs de la app API.
- `migrations/`: migraciones de base de datos.
- `admin.py`: registro en Django Admin.

### `backend/tests/`
- `test_models.py`: pruebas de modelos.
- `test_api_integration.py`: integración API.
- `test_api_endpoints.py`: cobertura de endpoints.
- `test_endpoints_smoke.py`: smoke tests.

## Carpetas generadas o de apoyo

- `client-dist/`: build del frontend.
- `.pytest_cache/`: caché de pytest.
- `node_modules/`: dependencias instaladas.
- `.venv/`: entorno virtual de Python.

## Dónde tocar según lo que quieras cambiar

- Frontend visual: `client/src/landing/pages/`
- Navegación: `client/src/landing/components/NavBar.tsx`
- Panel admin: `client/src/admin/sections/`
- Datos de catálogo: `client/src/entities/lugares/model/lugaresData.ts`
- API y modelos: `backend/aldaba_api/`
- Autenticación/admin: `backend/aldaba_api/auth_views.py`, `backend/config/urls.py`
