# Guía de Conexión — Aldaba Frontend ↔ Django REST Framework

Este documento describe todos los endpoints, modelos de datos y configuraciones necesarias para conectar el frontend React de Aldaba con el backend Django REST Framework.

---

## Índice

1. [Configuración inicial](#1-configuración-inicial)
2. [Autenticación del panel admin](#2-autenticación-del-panel-admin)
3. [Endpoints públicos](#3-endpoints-públicos)
4. [Endpoints del panel de administración](#4-endpoints-del-panel-de-administración)
5. [Cómo conectar cada página del frontend](#5-cómo-conectar-cada-página-del-frontend)
6. [Modelos Django de referencia](#6-modelos-django-de-referencia)

---

## 1. Configuración inicial

### 1.1 Django — settings.py

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # debe ir PRIMERO
    'django.middleware.common.CommonMiddleware',
    ...
]

# CORS — permitir peticiones desde el frontend React
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5000",     # Vite en desarrollo
    "https://tu-dominio.com",   # producción
]

# O para desarrollo sin restricciones:
# CORS_ALLOW_ALL_ORIGINS = True

# JWT Auth
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
}

from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=8),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}
```

### 1.2 Django — urls.py (raíz)

```python
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('aldaba.urls')),  # tu app
]
```

### 1.3 Paquetes necesarios

```bash
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers
```

### 1.4 Vite — proxy configurado

El frontend ya tiene el proxy apuntando a Django en `vite.config.ts`:

```ts
proxy: {
  '/api': 'http://localhost:8000',
}
```

Esto significa que cualquier llamada a `/api/...` desde React llega automáticamente a `http://localhost:8000/api/...`. **No hay que cambiar nada en el frontend** para el enrutamiento.

---

## 2. Autenticación del panel admin

### Flujo actual (hardcoded)

El login del panel admin está en `client/src/admin/AdminPanel.tsx` y actualmente compara localmente:

```ts
if (user === "admin" && pass === "admin123") { onLogin(); }
```

### Flujo con Django JWT

Reemplazar esa lógica con una llamada real:

```ts
// En AdminPanel.tsx — función handleSubmit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass }),
    });
    if (!res.ok) { setError("Usuario o contraseña incorrectos."); return; }
    const data = await res.json();
    localStorage.setItem('aldaba_token', data.access);
    localStorage.setItem('aldaba_refresh', data.refresh);
    onLogin();
  } catch {
    setError("Error de conexión con el servidor.");
  }
};
```

### Endpoint de login

```
POST /api/auth/login/
```

**Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Respuesta:**
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Header de autorización para endpoints protegidos

```ts
const token = localStorage.getItem('aldaba_token');
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
}
```

---

## 3. Endpoints públicos

Todos los endpoints públicos son de solo lectura (`GET`). No requieren autenticación.

---

### 3.1 Lugares turísticos

**Página que los usa:** `/lugares` y `/lugares/:slug`
**Archivo que los consume:** `client/src/pages/Lugares.tsx` y `LugarDetalle.tsx`
**Archivo con datos actuales:** `client/src/data/lugaresData.ts`

