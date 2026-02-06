export interface Accommodation {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  rooms: string;
  icon: string;
}

export interface GastronomyVenue {
  id: string;
  name: string;
  description: string;
  offerings: string[];
  icon: string;
}

export interface Excursion {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
}

export interface EventSpace {
  id: string;
  name: string;
  capacity: string;
  description: string;
  eventTypes: string[];
  icon: string;
}

export interface CulturalService {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface CommunityProject {
  id: string;
  title: string;
  description: string;
  year: string;
  icon: string;
}

export const accommodations: Accommodation[] = [
  {
    id: '1',
    name: 'Hostal Academico "La Merced"',
    description: 'Ubicado en el corazon del centro historico de Trinidad, este hostal combina la elegancia colonial con el confort moderno. Un espacio ideal para quienes buscan vivir la autenticidad de la ciudad patrimonio.',
    amenities: [
      'Habitaciones climatizadas',
      'Camas personales y matrimoniales',
      'Television',
      'Minibar',
      'Duchas con agua fria y caliente',
      'Servicio de lavanderia',
      'Desayuno incluido',
    ],
    rooms: '8 habitaciones',
    icon: 'bed-outline',
  },
  {
    id: '2',
    name: 'Casa de Eventos "Amargura #85"',
    description: 'Una casona colonial restaurada con esmero que sirve como espacio de alojamiento y sede de eventos exclusivos. Su arquitectura y ambientacion transportan a los huespedes a la Trinidad de antano.',
    amenities: [
      'Habitaciones climatizadas',
      'Banera',
      'Television',
      'Minibar',
      'Servicio personalizado',
      'Patio colonial interior',
      'Terraza panoramica',
    ],
    rooms: '5 habitaciones',
    icon: 'home-outline',
  },
];

export const gastronomyVenues: GastronomyVenue[] = [
  {
    id: '1',
    name: 'Centro Cultural Patio Becquer',
    description: 'Espacio gastronomico y cultural donde la cocina tradicional cubana se fusiona con musica en vivo y espectaculos. Un lugar emblematico de la noche trinitaria.',
    offerings: [
      'Cocteleria cubana: mojito, daiquiri, cuba libre, pina colada, canchanchara',
      'Cocina criolla tradicional',
      'Musica en vivo',
      'Ron, aguardiente y cervezas',
    ],
    icon: 'musical-notes-outline',
  },
  {
    id: '2',
    name: 'Taberna Guanahuac',
    description: 'Taberna con ambientacion historica que evoca la epoca colonial. Ofrece una experiencia gastronomica unica con platos tipicos y bebidas artesanales.',
    offerings: [
      'Platos tipicos cubanos',
      'Bebidas artesanales',
      'Ambientacion historica',
      'Snacks y tapas cubanas',
    ],
    icon: 'beer-outline',
  },
  {
    id: '3',
    name: 'Bar Cafeteria Playa Ancon',
    description: 'Ubicado cerca de la famosa Playa Ancon, este bar cafeteria ofrece refrescos, cocteles y comida ligera con vista al mar Caribe.',
    offerings: [
      'Cocteles tropicales',
      'Jugos naturales y refrescos',
      'Cafe cubano',
      'Comida ligera y snacks',
    ],
    icon: 'sunny-outline',
  },
  {
    id: '4',
    name: 'Bar Cafeteria San Isidro de los Destiladeros',
    description: 'En el corazon del Valle de los Ingenios, este establecimiento ofrece una pausa gastronomica rodeada de paisajes patrimonio de la humanidad.',
    offerings: [
      'Cafe de la region',
      'Bebidas refrescantes',
      'Platos regionales',
      'Vista panoramica al valle',
    ],
    icon: 'cafe-outline',
  },
  {
    id: '5',
    name: 'Acuario',
    description: 'Espacio educativo y ambiental que complementa su mision con ofertas gastronomicas ligeras, ideal para familias y amantes de la naturaleza.',
    offerings: [
      'Comida ligera',
      'Bebidas naturales',
      'Espacio educativo',
      'Actividades ambientales',
    ],
    icon: 'fish-outline',
  },
];

export const excursions: Excursion[] = [
  {
    id: '1',
    name: 'Centro Historico de Trinidad',
    description: 'Recorrido especializado por las calles empedradas, plazas y edificaciones coloniales de Trinidad, ciudad declarada Patrimonio de la Humanidad por la UNESCO en 1988.',
    features: [
      'Guia especializado en patrimonio',
      'Opcion con o sin transporte',
      'Opcion con almuerzo incluido',
      'Sesiones fotograficas especiales',
      'Duracion: 3-4 horas',
    ],
    icon: 'walk-outline',
  },
  {
    id: '2',
    name: 'Valle de los Ingenios',
    description: 'Excursion al Valle de los Ingenios, testimonio viviente de la industria azucarera cubana. Paisajes espectaculares y restos arqueologicos de los antiguos ingenios.',
    features: [
      'Transporte incluido',
      'Visita a torres de vigilancia',
      'Almuerzo criollo disponible',
      'Guia historico-cultural',
      'Duracion: 5-6 horas',
    ],
    icon: 'trail-sign-outline',
  },
  {
    id: '3',
    name: 'Casa Hacienda Guaimaro',
    description: 'Visita a la historica hacienda Guaimaro, joya del patrimonio rural trinitario. Interpretacion historico-cultural del antiguo ingenio azucarero y su legado.',
    features: [
      'Interpretacion historico-cultural',
      'Arquitectura colonial rural',
      'Fotografia profesional disponible',
      'Acceso a areas restauradas',
      'Duracion: 2-3 horas',
    ],
    icon: 'business-outline',
  },
];

export const eventSpaces: EventSpace[] = [
  {
    id: '1',
    name: 'Centro Cultural Patio Becquer',
    capacity: '100 personas',
    description: 'Amplio patio colonial con escenario para musica en vivo, perfecto para eventos sociales y culturales de gran formato.',
    eventTypes: [
      'Bodas',
      'Cumpleanos',
      'Fiestas de 15',
      'Banquetes',
      'Eventos academicos',
      'Presentaciones de libros',
    ],
    icon: 'people-outline',
  },
  {
    id: '2',
    name: 'Casa de Eventos "Amargura #85"',
    capacity: '50 personas',
    description: 'Espacio intimo y elegante en una casona colonial, ideal para celebraciones exclusivas y reuniones privadas.',
    eventTypes: [
      'Reuniones privadas',
      'Cenas de gala',
      'Eventos corporativos',
      'Celebraciones intimas',
      'Sesiones fotograficas',
    ],
    icon: 'sparkles-outline',
  },
];

export const culturalServices: CulturalService[] = [
  {
    id: '1',
    name: 'Casa Hacienda Guaimaro',
    description: 'Servicio de interpretacion historico-cultural en una de las haciendas mas significativas del Valle de los Ingenios.',
    icon: 'library-outline',
  },
  {
    id: '2',
    name: 'Centro Cultural Patio Becquer',
    description: 'Espacio de musica tradicional cubana en vivo con presentaciones de artistas locales y eventos culturales regulares.',
    icon: 'musical-note-outline',
  },
  {
    id: '3',
    name: 'Taberna Guanahuac',
    description: 'Ambientacion historica que recrea la atmosfera de la epoca colonial con elementos decorativos y gastronomicos autenticos.',
    icon: 'time-outline',
  },
  {
    id: '4',
    name: 'Acuario',
    description: 'Espacio educativo y ambiental dedicado a la conservacion y divulgacion del patrimonio natural de la region.',
    icon: 'leaf-outline',
  },
];

export const otherServices = [
  {
    id: '1',
    name: 'Recorridos en coches coloniales',
    description: 'Paseos por la ciudad en coches tirados por caballos, una experiencia unica para conocer Trinidad desde otra perspectiva.',
    icon: 'car-outline',
  },
  {
    id: '2',
    name: 'Papeleria turistica',
    description: 'Venta de mapas, guias turisticas y material informativo sobre Trinidad y el Valle de los Ingenios.',
    icon: 'map-outline',
  },
  {
    id: '3',
    name: 'Artesania local',
    description: 'Diseno y venta de articulos artesanales elaborados por artesanos locales, souvenirs unicos de Trinidad.',
    icon: 'color-palette-outline',
  },
  {
    id: '4',
    name: 'Servicio de guias turisticos',
    description: 'Guias profesionales especializados en patrimonio, historia y cultura trinitaria.',
    icon: 'person-outline',
  },
];

export const communityProjects: CommunityProject[] = [
  {
    id: '1',
    title: 'Talleres con ninos',
    description: 'Programas educativos y recreativos para ninos de la comunidad, fomentando el conocimiento del patrimonio local.',
    year: '2023',
    icon: 'school-outline',
  },
  {
    id: '2',
    title: 'Actividades comunitarias',
    description: 'Organizacion de actividades sociales y culturales que fortalecen el tejido comunitario de Trinidad.',
    year: '2023',
    icon: 'hand-left-outline',
  },
  {
    id: '3',
    title: 'Concursos gastronomicos',
    description: 'Competencias culinarias que rescatan y promueven las recetas tradicionales de la region.',
    year: '2024',
    icon: 'restaurant-outline',
  },
  {
    id: '4',
    title: 'Festejos tradicionales',
    description: 'Celebraciones de festividades locales que preservan las tradiciones culturales de Trinidad.',
    year: '2024',
    icon: 'balloon-outline',
  },
  {
    id: '5',
    title: 'Celebraciones locales',
    description: 'Eventos festivos que involucran a toda la comunidad en la preservacion de la identidad cultural trinitaria.',
    year: '2025',
    icon: 'star-outline',
  },
];

export const companyInfo = {
  name: 'Aldaba',
  tagline: 'Gestion y promocion de servicios turisticos, culturales, patrimoniales y gastronomicos',
  location: 'Trinidad y Valle de los Ingenios, Cuba',
  description: 'Aldaba es una empresa dedicada a la gestion y promocion de servicios turisticos, culturales, patrimoniales y gastronomicos en la ciudad de Trinidad y el Valle de los Ingenios. Nuestro compromiso es preservar y difundir el rico patrimonio cultural e historico de esta region, declarada Patrimonio de la Humanidad por la UNESCO.',
  mission: 'Promover el desarrollo turistico sostenible de Trinidad, preservando su patrimonio cultural e historico, y contribuyendo al bienestar de la comunidad local.',
  values: [
    'Preservacion del patrimonio',
    'Desarrollo comunitario',
    'Excelencia en el servicio',
    'Autenticidad cultural',
    'Sostenibilidad',
  ],
  contact: {
    address: 'Centro Historico, Trinidad, Sancti Spiritus, Cuba',
    phone: '+53 41 99 XXXX',
    email: 'info@aldaba.cu',
  },
};
