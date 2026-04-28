# Tablas del backend Aldaba

Este documento describe la funcion de cada tabla (modelo) y sus columnas actuales.

## 1) LugarTuristico
Funcion: catalogo publico de lugares para la landing.

Columnas:
- id
- created_at
- updated_at
- slug
- nombre
- categoria
- categoria_color
- foto
- foto_hero
- resumen
- descripcion
- horario
- entrada
- ubicacion
- distancia
- consejos

## 2) Alojamiento
Funcion: servicios de alojamiento mostrados en landing y administrados desde panel.

Columnas:
- id
- created_at
- updated_at
- nombre
- foto
- icono
- habitacion_numero (FK -> Habitacion.numero)

## 3) Restaurante
Funcion: servicios de gastronomia (renombrado desde Gastronomia) y su asociacion con mesas.

Columnas:
- id
- created_at
- updated_at
- nombre
- icono
- mesa_numero (FK -> Mesa.numero)

## 4) Excursion
Funcion: catalogo de excursiones publicas y administrables.

Columnas:
- id
- created_at
- updated_at
- destino
- duracion
- foto
- icono
- precio
- personas

## 5) EspacioEvento
Funcion: espacios para eventos en la oferta publica y administracion.

Columnas:
- id
- created_at
- updated_at
- nombre
- capacidad
- descripcion
- tipos_evento (JSON)
- foto
- icono

## 6) ServicioCultural
Funcion: servicios culturales de la landing.

Columnas:
- id
- created_at
- updated_at
- nombre
- descripcion
- foto
- icono

## 7) OtroServicio
Funcion: servicios generales adicionales de la landing.

Columnas:
- id
- created_at
- updated_at
- nombre
- descripcion
- icono

## 8) ProyectoComunitario
Funcion: proyectos sociales/comunitarios mostrados en la seccion de empresa.

Columnas:
- id
- created_at
- updated_at
- titulo
- descripcion
- anio
- icono

## 9) InformacionEmpresa
Funcion: informacion institucional de Aldaba.

Columnas:
- id
- created_at
- updated_at
- nombre
- tagline
- ubicacion
- descripcion
- mision
- valores (JSON)
- direccion
- telefono
- email

## 10) Habitacion
Funcion: inventario interno de habitaciones para gestion admin.

Columnas:
- id
- created_at
- updated_at
- foto
- numero (unico)
- tipo
- estado
- precio

## 11) ReservaExcursion
Funcion: gestion interna de reservas de excursiones (panel admin).

Columnas:
- id
- created_at
- updated_at
- nombre
- foto
- fecha
- hora
- personas
- guia
- precio
- estado

## 12) Mesa
Funcion: inventario interno de mesas para operacion de restaurantes.

Columnas:
- id
- created_at
- updated_at
- restaurante
- foto
- numero (unico)
- capacidad
- pago
- precio
- estado

## Notas de cambios clave
- Se elimino la tabla Reserva.
- Gastronomia fue renombrada a Restaurante.
- Excursion ahora usa destino en lugar de nombre, y agrego precio/personas.
- Alojamiento ahora referencia Habitacion.numero por llave foranea.
- Restaurante ahora referencia Mesa.numero por llave foranea.
- Habitacion y Mesa comparten estados operativos tipo Libre/Ocupada/Reservada.
