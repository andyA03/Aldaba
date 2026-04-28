# Patrones de Diseño aplicados en Aldaba

A continuación se listan los patrones de diseño observables en el código, con ejemplos concretos (archivo/ubicación) y una breve explicación de por qué están presentes.

- **MVC (Model-View-Controller / Django flavour)**
  - Código: [backend/aldaba_api/models.py](backend/aldaba_api/models.py), [backend/aldaba_api/serializers.py](backend/aldaba_api/serializers.py), [backend/aldaba_api/views.py](backend/aldaba_api/views.py)
  - Explicación: los modelos representan la capa de datos, los serializers actúan como la capa de presentación/DTO y las ViewSets (DRF) implementan la lógica de control/entrada. Arquitectura clásica de Django/DRF aplicada de forma directa.

- **Adapter / DTO (Serializers como adaptadores)**
  - Código: [backend/aldaba_api/serializers.py](backend/aldaba_api/serializers.py)
  - Explicación: los `Serializer` convierten objetos Django a representaciones JSON y viceversa (ajustan campos, exponen `hostal_id`/`restaurante_id`, calculan `*_count`). Actúan como adaptadores entre dominio y API.

- **Repository / Query Object (acceso a datos via QuerySets)**
  - Código: [backend/aldaba_api/views.py](backend/aldaba_api/views.py) (uso de `queryset = Model.objects.all()` y agregaciones `objects.values_list()`)
  - Explicación: las `ViewSet` encapsulan consultas y agregaciones; Django ORM y QuerySets se usan como capa de acceso a datos (p. ej. conteos/estadísticas), cumpliendo rol de repository ligero.

- **Strategy (variantes de comportamiento según contexto)**
  - Código: [backend/aldaba_api/views.py](backend/aldaba_api/views.py) — `PublicReadOnlyViewSet` vs `AdminModelViewSet`
  - Explicación: se usan diferentes ViewSet base/estrategias para exponer endpoints públicos (lectura) y endpoints admin (CRUD con permisos). Cambiar la clase base cambia el comportamiento sin duplicar lógica.

- **Service / Action (lógica de negocio en actions y métodos específicos)**
  - Código: [backend/aldaba_api/views.py](backend/aldaba_api/views.py) — acciones `@action(detail=False, methods=["get"], url_path="estadisticas")` en `HabitacionAdminViewSet`, `MesaAdminViewSet`, `ReservaExcursionAdminViewSet`
  - Explicación: las acciones agrupadas en los ViewSets implementan operaciones de negocio (estadísticas, agregados), separando acciones específicas de los handlers CRUD estándar.

- **Configuration / Singleton (settings globales)**
  - Código: [backend/config/settings.py](backend/config/settings.py), [backend/pytest.ini](backend/pytest.ini)
  - Explicación: la configuración de Django centraliza parámetros de app y seguridad; se comporta como un singleton de configuración consumido por todo el sistema.

- **Component Pattern (Frontend React)**
  - Código: [client/src/landing/pages/Home.tsx](client/src/landing/pages/Home.tsx), [client/src/landing/pages/Lugares.tsx](client/src/landing/pages/Lugares.tsx), [client/src/landing/components/NavBar.tsx](client/src/landing/components/NavBar.tsx), [client/src/admin/AdminDashboard.tsx](client/src/admin/AdminDashboard.tsx)
  - Explicación: la UI está dividida en componentes reutilizables (presentacionales y contenedores). `NavBar`, `Home`, `LugarCard` y managers del admin siguen el patrón de componentes y composición de React.

- **Container / Presentational (separación de responsabilidades en componentes)**
  - Código: [client/src/admin/AdminDashboard.tsx](client/src/admin/AdminDashboard.tsx) (contiene estado y lógica de sección), [client/src/landing/components/*] (presentation)
  - Explicación: el admin dashboard actúa como contenedor (estado, rutas internas), mientras que los componentes de sección son presentacionales (renderizado, props).

- **Factory (pequeñas fábricas de datos para tests/seed)**
  - Código: [client/src/admin/data/admin-seed.ts](client/src/admin/data/admin-seed.ts) (seed de secciones), [backend/*/factories para tests si existen]
  - Explicación: los objetos de seed y fixtures actúan como fábricas simples para crear instancias usadas en UI y pruebas.

- **Guard / Permission Checks (Seguridad por políticas)**
  - Código: [backend/aldaba_api/permissions.py](backend/aldaba_api/permissions.py), [backend/aldaba_api/views.py](backend/aldaba_api/views.py)
  - Explicación: la política `IsStaffUser` y la separación `PublicReadOnlyViewSet` vs `AdminModelViewSet` implementan guardias de seguridad que protegen rutas sensibles.

---

Si quieres, genero una versión ampliada con snippets de código extraídos (pequeños ejemplos) para cada patrón y lo añado al repo como `DESIGN_PATTERNS_EXTENDED.md`.
