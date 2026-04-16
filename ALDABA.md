# Aldaba — Documentación del Proyecto

> Plataforma de gestión y promoción turística, cultural y gastronómica de Trinidad y el Valle de los Ingenios, Cuba. Ciudad Patrimonio de la Humanidad por la UNESCO (1988).

---

## Índice

1. [Descripción general](#descripción-general)
2. [Arquitectura técnica](#arquitectura-técnica)
3. [Estructura de directorios](#estructura-de-directorios)
4. [Frontend web — Páginas y funcionalidades](#frontend-web--páginas-y-funcionalidades)
5. [Panel de administración](#panel-de-administración)
6. [Backend / API](#backend--api)
7. [Modelos de datos](#modelos-de-datos)
8. [Rutas de navegación](#rutas-de-navegación)
9. [Paleta de colores y tipografía](#paleta-de-colores-y-tipografía)
10. [Comandos de desarrollo](#comandos-de-desarrollo)

---

## Descripción general

**Aldaba** es una empresa de gestión turística con sede en Trinidad, Cuba. Su plataforma web permite a turistas y visitantes descubrir los servicios, lugares de interés, excursiones, eventos culturales y la historia de la ciudad. Internamente, el equipo de Aldaba puede gestionar el inventario de habitaciones, mesas y excursiones a través de un panel de administración protegido.

**Misión:** Promover el desarrollo turístico sostenible de Trinidad, preservando su patrimonio cultural e histórico y contribuyendo al bienestar de la comunidad local.

**Valores:** Preservación del patrimonio · Desarrollo comunitario · Excelencia en el servicio · Autenticidad cultural · Sostenibilidad

---

## Arquitectura técnica

| Componente | Tecnología | Puerto |
|---|---|---|
| Frontend web | React 19 + Vite | 5000 (dev) |
| Backend API | Express 5 + TypeScript | 3001 (dev) |
| Base de datos | PostgreSQL + Drizzle ORM | — |
| Validación | Zod + drizzle-zod | — |
| Build | Vite (frontend) + esbuild (server) | — |

**Stack completo:**
- React 19, React Router 7, TanStack Query, Lucide React, Vite
- Express 5, Node.js, TypeScript, tsx
- Drizzle ORM + PostgreSQL (pg driver)
- npm + concurrently (dev runner)

---

## Estructura de directorios

```
/
├── client/                    # Frontend React (Vite)
│   └── src/
│       ├── pages/             # Páginas de la app
│       │   ├── Home.tsx       # Página de inicio
│       │   ├── Lugares.tsx    # Listado de lugares turísticos
│       │   ├── LugarDetalle.tsx  # Detalle de cada lugar turístico
│       │   ├── Services.tsx   # Alojamiento y Gastronomía
│       │   ├── Excursions.tsx # Excursiones disponibles
│       │   ├── Events.tsx     # Eventos y servicios culturales
│       │   └── About.tsx      # Nosotros, misión, contacto
│       ├── components/
│       │   ├── NavBar.tsx     # Barra de navegación principal
│       │   ├── Footer.tsx     # Pie de página
│       │   └── Modal.tsx      # Modal de reserva/información
│       ├── admin/
│       │   ├── AdminPanel.tsx # Panel de administración completo
│       │   └── AdminPanel.css # Estilos del panel de admin
│       ├── data/
│       │   └── lugaresData.ts # Datos de los 8 lugares turísticos
│       ├── styles/
│       │   └── global.css     # Estilos globales (fuentes, grids, responsive)
│       ├── App.tsx            # Router principal + rutas
│       ├── colors.ts          # Paleta de colores centralizada
│       └── main.tsx           # Punto de entrada React
│
├── server/                    # Backend Express
│   ├── index.ts               # Servidor principal, CORS, middlewares
│   ├── routes.ts              # Rutas API (/api/*)
│   ├── storage.ts             # Capa de datos (MemStorage, Drizzle-ready)
│   ├── reserva.ts             # Lógica de reservas
│   └── templates/             # HTML templates
│
├── constants/
│   └── data.ts                # Datos compartidos: hostales, restaurantes,
│                              # excursiones, eventos, servicios, empresa
├── shared/                    # Tipos y schema Drizzle compartidos
├── ALDABA.md                  # Este archivo de documentación
├── replit.md                  # Notas de arquitectura para el entorno
├── vite.config.ts             # Config Vite: puerto 5000, proxy /api → 3001
├── package.json               # Scripts de desarrollo y build
└── drizzle.config.ts          # Config ORM
```

---

## Frontend web — Páginas y funcionalidades

### 1. Inicio (`/`)

La página principal de Aldaba. Presenta:

- **Carrusel de imágenes** (5 slides con transición automática cada 4.5s):
  - Plaza Mayor de Trinidad
  - Valle de los Ingenios
  - Alojamiento Colonial
  - Gastronomía Cubana
  - Trinidad de Noche
- **Tarjeta de acceso rápido** con descripción de Aldaba y 4 botones de navegación:
  - Alojamiento → `/services`
  - Gastronomía → `/services`
  - Excursiones → `/excursions`
  - Eventos → `/events`
- **Sección "Lo que nos distingue"** — 4 highlights de Trinidad:
  - Patrimonio UNESCO (desde 1988)
  - Valle de los Ingenios
  - Cultura Viva
  - Gastronomía Criolla
- **Sección "Lugares Turísticos Destacados"** — Grid de 6 tarjetas de lugares con foto, categoría, nombre, descripción y enlace a la subpágina de detalle. Botón "Ver todos" hacia `/lugares`.
- **Banner CTA** — "¿Listo para explorar Trinidad?" con botón hacia `/about` (contacto).

---

### 2. Lugares Turísticos (`/lugares`)

Listado completo de los **8 lugares turísticos** más importantes de Trinidad y su entorno. Presenta:

- **Cabecera con hero azul** con título y descripción.
- **Filtros por categoría** (tabs): Todos, Patrimonio, UNESCO, Naturaleza, Cultura, Costa.
- **Grid de tarjetas** (3 columnas, responsive) con:
  - Foto de portada con overlay de gradiente.
  - Badge de categoría con color propio.
  - Nombre (tipografía Playfair Display).
  - Descripción breve.
  - Distancia desde Trinidad + flecha de acción.
- Cada tarjeta enlaza a su subpágina de detalle.

**Los 8 lugares documentados:**

| # | Nombre | Categoría | Distancia |
|---|---|---|---|
| 1 | Plaza Mayor | Patrimonio | Centro de la ciudad |
| 2 | Valle de los Ingenios | UNESCO | 12 km al noreste |
| 3 | Playa Ancón | Naturaleza | 12 km al suroeste |
| 4 | El Nicho | Naturaleza | 52 km al norte |
| 5 | Topes de Collantes | Naturaleza | 17 km al norte |
| 6 | Museo Romántico | Cultura | Centro histórico |
| 7 | Iglesia Parroquial | Patrimonio | Frente a Plaza Mayor |
| 8 | La Boca | Costa | 5 km al suroeste |

---

### 3. Detalle de lugar turístico (`/lugares/:slug`)

Subpágina individual para cada lugar. Incluye:

- **Hero fotográfico** de ancho completo (420px altura) con título, categoría y breadcrumb de vuelta.
- **Descripción extensa** (varios párrafos) sobre la historia y características del lugar.
- **Panel de información práctica** (sidebar):
  - Horario de visita
  - Precio de entrada
  - Ubicación exacta
  - Distancia desde Trinidad
- **Tarjeta CTA** con botón hacia `/excursions`.
- **Sección "También te puede interesar"** — 3 lugares relacionados con foto y categoría.
- **Consejos del viajero** — tip box con recomendaciones prácticas.

---

### 4. Servicios (`/services`)

Gestión de alojamiento y gastronomía con tabs de navegación interna.

#### Tab Alojamiento — 2 establecimientos:

| Establecimiento | Hab. | Amenidades destacadas |
|---|---|---|
| Hostal Académico "La Merced" | 8 | AC, TV, minibar, lavandería, desayuno |
| Casa de Eventos "Amargura #85" | 5 | Bañera, patio colonial, terraza panorámica |

Cada tarjeta muestra: imagen, nombre, descripción, amenidades (3 + contador), botón "Solicitar reserva" (abre modal).

#### Tab Gastronomía — 5 establecimientos:

| Establecimiento | Especialidad |
|---|---|
| Centro Cultural Patio Bécquer | Coctelería cubana, música en vivo |
| Taberna Guanahuac | Platos típicos, ambiente histórico |
| Bar Cafetería Playa Ancón | Cócteles tropicales, vista al mar |
| Bar Cafetería San Isidro | Café regional, vista al Valle |
| Acuario | Comida ligera, espacio educativo |

Cada tarjeta muestra: imagen, nombre, descripción, tags de oferta, botón "Más información" (abre modal).

---

### 5. Excursiones (`/excursions`)

Listado de 3 excursiones guiadas disponibles:

| Excursión | Duración | Incluye |
|---|---|---|
| Centro Histórico de Trinidad | 3–4 horas | Guía UNESCO, sesión fotográfica |
| Valle de los Ingenios | 5–6 horas | Transporte, almuerzo criollo opcional |
| Casa Hacienda Guaimaro | 2–3 horas | Interpretación histórico-cultural |

Cada tarjeta muestra: imagen, badge de duración, nombre, descripción, características (lista con bullet points), botón "Reservar excursión" (abre modal).

**Barra de características del servicio:**
- Guías especializados
- Horarios flexibles
- Transporte disponible
- Grupos reducidos

---

### 6. Eventos & Cultura (`/events`)

Organizada en 3 secciones:

#### Espacios para eventos — 2 venues:

| Espacio | Capacidad | Tipos de evento |
|---|---|---|
| Centro Cultural Patio Bécquer | 100 personas | Bodas, cumpleaños, 15, banquetes, académicos |
| Casa de Eventos "Amargura #85" | 50 personas | Reuniones privadas, cenas de gala, corporativos |

#### Servicios culturales — 4 servicios:
- Casa Hacienda Guaimaro (interpretación histórico-cultural)
- Centro Cultural Patio Bécquer (música en vivo)
- Taberna Guanahuac (ambientación histórica colonial)
- Acuario (espacio educativo ambiental)

#### Otros servicios — 4 servicios:
- Recorridos en coches coloniales
- Papelería turística (mapas, guías)
- Artesanía local (souvenirs)
- Servicio de guías turísticos

---

### 7. Nosotros (`/about`)

Información institucional de Aldaba:

- **¿Quiénes somos?** — Descripción completa de la empresa.
- **Misión** — Desarrollo turístico sostenible de Trinidad.
- **Nuestros valores** — 5 valores en grid de tarjetas con iconos.
- **Proyectos comunitarios** — Timeline cronológico con 5 proyectos (2023–2025):
  - Talleres con niños (2023)
  - Actividades comunitarias (2023)
  - Concursos gastronómicos (2024)
  - Festejos tradicionales (2024)
  - Celebraciones locales (2025)
- **Contacto** — Dirección, teléfono y correo electrónico.

---

## Panel de administración

Acceso en `/admin`. Credenciales: `admin` / `admin123`.

Interfaz de gestión interna con:
- **Sidebar oscura** (#0f172a) con navegación por secciones y botón de cierre de sesión.
- **Topbar** con breadcrumb "Aldaba / [Sección]" y avatar del administrador.
- **Pantalla de login** — formulario con validación y fondo dark con gradientes.

### Sección Hostales

Gestión de habitaciones de los hostales. Tabla con campos:
- Foto, Hostal, N° habitación, Tipo (Simple/Doble/Triple/Suite), Huéspedes, Estado (Disponible/Ocupada), Precio/noche, Reserva

**Estadísticas en tiempo real:** Total habitaciones · Disponibles · Ocupadas · Reservadas

**CRUD completo:**
- **Agregar** — Modal con selector de hostal (auto-rellena foto), tipo, capacidad, precio, estado.
- **Ver** (👁 → "Ver") — Modal con todos los datos y foto del hostal.
- **Editar** (✏️ → "Editar") — Modal de edición con todos los campos.
- **Eliminar** ("Borrar") — Modal de confirmación antes de eliminar.

**Establecimientos gestionados:**
- Hostal Académico "La Merced"
- Casa de Eventos "Amargura #85"

---

### Sección Excursiones

Gestión del inventario de excursiones. Tabla con campos:
- Foto, Excursión, Fecha, Hora, N° personas, Guía, Precio/persona, Estado (Pendiente/Confirmada/Cancelada)

**Estadísticas en tiempo real:** Total · Pendientes · Confirmadas · Canceladas

**CRUD completo** — misma funcionalidad que Hostales.

**Excursiones disponibles:**
- Centro Histórico de Trinidad
- Valle de los Ingenios
- Casa Hacienda Guaimaro
- Playa Ancón

---

### Sección Restaurantes

Gestión de mesas de los restaurantes. Tabla con campos:
- Foto, Restaurante, Mesa N°, Capacidad, Estado (Libre/Ocupada), Reserva, Pago

**Estadísticas en tiempo real:** Total mesas · Libres · Ocupadas · Reservadas

**CRUD completo** — misma funcionalidad que las demás secciones.

**Restaurantes gestionados:**
- Centro Cultural Patio Bécquer
- Taberna Guanahuac
- Bar Cafetería Playa Ancón
- Bar Cafetería San Isidro
- Acuario

---

## Backend / API

Servidor Express en TypeScript con las siguientes características:

- **CORS** habilitado para desarrollo.
- **Rutas API** bajo el prefijo `/api` (definidas en `routes.ts`).
- **Lógica de reservas** en `reserva.ts`.
- **Almacenamiento** en `storage.ts` (MemStorage en desarrollo, Drizzle-ready para producción).
- En producción: sirve el SPA de React desde `client-dist/` y el landing page en `/`.

---

## Modelos de datos

### Accommodation (Alojamiento)
```typescript
{
  id: string;
  name: string;
  description: string;
  amenities: string[];
  rooms: string;
  icon: string;
}
```

### GastronomyVenue (Gastronomía)
```typescript
{
  id: string;
  name: string;
  description: string;
  offerings: string[];
  icon: string;
}
```

### Excursion
```typescript
{
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
}
```

### EventSpace (Espacio para eventos)
```typescript
{
  id: string;
  name: string;
  capacity: string;
  description: string;
  eventTypes: string[];
  icon: string;
}
```

### LugarTuristico (Lugar turístico)
```typescript
{
  id: number;
  slug: string;
  nombre: string;
  categoria: string;
  categoriaColor: string;
  foto: string;
  fotoHero: string;
  resumen: string;
  descripcion: string;    // texto largo con párrafos separados por \n\n
  horario: string;
  entrada: string;
  ubicacion: string;
  distancia: string;
  consejos: string;
}
```

### Admin — Habitación (panel)
```typescript
{
  id: number;
  hostal: string;
  foto: string;
  numero: string;
  tipo: "Simple" | "Doble" | "Triple" | "Suite";
  huespedes: number;
  disponible: boolean;
  precio: number;
  reserva: string;
}
```

### Admin — Excursión (panel)
```typescript
{
  id: number;
  nombre: string;
  foto: string;
  fecha: string;
  hora: string;
  personas: number;
  guia: string;
  precio: number;
  estado: "Pendiente" | "Confirmada" | "Cancelada";
}
```

### Admin — Mesa (panel)
```typescript
{
  id: number;
  restaurante: string;
  foto: string;
  numero: number;
  capacidad: number;
  ocupada: boolean;
  reserva: string;
  pago: number;
  estado: "Libre" | "Ocupada" | "Reservada";
}
```

---

## Rutas de navegación

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home.tsx` | Página de inicio con carrusel y secciones |
| `/lugares` | `Lugares.tsx` | Listado de 8 lugares turísticos con filtros |
| `/lugares/:slug` | `LugarDetalle.tsx` | Detalle completo de un lugar turístico |
| `/services` | `Services.tsx` | Alojamiento y gastronomía (tabs) |
| `/excursions` | `Excursions.tsx` | Excursiones disponibles |
| `/events` | `Events.tsx` | Eventos, servicios culturales y otros |
| `/about` | `About.tsx` | Información corporativa y contacto |
| `/admin` | `AdminPanel.tsx` | Panel de administración (login requerido) |

**Navegación principal:** Inicio · Lugares · Servicios · Excursiones · Eventos · Nosotros

---

## Paleta de colores y tipografía

### Colores (`colors.ts`)

| Variable | Hex | Uso |
|---|---|---|
| `primary` | `#1B4F8A` | Azul de marca — botones, títulos, links |
| `primaryLight` | `#2563EB` | Variante clara del azul principal |
| `secondary` | `#0EA5E9` | Azul cielo — íconos, acentos |
| `secondaryLight` | `#38BDF8` | Azul claro — texto sobre fondos oscuros |
| `accent` | `#06B6D4` | Cian — puntos decorativos, badges |
| `accentLight` | `#A5F3FC` | Cian muy claro |
| `background` | `#C2D9EE` | Fondo general de la app |
| `card` | `#FFFFFF` | Fondo de tarjetas y modales |
| `text` | `#0C1524` | Texto principal |
| `textSecondary` | `#4A6FA5` | Texto secundario |
| `textTertiary` | `#8BA7C7` | Texto terciario / placeholders |
| `border` | `#BFDBF7` | Borde de tarjetas |
| `borderLight` | `#A8C8E4` | Borde suave |

### Colores del Admin Panel

| Variable | Hex | Uso |
|---|---|---|
| Sidebar | `#0f172a` | Fondo de la barra lateral |
| Primary blue | `#1B4F8A` | Botones y acciones principales |
| Active nav | `rgba(27,79,138,0.15)` | Item activo en sidebar |
| Accent nav | `#4E7EC4` | Dot del logo y barra activa |

### Tipografía

| Fuente | Peso | Uso |
|---|---|---|
| **Playfair Display** | 600, 700 | Títulos, h1, h2, nombres de lugares |
| **DM Sans** | 400, 500, 600, 700 | Cuerpo de texto, labels, botones |
| **Inter** | 400–800 | Exclusivamente en el panel de admin |

---

## Comandos de desarrollo

```bash
# Desarrollo (frontend + backend simultáneo)
npm run dev

# Solo frontend (Vite, puerto 5000)
npm run client:dev

# Solo backend (Express, puerto 3001)
npm run server:dev

# Build de producción
npm run build

# Ejecutar en producción
node server_dist/index.js
```

**Configuración clave:**
- `vite.config.ts` — Puerto 5000, `allowedHosts: true`, proxy `/api` → `localhost:3001`
- `drizzle.config.ts` — ORM config para PostgreSQL
- `tsconfig.json` — Path aliases: `@/*` → root, `@shared/*` → `./shared/*`, `@constants/*` → `./constants/*`

---

## Despliegue

- **Plataforma:** Replit Autoscale
- **Build command:** `npm run build`
- **Run command:** `node server_dist/index.js`
- **Puerto de producción:** 5000

---

*Documentación generada para el proyecto Aldaba — Trinidad, Cuba © 2025*
