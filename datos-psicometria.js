/* =========================================================
   Banco de Pruebas Psicométricas Corporativas y Bancarias RD
   4 exámenes completos × 30 preguntas = 120 preguntas únicas
   Incluye generador propio de figuras SVG (matrices Raven,
   series espaciales, rotaciones, dados y cubos desplegados).
   Sin dependencias externas. Norma RAE (2010).
   ========================================================= */

var CATEGORIAS_PSICO = [
  {
    id: "verbal",
    nombre: "Razonamiento verbal",
    descripcion: "Sinónimos, antónimos, analogías verbales, término excluido y comprensión lectora financiera."
  },
  {
    id: "numerico",
    nombre: "Razonamiento numérico",
    descripcion: "Series numéricas, porcentajes, comisiones, interés simple, divisas RD$/US$ y cuadre de caja. Todo sale a mano, sin calculadora."
  },
  {
    id: "abstracto",
    nombre: "Razonamiento abstracto y espacial",
    descripcion: "Matrices 3×3 tipo Raven, series de figuras, rotaciones, dados (caras opuestas suman 7) y cubos."
  },
  {
    id: "logico",
    nombre: "Razonamiento lógico",
    descripcion: "Silogismos, deducción de orden y posiciones, condicionales y reglas operativas."
  },
  {
    id: "atencion",
    nombre: "Atención y concentración bancaria",
    descripcion: "Comparación exacta de cuentas, cédulas dominicanas, RNC, montos y referencias."
  }
];

/* Generador autónomo de figuras SVG para razonamiento abstracto y espacial */
var FIG_PSICO = (function () {
  "use strict";

  var TINTA = "#0f172a";
  var GRIS = "#94a3b8";
  var PAPEL = "#ffffff";
  var ACENTO = "#059669";
  var FONDO_INC = "#ecfdf5";

  function relleno(f) {
    if (f === "n") return TINTA;
    if (f === "g") return GRIS;
    return PAPEL;
  }

  function fx(v) {
    return Math.round(v * 10) / 10;
  }

  function puntosPoligono(n, r, rot, cx, cy) {
    var p = [];
    for (var i = 0; i < n; i++) {
      var a = ((-90 + rot + (360 * i) / n) * Math.PI) / 180;
      p.push(fx(cx + r * Math.cos(a)) + "," + fx(cy + r * Math.sin(a)));
    }
    return p.join(" ");
  }

  function puntosEstrella(r, cx, cy) {
    var p = [];
    for (var i = 0; i < 10; i++) {
      var rr = i % 2 ? r * 0.45 : r;
      var a = ((-90 + 36 * i) * Math.PI) / 180;
      p.push(fx(cx + rr * Math.cos(a)) + "," + fx(cy + rr * Math.sin(a)));
    }
    return p.join(" ");
  }

  function forma(s, cx, cy, r, f, rot) {
    rot = rot || 0;
    var st = ' fill="' + relleno(f) + '" stroke="' + TINTA + '" stroke-width="2.4" stroke-linejoin="round"';
    if (s === "circulo") return '<circle cx="' + cx + '" cy="' + cy + '" r="' + fx(r) + '"' + st + "/>";
    if (s === "cuadrado") return '<polygon points="' + puntosPoligono(4, r * 1.2, 45 + rot, cx, cy) + '"' + st + "/>";
    if (s === "rombo") return '<polygon points="' + puntosPoligono(4, r * 1.18, rot, cx, cy) + '"' + st + "/>";
    if (s === "triangulo") return '<polygon points="' + puntosPoligono(3, r * 1.22, rot, cx, cy + r * 0.12) + '"' + st + "/>";
    if (s === "estrella") return '<polygon points="' + puntosEstrella(r * 1.15, cx, cy) + '"' + st + "/>";
    if (s === "flecha") {
      var d = "M0,-1 L0.62,-0.08 L0.22,-0.08 L0.22,1 L-0.22,1 L-0.22,-0.08 L-0.62,-0.08 Z";
      return '<path d="' + d + '" transform="translate(' + cx + "," + cy + ") rotate(" + rot + ") scale(" + fx(r) + ')" fill="' +
        relleno(f) + '" stroke="' + TINTA + '" stroke-width="' + (2.4 / r).toFixed(3) + '" stroke-linejoin="round"/>';
    }
    if (typeof s === "number") {
      return '<polygon points="' + puntosPoligono(s, r * 1.12, (s === 4 ? 45 : 0) + rot, cx, cy) + '"' + st + "/>";
    }
    return "";
  }

  var POS = {
    1: [[40, 40]],
    2: [[24, 40], [56, 40]],
    3: [[40, 24], [24, 55], [56, 55]],
    4: [[25, 25], [55, 25], [25, 55], [55, 55]],
    5: [[22, 22], [58, 22], [40, 40], [22, 58], [58, 58]],
    6: [[20, 28], [40, 28], [60, 28], [20, 54], [40, 54], [60, 54]]
  };
  var RADIO = { 1: 21, 2: 13, 3: 11.5, 4: 10.5, 5: 8.8, 6: 7.8 };

  /* Celda de 80x80:
     sp = { s, n, f:'b'|'g'|'n', r, z, lineas:['v','h','d1','d2'],
            cuad:'tl'|'tr'|'br'|'bl' (o array), aguja: grados,
            exterior: formaExterior, letra, m } */
  function contenido(sp) {
    if (!sp) {
      return '<text x="40" y="43" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="38" font-weight="800" fill="' + ACENTO + '">?</text>';
    }
    var out = "";
    if (sp.exterior) {
      out += forma(sp.exterior, 40, 40, 27, "b", sp.rotExt || 0);
    }
    if (sp.lineas) {
      var L = { v: [40, 12, 40, 68], h: [12, 40, 68, 40], d1: [16, 64, 64, 16], d2: [16, 16, 64, 64] };
      sp.lineas.forEach(function (k) {
        var c = L[k];
        out += '<line x1="' + c[0] + '" y1="' + c[1] + '" x2="' + c[2] + '" y2="' + c[3] + '" stroke="' + TINTA + '" stroke-width="3.6" stroke-linecap="round"/>';
      });
    }
    if (sp.cuad) {
      var Q = { tl: [16, 16], tr: [40, 16], br: [40, 40], bl: [16, 40] };
      var lista = Array.isArray(sp.cuad) ? sp.cuad : [sp.cuad];
      out += '<rect x="16" y="16" width="48" height="48" fill="' + PAPEL + '" stroke="' + TINTA + '" stroke-width="2.4"/>';
      lista.forEach(function (q) {
        out += '<rect x="' + Q[q][0] + '" y="' + Q[q][1] + '" width="24" height="24" fill="' + TINTA + '"/>';
      });
      out += '<line x1="40" y1="16" x2="40" y2="64" stroke="' + GRIS + '" stroke-width="1.1"/><line x1="16" y1="40" x2="64" y2="40" stroke="' + GRIS + '" stroke-width="1.1"/>';
      out += '<rect x="16" y="16" width="48" height="48" fill="none" stroke="' + TINTA + '" stroke-width="2.4"/>';
    }
    if (sp.aguja !== undefined) {
      out += '<circle cx="40" cy="40" r="26" fill="' + PAPEL + '" stroke="' + TINTA + '" stroke-width="2.4"/>';
      for (var m = 0; m < 8; m++) {
        var ang = ((m * 45 - 90) * Math.PI) / 180;
        out += '<circle cx="' + fx(40 + 21 * Math.cos(ang)) + '" cy="' + fx(40 + 21 * Math.sin(ang)) + '" r="1.6" fill="' + GRIS + '"/>';
      }
      var rad = ((sp.aguja - 90) * Math.PI) / 180;
      out += '<line x1="40" y1="40" x2="' + fx(40 + 18 * Math.cos(rad)) + '" y2="' + fx(40 + 18 * Math.sin(rad)) + '" stroke="' + TINTA + '" stroke-width="3.2" stroke-linecap="round"/>';
      if (sp.aguja2 !== undefined) {
        var rad2 = ((sp.aguja2 - 90) * Math.PI) / 180;
        out += '<line x1="40" y1="40" x2="' + fx(40 + 12 * Math.cos(rad2)) + '" y2="' + fx(40 + 12 * Math.sin(rad2)) + '" stroke="' + ACENTO + '" stroke-width="2.8" stroke-linecap="round"/>';
      }
      out += '<circle cx="40" cy="40" r="3" fill="' + TINTA + '"/>';
    }
    if (sp.letra) {
      out += '<g transform="translate(40,40) rotate(' + (sp.r || 0) + ") scale(" + (sp.m ? -1 : 1) + ',1)"><text x="0" y="2" text-anchor="middle" dominant-baseline="central" font-family="Georgia, serif" font-size="42" font-weight="700" fill="' + TINTA + '">' + sp.letra + "</text></g>";
    }
    if (sp.s !== undefined) {
      var n = sp.n || 1;
      var r = (sp.exterior ? 11 : RADIO[n]) * (sp.z || 1);
      POS[n].forEach(function (p) {
        out += forma(sp.s, p[0], p[1], r, sp.f, sp.r);
      });
    }
    return out;
  }

  function figura(sp, size) {
    size = size || 78;
    return '<svg class="svg-psico" viewBox="0 0 80 80" width="' + size + '" height="' + size + '" role="img" aria-label="Figura">' +
      '<rect x="1.5" y="1.5" width="77" height="77" rx="10" fill="' + (sp ? PAPEL : FONDO_INC) + '" stroke="' + (sp ? "#cbd5e1" : ACENTO) + '" stroke-width="' + (sp ? "1.6" : "2.2") + '"/>' +
      contenido(sp) + "</svg>";
  }

  function matriz(celdas) {
    var s = '<svg class="svg-psico svg-matriz" viewBox="0 0 256 256" width="246" height="246" role="img" aria-label="Matriz 3 por 3">' +
      '<rect x="1" y="1" width="254" height="254" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>';
    for (var i = 0; i < 9; i++) {
      var x = 8 + (i % 3) * 80;
      var y = 8 + Math.floor(i / 3) * 80;
      s += '<g transform="translate(' + x + "," + y + ')"><rect x="2" y="2" width="76" height="76" rx="8" fill="' +
        (celdas[i] ? PAPEL : FONDO_INC) + '" stroke="' + (celdas[i] ? "#94a3b8" : ACENTO) + '" stroke-width="' + (celdas[i] ? "1.5" : "2.2") + '"/>' +
        contenido(celdas[i]) + "</g>";
    }
    return s + "</svg>";
  }

  function dado(n, size) {
    size = size || 62;
    var P = { tl: [26, 26], tr: [74, 26], ml: [26, 50], mr: [74, 50], c: [50, 50], bl: [26, 74], br: [74, 74] };
    var M = {
      1: ["c"],
      2: ["tr", "bl"],
      3: ["tr", "c", "bl"],
      4: ["tl", "tr", "bl", "br"],
      5: ["tl", "tr", "c", "bl", "br"],
      6: ["tl", "tr", "ml", "mr", "bl", "br"]
    };
    var s = '<svg class="svg-psico svg-dado" viewBox="0 0 100 100" width="' + size + '" height="' + size + '" role="img" aria-label="Dado ' + n + '">' +
      '<rect x="5" y="5" width="90" height="90" rx="16" fill="' + PAPEL + '" stroke="' + TINTA + '" stroke-width="3.8"/>';
    M[n].forEach(function (k) {
      s += '<circle cx="' + P[k][0] + '" cy="' + P[k][1] + '" r="' + (n === 1 ? 11.5 : 8.5) + '" fill="' + (n === 1 ? "#dc2626" : TINTA) + '"/>';
    });
    return s + "</svg>";
  }

  function incognitaDado(size) {
    size = size || 62;
    return '<svg class="svg-psico" viewBox="0 0 100 100" width="' + size + '" height="' + size + '" role="img" aria-label="Incógnita">' +
      '<rect x="5" y="5" width="90" height="90" rx="16" fill="' + FONDO_INC + '" stroke="' + ACENTO + '" stroke-width="3.6" stroke-dasharray="9 6"/>' +
      '<text x="50" y="54" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, sans-serif" font-size="48" font-weight="800" fill="' + ACENTO + '">?</text></svg>';
  }

  function redCubo(celdas) {
    var L = 46, mc = 0, mr = 0;
    celdas.forEach(function (c) {
      mc = Math.max(mc, c[0]);
      mr = Math.max(mr, c[1]);
    });
    var w = (mc + 1) * L + 12, h = (mr + 1) * L + 12;
    var s = '<svg class="svg-psico" viewBox="0 0 ' + w + " " + h + '" width="' + Math.round(w * 1.2) + '" height="' + Math.round(h * 1.2) + '" role="img" aria-label="Desarrollo de cubo">';
    celdas.forEach(function (c) {
      var x = 6 + c[0] * L, y = 6 + c[1] * L;
      s += '<rect x="' + x + '" y="' + y + '" width="' + L + '" height="' + L + '" fill="' + PAPEL + '" stroke="' + TINTA + '" stroke-width="2.2"/>' +
        '<text x="' + (x + L / 2) + '" y="' + (y + L / 2 + 1) + '" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="' + TINTA + '">' + c[2] + "</text>";
    });
    return s + "</svg>";
  }

  function serie(items, sep) {
    var simbolo = sep === undefined ? "→" : sep;
    return '<div class="fila-svg-psico">' + items.join('<span class="sep-svg">' + simbolo + "</span>") + "</div>";
  }

  return {
    figura: figura,
    matriz: matriz,
    dado: dado,
    incognitaDado: incognitaDado,
    redCubo: redCubo,
    serie: serie
  };
})();

