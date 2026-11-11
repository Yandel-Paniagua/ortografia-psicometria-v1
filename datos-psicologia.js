/* =========================================================
   Guía de Pruebas Psicológicas, Simulador DISC + Big Five,
   Juicio Situacional Bancario (28 casos) y Entrevista STAR.
   Orientado a bancos y empresas corporativas en RD.
   Norma ortográfica: RAE (2010). Sin dependencias externas.
   ========================================================= */

var GUIA_PSICOLOGIA = [
  {
    id: "psico-disc",
    titulo: "DISC / Cleaver (Comportamiento en el puesto)",
    subtitulo: "La prueba conductual más utilizada en banca y corporaciones dominicanas",
    resumen: "No mide «bueno o malo», sino cómo reaccionas ante retos (D), personas (I), ritmo/cambios (S) y normas/procedimientos (C).",
    puntos: [
      "Dominancia (D — Empuje y resultados): Evalúa decisión, rapidez para resolver problemas y liderazgo ante metas exigentes. Muy valorado en gerencia comercial, cobros y liderazgo de proyectos.",
      "Influencia (I — Persuasión y trato): Mide comunicación entusiasta, empatía inicial y facilidad para conectar con clientes. Clave en ejecutivos de negocios, mercadeo y servicio preferencial.",
      "Estabilidad (S — Constancia y paciencia): Refleja serenidad, escucha activa, tolerancia a tareas rutinarias y lealtad al equipo. Ideal para caja, operaciones, servicio al cliente y soporte.",
      "Cumplimiento (C — Apego a normas y calidad): Evalúa exactitud, análisis detallado, prudencia y respeto estricto de políticas. Esencial en auditoría, cumplimiento PLAFT, riesgo, contabilidad y QA.",
      "Cómo funciona el formato Cleaver (Más / Menos): En cada bloque de cuatro adjetivos eliges el que MÁS te describe en el trabajo y el que MENOS te describe. Compara tu perfil natural con lo que exige el cargo."
    ],
    consejo: "Piensa siempre en ti mismo DENTRO DEL ENTORNO LABORAL (no en una fiesta con amigos). Si postulas a banca u operaciones, equilibra el trato cordial con el respeto riguroso a procesos y controles."
  },
  {
    id: "psico-bigfive-16pf",
    titulo: "Big Five (OCEAN) y 16PF de Cattell",
    subtitulo: "Rasgos profundos de personalidad y escalas de sinceridad",
    resumen: "Exploran tu estilo habitual de trabajo, manejo del estrés, cooperación y consistencia interna a lo largo de decenas de preguntas.",
    puntos: [
      "Responsabilidad / Escrupulosidad (Conscientiousness): Orden, puntualidad, autodisciplina y orientación al logro. Es el factor con mayor peso predictivo en selección bancaria.",
      "Estabilidad emocional: Capacidad de mantener la calma bajo presión de cierre de mes, filas largas o incidencias críticas sin reaccionar de forma impulsiva.",
      "Amabilidad y cooperación: Trato respetuoso, disposición a colaborar entre áreas y manejo constructivo de desacuerdos.",
      "Extraversión y Apertura: Nivel de energía social y disposición para aprender nuevas herramientas tecnológicas o cambios regulatorios.",
      "16PF y Escalas de Distorsión Motivacional (Sinceridad): Pruebas como el 16PF incluyen preguntas control («¿Alguna vez ha dejado para mañana algo que debía hacer hoy?»). Marcar siempre extremos irreales invalida el perfil por «deseabilidad social»."
    ],
    consejo: "Sé coherente: una misma dimensión se pregunta de 5 o 6 maneras distintas en diferentes puntos del test. Responder con honestidad profesional y moderación evita contradicciones."
  },
  {
    id: "psico-valores",
    titulo: "Test de Valores (Zavic y Allport)",
    subtitulo: "Integridad, ética y apego a la ley en instituciones financieras",
    resumen: "En el sector financiero dominicano la confianza fiduciaria es sagrada: estas pruebas miden qué priorizas ante dilemas éticos.",
    puntos: [
      "Test Zavic (Valores e intereses): Evalúa cuatro valores básicos (Moral, Legalidad, Indiferencia y Corrupción) aplicados a cuatro intereses (Económico, Político, Social y Religioso/Ético).",
      "Prioridad innegociable en banca: La Legalidad (respeto a normas, leyes y reglamentos internos) y la Moral (honestidad aunque nadie supervise) deben prevalecer siempre por encima del beneficio rápido o el favoritismo.",
      "Cero tolerancia a «atajos bienintencionados»: En Zavic suelen presentarse casos donde alguien altera un dato menor o acepta una comisión «para ayudar a un cliente o amigo». En banca, saltar un control por amistad sigue siendo una falta grave.",
      "Test de Allport: Clasifica motivaciones personales (teórica, económica, estética, social, política y normativa) para ubicar en qué cultura departamental encajas mejor."
    ],
    consejo: "Ante cualquier dilema entre alcanzar una meta comercial o respetar el código de ética y la ley, en una entidad regulada la respuesta correcta SIEMPRE prioriza la legalidad y la transparencia."
  },
  {
    id: "psico-wartegg",
    titulo: "Test Proyectivo de Wartegg (8 y 16 campos)",
    subtitulo: "Cómo interpretar los estímulos gráficos y presentar una prueba limpia",
    resumen: "Cada recuadro contiene un pequeño signo inicial que debes integrar libremente en un dibujo completo, numerando el orden y poniéndole título.",
    puntos: [
      "Campos orgánicos (1, 2, 7 y 8): Tienen estímulos curvos o puntos suaves; se asocian con el mundo afectivo, la empatía, las relaciones humanas y la adaptación social (suele preferirse dibujar elementos vivos, humanos o de naturaleza).",
      "Campos inorgánicos (3, 4, 5 y 6): Tienen líneas rectas o bloques; se relacionan con metas, manejo de problemas, energía productiva y razonamiento práctico (suele fluir mejor dibujar objetos concretos, arquitectura, herramientas o esquemas constructivos).",
      "Integración del estímulo: No ignores ni taches el signo impreso; haz que forme parte natural de tu dibujo.",
      "Orden y limpieza: Usa trazos firmes y continuos (evita repasar diez veces la misma línea o borrar dejando manchas oscuras), escribe títulos claros y positivos sin faltas de ortografía."
    ],
    consejo: "No necesitas saber dibujar como artista: se evalúa la claridad, proporción, integración del estímulo y sentido constructivo, nunca el talento pictórico."
  },
  {
    id: "psico-lluvia-colores",
    titulo: "Persona bajo la lluvia, Machover, Árbol de Koch y Lüscher",
    subtitulo: "Afrontamiento de la presión laboral y pruebas cromáticas",
    resumen: "Complementan la entrevista explorando cómo te percibes frente a situaciones tensas del entorno de trabajo.",
    puntos: [
      "Persona bajo la lluvia: La lluvia simboliza la presión externa o el estrés cotidiano, y el PARAGUAS representa tus mecanismos sanos de protección y organización. Dibuja una persona completa, de frente, proporcionada, con paraguas bien sujeto cubriéndola, ropa adecuada y una línea suave de piso (estabilidad).",
      "Figura humana (Machover) y Árbol de Koch: Céntralos en la hoja en posición vertical (salvo instrucción distinta), tamaño medio (entre 50 % y 70 % del alto de la página), con rostro completo y extremidades completas (sin ocultar manos en bolsillos ni hacer figuras de palitos).",
      "Historia breve (si te piden escribir un relato al dorso): Redacta un párrafo coherente, optimista y realista sobre un personaje responsable que resuelve una jornada laboral o meta personal, cuidando al 100 % las tildes y signos.",
      "Test de los colores de Lüscher: Consiste en ordenar tarjetas de colores según tu preferencia visual del momento. Elige con espontaneidad y calma; intenta evitar bloqueos excesivos al repetir el segundo ordenamiento."
    ],
    consejo: "En «Persona bajo la lluvia», jamás olvides dibujar el paraguas ni el suelo bajo los pies, y evita dibujar tormentas violentas con rayos: unas gotas moderadas bastan."
  },
  {
    id: "psico-sinceridad",
    titulo: "Cómo no activar la «escala de mentira» ni caer en contradicciones",
    subtitulo: "Reglas de oro para superar filtros psicométricos automatizados",
    resumen: "Muchos candidatos excelentes quedan descartados no por su personalidad, sino por intentar parecer sobrehumanos.",
    puntos: [
      "Rechaza los absolutos imposibles: Ante frases como «Jamás en mi vida he sentido impaciencia» o «Me agradan absolutamente todas las personas que conozco», responder «Totalmente cierto» suma puntos a la escala de distorsión (faking good).",
      "Diferencia entre debilidad humana normal y falta ética: Es normal admitir que alguna vez te has sentido cansado o que prefieres planificar antes de improvisar; lo que NUNCA es aceptable es validar deshonestidad, robo, violencia o incumplimiento deliberado.",
      "Mantén un mismo marco mental: Imagina tu mejor versión REAL trabajando en un día exigente de oficina y mantén ese mismo criterio de la pregunta 1 a la 180.",
      "Cuida el tiempo: En pruebas de personalidad no te detengas tres minutos calculando qué quiere oír el psicólogo; la primera lectura honesta y profesional suele ser la más consistente."
    ],
    consejo: "La autenticidad madura gana: los bancos buscan personas íntegras, estables y entrenables, no robots infalibles."
  }
];