#### Listar todos los lugares
```
GET /api/lugares/
```

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "slug": "plaza-mayor",
    "nombre": "Plaza Mayor",
    "categoria": "Patrimonio",
    "categoria_color": "#1B4F8A",
    "foto": "https://ejemplo.com/plaza-mayor.jpg",
    "foto_hero": "https://ejemplo.com/plaza-mayor-hero.jpg",
    "resumen": "El corazón colonial de Trinidad...",
    "distancia": "0 km — Centro de la ciudad"
  },
  ...
]
```

#### Detalle de un lugar
```
GET /api/lugares/{slug}/
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "slug": "plaza-mayor",
  "nombre": "Plaza Mayor",
  "categoria": "Patrimonio",
  "categoria_color": "#1B4F8A",
  "foto": "https://...",
  "foto_hero": "https://...",
  "resumen": "El corazón colonial de Trinidad...",
  "descripcion": "La Plaza Mayor de Trinidad es el alma histórica...\n\nRodeada de imponentes...",
  "horario": "Abierta las 24 horas",
  "entrada": "Gratuita",
  "ubicacion": "Centro histórico de Trinidad",
  "distancia": "0 km — Centro de la ciudad",
  "consejos": "Visítala al amanecer o al atardecer..."
}
```

**Categorías posibles:** `Patrimonio`, `UNESCO`, `Naturaleza`, `Cultura`, `Costa`

---

### 3.2 Alojamiento

**Página que los usa:** `/services` (tab Alojamiento)
**Datos actuales en:** `constants/data.ts` → `accommodations`

```
GET /api/servicios/alojamiento/
```

**Respuesta esperada:**
```json
[
  {
    "id": "1",
    "nombre": "Hostal Académico \"La Merced\"",
    "descripcion": "Ubicado en el corazón del centro histórico...",
    "amenidades": [
      "Habitaciones climatizadas",
      "Camas personales y matrimoniales",
      "Televisión",
      "Minibar",
      "Duchas con agua fría y caliente",
      "Servicio de lavandería",
      "Desayuno incluido"
    ],
    "habitaciones": "8 habitaciones",
    "foto": "https://...",
    "icono": "bed-outline"
  }
]
```

---

### 3.3 Gastronomía

**Página que los usa:** `/services` (tab Gastronomía)
**Datos actuales en:** `constants/data.ts` → `gastronomyVenues`

```
GET /api/servicios/gastronomia/
```

**Respuesta esperada:**
```json
[
  {
    "id": "1",
    "nombre": "Centro Cultural Patio Bécquer",
    "descripcion": "Espacio gastronómico y cultural...",
    "oferta": [
      "Coctelería cubana: mojito, daiquiri, cuba libre...",
      "Cocina criolla tradicional",
      "Música en vivo"
    ],
    "foto": "https://...",
    "icono": "musical-notes-outline"
  }
]
```

**Restaurantes a incluir (5):**
1. Centro Cultural Patio Bécquer
2. Taberna Guanahuac
3. Bar Cafetería Playa Ancón
4. Bar Cafetería San Isidro de los Destiladeros
5. Acuario

---

### 3.4 Excursiones

**Página que los usa:** `/excursions`
**Datos actuales en:** `constants/data.ts` → `excursions`

```
GET /api/excursiones/
```

**Respuesta esperada:**
```json
[
  {
    "id": "1",
    "nombre": "Centro Histórico de Trinidad",
    "descripcion": "Recorrido especializado por las calles empedradas...",
    "caracteristicas": [
      "Guía especializado en patrimonio",
      "Opción con o sin transporte",
      "Opción con almuerzo incluido",
      "Sesiones fotográficas especiales",
      "Duración: 3-4 horas"
    ],
    "duracion": "3-4 horas",
    "foto": "https://...",
    "icono": "walk-outline"
  }
]
```

**Excursiones a incluir (3):**
1. Centro Histórico de Trinidad (3–4 h)
2. Valle de los Ingenios (5–6 h)
3. Casa Hacienda Guaimaro (2–3 h)

---

### 3.5 Eventos — espacios

**Página que los usa:** `/events`
**Datos actuales en:** `constants/data.ts` → `eventSpaces`

```
GET /api/eventos/espacios/
```

**Respuesta esperada:**
```json
[
  {
    "id": "1",
    "nombre": "Centro Cultural Patio Bécquer",
    "capacidad": "100 personas",
    "descripcion": "Amplio patio colonial con escenario para música en vivo...",
    "tipos_evento": [
      "Bodas",
      "Cumpleaños",
      "Fiestas de 15",
      "Banquetes",
      "Eventos académicos",
      "Presentaciones de libros"
    ],
    "foto": "https://...",
    "icono": "people-outline"
  }
]
```

---

### 3.6 Eventos — servicios culturales

**Página que los usa:** `/events`
**Datos actuales en:** `constants/data.ts` → `culturalServices`

```
GET /api/eventos/culturales/
```

**Respuesta esperada:**
```json
[
  {
    "id": "1",
    "nombre": "Casa Hacienda Guaimaro",
    "descripcion": "Servicio de interpretación histórico-cultural...",
    "foto": "https://...",
    "icono": "library-outline"
  }
]
```

---

### 3.7 Otros servicios

**Página que los usa:** `/events`
**Datos actuales en:** `constants/data.ts` → `otherServices`

```
GET /api/servicios/otros/
```

**Respuesta esperada:**
```json
[
  {
    "id": "1",
    "nombre": "Recorridos en coches coloniales",
    "descripcion": "Paseos por la ciudad en coches tirados por caballos...",
    "icono": "car-outline"
  }
]
```

**Servicios a incluir (4):**
1. Recorridos en coches coloniales
2. Papelería turística
3. Artesanía local
4. Servicio de guías turísticos

---

### 3.8 Información de la empresa

**Página que los usa:** `/about`
**Datos actuales en:** `constants/data.ts` → `companyInfo`

```
GET /api/empresa/
```

**Respuesta esperada:**
```json
{
  "nombre": "Aldaba",
  "tagline": "Gestión y promoción de servicios turísticos, culturales, patrimoniales y gastronómicos",
  "ubicacion": "Trinidad y Valle de los Ingenios, Cuba",
  "descripcion": "Aldaba es una empresa dedicada a la gestión...",
  "mision": "Promover el desarrollo turístico sostenible de Trinidad...",
  "valores": [
    "Preservación del patrimonio",
    "Desarrollo comunitario",
    "Excelencia en el servicio",
    "Autenticidad cultural",
    "Sostenibilidad"
  ],
  "contacto": {
    "direccion": "Centro Histórico, Trinidad, Sancti Spíritus, Cuba",
    "telefono": "+53 41 99 XXXX",
    "email": "info@aldaba.cu"
  }
}
```

---

### 3.9 Proyectos comunitarios

**Página que los usa:** `/about`
**Datos actuales en:** `constants/data.ts` → `communityProjects`

```
GET /api/empresa/proyectos/
```

**Respuesta esperada:**
```json
[
  {
    "id": "1",
    "titulo": "Talleres con niños",
    "descripcion": "Programas educativos y recreativos para niños...",
    "anio": "2023",
    "icono": "school-outline"
  }
]
```

---

### 3.10 Reservas

Actualmente no existe endpoint publico `POST /api/reservas/` en el backend.

El flujo de reservas vigente en API esta enfocado en administracion de reservas de excursiones mediante:

```
GET    /api/admin/excursiones-reservas/
POST   /api/admin/excursiones-reservas/
GET    /api/admin/excursiones-reservas/{id}/
PUT    /api/admin/excursiones-reservas/{id}/
PATCH  /api/admin/excursiones-reservas/{id}/
DELETE /api/admin/excursiones-reservas/{id}/
```

Todos estos endpoints requieren autenticacion de usuario staff.

---

## 4. Endpoints del panel de administración

Todos requieren el header `Authorization: Bearer {token}`.

---

### 4.1 Habitaciones (Hostales)

**Panel:** Sección "Hostales" en `/admin`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/admin/habitaciones/` | Listar todas las habitaciones |
| `POST` | `/api/admin/habitaciones/` | Crear habitación |
| `GET` | `/api/admin/habitaciones/{id}/` | Ver detalle |
| `PUT` | `/api/admin/habitaciones/{id}/` | Editar habitación |
| `DELETE` | `/api/admin/habitaciones/{id}/` | Eliminar habitación |

