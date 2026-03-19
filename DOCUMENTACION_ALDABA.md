# DOCUMENTACION COMPLETA - Aldaba Trinidad
## Sitio Web de Servicios Turisticos, Culturales y Gastronomicos

---

## 1. DESCRIPCION GENERAL

**Aldaba Trinidad** es un sitio web responsivo desarrollado en React con TypeScript, construido sobre el framework Expo con soporte web completo. Presenta y promociona los servicios turisticos, culturales, patrimoniales y gastronomicos en la ciudad de Trinidad y el Valle de los Ingenios, Cuba.

El sitio funciona correctamente tanto en **navegadores de escritorio** como en **dispositivos moviles**, con un diseno adaptativo que centra el contenido en pantallas grandes (max 900px) y ocupa el ancho completo en pantallas pequenas.

### Objetivo
Informar, promocionar y facilitar la solicitud de servicios turisticos ofrecidos por Aldaba, incluyendo alojamiento, gastronomia, excursiones, eventos culturales y servicios complementarios.

### Tecnologias Utilizadas
- **React** (v19) - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estatico
- **Expo** (v54) - Framework de desarrollo con soporte web completo
- **Expo Router** (v6) - Enrutamiento basado en archivos
- **React Native Web** - Renderizado web de componentes nativos
- **Expo Linear Gradient** - Gradientes y overlays sobre imagenes
- **Expo Haptics** - Retroalimentacion haptica (solo dispositivos moviles)
- **Expo Vector Icons (Ionicons)** - Iconografia
- **Google Fonts** - Playfair Display + DM Sans
- **Express.js** - Servidor backend (puerto 5000)
- **TanStack React Query** - Gestion de estado del servidor

---

## 2. ESTRUCTURA DEL PROYECTO

```
aldaba-trinidad/
|
|-- app/                          # Directorio de rutas (Expo Router)
|   |-- _layout.tsx               # Layout raiz con proveedores globales
|   |-- +not-found.tsx            # Pagina 404
|   |-- +native-intent.tsx        # Intenciones nativas
|   |-- (tabs)/                   # Grupo de pestanas
|       |-- _layout.tsx           # Barra de navegacion (iconos sin texto)
|       |-- index.tsx             # Pantalla Inicio (Home) - carrusel + acceso rapido
|       |-- services.tsx          # Pantalla Servicios - alojamiento y gastronomia
|       |-- excursions.tsx        # Pantalla Excursiones - con imagenes
|       |-- events.tsx            # Pantalla Eventos y Servicios Culturales
|       |-- about.tsx             # Pantalla Sobre Nosotros + footer UCI
|
|-- assets/                       # Recursos estaticos
|   |-- images/
|       |-- icon.png              # Icono de la aplicacion
|       |-- splash-icon.png       # Icono del splash screen
|       |-- favicon.png           # Favicon web
|       |-- android-icon-*.png    # Iconos Android adaptativos
|
|-- components/                   # Componentes reutilizables
|   |-- ErrorBoundary.tsx         # Limite de errores React
|   |-- ErrorFallback.tsx         # UI de error con reinicio
|   |-- KeyboardAwareScrollViewCompat.tsx  # ScrollView adaptativo
|
|-- constants/                    # Constantes de la aplicacion
|   |-- colors.ts                 # Paleta de colores azules del tema
|   |-- data.ts                   # Datos del contenido (hostales, excursiones, etc.)
|
|-- lib/                          # Utilidades
|   |-- query-client.ts           # Configuracion de React Query
|
|-- server/                       # Backend Express
|   |-- index.ts                  # Punto de entrada del servidor
|   |-- routes.ts                 # Rutas API
|   |-- storage.ts                # Capa de almacenamiento
|   |-- templates/
|       |-- landing-page.html     # Pagina de aterrizaje estatica
|       |-- admin.html            # Panel de administracion de hostales
|
|-- shared/                       # Tipos compartidos
|   |-- schema.ts                 # Esquemas de datos
|
|-- app.json                      # Configuracion de Expo
|-- package.json                  # Dependencias del proyecto
|-- tsconfig.json                 # Configuracion TypeScript
|-- babel.config.js               # Configuracion de Babel
|-- metro.config.js               # Configuracion de Metro bundler
```

---

## 3. PALETA DE COLORES

