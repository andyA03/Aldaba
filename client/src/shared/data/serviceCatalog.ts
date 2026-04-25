export type ServiceGroupKey = 'alojamiento' | 'gastronomia' | 'otros';

export type ServiceCard = {
  slug: string;
  group: ServiceGroupKey;
  name: string;
  description: string;
  historia: string;
  highlights: string[];
  contact: string;
  gallery: string[];
};

const HERO_IMAGE = 'https://picsum.photos/seed/aldaba-service-hero/1200/700';
const CARD_IMAGE = 'https://picsum.photos/seed/aldaba-service-card/900/600';
const SERVICE_IMAGE = 'https://picsum.photos/seed/aldaba-service-photo/900/600';

export const SERVICE_GROUPS: Record<ServiceGroupKey, { title: string; subtitle: string; items: ServiceCard[] }> = {
  alojamiento: {
    title: 'Alojamiento',
    subtitle: 'Espacios coloniales para descansar en Trinidad',
    items: [
      {
        slug: 'hostal-la-merced',
        group: 'alojamiento',
        name: 'Hostal Académico "La Merced"',
        description: 'Habitaciones coloniales cómodas, ventiladas y con atención cercana para viajeros que buscan calma y tradición.',
        historia: 'La Merced conserva el espíritu de las casonas trinitarias con patios interiores, balcones de madera y una hospitalidad pensada para estancias tranquilas cerca del centro histórico.',
        highlights: ['Habitaciones dobles y triples', 'Patio colonial', 'Atención personalizada'],
        contact: 'Reservas al +53 41 123 456 y WhatsApp de atención directa.',
        gallery: [HERO_IMAGE, CARD_IMAGE, SERVICE_IMAGE],
      },
      {
        slug: 'amargura-85',
        group: 'alojamiento',
        name: 'Casa de Eventos "Amargura #85"',
        description: 'Casa amplia con carácter patrimonial, ideal para grupos que quieren alojarse en un entorno colonial auténtico.',
        historia: 'Ubicada en una calle tradicional de Trinidad, esta casa conserva detalles de época y combina alojamiento con espacios para encuentros familiares o culturales.',
        highlights: ['Suite y habitación simple', 'Espacios amplios', 'Cerca del centro'],
        contact: 'Reservas por teléfono y coordinación previa para grupos.',
        gallery: [CARD_IMAGE, HERO_IMAGE, SERVICE_IMAGE],
      },
    ],
  },
  gastronomia: {
    title: 'Gastronomía',
    subtitle: 'Sabores cubanos en ambientes coloniales',
    items: [
      {
        slug: 'patio-becquer',
        group: 'gastronomia',
        name: 'Centro Cultural Patio Becquer',
        description: 'Cocina criolla, música y ambiente patrimonial en un patio lleno de color y tradición.',
        historia: 'Patio Becquer es uno de los espacios más conocidos para disfrutar la cocina local mientras se comparte música, arte y vida cultural trinitaria.',
        highlights: ['Comida criolla', 'Patio cultural', 'Reservas para grupos'],
        contact: 'Reservas a través de la recepción o por WhatsApp de atención al cliente.',
        gallery: [SERVICE_IMAGE, CARD_IMAGE, HERO_IMAGE],
      },
      {
        slug: 'taberna-guanahuac',
        group: 'gastronomia',
        name: 'Taberna Guanahuac',
        description: 'Taberna con platos tradicionales, coctelería cubana y un entorno cálido para la noche.',
        historia: 'Guanahuac mezcla mesa, conversación y cocina popular con un servicio que invita a quedarse sin prisa.',
        highlights: ['Coctelería', 'Ambiente nocturno', 'Menú cubano'],
        contact: 'Coordina tu mesa por teléfono antes de llegar en horarios de alta demanda.',
        gallery: [CARD_IMAGE, SERVICE_IMAGE, HERO_IMAGE],
      },
      {
        slug: 'playa-ancon',
        group: 'gastronomia',
        name: 'Bar Cafetería Playa Ancón',
        description: 'Opción relajada frente al circuito de playa, con comidas ligeras y bebidas frías.',
        historia: 'Pensado para acompañar la jornada de costa, este bar cafetería ofrece una pausa simple y fresca para visitantes de Ancón.',
        highlights: ['Frente a la playa', 'Bebidas frías', 'Atención rápida'],
        contact: 'Ideal para reservas informales en grupo pequeño.',
        gallery: [SERVICE_IMAGE, HERO_IMAGE, CARD_IMAGE],
      },
      {
        slug: 'san-isidro',
        group: 'gastronomia',
        name: 'Bar Cafetería San Isidro',
        description: 'Espacio pequeño y cercano con oferta ligera para compartir después de recorrer la ciudad.',
        historia: 'San Isidro mantiene una propuesta sencilla y local, útil para descansos cortos dentro del recorrido turístico.',
        highlights: ['Opción ligera', 'Servicio cercano', 'Ambiente local'],
        contact: 'Reservas sujetas a disponibilidad del día.',
        gallery: [CARD_IMAGE, SERVICE_IMAGE, HERO_IMAGE],
      },
    ],
  },
  otros: {
    title: 'Otros',
    subtitle: 'Miniacuario y experiencias complementarias',
    items: [
      {
        slug: 'miniacuario',
        group: 'otros',
        name: 'Miniacuario',
        description: 'Una parada didáctica y familiar para conocer especies y curiosidades del entorno marino.',
        historia: 'El Miniacuario se presenta como un espacio de divulgación local para acercar a visitantes y familias a la fauna marina y a la relación de Trinidad con el mar.',
        highlights: ['Visita familiar', 'Contenido educativo', 'Experiencia local'],
        contact: 'Consulta disponibilidad para grupos y horarios de visita.',
        gallery: [SERVICE_IMAGE, HERO_IMAGE, CARD_IMAGE],
      },
    ],
  },
};

export const SERVICE_ITEMS = Object.values(SERVICE_GROUPS).flatMap(group => group.items);

export const SERVICE_BY_SLUG = SERVICE_ITEMS.reduce<Record<string, ServiceCard>>((accumulator, item) => {
  accumulator[item.slug] = item;
  return accumulator;
}, {});