**Estructura de habitación:**
```json
{
  "id": 1,
  "hostal": "Hostal Académico \"La Merced\"",
  "foto": "https://...",
  "numero": "101",
  "tipo": "Doble",
  "huespedes": 2,
  "disponible": true,
  "precio": 50,
  "reserva": "—"
}
```

**Campos `tipo`:** `Simple`, `Doble`, `Triple`, `Suite`

**Estadísticas calculadas en el backend:**
```
GET /api/admin/habitaciones/estadisticas/
→ { "total": 4, "disponibles": 2, "ocupadas": 2, "reservadas": 1 }
```

---

### 4.2 Reservas de excursiones

**Panel:** Sección "Excursiones" en `/admin`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/admin/excursiones-reservas/` | Listar todas |
| `POST` | `/api/admin/excursiones-reservas/` | Crear reserva |
| `GET` | `/api/admin/excursiones-reservas/{id}/` | Ver detalle |
| `PUT` | `/api/admin/excursiones-reservas/{id}/` | Editar |
| `DELETE` | `/api/admin/excursiones-reservas/{id}/` | Eliminar |

**Estructura:**
```json
{
  "id": 1,
  "nombre": "Centro Histórico de Trinidad",
  "foto": "https://...",
  "fecha": "2026-05-10",
  "hora": "09:00",
  "personas": 8,
  "guia": "Carlos Díaz",
  "precio": 25,
  "estado": "Confirmada"
}
```

**Campos `estado`:** `Pendiente`, `Confirmada`, `Cancelada`

**Estadísticas:**
```
GET /api/admin/excursiones-reservas/estadisticas/
→ { "total": 3, "pendientes": 1, "confirmadas": 2, "canceladas": 0 }
```

---

### 4.3 Mesas (Restaurantes)

**Panel:** Sección "Restaurantes" en `/admin`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/admin/mesas/` | Listar todas las mesas |
| `POST` | `/api/admin/mesas/` | Crear mesa |
| `GET` | `/api/admin/mesas/{id}/` | Ver detalle |
| `PUT` | `/api/admin/mesas/{id}/` | Editar mesa |
| `DELETE` | `/api/admin/mesas/{id}/` | Eliminar mesa |

