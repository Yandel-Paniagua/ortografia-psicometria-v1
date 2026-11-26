/* =========================================================
   Ampliación V2 · Pruebas que reportan los candidatos
   - Series de dominó (tipo D-48) con generador propio de fichas SVG
   - 10 formatos de preguntas de letras y palabras (40 preguntas)
   - Datos para la comprobación rápida de nombres y números
   - Resumen de la evaluación según testimonios públicos
   Debe cargarse DESPUÉS de datos-psicometria.js y ANTES de app.js.
   Sin dependencias externas.
   ========================================================= */

/* ---------------------------------------------------------
   Resumen de la investigación (testimonios de candidatos)
   --------------------------------------------------------- */
var INFO_EVALUACION = {
  titulo: "Qué reportan los candidatos sobre la evaluación",
  nota: "Resumen de testimonios públicos de candidatos del Banco Popular Dominicano (Glassdoor, 2022-2026). No es información oficial del banco: el contenido puede variar según el puesto, la fecha y la sede.",
  pruebas: [
    {
      nombre: "1. Dominó (prueba psicométrica)",
      detalle: "Varios candidatos coinciden en que la primera prueba es de fichas de dominó: una serie de fichas con una en blanco que debes completar.",
      accion: "domino",
      boton: "Practicar dominó"
    },
    {
      nombre: "2. Ortografía (dos pruebas)",
      detalle: "Palabras, nombres, avenidas y párrafos de correo: elegir la forma correcta o encontrar la que está mal escrita.",
      accion: "malescrita",
      boton: "Palabra mal escrita"
    },
    {
      nombre: "3. Dictado de cifras",
      detalle: "Te dictan montos de dinero y debes escribirlos con sus comas, su punto decimal y la moneda correcta (RD$ o US$).",
      accion: "cifras",
      boton: "Practicar dictado"
    },
    {
      nombre: "4. Lista de nombres (agilidad)",
      detalle: "Revisar rápido una lista de nombres para ver si están escritos igual o buscar los que coinciden.",
      accion: "comprobacion",
      boton: "Comprobación rápida"
    },
    {
      nombre: "5. Personalidad y preguntas situacionales",
      detalle: "No hay respuestas buenas ni malas, pero se valora la integridad, el servicio y la coherencia entre respuestas.",
      accion: "situacional",
      boton: "Ir a Psicológicas"
    },
    {
      nombre: "6. Dinámica de grupo o venta de un producto",
      detalle: "Si pasas la primera etapa, algunos puestos incluyen una dinámica grupal o simular la venta de un producto a los evaluadores.",
      accion: "entrevista",
      boton: "Guía de entrevista"
    }
  ],
  fuentes: [
    { texto: "Glassdoor · Entrevistas en Banco Popular Dominicano", url: "https://www.glassdoor.com/Interview/Banco-Popular-Dominicano-Interview-Questions-E336395.htm" },
    { texto: "Glassdoor · Representante de ventas telefónicas", url: "https://www.glassdoor.com/Interview/Banco-Popular-Dominicano-Representante-De-Ventas-Telefonicas-Interview-Questions-EI_IE336395.0,24_KO25,60.htm" }
  ]
};

/* ---------------------------------------------------------
   Nuevas categorías psicométricas
   --------------------------------------------------------- */
CATEGORIAS_PSICO.push(
  {
    id: "domino",
    nombre: "Series de dominó",
    descripcion: "Fichas tipo D-48: descubre la regla de cada mitad y completa la ficha que falta (los valores van de 0 a 6 y son cíclicos)."
  },
  {
    id: "letras",
    nombre: "Letras, palabras y claves",
    descripcion: "Posición en el alfabeto, orden alfabético de letras, letra puente, anagramas, frases desordenadas, claves, series y archivo."
  }
);

/* ---------------------------------------------------------
   Generador de fichas de dominó en SVG
   --------------------------------------------------------- */
var FIG_DOMINO = (function () {
  "use strict";

  var TINTA = "#0f172a";
  var PAPEL = "#ffffff";
  var ACENTO = "#059669";
  var FONDO_INC = "#ecfdf5";

  /* Posición de los puntos en una rejilla de 3 × 3 (columna, fila) */
  var PUNTOS = {
    0: [],
    1: [[1, 1]],
    2: [[2, 0], [0, 2]],
    3: [[2, 0], [1, 1], [0, 2]],
    4: [[0, 0], [2, 0], [0, 2], [2, 2]],
    5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]],
    6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]]
  };

  function mitad(valor, origenY) {
    var s = "";
    PUNTOS[valor].forEach(function (p) {
      s += '<circle cx="' + (13 + p[0] * 12) + '" cy="' + (origenY + p[1] * 11.5) + '" r="4.1" fill="' + TINTA + '"/>';
    });
    return s;
  }

  /* Dibujo de una ficha en su caja de 50 × 98 (sin la etiqueta <svg>) */
  function cuerpoFicha(a, b) {
    return '<rect x="2" y="2" width="46" height="94" rx="8" fill="' + PAPEL + '" stroke="' + TINTA + '" stroke-width="2.6"/>' +
      '<line x1="8" y1="49" x2="42" y2="49" stroke="' + TINTA + '" stroke-width="2.2" stroke-linecap="round"/>' +
      mitad(a, 14) + mitad(b, 61);
  }

  /* Ficha que falta. «giroTexto» endereza los signos «?» cuando la ficha va girada */
  function cuerpoIncognita(giroTexto) {
    var estiloTexto = ' text-anchor="middle" dominant-baseline="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="26" font-weight="800" fill="' + ACENTO + '"';
    var giro = giroTexto ? giroTexto : 0;
    return '<rect x="2" y="2" width="46" height="94" rx="8" fill="' + FONDO_INC + '" stroke="' + ACENTO + '" stroke-width="2.6" stroke-dasharray="7 5"/>' +
      '<line x1="8" y1="49" x2="42" y2="49" stroke="' + ACENTO + '" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="4 4"/>' +
      '<text x="25" y="27" transform="rotate(' + giro + ' 25 26)"' + estiloTexto + ">?</text>" +
      '<text x="25" y="74" transform="rotate(' + giro + ' 25 73)"' + estiloTexto + ">?</text>";
  }

  /* Ficha vertical: «a» es la mitad de arriba y «b» la de abajo (0 = blanca) */
  function ficha(a, b, ancho) {
    ancho = ancho || 46;
    var alto = Math.round(ancho * 1.96);
    return '<svg class="svg-psico svg-domino" viewBox="0 0 50 98" width="' + ancho + '" height="' + alto + '" role="img" aria-label="Ficha: ' + a + " arriba y " + b + ' abajo">' +
      cuerpoFicha(a, b) + "</svg>";
  }

  function incognita(ancho) {
    ancho = ancho || 46;
    var alto = Math.round(ancho * 1.96);
    return '<svg class="svg-psico svg-domino" viewBox="0 0 50 98" width="' + ancho + '" height="' + alto + '" role="img" aria-label="Ficha que falta">' +
      cuerpoIncognita(0) + "</svg>";
  }

  /* Fila de fichas; la posición «indiceIncognita» se dibuja como ficha en blanco */
  function fila(fichas, indiceIncognita, ancho) {
    return '<div class="fila-domino">' + fichas.map(function (f, i) {
      return i === indiceIncognita ? incognita(ancho) : ficha(f[0], f[1], ancho);
    }).join("") + "</div>";
  }

  /* Cuadro de varias filas (columnas fijas). Una casilla «null» queda vacía */
  function cuadro(fichas, columnas, indiceIncognita, ancho) {
    return '<div class="cuadro-domino" style="grid-template-columns:repeat(' + columnas + ',auto)">' + fichas.map(function (f, i) {
      if (f === null) return "<span></span>";
      return i === indiceIncognita ? incognita(ancho) : ficha(f[0], f[1], ancho);
    }).join("") + "</div>";
  }

  /* Cruz de cinco fichas en este orden: arriba, izquierda, centro, derecha, abajo */
  function cruz(fichas, indiceIncognita, ancho) {
    var casillas = [null, fichas[0], null, fichas[1], fichas[2], fichas[3], null, fichas[4], null];
    var indiceEnCasillas = [1, 3, 4, 5, 7][indiceIncognita];
    return cuadro(casillas, 3, indiceEnCasillas, ancho);
  }

  /* Rueda: fichas en círculo, con la mitad «a» hacia AFUERA y la «b» hacia el
     centro. La primera ficha queda arriba (marcada con un 1) y las demás siguen
     el sentido de las agujas del reloj. */
  function rueda(fichas, indiceIncognita, lado) {
    var n = fichas.length;
    var radio = n <= 6 ? 99 : 114;
    var c = radio + 49 + 8;
    var tam = c * 2;
    lado = lado || 300;
    var s = '<svg class="svg-psico svg-rueda-domino" viewBox="0 0 ' + tam + " " + tam + '" width="' + lado + '" height="' + lado + '" role="img" aria-label="Fichas de dominó en círculo">' +
      '<text x="' + c + '" y="' + (c + 3) + '" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="44" fill="#94a3b8">↻</text>';
    fichas.forEach(function (f, i) {
      var angulo = (360 * i) / n;
      s += '<g transform="rotate(' + angulo + " " + c + " " + c + ") translate(" + (c - 25) + "," + (c - radio - 49) + ')">' +
        (i === indiceIncognita ? cuerpoIncognita(-angulo) : cuerpoFicha(f[0], f[1])) + "</g>";
    });
    s += '<circle cx="' + (c - 42) + '" cy="17" r="11" fill="' + ACENTO + '"/>' +
      '<text x="' + (c - 42) + '" y="18" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="13" font-weight="800" fill="#ffffff">1</text>';
    return s + "</svg>";
  }

  return { ficha: ficha, incognita: incognita, fila: fila, cuadro: cuadro, cruz: cruz, rueda: rueda };
})();