var EXAMENES_PSICO = [
  /* =========================================================
     EXAMEN 1: Admisión Bancaria General (30 preguntas · 28 min)
     ========================================================= */
  {
    id: "examen-1",
    titulo: "Simulacro 1 · Admisión Bancaria General",
    subtitulo: "Evaluación integral de ingreso para banca personal, servicio y operaciones",
    minutos: 28,
    preguntas: [
      /* --- VERBAL (6) --- */
      {
        id: "e1-01",
        cat: "verbal",
        enunciado: "Seleccione el SINÓNIMO más preciso del término en mayúsculas en contexto financiero: «El comité destacó la SOLVENCIA de la empresa solicitante».",
        opciones: ["Liquidez y respaldo", "Morosidad", "Volatilidad", "Austeridad"],
        correcta: 0,
        explicacion: "En el ámbito financiero, «solvencia» es la capacidad de respaldar y cumplir puntualmente las obligaciones económicas; se asocia directamente con respaldo y liquidez."
      },
      {
        id: "e1-02",
        cat: "verbal",
        enunciado: "Elija el ANTÓNIMO de la palabra en mayúsculas: «El contrato contiene una cláusula FACULTATIVA sobre abonos extraordinarios».",
        opciones: ["Opcional", "Obligatoria", "Transitoria", "Accesoria"],
        correcta: 1,
        explicacion: "«Facultativo» significa voluntario u opcional; su opuesto exacto en lenguaje jurídico y bancario es «obligatorio»."
      },
      {
        id: "e1-03",
        cat: "verbal",
        enunciado: "Complete la analogía verbal: AUDITORÍA es a CONTROL como CAPACITACIÓN es a:",
        opciones: ["Sanción", "Aprendizaje", "Presupuesto", "Burocracia"],
        correcta: 1,
        explicacion: "Relación de propósito principal: la auditoría tiene como finalidad el control; la capacitación tiene como finalidad el aprendizaje y desarrollo."
      },
      {
        id: "e1-04",
        cat: "verbal",
        enunciado: "Identifique el TÉRMINO EXCLUIDO (la palabra que NO pertenece al mismo campo semántico):",
        opciones: ["Hipoteca", "Pagaré", "Fianza", "Inflación"],
        correcta: 3,
        explicacion: "Hipoteca, pagaré y fianza son instrumentos o garantías de crédito; «inflación» es un fenómeno macroeconómico de alza generalizada de precios."
      },
      {
        id: "e1-05",
        cat: "verbal",
        enunciado: "Comprensión lectora: «Aunque el crecimiento de la cartera de consumo fue moderado en el primer trimestre, la reducción del índice de vencidos elevó la utilidad neta del banco». Según el texto, ¿qué impulsó el aumento en la utilidad neta?",
        opciones: [
          "Una expansión acelerada de préstamos nuevos",
          "La disminución en la proporción de créditos atrasados",
          "El incremento de las comisiones por servicios",
          "El cierre de sucursales menos rentables"
        ],
        correcta: 1,
        explicacion: "El texto afirma explícitamente que «la reducción del índice de vencidos» (menor morosidad o atrasos) fue lo que elevó la utilidad neta, pese al crecimiento moderado."
      },
      {
        id: "e1-06",
        cat: "verbal",
        enunciado: "Complete la analogía: BÓVEDA es a CUSTODIA como CONTRATO es a:",
        opciones: ["Compromiso", "Borrador", "Reclamo", "Archivo"],
        correcta: 0,
        explicacion: "La función esencial de la bóveda es brindar custodia de valores; la función esencial del contrato es formalizar un compromiso jurídico entre las partes."
      },

      /* --- NUMÉRICO (6) --- */
      {
        id: "e1-07",
        cat: "numerico",
        enunciado: "¿Qué número continúa la siguiente serie numérica?: 4, 9, 19, 39, 79, ___",
        opciones: ["149", "158", "159", "161"],
        correcta: 2,
        explicacion: "En cada paso se multiplica por 2 y se suma 1: (4×2)+1 = 9; (9×2)+1 = 19; (19×2)+1 = 39; (39×2)+1 = 79; (79×2)+1 = 159. A mano, sin calculadora: duplica y suma 1 cada vez: 79 + 79 = 158, más 1 = 159."
      },
      {
        id: "e1-08",
        cat: "numerico",
        enunciado: "Un cliente compra US$ 1,250.00 en ventanilla a una tasa de venta de RD$ 59.40 por dólar. ¿Cuántos pesos dominicanos debe entregar exactamente?",
        opciones: ["RD$ 73,750.00", "RD$ 74,250.00", "RD$ 74,500.00", "RD$ 75,150.00"],
        correcta: 1,
        explicacion: "Se multiplica la cantidad en dólares por la tasa de venta: 1,250 × 59.40 = 74,250 pesos dominicanos (RD$ 74,250.00). A mano, sin calculadora: redondea la tasa a 60. 1,250 × 60 = 75,000; como la tasa real es 0.60 menos, resta 1,250 × 0.60 = 750. Queda 75,000 − 750 = 74,250."
      },
      {
        id: "e1-09",
        cat: "numerico",
        enunciado: "Un certificado financiero de RD$ 200,000.00 paga una tasa de interés simple anual del 9 %. ¿Cuánto interés bruto genera al cabo de 8 meses?",
        opciones: ["RD$ 10,800.00", "RD$ 12,000.00", "RD$ 14,400.00", "RD$ 18,000.00"],
        correcta: 1,
        explicacion: "Interés anual = 200,000 × 0.09 = RD$ 18,000. En 8 meses (8/12 = 2/3 de año) genera: 18,000 × (8 / 12) = RD$ 12,000.00. A mano, sin calculadora: el 9 % de 200,000 es 18,000 (9 × 2,000). Ocho meses son dos tercios del año: 18,000 ÷ 3 = 6,000 y 6,000 × 2 = 12,000."
      },
      {
        id: "e1-10",
        cat: "numerico",
        enunciado: "Un cajero inicia su turno con RD$ 50,000.00 de fondo, recibe depósitos en efectivo por RD$ 185,400.00 y paga retiros por RD$ 142,900.00. Al contar su gaveta tiene RD$ 92,300.00. ¿Cuál es el resultado del cuadre?",
        opciones: [
          "Cuadre exacto sin diferencias",
          "Sobrante de RD$ 200.00",
          "Faltante de RD$ 200.00",
          "Faltante de RD$ 300.00"
        ],
        correcta: 2,
        explicacion: "Saldo teórico en caja = 50,000 + 185,400 − 142,900 = RD$ 92,500.00. Como el efectivo físico contado es RD$ 92,300.00, falta RD$ 200.00. A mano, sin calculadora: 50,000 + 185,400 = 235,400; 235,400 − 142,900 = 92,500. Compara con lo contado: 92,500 − 92,300 = 200 que faltan."
      },
      {
        id: "e1-11",
        cat: "numerico",
        enunciado: "Una transferencia empresarial de RD$ 480,000.00 tiene una comisión tarifaria del 0.5 %, pero el cliente goza de un 20 % de descuento sobre dicha comisión. ¿Cuánto paga de comisión?",
        opciones: ["RD$ 1,920.00", "RD$ 2,000.00", "RD$ 2,160.00", "RD$ 2,400.00"],
        correcta: 0,
        explicacion: "Comisión base = 480,000 × 0.005 = RD$ 2,400.00. Aplicando el 20 % de descuento (paga el 80 %): 2,400 × 0.80 = RD$ 1,920.00. A mano, sin calculadora: el 1 % de 480,000 es 4,800, así que el 0.5 % es la mitad: 2,400. El 20 % de 2,400 es 480 (el 10 % es 240, por dos). 2,400 − 480 = 1,920."
      },
      {
        id: "e1-12",
        cat: "numerico",
        enunciado: "De un presupuesto trimestral de RD$ 360,000.00, un departamento asigna 45 % a licencias, 30 % a capacitación y el resto a fondo de imprevistos. ¿Cuánto queda para imprevistos?",
        opciones: ["RD$ 72,000.00", "RD$ 85,000.00", "RD$ 90,000.00", "RD$ 108,000.00"],
        correcta: 2,
        explicacion: "El porcentaje asignado suma 45 % + 30 % = 75 %, por lo que resta un 25 % para imprevistos: 360,000 × 0.25 = RD$ 90,000.00. A mano, sin calculadora: 45 + 30 = 75; sobra el 25 %, que es la cuarta parte: 360,000 ÷ 4 = 90,000."
      },

      /* --- ABSTRACTO Y ESPACIAL CON SVG (6) --- */
      {
        id: "e1-13",
        cat: "abstracto",
        enunciado: "Observe la serie de figuras y determine cuál continúa la secuencia lógica:",
        figuraHtml: FIG_PSICO.serie([
          FIG_PSICO.figura({ s: "flecha", r: 0, f: "b" }, 68),
          FIG_PSICO.figura({ s: "flecha", r: 90, f: "g" }, 68),
          FIG_PSICO.figura({ s: "flecha", r: 180, f: "n" }, 68),
          FIG_PSICO.figura({ s: "flecha", r: 270, f: "b" }, 68),
          FIG_PSICO.figura(null, 68)
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ s: "flecha", r: 0, f: "g" }, 64),
          FIG_PSICO.figura({ s: "flecha", r: 0, f: "n" }, 64),
          FIG_PSICO.figura({ s: "flecha", r: 90, f: "g" }, 64),
          FIG_PSICO.figura({ s: "flecha", r: 180, f: "b" }, 64)
        ],
        correcta: 0,
        explicacion: "La flecha gira 90° en sentido horario en cada paso (0° → 90° → 180° → 270° → vuelve a 0° arriba), mientras que el relleno alterna en ciclo de tres (blanco → gris → negro → blanco → gris)."
      },
      {
        id: "e1-14",
        cat: "abstracto",
        enunciado: "¿Qué figura completa correctamente la matriz 3×3?",
        figuraHtml: FIG_PSICO.matriz([
          { s: "circulo", n: 1, f: "b" }, { s: "circulo", n: 2, f: "g" }, { s: "circulo", n: 3, f: "n" },
          { s: "cuadrado", n: 1, f: "g" }, { s: "cuadrado", n: 2, f: "n" }, { s: "cuadrado", n: 3, f: "b" },
          { s: "triangulo", n: 1, f: "n" }, { s: "triangulo", n: 2, f: "b" }, null
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ s: "triangulo", n: 3, f: "g" }, 64),
          FIG_PSICO.figura({ s: "triangulo", n: 3, f: "n" }, 64),
          FIG_PSICO.figura({ s: "triangulo", n: 2, f: "g" }, 64),
          FIG_PSICO.figura({ s: "cuadrado", n: 3, f: "g" }, 64)
        ],
        correcta: 0,
        explicacion: "Cada fila mantiene la misma figura (fila 3: triángulos), la cantidad aumenta de 1 a 3 de izquierda a derecha (corresponde 3) y en cada fila aparecen los tres rellenos sin repetir (negro, blanco → falta gris)."
      },
      {
        id: "e1-15",
        cat: "abstracto",
        enunciado: "En un dado estándar las caras opuestas siempre suman 7. Si la cara superior de estos dados sigue la serie mostrada, ¿qué valor tendrá la cara INFERIOR (oculta) del quinto dado?",
        figuraHtml: FIG_PSICO.serie([
          FIG_PSICO.dado(1, 56),
          FIG_PSICO.dado(3, 56),
          FIG_PSICO.dado(5, 56),
          FIG_PSICO.dado(1, 56),
          FIG_PSICO.incognitaDado(56)
        ]),
        opciones: ["Cara con 3 puntos", "Cara con 4 puntos", "Cara con 5 puntos", "Cara con 2 puntos"],
        correcta: 1,
        explicacion: "La cara superior sigue el ciclo 1, 3, 5, 1, 3… Por tanto, la cara superior del quinto dado es 3. Como las caras opuestas de un dado estándar suman 7, la cara inferior oculta vale 7 − 3 = 4."
      },
      {
        id: "e1-16",
        cat: "abstracto",
        enunciado: "Al doblar esta plantilla para formar un cubo cerrado, ¿qué letra quedará exactamente en la cara OPUESTA a la letra «B»?",
        figuraHtml: FIG_PSICO.redCubo([
          [1, 0, "A"],
          [0, 1, "B"], [1, 1, "C"], [2, 1, "D"],
          [1, 2, "E"],
          [1, 3, "F"]
        ]),
        opciones: ["La letra D", "La letra E", "La letra F", "La letra A"],
        correcta: 0,
        explicacion: "En un desarrollo en cruz, las caras separadas por una casilla en línea recta quedan opuestas al plegar el cubo: A es opuesta a E, C es opuesta a F, y el ala izquierda B queda opuesta al ala derecha D."
      },
      {
        id: "e1-17",
        cat: "abstracto",
        enunciado: "Observe el desplazamiento del cuadrante oscuro y elija la figura que sigue en la serie:",
        figuraHtml: FIG_PSICO.serie([
          FIG_PSICO.figura({ cuad: "tl" }, 68),
          FIG_PSICO.figura({ cuad: "tr" }, 68),
          FIG_PSICO.figura({ cuad: "br" }, 68),
          FIG_PSICO.figura({ cuad: "bl" }, 68),
          FIG_PSICO.figura(null, 68)
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ cuad: "tr" }, 64),
          FIG_PSICO.figura({ cuad: "tl" }, 64),
          FIG_PSICO.figura({ cuad: "br" }, 64),
          FIG_PSICO.figura({ cuad: ["tl", "br"] }, 64)
        ],
        correcta: 1,
        explicacion: "El cuadro negro recorre las cuatro esquinas en sentido horario (superior izquierda → superior derecha → inferior derecha → inferior izquierda), por lo que en el quinto paso regresa a la esquina superior izquierda."
      },
      {
        id: "e1-18",
        cat: "abstracto",
        enunciado: "Seleccione la opción que completa la lógica de superposición de líneas en la matriz:",
        figuraHtml: FIG_PSICO.matriz([
          { lineas: ["v"] }, { lineas: ["h"] }, { lineas: ["v", "h"] },
          { lineas: ["d1"] }, { lineas: ["d2"] }, { lineas: ["d1", "d2"] },
          { lineas: ["v", "d1"] }, { lineas: ["h"] }, null
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ lineas: ["v", "h", "d1"] }, 64),
          FIG_PSICO.figura({ lineas: ["v", "h", "d2"] }, 64),
          FIG_PSICO.figura({ lineas: ["h", "d1"] }, 64),
          FIG_PSICO.figura({ lineas: ["v", "d1", "d2"] }, 64)
        ],
        correcta: 0,
        explicacion: "En cada fila, la tercera casilla es la unión exacta de los trazos de la primera y la segunda casilla: (vertical + diagonal ascendente) + (horizontal) = vertical + horizontal + diagonal ascendente."
      },

      /* --- LÓGICO (6) --- */
      {
        id: "e1-19",
        cat: "logico",
        enunciado: "Premisa 1: Todos los oficiales de cumplimiento reciben formación anual en prevención de lavado. Premisa 2: Marcos es oficial de cumplimiento. ¿Qué conclusión se deduce necesariamente?",
        opciones: [
          "Solo Marcos recibe formación en prevención de lavado",
          "Marcos recibe formación anual en prevención de lavado",
          "Quien recibe formación anual es oficial de cumplimiento",
          "Marcos imparte la formación anual del banco"
        ],
        correcta: 1,
        explicacion: "Por silogismo categórico universal (Todo A es B; Marcos es A → Marcos es B), se concluye con certeza que Marcos recibe formación anual en prevención de lavado."
      },
      {
        id: "e1-20",
        cat: "logico",
        enunciado: "En la fila de autorizaciones, el expediente de Ana se aprobó antes que el de Bruno, pero después que el de Carla. El de Diego se aprobó antes que el de Carla. ¿Cuál fue el PRIMER expediente aprobado?",
        opciones: ["Ana", "Bruno", "Carla", "Diego"],
        correcta: 3,
        explicacion: "Ordenando cronológicamente: Diego < Carla < Ana < Bruno. Por tanto, el primero en aprobarse fue el expediente de Diego."
      },
      {
        id: "e1-21",
        cat: "logico",
        enunciado: "Política interna: «Si una transferencia supera los US$ 10,000, requiere doble firma». Sabemos que cierta operación NO requirió doble firma. ¿Qué podemos afirmar con seguridad?",
        opciones: [
          "La transferencia fue rechazada por el sistema",
          "La transferencia no superó los US$ 10,000",
          "La transferencia fue en pesos dominicanos",
          "El gerente estaba ausente de la sucursal"
        ],
        correcta: 1,
        explicacion: "Regla lógica Modus Tollens (Si P → Q; no ocurrió Q → no ocurrió P): si hubiera superado los US$ 10,000, habría exigido doble firma; como no la requirió, no superó los US$ 10,000."
      },
      {
        id: "e1-22",
        cat: "logico",
        enunciado: "Cuatro analistas (Elena, Félix, Gabriela y Héctor) ocupan cuatro oficinas contiguas numeradas en fila del 1 al 4. Elena ocupa la oficina 1, Félix ocupa la oficina 4 y Gabriela trabaja exactamente entre las oficinas de Héctor y Félix. ¿En qué oficina está Gabriela?",
        opciones: ["Oficina 1", "Oficina 2", "Oficina 3", "Oficina 4"],
        ordenFijo: true,
        correcta: 2,
        explicacion: "Con Elena en la 1 y Félix en la 4, quedan las oficinas 2 y 3 para Héctor y Gabriela. Para que Gabriela esté exactamente entre Héctor y Félix (4), Héctor debe ocupar la 2 y Gabriela la oficina 3."
      },
      {
        id: "e1-23",
        cat: "logico",
        enunciado: "Ningún cajero temporal tiene llave de bóveda. Algunos empleados de la sucursal Ozama tienen llave de bóveda. Por consiguiente:",
        opciones: [
          "Todos los empleados de Ozama son permanentes",
          "Algunos empleados de la sucursal Ozama no son cajeros temporales",
          "Ningún empleado de Ozama es cajero temporal",
          "Todos los cajeros permanentes tienen llave de bóveda"
        ],
        correcta: 1,
        explicacion: "Quienes sí poseen llave de bóveda en la sucursal Ozama no pueden pertenecer al grupo de cajeros temporales; por tanto, al menos esos empleados de Ozama no son cajeros temporales."
      },
      {
        id: "e1-24",
        cat: "logico",
        enunciado: "Si el comité sesiona el martes, los desembolsos salen el jueves. Si sesiona el miércoles, salen el viernes. Esta semana los desembolsos NO salieron ni jueves ni viernes. Si el comité solo podía sesionar martes, miércoles o lunes, ¿qué día sesionó?",
        opciones: ["Martes", "Miércoles", "Lunes", "No es posible determinarlo"],
        correcta: 2,
        explicacion: "No pudo sesionar martes (habrían salido jueves) ni miércoles (habrían salido viernes). Quedando únicamente lunes dentro de los días hábiles posibles del comité, sesionó el lunes."
      },

      /* --- ATENCIÓN Y CONCENTRACIÓN BANCARIA (6) --- */
      {
        id: "e1-25",
        cat: "atencion",
        enunciado: "Compare la cédula original con las cuatro opciones y elija la que es IDÉNTICA carácter por carácter:\nOriginal:  001-1849207-5",
        opciones: ["001-1849270-5", "001-1894207-5", "001-1849207-5", "001-1849207-6"],
        correcta: 2,
        explicacion: "La opción idéntica es «001-1849207-5»: coincide dígito por dígito con el original. Las demás invierten «07» por «70», invierten «49» por «94» o cambian el dígito verificador final (5 por 6)."
      },
      {
        id: "e1-26",
        cat: "atencion",
        enunciado: "Verifique estos dos registros de transferencia interbancaria:\nRegistro A:  CTA-7900458123  |  RNC 1-01-85429-3  |  RD$ 1,489,320.50\nRegistro B:  CTA-7900458123  |  RNC 1-01-85492-3  |  RD$ 1,489,320.50\n¿Cuál es el resultado de la comparación?",
        opciones: [
          "Son exactamente idénticos en los tres campos",
          "Difieren únicamente en el número de cuenta",
          "Difieren únicamente en el RNC",
          "Difieren tanto en el RNC como en el monto"
        ],
        correcta: 2,
        explicacion: "La cuenta y el monto son idénticos, pero en el RNC se invirtieron dos cifras: «85429» en el Registro A frente a «85492» en el Registro B."
      },
      {
        id: "e1-27",
        cat: "atencion",
        enunciado: "¿Cuál de las siguientes referencias SWIFT / control presenta un ERROR respecto al patrón exacto «BDOMDOSX-2026-88419-QA»?",
        opciones: [
          "BDOMDOSX-2026-88419-QA",
          "BDOMD0SX-2026-88419-QA",
          "Todas son iguales al patrón",
          "Ninguna coincide con el patrón"
        ],
        correcta: 1,
        explicacion: "En la referencia «BDOMD0SX-2026-88419-QA» se sustituyó la letra «O» mayúscula por el número cero «0» (en «D0SX»); la otra referencia sí es idéntica al patrón."
      },
      {
        id: "e1-28",
        cat: "atencion",
        enunciado: "Cuente cuántas veces aparece exactamente el código «402» en la siguiente cadena de auditoría:\n402 - 420 - 402 - 042 - 402 - 4002 - 402 - 420 - 402",
        opciones: ["3 veces", "4 veces", "5 veces", "6 veces"],
        correcta: 2,
        explicacion: "El bloque exacto «402» aparece en las posiciones 1, 3, 5, 7 y 9: un total de 5 veces («4002», «420» y «042» son distintos)."
      },
      {
        id: "e1-29",
        cat: "atencion",
        enunciado: "Identifique la opción que transcribe SIN ERRORES el siguiente cliente y cuenta:\nOriginal:  INVERSIONES DEL CARIBE, S. R. L. — 240-0098716-4",
        opciones: [
          "INVERSIONES DEL CARIBE, S. R. L. — 240-0098761-4",
          "INVERSIONES DEL CARIBE, S. A. S. — 240-0098716-4",
          "INVERSIONES DEL CARIBE, S. R. L. — 240-0098716-4",
          "INVERCIONES DEL CARIBE, S. R. L. — 240-0098716-4"
        ],
        correcta: 2,
        explicacion: "La opción correcta reproduce con exactitud la ortografía («INVERSIONES», con s), el tipo societario («S. R. L.») y el número de cuenta («240-0098716-4»). Las otras cambian «16» por «61», «S. R. L.» por «S. A. S.» o escriben «INVERCIONES»."
      },
      {
        id: "e1-30",
        cat: "atencion",
        enunciado: "Compare las cuatro líneas del arqueo y señale en CUÁNTAS líneas difieren la Columna 1 y la Columna 2:\n1) RD$ 45,890.25   |   RD$ 45,890.25\n2) RD$ 128,340.00  |   RD$ 128,430.00\n3) RD$ 9,755.80    |   RD$ 9,755.80\n4) RD$ 603,110.50  |   RD$ 603,101.50",
        opciones: ["En 1 línea", "En 2 líneas", "En 3 líneas", "En las 4 líneas"],
        correcta: 1,
        explicacion: "Difieren en 2 líneas: la línea 2 (340.00 vs. 430.00) y la línea 4 (110.50 vs. 101.50). Las líneas 1 y 3 son idénticas."
      }
    ]
  },

  /* =========================================================
     EXAMEN 2: Operaciones, Caja y Servicio (30 preguntas · 28 min)
     ========================================================= */
  {
    id: "examen-2",
    titulo: "Simulacro 2 · Operaciones, Caja y Servicio",
    subtitulo: "Enfoque en rapidez numérica, precisión documental y análisis espacial",
    minutos: 28,
    preguntas: [
      /* --- VERBAL (6) --- */
      {
        id: "e2-01",
        cat: "verbal",
        enunciado: "Seleccione el SINÓNIMO más adecuado de PRORROGAR en un contrato crediticio:",
        opciones: ["Rescindir", "Aplazar o extender", "Condonar", "Subastar"],
        correcta: 1,
        explicacion: "«Prorrogar» significa extender o continuar un plazo determinado antes o al momento de su vencimiento."
      },
      {
        id: "e2-02",
        cat: "verbal",
        enunciado: "Elija el ANTÓNIMO de CONFIDENCIAL en el manejo de expedientes bancarios:",
        opciones: ["Reservado", "Público", "Restringido", "Encriptado"],
        correcta: 1,
        explicacion: "«Confidencial» alude a lo que se mantiene en reserva estricta; su antónimo directo es «público»."
      },
      {
        id: "e2-03",
        cat: "verbal",
        enunciado: "Complete la analogía: ENDOSO es a CHEQUE como CLÁUSULA es a:",
        opciones: ["Contrato", "Moneda", "Ventanilla", "Bóveda"],
        correcta: 0,
        explicacion: "El endoso es una anotación jurídica propia de un cheque, del mismo modo que una cláusula es una estipulación propia de un contrato."
      },
      {
        id: "e2-04",
        cat: "verbal",
        enunciado: "Identifique el TÉRMINO EXCLUIDO dentro del grupo de conceptos de atención al cliente:",
        opciones: ["Empatía", "Diligencia", "Cortesía", "Negligencia"],
        correcta: 3,
        explicacion: "Empatía, diligencia y cortesía son cualidades positivas del servicio; «negligencia» (descuido o falta de cuidado) es el defecto opuesto."
      },
      {
        id: "e2-05",
        cat: "verbal",
        enunciado: "Comprensión lectora: «Ninguna reclamación por cargos no reconocidos procede sin validación biométrica o formulario firmado, salvo aquellos bloqueos preventivos generados automáticamente por el motor antifraude». ¿En qué caso NO se exige validación biométrica ni formulario inicial?",
        opciones: [
          "Cuando el monto reclamado es inferior a RD$ 5,000.00",
          "En bloqueos preventivos originados de forma automática por el sistema antifraude",
          "Cuando el titular llama desde el extranjero",
          "En consumos realizados en supermercados locales"
        ],
        correcta: 1,
        explicacion: "La cláusula «salvo aquellos bloqueos preventivos generados automáticamente por el motor antifraude» establece la única excepción a dicho requisito."
      },
      {
        id: "e2-06",
        cat: "verbal",
        enunciado: "Seleccione el SINÓNIMO de CONCILIAR en contabilidad y operaciones:",
        opciones: ["Cuadrar y compatibilizar", "Diferir", "Fraccionar", "Impugnar"],
        correcta: 0,
        explicacion: "En contabilidad, «conciliar» consiste en contrastar y hacer coincidir dos registros independientes (por ejemplo, libros internos y extracto bancario)."
      },

      /* --- NUMÉRICO (6) --- */
      {
        id: "e2-07",
        cat: "numerico",
        enunciado: "Determine el número que sigue en la sucesión: 120, 115, 105, 90, 70, ___",
        opciones: ["50", "45", "40", "35"],
        correcta: 1,
        explicacion: "Las restas aumentan de 5 en 5 en cada paso: −5, −10, −15, −20; por tanto, sigue restar 25: 70 − 25 = 45. A mano, sin calculadora: anota las restas entre un número y el siguiente (5, 10, 15, 20); la próxima es 25 y 70 − 25 = 45."
      },
      {
        id: "e2-08",
        cat: "numerico",
        enunciado: "Una empresa dispone de RD$ 357,000.00 para comprar dólares estadounidenses cuando la tasa de venta es RD$ 59.50 por US$ 1.00. ¿Cuántos dólares exactos adquiere?",
        opciones: ["US$ 5,800.00", "US$ 5,950.00", "US$ 6,000.00", "US$ 6,050.00"],
        correcta: 2,
        explicacion: "Se divide el monto en pesos entre la tasa de venta: 357,000 ÷ 59.50 = 6,000 dólares exactos (US$ 6,000.00). A mano, sin calculadora: no hace falta dividir; prueba las opciones multiplicando. 6,000 × 59.50 = 6,000 × 60 − 6,000 × 0.50 = 360,000 − 3,000 = 357,000, que es justo el monto disponible."
      },
      {
        id: "e2-09",
        cat: "numerico",
        enunciado: "Un comercio toma un préstamo puente de RD$ 150,000.00 al 16 % de interés simple anual y lo salda por completo a los 6 meses. ¿Cuál es el monto total (capital más intereses) que paga al liquidarlo?",
        opciones: ["RD$ 158,000.00", "RD$ 162,000.00", "RD$ 166,000.00", "RD$ 174,000.00"],
        correcta: 1,
        explicacion: "Interés de 6 meses (medio año) = 150,000 × 0.16 × 0.5 = RD$ 12,000.00. Capital + interés = 150,000 + 12,000 = RD$ 162,000.00. A mano, sin calculadora: 16 % al año es 8 % en medio año. El 1 % de 150,000 es 1,500; por 8 da 12,000. 150,000 + 12,000 = 162,000."
      },
      {
        id: "e2-10",
        cat: "numerico",
        enunciado: "En una remesa de bóveda se reciben 35 billetes de RD$ 2,000, 40 billetes de RD$ 1,000, 28 billetes de RD$ 500 y 15 billetes de RD$ 200. ¿Cuál es el valor total del efectivo?",
        opciones: ["RD$ 125,000.00", "RD$ 127,000.00", "RD$ 129,000.00", "RD$ 131,000.00"],
        correcta: 1,
        explicacion: "Cálculo por denominación: (35×2,000 = 70,000) + (40×1,000 = 40,000) + (28×500 = 14,000) + (15×200 = 3,000) = RD$ 127,000.00. A mano, sin calculadora: multiplica cada grupo por separado y suma al final: 70,000 + 40,000 = 110,000; más 14,000 = 124,000; más 3,000 = 127,000."
      },
      {
        id: "e2-11",
        cat: "numerico",
        enunciado: "La cartera en atraso de una agencia era de RD$ 500,000.00. En enero se redujo en un 20 % y en febrero disminuyó un 10 % adicional sobre el saldo de enero. ¿Cuál es el saldo resultante?",
        opciones: ["RD$ 350,000.00", "RD$ 360,000.00", "RD$ 370,000.00", "RD$ 380,000.00"],
        correcta: 1,
        explicacion: "Tras enero queda el 80 %: 500,000 × 0.80 = RD$ 400,000.00. En febrero queda el 90 % de ese monto: 400,000 × 0.90 = RD$ 360,000.00 (no se suman directamente los porcentajes). A mano, sin calculadora: el 20 % de 500,000 es 100,000 y quedan 400,000. El 10 % de 400,000 es 40,000 y quedan 360,000."
      },
      {
        id: "e2-12",
        cat: "numerico",
        enunciado: "Si 4 oficiales de caja procesan 160 depósitos empresariales en 2 horas trabajando al mismo ritmo, ¿cuántos depósitos procesarán 6 oficiales en 3 horas?",
        opciones: ["280 depósitos", "320 depósitos", "360 depósitos", "400 depósitos"],
        correcta: 2,
        explicacion: "Cada oficial procesa 160 ÷ (4 × 2) = 20 depósitos por hora. Con 6 oficiales durante 3 horas: 20 × 6 × 3 = 360 depósitos. A mano, sin calculadora: llévalo a «un oficial en una hora»: 160 ÷ 4 = 40 por oficial en 2 horas; 40 ÷ 2 = 20 por hora. Luego 20 × 6 = 120 por hora y 120 × 3 = 360."
      },

      /* --- ABSTRACTO Y ESPACIAL CON SVG (6) --- */
      {
        id: "e2-13",
        cat: "abstracto",
        enunciado: "Observe el avance de la aguja del reloj geométrico y seleccione la posición que continúa la serie:",
        figuraHtml: FIG_PSICO.serie([
          FIG_PSICO.figura({ aguja: 0 }, 68),
          FIG_PSICO.figura({ aguja: 45 }, 68),
          FIG_PSICO.figura({ aguja: 135 }, 68),
          FIG_PSICO.figura({ aguja: 270 }, 68),
          FIG_PSICO.figura(null, 68)
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ aguja: 45 }, 64),
          FIG_PSICO.figura({ aguja: 90 }, 64),
          FIG_PSICO.figura({ aguja: 0 }, 64),
          FIG_PSICO.figura({ aguja: 180 }, 64)
        ],
        correcta: 1,
        explicacion: "La aguja avanza sumando 45°, 90°, 135° y luego 180° en sentido horario: 0° (+45°) → 45° (+90°) → 135° (+135°) → 270° (+180°) → 450° ≡ 90° (apuntando a la derecha)."
      },
      {
        id: "e2-14",
        cat: "abstracto",
        enunciado: "¿Qué figura completa la matriz según el número de lados de los polígonos?",
        figuraHtml: FIG_PSICO.matriz([
          { s: 3, f: "b" }, { s: 4, f: "b" }, { s: 5, f: "b" },
          { s: 4, f: "g" }, { s: 5, f: "g" }, { s: 6, f: "g" },
          { s: 5, f: "n" }, { s: 6, f: "n" }, null
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ s: 7, f: "n" }, 64),
          FIG_PSICO.figura({ s: 6, f: "g" }, 64),
          FIG_PSICO.figura({ s: 8, f: "n" }, 64),
          FIG_PSICO.figura({ s: 7, f: "g" }, 64)
        ],
        correcta: 0,
        explicacion: "En cada fila el número de lados aumenta en +1 hacia la derecha (fila 1: 3, 4, 5; fila 2: 4, 5, 6; fila 3: 5, 6, 7 = heptágono) y toda la tercera fila tiene relleno negro."
      },
      {
        id: "e2-15",
        cat: "abstracto",
        enunciado: "Se apilan dos dados estándar (caras opuestas suman 7) uno encima del otro. Si la cara superior visible del dado de arriba muestra 2 puntos y la cara superior del dado de abajo muestra 6 puntos, ¿cuánto suman las DOS caras inferiores ocultas de ambos dados?",
        figuraHtml: FIG_PSICO.serie([FIG_PSICO.dado(2, 62), FIG_PSICO.dado(6, 62)], "+"),
        opciones: ["5 puntos", "6 puntos", "7 puntos", "8 puntos"],
        correcta: 1,
        explicacion: "En el primer dado, la cara opuesta a 2 es 7 − 2 = 5. En el segundo dado, la cara opuesta a 6 es 7 − 6 = 1. La suma de ambas caras inferiores es 5 + 1 = 6."
      },
      {
        id: "e2-16",
        cat: "abstracto",
        enunciado: "Al armar este cubo desplegado en escalera, ¿qué número quedará en la cara OPUESTA al número «2»?",
        figuraHtml: FIG_PSICO.redCubo([
          [0, 0, "1"], [1, 0, "2"],
          [1, 1, "3"], [2, 1, "4"],
          [2, 2, "5"], [3, 2, "6"]
        ]),
        opciones: ["El número 4", "El número 5", "El número 6", "El número 1"],
        correcta: 1,
        explicacion: "En un desarrollo escalonado (2-2-2), cada casilla queda opuesta a la que se ubica dos pasos en L: 1 es opuesto a 4, 3 es opuesto a 6 y 2 queda exactamente opuesto a 5."
      },
      {
        id: "e2-17",
        cat: "abstracto",
        enunciado: "Identifique cuál de las cuatro opciones corresponde a una ROTACIÓN PLANA (sin reflejo en espejo) de la primera figura:",
        figuraHtml: FIG_PSICO.figura({ letra: "R", r: 0, m: false }, 78),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ letra: "R", r: 90, m: true }, 64),
          FIG_PSICO.figura({ letra: "R", r: 180, m: true }, 64),
          FIG_PSICO.figura({ letra: "R", r: 90, m: false }, 64),
          FIG_PSICO.figura({ letra: "R", r: 0, m: true }, 64)
        ],
        correcta: 2,
        explicacion: "La opción correcta gira la letra «R» exactamente 90° en sentido horario sin invertirla en espejo; las otras tres opciones están reflejadas (son imágenes en espejo) y no se obtienen solo girando la figura."
      },
      {
        id: "e2-18",
        cat: "abstracto",
        enunciado: "Determine la figura que completa la tercera fila de la matriz:",
        figuraHtml: FIG_PSICO.matriz([
          { exterior: "cuadrado", s: "circulo", f: "n" }, { exterior: "circulo", s: "triangulo", f: "b" }, { exterior: "triangulo", s: "cuadrado", f: "g" },
          { exterior: "circulo", s: "cuadrado", f: "g" }, { exterior: "triangulo", s: "circulo", f: "n" }, { exterior: "cuadrado", s: "triangulo", f: "b" },
          { exterior: "triangulo", s: "triangulo", f: "b" }, { exterior: "cuadrado", s: "circulo", f: "g" }, null
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ exterior: "circulo", s: "cuadrado", f: "n" }, 64),
          FIG_PSICO.figura({ exterior: "circulo", s: "triangulo", f: "n" }, 64),
          FIG_PSICO.figura({ exterior: "cuadrado", s: "cuadrado", f: "n" }, 64),
          FIG_PSICO.figura({ exterior: "circulo", s: "cuadrado", f: "b" }, 64)
        ],
        correcta: 0,
        explicacion: "En cada fila aparecen sin repetir las tres formas exteriores (triángulo, cuadrado → falta círculo), las tres formas interiores (triángulo, círculo → falta cuadrado) y los tres rellenos interiores (blanco, gris → falta negro)."
      },

      /* --- LÓGICO (6) --- */
      {
        id: "e2-19",
        cat: "logico",
        enunciado: "Todos los créditos hipotecarios exigen tasación certificada. El préstamo solicitado por la señora Núñez NO exige tasación certificada. ¿Qué se concluye?",
        opciones: [
          "La señora Núñez ya tenía una tasación previa",
          "El préstamo solicitado por la señora Núñez no es un crédito hipotecario",
          "Ningún préstamo del banco exige tasación",
          "El inmueble tiene un valor menor al límite"
        ],
        correcta: 1,
        explicacion: "Si fuera un crédito hipotecario exigiría obligatoriamente tasación certificada; al no exigirla, se deduce con certeza lógica que no es un crédito hipotecario."
      },
      {
        id: "e2-20",
        cat: "logico",
        enunciado: "Cinco sucursales (Naco, Piantini, Ozama, Gazcue y Arroyo Hondo) se ordenan de mayor a menor captación del mes. Piantini superó a Naco; Ozama superó a Gazcue, pero quedó por debajo de Naco; Arroyo Hondo superó a todas las demás. ¿Qué sucursal ocupó el TERCER lugar?",
        opciones: ["Piantini", "Naco", "Ozama", "Gazcue"],
        correcta: 1,
        explicacion: "Orden de mayor a menor captación: 1.° Arroyo Hondo > 2.° Piantini > 3.° Naco > 4.° Ozama > 5.° Gazcue. El tercer lugar corresponde a Naco."
      },
      {
        id: "e2-21",
        cat: "logico",
        enunciado: "Según el protocolo dual, la bóveda se abre si y solo si introducen su clave simultáneamente el subgerente Y el encargado de caja. A las 8:00 a. m. el subgerente introdujo su clave, pero la bóveda NO se abrió. ¿Qué se deduce con certeza?",
        opciones: [
          "El subgerente cambió de sucursal ayer",
          "El encargado de caja no introdujo su clave simultáneamente",
          "La bóveda solo abre los viernes",
          "Ninguno de los dos tenía autorización vigente"
        ],
        correcta: 1,
        explicacion: "Como la apertura ocurre siempre que ambos introducen su clave a la vez («si y solo si A y B»), el hecho de que A la introdujera y no abriera implica necesariamente que B (el encargado de caja) no la introdujo simultáneamente."
      },
      {
        id: "e2-22",
        cat: "logico",
        enunciado: "En una mesa de trabajo hay tres carpetas: una azul, una verde y una gris, que contienen contratos de Seguros, Nómina y Divisas (no necesariamente en ese orden). La carpeta de Seguros no es azul ni gris; la carpeta gris no contiene Divisas. ¿Qué contiene la carpeta azul?",
        opciones: ["Seguros", "Nómina", "Divisas", "No puede saberse"],
        correcta: 2,
        explicacion: "Como Seguros no es azul ni gris, Seguros va en la carpeta verde. Quedan azul y gris para Nómina y Divisas; como la gris no tiene Divisas, la gris contiene Nómina y la azul contiene Divisas."
      },
      {
        id: "e2-23",
        cat: "logico",
        enunciado: "Si ayer fue dos días antes del jueves, ¿qué día de la semana será pasado mañana?",
        opciones: ["Jueves", "Viernes", "Sábado", "Domingo"],
        correcta: 1,
        explicacion: "Dos días antes del jueves es martes; si ayer fue martes, hoy es miércoles. Por tanto, mañana será jueves y pasado mañana será viernes."
      },
      {
        id: "e2-24",
        cat: "logico",
        enunciado: "Algunos clientes corporativos operan en zona franca. Todos los que operan en zona franca facturan en moneda extranjera. En consecuencia:",
        opciones: [
          "Todos los clientes corporativos facturan en moneda extranjera",
          "Algunos clientes corporativos facturan en moneda extranjera",
          "Solo las empresas de zona franca son clientes corporativos",
          "Ningún cliente individual factura en moneda extranjera"
        ],
        correcta: 1,
        explicacion: "El subconjunto de clientes corporativos que opera en zona franca pertenece necesariamente al grupo que factura en moneda extranjera; luego, algunos clientes corporativos facturan en moneda extranjera."
      },

      /* --- ATENCIÓN Y CONCENTRACIÓN BANCARIA (6) --- */
      {
        id: "e2-25",
        cat: "atencion",
        enunciado: "Seleccione la opción que coincide EXACTAMENTE con el código IBAN/referencia regional:\nOriginal:  DO28-BCAR-0000-0001-2948-7503-1190",
        opciones: [
          "DO28-BCAR-0000-0001-2984-7503-1190",
          "DO28-BCAR-0000-0010-2948-7503-1190",
          "DO28-BCAR-0000-0001-2948-7503-1190",
          "DO28-BCRA-0000-0001-2948-7503-1190"
        ],
        correcta: 2,
        explicacion: "Solo la opción correcta respeta todos los bloques. Las otras alteran «2948» (escriben «2984»), «0001» (escriben «0010») o «BCAR» (escriben «BCRA»)."
      },
      {
        id: "e2-26",
        cat: "atencion",
        enunciado: "Compare los dos comprobantes de depósito:\nComprobante 1:  Céd. 402-2761904-8  |  Suc. 014  |  US$ 18,750.45\nComprobante 2:  Céd. 402-2761904-8  |  Suc. 014  |  US$ 18,750.54\n¿Dónde radica la diferencia?",
        opciones: [
          "En los centavos del monto en dólares",
          "En el código de la sucursal",
          "En el número de cédula",
          "No existe ninguna diferencia"
        ],
        correcta: 0,
        explicacion: "La cédula y la sucursal son idénticas, pero los centavos cambiaron de «.45» a «.54»."
      },
      {
        id: "e2-27",
        cat: "atencion",
        enunciado: "Tres de las siguientes líneas de póliza coinciden con el patrón «POL-VH-2026-9903418-RD» y UNA difiere:\nLínea 1: POL-VH-2026-9903418-RD\nLínea 2: POL-VH-2026-9903418-RD\nLínea 3: POL-VH-2026-9903148-RD\nLínea 4: POL-VH-2026-9903418-RD\n¿En cuál línea está el error?",
        opciones: ["En la Línea 1", "En la Línea 2", "En la Línea 3", "En la Línea 4"],
        ordenFijo: true,
        correcta: 2,
        explicacion: "En la Línea 3 aparece «9903148» en vez de «9903418» (se invirtieron los dígitos 4 y 1)."
      },
      {
        id: "e2-28",
        cat: "atencion",
        enunciado: "En la siguiente lista de lotes ACH, ¿cuántos códigos terminan en «-09» Y empiezan con «L8»?\nL8-441-09  |  L3-441-09  |  L8-502-90  |  L8-719-09  |  L8-104-09  |  L6-880-09",
        opciones: ["2 códigos", "3 códigos", "4 códigos", "5 códigos"],
        correcta: 1,
        explicacion: "Cumplen ambas condiciones simultáneamente tres códigos: «L8-441-09», «L8-719-09» y «L8-104-09»."
      },
      {
        id: "e2-29",
        cat: "atencion",
        enunciado: "Identifique la transcripción exacta de este beneficiario y RNC:\nOriginal:  CONSTRUCTORA HENRÍQUEZ UREÑA, S. A. — RNC 1-30-74629-2",
        opciones: [
          "CONSTRUCTORA ENRÍQUEZ UREÑA, S. A. — RNC 1-30-74629-2",
          "CONSTRUCTORA HENRÍQUEZ UREÑA, S. A. — RNC 1-30-74629-2",
          "CONSTRUCTORA HENRÍQUEZ UREÑA, S. A. — RNC 1-30-76429-2",
          "CONSTRUCTORA HENRIQUEZ UREÑA, S. R. L. — RNC 1-30-74629-2"
        ],
        correcta: 1,
        explicacion: "La opción correcta conserva la «H» y la tilde de «HENRÍQUEZ», las siglas «S. A.» y todos los dígitos del RNC «1-30-74629-2». Las otras omiten la «H», invierten «46» por «64» en el RNC o quitan la tilde y cambian «S. A.» por «S. R. L.»."
      },
      {
        id: "e2-30",
        cat: "atencion",
        enunciado: "Revise estos cuatro pares de claves alfanuméricas e indique cuántos pares son IDÉNTICOS:\nPar 1:  K9mP4x7Q   =   K9mP4x7Q\nPar 2:  T2vB8n1R   =   T2vB8n1R\nPar 3:  W6cL3z5H   =   W6cI3z5H\nPar 4:  F4jD9q2M   =   F4jD9q2M",
        opciones: ["1 par", "2 pares", "3 pares", "4 pares"],
        correcta: 2,
        explicacion: "Son idénticos 3 pares (1, 2 y 4). En el Par 3 cambió la letra «L» mayúscula por «I» mayúscula («W6cL3z5H» vs. «W6cI3z5H»)."
      }
    ]
  },

  /* =========================================================
     EXAMEN 3: Analista Corporativo y Crédito (30 preguntas · 30 min)
     ========================================================= */
  {
    id: "examen-3",
    titulo: "Simulacro 3 · Analista Corporativo y Crédito",
    subtitulo: "Evaluación orientada a análisis financiero, deducción crítica y matrices",
    minutos: 30,
    preguntas: [
      /* --- VERBAL (6) --- */
      {
        id: "e3-01",
        cat: "verbal",
        enunciado: "Seleccione el SINÓNIMO más exacto de AMORTIZAR en el contexto de un préstamo:",
        opciones: [
          "Incrementar el capital adeudado",
          "Extinguir gradualmente una deuda mediante pagos periódicos",
          "Transferir la hipoteca a otro deudor",
          "Suspender el cobro de intereses moratorios"
        ],
        correcta: 1,
        explicacion: "«Amortizar» un pasivo consiste en pagar o reducir progresivamente el capital prestado conforme a un calendario de cuotas."
      },
      {
        id: "e3-02",
        cat: "verbal",
        enunciado: "Elija el ANTÓNIMO de FIDEDIGNO al evaluar estados financieros de un cliente:",
        opciones: ["Auténtico", "Verificable", "Apócrifo o falso", "Auditado"],
        correcta: 2,
        explicacion: "«Fidedigno» significa digno de fe y crédito (veraz, confiable); su opuesto directo es «apócrifo» o falso."
      },
      {
        id: "e3-03",
        cat: "verbal",
        enunciado: "Complete la analogía: TASACIÓN es a INMUEBLE como CALIFICACIÓN es a:",
        opciones: ["Riesgo crediticio", "Escritorio", "Cajero automático", "Valija"],
        correcta: 0,
        explicacion: "La tasación mide y dictamina el valor técnico de un inmueble; la calificación crediticia mide y dictamina el nivel de riesgo crediticio de un deudor."
      },
      {
        id: "e3-04",
        cat: "verbal",
        enunciado: "Identifique el TÉRMINO EXCLUIDO entre los componentes de un estado de resultados:",
        opciones: ["Ingresos por intereses", "Gastos operativos", "Utilidad neta", "Cédula de identidad"],
        correcta: 3,
        explicacion: "Ingresos por intereses, gastos operativos y utilidad neta son partidas contables del estado de resultados; la cédula de identidad es un documento civil."
      },
      {
        id: "e3-05",
        cat: "verbal",
        enunciado: "Comprensión lectora: «Si bien la empresa solicitante exhibe márgenes operativos saludables, su alta concentración de ventas en un único comprador representa una vulnerabilidad que justifica exigir garantías reales adicionales». ¿Por qué el analista recomienda pedir garantías adicionales?",
        opciones: [
          "Porque la empresa tuvo pérdidas operativas el último año",
          "Porque depende excesivamente de un solo cliente para sus ingresos",
          "Porque carece de registros contables formales",
          "Porque solicitó el préstamo en moneda extranjera"
        ],
        correcta: 1,
        explicacion: "El texto señala que la vulnerabilidad proviene de «su alta concentración de ventas en un único comprador», pese a tener buenos márgenes."
      },
      {
        id: "e3-06",
        cat: "verbal",
        enunciado: "Seleccione el SINÓNIMO de CONTINGENCIA en gestión de riesgos empresariales:",
        opciones: ["Certeza absoluta", "Eventualidad o imprevisto", "Rentabilidad fija", "Liquidación"],
        correcta: 1,
        explicacion: "Una «contingencia» es un hecho eventual o riesgo imprevisto que puede ocurrir o no, para el cual se diseñan reservas o planes de respuesta."
      },

      /* --- NUMÉRICO (6) --- */
      {
        id: "e3-07",
        cat: "numerico",
        enunciado: "Halle el término que continúa la serie intercalada: 3, 10, 6, 20, 12, 40, 24, ___",
        opciones: ["48", "60", "80", "96"],
        correcta: 2,
        explicacion: "Hay dos series alternadas que se duplican: en posiciones impares (3, 6, 12, 24) y en posiciones pares (10, 20, 40 → 80). El octavo término es par: 40 × 2 = 80. A mano, sin calculadora: separa los números de los lugares impares (3, 6, 12, 24) de los pares (10, 20, 40). El que falta está en lugar par: 40 × 2 = 80."
      },
      {
        id: "e3-08",
        cat: "numerico",
        enunciado: "La mesa de divisas compra dólares a RD$ 58.60 y los vende el mismo día a RD$ 59.85. ¿Cuál es el margen bruto cambiario al intermediar US$ 8,000.00?",
        opciones: ["RD$ 9,200.00", "RD$ 9,600.00", "RD$ 10,000.00", "RD$ 10,400.00"],
        correcta: 2,
        explicacion: "El diferencial (spread) por cada dólar es 59.85 − 58.60 = RD$ 1.25. En US$ 8,000.00 la ganancia bruta es 8,000 × 1.25 = RD$ 10,000.00. A mano, sin calculadora: 59.85 − 58.60 = 1.25. Multiplicar por 1.25 es sumarle su cuarta parte: 8,000 + 2,000 = 10,000."
      },
      {
        id: "e3-09",
        cat: "numerico",
        enunciado: "Un inversionista coloca RD$ 400,000.00 durante 1 año exacto y recibe RD$ 44,000.00 por concepto de intereses simples brutos. ¿Qué tasa anual devengó su inversión?",
        opciones: ["9.5 % anual", "10.5 % anual", "11 % anual", "12 % anual"],
        correcta: 2,
        explicacion: "Tasa anual = Interés ÷ Capital = 44,000 ÷ 400,000 = 0.11, equivalente al 11 % anual. A mano, sin calculadora: el 1 % de 400,000 es 4,000; 44,000 ÷ 4,000 = 11, o sea 11 %."
      },
      {
        id: "e3-10",
        cat: "numerico",
        enunciado: "La política crediticia fija que la suma de todas las cuotas mensuales de un deudor no supere el 35 % de su ingreso neto. Si un cliente gana RD$ 80,000.00 netos al mes y ya paga una cuota de vehículo de RD$ 9,500.00, ¿cuál es la cuota máxima de un nuevo préstamo que puede asumir?",
        opciones: ["RD$ 17,500.00", "RD$ 18,500.00", "RD$ 19,500.00", "RD$ 28,000.00"],
        correcta: 1,
        explicacion: "Capacidad total de pago = 80,000 × 0.35 = RD$ 28,000.00. Restando la obligación vigente: 28,000 − 9,500 = RD$ 18,500.00 disponibles. A mano, sin calculadora: el 10 % de 80,000 es 8,000; el 30 % es 24,000 y el 5 % es 4,000: 28,000 en total. 28,000 − 9,500 = 18,500."
      },
      {
        id: "e3-11",
        cat: "numerico",
        enunciado: "Un suplidor descuenta una factura corporativa de RD$ 250,000.00 mediante pronto pago con un cargo financiero total del 2.4 %. ¿Qué monto líquido recibe en su cuenta?",
        opciones: ["RD$ 242,000.00", "RD$ 244,000.00", "RD$ 245,200.00", "RD$ 246,000.00"],
        correcta: 1,
        explicacion: "Cargo financiero = 250,000 × 0.024 = RD$ 6,000.00. Monto líquido desembolsado = 250,000 − 6,000 = RD$ 244,000.00. A mano, sin calculadora: el 1 % de 250,000 es 2,500. El 2 % es 5,000 y el 0.4 % es 1,000: 6,000 en total. 250,000 − 6,000 = 244,000."
      },
      {
        id: "e3-12",
        cat: "numerico",
        enunciado: "Los costos de mensajería de una regional pasaron de RD$ 420,000.00 el año anterior a RD$ 483,000.00 este año. ¿Cuál fue el porcentaje exacto de incremento?",
        opciones: ["12 %", "13.5 %", "15 %", "18 %"],
        correcta: 2,
        explicacion: "Aumento absoluto = 483,000 − 420,000 = RD$ 63,000.00. Porcentaje sobre la base inicial: 63,000 ÷ 420,000 = 0.15 = 15 %. A mano, sin calculadora: 483,000 − 420,000 = 63,000. El 10 % de 420,000 es 42,000 y el 5 % es 21,000; juntos dan 63,000, es decir, 15 %."
      },

      /* --- ABSTRACTO Y ESPACIAL CON SVG (6) --- */
      {
        id: "e3-13",
        cat: "abstracto",
        enunciado: "Determine la figura que continúa la serie combinada de cantidad y rotación:",
        figuraHtml: FIG_PSICO.serie([
          FIG_PSICO.figura({ s: "triangulo", n: 1, r: 0, f: "b" }, 68),
          FIG_PSICO.figura({ s: "triangulo", n: 2, r: 180, f: "n" }, 68),
          FIG_PSICO.figura({ s: "triangulo", n: 3, r: 0, f: "b" }, 68),
          FIG_PSICO.figura({ s: "triangulo", n: 4, r: 180, f: "n" }, 68),
          FIG_PSICO.figura(null, 68)
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ s: "triangulo", n: 5, r: 0, f: "b" }, 64),
          FIG_PSICO.figura({ s: "triangulo", n: 5, r: 180, f: "b" }, 64),
          FIG_PSICO.figura({ s: "triangulo", n: 5, r: 0, f: "n" }, 64),
          FIG_PSICO.figura({ s: "triangulo", n: 6, r: 0, f: "b" }, 64)
        ],
        correcta: 0,
        explicacion: "La cantidad de triángulos sube de 1 en 1 (1, 2, 3, 4 → 5), mientras que la orientación (arriba/abajo) y el color (blanco/negro) se alternan en cada paso: corresponde 5 triángulos blancos apuntando hacia arriba."
      },
      {
        id: "e3-14",
        cat: "abstracto",
        enunciado: "En esta matriz 3×3 la cantidad de elementos sigue una operación aritmética en cada fila. ¿Qué celda falta?",
        figuraHtml: FIG_PSICO.matriz([
          { s: "circulo", n: 1, f: "n" }, { s: "circulo", n: 2, f: "n" }, { s: "circulo", n: 3, f: "n" },
          { s: "circulo", n: 2, f: "n" }, { s: "circulo", n: 1, f: "n" }, { s: "circulo", n: 3, f: "n" },
          { s: "circulo", n: 3, f: "n" }, { s: "circulo", n: 2, f: "n" }, null
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ s: "circulo", n: 5, f: "n" }, 64),
          FIG_PSICO.figura({ s: "circulo", n: 4, f: "n" }, 64),
          FIG_PSICO.figura({ s: "circulo", n: 6, f: "n" }, 64),
          FIG_PSICO.figura({ s: "circulo", n: 1, f: "n" }, 64)
        ],
        correcta: 0,
        explicacion: "En cada fila, la tercera casilla es la SUMA de las dos primeras: fila 1 (1 + 2 = 3), fila 2 (2 + 1 = 3), fila 3 (3 + 2 = 5 círculos negros)."
      },
      {
        id: "e3-15",
        cat: "abstracto",
        enunciado: "Observe la secuencia de seis dados estándar. ¿Qué cara debe ocupar el lugar de la incógnita?",
        figuraHtml: FIG_PSICO.serie([
          FIG_PSICO.dado(6, 52),
          FIG_PSICO.dado(1, 52),
          FIG_PSICO.dado(5, 52),
          FIG_PSICO.dado(2, 52),
          FIG_PSICO.dado(4, 52),
          FIG_PSICO.incognitaDado(52)
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.dado(1, 56),
          FIG_PSICO.dado(2, 56),
          FIG_PSICO.dado(3, 56),
          FIG_PSICO.dado(6, 56)
        ],
        correcta: 2,
        explicacion: "Los dados se agrupan en pares de caras opuestas que suman 7: (6 y 1), (5 y 2), por lo que a 4 le sigue su cara opuesta 3. También se comprueba por series alternadas: impares bajan (6, 5, 4) y pares suben (1, 2 → 3)."
      },
      {
        id: "e3-16",
        cat: "abstracto",
        enunciado: "Al plegar este desarrollo en forma de T para construir un cubo, ¿qué símbolo quedará OPUESTO a «$»?",
        figuraHtml: FIG_PSICO.redCubo([
          [0, 0, "%"], [1, 0, "$"], [2, 0, "&"],
          [1, 1, "#"],
          [1, 2, "@"],
          [1, 3, "+"]
        ]),
        opciones: ["El símbolo @", "El símbolo +", "El símbolo &", "El símbolo #"],
        correcta: 0,
        explicacion: "En la columna central vertical ($, #, @, +), las casillas separadas por un cuadro quedan frente a frente al doblar a 90°: «$» queda opuesto a «@», «#» queda opuesto a «+», y «%» queda opuesto a «&»."
      },
      {
        id: "e3-17",
        cat: "abstracto",
        enunciado: "Analice cómo se mueven simultáneamente los DOS cuadros negros y elija la siguiente figura:",
        figuraHtml: FIG_PSICO.serie([
          FIG_PSICO.figura({ cuad: ["tl", "br"] }, 68),
          FIG_PSICO.figura({ cuad: ["tr", "bl"] }, 68),
          FIG_PSICO.figura({ cuad: ["tl", "br"] }, 68),
          FIG_PSICO.figura({ cuad: ["tr", "bl"] }, 68),
          FIG_PSICO.figura(null, 68)
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ cuad: ["tr", "bl"] }, 64),
          FIG_PSICO.figura({ cuad: ["tl", "tr"] }, 64),
          FIG_PSICO.figura({ cuad: ["tl", "br"] }, 64),
          FIG_PSICO.figura({ cuad: ["bl", "br"] }, 64)
        ],
        correcta: 2,
        explicacion: "Al girar ambos cuadrantes opuestos 90° en sentido horario en cada paso, las diagonales se alternan periódicamente (diagonal principal ↘ ↔ diagonal secundaria ↙). En el quinto término vuelve la diagonal principal."
      },
      {
        id: "e3-18",
        cat: "abstracto",
        enunciado: "En esta matriz se aplica la regla de DIFERENCIA SIMÉTRICA (solo pasan a la tercera columna las líneas que NO se repiten entre las dos primeras). ¿Cuál completa la matriz?",
        figuraHtml: FIG_PSICO.matriz([
          { lineas: ["v", "h"] }, { lineas: ["h"] }, { lineas: ["v"] },
          { lineas: ["d1", "d2"] }, { lineas: ["d1"] }, { lineas: ["d2"] },
          { lineas: ["v", "d1"] }, { lineas: ["d1", "h"] }, null
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ lineas: ["v", "h"] }, 64),
          FIG_PSICO.figura({ lineas: ["d1"] }, 64),
          FIG_PSICO.figura({ lineas: ["v", "h", "d1"] }, 64),
          FIG_PSICO.figura({ lineas: ["v"] }, 64)
        ],
        correcta: 0,
        explicacion: "Al comparar {vertical, diagonal ↗} con {diagonal ↗, horizontal}, la diagonal ↗ está repetida y se anula; permanecen únicamente la línea vertical y la línea horizontal."
      },

      /* --- LÓGICO (6) --- */
      {
        id: "e3-19",
        cat: "logico",
        enunciado: "Si el índice de liquidez cae por debajo de 1.2, el sistema emite una alerta amarilla. Si además existe mora mayor a 30 días, emite alerta roja. La empresa Alfa NO recibió alerta amarilla. ¿Qué es necesariamente cierto?",
        opciones: [
          "Su índice de liquidez es igual o superior a 1.2",
          "Tiene mora mayor a 30 días",
          "Recibió directamente alerta roja",
          "No tiene préstamos activos en el banco"
        ],
        correcta: 0,
        explicacion: "Por contraposición lógica (Modus Tollens): si el índice fuera menor de 1.2 habría emitido alerta amarilla; como no la emitió, su índice es mayor o igual a 1.2."
      },
      {
        id: "e3-20",
        cat: "logico",
        enunciado: "Cuatro gerentes (Lara, Matos, Nina y Ortiz) lideran cuatro áreas distintas: Riesgo, Tesorería, Legal y Mercadeo. Lara y Nina almuerzan siempre con el gerente de Tesorería; Matos dirige Legal; Nina no dirige Mercadeo. ¿Quién dirige Riesgo?",
        opciones: ["Lara", "Matos", "Nina", "Ortiz"],
        correcta: 2,
        explicacion: "Matos = Legal. Como Lara y Nina almuerzan con quien dirige Tesorería, ninguno de ellos dos es Tesorería → Ortiz = Tesorería. Quedan Riesgo y Mercadeo para Lara y Nina; como Nina no dirige Mercadeo, Nina dirige Riesgo (y Lara dirige Mercadeo)."
      },
      {
        id: "e3-21",
        cat: "logico",
        enunciado: "Todo pagaré notarial válido lleva sello seco. Ningún borrador preliminar lleva sello seco. Por lo tanto:",
        opciones: [
          "Algunos borradores preliminares son pagarés válidos",
          "Ningún borrador preliminar es un pagaré notarial válido",
          "Todo documento con sello seco es un pagaré notarial",
          "Los borradores preliminares no tienen texto legal"
        ],
        correcta: 1,
        explicacion: "Como el conjunto de pagarés válidos está contenido en los documentos con sello seco y los borradores están totalmente excluidos de ese conjunto, su intersección es vacía."
      },
      {
        id: "e3-22",
        cat: "logico",
        enunciado: "En una evaluación interna, Camila obtuvo más puntos que Raúl; Sofía obtuvo menos puntos que Tomás; y Raúl empató con Tomás. ¿Quién obtuvo la puntuación MÁS BAJA?",
        opciones: ["Camila", "Raúl", "Sofía", "Tomás"],
        correcta: 2,
        explicacion: "Orden de mayor a menor puntaje: Camila > Raúl = Tomás > Sofía. La puntuación más baja corresponde a Sofía."
      },
      {
        id: "e3-23",
        cat: "logico",
        enunciado: "«No es cierto que todos los reclamos del mes fueron improcedentes». Esta afirmación equivale lógicamente a decir que:",
        opciones: [
          "Ningún reclamo del mes fue improcedente",
          "Al menos un reclamo del mes fue procedente (no improcedente)",
          "La mayoría de los reclamos fueron procedentes",
          "Todos los reclamos del mes fueron procedentes"
        ],
        correcta: 1,
        explicacion: "La negación de un cuantificador universal («no todos son X») equivale exactamente al cuantificador existencial («existe al menos uno que no es X»)."
      },
      {
        id: "e3-24",
        cat: "logico",
        enunciado: "Un comité requiere al menos 3 votos favorables de sus 4 miembros (P, Q, R, S). Sabemos que P y Q nunca votan igual entre sí (si uno vota a favor, el otro vota en contra). Para que un crédito se apruebe, ¿qué debe ocurrir obligatoriamente?",
        opciones: [
          "Que P vote siempre a favor",
          "Que tanto R como S voten a favor",
          "Que Q se abstenga de participar",
          "Nunca puede aprobarse ningún crédito"
        ],
        correcta: 1,
        explicacion: "Como entre P y Q siempre habrá exactamente 1 voto a favor y 1 en contra, para alcanzar los 3 votos favorables necesarios es indispensable que R y S aporten ambos sus 2 votos a favor (1 + 2 = 3)."
      },

      /* --- ATENCIÓN Y CONCENTRACIÓN BANCARIA (6) --- */
      {
        id: "e3-25",
        cat: "atencion",
        enunciado: "Localice la opción que copia SIN ERRORES el número de préstamo hipotecario:\nOriginal:  PH-2026-00849173-609",
        opciones: [
          "PH-2026-00841973-609",
          "PH-2026-00849173-690",
          "PH-2026-00849173-609",
          "PH-2026-00849137-609"
        ],
        correcta: 2,
        explicacion: "La opción correcta mantiene intactos todos los dígitos («00849173» y «609»). Las otras invierten «91» por «19» («00841973»), «09» por «90» («690») o «73» por «37» («00849137»)."
      },
      {
        id: "e3-26",
        cat: "atencion",
        enunciado: "Compare los datos del expediente físico frente al sistema:\nFísico:    Céd. 031-0458921-7  |  RNC 1-02-63914-8  |  Tasa 13.75 %\nSistema:   Céd. 031-0458921-7  |  RNC 1-02-63914-8  |  Tasa 13.57 %\n¿Qué hallazgo debe reportarse?",
        opciones: [
          "Error de digitación en la tasa de interés",
          "Error de digitación en el RNC",
          "Error en el código de municipio de la cédula",
          "Los tres campos están exactamente iguales"
        ],
        correcta: 0,
        explicacion: "En la tasa de interés se transpusieron los decimales: 13.75 % en el físico frente a 13.57 % en el sistema."
      },
      {
        id: "e3-27",
        cat: "atencion",
        enunciado: "¿Cuántas veces aparece la secuencia exacta «RD$» seguida inmediatamente de espacio y «1,050» en este registro?\nRD$ 1,050 | RD$ 1,500 | RD$1,050 | RD$ 1,050 | US$ 1,050 | RD$ 1,050 | RD$ 1,005",
        opciones: ["2 veces", "3 veces", "4 veces", "5 veces"],
        correcta: 1,
        explicacion: "Cumplen exactamente «RD$ 1,050» (con espacio y moneda RD$) los ítems 1, 4 y 6: 3 veces en total (el tercero no tiene espacio y el quinto es US$)."
      },
      {
        id: "e3-28",
        cat: "atencion",
        enunciado: "Compare cada par de comprobantes fiscales e identifique en CUÁL par los dos códigos NO son iguales:",
        opciones: [
          "NCF-B0100045982  =  NCF-B0100045982",
          "NCF-B0200091834  =  NCF-B0200091834",
          "NCF-B0100076391  =  NCF-B0100076931",
          "NCF-B1400012805  =  NCF-B1400012805"
        ],
        correcta: 2,
        explicacion: "En el par «NCF-B0100076391 = NCF-B0100076931» se invirtieron las cifras «39» por «93» («76391» frente a «76931»); los otros tres pares son idénticos."
      },
      {
        id: "e3-29",
        cat: "atencion",
        enunciado: "Elija la dirección transcrita de forma IDÉNTICA al registro oficial:\nOriginal:  Av. Gustavo Mejía Ricart #148, Ens. Piantini, D. N.",
        opciones: [
          "Av. Gustavo Mejia Ricart #148, Ens. Piantini, D. N.",
          "Av. Gustavo Mejía Ricart #184, Ens. Piantini, D. N.",
          "Av. Gustavo Mejía Ricart #148, Ens. Piantini, D. N.",
          "Av. Gustavo Mejía Ricard #148, Ens. Piantini, D. N."
        ],
        correcta: 2,
        explicacion: "Solo la opción correcta respeta la tilde de «Mejía», la «t» final de «Ricart» y el número «#148». Las otras quitan la tilde («Mejia»), invierten el número («#184») o terminan el apellido en «d» («Ricard»)."
      },
      {
        id: "e3-30",
        cat: "atencion",
        enunciado: "Compare ambas columnas de saldos conciliados e indique CUÁNTAS filas son 100 % idénticas:\nFila 1:  US$ 94,210.08   |   US$ 94,210.08\nFila 2:  US$ 17,605.90   |   US$ 17,650.90\nFila 3:  US$ 308,441.12  |   US$ 308,441.12\nFila 4:  US$ 5,990.00    |   US$ 5,990.00\nFila 5:  US$ 62,118.75   |   US$ 62,181.75",
        opciones: ["2 filas", "3 filas", "4 filas", "5 filas"],
        correcta: 1,
        explicacion: "Son idénticas 3 filas: la Fila 1, la Fila 3 y la Fila 4 (difieren la Fila 2 en 605/650 y la Fila 5 en 118/181)."
      }
    ]
  },

  /* =========================================================
     EXAMEN 4: Auditoría, Riesgo y Tecnología (30 preguntas · 25 min)
     ========================================================= */
  {
    id: "examen-4",
    titulo: "Simulacro 4 · Auditoría, Riesgo y Tecnología",
    subtitulo: "Prueba intensiva de agilidad mental, control de calidad y precisión bajo tiempo",
    minutos: 25,
    preguntas: [
      /* --- VERBAL (6) --- */
      {
        id: "e4-01",
        cat: "verbal",
        enunciado: "Seleccione el SINÓNIMO más apropiado de MITIGAR en gestión de riesgos operativos:",
        opciones: ["Atenuar o reducir", "Agravar", "Ocultar", "Postergar"],
        correcta: 0,
        explicacion: "«Mitigar» un riesgo significa disminuir o moderar la probabilidad de que ocurra o la severidad de su impacto."
      },
      {
        id: "e4-02",
        cat: "verbal",
        enunciado: "Elija el ANTÓNIMO de ÍNTEGRO aplicado a una base de datos transaccional:",
        opciones: ["Completo", "Corrupto o alterado", "Respaldado", "Consistente"],
        correcta: 1,
        explicacion: "La integridad de datos implica que la información está completa e inalterada; su opuesto es un registro corrupto, truncado o alterado."
      },
      {
        id: "e4-03",
        cat: "verbal",
        enunciado: "Complete la analogía: CONTRASEÑA es a ACCESO como PÓLIZA es a:",
        opciones: ["Cobertura", "Siniestro", "Reclamo", "Vehículo"],
        correcta: 0,
        explicacion: "La contraseña habilita y protege el acceso al sistema; la póliza otorga y respalda la cobertura frente a un riesgo."
      },
      {
        id: "e4-04",
        cat: "verbal",
        enunciado: "Identifique el TÉRMINO EXCLUIDO en controles de auditoría y seguridad informática:",
        opciones: ["Trazabilidad", "Encriptación", "Autenticación", "Especulación"],
        correcta: 3,
        explicacion: "Trazabilidad, encriptación y autenticación son pilares de seguridad y control; «especulación» es una operación comercial o bursátil de riesgo."
      },
      {
        id: "e4-05",
        cat: "verbal",
        enunciado: "Comprensión lectora: «Ningún cambio en el sistema central podrá desplegarse en horario hábil, a menos que cuente con firma conjunta del director de Tecnología y del gerente de Riesgo Operativo por tratarse de un incidente crítico de seguridad». Según la norma, un despliegue un miércoles a las 11:00 a. m.:",
        opciones: [
          "Está prohibido bajo cualquier circunstancia sin excepciones",
          "Es válido únicamente si corrige un incidente crítico de seguridad y tiene ambas firmas exigidas",
          "Solo requiere autorización verbal del líder técnico",
          "Puede hacerse para mejoras visuales rutinarias"
        ],
        correcta: 1,
        explicacion: "El miércoles a las 11:00 a. m. es horario hábil; la norma solo lo permite bajo la excepción expresa de incidente crítico de seguridad con firma conjunta de ambos directivos."
      },
      {
        id: "e4-06",
        cat: "verbal",
        enunciado: "Seleccione el SINÓNIMO de DISCREPANCIA en un informe de auditoría:",
        opciones: ["Concordancia", "Inconsistencia o diferencia", "Aprobación", "Simetría"],
        correcta: 1,
        explicacion: "Una «discrepancia» es una divergencia, diferencia o falta de coincidencia entre dos datos o criterios que deberían cuadrar."
      },

      /* --- NUMÉRICO (6) --- */
      {
        id: "e4-07",
        cat: "numerico",
        enunciado: "¿Qué número continúa el patrón numérico?: 2, 5, 10, 17, 26, 37, ___",
        opciones: ["48", "49", "50", "52"],
        correcta: 2,
        explicacion: "Las diferencias crecen con los números impares (+3, +5, +7, +9, +11 → sigue +13): 37 + 13 = 50 (también equivale a n² + 1: 7² + 1 = 50). A mano, sin calculadora: anota las sumas entre un número y el siguiente (3, 5, 7, 9, 11); la próxima es 13 y 37 + 13 = 50."
      },
      {
        id: "e4-08",
        cat: "numerico",
        enunciado: "Una tarjeta corporativa tiene límite total de US$ 3,000.00. Registra consumos por US$ 1,400.00 y además un pago local de RD$ 36,000.00 convertido a razón de RD$ 60.00 por dólar. ¿Cuánto disponible resta en dólares?",
        opciones: ["US$ 900.00", "US$ 1,000.00", "US$ 1,100.00", "US$ 1,240.00"],
        correcta: 1,
        explicacion: "El consumo en pesos equivale a 36,000 ÷ 60 = US$ 600.00. Total utilizado = 1,400 + 600 = US$ 2,000.00. Disponible restante = 3,000 − 2,000 = US$ 1,000.00. A mano, sin calculadora: 36,000 ÷ 60 = 600 (quita un cero a cada uno: 3,600 ÷ 6). 1,400 + 600 = 2,000 y 3,000 − 2,000 = 1,000."
      },
      {
        id: "e4-09",
        cat: "numerico",
        enunciado: "Un certificado de RD$ 500,000.00 rinde un 10 % anual simple. Si se retiene el 10 % de impuesto sobre los intereses generados, ¿cuánto interés NETO recibe el cliente en un semestre (6 meses)?",
        opciones: ["RD$ 20,000.00", "RD$ 22,500.00", "RD$ 25,000.00", "RD$ 45,000.00"],
        correcta: 1,
        explicacion: "Interés bruto en 6 meses = 500,000 × 0.10 × 0.5 = RD$ 25,000.00. Retención fiscal (10 % de 25,000) = RD$ 2,500.00. Interés neto acreditado = 25,000 − 2,500 = RD$ 22,500.00. A mano, sin calculadora: el 10 % de 500,000 es 50,000 al año; en medio año, 25,000. El impuesto es el 10 % de 25,000 = 2,500. 25,000 − 2,500 = 22,500."
      },
      {
        id: "e4-10",
        cat: "numerico",
        enunciado: "Un cajero automático fue cargado con RD$ 1,200,000.00. Según el diario electrónico dispensó RD$ 845,500.00 a clientes, pero al arquear los casetes físicos se encontraron RD$ 356,500.00. ¿Qué refleja el arqueo?",
        opciones: [
          "Cuadre exacto",
          "Faltante de RD$ 2,000.00",
          "Sobrante de RD$ 2,000.00",
          "Sobrante de RD$ 1,500.00"
        ],
        correcta: 2,
        explicacion: "Efectivo esperado = 1,200,000 − 845,500 = RD$ 354,500.00. Al encontrarse físicamente RD$ 356,500.00, hay RD$ 2,000.00 de más (sobrante, típico de retiro no tomado por el usuario). A mano, sin calculadora: resta por partes: 1,200,000 − 800,000 = 400,000 y 400,000 − 45,500 = 354,500. Hay 356,500, así que sobran 2,000."
      },
      {
        id: "e4-11",
        cat: "numerico",
        enunciado: "Auditoría revisa una muestra del 15 % sobre un lote de 800 expedientes de apertura. Si el 5 % de los expedientes auditados presentó firmas incompletas, ¿cuántos expedientes tuvieron ese hallazgo?",
        opciones: ["4 expedientes", "6 expedientes", "8 expedientes", "12 expedientes"],
        correcta: 1,
        explicacion: "Muestra revisada = 800 × 0.15 = 120 expedientes. El 5 % de esos 120 expedientes es: 120 × 0.05 = 6 expedientes. A mano, sin calculadora: el 10 % de 800 es 80 y el 5 % es 40: la muestra es de 120. El 5 % de 120 es 6 (el 10 % es 12; la mitad)."
      },
      {
        id: "e4-12",
        cat: "numerico",
        enunciado: "Un bono trimestral de RD$ 45,000.00 se distribuye entre dos analistas de QA en proporción directa a los módulos certificados por cada uno: 4 y 5 módulos respectivamente. ¿Cuánto recibe quien certificó 5 módulos?",
        opciones: ["RD$ 20,000.00", "RD$ 22,500.00", "RD$ 25,000.00", "RD$ 27,000.00"],
        correcta: 2,
        explicacion: "Suma de partes proporcionales = 4 + 5 = 9 partes. Cada parte equivale a 45,000 ÷ 9 = RD$ 5,000.00. Quien certificó 5 módulos recibe 5 × 5,000 = RD$ 25,000.00. A mano, sin calculadora: 4 + 5 = 9 partes. 45,000 ÷ 9 = 5,000 por parte y 5,000 × 5 = 25,000."
      },

      /* --- ABSTRACTO Y ESPACIAL CON SVG (6) --- */
      {
        id: "e4-13",
        cat: "abstracto",
        enunciado: "Dos agujas se mueven dentro de la esfera: la negra gira 90° en sentido horario por paso y la verde gira 45° en sentido antihorario por paso. ¿Cuál es la quinta figura?",
        figuraHtml: FIG_PSICO.serie([
          FIG_PSICO.figura({ aguja: 0, aguja2: 0 }, 68),
          FIG_PSICO.figura({ aguja: 90, aguja2: 315 }, 68),
          FIG_PSICO.figura({ aguja: 180, aguja2: 270 }, 68),
          FIG_PSICO.figura({ aguja: 270, aguja2: 225 }, 68),
          FIG_PSICO.figura(null, 68)
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ aguja: 0, aguja2: 180 }, 64),
          FIG_PSICO.figura({ aguja: 0, aguja2: 90 }, 64),
          FIG_PSICO.figura({ aguja: 90, aguja2: 180 }, 64),
          FIG_PSICO.figura({ aguja: 180, aguja2: 180 }, 64)
        ],
        correcta: 0,
        explicacion: "En el quinto paso, la aguja negra completa la vuelta (270° + 90° = 360° ≡ 0°, arriba), mientras la aguja corta verde retrocede otros 45° (225° − 45° = 180°, abajo)."
      },
      {
        id: "e4-14",
        cat: "abstracto",
        enunciado: "¿Qué figura completa la matriz 3×3 combinando rotación de la flecha y estilo de sombreado?",
        figuraHtml: FIG_PSICO.matriz([
          { s: "flecha", r: 0, f: "b" }, { s: "flecha", r: 90, f: "g" }, { s: "flecha", r: 180, f: "n" },
          { s: "flecha", r: 90, f: "g" }, { s: "flecha", r: 180, f: "n" }, { s: "flecha", r: 270, f: "b" },
          { s: "flecha", r: 180, f: "n" }, { s: "flecha", r: 270, f: "b" }, null
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ s: "flecha", r: 0, f: "g" }, 64),
          FIG_PSICO.figura({ s: "flecha", r: 0, f: "n" }, 64),
          FIG_PSICO.figura({ s: "flecha", r: 90, f: "g" }, 64),
          FIG_PSICO.figura({ s: "flecha", r: 270, f: "g" }, 64)
        ],
        correcta: 0,
        explicacion: "Tanto por filas como por columnas la flecha gira +90° por casilla (180° → 270° → 0° arriba) y cada fila contiene los tres colores sin repetir (negro, blanco → falta gris)."
      },
      {
        id: "e4-15",
        cat: "abstracto",
        enunciado: "Tres dados idénticos y estándar descansan sobre una mesa mostrando arriba los valores 4, 1 y 5. ¿Cuánto suman en total las TRES caras que tocan directamente la mesa?",
        figuraHtml: FIG_PSICO.serie([
          FIG_PSICO.dado(4, 58),
          FIG_PSICO.dado(1, 58),
          FIG_PSICO.dado(5, 58)
        ], "+"),
        opciones: ["9 puntos", "10 puntos", "11 puntos", "12 puntos"],
        correcta: 2,
        explicacion: "Como cada par de caras opuestas suma 7, en tres dados la suma total de caras superiores + inferiores es 3 × 7 = 21. Si arriba suman 4 + 1 + 5 = 10, abajo contra la mesa suman 21 − 10 = 11 (3 + 6 + 2 = 11)."
      },
      {
        id: "e4-16",
        cat: "abstracto",
        enunciado: "Al plegar esta cruz horizontal para formar un cubo, ¿qué par de letras quedan en caras OPUESTAS?",
        figuraHtml: FIG_PSICO.redCubo([
          [2, 0, "N"],
          [0, 1, "P"], [1, 1, "Q"], [2, 1, "R"], [3, 1, "S"],
          [2, 2, "T"]
        ]),
        opciones: ["P y S", "Q y S", "N y R", "P y Q"],
        correcta: 1,
        explicacion: "En la franja horizontal (P, Q, R, S), P queda opuesta a R y Q queda opuesta a S; mientras que las alas superior e inferior (N y T) quedan opuestas entre sí."
      },
      {
        id: "e4-17",
        cat: "abstracto",
        enunciado: "Tres de las siguientes cuatro opciones son simples rotaciones en el plano de la letra «F» original, y UNA sola está invertida en espejo. ¿Cuál es la figura DIFERENTE (reflejada)?",
        figuraHtml: FIG_PSICO.figura({ letra: "F", r: 0, m: false }, 76),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ letra: "F", r: 90, m: false }, 64),
          FIG_PSICO.figura({ letra: "F", r: 180, m: false }, 64),
          FIG_PSICO.figura({ letra: "F", r: 270, m: true }, 64),
          FIG_PSICO.figura({ letra: "F", r: 270, m: false }, 64)
        ],
        correcta: 2,
        explicacion: "Tres de las opciones solo giran la «F» (90°, 180° y 270°) dentro del mismo plano; la opción correcta es la única que presenta inversión especular (espejo) y no puede obtenerse solo girando la figura."
      },
      {
        id: "e4-18",
        cat: "abstracto",
        enunciado: "Observe cómo interactúan los cuadrantes sombreados de las columnas 1 y 2 para producir la columna 3. ¿Qué figura completa la matriz?",
        figuraHtml: FIG_PSICO.matriz([
          { cuad: "tl" }, { cuad: "tr" }, { cuad: ["tl", "tr"] },
          { cuad: "bl" }, { cuad: "br" }, { cuad: ["bl", "br"] },
          { cuad: ["tl", "bl"] }, { cuad: "br" }, null
        ]),
        esOpcionHtml: true,
        opciones: [
          FIG_PSICO.figura({ cuad: ["tl", "bl", "br"] }, 64),
          FIG_PSICO.figura({ cuad: ["tl", "tr", "br"] }, 64),
          FIG_PSICO.figura({ cuad: ["bl", "br"] }, 64),
          FIG_PSICO.figura({ cuad: ["tl", "br"] }, 64)
        ],
        correcta: 0,
        explicacion: "La tercera columna superpone (une) los cuadrantes pintados de las dos primeras celdas de su fila: {superior-izquierdo, inferior-izquierdo} ∪ {inferior-derecho} = tres cuadrantes oscuros (todos excepto el superior derecho)."
      },

      /* --- LÓGICO (6) --- */
      {
        id: "e4-19",
        cat: "logico",
        enunciado: "Si falla el enlace primario, entra automáticamente el enlace satelital. Si entra el enlace satelital, se notifica por correo al jefe de Redes. Hoy NO se notificó al jefe de Redes. ¿Qué se concluye necesariamente?",
        opciones: [
          "El jefe de Redes estaba de vacaciones",
          "El enlace primario no falló",
          "Ambos enlaces fallaron a la vez",
          "El correo corporativo estaba fuera de línea"
        ],
        correcta: 1,
        explicacion: "Cadena condicional (P → Q y Q → R): al no ocurrir R (no hubo notificación), no ocurrió Q (no entró el satelital) y, por tanto, no ocurrió P (el enlace primario no falló)."
      },
      {
        id: "e4-20",
        cat: "logico",
        enunciado: "Se deben programar cinco auditorías (A, B, C, D y E), una cada día de lunes a viernes. A se hará el lunes; C debe hacerse el día inmediatamente anterior a D; E no puede ser martes ni miércoles; y B se hace antes que C. ¿Qué día corresponde a la auditoría C?",
        opciones: ["Martes", "Miércoles", "Jueves", "Viernes"],
        correcta: 1,
        explicacion: "A = lunes. Como B va antes que el bloque consecutivo CD, entre martes, miércoles, jueves y viernes, si E va viernes (pues no puede ser martes ni miércoles, y tampoco jueves si CD ocupa miércoles-jueves): A=lunes, B=martes, C=miércoles, D=jueves, E=viernes. ¡Cumple todas las restricciones! C es el miércoles."
      },
      {
        id: "e4-21",
        cat: "logico",
        enunciado: "Solo los usuarios con perfil «Supervisor» pueden reversar comisiones mayores a RD$ 5,000. Natalia acaba de reversar en el sistema una comisión de RD$ 7,500. ¿Qué podemos deducir?",
        opciones: [
          "Natalia es gerente de sucursal",
          "Natalia posee el perfil «Supervisor»",
          "Cualquier usuario con perfil «Supervisor» se llama Natalia",
          "La comisión fue cobrada por error ayer"
        ],
        correcta: 1,
        explicacion: "«Solo los X pueden hacer Y» significa «Si alguien hace Y, entonces es X». Como Natalia reversó un monto mayor a RD$ 5,000, necesariamente posee el perfil «Supervisor»."
      },
      {
        id: "e4-22",
        cat: "logico",
        enunciado: "Tres servidores (Alfa, Beta y Gamma) tienen estados distintos: uno está Activo, otro En Espera y otro En Mantenimiento. De las siguientes tres afirmaciones, EXACTAMENTE UNA es verdadera:\n1) Alfa está Activo.\n2) Beta NO está Activo.\n3) Gamma NO está En Mantenimiento.\n¿Cuál servidor está Activo?",
        opciones: ["Alfa", "Beta", "Gamma", "No hay datos suficientes"],
        correcta: 1,
        explicacion: "Probemos quién está Activo: si Alfa estuviera Activo, (1) y (2) serían ambas verdaderas (imposible). Si Gamma estuviera Activo, entonces (2) «Beta no está Activo» y (3) «Gamma no está En Mantenimiento» serían ambas verdaderas (imposible). En cambio, si Beta está Activo: (1) es falsa, (2) es falsa y (3) es verdadera (con Alfa En Mantenimiento y Gamma En Espera). Por tanto, Beta está Activo."
      },
      {
        id: "e4-23",
        cat: "logico",
        enunciado: "Todas las transacciones internacionales pasan por monitoreo PLAFT. Algunas transacciones monitoreadas por PLAFT requieren soporte documental adicional. ¿Qué conclusión es lógicamente válida?",
        opciones: [
          "Todas las transacciones internacionales requieren soporte documental adicional",
          "Ninguna transacción local pasa por monitoreo PLAFT",
          "No se puede concluir con certeza que alguna transacción internacional requiera soporte adicional (podrían ser locales las que lo requirieron)",
          "Todas las operaciones con soporte documental son internacionales"
        ],
        correcta: 2,
        explicacion: "Falacia clásica evitada: aunque todas las internacionales están dentro del círculo PLAFT, el subconjunto de PLAFT que pidió soporte podría corresponder a operaciones nacionales monitoreadas; por rigor silogístico no es forzoso que toque el subconjunto internacional."
      },
      {
        id: "e4-24",
        cat: "logico",
        enunciado: "En un código interno de 4 dígitos todos distintos, el primer dígito es el doble del último; el segundo es la suma del primero y el último; y el tercero es 0. Si el último dígito es 3, ¿cuál es el código?",
        opciones: ["6903", "6803", "3906", "6093"],
        correcta: 0,
        explicacion: "Último dígito = 3; primero = 2 × 3 = 6; segundo = 6 + 3 = 9; tercero = 0. Los cuatro dígitos (6, 9, 0, 3) son todos distintos y forman el código 6903."
      },

      /* --- ATENCIÓN Y CONCENTRACIÓN BANCARIA (6) --- */
      {
        id: "e4-25",
        cat: "atencion",
        enunciado: "Identifique la huella de verificación (hash corto) que es EXACTAMENTE IGUAL a la original:\nOriginal:  SHA-9f4B7c2E-8801-dK5m",
        opciones: [
          "SHA-9f4B7c2E-8810-dK5m",
          "SHA-9f487c2E-8801-dK5m",
          "SHA-9f4B7c2E-8801-dK5m",
          "SHA-9f4B7c2F-8801-dK5m"
        ],
        correcta: 2,
        explicacion: "La opción correcta coincide carácter por carácter, respetando mayúsculas, minúsculas y dígitos («9f4B7c2E-8801-dK5m»). Las otras cambian «8801» por «8810», la «B» por un «8» o la «E» final por una «F»."
      },
      {
        id: "e4-26",
        cat: "atencion",
        enunciado: "Compare la orden de pago y el registro liquidado:\nOrden:      Benef. 225-0071849-3  |  LBTR-20260418-0092  |  RD$ 4,750,890.00\nLiquidado:  Benef. 225-0071849-3  |  LBTR-20260418-0092  |  RD$ 4,750,890.00\n¿Qué conclusión arroja la revisión?",
        opciones: [
          "Son 100 % idénticos en todos los campos",
          "Difieren en el código LBTR",
          "Difieren en la cédula/cuenta del beneficiario",
          "Difieren en los miles del monto"
        ],
        correcta: 0,
        explicacion: "Los tres bloques (beneficiario, referencia LBTR y monto de RD$ 4,750,890.00) son completamente idénticos."
      },
      {
        id: "e4-27",
        cat: "atencion",
        enunciado: "En este lote de cédulas del mismo titular («001-1390745-2»), una sola copia fue mal digitada:\nCopia A: 001-1390745-2\nCopia B: 001-1390754-2\nCopia C: 001-1390745-2\nCopia D: 001-1390745-2\n¿Cuál copia contiene el error?",
        opciones: ["La Copia A", "La Copia B", "La Copia C", "La Copia D"],
        ordenFijo: true,
        correcta: 1,
        explicacion: "La Copia B invierte los dígitos «45» por «54» («001-1390754-2»)."
      },
      {
        id: "e4-28",
        cat: "atencion",
        enunciado: "¿Cuántos registros de esta bitácora corresponden simultáneamente a la sucursal «SUC-07» Y estado «OK»?\nSUC-07:OK | SUC-70:OK | SUC-07:ERR | SUC-07:OK | SUC-07:OK | SUC-01:OK | SUC-07:OK",
        opciones: ["3 registros", "4 registros", "5 registros", "6 registros"],
        correcta: 1,
        explicacion: "Cumplen «SUC-07:OK» exactamente las posiciones 1, 4, 5 y 7: un total de 4 registros."
      },
      {
        id: "e4-29",
        cat: "atencion",
        enunciado: "Seleccione la opción que transcribe SIN NINGÚN CAMBIO la siguiente razón social y cuenta:\nOriginal:  FARMACÉUTICA DEL CIBAO, S. R. L. — CTA. 109-482037-5",
        opciones: [
          "FARMACEUTICA DEL CIBAO, S. R. L. — CTA. 109-482037-5",
          "FARMACÉUTICA DEL CIBAO, S. R. L. — CTA. 109-482307-5",
          "FARMACÉUTICA DEL CIBAO, S. R. L. — CTA. 109-482037-5",
          "FARMACÉUTICA DEL CIBAO, S. A. — CTA. 109-482037-5"
        ],
        correcta: 2,
        explicacion: "La opción correcta mantiene la tilde de «FARMACÉUTICA», la sigla «S. R. L.» y la cuenta exacta «109-482037-5». Las otras quitan la tilde, invierten «03» por «30» en la cuenta o cambian «S. R. L.» por «S. A.»."
      },
      {
        id: "e4-30",
        cat: "atencion",
        enunciado: "Verifique las cuatro conciliaciones e indique en CUÁL fila existe una discrepancia:\nFila A:  RNC 1-01-55209-4   —   RD$ 88,412.60   =   RD$ 88,412.60\nFila B:  RNC 1-31-90472-1   —   RD$ 154,009.15  =   RD$ 154,009.15\nFila C:  RNC 1-05-33816-7   —   RD$ 720,590.40  =   RD$ 720,950.40\nFila D:  RNC 1-30-11984-2   —   RD$ 19,875.00   =   RD$ 19,875.00",
        opciones: ["En la Fila A", "En la Fila B", "En la Fila C", "En la Fila D"],
        ordenFijo: true,
        correcta: 2,
        explicacion: "En la Fila C difieren las centenas: RD$ 720,590.40 a la izquierda frente a RD$ 720,950.40 a la derecha."
      }
    ]
  }
];

/* Devuelve las 120 preguntas psicométricas unificadas con metadatos del examen */
function obtenerTodasPsico() {
  var lista = [];
  EXAMENES_PSICO.forEach(function (ex) {
    ex.preguntas.forEach(function (p) {
      var copia = {};
      for (var k in p) {
        if (Object.prototype.hasOwnProperty.call(p, k)) copia[k] = p[k];
      }
      copia.examenId = ex.id;
      copia.examenTitulo = ex.titulo;
      lista.push(copia);
    });
  });
  return lista;
}