**Estructura:**
```json
{
  "id": 1,
  "restaurante": "Centro Cultural Patio Bécquer",
  "foto": "https://...",
  "numero": 1,
  "capacidad": 4,
  "ocupada": true,
  "reserva": "Familia García",
  "pago": 120,
  "estado": "Ocupada"
}
```

**Campos `estado`:** `Libre`, `Ocupada`, `Reservada`

**Estadísticas:**
```
GET /api/admin/mesas/estadisticas/
→ { "total": 4, "libres": 1, "ocupadas": 2, "reservadas": 1 }
```

---

## 5. Cómo conectar cada página del frontend

### Paso 1 — Función helper de fetch

Crear `client/src/utils/api.ts`:

```ts
const BASE = '/api';

function getToken() {
  return localStorage.getItem('aldaba_token');
}

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
  const res = await fetch(`${BASE}${endpoint}`, { ...options, headers });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Shorthand helpers
export const apiGet = (url: string) => apiFetch(url);
export const apiPost = (url: string, body: object) =>
  apiFetch(url, { method: 'POST', body: JSON.stringify(body) });
export const apiPut = (url: string, body: object) =>
  apiFetch(url, { method: 'PUT', body: JSON.stringify(body) });
export const apiDelete = (url: string) =>
  apiFetch(url, { method: 'DELETE' });
```

---

### Paso 2 — Conexión por página

#### `/lugares` — Lugares.tsx
```ts
// Reemplazar: import LUGARES from '../data/lugaresData';
// Por:
const [lugares, setLugares] = useState([]);
useEffect(() => {
  apiGet('/lugares/').then(setLugares);
}, []);
```