/* ---------------------------------------------------------
   Generador de series de dominó (respuesta siempre calculada)
   Nivel 1: una sola mitad cambia de 1 en 1, sin dar la vuelta.
   Nivel 2: cambian las dos mitades, con vuelta 6 → 0, cadenas,
            alternancias y espejos.
   Nivel 3: saltos crecientes, sumas, cuadros de dos filas e
            incógnita en medio de la serie.
   --------------------------------------------------------- */
var GENERADOR_DOMINO = (function () {
  "use strict";

  function mod7(n) {
    return ((n % 7) + 7) % 7;
  }
  function entero(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
  function azar(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
  }
  function describirPaso(d) {
    if (d === 0) return "se mantiene igual";
    return (d > 0 ? "suma " : "resta ") + Math.abs(d) + " en cada ficha";
  }
  function lista(valores) {
    return valores.join(" → ");
  }
  function hayVuelta(valores, paso) {
    for (var i = 1; i < valores.length; i++) {
      if (paso > 0 && valores[i] < valores[i - 1]) return true;
      if (paso < 0 && valores[i] > valores[i - 1]) return true;
    }
    return false;
  }
  var NOTA_CICLO = " Recuerda que los valores son cíclicos: después del 6 viene el 0 (blanca) y antes del 0 está el 6.";

  /* ---- Familias de reglas: devuelven { fichas, incognita, explicacion, disposicion, columnas } ---- */

  function familiaLineal(nivel) {
    var n = 6, da, db, a0, b0, i;
    if (nivel === 1) {
      var pares = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];
      var par = azar(pares);
      da = par[0];
      db = par[1];
      a0 = da > 0 ? entero(0, 1) : (da < 0 ? entero(5, 6) : entero(0, 6));
      b0 = db > 0 ? entero(0, 1) : (db < 0 ? entero(5, 6) : entero(0, 6));
    } else {
      do {
        da = entero(-3, 3);
        db = entero(-3, 3);
      } while ((da === 0 && db === 0) || (Math.abs(da) <= 1 && Math.abs(db) <= 1));
      a0 = entero(0, 6);
      b0 = entero(0, 6);
    }
    var fichas = [];
    for (i = 0; i < n; i++) fichas.push([mod7(a0 + i * da), mod7(b0 + i * db)]);
    var arriba = fichas.map(function (f) { return f[0]; });
    var abajo = fichas.map(function (f) { return f[1]; });
    var vuelta = hayVuelta(arriba, da) || hayVuelta(abajo, db);
    var incognita = nivel === 3 ? entero(2, 4) : n - 1;
    return {
      fichas: fichas,
      incognita: incognita,
      explicacion: "Mira cada mitad por separado. Arriba: " + lista(arriba) + " (" + describirPaso(da) + "). Abajo: " + lista(abajo) + " (" + describirPaso(db) + ")." + (vuelta ? NOTA_CICLO : "")
    };
  }

  function familiaAlterna() {
    var x = entero(0, 6), y;
    do { y = entero(0, 6); } while (y === x);
    var db = azar([1, -1, 2, -2]);
    var b0 = entero(0, 6);
    var fichas = [];
    for (var i = 0; i < 6; i++) fichas.push([i % 2 === 0 ? x : y, mod7(b0 + i * db)]);
    var abajo = fichas.map(function (f) { return f[1]; });
    var arribaAlterna = Math.random() < 0.5;
    if (!arribaAlterna) fichas = fichas.map(function (f) { return [f[1], f[0]]; });
    return {
      fichas: fichas,
      incognita: 5,
      explicacion: (arribaAlterna ? "Arriba" : "Abajo") + " se alternan solo dos valores: " + x + ", " + y + ", " + x + ", " + y + "… " +
        (arribaAlterna ? "Abajo" : "Arriba") + ": " + lista(abajo) + " (" + describirPaso(db) + ")." + (hayVuelta(abajo, db) ? NOTA_CICLO : "")
    };
  }

  function familiaCadena() {
    var d = azar([1, 2, 3, -1, -2]);
    var a = entero(0, 6);
    var fichas = [];
    for (var i = 0; i < 6; i++) {
      var b = mod7(a + d);
      fichas.push([a, b]);
      a = b;
    }
    return {
      fichas: fichas,
      incognita: 5,
      explicacion: "Funciona como en el juego real: la mitad de arriba de cada ficha repite la mitad de abajo de la ficha anterior. Además, dentro de cada ficha la mitad de abajo " +
        (d > 0 ? "vale " + d + " más" : "vale " + Math.abs(d) + " menos") + " que la de arriba." + NOTA_CICLO
    };
  }

  function familiaEspejo() {
    var da = azar([1, 2, -1]);
    var a0 = entero(0, 6), b0 = entero(0, 6);
    var base = [];
    for (var i = 0; i < 3; i++) base.push([mod7(a0 + i * da), mod7(b0 + i * da)]);
    if (base[0][0] === base[0][1]) {
      base = base.map(function (f) { return [f[0], mod7(f[1] + 2)]; });
    }
    var fichas = base.concat([
      [base[2][1], base[2][0]],
      [base[1][1], base[1][0]],
      [base[0][1], base[0][0]]
    ]);
    return {
      fichas: fichas,
      incognita: 5,
      explicacion: "La segunda mitad de la fila es el espejo de la primera: las fichas 4, 5 y 6 repiten a las fichas 3, 2 y 1, pero volteadas (lo de arriba pasa abajo). La última es la primera ficha volteada."
    };
  }

  function familiaCreciente() {
    var a0 = entero(0, 6), b0 = entero(0, 6);
    var db = azar([0, 1, -1]);
    var fichas = [];
    var a = a0;
    for (var i = 0; i < 6; i++) {
      if (i > 0) a = mod7(a + i);
      fichas.push([a, mod7(b0 + i * db)]);
    }
    var arriba = fichas.map(function (f) { return f[0]; });
    var abajo = fichas.map(function (f) { return f[1]; });
    var invertir = Math.random() < 0.5;
    if (invertir) fichas = fichas.map(function (f) { return [f[1], f[0]]; });
    return {
      fichas: fichas,
      incognita: 5,
      explicacion: (invertir ? "Abajo" : "Arriba") + " el salto va creciendo: +1, +2, +3, +4 y +5 (" + lista(arriba) + "). " +
        (invertir ? "Arriba" : "Abajo") + ": " + lista(abajo) + " (" + describirPaso(db) + ")." + NOTA_CICLO
    };
  }

  function familiaSuma() {
    var a = entero(0, 3), b = entero(1, 3);
    var fichas = [[a, b]];
    for (var i = 1; i < 6; i++) {
      var previa = fichas[i - 1];
      fichas.push([previa[1], mod7(previa[0] + previa[1])]);
    }
    return {
      fichas: fichas,
      incognita: 5,
      explicacion: "Cada ficha se arma con la anterior: arriba va lo que la anterior tenía abajo, y abajo va la SUMA de las dos mitades de la anterior (si la suma pasa de 6, se le resta 7). Para la última: arriba " +
        fichas[4][1] + " y abajo " + fichas[4][0] + " + " + fichas[4][1] + " = " + (fichas[4][0] + fichas[4][1]) +
        (fichas[4][0] + fichas[4][1] > 6 ? " → " + mod7(fichas[4][0] + fichas[4][1]) : "") + "."
    };
  }

  /* Cuadro de 2 o 3 filas por 3 columnas; falta la última ficha (abajo a la derecha) */
  function familiaCuadro(filas) {
    var da = azar([1, 2, -1]), db = azar([0, 1, -1, 2]);
    var ka, kb;
    do {
      ka = azar([0, 1, 2, 3, -1]);
      kb = azar([0, 1, 2, -1, -2]);
    } while (ka === 0 && kb === 0);
    var a0 = entero(0, 6), b0 = entero(0, 6);
    var fichas = [];
    for (var fila = 0; fila < filas; fila++) {
      for (var col = 0; col < 3; col++) {
        fichas.push([mod7(a0 + col * da + fila * ka), mod7(b0 + col * db + fila * kb)]);
      }
    }
    return {
      fichas: fichas,
      incognita: fichas.length - 1,
      disposicion: "cuadro",
      columnas: 3,
      explicacion: "Se lee por filas y por columnas. En cada fila, de izquierda a derecha: arriba " + describirPaso(da) + " y abajo " + describirPaso(db) +
        ". Al bajar de una fila a la siguiente (misma columna): arriba " + describirPaso(ka).replace(" en cada ficha", "") + " y abajo " + describirPaso(kb).replace(" en cada ficha", "") + "." + NOTA_CICLO
    };
  }

  function familiaCuadro2() {
    return familiaCuadro(2);
  }

  function familiaCuadro3() {
    return familiaCuadro(3);
  }

  /* Cruz: la fila horizontal y la columna vertical son dos series distintas
     que comparten la ficha del centro. Falta la ficha de la derecha o la de abajo. */
  function familiaCruz() {
    var pasos = [1, 2, -1, -2, 0];
    var h, v;
    do {
      h = [azar(pasos), azar(pasos)];
    } while (h[0] === 0 && h[1] === 0);
    do {
      v = [azar(pasos), azar(pasos)];
    } while ((v[0] === 0 && v[1] === 0) || (v[0] === h[0] && v[1] === h[1]));
    var centro = [entero(0, 6), entero(0, 6)];
    var izquierda = [mod7(centro[0] - h[0]), mod7(centro[1] - h[1])];
    var derecha = [mod7(centro[0] + h[0]), mod7(centro[1] + h[1])];
    var arriba = [mod7(centro[0] - v[0]), mod7(centro[1] - v[1])];
    var abajo = [mod7(centro[0] + v[0]), mod7(centro[1] + v[1])];
    var faltaDerecha = Math.random() < 0.5;
    return {
      fichas: [arriba, izquierda, centro, derecha, abajo],
      incognita: faltaDerecha ? 3 : 4,
      disposicion: "cruz",
      explicacion: "La cruz tiene dos series que comparten la ficha del centro. Fila horizontal (izquierda → centro → derecha): mitad superior " +
        lista([izquierda[0], centro[0], derecha[0]]) + " (" + describirPaso(h[0]) + ") y mitad inferior " +
        lista([izquierda[1], centro[1], derecha[1]]) + " (" + describirPaso(h[1]) + "). Columna vertical (arriba → centro → abajo): mitad superior " +
        lista([arriba[0], centro[0], abajo[0]]) + " (" + describirPaso(v[0]) + ") y mitad inferior " +
        lista([arriba[1], centro[1], abajo[1]]) + " (" + describirPaso(v[1]) + "). La serie completa te muestra que el salto es constante; aplica el salto de la otra serie a la ficha que falta." + NOTA_CICLO
    };
  }

  /* Rueda de seis fichas. Dos variantes: progresión en el sentido del reloj,
     o fichas opuestas iguales pero volteadas. */
  function familiaRueda() {
    var n = 6;
    var fichas = [];
    var i;

    if (Math.random() < 0.6) {
      var pasos = [1, 2, -1, -2, 0];
      var da, db;
      do {
        da = azar(pasos);
        db = azar(pasos);
      } while (da === 0 && db === 0);
      var a0 = entero(0, 6), b0 = entero(0, 6);
      for (i = 0; i < n; i++) fichas.push([mod7(a0 + i * da), mod7(b0 + i * db)]);
      var afuera = fichas.map(function (f) { return f[0]; });
      var adentro = fichas.map(function (f) { return f[1]; });
      return {
        fichas: fichas,
        incognita: n - 1,
        disposicion: "rueda",
        explicacion: "Empieza en la ficha marcada con el 1 y gira como las agujas del reloj. Mitad de AFUERA: " + lista(afuera) + " (" + describirPaso(da) +
          "). Mitad de ADENTRO: " + lista(adentro) + " (" + describirPaso(db) + ")." + (hayVuelta(afuera, da) || hayVuelta(adentro, db) ? NOTA_CICLO : "")
      };
    }

    /* Tres fichas distintas, ninguna doble; enfrente de cada una va la misma volteada */
    var usadas = {};
    while (fichas.length < 3) {
      var a = entero(0, 6), b = entero(0, 6);
      if (a === b || usadas[a + "/" + b] || usadas[b + "/" + a]) continue;
      usadas[a + "/" + b] = true;
      fichas.push([a, b]);
    }
    fichas = fichas.concat(fichas.map(function (f) { return [f[1], f[0]]; }));
    var incognita = entero(3, 5);
    var opuesta = fichas[incognita - 3];
    return {
      fichas: fichas,
      incognita: incognita,
      disposicion: "rueda",
      explicacion: "Aquí no hay una progresión: cada ficha tiene ENFRENTE (al otro lado del círculo) la misma ficha, pero volteada; lo que una tiene afuera, la de enfrente lo tiene adentro. Compruébalo con los otros dos pares. La ficha que falta está frente a la que tiene " +
        opuesta[0] + " afuera y " + opuesta[1] + " adentro, así que lleva " + opuesta[1] + " afuera y " + opuesta[0] + " adentro."
    };
  }

  var FAMILIAS = {
    1: [familiaLineal],
    2: [familiaLineal, familiaLineal, familiaAlterna, familiaCadena, familiaEspejo],
    3: [familiaLineal, familiaCreciente, familiaSuma, familiaCuadro2, familiaCuadro3, familiaCruz, familiaRueda, familiaRueda]
  };

  /* Tres fichas incorrectas pero creíbles, todas distintas entre sí */
  function distractores(a, b) {
    var candidatos = [
      [a, mod7(b + 1)],
      [mod7(a + 1), b],
      [b, a],
      [a, mod7(b - 1)],
      [mod7(a - 1), b],
      [mod7(a + 1), mod7(b + 1)],
      [mod7(a - 1), mod7(b - 1)]
    ];
    var usados = {};
    usados[a + "/" + b] = true;
    var mezclados = candidatos.slice().sort(function () { return Math.random() - 0.5; });
    var salida = [];
    for (var i = 0; i < mezclados.length && salida.length < 3; i++) {
      var clave = mezclados[i][0] + "/" + mezclados[i][1];
      if (!usados[clave]) {
        usados[clave] = true;
        salida.push(mezclados[i]);
      }
    }
    return salida;
  }

  var contador = 0;

  function crearPregunta(nivel) {
    var serie = azar(FAMILIAS[nivel])(nivel);
    var respuesta = serie.fichas[serie.incognita];
    var malas = distractores(respuesta[0], respuesta[1]);
    var posicionCorrecta = entero(0, 3);
    var fichasOpcion = malas.slice();
    fichasOpcion.splice(posicionCorrecta, 0, respuesta);

    var enunciado;
    var figuraHtml;
    var cierre = " Ficha correcta: " + respuesta[0] + " arriba y " + respuesta[1] + " abajo.";
    if (serie.disposicion === "cuadro") {
      enunciado = "Observa el cuadro de fichas (se lee por filas y por columnas). ¿Qué ficha va en el lugar del signo de interrogación?";
      figuraHtml = FIG_DOMINO.cuadro(serie.fichas, serie.columnas, serie.incognita, 46);
    } else if (serie.disposicion === "cruz") {
      enunciado = "Las fichas forman una cruz: la fila horizontal y la columna vertical son dos series distintas que comparten la ficha del centro. ¿Qué ficha falta?";
      figuraHtml = FIG_DOMINO.cruz(serie.fichas, serie.incognita, 46);
    } else if (serie.disposicion === "rueda") {
      enunciado = "Las fichas forman un círculo: la primera está marcada con un 1 y el orden sigue las agujas del reloj. ¿Qué ficha falta?\nEn las opciones, la mitad de ARRIBA es la que queda hacia AFUERA del círculo y la de ABAJO, la que mira al centro.";
      figuraHtml = FIG_DOMINO.rueda(serie.fichas, serie.incognita, 300);
      cierre = " Ficha correcta: " + respuesta[0] + " afuera y " + respuesta[1] + " adentro (en las opciones, " + respuesta[0] + " arriba y " + respuesta[1] + " abajo).";
    } else {
      enunciado = serie.incognita === serie.fichas.length - 1
        ? "¿Qué ficha continúa la serie?"
        : "Falta una ficha en medio de la serie. ¿Cuál es?";
      figuraHtml = FIG_DOMINO.fila(serie.fichas, serie.incognita, 46);
    }

    contador += 1;
    return {
      id: "dom-" + contador,
      cat: "domino",
      nivelDomino: nivel,
      enunciado: enunciado,
      figuraHtml: figuraHtml,
      esOpcionHtml: true,
      opciones: fichasOpcion.map(function (f) { return FIG_DOMINO.ficha(f[0], f[1], 42); }),
      correcta: posicionCorrecta,
      explicacion: serie.explicacion + cierre,
      datosDomino: { fichas: serie.fichas, incognita: serie.incognita, opciones: fichasOpcion, disposicion: serie.disposicion || "fila" }
    };
  }

  /* Devuelve «cantidad» preguntas repartidas en dificultad creciente */
  function generar(cantidad, reparto) {
    reparto = reparto || [0.3, 0.4, 0.3];
    var n1 = Math.round(cantidad * reparto[0]);
    var n2 = Math.round(cantidad * reparto[1]);
    var n3 = Math.max(0, cantidad - n1 - n2);
    var salida = [];
    var i;
    for (i = 0; i < n1; i++) salida.push(crearPregunta(1));
    for (i = 0; i < n2; i++) salida.push(crearPregunta(2));
    for (i = 0; i < n3; i++) salida.push(crearPregunta(3));
    return salida;
  }

  return { generar: generar, crearPregunta: crearPregunta };
})();