La paleta esta inspirada en tonos azules agradables y modernos:

| Variable | Codigo Hex | Uso |
|----------|-----------|-----|
| `primary` | `#1B4F8A` | Azul marino - botones principales, encabezados, navbar activo |
| `primaryLight` | `#2563EB` | Azul brillante - gradientes, CTAs |
| `secondary` | `#0EA5E9` | Azul cielo - elementos secundarios, excursiones |
| `secondaryLight` | `#38BDF8` | Azul claro - variante clara |
| `accent` | `#06B6D4` | Cian - acentos, eventos |
| `accentLight` | `#A5F3FC` | Cian muy claro - textos sobre fondos azules |
| `gold` | `#0284C7` | Azul medio - badges, detalles |
| `goldLight` | `#BAE6FD` | Azul palido - fondos suaves |
| `background` | `#F0F8FF` | Alice blue - fondo general |
| `backgroundSecondary` | `#DBEEFF` | Azul muy suave - fondos secundarios |
| `card` | `#FFFFFF` | Blanco - fondo de tarjetas |
| `text` | `#0C1524` | Azul noche - texto principal |
| `textSecondary` | `#4A6FA5` | Azul medio - texto secundario |
| `textTertiary` | `#8BA7C7` | Azul gris - placeholders, texto terciario |
| `border` | `#BFDBF7` | Azul suave - bordes de tarjetas |

---

## 4. TIPOGRAFIA

Se utilizan dos familias tipograficas de Google Fonts:

### Playfair Display (Serif)
- **Uso**: Titulos de secciones, nombres de pantallas, encabezados hero
- **Pesos**: 600 SemiBold, 700 Bold
- **Tamanos**: 22px (secciones), 34-38px (headers con imagen de fondo), 30px (hero card)

### DM Sans (Sans-Serif)
- **Uso**: Texto de cuerpo, etiquetas, botones, descripciones
- **Pesos**: 400 Regular, 500 Medium, 600 SemiBold, 700 Bold
- **Tamanos**: 11-16px segun contexto

---

## 5. PANTALLAS Y FUNCIONALIDAD

### 5.1 Inicio (Home) - `app/(tabs)/index.tsx`

**Secciones:**
1. **Carrusel de imagenes** (hero): 5 slides con imagenes de Trinidad, overlay de gradiente con nombre del lugar y subtitulo. Auto-avance cada 4.5 segundos, puntos indicadores en la parte inferior, navegacion manual por toque. Badge "Trinidad, Cuba" en la esquina superior izquierda.
2. **Tarjeta de bienvenida**: Caja blanca sobre el carrusel con el nombre "Aldaba", tagline de la empresa y boton degradado "Explorar Servicios"
3. **Acceso Rapido**: Grid de 4 tarjetas con acceso directo a Alojamiento, Gastronomia, Excursiones y Eventos
4. **Lo que nos distingue**: 3 tarjetas horizontales destacando Patrimonio UNESCO, Valle de los Ingenios y Cultura Viva
5. **Tarjeta de Bienvenida**: Degradado azul marino con mensaje de bienvenida y enlace "Conocer mas"

**Imagenes del carrusel:**
| Slide | Lugar | URL de imagen |
|-------|-------|--------------|
| 1 | Plaza Mayor de Trinidad | picsum.photos/seed/plaza-mayor-trinidad |
| 2 | Calles Coloniales | picsum.photos/seed/colonial-street-cuba |
| 3 | Valle de los Ingenios | picsum.photos/seed/valle-ingenios-sugar |
| 4 | Playa Ancon | picsum.photos/seed/playa-ancon-caribbean |
| 5 | Trinidad, Cuba | picsum.photos/seed/trinidad-panorama |

Para reemplazar con fotos reales: busca `picsum.photos/seed/` en `app/(tabs)/index.tsx` y cambia las URLs.

---

### 5.2 Servicios - `app/(tabs)/services.tsx`

**Secciones:**
1. **Header con imagen de fondo**: Foto de hostal colonial con overlay azul marino semitransparente, titulo "Servicios" en blanco con sombra
2. **Toggle Tabs**: Alternancia entre "Alojamiento" (azul) y "Gastronomia" (cian)
3. **Tarjetas de Alojamiento**: Imagen de portada + informacion expandible con amenidades
4. **Tarjetas de Gastronomia**: Imagen de portada + informacion expandible con ofertas
5. **Boton flotante (FAB)**: Abre modal para solicitar servicio

