// Contenido de las dinámicas del Taller 4 · Intervención en crisis y evaluación del riesgo
// (IHM · PAIBIM 2026 · C6). Lo comparten las páginas de participantes y las de proyección.

const T4 = {
  base: "https://xgv85.github.io/taller4/",
  canal: "ihm-c6-t4-k7q2m9x4w1",

  inicio: {
    titulo: "¿Quiénes estamos hoy?",
    preguntas: [
      { id: "perfil", tipo: "opcion", texto: "¿Cuál es su perfil?",
        opciones: ["Asesora psicoemocional de Centro LIBRE", "Operadora de la Línea Telefónica", "Otro perfil"] },
      { id: "exp", tipo: "opcion", texto: "¿Cuánto tiempo lleva acompañando a mujeres?",
        opciones: ["Menos de 1 año", "De 1 a 3 años", "De 4 a 6 años", "Más de 6 años"] },
      { id: "crisis", tipo: "opcion", texto: "En el último mes, ¿atendió a alguna mujer en crisis?",
        opciones: ["Sí, varias veces", "Sí, una vez", "No", "No estoy segura"] },
      { id: "municipio", tipo: "texto", texto: "¿Desde qué municipio se conecta hoy?", max: 40,
        ayuda: "Solo el nombre del municipio." },
      { id: "palabra", tipo: "texto", texto: "Con una sola palabra: ¿cómo llega hoy a este taller?", max: 24,
        ayuda: "Por ejemplo: cansada, curiosa, con ganas…" }
    ]
  },

  frases: {
    titulo: "¿Ayuda o daña?",
    lista: [
      { t: "«Gracias por buscarnos. Hizo bien en llamar.»", r: "a",
        c: "Ayuda: reconoce el paso que dio al pedir apoyo." },
      { t: "«¿Y por qué no se ha ido?»", r: "d",
        c: "Daña: la responsabiliza y desconoce lo que hoy la detiene." },
      { t: "«Es comprensible que tenga miedo.»", r: "a",
        c: "Ayuda: valida lo que siente y contribuye a bajar la angustia." },
      { t: "«Si usted no denuncia, no podemos hacer nada.»", r: "d",
        c: "Daña: condiciona la atención. Ella decide si denuncia y cuándo." },
      { t: "«Cálmese, no es para tanto.»", r: "d",
        c: "Daña: minimiza lo que vive y le pide controlar su emoción." },
      { t: "«Lo que le pasó no es su culpa.»", r: "a",
        c: "Ayuda: le cree y no la culpa." },
      { t: "«¿Qué hizo usted para que él se enojara así?»", r: "d",
        c: "Daña: traslada a ella la responsabilidad de la violencia." },
      { t: "«Usted decide qué hacer; aquí la acompañamos.»", r: "a",
        c: "Ayuda: respeta sus decisiones y le ofrece acompañamiento." }
    ]
  },

  caso: {
    titulo: "Un caso: señales de riesgo y plan de seguridad",
    texto: [
      "Llama a la Línea Telefónica una mujer de 34 años. Habla en voz baja: dice que solo tiene unos minutos porque su pareja salió a la tienda.",
      "Cuenta que hace dos meses le dijo que quería separarse. Desde entonces él le revisa el celular, no la deja visitar a su familia y los golpes son cada vez más seguidos.",
      "Anoche le dijo que, si se va, «no va a volver a ver a sus hijos». Él guarda una pistola en el ropero.",
      "Tiene dos hijos, de 6 y 9 años. Su hermana vive en el municipio vecino. Antes de colgar dice: «Tengo miedo de que un día me mate»."
    ],
    aviso: "Caso ficticio, elaborado para este taller.",
    senales: [
      { id: "frec", t: "La violencia es cada vez más frecuente o más grave" },
      { id: "amen", t: "Amenazas de muerte o contra sus hijas e hijos" },
      { id: "arma", t: "El agresor tiene acceso a armas" },
      { id: "sep", t: "Intentó separarse hace poco" },
      { id: "ctrl", t: "Él la vigila, la controla o la aísla" },
      { id: "miedo", t: "Ella dice que teme por su vida" }
    ],
    columnas: [
      { id: "conf", t: "Personas de confianza" },
      { id: "lugar", t: "Un lugar seguro" },
      { id: "doc", t: "Documentos" },
      { id: "num", t: "Números de apoyo" },
      { id: "salida", t: "Salida rápida" }
    ]
  }
};