#### `/lugares/:slug` — LugarDetalle.tsx
```ts
const { slug } = useParams();
const [lugar, setLugar] = useState(null);
useEffect(() => {
  apiGet(`/lugares/${slug}/`).then(setLugar);
}, [slug]);
```

#### `/services` — Services.tsx
```ts
// Tab Alojamiento
apiGet('/servicios/alojamiento/').then(setAlojamiento);
// Tab Gastronomía
apiGet('/servicios/gastronomia/').then(setGastronomia);
```

#### `/excursions` — Excursions.tsx
```ts
apiGet('/excursiones/').then(setExcursiones);
```

#### `/events` — Events.tsx
```ts
Promise.all([
  apiGet('/eventos/espacios/'),
  apiGet('/eventos/culturales/'),
  apiGet('/servicios/otros/'),
]).then(([espacios, culturales, otros]) => {
  setEspacios(espacios);
  setCulturales(culturales);
  setOtros(otros);
});
```

#### `/about` — About.tsx
```ts
apiGet('/empresa/').then(setEmpresa);
apiGet('/empresa/proyectos/').then(setProyectos);
```

#### `/admin` — AdminPanel.tsx (secciones)
```ts
// Habitaciones
apiGet('/admin/habitaciones/').then(setData);
apiPost('/admin/habitaciones/', nuevaHabitacion);
apiPut(`/admin/habitaciones/${id}/`, editada);
apiDelete(`/admin/habitaciones/${id}/`);

// Excursiones-reservas
apiGet('/admin/excursiones-reservas/').then(setData);
// ... (igual que habitaciones)

// Mesas
apiGet('/admin/mesas/').then(setData);
// ... (igual que habitaciones)
```

---

## 6. Modelos Django de referencia

