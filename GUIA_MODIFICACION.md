# GUIA DE MODIFICACION - Aldaba Trinidad

Este documento explica cada directorio y archivo del proyecto para que puedas editarlo sin dificultad.

---

## ESTRUCTURA GENERAL

```
aldaba-trinidad/
|
|-- app/                  ← Pantallas del sitio web
|-- components/           ← Piezas reutilizables de la interfaz
|-- constants/            ← Textos, datos y colores del sitio
|-- server/               ← Servidor backend + panel de admin
|-- assets/               ← Imagenes e iconos del proyecto
|-- lib/                  ← Configuracion tecnica de red
|-- shared/               ← Tipos de datos compartidos
```

---

## 1. `constants/` — DATOS Y COLORES DEL SITIO

> **Si quieres cambiar textos, descripciones o contenido, empieza aqui.**

### `constants/data.ts`
Es el archivo mas importante para el contenido. Contiene **todos los textos** que aparecen en el sitio:
- Lista de hostales y casas particulares (con amenidades)
- Lista de restaurantes y establecimientos gastronomicos
- Lista de excursiones disponibles (con caracteristicas)
- Lista de espacios para eventos (con tipos de eventos)
- Servicios culturales y servicios complementarios
- Proyectos comunitarios con anos
- Informacion de la empresa (nombre, mision, valores, contacto)

**Como modificarlo:**
- Busca el array que corresponde a lo que quieres cambiar (ej. `excursions`, `accommodations`)
- Edita el texto dentro de las comillas
- Cada elemento tiene campos como `name`, `description`, `icon`

### `constants/colors.ts`
Define **todos los colores** del sitio. Si quieres cambiar la paleta visual, solo edita este archivo y el cambio aplica a todo el sitio automaticamente.

| Variable | Color | Uso |
|---|---|---|
| `primary` | `#1B4F8A` (azul marino) | Botones principales, encabezados, navbar activo |
| `primaryLight` | `#2563EB` (azul brillante) | Gradientes, botones CTA |
| `secondary` | `#0EA5E9` (azul cielo) | Elementos secundarios, excursiones |
| `accent` | `#06B6D4` (cian) | Acentos, eventos |
| `background` | `#F0F8FF` (alice blue) | Fondo general de pantallas |
| `card` | `#FFFFFF` (blanco) | Fondo de tarjetas |
| `text` | `#0C1524` (azul noche) | Texto principal |
| `textSecondary` | `#4A6FA5` (azul medio) | Texto secundario |

---

## 2. `app/` — PANTALLAS DEL SITIO WEB

> **Si quieres modificar lo que el usuario ve en cada seccion, edita estos archivos.**

### `app/_layout.tsx`
Configuracion raiz: fuentes, proveedores globales, splash screen. No necesitas tocarlo salvo que quieras cambiar las fuentes.

### `app/(tabs)/` — Las 5 secciones principales

Cada archivo es una pantalla completa del sitio:

| Archivo | Seccion | Que contiene |
|---|---|---|
| `index.tsx` | **Inicio** | Carrusel de imagenes, tarjeta bienvenida, acceso rapido |
| `services.tsx` | **Servicios** | Alojamiento y gastronomia con imagenes y modal de solicitud |
| `excursions.tsx` | **Excursiones** | Tarjetas con imagenes, detalles y modal de solicitud |
| `events.tsx` | **Eventos** | Espacios para eventos, servicios culturales y otros servicios |
| `about.tsx` | **Nosotros** | Historia, valores, contacto y footer con UCI |

### `app/(tabs)/_layout.tsx`
Configura la barra de navegacion inferior: iconos y colores. Edita aqui si quieres cambiar el icono de alguna seccion o el color activo.

> **Nota:** La barra muestra solo iconos (sin texto), segun el diseno actual.

### `app/+not-found.tsx`
Pagina de error 404. Puedes dejarlo como esta.

---

## 3. IMAGENES DEL SITIO

El sitio usa imagenes de `picsum.photos` (fotos de archivo) mientras no se tengan fotos reales de Trinidad. Para reemplazarlas:

### Carrusel de inicio (`app/(tabs)/index.tsx`)
Busca `carouselSlides` cerca del inicio del archivo. Hay 5 entradas con `uri` y `caption`:
```
{ uri: "https://picsum.photos/seed/.../900/450", caption: "Plaza Mayor...", sub: "..." }
```
Reemplaza la URL del `uri` con la URL de tu foto real.

### Imagenes de encabezado de cada seccion
Cada seccion tiene una imagen de fondo grande en el encabezado:
- **Servicios**: busca `trinidad-hostal-colonial-hotel` en `services.tsx`
- **Excursiones**: busca `cuba-nature-hiking-mountains` en `excursions.tsx`
- **Eventos**: busca `colonial-event-hall-tropical` en `events.tsx`

### Imagenes de tarjetas individuales
- **Hostales** (`services.tsx`): busca `accommodationImages` — objeto con claves 1, 2...
- **Gastronomia** (`services.tsx`): busca `gastronomyImages`
- **Excursiones** (`excursions.tsx`): busca `excursionImages`
- **Espacios de eventos** (`events.tsx`): busca `eventSpaceImages`

---

## 4. `server/` — SERVIDOR BACKEND Y PANEL DE ADMIN

> **El servidor corre en el puerto 5000 y maneja el panel de administracion.**

### `server/index.ts`
Punto de entrada del servidor Express. Define las rutas principales:
- `/` → muestra la landing page
- `/admin` → muestra el panel de administracion
- `/api/*` → rutas de la API

No necesitas modificarlo salvo que quieras agregar nuevas rutas.