/* Referencia visual de los 8 campos clásicos del Test de Wartegg */
var CAMPOS_WARTEGG = [
  {
    num: 1,
    tipo: "Orgánico",
    nombre: "Autoconcepto y seguridad",
    estimulo: "Punto central",
    evalua: "Identidad, equilibrio personal y cómo te sitúas ante nuevas responsabilidades.",
    sugerencia: "Integra el punto como centro natural de algo armónico (flor, reloj, diana, sol, rostro o brújula).",
    svg: '<circle cx="40" cy="40" r="2.6" fill="#0f172a"/>'
  },
  {
    num: 2,
    tipo: "Orgánico",
    nombre: "Afectividad y empatía",
    estimulo: "Pequeña línea ondulada arriba a la izquierda",
    evalua: "Calidez en el trato interpersonal, sensibilidad social y contacto con clientes y compañeros.",
    sugerencia: "Suele integrarse bien en elementos vivos o expresivos (ave en vuelo, rostro amable, paisaje con río o planta).",
    svg: '<path d="M18,22 Q23,16 28,22 T38,22" fill="none" stroke="#0f172a" stroke-width="2.4" stroke-linecap="round"/>'
  },
  {
    num: 3,
    tipo: "Inorgánico",
    nombre: "Ambición y crecimiento",
    estimulo: "Tres líneas verticales ascendentes abajo a la izquierda",
    evalua: "Metas profesionales, deseo de superación gradual y constancia organizacional.",
    sugerencia: "Continúa la progresión ascendente (edificios, escalera, gráfico de crecimiento, puente o estantería).",
    svg: '<line x1="16" y1="64" x2="16" y2="54" stroke="#0f172a" stroke-width="2.4"/><line x1="25" y1="64" x2="25" y2="45" stroke="#0f172a" stroke-width="2.4"/><line x1="34" y1="64" x2="34" y2="36" stroke="#0f172a" stroke-width="2.4"/>'
  },
  {
    num: 4,
    tipo: "Inorgánico",
    nombre: "Manejo de presión y obstáculos",
    estimulo: "Pequeño cuadro negro arriba a la derecha",
    evalua: "Cómo enfrentas problemas concretos, ansiedad y cargas de trabajo exigentes.",
    sugerencia: "Intégralo con naturalidad como ventana de una casa o edificio, tecla, tablero de ajedrez o cometa.",
    svg: '<rect x="54" y="18" width="9" height="9" fill="#0f172a"/>'
  },
  {
    num: 5,
    tipo: "Inorgánico",
    nombre: "Energía y resolución",
    estimulo: "Dos líneas diagonales opuestas abajo a la izquierda",
    evalua: "Dinamismo para superar barreras y canalizar el impulso hacia acciones productivas.",
    sugerencia: "Une o proyecta las líneas hacia arriba/derecha (linterna iluminando, pala, avión despegando, paraguas o herramienta).",
    svg: '<line x1="14" y1="64" x2="32" y2="46" stroke="#0f172a" stroke-width="2.4"/><line x1="18" y1="44" x2="34" y2="60" stroke="#0f172a" stroke-width="2.4"/>'
  },
  {
    num: 6,
    tipo: "Inorgánico",
    nombre: "Raciocinio y síntesis",
    estimulo: "Una línea horizontal y una vertical separadas",
    evalua: "Capacidad de análisis, orden mental e integración lógica de partes en un todo.",
    sugerencia: "Conecta AMBAS líneas en una sola figura coherente (computadora, escritorio, casa, camión o maletín).",
    svg: '<line x1="16" y1="24" x2="42" y2="24" stroke="#0f172a" stroke-width="2.4"/><line x1="56" y1="34" x2="56" y2="60" stroke="#0f172a" stroke-width="2.4"/>'
  },
  {
    num: 7,
    tipo: "Orgánico",
    nombre: "Tacto, detalle y madurez",
    estimulo: "Semicírculo punteado abajo a la derecha",
    evalua: "Delicadeza en el servicio, atención al detalle fino y sensibilidad ética.",
    sugerencia: "Respeta la textura punteada integrándola como collar, racimo de uvas, centro de flor o sendero de jardín.",
    svg: '<circle cx="48" cy="56" r="1.4" fill="#0f172a"/><circle cx="52" cy="51" r="1.4" fill="#0f172a"/><circle cx="58" cy="49" r="1.4" fill="#0f172a"/><circle cx="63" cy="52" r="1.4" fill="#0f172a"/><circle cx="65" cy="58" r="1.4" fill="#0f172a"/>'
  },
  {
    num: 8,
    tipo: "Orgánico",
    nombre: "Normas y compromiso social",
    estimulo: "Arco amplio curvo en la parte superior",
    evalua: "Sentido de pertenencia, respeto a la autoridad institucional y protección.",
    sugerencia: "Suele cerrarse de forma armónica como paraguas abierto, cúpula arquitectónica, amanecer sobre montañas o paracaídas.",
    svg: '<path d="M18,30 Q40,12 62,30" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>'
  }
];

/* =========================================================
   Simulador Interactivo de Perfil Laboral (24 ítems)
   Combina DISC (D, I, S, C) + Cinco Grandes (OCEAN)
   ========================================================= */
