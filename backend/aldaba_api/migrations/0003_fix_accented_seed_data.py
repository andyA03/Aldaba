from django.db import migrations


def seed_correct_texts(apps, schema_editor):
    LugarTuristico = apps.get_model("aldaba_api", "LugarTuristico")
    Alojamiento = apps.get_model("aldaba_api", "Alojamiento")
    Gastronomia = apps.get_model("aldaba_api", "Gastronomia")
    Excursion = apps.get_model("aldaba_api", "Excursion")
    EspacioEvento = apps.get_model("aldaba_api", "EspacioEvento")
    ServicioCultural = apps.get_model("aldaba_api", "ServicioCultural")
    OtroServicio = apps.get_model("aldaba_api", "OtroServicio")
    ProyectoComunitario = apps.get_model("aldaba_api", "ProyectoComunitario")
    InformacionEmpresa = apps.get_model("aldaba_api", "InformacionEmpresa")

    lugares = [
        {
            "id": 1,
            "slug": "trinidad-historica",
            "nombre": "Centro Histórico de Trinidad",
            "categoria": "Patrimonio",
            "categoria_color": "#1B4F8A",
            "foto": "https://picsum.photos/seed/trinidad-centro/1200/800",
            "foto_hero": "https://picsum.photos/seed/trinidad-centro-hero/1600/900",
            "resumen": "Calles empedradas, plazas coloniales y museos vivos.",
            "descripcion": "El casco histórico conserva la arquitectura colonial y la vida cultural de la ciudad.",
            "horario": "Todos los días 8:00 AM - 6:00 PM",
            "entrada": "Libre",
            "ubicacion": "Trinidad, Sancti Spíritus",
            "distancia": "Centro de la ciudad",
            "consejos": "Lleva calzado cómodo y visita al amanecer.",
        },
        {
            "id": 2,
            "slug": "valle-de-los-ingenios",
            "nombre": "Valle de los Ingenios",
            "categoria": "UNESCO",
            "categoria_color": "#5B8C3A",
            "foto": "https://picsum.photos/seed/valle-ingenios/1200/800",
            "foto_hero": "https://picsum.photos/seed/valle-ingenios-hero/1600/900",
            "resumen": "Paisaje cultural único con torre Manaca Iznaga.",
            "descripcion": "Conjunto declarado Patrimonio de la Humanidad por la UNESCO por su valor histórico.",
            "horario": "8:00 AM - 5:00 PM",
            "entrada": "Variable según el recorrido",
            "ubicacion": "A 15 km de Trinidad",
            "distancia": "15 km",
            "consejos": "Ideal para excursiones de medio día.",
        },
        {
            "id": 3,
            "slug": "playa-ancon",
            "nombre": "Playa Ancón",
            "categoria": "Costa",
            "categoria_color": "#0077B6",
            "foto": "https://picsum.photos/seed/playa-ancon/1200/800",
            "foto_hero": "https://picsum.photos/seed/playa-ancon-hero/1600/900",
            "resumen": "Arena clara y mar turquesa a pocos minutos de Trinidad.",
            "descripcion": "Una de las playas más conocidas del sur de Cuba, perfecta para descanso y snorkel.",
            "horario": "Todo el día",
            "entrada": "Libre",
            "ubicacion": "Península Ancón",
            "distancia": "12 km",
            "consejos": "Lleva protector solar y agua.",
        },
    ]

    alojamientos = [
        {
            "id": 1,
            "nombre": "Hostal La Casona",
            "descripcion": "Casa colonial restaurada con patio interior y atención familiar.",
            "amenidades": ["Wi-Fi", "Aire acondicionado", "Desayuno incluido"],
            "habitaciones": "5 habitaciones",
            "foto": "https://picsum.photos/seed/hostal-casona/1200/800",
            "icono": "bed",
        },
        {
            "id": 2,
            "nombre": "Casa Colonial Trinidad",
            "descripcion": "Alojamiento céntrico cerca de plazas, restaurantes y museos.",
            "amenidades": ["Terraza", "Climatización", "Parking"],
            "habitaciones": "4 habitaciones",
            "foto": "https://picsum.photos/seed/casa-colonial/1200/800",
            "icono": "house",
        },
    ]

    gastronomia = [
        {
            "id": 1,
            "nombre": "Restaurante El Rincón Criollo",
            "descripcion": "Platos tradicionales cubanos con vista a la ciudad.",
            "oferta": ["Ropa vieja", "Lechón asado", "Cócteles"],
            "foto": "https://picsum.photos/seed/rincon-criollo/1200/800",
            "icono": "utensils",
        },
        {
            "id": 2,
            "nombre": "Paladar Vista al Valle",
            "descripcion": "Cocina local con terraza y productos frescos del día.",
            "oferta": ["Langosta", "Pescado del día", "Postres caseros"],
            "foto": "https://picsum.photos/seed/vista-valle/1200/800",
            "icono": "chef-hat",
        },
    ]

    excursiones = [
        {
            "id": 1,
            "nombre": "Ruta al Valle de los Ingenios",
            "descripcion": "Recorrido guiado por haciendas, miradores y la torre Manaca Iznaga.",
            "caracteristicas": ["Guía local", "Transporte incluido", "Paradas fotográficas"],
            "duracion": "4 horas",
            "foto": "https://picsum.photos/seed/ruta-valle/1200/800",
            "icono": "map",
        },
        {
            "id": 2,
            "nombre": "Aventura a Topes de Collantes",
            "descripcion": "Senderismo entre cascadas, vegetación tropical y miradores naturales.",
            "caracteristicas": ["Senderismo", "Baño en cascada", "Almuerzo opcional"],
            "duracion": "Medio día",
            "foto": "https://picsum.photos/seed/topes-collantes/1200/800",
            "icono": "compass",
        },
    ]

    espacios_evento = [
        {
            "id": 1,
            "nombre": "Salón Colonial Trinidad",
            "capacidad": "80 personas",
            "descripcion": "Espacio elegante para bodas, reuniones y actividades culturales.",
            "tipos_evento": ["Boda", "Conferencia", "Celebración"],
            "foto": "https://picsum.photos/seed/salon-colonial/1200/800",
            "icono": "calendar",
        },
        {
            "id": 2,
            "nombre": "Patio Cultural La Plaza",
            "capacidad": "120 personas",
            "descripcion": "Patio abierto para música en vivo y eventos comunitarios.",
            "tipos_evento": ["Concierto", "Festival", "Encuentro cultural"],
            "foto": "https://picsum.photos/seed/patio-cultural/1200/800",
            "icono": "music",
        },
    ]

    servicios_culturales = [
        {
            "id": 1,
            "nombre": "Galería Arte Trinidad",
            "descripcion": "Exhibiciones de artistas locales y talleres de creación.",
            "foto": "https://picsum.photos/seed/galeria-arte/1200/800",
            "icono": "palette",
        },
        {
            "id": 2,
            "nombre": "Casa de la Música",
            "descripcion": "Presentaciones en vivo, trova y baile tradicional.",
            "foto": "https://picsum.photos/seed/casa-musica/1200/800",
            "icono": "mic",
        },
    ]

    otros_servicios = [
        {
            "id": 1,
            "nombre": "Transporte Turístico Aldaba",
            "descripcion": "Traslados locales y excursiones con choferes de confianza.",
            "icono": "car",
        },
        {
            "id": 2,
            "nombre": "Guías y Reservas",
            "descripcion": "Asistencia para coordinar visitas, mesas y hospedaje.",
            "icono": "shield-check",
        },
    ]

    proyectos = [
        {
            "id": 1,
            "titulo": "Restauración de fachadas coloniales",
            "descripcion": "Programa comunitario para conservar el patrimonio arquitectónico.",
            "anio": "2024",
            "icono": "hammer",
        },
        {
            "id": 2,
            "titulo": "Escuela de arte para jóvenes",
            "descripcion": "Iniciativa de formación artística y cultural para la comunidad.",
            "anio": "2025",
            "icono": "graduation-cap",
        },
    ]

    empresa = {
        "id": 1,
        "nombre": "Aldaba",
        "tagline": "Turismo, cultura y hospitalidad en Trinidad",
        "ubicacion": "Trinidad, Sancti Spíritus, Cuba",
        "descripcion": "Aldaba conecta visitantes con experiencias auténticas, alojamiento, gastronomía, excursiones y cultura local.",
        "mision": "Promover un turismo sostenible y cercano a la identidad de Trinidad.",
        "valores": ["Hospitalidad", "Calidad", "Cercanía", "Compromiso cultural"],
        "direccion": "Calle Real, Trinidad",
        "telefono": "+53 41 000000",
        "email": "info@aldaba.cu",
    }

    for item in lugares:
        LugarTuristico.objects.update_or_create(slug=item["slug"], defaults=item)

    for item in alojamientos:
        Alojamiento.objects.update_or_create(id=item["id"], defaults=item)

    for item in gastronomia:
        Gastronomia.objects.update_or_create(id=item["id"], defaults=item)

    for item in excursiones:
        Excursion.objects.update_or_create(id=item["id"], defaults=item)

    for item in espacios_evento:
        EspacioEvento.objects.update_or_create(id=item["id"], defaults=item)

    for item in servicios_culturales:
        ServicioCultural.objects.update_or_create(id=item["id"], defaults=item)

    for item in otros_servicios:
        OtroServicio.objects.update_or_create(id=item["id"], defaults=item)

    for item in proyectos:
        ProyectoComunitario.objects.update_or_create(id=item["id"], defaults=item)

    InformacionEmpresa.objects.update_or_create(id=empresa["id"], defaults=empresa)


def unseed_correct_texts(apps, schema_editor):
    # Keep the correction idempotent and non-destructive on reverse migrations.
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("aldaba_api", "0002_habitacion_mesa_reserva_reservaexcursion_and_more"),
    ]

    operations = [
        migrations.RunPython(seed_correct_texts, unseed_correct_texts),
    ]