/* ---------------------------------------------------------
   Preguntas de letras y palabras: 10 formatos × 4 preguntas
   (el campo «verif» solo sirve para la comprobación automática)
   --------------------------------------------------------- */
var TIPOS_LETRAS = [
  {
    id: "posicion",
    nombre: "Mismo lugar en la palabra y en el alfabeto",
    comoSeVe: "«¿Qué letra de la palabra SALDO ocupa en la palabra el mismo lugar que ocupa en el alfabeto?»",
    comoSeResuelve: "Numera las letras de la palabra (1.ª, 2.ª, 3.ª…) y recita el alfabeto con sus números (A=1, B=2, C=3, D=4, E=5…). Busca la letra cuyo número coincide en los dos lados."
  },
  {
    id: "ordenar",
    nombre: "Ordenar alfabéticamente las letras de una palabra",
    comoSeVe: "«Si ordenas alfabéticamente las letras de la palabra QUESO, ¿qué letra queda en el tercer lugar?»",
    comoSeResuelve: "Escribe las letras de la palabra en orden de abecedario (E, O, Q, S, U) y cuenta hasta el lugar que te piden."
  },
  {
    id: "puente",
    nombre: "Letra que termina una palabra y empieza otra",
    comoSeVe: "«¿Qué letra, puesta en el paréntesis, termina la primera palabra y empieza la segunda?  SALU ( ) EDO»",
    comoSeResuelve: "Prueba cada opción en las dos partes a la vez: SALU + D = SALUD y D + EDO = DEDO. Solo sirve la que forma dos palabras reales."
  },
  {
    id: "anagrama",
    nombre: "Palabra desordenada (anagrama)",
    comoSeVe: "«Ordena las letras O-S-E-Q-U para formar el nombre de un alimento. ¿Con qué letra termina?»",
    comoSeResuelve: "Usa la pista (alimento, lugar, persona…) para armar la palabra, escríbela y luego fíjate en la letra que te piden: la primera, la última o la del centro."
  },
  {
    id: "frase",
    nombre: "Frase desordenada: letra inicial de una palabra",
    comoSeVe: "«Si ordenas estas palabras para formar una oración, ¿con qué letra empieza la última palabra?  billetes – contó – cajero – los – el»",
    comoSeResuelve: "Arma la oración normal (sujeto + verbo + complemento), cuenta las palabras hasta la que te piden y responde solo con su primera letra."
  },
  {
    id: "clave",
    nombre: "Claves y códigos con letras",
    comoSeVe: "«En una clave, QUESO se escribe 1-2-3-4-5. ¿Cómo se escribe USO?»",
    comoSeResuelve: "Haz la tabla de equivalencias letra por letra (Q=1, U=2, E=3, S=4, O=5) y traduce la palabra nueva una letra a la vez."
  },
  {
    id: "falta",
    nombre: "Letra que falta en la palabra",
    comoSeVe: "«¿Qué letra falta para que la palabra quede bien escrita?  TRAN_ACCIÓN»",
    comoSeResuelve: "Es ortografía pura: piensa en la familia de la palabra (transar, transacción) y en la regla de esa letra (s/c/z, b/v, g/j, h, x)."
  },
  {
    id: "serie",
    nombre: "Series de letras",
    comoSeVe: "«¿Qué letra continúa la serie?  A, C, E, G, ___»",
    comoSeResuelve: "Cambia cada letra por su número (A=1, C=3, E=5, G=7), descubre el salto y vuelve a convertir el número en letra. Si hay dos series mezcladas, sepáralas."
  },
  {
    id: "alfabeto",
    nombre: "Instrucciones sobre el alfabeto",
    comoSeVe: "«¿Qué letra va tres lugares después de la letra que sigue a la D?»",
    comoSeResuelve: "Resuelve la instrucción de atrás hacia adelante y por partes: primero «la que sigue a la D» (E) y luego cuenta tres lugares (F, G, H)."
  },
  {
    id: "archivo",
    nombre: "Orden de diccionario y archivo por letras",
    comoSeVe: "«Un archivo tiene gavetas A (A–F), B (G–L), C (M–R) y D (S–Z). ¿En cuál va el expediente de QUEZADA?»",
    comoSeResuelve: "Compara letra por letra desde la primera; si empatan, pasa a la segunda, y así. En el archivo solo importa la inicial del apellido y en qué rango cae."
  }
];