var SIMULADOR_PERFIL = {
  instrucciones: "Valora del 1 (Muy en desacuerdo) al 5 (Totalmente de acuerdo) cómo actúas habitualmente en un entorno de estudio o trabajo. No hay respuestas malas: el simulador mostrará tus fortalezas naturales y qué equilibrar en una evaluación bancaria.",
  escala: [
    { valor: 1, texto: "1 · Muy en desacuerdo" },
    { valor: 2, texto: "2 · En desacuerdo" },
    { valor: 3, texto: "3 · Neutral" },
    { valor: 4, texto: "4 · De acuerdo" },
    { valor: 5, texto: "5 · Totalmente de acuerdo" }
  ],
  items: [
    /* DISC: D (3), I (3), S (3), C (3) */
    { id: "sp-01", dim: "D", grupo: "DISC", texto: "Cuando surge un obstáculo urgente en un proyecto, tomo la iniciativa de inmediato para destrabarlo." },
    { id: "sp-02", dim: "I", grupo: "DISC", texto: "Se me facilita conversar con clientes nuevos y generar confianza desde los primeros minutos." },
    { id: "sp-03", dim: "S", grupo: "DISC", texto: "Mantengo un ritmo constante y paciente incluso cuando debo repetir procedimientos similares todo el día." },
    { id: "sp-04", dim: "C", grupo: "DISC", texto: "Antes de enviar un reporte o correo importante, verifico dos veces cada cifra, fecha y norma aplicable." },
    { id: "sp-05", dim: "D", grupo: "DISC", texto: "Me motivan las metas retadoras con indicadores medibles y plazos exigentes." },
    { id: "sp-06", dim: "I", grupo: "DISC", texto: "Disfruto exponer ideas en reuniones y entusiasmar al equipo hacia un objetivo común." },
    { id: "sp-07", dim: "S", grupo: "DISC", texto: "Mis compañeros suelen acudir a mí porque sé escuchar con calma y mediar cuando hay tensión." },
    { id: "sp-08", dim: "C", grupo: "DISC", texto: "Prefiero trabajar con manuales claros, listas de control y criterios bien documentados." },
    { id: "sp-09", dim: "D", grupo: "DISC", texto: "Si hay que tomar una decisión difícil con tiempo limitado, asumo la responsabilidad sin titubear." },
    { id: "sp-10", dim: "I", grupo: "DISC", texto: "Me adapto rápido a distintos tipos de público y cuido que la experiencia del cliente sea cálida." },
    { id: "sp-11", dim: "S", grupo: "DISC", texto: "Valoro la estabilidad a largo plazo y la cooperación leal por encima de la competencia interna." },
    { id: "sp-12", dim: "C", grupo: "DISC", texto: "Me incomoda entregar un trabajo si detecto aunque sea una pequeña inconsistencia sin explicar." },

    /* BIG FIVE / OCEAN: Responsabilidad (3), Calma emocional (3), Extraversión (2), Amabilidad (2), Apertura (2) */
    { id: "sp-13", dim: "responsabilidad", grupo: "OCEAN", texto: "Organizo mi agenda diaria por prioridades para no dejar entregas para el último minuto." },
    { id: "sp-14", dim: "calma", grupo: "OCEAN", texto: "Ante un reclamo fuerte o un cierre de mes bajo presión, conservo el tono sereno y pienso con claridad." },
    { id: "sp-15", dim: "amabilidad", grupo: "OCEAN", texto: "Comparto mis conocimientos con compañeros nuevos sin reservas para que todo el departamento avance." },
    { id: "sp-16", dim: "apertura", grupo: "OCEAN", texto: "Aprendo con rapidez nuevos sistemas informáticos, normativas o cambios en los flujos de trabajo." },
    { id: "sp-17", dim: "extraversion", grupo: "OCEAN", texto: "El contacto frecuente con personas durante la jornada me recarga de energía en lugar de agotarme." },
    { id: "sp-18", dim: "responsabilidad", grupo: "OCEAN", texto: "Cumplo mis compromisos laborales con el mismo rigor tanto si mi supervisor está presente como si no." },
    { id: "sp-19", dim: "calma", grupo: "OCEAN", texto: "Si cometo un error, en vez de bloquearme o buscar excusas, lo comunico rápido y me enfoco en la solución." },
    { id: "sp-20", dim: "amabilidad", grupo: "OCEAN", texto: "Trato con igual cortesía y respeto a cualquier cliente o colaborador, sin importar su cargo." },
    { id: "sp-21", dim: "apertura", grupo: "OCEAN", texto: "Suelo proponer mejoras prácticas para simplificar tareas repetitivas sin sacrificar el control." },
    { id: "sp-22", dim: "extraversion", grupo: "OCEAN", texto: "Me siento cómodo participando activamente en capacitaciones grupales y dinámicas de equipo." },
    { id: "sp-23", dim: "responsabilidad", grupo: "OCEAN", texto: "Cuido el orden de mis archivos físicos y digitales para localizar cualquier soporte en segundos." },
    { id: "sp-24", dim: "calma", grupo: "OCEAN", texto: "Logro desconectar las emociones negativas de un caso difícil para atender al siguiente cliente con buena actitud." }
  ],
  perfilesDisc: {
    D: {
      nombre: "Dominancia (D) · Orientación a Resultados",
      fortalezas: "Iniciativa, sentido de urgencia, resolución ejecutiva de problemas y empuje para superar metas comerciales o proyectos complejos.",
      rolesAfines: "Banca Corporativa, Gerencia de Sucursal, Recuperación y Cobros, Liderazgo de Proyectos.",
      cuidar: "En evaluaciones bancarias, demuestra que tu rapidez nunca salta controles regulatorios y que escuchas con paciencia al equipo."
    },
    I: {
      nombre: "Influencia (I) · Comunicación y Servicio",
      fortalezas: "Empatía comercial, persuasión ética, calidez en la atención al público y capacidad para integrar equipos de trabajo.",
      rolesAfines: "Oficial de Negocios, Banca Personal y Preferencial, Atención al Cliente, Mercadeo y Gestión Humana.",
      cuidar: "Acompaña tu carisma con seguimiento riguroso de expedientes, puntualidad y precisión en los detalles numéricos."
    },
    S: {
      nombre: "Estabilidad (S) · Constancia y Confiabilidad",
      fortalezas: "Paciencia ejemplar, trato sereno bajo presión, lealtad institucional, escucha activa y ejecución consistente de procesos operativos.",
      rolesAfines: "Operaciones y Caja, Servicio al Cliente, Soporte Operativo, Administración de Cartera y Back-Office.",
      cuidar: "Muestra flexibilidad positiva ante cambios tecnológicos y firmeza asertiva cuando debas decir «no» por política interna."
    },
    C: {
      nombre: "Cumplimiento (C) · Precisión y Control",
      fortalezas: "Exactitud analítica, apego impecable a normas, detección temprana de errores, pensamiento estructurado y prudencia financiera.",
      rolesAfines: "Auditoría Interna, Cumplimiento (PLAFT), Riesgo Crediticio y Operativo, Aseguramiento de Calidad (QA), Contabilidad.",
      cuidar: "Evita que el perfeccionismo retrase entregas urgentes («parálisis por análisis») y comunica tus hallazgos con tacto y empatía."
    }
  },
  dimensionesOcean: {
    responsabilidad: "Responsabilidad y Orden",
    calma: "Estabilidad Emocional bajo Presión",
    amabilidad: "Cooperación y Vocación de Servicio",
    apertura: "Adaptabilidad y Aprendizaje Digital",
    extraversion: "Energía Social y Comunicación"
  }
};

/* =========================================================
   Banco de 28 Preguntas de Juicio Situacional Bancario y
   Corporativo (Ética, PLAFT, Servicio, Riesgo y Equipo)
   ========================================================= */
