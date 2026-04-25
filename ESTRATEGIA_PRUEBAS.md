# Estrategia de Pruebas - Version Original (Aldaba)

## Objetivo
Definir una estrategia de pruebas clara para validar la aplicacion original de Aldaba (frontend React + backend Django/DRF + PostgreSQL), reduciendo regresiones y asegurando estabilidad antes de cada despliegue.

## Alcance
- Frontend: rutas, rendering, estados de carga/error, formularios y panel.
- Backend: modelos, serializers, viewsets, permisos y endpoints.
- Integracion: flujo frontend-backend y consistencia de datos.
- No funcional: calidad minima de codigo y verificacion de build.

## Niveles de prueba

### 1) Pruebas de componente
- Backend:
  - Modelos: validaciones de campos, defaults y estados.
  - Serializers: mapeo correcto de entrada/salida.
  - Permisos: acceso publico/admin segun endpoint.
- Frontend:
  - Componentes clave (pages y admin): render basico y eventos.
  - Utilidades de transformacion de datos (si existen).

### 2) Pruebas de integracion (prioridad alta)
- Backend:
  - Endpoint -> serializer -> DB con base de datos de prueba.
  - Casos exitosos y de error (400/401/403/404).
- Frontend:
  - Navegacion por rutas principales.
  - Carga de datos desde API y fallback cuando falle la API.

### 3) Pruebas de sistemas
- Escenarios minimos:
  - Navegar Home -> Lugares -> Detalle.
  - Entrar a Services/Excursions/Events y validar contenido.
  - Login al panel admin y operacion CRUD basica en cada tabla.

## Matriz de prioridades

### Critico (siempre en cada cambio)
- `npm run build` en frontend.
- `python manage.py check` en backend.
- Smoke de endpoints principales:
  - `/api/lugares/`
  - `/api/servicios/alojamiento/`
  - `/api/excursiones/`
  - `/api/eventos/espacios/`
  - `/api/eventos/culturales/`
  - `/api/servicios/otros/`

### Importante (por release)
- Flujo de reserva/gestion en admin.
- Pruebas de permisos y autenticacion.
- Validacion de datos con caracteres especiales (acentos, eñe).

### Recomendado (semanal o antes de merge grande)
- Sistemas completo en navegador real.
- Cobertura de pruebas y reporte de gaps.

## Herramientas recomendadas

## Backend (Django)
- `pytest` + `pytest-django`: base de pruebas para app y API.
- `factory_boy`: creacion de datos de prueba mantenible.
- `coverage.py`: cobertura de codigo para backend.
- `Faker`: datos realistas para test.

## Frontend (React + Vite)
- `vitest`: pruebas unitarias y de integracion ligeras.
- `@testing-library/react`: pruebas orientadas a comportamiento de usuario.
- `@testing-library/jest-dom`: matchers legibles para DOM.
- `msw`: mock de API para pruebas frontend sin depender del backend.

## Sistemas
- `Playwright`: pruebas de sistemas en Chromium/Firefox/WebKit.

## Calidad de codigo
- `ESLint`: consistencia y errores comunes en frontend.
- `prettier` (opcional): formato uniforme.
- `django check`: chequeo de configuracion Django.

## API/Smoke
- `Postman` o `Insomnia`: colecciones de smoke manual.
- `Invoke-WebRequest`/`curl`: validaciones rapidas por terminal.

## Estructura sugerida de pruebas

### Backend
- `backend/tests/test_models.py`
- `backend/tests/test_serializers.py`
- `backend/tests/test_permissions.py`
- `backend/tests/test_api_public.py`
- `backend/tests/test_api_admin.py`

### Frontend
- `client/src/__tests__/pages/*.test.tsx`
- `client/src/__tests__/components/*.test.tsx`
- `client/src/__tests__/admin/*.test.tsx`
- `client/src/__tests__/integration/*.test.tsx`

### Sistemas
- `e2e/smoke.spec.ts`
- `e2e/admin.spec.ts`
- `e2e/navigation.spec.ts`

## Estrategia de datos de prueba
- Usar fixtures/minifactory con:
  - Lugares (3+), alojamientos (2+), excursiones (2+), eventos (2+).
  - Casos con acentos y caracteres especiales.
- Mantener dataset pequeno para velocidad y uno extendido para regresion.

## Flujo recomendado en cada PR
1. Ejecutar lint y checks locales.
2. Ejecutar pruebas de componente backend y frontend.
3. Ejecutar smoke de endpoints.
4. Ejecutar build frontend.
5. (Si toca UI/flujo) ejecutar pruebas de sistemas smoke.

## Comandos base sugeridos

### Backend
```powershell
cd backend
..\.venv\Scripts\python.exe manage.py check
..\.venv\Scripts\python.exe manage.py test
```

### Frontend
```powershell
npm run build
```

### Smoke API (ejemplo)
```powershell
Invoke-WebRequest http://127.0.0.1:8000/api/lugares/ -UseBasicParsing
```

## Criterio minimo de salida (Definition of Done de pruebas)
- Sin errores de compilacion.
- Sin errores de `manage.py check`.
- Endpoints principales respondiendo.
- No regresiones visuales criticas en Home, Lugares, Services, Excursions, Events y Admin.
- Cambios cubiertos por al menos una prueba automatizada cuando aplique.

## Roadmap de adopcion (practico)
1. Fase 1 (rapida): smoke + build + check en cada cambio.
2. Fase 2: unitarias backend (modelos y API publica) + unitarias frontend pages.
3. Fase 3: sistemas con Playwright para rutas y panel.
4. Fase 4: cobertura y ejecucion en CI.
