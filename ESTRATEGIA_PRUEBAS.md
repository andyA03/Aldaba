# Estrategia de Pruebas Completa - App Aldaba

## 1. Proposito
Definir una estrategia de pruebas integral para Aldaba (frontend React + backend Django/DRF + PostgreSQL), inspirada en la logica del capitulo 3 del documento de referencia: validar por capas, con evidencia medible, cubriendo pruebas unitarias, de integracion, de caja negra y de seguridad.

## 2. Objetivos de calidad
- Reducir fallos en produccion por regresiones funcionales.
- Confirmar que los flujos principales de usuario y admin funcionan de extremo a extremo.
- Detectar errores de validacion, permisos y autenticacion antes del despliegue.
- Mantener calidad tecnica con ejecucion repetible en local y CI.

## 3. Alcance
- Frontend:
  - Rutas publicas y de detalle.
  - Componentes de pagina y admin.
  - Formularios, estados de carga y manejo de error.
- Backend:
  - Modelos, serializers, vistas y permisos.
  - Endpoints REST principales.
  - Sesion/autorizacion basada en JWT o mecanismo actual.
- Integracion:
  - Consumo real de API desde frontend.
  - Coherencia de datos y errores controlados.
- No funcional:
  - Seguridad basica.
  - Usabilidad basica.
  - Rendimiento basico.

## 4. Enfoque por niveles

### 4.1 Pruebas unitarias y de componente
- Backend:
  - Validar reglas de modelos.
  - Validar serializacion y validaciones de entrada.
  - Validar permisos por rol.
- Frontend:
  - Render de componentes claves.
  - Eventos de usuario (click, submit, filtros).
  - Mensajes de error y estados de carga.

### 4.2 Pruebas de integracion
- Backend:
  - Endpoint -> serializer -> base de datos.
  - Codigos HTTP esperados: 200, 201, 400, 401, 403, 404.
- Frontend:
  - Navegacion entre paginas.
  - Consumo de API con respuestas exitosas y fallidas.
  - Integracion de secciones del panel admin.

### 4.3 Pruebas de caja negra (sistema)
- Validar escenarios funcionales sin mirar implementacion interna.
- Flujos criticos:
  - Home -> Lugares -> Detalle.
  - Services/Excursions/Events muestran informacion correcta.
  - Login admin + CRUD basico por seccion.

### 4.4 Pruebas de seguridad
- Acceso sin token a endpoints privados debe fallar.
- Token invalido o expirado debe fallar con codigo correcto.
- Usuario sin privilegios no puede ejecutar operaciones de admin.
- Entradas invalidas deben retornar error controlado sin exponer trazas.

### 4.5 Pruebas de usabilidad
- Navegacion clara entre secciones principales.
- Formularios con mensajes comprensibles.
- Validar comportamiento basico en mobile y desktop.

### 4.6 Pruebas de rendimiento basico
- Tiempo de respuesta de endpoints principales bajo carga ligera.
- Carga inicial frontend en condiciones normales (sin degradacion severa).

## 5. Herramientas y dependencias

### 5.1 Backend (Python/Django)
- pytest
- pytest-django
- pytest-cov
- factory-boy
- Faker

Estado: instalado en `.venv` durante esta sesion.

### 5.2 Frontend (React/Vite)
- vitest
- @testing-library/react
- @testing-library/jest-dom
- jsdom
- @types/jsdom
- @vitest/coverage-v8
- msw
- playwright

Estado: instalado en el proyecto (package.json y package-lock actualizados).

### 5.3 Herramientas externas
- Postman para smoke y regresion API manual.
- (Opcional) Lighthouse para una referencia rapida de performance frontend.

## 6. Casos de prueba (catalogo base)

## 6.1 Backend - API y permisos

| ID | Tipo | Caso | Precondiciones | Pasos | Resultado esperado |
|---|---|---|---|---|---|
| BE-01 | Unitario | Modelo crea registro valido | DB de prueba | Crear entidad con datos validos | Guarda sin error |
| BE-02 | Unitario | Modelo rechaza dato invalido | DB de prueba | Enviar campo requerido vacio | Error de validacion |
| BE-03 | Integracion | GET publico de lugares | API arriba | Llamar endpoint publico | 200 y lista JSON |
| BE-04 | Integracion | POST admin sin token | API arriba | Llamar endpoint admin sin auth | 401/403 |
| BE-05 | Integracion | POST admin con token valido | Usuario admin | Login, usar token, crear recurso | 201 y recurso creado |
| BE-06 | Seguridad | Token expirado | Token vencido | Llamar endpoint protegido | 401 |
| BE-07 | Seguridad | Usuario no admin intenta borrar | Usuario comun | Enviar DELETE a endpoint admin | 403 |
| BE-08 | Integracion | Entrada con caracteres especiales | API arriba | Enviar texto con n, acentos y simbolos | 200/201 y datos persistidos correctamente |

