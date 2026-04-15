export interface LugarTuristico {
  id: number;
  slug: string;
  nombre: string;
  categoria: string;
  categoriaColor: string;
  foto: string;
  fotoHero: string;
  resumen: string;
  descripcion: string;
  horario: string;
  entrada: string;
  ubicacion: string;
  distancia: string;
  consejos: string;
}

export const LUGARES: LugarTuristico[] = [
  {
    id: 1,
    slug: "plaza-mayor",
    nombre: "Plaza Mayor",
    categoria: "Patrimonio",
    categoriaColor: "#1B4F8A",
    foto: "https://picsum.photos/seed/trinidad-plaza/600/400",
    fotoHero: "https://picsum.photos/seed/trinidad-plaza/1400/600",
    resumen: "El corazón colonial de Trinidad, rodeada de palacios del siglo XIX y museos únicos.",
    descripcion: "La Plaza Mayor de Trinidad es el alma histórica y cultural de la ciudad. Declarada Patrimonio de la Humanidad por la UNESCO en 1988 junto al Valle de los Ingenios, esta plaza es uno de los conjuntos urbanos coloniales mejor conservados del hemisferio occidental.\n\nRodeada de imponentes edificaciones pintadas en tonos ocre, verde y azul pastel, la plaza alberga jardines cuidados con palmeras reales, esculturas de cerámica de animales y una fuente central que data del siglo XIX. Sus adoquines y bancas de hierro forjado invitan a sentarse y contemplar el tiempo detenido.\n\nAlrededor de la plaza se encuentran el Museo Romántico —instalado en el Palacio Brunet—, el Museo de Arquitectura Colonial, la Iglesia Parroquial de la Santísima Trinidad y el Palacio Cantero. Las fachadas neoclásicas y barrocas crean una escena única, especialmente al atardecer cuando la luz dorada baña los muros centenarios.\n\nLa plaza es también el punto de partida de los principales recorridos turísticos de la ciudad y el lugar de encuentro de trinitarios y visitantes de todo el mundo.",
    horario: "Abierta las 24 horas",
    entrada: "Gratuita",
    ubicacion: "Centro histórico de Trinidad",
    distancia: "0 km — Centro de la ciudad",
    consejos: "Visítala al amanecer o al atardecer para disfrutar de la mejor luz fotográfica. Los fines de semana hay presentaciones musicales en las noches.",
  },
  {
    id: 2,
    slug: "valle-ingenios",
    nombre: "Valle de los Ingenios",
    categoria: "UNESCO",
    categoriaColor: "#15803d",
    foto: "https://picsum.photos/seed/ingenios-cuba/600/400",
    fotoHero: "https://picsum.photos/seed/ingenios-cuba/1400/600",
    resumen: "Paisaje cultural de la era azucarera con más de 50 ingenios y haciendas coloniales.",
    descripcion: "El Valle de los Ingenios —conocido también como el Valle de San Luis— es un impresionante paisaje cultural de 270 km² situado al noreste de Trinidad. Inscrito en la Lista del Patrimonio Mundial de la UNESCO en 1988 junto a la ciudad de Trinidad, este valle cuenta la historia del azúcar y la esclavitud en Cuba durante los siglos XVIII y XIX.\n\nEn su apogeo, el valle albergó más de 50 ingenios azucareros (haciendas dedicadas a la producción de azúcar), haciendas coloniales y plantaciones que convirtieron la región en una de las más ricas de Cuba. Hoy, los vestigios de esa época —Torres de esclavos, casas de hacienda, molinos y depósitos— emergen entre los campos de caña como testigos silenciosos de un pasado turbulento.\n\nLa Torre de Manaca-Iznaga, de 44 metros de altura, es el símbolo del valle. Construida en 1816, era usada para vigilar a los esclavos y hoy ofrece vistas panorámicas incomparables desde su cima. La hacienda contigua muestra la campana original que marcaba los horarios de trabajo forzado.\n\nEl recorrido en tren histórico desde Trinidad hasta Manaca-Iznaga es una de las experiencias más memorables de la zona.",
    horario: "9:00 am — 5:00 pm",
    entrada: "Torre Manaca-Iznaga: 2 CUC",
    ubicacion: "A 12 km de Trinidad",
    distancia: "12 km al noreste",
    consejos: "Toma el tren histórico desde Trinidad (sale por la mañana). Lleva sombrero y agua, el sol es intenso en el valle. Los mercados artesanales en Manaca-Iznaga venden guayaberas y artesanías locales.",
  },
  {
    id: 3,
    slug: "playa-ancon",
    nombre: "Playa Ancón",
    categoria: "Naturaleza",
    categoriaColor: "#0e7490",
    foto: "https://picsum.photos/seed/beach-caribbean/600/400",
    fotoHero: "https://picsum.photos/seed/beach-caribbean/1400/600",
    resumen: "Una de las mejores playas del Caribe, con aguas turquesas y arena blanca fina.",
    descripcion: "Playa Ancón es considerada una de las playas más hermosas del sur de Cuba y del Caribe. Ubicada en la Península de Ancón, a tan solo 12 km de Trinidad, esta franja de arena blanca y fina se extiende por más de 4 kilómetros a orillas de un mar de aguas cristalinas en tonos turquesa y verde esmeralda.\n\nLas aguas calmas y transparentes de Ancón permiten admirar corales de colores y peces tropicales sin necesidad de alejarse de la orilla. La visibilidad submarina es excepcional, lo que convierte a esta playa en un destino favorito para el buceo y el snorkel. A pocos metros de la costa existe un arrecife de coral vivo muy bien conservado.\n\nLa playa es también conocida por su tranquilidad relativa en comparación con otros destinos turísticos cubanos. Los tres hoteles de la zona ofrecen alquiler de equipos de buceo, kayaks y catamaranes. Las travesías en bote hasta los cayos cercanos y los paseos en catamarán al atardecer son experiencias muy populares.\n\nEl entorno natural de la península —manglares, aves playeras y delfines ocasionales— completa una experiencia de playa única en Cuba.",
    horario: "Acceso libre todo el día",
    entrada: "Gratuita (servicios de hotel cobran aparte)",
    ubicacion: "Península de Ancón",
    distancia: "12 km al suroeste de Trinidad",
    consejos: "Llega temprano para encontrar los mejores spots de snorkel. Puedes llegar en taxi, bicitaxi o en el bus turístico que sale desde Trinidad cada mañana. Lleva protector solar biodegradable para cuidar el arrecife.",
  },
  {
    id: 4,
    slug: "el-nicho",
    nombre: "El Nicho",
    categoria: "Naturaleza",
    categoriaColor: "#0e7490",
    foto: "https://picsum.photos/seed/waterfall-tropical/600/400",
    fotoHero: "https://picsum.photos/seed/waterfall-tropical/1400/600",
    resumen: "Cascadas y pozas naturales entre la vegetación exuberante de la Sierra del Escambray.",
    descripcion: "El Nicho es uno de los parajes naturales más espectaculares de Cuba. Enclavado en la Sierra del Escambray, dentro del Parque Nacional Topes de Collantes, este conjunto de cascadas y pozas naturales se forma a partir del río Hanabanilla en plena selva tropical.\n\nLa cascada principal, de unos 15 metros de altura, vierte sus aguas en una poza de color turquesa intenso rodeada de vegetación exuberante: helechos gigantes, orquídeas silvestres, árboles de tronco liso y una variedad asombrosa de aves endémicas. Los amantes del avistamiento de aves encontrarán aquí tocororos (ave nacional de Cuba), cartacubas y zunzuncitos.\n\nEl acceso a El Nicho se realiza por un sendero bien señalizado de unos 2 km de recorrido entre la vegetación. El camino atraviesa puentes sobre el río, miradores naturales y puntos de descanso. Al llegar, los visitantes pueden bañarse en las pozas naturales de agua fresca y cristalina —una experiencia refrescante única en el trópico.\n\nLa experiencia de El Nicho combina senderismo, naturaleza virgen, cascadas y la posibilidad de conectar con el ecosistema de montaña cubano en su máxima expresión.",
    horario: "8:30 am — 4:30 pm",
    entrada: "10 CUC (incluye acceso al sendero)",
    ubicacion: "Sierra del Escambray, Cienfuegos",
    distancia: "52 km al norte de Trinidad",
    consejos: "Usa calzado de montaña o sandalias con agarre. Lleva traje de baño bajo la ropa para poder bañarte en las pozas. La excursión organizada desde Trinidad suele incluir transporte y guía. El mejor momento es por la mañana, antes de que lleguen los grupos.",
  },
  {
    id: 5,
    slug: "topes-collantes",
    nombre: "Topes de Collantes",
    categoria: "Naturaleza",
    categoriaColor: "#0e7490",
    foto: "https://picsum.photos/seed/mountain-forest/600/400",
    fotoHero: "https://picsum.photos/seed/mountain-forest/1400/600",
    resumen: "Parque natural de montaña con senderos, miradores y una rica biodiversidad endémica.",
    descripcion: "El Parque Nacional Topes de Collantes es el gran pulmón verde del centro de Cuba. Situado en el macizo montañoso de la Sierra del Escambray, a unos 800 metros sobre el nivel del mar, este parque protege uno de los ecosistemas más ricos y biodiversos del Caribe.\n\nEl parque alberga más de 100 especies de aves, muchas de ellas endémicas de Cuba, junto con orquídeas raras, helechos arborescentes y bosques nubosos de una belleza excepcional. Sus senderos recorren quebradas, miradores panorámicos y cascadas de montaña, con rutas para todos los niveles de dificultad.\n\nLas rutas más populares incluyen el sendero hasta la Cascada Vegas Grande —una imponente catarata de 62 metros— y la ruta al Mirador de la Loma del Puerto, desde donde en días claros se pueden divisar simultáneamente las costas norte y sur de Cuba. El Jardín Botánico del complejo alberga más de 200 especies de plantas tropicales y medicinales.\n\nEl complejo hotelero Kurhotel, construido en los años 50 como sanatorio, ofrece tratamientos de medicina natural y es base de partida para muchas de las excursiones. La temperatura fresca de la montaña —entre 18 y 24°C— contrasta agradablemente con el calor de Trinidad.",
    horario: "8:00 am — 5:00 pm",
    entrada: "Variable según sendero (5—15 CUC)",
    ubicacion: "Sierra del Escambray",
    distancia: "17 km al norte de Trinidad",
    consejos: "El clima cambia rápidamente en la montaña; lleva siempre una capa ligera. Para los senderos más exigentes es recomendable contratar un guía local. La flora es espectacular entre marzo y mayo.",
  },
  {
    id: 6,
    slug: "museo-romantico",
    nombre: "Museo Romántico",
    categoria: "Cultura",
    categoriaColor: "#9333ea",
    foto: "https://picsum.photos/seed/colonial-museum/600/400",
    fotoHero: "https://picsum.photos/seed/colonial-museum/1400/600",
    resumen: "El Palacio Brunet del siglo XVIII, con mobiliario y arte original de la aristocracia colonial.",
    descripcion: "El Museo Romántico, instalado en el Palacio Brunet, es una joya arquitectónica y cultural que transporta a los visitantes directamente al siglo XIX trinitario. Este edificio, considerado uno de los mejores ejemplos de la arquitectura doméstica colonial cubana, fue construido a principios del siglo XVIII y transformado en 1808 por el Conde de Brunet.\n\nEl palacio conserva gran parte de su estructura y decoración original: vitrales multicolores que filtran la luz en arco iris sobre los salones, techos de artesanado, suelos de mármol italiano y una galería con vista a la Plaza Mayor que es una de las mejores atalayas del centro histórico de Trinidad.\n\nLas 14 salas del museo exhiben una extraordinaria colección de mobiliario de estilo neoclásico y romántico de los siglos XVIII y XIX: camas con baldaquino, tocadores con espejo biselado, vajillas de porcelana china, candelabros de cristal de Bohemia y retratos al óleo de la aristocracia colonial.\n\nLa colección de objetos personales —abanicos de nácar, sombrillas de encaje, joyeros y relojes de bolsillo— ofrece una mirada íntima y detallada a la vida de la élite azucarera trinitaria. El patio interior con su jardín de palmeras enanas y la vista desde la galería al segundo piso son los puntos más fotografiados del museo.",
    horario: "Martes a Domingo: 9:00 am — 5:00 pm",
    entrada: "2 CUC",
    ubicacion: "Calle Echerri 52, frente a la Plaza Mayor",
    distancia: "Centro histórico de Trinidad",
    consejos: "Se permiten fotografías (sin flash). La colección de vitrales es especialmente hermosa a media mañana cuando el sol entra de frente. Combina la visita con el Museo de Arquitectura Colonial, a pocos pasos.",
  },
  {
    id: 7,
    slug: "iglesia-parroquial",
    nombre: "Iglesia Parroquial de la Santísima Trinidad",
    categoria: "Patrimonio",
    categoriaColor: "#1B4F8A",
    foto: "https://picsum.photos/seed/colonial-church/600/400",
    fotoHero: "https://picsum.photos/seed/colonial-church/1400/600",
    resumen: "El templo colonial más importante de Trinidad, con un impresionante altar mayor de madera tallada.",
    descripcion: "La Iglesia Parroquial de la Santísima Trinidad es el edificio religioso más importante y majestuoso de Trinidad. Situada frente a la Plaza Mayor, esta iglesia de estilo neoclásico es el resultado de siglos de construcciones y reconstrucciones, siendo la edificación actual inaugurada en 1892 sobre los cimientos de templos anteriores que datan del siglo XVI.\n\nEl exterior de la iglesia presenta una imponente fachada de tres torres —dos campanarios y una cúpula central— en piedra caliza blanca que domina el horizonte de la Plaza Mayor. El interior del templo revela una nave central de gran amplitud cubierta por una bóveda de cañón, con columnas de mármol y una iluminación que varía mágicamente durante el día.\n\nLa joya del templo es su altar mayor, tallado en madera preciosa en el siglo XIX por artesanos locales. La figura del Cristo de la Vera Cruz —venerada desde el siglo XVII— ocupa un lugar central y es objeto de devoción profunda por los trinitarios. Las capillas laterales conservan imágenes religiosas coloniales de extraordinario valor artístico.\n\nEl campanario norte puede ascenderse con permiso especial, ofreciendo una vista panorámica del casco histórico y los tejados rojos de Trinidad que es sencillamente incomparable. La iglesia sigue en activo como parroquia principal de la ciudad.",
    horario: "Lunes a Sábado: 9:00 am — 12:00 pm y 3:00 pm — 6:00 pm. Domingos: Misas a las 9:00 am y 6:00 pm",
    entrada: "Gratuita (donativo voluntario)",
    ubicacion: "Frente a la Plaza Mayor",
    distancia: "Centro histórico de Trinidad",
    consejos: "Viste de forma apropiada para entrar al templo (hombros y rodillas cubiertos). Los domingos por la tarde hay coro y la atmósfera es especialmente emotiva. Pide al sacristán si es posible ver el archivo histórico parroquial.",
  },
  {
    id: 8,
    slug: "la-boca",
    nombre: "La Boca",
    categoria: "Costa",
    categoriaColor: "#0e7490",
    foto: "https://picsum.photos/seed/fishing-village/600/400",
    fotoHero: "https://picsum.photos/seed/fishing-village/1400/600",
    resumen: "Pequeño pueblo pesquero en la desembocadura del río Guaurabo, con vistas a la bahía.",
    descripcion: "La Boca es uno de los secretos mejor guardados de Trinidad. Este pequeño pueblo de pescadores, situado en la desembocadura del río Guaurabo donde sus aguas se funden con el Mar Caribe, ofrece una experiencia auténtica y alejada del turismo masivo a tan solo 5 km del centro histórico de la ciudad.\n\nLas calles de La Boca están bordadas por casas coloniales de colores vivos —azul, verde, amarillo y coral— cuyos porches dan directamente al mar o al río. Las embarcaciones de pesca pintadas de colores reposan en la orilla mientras los pescadores reparan sus redes bajo la sombra de los almendros. La escena tiene una fotogenia y una autenticidad que pocas postales pueden transmitir.\n\nEl río Guaurabo forma en su desembocadura una zona de aguas tranquilas donde los lugareños se bañan en mezcla de agua dulce y salada. Desde las piedras de la orilla pueden divisarse las siluetas de la Península de Ancón y, en días despejados, los cayos en el horizonte. Los atardeceres desde La Boca son de los más espectaculares del sur de Cuba.\n\nLas paladares del pueblo sirven pescado y mariscos recién capturados. El lambí (caracol) preparado en salsa criolla o el camarón al ajillo son especialidades locales que no deben perderse. El ambiente relajado, la brisa del mar y la hospitalidad de sus habitantes hacen de La Boca un destino de visita obligada.",
    horario: "Acceso libre todo el día",
    entrada: "Gratuita",
    ubicacion: "Desembocadura del río Guaurabo",
    distancia: "5 km al suroeste de Trinidad",
    consejos: "Camina al atardecer a lo largo de la orilla del río. Las paladares locales ofrecen el mejor marisco de la zona a precios muy razonables. Puedes llegar en bicitaxi desde Trinidad en unos 20 minutos.",
  },
];

export default LUGARES;