**Imagen del header:** `picsum.photos/seed/trinidad-hostal-colonial-hotel/1200/400`

**Imagenes de tarjetas de alojamiento:**
- Hostal La Merced: `picsum.photos/seed/hostal-colonial-room/600/280`
- Casa Amargura: `picsum.photos/seed/casa-particular-cuba/600/280`

**Imagenes de tarjetas de gastronomia:**
- Patio Becquer: `picsum.photos/seed/cocina-cubana-comedor/600/280`
- Taberna Guanahuac: `picsum.photos/seed/paladar-trinidad/600/280`

**Contenido de Alojamiento:**

| Propiedad | Hostal "La Merced" | Casa "Amargura #85" |
|-----------|-------------------|---------------------|
| Habitaciones | 8 | 5 |
| Climatizacion | Si | Si |
| TV | Si | Si |
| Minibar | Si | Si |
| Banera | No | Si |
| Lavanderia | Si | No |
| Desayuno | Si | No |
| Terraza | No | Si |

---

### 5.3 Excursiones - `app/(tabs)/excursions.tsx`

**Secciones:**
1. **Header con imagen de fondo**: Foto de naturaleza/montanas con overlay cian-azul, titulo "Excursiones"
2. **Barra informativa**: Iconos de Guias expertos, Fotos incluidas, Transporte
3. **Tarjetas de excursiones**: Imagen de portada con overlay degradado + titulo + boton "Solicitar Excursion" en degradado azul

**Imagen del header:** `picsum.photos/seed/cuba-nature-hiking-mountains/1200/400`

**Imagenes de tarjetas de excursion:**
| Excursion | Imagen |
|-----------|--------|
| Centro Historico | picsum.photos/seed/topes-collantes-nature |
| Valle de los Ingenios | picsum.photos/seed/horseback-countryside |
| Casa Hacienda Guaimaro | picsum.photos/seed/colonial-city-tour |

---

### 5.4 Eventos - `app/(tabs)/events.tsx`

**Secciones:**
1. **Header con imagen de fondo**: Foto de salon de eventos colonial con overlay azul-cian, titulo "Eventos"
2. **Espacios para Eventos**: Tarjetas con imagen de portada + overlay azul marino, capacidad e info
3. **Servicios Culturales**: Lista de servicios con iconos azules
4. **Otros Servicios**: Lista de servicios complementarios

**Imagen del header:** `picsum.photos/seed/colonial-event-hall-tropical/1200/400`

**Imagenes de tarjetas de espacios:**
- Patio Becquer: `picsum.photos/seed/salon-eventos-colonial/600/240`
- Amargura #85: `picsum.photos/seed/jardin-tropical-events/600/240`

---

### 5.5 Nosotros (About) - `app/(tabs)/about.tsx`

**Secciones:**
1. **Header**: Degradado azul marino con titulo "Sobre Aldaba"
2. **Quienes Somos**: Descripcion completa de la empresa
3. **Nuestra Mision**: Tarjeta con degradado azul cielo a cian
4. **Nuestros Valores**: Lista de 5 valores con iconos azules
5. **Proyeccion Comunitaria**: Linea de tiempo con 5 proyectos, puntos azules
6. **Contacto**: Direccion, telefono y correo electronico
7. **Footer**: Logo "Aldaba", tagline, ubicacion y creditos de la Universidad de las Ciencias Informaticas

---

## 6. BARRA DE NAVEGACION

La barra inferior muestra **solo iconos, sin texto**. El icono activo tiene un fondo azul suave redondeado.

```
Inicio       Servicios    Excursiones  Eventos      Nosotros
home         business     map          sparkles     info-circle
```

- Activo: icono relleno con fondo `#1B4F8A + 15% opacidad`
- Inactivo: icono lineal en `#8BA7C7`
- Altura de la barra: 64px en web, 60px en movil

---

## 7. PANEL DE ADMINISTRACION

Accesible en la ruta `/admin` del servidor backend (puerto 5000).