var PREGUNTAS_LETRAS = [
  /* --- 1. Mismo lugar en la palabra y en el alfabeto --- */
  {
    id: "let-01", cat: "letras", tipoLetra: "posicion",
    enunciado: "¿Qué letra de la palabra SALDO ocupa, dentro de la palabra, el MISMO lugar que ocupa en el alfabeto?",
    opciones: ["S", "A", "L", "D"], correcta: 3,
    explicacion: "Numera la palabra: S(1) A(2) L(3) D(4) O(5). En el alfabeto: A=1, B=2, C=3, D=4, E=5… La D es la 4.ª letra de SALDO y también la 4.ª del alfabeto. La A no sirve: en la palabra está en el lugar 2 y en el alfabeto es la 1.ª.",
    verif: { tipo: "posicion", palabra: "SALDO", letra: "D" }
  },
  {
    id: "let-02", cat: "letras", tipoLetra: "posicion",
    enunciado: "¿Qué letra de la palabra TARJETA está en la palabra en el mismo lugar que tiene en el alfabeto?",
    opciones: ["T", "A", "J", "E"], correcta: 3,
    explicacion: "T(1) A(2) R(3) J(4) E(5) T(6) A(7). La E es la 5.ª letra de TARJETA y también la 5.ª letra del alfabeto (A, B, C, D, E).",
    verif: { tipo: "posicion", palabra: "TARJETA", letra: "E" }
  },
  {
    id: "let-03", cat: "letras", tipoLetra: "posicion",
    enunciado: "¿Qué letra de la palabra PLANIFICAR ocupa en ella el mismo número de lugar que en el alfabeto?",
    opciones: ["P", "A", "F", "C"], correcta: 2,
    explicacion: "P(1) L(2) A(3) N(4) I(5) F(6) I(7) C(8) A(9) R(10). La F es la 6.ª letra de la palabra y la 6.ª del alfabeto (A, B, C, D, E, F). La C es la 3.ª del alfabeto, pero en la palabra está en el lugar 8.",
    verif: { tipo: "posicion", palabra: "PLANIFICAR", letra: "F" }
  },
  {
    id: "let-04", cat: "letras", tipoLetra: "posicion",
    enunciado: "¿Qué letra de la palabra CONTABILIDAD ocupa en la palabra el mismo lugar que ocupa en el alfabeto?",
    opciones: ["C", "B", "I", "D"], correcta: 2,
    explicacion: "C(1) O(2) N(3) T(4) A(5) B(6) I(7) L(8) I(9) D(10) A(11) D(12). La segunda I está en el lugar 9 y la I es la 9.ª letra del alfabeto (A, B, C, D, E, F, G, H, I).",
    verif: { tipo: "posicion", palabra: "CONTABILIDAD", letra: "I" }
  },

  /* --- 2. Ordenar alfabéticamente las letras de una palabra --- */
  {
    id: "let-05", cat: "letras", tipoLetra: "ordenar",
    enunciado: "Si ordenas alfabéticamente las letras de la palabra QUESO, ¿qué letra queda en el TERCER lugar?",
    opciones: ["E", "O", "Q", "S"], correcta: 2,
    explicacion: "Las letras de QUESO en orden de abecedario son E, O, Q, S, U. La tercera es la Q.",
    verif: { tipo: "ordenar", palabra: "QUESO", lugar: 3, letra: "Q" }
  },
  {
    id: "let-06", cat: "letras", tipoLetra: "ordenar",
    enunciado: "Si las letras de la palabra BANCO se colocan en orden alfabético, ¿cuál queda en el CUARTO lugar?",
    opciones: ["B", "C", "N", "O"], correcta: 2,
    explicacion: "En orden alfabético: A, B, C, N, O. La cuarta letra es la N.",
    verif: { tipo: "ordenar", palabra: "BANCO", lugar: 4, letra: "N" }
  },
  {
    id: "let-07", cat: "letras", tipoLetra: "ordenar",
    enunciado: "Ordena alfabéticamente las letras de la palabra FIRMA. ¿Qué letra queda en el SEGUNDO lugar?",
    opciones: ["A", "F", "I", "M"], correcta: 1,
    explicacion: "En orden alfabético: A, F, I, M, R. La segunda letra es la F.",
    verif: { tipo: "ordenar", palabra: "FIRMA", lugar: 2, letra: "F" }
  },
  {
    id: "let-08", cat: "letras", tipoLetra: "ordenar",
    enunciado: "Si ordenas alfabéticamente las letras de la palabra DINERO, ¿qué letra ocupa el QUINTO lugar?",
    opciones: ["I", "N", "O", "R"], correcta: 2,
    explicacion: "En orden alfabético: D, E, I, N, O, R. La quinta letra es la O.",
    verif: { tipo: "ordenar", palabra: "DINERO", lugar: 5, letra: "O" }
  },

  /* --- 3. Letra que termina una palabra y empieza otra --- */
  {
    id: "let-09", cat: "letras", tipoLetra: "puente",
    enunciado: "¿Qué letra, colocada dentro del paréntesis, TERMINA la primera palabra y EMPIEZA la segunda?\nSALU ( ) EDO",
    opciones: ["D", "T", "S", "R"], correcta: 0,
    explicacion: "Con la D se forman dos palabras: SALU + D = SALUD y D + EDO = DEDO. Con las otras letras no sale ninguna palabra real.",
    verif: { tipo: "puente", inicio: "SALU", fin: "EDO", letra: "D", palabras: ["SALUD", "DEDO"] }
  },
  {
    id: "let-10", cat: "letras", tipoLetra: "puente",
    enunciado: "¿Qué letra, puesta en el paréntesis, completa la primera palabra y comienza la segunda?\nRELO ( ) UEZ",
    opciones: ["G", "J", "S", "N"], correcta: 1,
    explicacion: "Con la J: RELO + J = RELOJ y J + UEZ = JUEZ.",
    verif: { tipo: "puente", inicio: "RELO", fin: "UEZ", letra: "J", palabras: ["RELOJ", "JUEZ"] }
  },
  {
    id: "let-11", cat: "letras", tipoLetra: "puente",
    enunciado: "¿Qué letra termina la primera palabra y empieza la segunda?\nPAPE ( ) UNA",
    opciones: ["R", "C", "L", "S"], correcta: 2,
    explicacion: "Con la L: PAPE + L = PAPEL y L + UNA = LUNA. «CUNA» existe, pero «PAPEC» no; la letra tiene que servir para las dos palabras.",
    verif: { tipo: "puente", inicio: "PAPE", fin: "UNA", letra: "L", palabras: ["PAPEL", "LUNA"] }
  },
  {
    id: "let-12", cat: "letras", tipoLetra: "puente",
    enunciado: "¿Qué letra, colocada en el paréntesis, termina la primera palabra y empieza la segunda?\nTRE ( ) OPA",
    opciones: ["N", "C", "R", "S"], correcta: 3,
    explicacion: "Con la S: TRE + S = TRES y S + OPA = SOPA. «TREN» existe, pero «NOPA» no; «COPA» y «ROPA» existen, pero «TREC» y «TRER» no.",
    verif: { tipo: "puente", inicio: "TRE", fin: "OPA", letra: "S", palabras: ["TRES", "SOPA"] }
  },

  /* --- 4. Palabra desordenada (anagrama) --- */
  {
    id: "let-13", cat: "letras", tipoLetra: "anagrama",
    enunciado: "Ordena las letras O – S – E – Q – U para formar el nombre de un alimento. ¿Con qué letra TERMINA esa palabra?",
    opciones: ["Q", "U", "S", "O"], correcta: 3,
    explicacion: "Las letras forman la palabra QUESO, que termina en O.",
    verif: { tipo: "anagrama", letras: "OSEQU", palabra: "QUESO", lugar: 5, letra: "O" }
  },
  {
    id: "let-14", cat: "letras", tipoLetra: "anagrama",
    enunciado: "Ordena las letras N – A – C – O – B para formar el nombre del lugar donde se guarda y se presta dinero. ¿Con qué letra EMPIEZA esa palabra?",
    opciones: ["B", "N", "C", "A"], correcta: 0,
    explicacion: "Las letras forman la palabra BANCO, que empieza con B.",
    verif: { tipo: "anagrama", letras: "NACOB", palabra: "BANCO", lugar: 1, letra: "B" }
  },
  {
    id: "let-15", cat: "letras", tipoLetra: "anagrama",
    enunciado: "Ordena las letras R – E – C – A – J – O para formar el nombre de la persona que atiende en la ventanilla del banco. ¿Cuál es la TERCERA letra de esa palabra?",
    opciones: ["C", "J", "R", "E"], correcta: 1,
    explicacion: "Las letras forman la palabra CAJERO: C(1) A(2) J(3) E(4) R(5) O(6). La tercera letra es la J.",
    verif: { tipo: "anagrama", letras: "RECAJO", palabra: "CAJERO", lugar: 3, letra: "J" }
  },
  {
    id: "let-16", cat: "letras", tipoLetra: "anagrama",
    enunciado: "Ordena las letras Z – A – L – O – P para formar la palabra que significa «tiempo acordado para pagar una deuda». ¿Qué letra queda en el CENTRO de la palabra?",
    opciones: ["L", "A", "Z", "P"], correcta: 1,
    explicacion: "Las letras forman la palabra PLAZO: P(1) L(2) A(3) Z(4) O(5). La letra del centro es la A.",
    verif: { tipo: "anagrama", letras: "ZALOP", palabra: "PLAZO", lugar: 3, letra: "A" }
  },

  /* --- 5. Frase desordenada: letra inicial de una palabra --- */
  {
    id: "let-17", cat: "letras", tipoLetra: "frase",
    enunciado: "Si ordenas estas palabras para formar una oración normal (sujeto + verbo + complemento), ¿con qué letra empieza la ÚLTIMA palabra?\nbilletes – contó – cajero – los – el",
    opciones: ["B", "C", "E", "L"], correcta: 0,
    explicacion: "La oración es «El cajero contó los billetes». La última palabra es «billetes», que empieza con B.",
    verif: { tipo: "frase", oracion: "El cajero contó los billetes", lugar: 5, letra: "B" }
  },
  {
    id: "let-18", cat: "letras", tipoLetra: "frase",
    enunciado: "Si colocas estas palabras en orden para formar una oración normal, ¿con qué letra empieza la ÚLTIMA palabra?\nmeses – doce – año – el – tiene",
    opciones: ["A", "T", "D", "M"], correcta: 3,
    explicacion: "La oración es «El año tiene doce meses». La última palabra es «meses», que empieza con M.",
    verif: { tipo: "frase", oracion: "El año tiene doce meses", lugar: 5, letra: "M" }
  },
  {
    id: "let-19", cat: "letras", tipoLetra: "frase",
    enunciado: "Si ordenas estas palabras para formar una oración normal, ¿con qué letra empieza la SEGUNDA palabra?\ndocumentos – firmó – cliente – tres – el",
    opciones: ["C", "F", "T", "D"], correcta: 0,
    explicacion: "La oración es «El cliente firmó tres documentos». La segunda palabra es «cliente», que empieza con C.",
    verif: { tipo: "frase", oracion: "El cliente firmó tres documentos", lugar: 2, letra: "C" }
  },
  {
    id: "let-20", cat: "letras", tipoLetra: "frase",
    enunciado: "Si ordenas estas palabras para formar una oración normal, ¿con qué letra empieza la TERCERA palabra?\nedad – crecen – los – con – niños – la",
    opciones: ["L", "N", "C", "E"], correcta: 2,
    explicacion: "La oración es «Los niños crecen con la edad». La tercera palabra es «crecen», que empieza con C.",
    verif: { tipo: "frase", oracion: "Los niños crecen con la edad", lugar: 3, letra: "C" }
  },

  /* --- 6. Claves y códigos con letras --- */
  {
    id: "let-21", cat: "letras", tipoLetra: "clave",
    enunciado: "En una clave, la palabra QUESO se escribe 1-2-3-4-5 (cada letra tiene su número). Con la misma clave, ¿cómo se escribe la palabra USO?",
    opciones: ["2-4-5", "2-3-5", "4-2-5", "2-5-4"], correcta: 0,
    explicacion: "La tabla es Q=1, U=2, E=3, S=4, O=5. Entonces USO = U(2) S(4) O(5) = 2-4-5.",
    verif: { tipo: "claveNumeros", base: "QUESO", palabra: "USO", respuesta: "2-4-5" }
  },
  {
    id: "let-22", cat: "letras", tipoLetra: "clave",
    enunciado: "En cierta clave cada letra se reemplaza por la que le SIGUE en el alfabeto; por eso CAJA se escribe DBKB. Con la misma clave, ¿cómo se escribe DEDO?",
    opciones: ["EFEP", "EFEO", "FGFQ", "DFEP"], correcta: 0,
    explicacion: "Avanza una letra cada vez: D→E, E→F, D→E, O→P. Resultado: EFEP.",
    verif: { tipo: "claveSiguiente", palabra: "DEDO", respuesta: "EFEP" }
  },
  {
    id: "let-23", cat: "letras", tipoLetra: "clave",
    enunciado: "Si A=1, B=2, C=3, D=4 y E=5, ¿qué palabra forman los números 2-5-3-1?",
    opciones: ["CEBA", "BECA", "CABE", "BACA"], correcta: 1,
    explicacion: "2=B, 5=E, 3=C, 1=A. La palabra es BECA.",
    verif: { tipo: "claveAlfabeto", numeros: [2, 5, 3, 1], respuesta: "BECA" }
  },
  {
    id: "let-24", cat: "letras", tipoLetra: "clave",
    enunciado: "En una clave, cada VOCAL se cambia por la vocal siguiente (A→E, E→I, I→O, O→U, U→A) y las consonantes no cambian. ¿Cómo se escribe QUESO?",
    opciones: ["QEISU", "QAOSU", "QAISU", "QUISO"], correcta: 2,
    explicacion: "Q se queda igual; U→A; E→I; S se queda igual; O→U. Resultado: QAISU.",
    verif: { tipo: "claveVocales", palabra: "QUESO", respuesta: "QAISU" }
  },

  /* --- 7. Letra que falta en la palabra --- */
  {
    id: "let-25", cat: "letras", tipoLetra: "falta",
    enunciado: "¿Qué letra falta para que la palabra quede bien escrita?\nTRAN_ACCIÓN (operación bancaria)",
    opciones: ["S", "Z", "C", "X"], correcta: 0,
    explicacion: "Se escribe TRANSACCIÓN: con el prefijo trans- (con s) y luego cc.",
    verif: { tipo: "falta", patron: "TRAN_ACCIÓN", letra: "S", palabra: "TRANSACCIÓN" }
  },
  {
    id: "let-26", cat: "letras", tipoLetra: "falta",
    enunciado: "¿Qué letra falta para que la palabra quede bien escrita?\nE_CEPCIÓN (caso que se aparta de la regla)",
    opciones: ["S", "X", "C", "Z"], correcta: 1,
    explicacion: "Se escribe EXCEPCIÓN: lleva x y después c (ex-cep-ción).",
    verif: { tipo: "falta", patron: "E_CEPCIÓN", letra: "X", palabra: "EXCEPCIÓN" }
  },
  {
    id: "let-27", cat: "letras", tipoLetra: "falta",
    enunciado: "¿Qué letra falta para que la palabra quede bien escrita?\nIN_ERSIÓN (colocación de dinero para obtener ganancias)",
    opciones: ["B", "F", "V", "M"], correcta: 2,
    explicacion: "Se escribe INVERSIÓN: después de n siempre se escribe v (invertir, invierno, enviar).",
    verif: { tipo: "falta", patron: "IN_ERSIÓN", letra: "V", palabra: "INVERSIÓN" }
  },
  {
    id: "let-28", cat: "letras", tipoLetra: "falta",
    enunciado: "¿Qué letra falta para que la palabra quede bien escrita?\nGARA_E (lugar donde se guarda el vehículo)",
    opciones: ["G", "Y", "H", "J"], correcta: 3,
    explicacion: "Se escribe GARAJE: las palabras terminadas en -aje se escriben con j (mensaje, viaje, garaje).",
    verif: { tipo: "falta", patron: "GARA_E", letra: "J", palabra: "GARAJE" }
  },

  /* --- 8. Series de letras --- */
  {
    id: "let-29", cat: "letras", tipoLetra: "serie",
    enunciado: "¿Qué letra continúa la serie?\nA, C, E, G, ___",
    opciones: ["H", "I", "J", "K"], correcta: 1,
    explicacion: "La serie salta una letra cada vez: A (b) C (d) E (f) G (h) I. En números: 1, 3, 5, 7, 9.",
    verif: { tipo: "serie", serie: ["A", "C", "E", "G"], respuesta: "I" }
  },
  {
    id: "let-30", cat: "letras", tipoLetra: "serie",
    enunciado: "¿Qué letra continúa la serie?\nM, K, I, G, ___",
    opciones: ["F", "E", "D", "H"], correcta: 1,
    explicacion: "La serie retrocede de dos en dos: M (l) K (j) I (h) G (f) E. En números: 13, 11, 9, 7, 5.",
    verif: { tipo: "serie", serie: ["M", "K", "I", "G"], respuesta: "E" }
  },
  {
    id: "let-31", cat: "letras", tipoLetra: "serie",
    enunciado: "¿Qué letra continúa la serie?\nA, N, B, M, C, L, ___",
    opciones: ["D", "K", "E", "M"], correcta: 0,
    explicacion: "Hay dos series mezcladas: en los lugares impares A, B, C… (avanza) y en los pares N, M, L… (retrocede). El séptimo lugar es impar, así que sigue la D.",
    verif: { tipo: "serieDoble", serie: ["A", "N", "B", "M", "C", "L"], respuesta: "D" }
  },
  {
    id: "let-32", cat: "letras", tipoLetra: "serie",
    enunciado: "¿Qué par de letras continúa la serie?\nAB, DE, GH, JK, ___",
    opciones: ["LM", "MN", "KL", "NO"], correcta: 1,
    explicacion: "Cada grupo toma dos letras seguidas y se salta una: AB (c) DE (f) GH (i) JK (l) MN.",
    verif: { tipo: "seriePares", serie: ["AB", "DE", "GH", "JK"], respuesta: "MN" }
  },

  /* --- 9. Instrucciones sobre el alfabeto --- */
  {
    id: "let-33", cat: "letras", tipoLetra: "alfabeto",
    enunciado: "¿Qué letra está exactamente en el MEDIO entre la F y la L en el alfabeto?",
    opciones: ["H", "I", "J", "K"], correcta: 1,
    explicacion: "Entre la F y la L están G, H, I, J, K. La del medio es la I (tres lugares después de la F y tres antes de la L).",
    verif: { tipo: "medio", desde: "F", hasta: "L", respuesta: "I" }
  },
  {
    id: "let-34", cat: "letras", tipoLetra: "alfabeto",
    enunciado: "¿Qué letra va TRES lugares después de la letra que sigue a la D en el alfabeto?",
    opciones: ["F", "G", "H", "I"], correcta: 2,
    explicacion: "Primero: la letra que sigue a la D es la E. Después cuenta tres lugares desde la E: F, G, H. La respuesta es la H.",
    verif: { tipo: "desplazar", desde: "D", pasos: [1, 3], respuesta: "H" }
  },
  {
    id: "let-35", cat: "letras", tipoLetra: "alfabeto",
    enunciado: "¿Qué letra está DOS lugares antes de la letra que queda en el medio entre la A y la K?",
    opciones: ["C", "D", "E", "F"], correcta: 1,
    explicacion: "Entre la A y la K la letra del medio es la F (A B C D E F G H I J K). Dos lugares antes de la F está la D.",
    verif: { tipo: "medioYDesplazar", desde: "A", hasta: "K", paso: -2, respuesta: "D" }
  },
  {
    id: "let-36", cat: "letras", tipoLetra: "alfabeto",
    enunciado: "Si A=1, B=2, C=3 y así sucesivamente, ¿qué letra tiene el valor de 2 × 4?",
    opciones: ["F", "G", "H", "I"], correcta: 2,
    explicacion: "2 × 4 = 8, y la octava letra del alfabeto es la H (A, B, C, D, E, F, G, H).",
    verif: { tipo: "valor", numero: 8, respuesta: "H" }
  },

  /* --- 10. Orden de diccionario y archivo por letras --- */
  {
    id: "let-37", cat: "letras", tipoLetra: "archivo",
    enunciado: "¿Cuál de estas palabras aparece PRIMERO en el diccionario?",
    opciones: ["cuenta", "cuota", "crédito", "cuadre"], correcta: 2,
    explicacion: "Todas empiezan con c; se compara la segunda letra: la r de «crédito» va antes que la u de las demás. Orden completo: crédito, cuadre, cuenta, cuota.",
    verif: { tipo: "diccionario", lugar: 1, respuesta: "crédito" }
  },
  {
    id: "let-38", cat: "letras", tipoLetra: "archivo",
    enunciado: "¿Cuál de estas palabras aparece ÚLTIMA en el diccionario?",
    opciones: ["saldo", "salario", "salida", "salón"], correcta: 3,
    explicacion: "Todas empiezan con «sal»; se compara la cuarta letra: a (salario), d (saldo), i (salida) y o (salón). La o es la última, así que «salón» va al final.",
    verif: { tipo: "diccionario", lugar: 4, respuesta: "salón" }
  },
  {
    id: "let-39", cat: "letras", tipoLetra: "archivo",
    enunciado: "Un archivo tiene cuatro gavetas según la inicial del apellido: gaveta A (de la A a la F), gaveta B (de la G a la L), gaveta C (de la M a la R) y gaveta D (de la S a la Z). ¿En cuál gaveta se guarda el expediente de QUEZADA, Luis?",
    opciones: ["Gaveta A", "Gaveta B", "Gaveta C", "Gaveta D"], ordenFijo: true, correcta: 2,
    explicacion: "QUEZADA empieza con Q, y la Q está entre la M y la R (M, N, Ñ, O, P, Q, R). Va en la gaveta C.",
    verif: { tipo: "gaveta", apellido: "QUEZADA", respuesta: "Gaveta C" }
  },
  {
    id: "let-40", cat: "letras", tipoLetra: "archivo",
    enunciado: "Estos cuatro expedientes se archivan en orden alfabético por apellido. ¿Cuál queda en TERCER lugar?",
    opciones: ["Pichardo", "Peña", "Pérez", "Peralta"], correcta: 2,
    explicacion: "Los tres que empiezan con «Pe» van antes que Pichardo. Entre ellos se compara la tercera letra: ñ (Peña) va antes que r; luego Peralta y Pérez se deciden por la cuarta letra: a antes que e. Orden: Peña, Peralta, Pérez, Pichardo.",
    verif: { tipo: "diccionario", lugar: 3, respuesta: "Pérez" }
  }
];

