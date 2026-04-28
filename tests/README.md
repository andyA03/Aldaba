# Pruebas Automatizadas - Aldaba

## Ubicación de los Tests

Todos los tests automatizados están organizados en dos categorías: backend y frontend.

### Backend Tests (pytest + pytest-django)

**Ubicación:** `backend/tests/`

**Archivos:**
- `test_models.py` — Pruebas unitarias de modelos Django (Hostal, Habitacion, Restaurante, Mesa, etc.)
- `test_api_integration.py` — Pruebas de integración de endpoints DRF
- `test_endpoints_smoke.py` — Pruebas smoke (rápidas) de todos los endpoints

**Comando para ejecutar todos los tests del backend:**
```powershell
cd backend
.venv\Scripts\python.exe -m pytest -q
```

**Comando para ejecutar solo tests de modelos:**
```powershell
cd backend
.venv\Scripts\python.exe -m pytest tests/test_models.py -q
```

**Comando para ejecutar solo tests de integración API:**
```powershell
cd backend
.venv\Scripts\python.exe -m pytest tests/test_api_integration.py -q
```

**Comando para ejecutar solo smoke tests (endpoints):**
```powershell
cd backend
.venv\Scripts\python.exe -m pytest tests/test_endpoints_smoke.py -q
```

---

### Frontend Tests (Vitest + React Testing Library)

**Ubicación:** `client/src/tests/`

**Archivos:**
- `integration.test.tsx` — Pruebas de integración de componentes React (Home, Lugares, Login)
- `App.test.tsx` — Pruebas de routing de la aplicación
- `aldabaApi.test.ts` — Pruebas del cliente API

**Comando para ejecutar todos los tests del frontend:**
```powershell
cd client
npm run test -- --run
```

**Comando para ejecutar tests en modo watch (desarrollador):**
```powershell
cd client
npm run test
```

---

## Resumen de Herramientas

| Tipo | Herramienta | Ubicación | Comando |
|------|------------|-----------|---------|
| **Backend Unit** | pytest + pytest-django | `backend/tests/test_models.py` | `python -m pytest tests/test_models.py` |
| **Backend Integration** | pytest + DRF APIClient | `backend/tests/test_api_integration.py` | `python -m pytest tests/test_api_integration.py` |
| **Backend Smoke** | pytest | `backend/tests/test_endpoints_smoke.py` | `python -m pytest tests/test_endpoints_smoke.py` |
| **Frontend Unit** | Vitest + React Testing Library | `client/src/tests/` | `npm run test -- --run` |
| **Frontend Integration** | Vitest + React Testing Library | `client/src/tests/` | `npm run test -- --run` |

---

## Resultados Actuales

### Backend (pytest)

**Ejecución:** `python -m pytest -q`  
**Resultado:** **4 failed, 47 passed in 4.02s**

Fallos detectados:
1. `TestHostalAPIPublic::test_get_hostales_publico` — Paginación no manejada en test (response es dict con `results`)
2. `TestRestauranteAPI::test_get_restaurantes_publico` — Misma causa de paginación
3. `TestHostalAPIAdmin::test_post_hostal_sin_token` — Expectativa 403, API devuelve 401
4. `TestRestauranteAPI::test_post_restaurante_sin_auth` — Expectativa 403, API devuelve 401

Tests que PASAN:
- **Unicidad Habitacion (duplicado):** 1 passed in 1.30s
- **Unicidad Mesa (duplicado):** 1 passed in 1.26s
- **47 tests adicionales** (unitarios e integración) en 4.02s total

### Frontend (Vitest)

**Ejecución:** `npm run test -- --run`  
**Resultado:** **3 Test Files passed (3) | 7 Tests passed (7) | Duration: 28.80s**

Tests:
- ✅ FE-01: Render Home > debería mostrar secciones principales — 63ms
- ✅ FE-02: Navegación a Lugares > debería mostrar listado de hostales — 33ms
- ✅ FE-04: Estado de error API > debería mostrar mensaje de error cuando API falla — 22ms
- ✅ FE-05 y FE-06: Login admin > debería aceptar login correcto — 19ms
- ✅ App routing > renderiza la página de Lugares para /lugares — 850ms
- ✅ API tests (2 tests) — 15ms

---

## Cobertura de Pruebas

### Backend
- **Unitarias:** Modelos Hostal, Habitacion, Restaurante, Mesa, Excursion, ReservaExcursion
- **Integración:** Endpoints públicos y admin, validaciones de FK, caracteres especiales, autenticación
- **Smoke:** 28 endpoints (100% cobertura de rutas)
- **Unicidad:** (Hostal, numero) para Habitacion; (Restaurante, numero) para Mesa

### Frontend
- **Routing:** Navegación a páginas principales (Home, Lugares)
- **Componentes:** Home, Lugares, Login
- **API:** Cliente de API y mocks
- **Manejo de Errores:** Error handling cuando API falla

---

## Próximos Pasos Recomendados

1. **Adaptar tests de integración** para manejar paginación (usar `response.data['results']`)
2. **Alinear códigos de error** (401 vs 403 para permisos)
3. **Agregar tests de refresh token** (`/api/auth/refresh/`)
4. **Tests de throttling** en endpoints de login
5. **Tests E2E** con Playwright (flujos completos de usuario)
6. **Tests de concurrencia** para validar constraints únicos
7. **Coverage reporting** para ambas suites (pytest-cov, vitest --coverage)

---

## Configuración

### Backend (pytest)
- **Config:** `backend/config/settings_test.py` (uses SQLite)
- **Fixtures:** `conftest.py` (si existe) o fixtures en tests
- **Migraciones:** Aplicadas automáticamente durante tests

### Frontend (Vitest)
- **Config:** `vite.config.ts` (incluye test setup)
- **Setup:** `client/src/test.setup.ts` (globals, jest-dom)
- **Ambiente:** jsdom

---

## Comandos Rápidos

```bash
# Ejecutar TODOS los tests (backend + frontend)
# Backend
cd backend
.venv\Scripts\python.exe -m pytest -q

# Frontend
cd client
npm run test -- --run

# O desde la raíz (si hay scripts en package.json)
npm run test
python -m pytest

# Con reporte de cobertura (opcional)
cd backend
.venv\Scripts\python.exe -m pytest --cov=aldaba_api --cov-report=html

cd client
npm run test -- --run --coverage
```
