import type { Excursion, Habitacion, Mesa, Section } from "./admin-types";

export const SECTIONS: Section[] = [
  { key: "hostales", label: "Hostales", icon: "🏨" },
  { key: "excursiones", label: "Excursiones", icon: "🧭" },
  { key: "restaurantes", label: "Restaurantes", icon: "🍽️" },
];

export const INIT_HABITACIONES: Habitacion[] = [
  { id: 1, hostal: 'Hostal Académico "La Merced"', foto: "/images/aldaba-card.svg", numero: "101", tipo: "Doble", huespedes: 2, disponible: true, precio: 50, reserva: "—" },
  { id: 2, hostal: 'Hostal Académico "La Merced"', foto: "/images/aldaba-card.svg", numero: "102", tipo: "Triple", huespedes: 3, disponible: false, precio: 70, reserva: "Juan Pérez" },
  { id: 3, hostal: 'Casa de Eventos "Amargura #85"', foto: "/images/aldaba-card.svg", numero: "103", tipo: "Simple", huespedes: 1, disponible: true, precio: 35, reserva: "—" },
  { id: 4, hostal: 'Casa de Eventos "Amargura #85"', foto: "/images/aldaba-card.svg", numero: "201", tipo: "Suite", huespedes: 4, disponible: false, precio: 110, reserva: "María López" },
];

export const INIT_EXCURSIONES: Excursion[] = [
  { id: 1, nombre: "Centro Histórico de Trinidad", foto: "/images/aldaba-card.svg", fecha: "2026-05-10", hora: "09:00", personas: 8, guia: "Carlos Díaz", precio: 25, estado: "Confirmada" },
  { id: 2, nombre: "Valle de los Ingenios", foto: "/images/aldaba-card.svg", fecha: "2026-05-12", hora: "08:00", personas: 12, guia: "Ana Suárez", precio: 40, estado: "Pendiente" },
  { id: 3, nombre: "Casa Hacienda Guaimaro", foto: "/images/aldaba-card.svg", fecha: "2026-05-15", hora: "10:00", personas: 5, guia: "Pedro Mora", precio: 30, estado: "Confirmada" },
];

export const INIT_MESAS: Mesa[] = [
  { id: 1, restaurante: "Centro Cultural Patio Becquer", foto: "/images/aldaba-card.svg", numero: 1, capacidad: 4, ocupada: true, reserva: "Familia García", pago: 120, estado: "Ocupada" },
  { id: 2, restaurante: "Centro Cultural Patio Becquer", foto: "/images/aldaba-card.svg", numero: 2, capacidad: 2, ocupada: false, reserva: "—", pago: 0, estado: "Libre" },
  { id: 3, restaurante: "Taberna Guanahuac", foto: "/images/aldaba-card.svg", numero: 3, capacidad: 6, ocupada: false, reserva: "Reservado 20:00", pago: 0, estado: "Reservada" },
  { id: 4, restaurante: "Taberna Guanahuac", foto: "/images/aldaba-card.svg", numero: 4, capacidad: 4, ocupada: true, reserva: "Sr. Martínez", pago: 85, estado: "Ocupada" },
];

export const HOSTALES_LIST = [
  { nombre: 'Hostal Académico "La Merced"', foto: "/images/aldaba-card.svg" },
  { nombre: 'Casa de Eventos "Amargura #85"', foto: "/images/aldaba-card.svg" },
];

export const RESTAURANTES_LIST = [
  { nombre: "Centro Cultural Patio Becquer", foto: "/images/aldaba-service.svg" },
  { nombre: "Taberna Guanahuac", foto: "/images/aldaba-service.svg" },
  { nombre: "Bar Cafetería Playa Ancón", foto: "/images/aldaba-service.svg" },
  { nombre: "Bar Cafetería San Isidro", foto: "/images/aldaba-service.svg" },
  { nombre: "Miniacuario", foto: "/images/aldaba-service.svg" },
];

export const EXCURSIONES_LIST = [
  { nombre: "Centro Histórico de Trinidad", foto: "/images/aldaba-card.svg" },
  { nombre: "Valle de los Ingenios", foto: "/images/aldaba-card.svg" },
  { nombre: "Casa Hacienda Guaimaro", foto: "/images/aldaba-card.svg" },
];