/* Etiqueta visible de cada pregunta: «Formato N · nombre» */
(function () {
  var numeroPorTipo = {};
  var nombrePorTipo = {};
  TIPOS_LETRAS.forEach(function (t, i) {
    numeroPorTipo[t.id] = i + 1;
    nombrePorTipo[t.id] = t.nombre;
  });
  PREGUNTAS_LETRAS.forEach(function (p) {
    p.numeroFormato = numeroPorTipo[p.tipoLetra];
    p.catNombre = "Formato " + numeroPorTipo[p.tipoLetra] + " · " + nombrePorTipo[p.tipoLetra];
    /* Las respuestas son letras: las opciones se rotulan 1-4 en vez de A-D */
    p.etiquetasNumericas = true;
  });
})();

/* ---------------------------------------------------------
   Datos para la comprobación rápida de nombres y números
   --------------------------------------------------------- */
var DATOS_COMPROBACION = {
  nombres: [
    "Yohanna Altagracia Féliz Cuevas",
    "Wilkin Rafael Encarnación Mateo",
    "María del Carmen Henríquez Ureña",
    "José Miguel Santana Rodríguez",
    "Ana Yudelka Peña Guzmán",
    "Franklin Antonio de la Cruz Mejía",
    "Rosa Angélica Núñez Batista",
    "Luis Enmanuel Vásquez Tejada",
    "Carolina Mercedes Jiménez Polanco",
    "Ramón Emilio Paulino Germosén",
    "Yokasta Miguelina Reynoso Abreu",
    "Juan Bautista Almonte Lantigua",
    "Altagracia Milagros Familia Montero",
    "Pedro Julio Castillo Hernández",
    "Dahiana Esther Marte Ventura",
    "Héctor Bienvenido Cabrera Sosa",
    "Wendy Massiel Taveras Liriano",
    "Cristian Alexander Báez Rosario",
    "Nurys Margarita Disla Capellán",
    "Starlin José Peguero Zapata",
    "Miguelina Esperanza Brito Valdez",
    "Rafael Leonidas Guerrero Pimentel",
    "Scarlet Michelle Bautista Collado",
    "Víctor Manuel Espinal Quezada",
    "Yanilda Josefina Arias Villalona",
    "Edwin Bolívar Matos Cordero",
    "Ingrid Carolina Lora Sención",
    "Domingo Antonio Frías Checo",
    "Katherine Paola Ogando Vólquez",
    "Félix Alberto Ramírez Then"
  ],
  empresas: [
    "Inversiones Quisqueya, S. R. L.",
    "Ferretería El Detallista, S. A.",
    "Constructora Hermanos Mirabal, S. R. L.",
    "Distribuidora del Cibao, S. A.",
    "Agroindustrial La Vega Real, S. R. L.",
    "Farmacia Los Hidalgos, S. A.",
    "Servicios Logísticos Caribe, S. R. L.",
    "Importadora Yaque del Norte, S. A.",
    "Colmado Mayorista Enriquillo, S. R. L.",
    "Textiles Bávaro Internacional, S. A.",
    "Repuestos y Lubricantes Duarte, S. R. L.",
    "Clínica Corazones Unidos, S. A.",
    "Panadería y Repostería Villar Hermanos",
    "Seguros Universal del Caribe, S. A.",
    "Transporte Expreso Vegano, S. R. L."
  ],
  direcciones: [
    "Av. Winston Churchill #1099, Piantini",
    "Av. John F. Kennedy #20, Ens. Miraflores",
    "Calle Max Henríquez Ureña #54, Naco",
    "Av. Abraham Lincoln #456, La Julia",
    "Av. 27 de Febrero #311, Evaristo Morales",
    "Calle El Conde #105, Zona Colonial",
    "Av. Gustavo Mejía Ricart #148, Piantini",
    "Av. Rómulo Betancourt #1420, Bella Vista",
    "Av. Núñez de Cáceres #582, El Millón",
    "Calle Roberto Pastoriza #315, Naco",
    "Av. Sarasota #62, Bella Vista",
    "Av. Tiradentes #37, Ens. Naco",
    "Av. Máximo Gómez #29, Gazcue",
    "Av. Charles Sumner #51, Los Prados",
    "Av. Lope de Vega #95, Ens. Naco"
  ]
};

/* ---------------------------------------------------------
   Integra las preguntas nuevas en la práctica por habilidad:
   las 40 de letras son fijas y las de dominó se generan cada
   vez que se abre la página (siempre distintas).
   --------------------------------------------------------- */
var obtenerTodasPsicoBase = obtenerTodasPsico;
obtenerTodasPsico = function () {
  return obtenerTodasPsicoBase()
    .concat(PREGUNTAS_LETRAS)
    .concat(GENERADOR_DOMINO.generar(24));
};