**Funcionalidades:**
- Ver lista de hostales con nombre, habitaciones y amenidades
- Crear nuevo hostal con nombre, descripcion, habitaciones y amenidades
- Editar hostal existente
- Eliminar hostal con confirmacion
- Estadisticas: total de hostales, habitaciones, amenidades unicas
- Notificaciones toast para confirmar acciones

**Datos:** persistidos en `localStorage` del navegador bajo la clave `aldaba_hostales`

**Diseno:** paleta azul identica al sitio principal (azul marino, azul cielo, fondo alice blue)

---

## 8. DATOS DEL CONTENIDO

Todos los textos estan centralizados en `constants/data.ts`:

- `accommodations` - Alojamientos con amenidades
- `gastronomyVenues` - Establecimientos gastronomicos con ofertas
- `excursions` - Excursiones con caracteristicas
- `eventSpaces` - Espacios para eventos con tipos de eventos
- `culturalServices` - Servicios culturales
- `otherServices` - Servicios complementarios
- `communityProjects` - Proyectos comunitarios con anos
- `companyInfo` - Informacion de la empresa, mision, valores y contacto

---

## 9. RESPONSIVIDAD

| Pantalla | Comportamiento |
|----------|---------------|
| Movil (< 768px) | Contenido a ancho completo, tarjetas apiladas |
| Tablet / Desktop (>= 768px) | Contenido centrado con max-width 900px |
| Carrusel | Siempre ocupa el ancho completo de la ventana |
| Tab bar | 64px de alto en web, fondo blanco con borde azul suave |

---

## 10. COMO REEMPLAZAR LAS IMAGENES

Actualmente las imagenes provienen de `picsum.photos` (imagenes de archivo aleatorias). Para usar fotos reales de Trinidad:

1. Busca `picsum.photos/seed/` en los archivos de cada pantalla
2. Reemplaza la URL completa por la URL de tu imagen real
3. Las imagenes deben ser accesibles publicamente (URL https)

**Archivos con imagenes:**
- `app/(tabs)/index.tsx` → carrusel (5 imagenes, busca `carouselSlides`)
- `app/(tabs)/services.tsx` → header + tarjetas (busca `accommodationImages`, `gastronomyImages`)
- `app/(tabs)/excursions.tsx` → header + tarjetas (busca `excursionImages`)
- `app/(tabs)/events.tsx` → header + tarjetas (busca `eventSpaceImages`)

---

## 11. SERVIDOR BACKEND

El servidor Express (puerto 5000) proporciona:
- **CORS** configurado para dominios Replit y localhost
- **Ruta `/admin`** → Panel de administracion de hostales
- **Landing page** estatica en la ruta raiz
- **Archivos estaticos** desde `/assets` y `/static-build`
- **Logging** de peticiones API

---

## 12. COMO EJECUTAR

### Requisitos
- Node.js v20+
- npm

### Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor backend (puerto 5000)
npm run server:dev

# Iniciar servidor frontend Expo (puerto 8081)
npm run expo:dev
```

### Acceso
- **Sitio web principal**: http://localhost:8081
- **Panel de administracion**: http://localhost:5000/admin

---

## 13. COMPATIBILIDAD

| Plataforma | Estado | Notas |
|------------|--------|-------|
| Web Desktop (Chrome, Firefox, Safari) | Completo | Experiencia principal con contenido centrado |
| Web Movil | Completo | Layout adaptativo a pantalla completa |
| iOS (Expo Go) | Completo | Tab bar con iconos solamente |
| Android (Expo Go) | Completo | Tab bar con iconos solamente |

---

## 14. PERSONALIZACION

### Cambiar colores
Editar `constants/colors.ts` para modificar toda la paleta de colores.

### Cambiar contenido
Editar `constants/data.ts` para modificar textos, descripciones, servicios, etc.

### Cambiar imagenes
Ver seccion 10 de este documento.

### Agregar nuevas secciones
1. Crear nuevo archivo en `app/(tabs)/`
2. Registrar la nueva pestana en `app/(tabs)/_layout.tsx`
3. Agregar datos en `constants/data.ts`

---

*Documentacion generada para el proyecto Aldaba Trinidad*
*Empresa: Aldaba - Gestion y promocion de servicios turisticos*
*Ubicacion: Trinidad y Valle de los Ingenios, Cuba*
*Desarrollado con el apoyo de la Universidad de las Ciencias Informaticas*