var JUICIO_SITUACIONAL = [
  {
    id: "js-01",
    tema: "Secreto bancario y confidencialidad",
    situacion: "Un primo cercano te escribe por WhatsApp pidiéndote confirmar de manera informal si un socio comercial suyo tiene fondos suficientes en su cuenta del banco antes de cerrarle un negocio.",
    opciones: [
      "Revisar el saldo rápidamente y responderle solo con un «sí» o «no» sin enviar capturas de pantalla.",
      "Explicarle con firmeza y cortesía que por ley de secreto bancario y código de ética tienes estrictamente prohibido consultar o divulgar información de clientes.",
      "Pedirle a un compañero de otra sucursal que consulte la cuenta para que tu usuario no quede registrado en la auditoría.",
      "Decirle que el sistema está caído hoy para evitar incomodarlo sin darle una negativa directa."
    ],
    correcta: 1,
    explicacion: "En banca, tanto la divulgación como la simple consulta no autorizada de cuentas sin justificación operativa violan el secreto bancario y quedan registradas en bitácora; debe rechazarse con claridad ética."
  },
  {
    id: "js-02",
    tema: "Prevención de lavado de activos (PLAFT)",
    situacion: "Un cliente habitual intenta realizar en efectivo un depósito de RD$ 950,000.00. Al informarle que por umbral regulatorio debe completar el formulario de origen de fondos, pide dividir el depósito en tres partes menores a nombre de sus acompañantes para «ahorrarse el papeleo».",
    opciones: [
      "Aceptar la división porque es un cliente conocido y el dinero proviene de su ferretería.",
      "Advertirle en voz baja que si fracciona el depósito el departamento de Cumplimiento lo va a investigar.",
      "No facilitar el fraccionamiento, aplicar el protocolo establecido por la entidad y escalar internamente la señal de alerta al área de Cumplimiento sin alertar al cliente.",
      "Sugerirle que deposite la mitad hoy y regrese mañana por otra ventanilla."
    ],
    correcta: 2,
    explicacion: "El fraccionamiento («pitufeo» o estructuración) para evadir controles es una señal clásica de alerta PLAFT (Ley 155-17). Además, la normativa prohíbe estrictamente alertar al cliente (*tipping-off*) sobre reportes internos."
  },
  {
    id: "js-03",
    tema: "Conflicto de intereses y obsequios",
    situacion: "Eres analista de compras y uno de los proveedores que participa en una licitación vigente envía a tu escritorio una tarjeta de regalo equivalente a RD$ 15,000.00 como «agradecimiento por tu amabilidad».",
    opciones: [
      "Conservarla sin comentarlo, asegurándote de evaluar todas las ofertas con imparcialidad.",
      "Repartir el monto entre todos los compañeros del departamento para que no sea un beneficio individual.",
      "Notificar de inmediato a tu supervisor y a Cumplimiento/Ética, procediendo a devolver formalmente el obsequio según la política institucional.",
      "Devolverla en privado después de que termine la licitación si ese proveedor no resulta ganador."
    ],
    correcta: 2,
    explicacion: "Recibir dádivas o equivalentes de efectivo de un oferente activo genera un conflicto de intereses real o aparente. La transparencia inmediata ante el supervisor y Cumplimiento protege tu integridad y la del proceso."
  },
  {
    id: "js-04",
    tema: "Manejo de errores operativos",
    situacion: "Diez minutos después de enviar a gerencia el reporte consolidado de cierre diario, descubres que una fórmula de tu hoja de cálculo excluyó la última fila, alterando el total en un 3 %.",
    opciones: [
      "Esperar a ver si alguien lo nota y, si no dicen nada, compensar la diferencia en el reporte de mañana.",
      "Informar de inmediato a tu supervisor, enviar la versión corregida explicando con transparencia el ajuste realizado y verificar el rango de la plantilla para que no se repita.",
      "Modificar silenciosamente el archivo compartido sin avisar a quienes ya recibieron el correo.",
      "Culpar a una actualización automática del sistema contable para proteger tu evaluación de desempeño."
    ],
    correcta: 1,
    explicacion: "En finanzas y auditoría, detectar y escalar proactivamente un error propio demuestra madurez, confiabilidad y control; ocultarlo o compensarlo destruye la trazabilidad y puede causar decisiones erróneas."
  },
  {
    id: "js-05",
    tema: "Atención a clientes molestos",
    situacion: "Un cliente alza la voz frente a tu escritorio porque le cobraron un cargo por mora que él asegura no corresponder, ya que intentó pagar anoche y la aplicación móvil presentó intermitencia.",
    opciones: [
      "Responderle en el mismo tono firme que si no baja la voz no podrás atender su caso.",
      "Escuchar sin interrumpir manteniendo un tono sereno, validar su molestia, verificar en sistema el registro de fallas de anoche y gestionar la reclamación conforme al procedimiento.",
      "Reversar el cargo de inmediato sin revisar ninguna evidencia para que se retire rápido de la sucursal.",
      "Decirle que ese problema pertenece exclusivamente al área de Tecnología y que debe llamar al centro telefónico."
    ],
    correcta: 1,
    explicacion: "La desescalada profesional combina empatía («entiendo su incomodidad»), serenidad emocional, verificación objetiva de evidencias en el sistema y canalización resolutiva sin saltar controles."
  },
  {
    id: "js-06",
    tema: "Seguridad de la información",
    situacion: "Tienes mucha prisa para entregar un expediente urgente y tu supervisor sale cinco minutos al piso superior dejando su sesión desbloqueada; con su usuario abierto podrías aprobar tú mismo la gestión en diez segundos.",
    opciones: [
      "Aprobar la gestión con su sesión abierta y avisarle apenas regrese para ganar tiempo.",
      "Bloquear preventivamente la pantalla de su estación (o resguardarla) y esperar o localizar al supervisor para que apruebe con sus propias credenciales.",
      "Pedirle a otro compañero que haga clic para no ser tú quien toque el teclado.",
      "Tomar nota de la pantalla abierta para terminar otros tres casos pendientes de la fila."
    ],
    correcta: 1,
    explicacion: "Las credenciales y firmas electrónicas son estrictamente personales e intransferibles. Operar bajo el usuario de otra persona invalida la segregación de funciones y constituye una falta grave de seguridad."
  },
  {
    id: "js-07",
    tema: "Cuadre de caja y honestidad",
    situacion: "Al realizar el arqueo final de tu ventanilla al cierre del día, cuentas el efectivo dos veces y confirmas un SOBRANTE físico de RD$ 1,000.00 que no aparece pendiente en el sistema.",
    opciones: [
      "Guardar los RD$ 1,000.00 en un sobre personal por si la próxima semana tienes un faltante.",
      "Reportar íntegramente el sobrante en el acta de arqueo diario conforme a la normativa para que quede registrado y disponible ante una eventual reclamación del cliente afectado.",
      "Ingresarlo como propina en el fondo de café del equipo de caja.",
      "Omitir el registro hoy y revisar tú solo las cámaras mañana."
    ],
    correcta: 1,
    explicacion: "Tanto los faltantes como los sobrantes de caja pertenecen al giro operativo del banco/clientes y deben declararse el mismo día. Retener un sobrante en reserva («hacer colchón») está tipificado como falta grave."
  },
  {
    id: "js-08",
    tema: "Trabajo bajo presión y prioridades",
    situacion: "Son las 3:30 p. m. y tienes tres tareas simultáneas: 1) un requerimiento regulatorio que vence hoy a las 4:30 p. m., 2) una presentación interna para el próximo jueves y 3) un correo informativo de rutina.",
    opciones: [
      "Responder primero el correo corto y avanzar la presentación para sentir que completaste dos tareas rápido.",
      "Concentrarte de inmediato en el requerimiento regulatorio que vence hoy a las 4:30 p. m., asegurando su calidad antes de pasar a las demás tareas.",
      "Intentar hacer las tres tareas al mismo tiempo cambiando de ventana cada dos minutos.",
      "Pedir prórroga en el requerimiento regulatorio sin haber intentado terminarlo."
    ],
    correcta: 1,
    explicacion: "La matriz de priorización corporativa exige atender primero lo urgente y de alto impacto regulatorio/legal, evitando la multitarea dispersa que incrementa errores."
  },
  {
    id: "js-09",
    tema: "Aseguramiento de calidad (QA) y pases a producción",
    situacion: "Faltando una hora para liberar una actualización móvil, detectas un defecto que en ciertos teléfonos redondea mal los centavos de las transferencias. El líder del proyecto te sugiere callarlo hoy y corregirlo la semana entrante para cumplir la fecha prometida.",
    opciones: [
      "Aceptar la sugerencia verbal para no parecer conflictivo frente al equipo de desarrollo.",
      "Documentar formalmente el hallazgo con evidencia técnica, exponer el impacto financiero y reputacional y escalar por los canales de riesgo antes de autorizar la salida.",
      "Firmar el pase a producción pero guardar un mensaje privado en tu celular por si hay reclamos.",
      "Apagar el servidor de pruebas sin avisar a nadie para impedir la salida."
    ],
    correcta: 1,
    explicacion: "En tecnología bancaria la exactitud transaccional es sagrada: un error en montos afecta saldos reales y cumplimiento regulatorio. El rol de QA o control exige reportar con datos objetivos y no certificar algo defectuoso."
  },
  {
    id: "js-10",
    tema: "Conflicto de intereses familiar",
    situacion: "Como oficial de crédito recibes asignada en tu bandeja la solicitud de préstamo comercial de una empresa donde tu hermano es socio minoritario.",
    opciones: [
      "Evaluarla con el doble de rigor para demostrar que no lo estás favoreciendo.",
      "Declarar formalmente el vínculo familiar a tu supervisor de inmediato e inhibirte del análisis para que el caso se reasigne a otro oficial independiente.",
      "Analizarla normalmente siempre que la empresa cumpla todos los indicadores financieros.",
      "Rechazar la solicitud sin estudiarla para evitar cualquier sospecha futura."
    ],
    correcta: 1,
    explicacion: "Ante parentesco o interés vinculado, el procedimiento ético estándar es la declaración oportuna y la inhibición formal, garantizando objetividad tanto para el banco como para el solicitante."
  },
  {
    id: "js-11",
    tema: "Protección de datos e ingeniería social",
    situacion: "Recibes una llamada telefónica de alguien que dice ser técnico de soporte central del banco, menciona el nombre de tu gerente y te pide dictarle el código temporal que acaba de llegar a tu correo para «sincronizar tu estación».",
    opciones: [
      "Dictarle el código porque conoce el nombre exacto de tu gerente.",
      "Negarte a entregar cualquier código o credencial, colgar y verificar/reportar el intento de inmediato al canal oficial de Ciberseguridad o Mesa de Ayuda.",
      "Enviarle el código por correo interno en vez de dárselo por teléfono.",
      "Darle acceso remoto sin pedir número de caso ni validar su identidad."
    ],
    correcta: 1,
    explicacion: "Es un ataque clásico de ingeniería social (*vishing*). Soporte técnico legítimo jamás solicita contraseñas ni códigos de doble factor; debe rechazarse y reportarse al instante."
  },
  {
    id: "js-12",
    tema: "Trabajo en equipo y colaboración",
    situacion: "Ingresa una nueva compañera a tu departamento y notas que comete errores frecuentes al clasificar comprobantes porque nadie le explicó el cambio de normativa del mes pasado.",
    opciones: [
      "Dejar que se equivoque para que aprenda por experiencia propia cuando auditoría revise su lote.",
      "Quejarte con otros compañeros durante el almuerzo sobre la lentitud de la nueva integrante.",
      "Acercarte con respeto, compartirle la guía actualizada con un par de ejemplos prácticos y coordinar con el supervisor su breve refuerzo.",
      "Rehacer tú en secreto todo su trabajo todos los días sin decirle qué estaba fallando."
    ],
    correcta: 2,
    explicacion: "La cooperación madura corrige la causa raíz con empatía y compañerismo, elevando la calidad de todo el equipo sin humillar ni sobrecargarse en silencio."
  },
  {
    id: "js-13",
    tema: "Verificación de identidad en sucursal",
    situacion: "Un empresario muy reconocido en la zona solicita retirar una chequera corporativa, pero olvidó su cédula en el vehículo y te dice molesto: «Todo el mundo aquí sabe quién soy yo; entrégamela ahora mismo».",
    opciones: [
      "Entregársela excepcionalmente para evitar que publique una queja o cierre sus cuentas.",
      "Mantener un trato sumamente cortés y respetuoso, explicándole que por protección de sus propias cuentas el sistema y la normativa exigen validar el documento original sin excepciones, ofreciéndole prioridad apenas lo tenga a mano.",
      "Aceptar una foto borrosa de una fotocopia antigua sin verificar firma.",
      "Discutir con él diciéndole que él no tiene privilegios sobre los demás clientes."
    ],
    correcta: 1,
    explicacion: "Encuadrar el control como una medida de seguridad a favor del propio patrimonio del cliente, con máxima cortesía y firmeza normativa, resuelve la tensión sin vulnerar el protocolo."
  },
  {
    id: "js-14",
    tema: "Ética comercial y metas de ventas",
    situacion: "A dos días de cerrar el mes te faltan dos seguros opcionales para ganar el bono trimestral. Un cliente adulto mayor viene a abrir una cuenta básica de ahorros para cobrar su pensión.",
    opciones: [
      "Incluirle el cargo mensual del seguro dentro del paquete diciendo que es «obligatorio para abrir la cuenta».",
      "Explicarle con total claridad y transparencia las características de la cuenta básica solicitada y, si le ofreces algún producto adicional, detallar honestamente su costo y carácter voluntario.",
      "Activar el seguro gratis el primer mes sin informarle esperando que luego no revise el estado de cuenta.",
      "Negarte a abrirle la cuenta básica porque no aporta comisión a tu meta del mes."
    ],
    correcta: 1,
    explicacion: "La venta atada engañosa o sin consentimiento informado viola los derechos del usuario financiero (ProUsuario / Ley Monetaria y Financiera) y acarrea sanciones severas y pérdida de confianza."
  },
  {
    id: "js-15",
    tema: "Manejo de documentos confidenciales (escritorio limpio)",
    situacion: "Al terminar tu jornada notas en la bandeja de la impresora común tres estados financieros detallados y copias de cédulas que otro oficial imprimió y olvidó recoger.",
    opciones: [
      "Dejarlos ahí toda la noche porque no fuiste tú quien los mandó a imprimir.",
      "Tirarlos directamente al zafacón abierto del pasillo para despejar la impresora.",
      "Recogerlos y resguardarlos bajo llave o entregarlos al supervisor/propietario según la política de escritorio limpio, o triturarlos si son descartes autorizados.",
      "Llevártelos a tu casa para devolverlos mañana temprano."
    ],
    correcta: 2,
    explicacion: "La política de pantalla y escritorio limpios exige proteger activamente los datos personales y financieros dentro de las instalaciones, nunca dejarlos expuestos al personal externo de limpieza ni desecharlos sin triturar."
  },
  {
    id: "js-16",
    tema: "Compromisos realistas con clientes internos",
    situacion: "El gerente de Mercadeo te pide un cruce complejo de base de datos para dentro de una hora, pero sabes técnicamente que limpiar y validar las cifras tomará al menos tres horas.",
    opciones: [
      "Decirle que sí estará en una hora y entregarle cifras sin validar para cumplir con el reloj.",
      "Prometerlo en una hora y simplemente dejar de contestarle el teléfono cuando llegue el plazo.",
      "Explicarle de inmediato el tiempo real necesario (tres horas) para garantizar datos exactos y ofrecerle un avance preliminar verificado de los indicadores principales si le resulta útil.",
      "Rechazar la solicitud diciendo que tu área no trabaja urgencias de otros departamentos."
    ],
    correcta: 2,
    explicacion: "Gestionar expectativas con transparencia temprana y proponer alternativas viables evita entregar datos erróneos y construye credibilidad interdepartamental."
  },
  {
    id: "js-17",
    tema: "Prevención de fraude interno",
    situacion: "Observas de forma reiterada que un compañero modifica temporalmente el teléfono de contacto de cuentas inactivas justo antes de emitir tarjetas de reposición y luego lo revierte.",
    opciones: [
      "Ignorarlo por completo para no meterte en problemas con un colega antiguo.",
      "Preguntarle directamente frente a toda la oficina si está cometiendo un fraude.",
      "Reportar los hechos observados de manera objetiva y confidencial a través del canal ético, Auditoría Interna o Seguridad Bancaria, sin alterar evidencias ni alertar al involucrado.",
      "Comentar el rumor en el grupo de chat informal de los empleados."
    ],
    correcta: 2,
    explicacion: "Alterar datos de cuentas dormidas o inactivas es un patrón crítico de fraude interno. Debe canalizarse exclusivamente por las vías formales de denuncia ética/auditoría con reserva absoluta."
  },
  {
    id: "js-18",
    tema: "Desacuerdo técnico en reunión",
    situacion: "Durante una reunión de comité, tu supervisor presenta de buena fe un dato estadístico desactualizado que podría llevar a abrir un turno extra innecesario.",
    opciones: [
      "Interrumpirlo bruscamente diciendo: «Eso está mal, usted leyó el cuadro equivocado».",
      "Quedarte callado para no contradecirlo aunque se tome una mala decisión costosa.",
      "Pedir la palabra con respeto y aportar el dato actualizado con tacto constructivo («Para complementar ese punto, en el corte actualizado de esta mañana observamos que la cifra cerró en…»).",
      "Enviar un mensaje burlón a otro compañero que está sentado en la misma mesa."
    ],
    correcta: 2,
    explicacion: "La comunicación asertiva aporta precisión técnica cuidando siempre la forma y el respeto hacia los demás miembros del equipo."
  },
  {
    id: "js-19",
    tema: "Uso responsable de recursos y activos",
    situacion: "Un amigo que está montando su negocio propio te pide instalar en tu computadora portátil corporativa un programa descargado sin licencia para hacerle un favor el fin de semana.",
    opciones: [
      "Instalarlo el sábado y desinstalarlo el domingo por la noche antes de conectarte a la red del banco.",
      "Explicarle que el equipo corporativo es de uso estrictamente laboral y que instalar software no autorizado expone la red a código malicioso e infringe las políticas de seguridad.",
      "Desactivar el antivirus institucional por dos horas para que el programa corra sin alertas.",
      "Usar el correo del banco para enviarle los archivos pesados del negocio particular."
    ],
    correcta: 1,
    explicacion: "El software sin licencia en estaciones corporativas representa uno de los principales vectores de *ransomware* y fuga de datos, además de violar derechos de autor y normas de uso aceptable."
  },
  {
    id: "js-20",
    tema: "Empatía e inclusión en el servicio",
    situacion: "Atiendes en plataforma a un cliente con discapacidad auditiva que intenta explicarte mediante notas escritas una duda sobre las comisiones de su cuenta.",
    opciones: [
      "Hablarle muy fuerte y rápido asumiendo que así te entenderá mejor.",
      "Pedirle que regrese otro día acompañado de un familiar que hable por él.",
      "Adaptar la comunicación con total respeto y paciencia, escribiendo de forma clara y estructurada o apoyándote en los recursos accesibles de la institución hasta resolver todas sus dudas.",
      "Entregarle un folleto genérico sin responder su consulta específica para despacharlo pronto."
    ],
    correcta: 2,
    explicacion: "La excelencia e inclusión en el servicio financiero garantizan atención digna, autónoma y clara a todas las personas, adaptando el canal a su necesidad."
  },
  {
    id: "js-21",
    tema: "Documentación incompleta bajo presión comercial",
    situacion: "Un promotor inmobiliario pide desembolsar hoy mismo un préstamo hipotecario prometiendo traer «mañana sin falta» la certificación original de cargas y gravámenes del inmueble.",
    opciones: [
      "Autorizar el desembolso con ese compromiso verbal porque es viernes y el promotor tiene buena reputación.",
      "Mantener el requisito documental previo al desembolso conforme a la política de crédito y riesgo legal, coordinando agilizar la firma tan pronto ingrese la certificación original.",
      "Falsificar temporalmente la marca de «documento recibido» en la lista de chequeo del sistema.",
      "Desembolsar la mitad del préstamo hoy sin garantía inscrita."
    ],
    correcta: 1,
    explicacion: "Desembolsar sin el sustento registral de la garantía expone al banco a un riesgo legal y patrimonial gravísimo; ningún compromiso verbal sustituye un requisito precedente obligatorio."
  },
  {
    id: "js-22",
    tema: "Redes sociales y reputación institucional",
    situacion: "Hubo una caída temporal del sistema interno esta mañana y en una red social lees comentarios de usuarios preguntando qué pasó en el banco.",
    opciones: [
      "Responder desde tu cuenta personal dando detalles técnicos internos de qué servidor falló.",
      "Discutir con los usuarios molestos diciéndoles que exageran por veinte minutos de espera.",
      "Abstenerte de emitir declaraciones no autorizadas o revelar arquitectura interna y remitir cualquier tendencia relevante al equipo oficial de Comunicaciones/Redes.",
      "Subir una foto de tu pantalla de trabajo con mensajes de error para demostrar que están trabajando."
    ],
    correcta: 2,
    explicacion: "Solo los voceros y canales oficiales están facultados para comunicar incidencias; publicar pantallas internas o detalles de infraestructura compromete la seguridad y la reputación institucional."
  },
  {
    id: "js-23",
    tema: "Cumplimiento regulatorio en cobros",
    situacion: "Gestionas una cartera de cobros preventivos y no logras localizar a un titular con quince días de atraso, pero tienes el teléfono de la recepción general de la empresa donde trabaja.",
    opciones: [
      "Llamar a la recepcionista y decirle el monto exacto de la deuda atrasada para que sienta presión y devuelva la llamada.",
      "Dejar únicamente un mensaje discreto y cortés con tu nombre y número de contacto sin revelar a terceros la existencia ni el detalle de la deuda, respetando el horario legal de gestión.",
      "Enviar correos masivos a los compañeros de su oficina cobrándole la cuota.",
      "Llamar a su domicilio a las 11:30 p. m. para asegurarte de encontrarlo."
    ],
    correcta: 1,
    explicacion: "Las normativas de protección al usuario y privacidad en RD prohíben divulgar deudas a terceros o emplear prácticas intimidatorias o fuera de horario permitido."
  },
  {
    id: "js-24",
    tema: "Continuidad operativa y rotación",
    situacion: "Has sido promovido a otra área del banco a partir del próximo lunes y tienes a tu cargo conciliaciones mensuales con pasos particulares que solo tú manejas hasta ahora.",
    opciones: [
      "Guardarte tus plantillas para seguir siendo indispensable y que tengan que consultarte siempre.",
      "Dejar una guía paso a paso documentada, ordenar las carpetas de soporte y realizar una sesión práctica de entrega con tu relevo y supervisor antes del traslado.",
      "Entregar únicamente las carpetas sin explicar nada porque ya no será tu responsabilidad.",
      "Borrar los correos históricos del buzón operativo antes de mudarte de escritorio."
    ],
    correcta: 1,
    explicacion: "Documentar procesos y hacer una transición ordenada demuestra liderazgo profesional, madurez institucional y mitigación de riesgo operativo."
  },
  {
    id: "js-25",
    tema: "Revisión de firmas y poderes vencidos",
    situacion: "El mensajero de una empresa cliente trae una carta de transferencia urgente firmada por el gerente administrativo, pero al consultar el registro notas que la asamblea que le otorgaba poder venció hace dos meses.",
    opciones: [
      "Procesar la transferencia porque es la misma firma de siempre y luego pedir el acta renovada.",
      "Detener la ejecución, contactar de inmediato a los titulares facultados de la empresa para informar el vencimiento del poder y explicar cómo actualizar la documentación societaria.",
      "Tachar la fecha vencida en la ficha del sistema para que deje pasar la instrucción.",
      "Romper la carta frente al mensajero sin dar explicación alguna."
    ],
    correcta: 1,
    explicacion: "Ejecutar órdenes con poderes societarios vencidos carece de validez jurídica y puede hacer responsable al banco frente a la sociedad comercial si dicho funcionario ya había sido revocado."
  },
  {
    id: "js-26",
    tema: "Recepción de billetes presuntamente falsos",
    situacion: "Durante un depósito en ventanilla detectas mediante las medidas de seguridad y el detector ultravioleta dos billetes de RD$ 2,000.00 con claras características de falsificación.",
    opciones: [
      "Devolvérselos al cliente pidiéndole en voz baja que los cambie por otros dos billetes buenos.",
      "Aceptarlos para no generar una discusión con el cliente y descontarlos de tu propio sueldo.",
      "Aplicar con serenidad el protocolo regulatorio establecido (retención preventiva con acta/recibo oficial sin acusar personalmente al portador y notificación al supervisor).",
      "Llamar a gritos a seguridad señalando al cliente como falsificador frente a toda la fila."
    ],
    correcta: 2,
    explicacion: "Las entidades de intermediación financiera tienen protocolos regulatorios estrictos del Banco Central para billetes presuntamente falsos, que exigen trato respetuoso, levantamiento de acta y no devolver la pieza a circulación."
  },
  {
    id: "js-27",
    tema: "Retroalimentación y mejora continua",
    situacion: "En tu evaluación semestral tu supervisora valora muy bien tu exactitud técnica, pero te señala como oportunidad de mejora que tus correos a otras áreas suelen sonar demasiado secos o cortantes.",
    opciones: [
      "Defenderte diciendo que tú estás contratado para cuadrar números y no para escribir cartas adornadas.",
      "Agradecer la observación con apertura, pedir un ejemplo concreto para calibrar mejor el tono e incorporar saludos y conectores cordiales en tus comunicaciones diarias.",
      "Dejar de enviar correos y comunicar todo únicamente de forma verbal sin dejar respaldo.",
      "Pedir traslado inmediato de departamento por sentirte incomprendido."
    ],
    correcta: 1,
    explicacion: "La receptividad ante la retroalimentación (*coachability*) es una de las competencias blandas más apreciadas en procesos de admisión y ascenso corporativo."
  },
  {
    id: "js-28",
    tema: "Prevención de lavado: cliente PEP / debida diligencia",
    situacion: "Al vincular a un nuevo cliente identificas que desempeña un alto cargo público (Persona Expuesta Políticamente — PEP). El cliente pregunta por qué su apertura requiere un formulario adicional y aprobación de alta gerencia.",
    opciones: [
      "Disculparte diciendo que es una traba absurda del departamento de Cumplimiento.",
      "Omitir marcar la casilla PEP en el sistema para abrirle la cuenta en cinco minutos como cliente estándar.",
      "Explicarle con naturalidad y profesionalismo que es un procedimiento regulatorio estándar exigido por la normativa nacional para todos los funcionarios de alto nivel, acompañándolo amablemente en el llenado.",
      "Rechazar la apertura de plano porque ningún funcionario público puede tener cuentas bancarias."
    ],
    correcta: 2,
    explicacion: "Ser PEP no impide ser cliente bancario, sino que exige Debida Diligencia Ampliada y aprobación de alta gerencia por ley. Explicarlo con cortesía institucional y cumplir cada paso es la actuación impecable."
  }
];