## 6.2 Frontend - UI y navegacion

| ID | Tipo | Caso | Precondiciones | Pasos | Resultado esperado |
|---|---|---|---|---|---|
| FE-01 | Componente | Render Home | App compilada | Abrir ruta home | Secciones principales visibles |
| FE-02 | Integracion | Navegacion a Lugares | Router activo | Click en menu Lugares | Muestra listado de lugares |
| FE-03 | Integracion | Ir a detalle de lugar | Datos cargados | Click en tarjeta | Muestra detalle correcto |
| FE-04 | Integracion | Estado de error API | API real falla (backend detenido o error 5xx) | Abrir pagina dependiente de API | Mensaje de error visible |
| FE-05 | Integracion | Login admin correcto | Credenciales validas | Completar formulario y enviar | Entra al dashboard |
| FE-06 | Integracion | Login admin invalido | Credenciales invalidas | Enviar formulario | Mensaje de credenciales invalidas |
| FE-07 | Sistema | CRUD basico en admin | Sesion admin activa | Crear/editar/eliminar item | Cambios reflejados en tabla |
| FE-08 | Usabilidad | Vista mobile principal | Emulacion mobile | Navegar Home/Lugares/Services | UI usable sin solapamientos criticos |

## 6.3 Caja negra - flujo end to end

| ID | Flujo | Pasos clave | Resultado esperado |
|---|---|---|---|
| E2E-01 | Usuario publico | Home -> Lugares -> Detalle | Contenido consistente en todo el flujo |
| E2E-02 | Usuario publico | Home -> Services -> Detalle servicio | Datos correctos y navegacion estable |
| E2E-03 | Admin | Login -> Hostales CRUD | Operaciones exitosas con persistencia |
| E2E-04 | Admin | Login -> Excursiones CRUD | Operaciones exitosas con persistencia |
| E2E-05 | Admin | Login -> Restaurantes CRUD | Operaciones exitosas con persistencia |

## 7. Datos de prueba
- Dataset minimo para pipeline rapido:
  - 3 lugares, 2 alojamientos, 2 excursiones, 2 eventos culturales, 2 eventos de espacio, 2 servicios varios.
- Dataset extendido para regresion:
  - Mayor volumen y casos borde (strings largos, caracteres especiales, campos opcionales vacios).
- Usuarios:
  - 1 admin, 1 usuario normal, 1 token expirado de prueba.

## 8. Criterios de entrada y salida

### 8.1 Entrada
- Entorno local funcional (backend + frontend).
- Base de datos de prueba disponible.
- Variables de entorno definidas para entorno de test.

### 8.2 Salida
- Build frontend exitosa.
- `manage.py check` sin errores.
- Suite critica sin fallos.
- Sin bloqueadores abiertos en seguridad/permisos.

## 9. Metricas y umbrales propuestos
- Tasa de ejecucion exitosa del pipeline critico >= 95%.
- Cobertura backend inicial >= 60% (subir progresivamente).
- Cobertura frontend inicial >= 50% (subir progresivamente).
- Defectos criticos abiertos antes de release = 0.

## 10. Plan de ejecucion por fase
1. Fase 1 - Base tecnica
   - Activar pytest/pytest-django y vitest.
   - Implementar smoke minimo.
2. Fase 2 - Riesgo funcional
   - Cubrir API publica/admin y paginas clave.
3. Fase 3 - End to end
   - Automatizar flujos criticos con Playwright.
4. Fase 4 - CI
   - Ejecutar pruebas en cada pull request.
5. Fase 5 - Mejora continua
   - Incrementar cobertura y fortalecer seguridad.

## 11. Arranque local real de la app (backend + frontend)

### 11.1 Backend Django (Terminal 1)
```powershell
cd C:\Users\user\Desktop\App\Aldaba\backend

# Variables de entorno minimas (ajusta si usas otro usuario/password/DB)
$env:DJANGO_SECRET_KEY="change-me-local"
$env:DJANGO_DEBUG="True"
$env:DJANGO_ALLOWED_HOSTS="localhost,127.0.0.1"
$env:CORS_ALLOWED_ORIGINS="http://localhost:5000"
$env:CSRF_TRUSTED_ORIGINS="http://localhost:5000"
$env:POSTGRES_DB="aldaba_db"
$env:POSTGRES_USER="postgres"
$env:POSTGRES_PASSWORD="aldaba"
$env:POSTGRES_HOST="127.0.0.1"
$env:POSTGRES_PORT="5432"

# Verificacion y arranque
..\.venv\Scripts\python.exe manage.py check
..\.venv\Scripts\python.exe manage.py migrate
..\.venv\Scripts\python.exe manage.py runserver 0.0.0.0:8000
```

### 11.2 Frontend Vite (Terminal 2)
```powershell
cd C:\Users\user\Desktop\App\Aldaba
npm run dev
```