### `server/templates/admin.html`
**Panel de administracion de hostales.** Accesible en `/admin` del servidor.

Este archivo contiene todo el panel en un solo HTML:
- La interfaz visual (HTML + CSS con variables de color azul)
- La logica (JavaScript con React via CDN)
- Los datos se guardan en `localStorage` del navegador bajo la clave `aldaba_hostales`

**Como modificar el panel de admin:**
- Para cambiar colores: busca `:root {` cerca del inicio del archivo → modifica las variables CSS
- Para cambiar la logica o agregar campos: busca la seccion `<script>` al final del archivo
- Los hostales de ejemplo iniciales estan en la variable `initialHostales` dentro del script

### `server/routes.ts` y `server/storage.ts`
Archivos de la API del servidor. Actualmente no se usan activamente (el admin guarda en localStorage). Puedes ignorarlos.

---

## 5. `components/` — COMPONENTES TECNICOS

> Estas piezas de interfaz se usan internamente. Generalmente no necesitas modificarlas.

| Archivo | Para que sirve |
|---|---|
| `ErrorBoundary.tsx` | Captura errores de la app y muestra pantalla amigable |
| `ErrorFallback.tsx` | La pantalla visual que se muestra cuando hay un error |
| `KeyboardAwareScrollViewCompat.tsx` | Maneja el teclado en formularios |

---

## 6. `assets/` — IMAGENES E ICONOS DEL PROYECTO

### `assets/images/`

| Archivo | Para que sirve |
|---|---|
| `icon.png` | Icono de la app en dispositivos |
| `splash-icon.png` | Logo que aparece mientras carga |
| `favicon.png` | Icono en la pestana del navegador |
| `android-icon-*.png` | Variantes del icono para Android |

**Para cambiar el icono:** reemplaza `icon.png` con tu nueva imagen (cuadrada, 1024x1024 px recomendado).

---

## 7. `lib/` y `shared/` — ARCHIVOS TECNICOS

### `lib/query-client.ts`
Configuracion de red y peticiones al servidor. No necesitas modificarlo.

### `shared/schema.ts`
Estructura de tipos de datos. Solo toca esto si agregas campos completamente nuevos.

---

## 8. ARCHIVOS DE CONFIGURACION EN LA RAIZ

| Archivo | Para que sirve | Tocar? |
|---|---|---|
| `app.json` | Nombre de la app, version, configuracion de Expo | Solo para cambiar nombre/version |
| `package.json` | Lista de dependencias del proyecto | No tocar manualmente |
| `tsconfig.json` | Configuracion de TypeScript | No tocar |
| `babel.config.js` | Configuracion del compilador JavaScript | No tocar |
| `metro.config.js` | Configuracion del bundler de Expo | No tocar |
| `drizzle.config.ts` | Configuracion de base de datos (no activa) | No tocar |
| `eslint.config.js` | Reglas de calidad de codigo | No tocar |
| `.replit` | Configuracion del entorno Replit | No tocar |

---

## GUIA RAPIDA: DONDE EDITAR CADA COSA

| Quiero cambiar... | Archivo a editar |
|---|---|
| Texto de un hostal o amenidades | `constants/data.ts` → array `accommodations` |
| Texto de un restaurante | `constants/data.ts` → array `gastronomyVenues` |
| Texto de una excursion | `constants/data.ts` → array `excursions` |
| Texto de un evento o espacio | `constants/data.ts` → array `eventSpaces` |
| Informacion de contacto | `constants/data.ts` → objeto `companyInfo.contact` |
| Mision o valores de la empresa | `constants/data.ts` → objeto `companyInfo` |
| Colores del sitio | `constants/colors.ts` |
| Imagenes del carrusel | `app/(tabs)/index.tsx` → `carouselSlides` |
| Imagen de portada de Servicios | `app/(tabs)/services.tsx` → busca `trinidad-hostal-colonial-hotel` |
| Imagen de portada de Excursiones | `app/(tabs)/excursions.tsx` → busca `cuba-nature-hiking-mountains` |
| Imagen de portada de Eventos | `app/(tabs)/events.tsx` → busca `colonial-event-hall-tropical` |
| Imagenes de tarjetas de hostales | `app/(tabs)/services.tsx` → `accommodationImages` |
| Imagenes de tarjetas de excursiones | `app/(tabs)/excursions.tsx` → `excursionImages` |
| Pantalla de inicio | `app/(tabs)/index.tsx` |
| Pantalla de servicios | `app/(tabs)/services.tsx` |
| Pantalla de excursiones | `app/(tabs)/excursions.tsx` |
| Pantalla de eventos | `app/(tabs)/events.tsx` |
| Pantalla "Sobre Nosotros" / Footer | `app/(tabs)/about.tsx` |
| Iconos de la barra de navegacion | `app/(tabs)/_layout.tsx` |
| Panel de administracion | `server/templates/admin.html` |
| Icono del sitio | `assets/images/icon.png` |

---

## COMO SE EJECUTA EL PROYECTO

El proyecto tiene **dos servidores** que corren al mismo tiempo:

| Servidor | Puerto | Comando | Que sirve |
|---|---|---|---|
| Backend (Express) | 5000 | `npm run server:dev` | API + Panel Admin |
| Frontend (Expo) | 8081 | `npm run expo:dev` | Sitio web principal |

- **Sitio web:** `http://localhost:8081`
- **Panel de admin:** `http://localhost:5000/admin`

---

*Documento de referencia para el proyecto Aldaba Trinidad*
*Empresa: Aldaba - Gestion y promocion de servicios turisticos, Trinidad, Cuba*
*Desarrollado con el apoyo de la Universidad de las Ciencias Informaticas*