/* =========================================================
   Guía de Entrevista en Bancos y Empresas (Método STAR)
   ========================================================= */
var GUIA_ENTREVISTA = {
  metodoStar: [
    { letra: "S", titulo: "Situación", detalle: "Describe en 1 o 2 frases el contexto real (dónde trabajabas o estudiabas y qué reto ocurría)." },
    { letra: "T", titulo: "Tarea", detalle: "Explica cuál era tu responsabilidad concreta, meta o estándar de calidad que debías cumplir." },
    { letra: "A", titulo: "Acción", detalle: "Detalla en primera persona («yo revisé, yo propuse, yo organicé») los pasos éticos y metódicos que ejecutaste." },
    { letra: "R", titulo: "Resultado", detalle: "Cierra con el logro medible o aprendizaje concreto (reducción de errores, cuadre exitoso, cliente satisfecho)." }
  ],
  preguntas: [
    {
      id: "ent-01",
      pregunta: "1. Háblame de ti y por qué te interesa ingresar a nuestra institución financiera.",
      evalua: "Claridad comunicativa, coherencia vocacional y conocimiento real de la empresa.",
      evitar: "Recitar toda tu biografía desde la infancia o decir únicamente «porque necesito un empleo estable».",
      ejemploStar: "«Soy profesional del área administrativa/tecnológica con alta orientación al detalle y al servicio. En mi experiencia reciente gestionando reportes y atención a usuarios logré mantener un 99 % de exactitud documental. Me entusiasma integrarme a esta institución por su solidez en el sistema financiero dominicano, su cultura de ética e innovación digital y la oportunidad de aportar rigor y trato humano desde el primer día»."
    },
    {
      id: "ent-02",
      pregunta: "2. Cuéntame una ocasión en la que detectaste un error importante bajo presión de tiempo.",
      evalua: "Atención al detalle, honestidad operativa y serenidad bajo presión.",
      evitar: "Afirmar «nunca ha habido errores cerca de mí» o culpar despectivamente a tus excompañeros.",
      ejemploStar: "«(S) Durante un cierre mensual debíamos enviar una nómina de 180 registros antes de las 4:00 p. m. (T) Mi tarea era realizar la validación cruzada previa a la carga. (A) A las 3:20 p. m. noté que dos cuentas tenían un dígito invertido; informé de inmediato a mi supervisora, cotejé los soportes originales y dejé una fórmula de verificación automática en la plantilla. (R) El lote salió a las 3:50 p. m. con cero rechazos bancarios»."
    },
    {
      id: "ent-03",
      pregunta: "3. ¿Cómo manejaste a un cliente o usuario muy molesto?",
      evalua: "Inteligencia emocional, escucha activa y apego a normas sin perder la cortesía.",
      evitar: "Relatar que discutiste con el cliente o que rompiste una regla de la empresa para complacerlo.",
      ejemploStar: "«(S) Un cliente llegó muy alterado porque su orden figuraba retenida por falta de un documento. (T) Debía calmar la situación sin vulnerar el control documental. (A) Lo invité a tomar asiento, lo escuché sin interrumpir validando su urgencia, revisé su historial y le ofrecí recibir el documento en PDF por el correo institucional en ese mismo instante para procesarlo con prioridad. (R) En quince minutos completó el requisito, se resolvió su trámite y agradeció la atención recibida»."
    },
    {
      id: "ent-04",
      pregunta: "4. ¿Qué harías si tu jefe o un compañero antiguo te pide saltarte un control menor «solo por hoy»?",
      evalua: "Integridad ética, firmeza respetuosa y conciencia de riesgo regulatorio.",
      evitar: "Decir «yo obedezco todo lo que diga mi jefe sin cuestionar» o responder con soberbia agresiva.",
      ejemploStar: "«Mantendría una postura respetuosa pero firme apegada a la política institucional. Le explicaría con cortesía que, por trazabilidad y seguridad tanto para él como para el banco, no puedo omitir la validación establecida, y buscaría de inmediato la vía formal de excepción autorizada si el caso realmente es una urgencia contemplada en el manual»."
    },
    {
      id: "ent-05",
      pregunta: "5. ¿Cuál consideras que es tu principal fortaleza y tu principal oportunidad de mejora?",
      evalua: "Autoconocimiento realista, humildad profesional y plan activo de mejora.",
      evitar: "Usar el cliché falso «soy demasiado perfeccionista» o confesar una debilidad crítica para el puesto («soy muy impuntual y olvidadizo»).",
      ejemploStar: "«Mi mayor fortaleza es la disciplina metódica: verifico mis entregables y cumplo plazos con consistencia. Como oportunidad de mejora, antes me costaba delegar o pedir apoyo temprano cuando se acumulaban varias solicitudes; hoy utilizo bloques de prioridad diarios y comunico avances a tiempo al equipo para equilibrar mejor la carga»."
    },
    {
      id: "ent-06",
      pregunta: "6. Describe un momento en que tuviste que aprender un sistema o procedimiento nuevo en pocos días.",
      evalua: "Agilidad de aprendizaje (apertura) y autonomía responsable.",
      evitar: "Quejarte de que en tu trabajo anterior no daban buena capacitación.",
      ejemploStar: "«(S) En mi anterior pasantía migraron el sistema de tickets un lunes de alta demanda. (T) Debía atender consultas sin retrasar los tiempos de respuesta. (A) Tomé notas estructuradas durante la demostración, practiqué en el entorno de prueba durante treinta minutos y armé una guía rápida de atajos que compartí con tres compañeros. (R) Al tercer día ya operábamos al 100 % del ritmo habitual sin incidencias»."
    },
    {
      id: "ent-07",
      pregunta: "7. ¿Cómo reaccionas cuando realizas tareas repetitivas que exigen máxima concentración?",
      evalua: "Estabilidad (S) y Cumplimiento (C) para puestos operativos, contables, caja o QA.",
      evitar: "Decir que te aburres rápido y pierdes el foco con las rutinas.",
      ejemploStar: "«Entiendo que en banca cada registro repetitivo representa el patrimonio real de un cliente. Para mantener la concentración alta, divido el trabajo en lotes controlados, aplico listas de verificación visual en campos críticos (cédula, RNC, monto y moneda) y hago pausas breves de vista cada cierto bloque para sostener cero errores hasta el cierre»."
    },
    {
      id: "ent-08",
      pregunta: "8. Cuéntame de una ocasión en que trabajaste con alguien de estilo muy diferente al tuyo.",
      evalua: "Cooperación interdepartamental, madurez y adaptabilidad.",
      evitar: "Hablar mal de colegas anteriores o mostrarte inflexible.",
      ejemploStar: "«(S) En un proyecto conjunto trabajé con un compañero muy rápido e intuitivo, mientras yo soy más estructurado. (T) Debíamos entregar una propuesta comercial sin errores en tres días. (A) Acordamos aprovechar lo mejor de ambos: él lideró el contacto ágil y las ideas iniciales, y yo estructuré el presupuesto y el control de calidad ortográfico y numérico. (R) Entregamos antes del plazo y la gerencia felicitó la solidez del documento»."
    },
    {
      id: "ent-09",
      pregunta: "9. ¿Cómo organizas tu día cuando tienes cinco pendientes urgentes de distintas personas?",
      evalua: "Gestión del tiempo, criterio de riesgo y comunicación ejecutiva.",
      evitar: "Decir que atiendes primero a quien grite más fuerte o por simple orden de llegada sin evaluar impacto.",
      ejemploStar: "«Primero clasifico en dos minutos cada pendiente según su impacto regulatorio/financiero y su hora real de corte. Atiendo de inmediato lo crítico e impostergable, comunico con transparencia la hora estimada de entrega a los demás solicitantes para darles tranquilidad y registro cada avance en una lista de control para no olvidar ningún detalle»."
    },
    {
      id: "ent-10",
      pregunta: "10. ¿Qué significa para ti la confidencialidad bancaria en la vida diaria?",
      evalua: "Conciencia ética y discreción dentro y fuera de la oficina.",
      evitar: "Pensar que no cuenta si solo se lo comentas a tu pareja o familia en casa.",
      ejemploStar: "«Significa custodia absoluta de la confianza del cliente en todo momento: no consultar datos que no requiera mi función, bloquear siempre mi estación al levantarme, resguardar documentos físicos y no comentar nombres, operaciones ni situaciones internas ni siquiera en conversaciones familiares o redes sociales»."
    },
    {
      id: "ent-11",
      pregunta: "11. ¿Dónde te visualizas profesionalmente dentro de tres a cinco años?",
      evalua: "Compromiso de permanencia, ambición sana y alineación con la carrera interna.",
      evitar: "Dar a entender que solo usarás el puesto por tres meses mientras sale otra cosa o pedir el cargo de tu entrevistador mañana.",
      ejemploStar: "«En el primer año mi meta es dominar al 100 % los procesos, sistemas y estándares de calidad del puesto superando los indicadores del área. En un horizonte de tres a cinco años me visualizo consolidado dentro de la institución, asumiendo mayores responsabilidades analíticas o de supervisión y apoyando en la formación de nuevos ingresos»."
    },
    {
      id: "ent-12",
      pregunta: "12. ¿Tienes alguna pregunta para nosotros al cerrar la entrevista?",
      evalua: "Interés genuino, preparación previa y proactividad profesional.",
      evitar: "Decir «no, ninguna» o preguntar únicamente por vacaciones y permisos antes de conocer el rol.",
      ejemploStar: "«Sí, muchas gracias: ¿cuáles serían los dos o tres indicadores clave que definirían un desempeño sobresaliente en este puesto durante los primeros noventa días, y cómo está conformado el equipo con el que colaboraría a diario?»."
    }
  ]
};