URL esperada del frontend: `http://localhost:5000`.

### 11.3 Verificacion rapida de conectividad
Con ambos servidores arriba:

```powershell
Invoke-WebRequest http://127.0.0.1:8000/api/lugares/ -UseBasicParsing
```

Resultado esperado: `StatusCode` 200 y respuesta JSON.

## 12. Comandos de pruebas reales (ejecucion)

### 12.1 Backend
```powershell
cd C:\Users\user\Desktop\App\Aldaba\backend
..\.venv\Scripts\python.exe manage.py check
..\.venv\Scripts\python.exe -m pytest -q
..\.venv\Scripts\python.exe -m pytest --cov=. --cov-report=term-missing
```

### 12.2 Frontend
```powershell
cd C:\Users\user\Desktop\App\Aldaba
npm run build
npx vitest run --config vitest.config.ts
npx playwright test
```

Si es la primera ejecucion de Playwright en la maquina:

```powershell
cd C:\Users\user\Desktop\App\Aldaba
npx playwright install
```

Nota: el repositorio ya contiene pruebas automatizadas iniciales en frontend y backend. Aun asi, el objetivo principal de esta estrategia es la validacion funcional con datos reales y servicios reales levantados en local.

## 12.4 Criterio obligatorio de ejecucion real
- Las pruebas funcionales e integracion deben correrse contra backend real en `http://127.0.0.1:8000` y frontend real en `http://localhost:5000`.
- Las validaciones criticas (API, login, permisos, CRUD admin y navegacion principal) deben usar datos reales persistidos en la base de datos local.
- Los mocks solo se permiten para unitarias aisladas de utilidades; no sustituyen la evidencia de pruebas funcionales reales.

## 13. Tutorial breve de Postman (smoke API)

1. Instalar Postman
   - Descargar desde https://www.postman.com/downloads/ e instalar.
2. Crear workspace local
   - Abrir Postman -> New -> Workspace -> nombre: Aldaba QA.
3. Crear coleccion
   - New -> Collection -> nombre: Aldaba Smoke API.
4. Definir variable de entorno
   - Environments -> New -> `base_url = http://127.0.0.1:8000`.
5. Crear requests de smoke
   - GET `{{base_url}}/api/lugares/`
   - GET `{{base_url}}/api/excursiones/`
   - GET `{{base_url}}/api/servicios/alojamiento/`
6. Agregar request de auth (si aplica)
   - POST login -> guardar token en variable `token`.
7. Requests protegidos
   - Header: `Authorization: Bearer {{token}}`.
8. Agregar tests basicos en pestaña Tests
```javascript
pm.test("status 200", function () {
  pm.response.to.have.status(200);
});
pm.test("respuesta JSON", function () {
  pm.response.to.be.json;
});
```
9. Ejecutar collection runner
   - Seleccionar coleccion -> Run -> validar status y tiempos.
10. Exportar evidencia
   - Exportar coleccion y guardar captura de resultados para trazabilidad.

## 14. Riesgos y mitigaciones
- Riesgo: inestabilidad de red en instalacion npm.
  - Mitigacion: reintentar en red estable, usar cache limpia y evitar instalaciones paralelas.
- Riesgo: base de datos PostgreSQL no disponible al ejecutar backend.
  - Mitigacion: validar servicio PostgreSQL y credenciales antes de correr `migrate` y pruebas.
- Riesgo: baja cobertura inicial.
  - Mitigacion: priorizar modulos de mayor riesgo primero (auth, permisos, admin CRUD).
- Riesgo: pruebas lentas.
  - Mitigacion: separar suite smoke (rapida) de suite completa (nocturna o por release).

## 15. Resultado esperado
Con esta estrategia, Aldaba debe poder validar de forma sistematica sus funcionalidades criticas, mantener control de regresiones y generar evidencia objetiva para despliegues mas seguros.

## 16. Casos automatizados ya implementados en el repositorio

### 16.1 Backend (pytest)
- API publica de lugares: listado y detalle por slug.
- Excursiones: listado publico validando el campo `destino` tras el refactor.
- Endpoints admin: bloqueo a anonimo y acceso permitido para usuario staff autenticado.

Archivos implementados:
- `backend/tests/test_api_endpoints.py`
- `backend/pytest.ini`
- `backend/config/settings_test.py`

### 16.2 Frontend (Vitest + Testing Library)
- API adapter: mapeo correcto de payload de lugares y manejo de error HTTP.
- Routing: render de pagina Lugares al navegar a la ruta `/lugares`.

Archivos implementados:
- `client/src/shared/api/aldabaApi.test.ts`
- `client/src/app/App.test.tsx`
- `client/src/test/setup.ts`
- `vitest.config.ts`

### 16.3 Resultado de ejecucion validado en esta sesion
- Frontend: 3 pruebas exitosas.
- Backend: 3 pruebas exitosas.