```python
# models.py

from django.db import models

class LugarTuristico(models.Model):
    CATEGORIAS = [
        ('Patrimonio', 'Patrimonio'),
        ('UNESCO', 'UNESCO'),
        ('Naturaleza', 'Naturaleza'),
        ('Cultura', 'Cultura'),
        ('Costa', 'Costa'),
    ]
    slug           = models.SlugField(unique=True)
    nombre         = models.CharField(max_length=200)
    categoria      = models.CharField(max_length=50, choices=CATEGORIAS)
    categoria_color = models.CharField(max_length=20, default='#1B4F8A')
    foto           = models.URLField()
    foto_hero      = models.URLField()
    resumen        = models.TextField()
    descripcion    = models.TextField()
    horario        = models.CharField(max_length=200)
    entrada        = models.CharField(max_length=100)
    ubicacion      = models.CharField(max_length=200)
    distancia      = models.CharField(max_length=100)
    consejos       = models.TextField()

    def __str__(self):
        return self.nombre


class Alojamiento(models.Model):
    nombre      = models.CharField(max_length=200)
    descripcion = models.TextField()
    amenidades  = models.JSONField(default=list)
    habitaciones = models.CharField(max_length=50)
    foto        = models.URLField(blank=True)
    icono       = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class Gastronomia(models.Model):
    nombre      = models.CharField(max_length=200)
    descripcion = models.TextField()
    oferta      = models.JSONField(default=list)
    foto        = models.URLField(blank=True)
    icono       = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class Excursion(models.Model):
    nombre          = models.CharField(max_length=200)
    descripcion     = models.TextField()
    caracteristicas = models.JSONField(default=list)
    duracion        = models.CharField(max_length=50)
    foto            = models.URLField(blank=True)
    icono           = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class EspacioEvento(models.Model):
    nombre       = models.CharField(max_length=200)
    capacidad    = models.CharField(max_length=50)
    descripcion  = models.TextField()
    tipos_evento = models.JSONField(default=list)
    foto         = models.URLField(blank=True)
    icono        = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class ServicioCultural(models.Model):
    nombre      = models.CharField(max_length=200)
    descripcion = models.TextField()
    foto        = models.URLField(blank=True)
    icono       = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class OtroServicio(models.Model):
    nombre      = models.CharField(max_length=200)
    descripcion = models.TextField()
    icono       = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class Reserva(models.Model):
    TIPOS = [
        ('alojamiento', 'Alojamiento'),
        ('gastronomia', 'Gastronomía'),
        ('excursion', 'Excursión'),
        ('evento', 'Evento'),
    ]
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'),
        ('cancelada', 'Cancelada'),
    ]
    tipo            = models.CharField(max_length=20, choices=TIPOS)
    establecimiento = models.CharField(max_length=200)
    nombre_cliente  = models.CharField(max_length=200)
    email           = models.EmailField()
    telefono        = models.CharField(max_length=30, blank=True)
    fecha_inicio    = models.DateField()
    fecha_fin       = models.DateField(null=True, blank=True)
    personas        = models.PositiveIntegerField(default=1)
    mensaje         = models.TextField(blank=True)
    estado          = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')
    creada          = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre_cliente} — {self.tipo} ({self.estado})"


# ── Modelos del panel de administración ──

class Habitacion(models.Model):
    TIPOS = [('Simple','Simple'),('Doble','Doble'),('Triple','Triple'),('Suite','Suite')]
    hostal     = models.CharField(max_length=200)
    foto       = models.URLField(blank=True)
    numero     = models.CharField(max_length=10)
    tipo       = models.CharField(max_length=20, choices=TIPOS)
    huespedes  = models.PositiveIntegerField()
    disponible = models.BooleanField(default=True)
    precio     = models.DecimalField(max_digits=8, decimal_places=2)
    reserva    = models.CharField(max_length=200, default='—')

    def __str__(self):
        return f"{self.hostal} — Hab. {self.numero}"


class ReservaExcursion(models.Model):
    ESTADOS = [('Pendiente','Pendiente'),('Confirmada','Confirmada'),('Cancelada','Cancelada')]
    nombre   = models.CharField(max_length=200)
    foto     = models.URLField(blank=True)
    fecha    = models.DateField()
    hora     = models.TimeField()
    personas = models.PositiveIntegerField()
    guia     = models.CharField(max_length=200)
    precio   = models.DecimalField(max_digits=8, decimal_places=2)
    estado   = models.CharField(max_length=20, choices=ESTADOS, default='Pendiente')

    def __str__(self):
        return f"{self.nombre} — {self.fecha}"


class Mesa(models.Model):
    ESTADOS = [('Libre','Libre'),('Ocupada','Ocupada'),('Reservada','Reservada')]
    restaurante = models.CharField(max_length=200)
    foto        = models.URLField(blank=True)
    numero      = models.PositiveIntegerField()
    capacidad   = models.PositiveIntegerField()
    ocupada     = models.BooleanField(default=False)
    reserva     = models.CharField(max_length=200, default='—')
    pago        = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    estado      = models.CharField(max_length=20, choices=ESTADOS, default='Libre')

    def __str__(self):
        return f"{self.restaurante} — Mesa {self.numero}"
```

---

### URLs de la app (aldaba/urls.py)

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('lugares', views.LugarViewSet)
router.register('servicios/alojamiento', views.AlojamientoViewSet)
router.register('servicios/gastronomia', views.GastronomiaViewSet)
router.register('excursiones', views.ExcursionViewSet)
router.register('eventos/espacios', views.EspacioEventoViewSet)
router.register('eventos/culturales', views.ServicioCulturalViewSet)
router.register('servicios/otros', views.OtroServicioViewSet)
router.register('admin/habitaciones', views.HabitacionViewSet)
router.register('admin/excursiones-reservas', views.ReservaExcursionViewSet)
router.register('admin/mesas', views.MesaViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('empresa/', views.empresa_info),
    path('empresa/proyectos/', views.proyectos_comunitarios),
    path('reservas/', views.crear_reserva),
]
```

---

*Guía generada para el proyecto Aldaba — Trinidad, Cuba © 2025*
