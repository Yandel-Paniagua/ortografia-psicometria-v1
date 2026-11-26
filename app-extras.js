/* =========================================================
   Pruebas añadidas en la V2 · Usa la interfaz window.APP_BANCA
   que expone app.js (debe cargarse después de app.js).

   1. Tarjetas e información de la evaluación (pestaña Psicométricas)
   2. Series de dominó (simulacro cronometrado y práctica guiada)
   3. Preguntas de letras: 10 formatos con su método de resolución
   4. Comprobación rápida de nombres y números
   5. Palabra mal escrita (formato inverso de ortografía)
   6. Dictado de cifras (voz del navegador o texto en letras)
   7. Resumen de estas pruebas en «Mi progreso»

   100 % Vanilla JS · Funciona sin servidor (file://)
   ========================================================= */

(function () {
  "use strict";

  var A = window.APP_BANCA;
  if (!A) return;

  var $ = A.$;
  var esc = A.esc;
  var mezclar = A.mezclar;

  /* ---------------------------------------------------------
     Utilidades compartidas
     --------------------------------------------------------- */
  function entero(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function azar(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
  }

  function hoy() {
    return new Date().toLocaleDateString("es-DO");
  }

  /* Sube al inicio sin animación: el CSS usa desplazamiento suave y, al cambiar
     el contenido a mitad de la animación, la vista quedaba a medio camino. */
  function irArriba() {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }

  /* Estadísticas propias de estas pruebas: { aciertos, total, mejor } por clave */
  function extras() {
    var p = A.obtenerProgreso();
    if (!p.extras) p.extras = {};
    return p.extras;
  }

  function sumarEstadistica(clave, aciertos, total) {
    var ex = extras();
    if (!ex[clave]) ex[clave] = { aciertos: 0, total: 0 };
    ex[clave].aciertos += aciertos;
    ex[clave].total += total;
    var pct = total > 0 ? Math.round((aciertos / total) * 100) : 0;
    if (ex[clave].mejor === undefined || pct > ex[clave].mejor) ex[clave].mejor = pct;
    A.guardarProgreso();
    return pct;
  }

  function textoMejor(clave) {
    var st = extras()[clave];
    return st && st.mejor !== undefined ? "Mejor resultado: " + st.mejor + " %" : "Sin intentos previos";
  }

  var temporizadorExtra = null;

  function detenerTemporizadorExtra() {
    if (temporizadorExtra) {
      clearInterval(temporizadorExtra);
      temporizadorExtra = null;
    }
  }

  /* ---------------------------------------------------------
     Navegación dentro de la pestaña Psicométricas
     --------------------------------------------------------- */
  function ocultarPanelesPsico() {
    $("psico-panel-letras").classList.add("oculto");
    $("psico-panel-comprobacion").classList.add("oculto");
  }

  function volverInicioPsico() {
    detenerTemporizadorExtra();
    ocultarPanelesPsico();
    A.renderizarInicioPsicometria();
    renderizarTarjetasExtras();
    irArriba();
  }

  function irAOrtografia(submodo) {
    $("tab-ortografia").click();
    A.cambiarSubmodoOrto(submodo);
  }

  function irAPsicologia(subpanel) {
    $("tab-psicologia").click();
    var boton = $("submodos-psicologia").querySelector('[data-subpsico="' + subpanel + '"]');
    if (boton) boton.click();
  }

  function ejecutarAccionExtra(accion) {
    if (accion === "domino" || accion === "domino-practica") lanzarDomino("practica");
    else if (accion === "domino-examen") lanzarDomino("examen");
    else if (accion === "letras") abrirPanelLetras();
    else if (accion === "comprobacion") iniciarComprobacion();
    else if (accion === "malescrita") irAOrtografia("malescrita");
    else if (accion === "cifras") irAOrtografia("cifras");
    else if (accion === "situacional") irAPsicologia("situacional");
    else if (accion === "entrevista") irAPsicologia("entrevista");
  }

  /* =========================================================
     1. TARJETAS E INFORMACIÓN DE LA EVALUACIÓN
     ========================================================= */
  function renderizarInfoEvaluacion() {
    var info = INFO_EVALUACION;
    $("info-evaluacion").innerHTML =
      '<div class="info-eval-cabecera">' +
        "<h4>" + esc(info.titulo) + "</h4>" +
        "<p>" + esc(info.nota) + "</p>" +
      "</div>" +
      '<ol class="lista-info-eval">' +
      info.pruebas.map(function (p) {
        return "<li>" +
          '<div class="info-eval-texto"><strong>' + esc(p.nombre.replace(/^\d+\.\s*/, "")) + "</strong>" +
          "<span>" + esc(p.detalle) + "</span></div>" +
          '<button type="button" class="btn btn-secundario btn-pequeno" data-accion-extra="' + esc(p.accion) + '">' + esc(p.boton) + "</button>" +
          "</li>";
      }).join("") +
      "</ol>" +
      '<p class="info-eval-fuentes">Fuentes: ' +
      info.fuentes.map(function (f) {
        return '<a href="' + esc(f.url) + '" target="_blank" rel="noopener noreferrer">' + esc(f.texto) + "</a>";
      }).join(" · ") +
      "</p>";
  }

  function renderizarTarjetasExtras() {
    function tarjeta(insignia, titulo, descripcion, pie, botones) {
      return '<div class="tarjeta-examen-psico">' +
        '<span class="insignia-cat">' + esc(insignia) + "</span>" +
        "<h4>" + esc(titulo) + "</h4>" +
        '<p style="color:#475569;font-size:0.9rem;margin:0">' + esc(descripcion) + "</p>" +
        '<div style="font-size:0.83rem;color:#047857;font-weight:600;margin-top:auto">' + esc(pie) + "</div>" +
        botones.map(function (b) {
          return '<button type="button" class="btn ' + (b[2] ? "btn-secundario" : "btn-primario") + '" data-accion-extra="' + b[1] + '">' + esc(b[0]) + "</button>";
        }).join("") +
        "</div>";
    }

    $("rejilla-extras-psico").innerHTML =
      tarjeta(
        "20 series · 12 min",
        "Series de dominó (tipo D-48)",
        "Completa la ficha que falta. Cada vez que entras se generan series nuevas, de fáciles a difíciles.",
        textoMejor("domino"),
        [["Simulacro cronometrado (12:00)", "domino-examen"], ["Práctica guiada sin reloj", "domino-practica", true]]
      ) +
      tarjeta(
        "10 formatos · 40 preguntas",
        "Preguntas de letras y palabras",
        "Las preguntas donde hay que responder con una letra: posición en el alfabeto, letra puente, anagramas, claves y más.",
        "4 preguntas explicadas de cada formato",
        [["Ver los 10 formatos", "letras"]]
      ) +
      tarjeta(
        "24 pares · 3 min",
        "Comprobación rápida de nombres",
        "Dos columnas de nombres, cédulas, cuentas y montos: decide en segundos si la copia es idéntica al original.",
        textoMejor("comprobacion"),
        [["Iniciar comprobación (3:00)", "comprobacion"]]
      ) +
      tarjeta(
        "10 montos por tanda",
        "Dictado de cifras",
        "Escucha un monto en pesos o dólares y escríbelo con sus comas, su punto y la moneda correcta.",
        textoMejor("cifras"),
        [["Ir al dictado de cifras", "cifras"]]
      );
  }

  $("psico-inicio").addEventListener("click", function (ev) {
    var boton = ev.target.closest("[data-accion-extra]");
    if (!boton) return;
    ejecutarAccionExtra(boton.getAttribute("data-accion-extra"));
  });

  /* =========================================================
     2. SERIES DE DOMINÓ
     ========================================================= */
  function lanzarDomino(modo) {
    var esExamen = modo === "examen";
    var preguntas = GENERADOR_DOMINO.generar(esExamen ? 20 : 12).map(function (p) {
      p.catNombre = "Series de dominó · nivel " + p.nivelDomino;
      return p;
    });

    ocultarPanelesPsico();
    $("psico-inicio").classList.add("oculto");
    irArriba();

    A.iniciarMotorQuiz({
      contenedorEl: $("psico-motor-quiz"),
      titulo: esExamen ? "Simulacro de dominó (20 series)" : "Práctica guiada de dominó (12 series)",
      preguntas: preguntas,
      minutos: esExamen ? 12 : 0,
      modoExamen: esExamen,
      /* El generador ya coloca la ficha correcta en una posición al azar */
      barajarOpciones: false,
      alResponder: A.registrarResultadoPsico,
      alFinalizar: function (res) {
        if (!esExamen) return;
        sumarEstadistica("domino", res.aciertos, res.total);
        A.registrarSimulacro({
          examenId: "domino",
          fecha: hoy(),
          tipo: "Dominó (20 series)",
          aciertos: res.aciertos,
          total: res.total,
          porcentaje: res.porcentaje,
          segundos: res.segundos
        });
      },
      alSalir: volverInicioPsico
    });
    irArriba();
  }

  /* =========================================================
     3. PREGUNTAS DE LETRAS: 10 FORMATOS
     ========================================================= */
  function renderizarTiposLetras() {
    $("rejilla-tipos-letras").innerHTML = TIPOS_LETRAS.map(function (t, i) {
      return '<article class="tarjeta-tipo-letra">' +
        '<div class="tipo-letra-cabecera">' +
          '<span class="tipo-letra-num">' + (i + 1) + "</span>" +
          "<h3>" + esc(t.nombre) + "</h3>" +
        "</div>" +
        '<p class="tipo-letra-ejemplo"><strong>Así se ve:</strong> ' + esc(t.comoSeVe) + "</p>" +
        '<div class="caja-truco"><strong>Cómo se resuelve:</strong> ' + esc(t.comoSeResuelve) + "</div>" +
        '<button type="button" class="btn btn-secundario" data-letras-tipo="' + esc(t.id) + '">Probar el formato ' + (i + 1) + " (4 preguntas)</button>" +
        "</article>";
    }).join("");
  }

  function abrirPanelLetras() {
    detenerTemporizadorExtra();
    $("psico-inicio").classList.add("oculto");
    $("psico-panel-comprobacion").classList.add("oculto");
    $("psico-motor-quiz").classList.add("oculto");
    $("psico-motor-quiz").innerHTML = "";
    $("psico-panel-letras").classList.remove("oculto");
    irArriba();
  }

  function lanzarLetras(tipo) {
    var lista;
    var titulo;
    if (tipo === "todos") {
      lista = mezclar(PREGUNTAS_LETRAS);
      titulo = "Letras y palabras · los 10 formatos mezclados";
    } else {
      lista = PREGUNTAS_LETRAS.filter(function (p) { return p.tipoLetra === tipo; });
      titulo = lista.length ? lista[0].catNombre : "Letras y palabras";
    }
    if (!lista.length) return;

    $("psico-panel-letras").classList.add("oculto");
    irArriba();
    A.iniciarMotorQuiz({
      contenedorEl: $("psico-motor-quiz"),
      titulo: titulo,
      preguntas: lista,
      minutos: 0,
      modoExamen: false,
      alResponder: A.registrarResultadoPsico,
      alSalir: abrirPanelLetras
    });
    irArriba();
  }

  $("psico-panel-letras").addEventListener("click", function (ev) {
    if (ev.target.closest("[data-volver-psico]")) {
      volverInicioPsico();
      return;
    }
    var boton = ev.target.closest("[data-letras-tipo]");
    if (boton) lanzarLetras(boton.getAttribute("data-letras-tipo"));
  });

  /* =========================================================
     4. COMPROBACIÓN RÁPIDA DE NOMBRES Y NÚMEROS
     ========================================================= */
  var SEGUNDOS_COMPROBACION = 180;
  var comp = null;

  /* Cambios pequeños y creíbles, como los errores reales de digitación */
  var CONFUSIONES = [
    ["rr", "r"], ["ll", "y"], ["ll", "l"], ["b", "v"], ["v", "b"], ["s", "z"], ["z", "s"],
    ["c", "s"], ["m", "n"], ["n", "m"], ["i", "y"], ["y", "i"], ["g", "j"], ["qu", "k"],
    ["á", "a"], ["é", "e"], ["í", "i"], ["ó", "o"], ["ú", "u"], ["ñ", "n"],
    ["h", ""], ["e", "a"], ["a", "e"], ["o", "u"]
  ];
  var DIGITO_PARECIDO = { "0": "8", "1": "7", "2": "7", "3": "8", "4": "9", "5": "6", "6": "5", "7": "1", "8": "3", "9": "4" };

  function alterarNumero(original) {
    var caracteres = original.split("");
    var posiciones = [];
    caracteres.forEach(function (c, i) {
      if (/\d/.test(c)) posiciones.push(i);
    });
    if (!posiciones.length) return original;

    for (var intento = 0; intento < 40; intento++) {
      var copia = caracteres.slice();
      if (Math.random() < 0.6) {
        /* Transposición de dos dígitos vecinos (el error más frecuente) */
        var candidatos = [];
        for (var j = 0; j < posiciones.length - 1; j++) {
          if (copia[posiciones[j]] !== copia[posiciones[j + 1]]) candidatos.push(j);
        }
        if (!candidatos.length) continue;
        var t = azar(candidatos);
        var tmp = copia[posiciones[t]];
        copia[posiciones[t]] = copia[posiciones[t + 1]];
        copia[posiciones[t + 1]] = tmp;
      } else {
        var pos = azar(posiciones);
        copia[pos] = DIGITO_PARECIDO[copia[pos]];
      }
      var resultado = copia.join("");
      if (resultado !== original) return resultado;
    }
    return original;
  }

  function alterarTexto(original) {
    var esLetra = /[a-záéíóúñ]/;
    for (var intento = 0; intento < 60; intento++) {
      var modo = entero(1, 3);
      var s = original;

      if (modo === 1) {
        /* Dos letras vecinas intercambiadas dentro de una palabra */
        var pares = [];
        for (var i = 1; i < s.length - 1; i++) {
          if (esLetra.test(s[i]) && esLetra.test(s[i + 1]) && s[i] !== s[i + 1]) pares.push(i);
        }
        if (!pares.length) continue;
        var p = azar(pares);
        s = s.slice(0, p) + s[p + 1] + s[p] + s.slice(p + 2);
      } else if (modo === 2) {
        /* Una letra cambiada por otra que suena o se ve parecida */
        var par = azar(CONFUSIONES);
        var apariciones = [];
        var desde = 1;
        var k;
        while ((k = s.indexOf(par[0], desde)) >= 0) {
          apariciones.push(k);
          desde = k + 1;
        }
        if (!apariciones.length) continue;
        var q = azar(apariciones);
        s = s.slice(0, q) + par[1] + s.slice(q + par[0].length);
      } else {
        /* Si trae un número (dirección), se altera el número */
        var m = s.match(/\d{2,}/);
        if (!m) continue;
        s = s.replace(m[0], alterarNumero(m[0]));
      }

      if (s !== original) return s;
    }
    return original.replace(/a(?=[^a]*$)/, "e");
  }

  function digitos(n) {
    var s = "";
    for (var i = 0; i < n; i++) s += entero(0, 9);
    return s;
  }

  function formatearMiles(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function dosCifras(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function generarFilasComprobacion() {
    var D = DATOS_COMPROBACION;
    var originales = [];

    mezclar(D.nombres).slice(0, 9).forEach(function (t) { originales.push({ texto: t, numero: false }); });
    mezclar(D.empresas).slice(0, 4).forEach(function (t) { originales.push({ texto: t, numero: false }); });
    mezclar(D.direcciones).slice(0, 3).forEach(function (t) { originales.push({ texto: t, numero: false }); });

    var prefijos = ["001", "002", "031", "402", "223", "225", "054", "012", "037", "047"];
    for (var i = 0; i < 3; i++) {
      originales.push({ texto: "Céd. " + azar(prefijos) + "-" + digitos(7) + "-" + digitos(1), numero: true });
    }
    for (var j = 0; j < 2; j++) {
      originales.push({ texto: "Cta. " + digitos(3) + "-" + digitos(6) + "-" + digitos(1), numero: true });
    }
    originales.push({ texto: "RNC 1-" + digitos(2) + "-" + digitos(5) + "-" + digitos(1), numero: true });
    originales.push({ texto: "RD$ " + formatearMiles(entero(10000, 9999999)) + "." + dosCifras(entero(0, 99)), numero: true });
    originales.push({ texto: "US$ " + formatearMiles(entero(1000, 999999)) + "." + dosCifras(entero(0, 99)), numero: true });

    originales = mezclar(originales);

    /* Entre 10 y 14 pares diferentes para que no se pueda adivinar la proporción */
    var cantidadDiferentes = entero(10, 14);
    var marcas = mezclar(originales.map(function (_, idx) { return idx < cantidadDiferentes; }));

    return originales.map(function (o, idx) {
      var copia = o.texto;
      if (marcas[idx]) copia = o.numero ? alterarNumero(o.texto) : alterarTexto(o.texto);
      return { original: o.texto, copia: copia, iguales: copia === o.texto };
    });
  }

  function iniciarComprobacion() {
    detenerTemporizadorExtra();
    comp = {
      filas: generarFilasComprobacion(),
      respuestas: {},
      segundos: SEGUNDOS_COMPROBACION,
      inicio: Date.now(),
      terminado: false
    };

    $("psico-inicio").classList.add("oculto");
    $("psico-panel-letras").classList.add("oculto");
    $("psico-motor-quiz").classList.add("oculto");
    $("psico-motor-quiz").innerHTML = "";
    $("psico-panel-comprobacion").classList.remove("oculto");
    pintarComprobacion();
    irArriba();

    temporizadorExtra = setInterval(function () {
      comp.segundos -= 1;
      var reloj = $("comp-reloj");
      if (reloj) {
        reloj.textContent = "⏱ " + A.formatearSegundos(comp.segundos);
        reloj.classList.toggle("reloj-urgente", comp.segundos <= 30);
      }
      if (comp.segundos <= 0) finalizarComprobacion();
    }, 1000);
  }

  function pintarComprobacion() {
    var filasHtml = comp.filas.map(function (f, i) {
      return '<div class="fila-comp" data-fila-comp="' + i + '">' +
        '<span class="comp-num">' + (i + 1) + "</span>" +
        '<span class="comp-texto" data-etiqueta="Original">' + esc(f.original) + "</span>" +
        '<span class="comp-texto" data-etiqueta="Copia">' + esc(f.copia) + "</span>" +
        '<span class="comp-botones">' +
          '<button type="button" class="btn-comp" data-comp="' + i + '" data-valor="1">Iguales</button>' +
          '<button type="button" class="btn-comp" data-comp="' + i + '" data-valor="0">Diferentes</button>' +
        "</span>" +
        "</div>";
    }).join("");

    $("comprobacion-contenido").innerHTML =
      '<div class="cabecera-bloque">' +
        "<div>" +
          '<span class="etiqueta-seccion">Agilidad y precisión · ' + comp.filas.length + " pares</span>" +
          "<h2>Comprobación rápida de nombres y números</h2>" +
          "<p>Compara la columna <strong>Original</strong> con la <strong>Copia</strong>. Marca <strong>Iguales</strong> solo si coinciden carácter por carácter (letras, tildes y números); ante cualquier cambio, marca <strong>Diferentes</strong>.</p>" +
        "</div>" +
        '<div class="acciones-fila">' +
          '<span class="reloj-examen" id="comp-reloj">⏱ ' + A.formatearSegundos(comp.segundos) + "</span>" +
          '<span class="insignia-estado" id="comp-contador">0/' + comp.filas.length + " respondidas</span>" +
          '<button type="button" class="btn btn-secundario btn-pequeno" data-comp-accion="salir">Salir</button>' +
        "</div>" +
      "</div>" +
      '<div class="tabla-comp">' +
        '<div class="fila-comp fila-comp-cabecera"><span>N.º</span><span>Original</span><span>Copia</span><span>Tu respuesta</span></div>' +
        filasHtml +
      "</div>" +
      '<div class="acciones-fila acciones-centradas" style="margin-top:1.1rem">' +
        '<button type="button" class="btn btn-exito btn-grande" data-comp-accion="entregar">Entregar y calificar</button>' +
      "</div>";
  }

  /* Marca en ambos textos el tramo donde difieren */
  function resaltarPar(original, copia) {
    var ini = 0;
    while (ini < original.length && ini < copia.length && original[ini] === copia[ini]) ini++;
    var finO = original.length - 1;
    var finC = copia.length - 1;
    while (finO >= ini && finC >= ini && original[finO] === copia[finC]) {
      finO--;
      finC--;
    }
    /* Si a una de las dos le falta una letra, se amplía un carácter para que se vea */
    if ((finO < ini || finC < ini) && ini > 0) ini--;

    function marcar(texto, fin) {
      return esc(texto.slice(0, ini)) + "<mark>" + esc(texto.slice(ini, fin + 1)) + "</mark>" + esc(texto.slice(fin + 1));
    }
    return { original: marcar(original, finO), copia: marcar(copia, finC) };
  }

  function finalizarComprobacion() {
    if (!comp || comp.terminado) return;
    comp.terminado = true;
    detenerTemporizadorExtra();

    var total = comp.filas.length;
    var aciertos = 0;
    var sinResponder = 0;
    var segundosUsados = Math.min(SEGUNDOS_COMPROBACION, Math.round((Date.now() - comp.inicio) / 1000));

    var filasHtml = comp.filas.map(function (f, i) {
      var r = comp.respuestas[i];
      var ok = r === f.iguales;
      if (ok) aciertos += 1;
      if (r === undefined) sinResponder += 1;
      var par = f.iguales ? { original: esc(f.original), copia: esc(f.copia) } : resaltarPar(f.original, f.copia);
      var tuRespuesta = r === undefined ? "Sin responder" : (r ? "Iguales" : "Diferentes");
      return '<div class="fila-comp ' + (ok ? "comp-ok" : "comp-err") + '">' +
        '<span class="comp-num">' + (i + 1) + "</span>" +
        '<span class="comp-texto" data-etiqueta="Original">' + par.original + "</span>" +
        '<span class="comp-texto" data-etiqueta="Copia">' + par.copia + "</span>" +
        '<span class="comp-veredicto">' + (ok ? "✓ " : "✗ ") + "Eran <strong>" + (f.iguales ? "iguales" : "diferentes") + "</strong>" +
          (ok ? "" : "<br><small>Tu respuesta: " + tuRespuesta + "</small>") + "</span>" +
        "</div>";
    }).join("");

    /* Se guarda en una sola operación: estadísticas propias + habilidad de atención */
    var progreso = A.obtenerProgreso();
    if (!progreso.psicoCat.atencion) progreso.psicoCat.atencion = { aciertos: 0, total: 0 };
    progreso.psicoCat.atencion.aciertos += aciertos;
    progreso.psicoCat.atencion.total += total;
    var pct = sumarEstadistica("comprobacion", aciertos, total);
    A.registrarSimulacro({
      fecha: hoy(),
      tipo: "Comprobación rápida (" + total + " pares)",
      aciertos: aciertos,
      total: total,
      porcentaje: pct,
      segundos: segundosUsados
    });

    var consejo = pct >= 90
      ? "Excelente precisión. Ahora intenta terminar con más tiempo de sobra."
      : (sinResponder > 0
        ? "Te quedaron " + sinResponder + " pares sin responder: no te detengas mucho en uno solo; avanza y vuelve al final."
        : "Compara por bloques cortos (tres o cuatro caracteres a la vez) en lugar de leer la línea completa.");

    $("comprobacion-contenido").innerHTML =
      '<div class="resumen-final-examen">' +
        '<span class="etiqueta-seccion">Resultado de la comprobación</span>' +
        "<h2>Comprobación rápida de nombres y números</h2>" +
        '<p style="font-size:1.15rem">Aciertos: <strong>' + aciertos + " de " + total + " (" + pct + " %)</strong> · Tiempo empleado: <strong>" + A.formatearSegundos(segundosUsados) + "</strong></p>" +
        '<div class="caja-truco" style="margin:0.6rem 0 1rem">' + esc(consejo) + "</div>" +
        '<div class="acciones-fila">' +
          '<button type="button" class="btn btn-primario" data-comp-accion="otra">Otra tanda</button>' +
          '<button type="button" class="btn btn-secundario" data-comp-accion="salir">Volver al menú de la sección</button>' +
        "</div>" +
      "</div>" +
      '<h3 style="margin-top:1.4rem">Revisión par por par (la diferencia aparece resaltada)</h3>' +
      '<div class="tabla-comp">' +
        '<div class="fila-comp fila-comp-cabecera"><span>N.º</span><span>Original</span><span>Copia</span><span>Resultado</span></div>' +
        filasHtml +
      "</div>";
    irArriba();
  }

  $("psico-panel-comprobacion").addEventListener("click", function (ev) {
    var accion = ev.target.closest("[data-comp-accion]");
    if (accion) {
      var tipo = accion.getAttribute("data-comp-accion");
      if (tipo === "entregar") finalizarComprobacion();
      else if (tipo === "otra") iniciarComprobacion();
      else if (tipo === "salir") volverInicioPsico();
      return;
    }

    var boton = ev.target.closest("[data-comp]");
    if (!boton || !comp || comp.terminado) return;
    var idx = parseInt(boton.getAttribute("data-comp"), 10);
    comp.respuestas[idx] = boton.getAttribute("data-valor") === "1";

    var fila = boton.closest(".fila-comp");
    var botones = fila.querySelectorAll(".btn-comp");
    for (var i = 0; i < botones.length; i++) botones[i].classList.toggle("activo", botones[i] === boton);
    fila.classList.add("respondida");
    $("comp-contador").textContent = Object.keys(comp.respuestas).length + "/" + comp.filas.length + " respondidas";
  });

  /* =========================================================
     5. PALABRA MAL ESCRITA (formato inverso)
     ========================================================= */
  var CATS_PALABRA_SUELTA = ["tildes", "bv", "csz", "h", "lly", "cqk", "gj"];

  function construirMalEscritas(fuente, cantidad, enunciado, etiqueta) {
    return mezclar(fuente).slice(0, cantidad).map(function (objetivo) {
      var mala = azar(objetivo.incorrectas);
      var companeras = mezclar(fuente.filter(function (x) {
        return x.id !== objetivo.id && x.correcta !== objetivo.correcta && x.correcta !== mala;
      })).slice(0, 3);
      var opciones = mezclar(companeras.map(function (c) { return c.correcta; }).concat([mala]));

      return {
        id: "mal-" + objetivo.id,
        cat: objetivo.cat,
        catNombre: etiqueta + " · " + objetivo.catNombre,
        enunciado: enunciado,
        opciones: opciones,
        correcta: opciones.indexOf(mala),
        explicacion: "La mal escrita es «" + mala + "»; lo correcto es «" + objetivo.correcta + "». " + objetivo.explicacion,
        /* Si se falla, la palabra original entra en «Repaso de mis errores» */
        originalOrto: objetivo
      };
    });
  }

  function lanzarMalEscritas(modo) {
    var banco = A.obtenerBancoOrto();
    var palabras = banco.filter(function (p) {
      return p.tipo === "palabra" && CATS_PALABRA_SUELTA.indexOf(p.cat) >= 0 && p.correcta.indexOf(" ") < 0;
    });
    var lugares = banco.filter(function (p) { return p.cat === "rd" && p.tipo === "palabra"; });

    var enunciadoPalabras = "Tres de estas palabras están bien escritas y una NO. ¿Cuál es la que está MAL escrita?";
    var enunciadoLugares = "Tres de estos nombres de calles o lugares de República Dominicana están bien escritos y uno NO. ¿Cuál está MAL escrito?";

    var preguntas;
    var titulo;
    if (modo === "palabras") {
      preguntas = construirMalEscritas(palabras, 20, enunciadoPalabras, "Palabra mal escrita");
      titulo = "Encuentra la palabra mal escrita (20)";
    } else if (modo === "rd") {
      preguntas = construirMalEscritas(lugares, 15, enunciadoLugares, "Nombre mal escrito");
      titulo = "Calles y lugares de RD: ¿cuál está mal escrito? (15)";
    } else {
      preguntas = mezclar(
        construirMalEscritas(palabras, 15, enunciadoPalabras, "Palabra mal escrita")
          .concat(construirMalEscritas(lugares, 10, enunciadoLugares, "Nombre mal escrito"))
      );
      titulo = "Mal escritas: palabras y lugares de RD (25)";
    }

    $("orto-panel-malescrita").classList.add("oculto");
    irArriba();
    A.iniciarMotorQuiz({
      contenedorEl: $("orto-motor-quiz"),
      titulo: titulo,
      preguntas: preguntas,
      minutos: 0,
      modoExamen: false,
      alResponder: A.registrarResultadoOrto,
      alSalir: function () {
        A.cambiarSubmodoOrto("malescrita");
      }
    });
    irArriba();
  }

  $("orto-panel-malescrita").addEventListener("click", function (ev) {
    var boton = ev.target.closest("[data-malescrita]");
    if (boton) lanzarMalEscritas(boton.getAttribute("data-malescrita"));
  });

  /* =========================================================
     6. DICTADO DE CIFRAS
     ========================================================= */
  var UNIDADES = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
    "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte",
    "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
  var DECENAS = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  var CENTENAS = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

  /* De 1 a 999. Siempre en forma apocopada («un», «veintiún», «treinta y un»),
     porque el número va delante de «mil», «millones», «pesos» o «centavos». */
  function centenasALetras(n) {
    if (n === 100) return "cien";
    var partes = [];
    var c = Math.floor(n / 100);
    var resto = n % 100;
    if (c) partes.push(CENTENAS[c]);
    if (resto) {
      if (resto === 1) partes.push("un");
      else if (resto === 21) partes.push("veintiún");
      else if (resto < 30) partes.push(UNIDADES[resto]);
      else {
        var d = Math.floor(resto / 10);
        var u = resto % 10;
        partes.push(DECENAS[d] + (u ? " y " + (u === 1 ? "un" : UNIDADES[u]) : ""));
      }
    }
    return partes.join(" ");
  }

  /* De 0 a 999,999,999 */
  function enteroALetras(n) {
    if (n === 0) return "cero";
    var millones = Math.floor(n / 1000000);
    var miles = Math.floor((n % 1000000) / 1000);
    var resto = n % 1000;
    var partes = [];
    if (millones) partes.push(millones === 1 ? "un millón" : centenasALetras(millones) + " millones");
    if (miles) partes.push(miles === 1 ? "mil" : centenasALetras(miles) + " mil");
    if (resto) partes.push(centenasALetras(resto));
    return partes.join(" ");
  }

  function montoALetras(m) {
    var nombre = m.moneda === "US$"
      ? (m.enteros === 1 ? "dólar" : "dólares")
      : (m.enteros === 1 ? "peso" : "pesos");
    /* «un millón DE pesos», pero «un millón doscientos mil pesos» */
    var millonRedondo = m.enteros >= 1000000 && m.enteros % 1000000 === 0;
    var texto = enteroALetras(m.enteros) + (millonRedondo ? " de " : " ") + nombre;
    if (m.centavos > 0) {
      texto += " con " + enteroALetras(m.centavos) + (m.centavos === 1 ? " centavo" : " centavos");
    }
    return texto;
  }

  function montoCanonico(m) {
    return m.moneda + " " + formatearMiles(m.enteros) + "." + dosCifras(m.centavos);
  }

  function generarMonto(nivel) {
    var moneda = Math.random() < 0.65 ? "RD$" : "US$";
    var enteros;
    if (nivel === 1) {
      enteros = azar([entero(100, 999), entero(1000, 9999), entero(1000, 9999), entero(10000, 99999)]);
    } else if (nivel === 2) {
      /* Cientos de miles, con frecuencia con ceros en medio (305,040 / 600,007) */
      var miles = entero(100, 999);
      var unidades = azar([0, entero(1, 9), entero(10, 99), entero(100, 999), entero(100, 999)]);
      enteros = azar([miles * 1000 + unidades, miles * 1000 + unidades, entero(10000, 99999)]);
    } else {
      var millones = azar([entero(1, 9), entero(1, 9), entero(10, 99)]);
      var milesAlto = azar([0, entero(1, 9), entero(10, 99), entero(100, 999), entero(100, 999)]);
      var unidadesAlto = azar([0, entero(1, 9), entero(10, 99), entero(100, 999), entero(100, 999)]);
      enteros = millones * 1000000 + milesAlto * 1000 + unidadesAlto;
    }
    var centavos = nivel === 1
      ? azar([0, 0, 50, 25, 75])
      : azar([0, 0, 50, 25, 75, entero(1, 9), entero(10, 99), entero(10, 99)]);
    return { moneda: moneda, enteros: enteros, centavos: centavos };
  }

  /* Devuelve { ok, pistas[] } comparando lo escrito con el monto dictado */
  function evaluarMonto(entrada, m) {
    var limpio = String(entrada || "").replace(/\s+/g, "").toUpperCase();
    var numero = formatearMiles(m.enteros);
    var conDecimales = m.moneda + numero + "." + dosCifras(m.centavos);
    if (limpio === conDecimales || (m.centavos === 0 && limpio === m.moneda + numero)) {
      return { ok: true, pistas: [] };
    }

    var pistas = [];
    var monedaEscrita = limpio.indexOf("RD$") === 0 ? "RD$" : (limpio.indexOf("US$") === 0 ? "US$" : null);
    if (!monedaEscrita) {
      pistas.push("Falta la moneda al inicio: RD$ cuando dictan «pesos» y US$ cuando dictan «dólares».");
    } else if (monedaEscrita !== m.moneda) {
      pistas.push("La moneda no coincide: dictaron " + (m.moneda === "RD$" ? "pesos (RD$)" : "dólares (US$)") + ".");
    }

    var cuerpo = monedaEscrita ? limpio.slice(3) : limpio.replace(/^[^0-9]*/, "");
    var centavosTotales = m.enteros * 100 + m.centavos;
    var valorEscrito = Math.round(parseFloat(cuerpo.replace(/,/g, "")) * 100);
    var soloDigitos = cuerpo.replace(/\D/g, "");
    var digitosCorrectos = soloDigitos === String(m.enteros) + dosCifras(m.centavos) ||
      (m.centavos === 0 && soloDigitos === String(m.enteros));
    var cuerpoCorrecto = cuerpo === numero + "." + dosCifras(m.centavos) || (m.centavos === 0 && cuerpo === numero);

    if (!cuerpoCorrecto) {
      if (/\d\.\d{3}(\D|$)/.test(cuerpo) || /,\d{1,2}$/.test(cuerpo)) {
        pistas.push("Usaste el punto para los miles o la coma para los centavos. En República Dominicana es al revés: coma (,) en los miles y punto (.) en los centavos.");
      } else if (valorEscrito === centavosTotales || digitosCorrectos) {
        pistas.push("Las cifras están bien, pero falla la puntuación: pon una coma cada tres cifras contando desde la derecha y el punto justo antes de los dos centavos.");
      } else if (Math.floor(valorEscrito / 100) === m.enteros) {
        pistas.push("La parte entera está bien; revisa los centavos. Siempre van con dos cifras: «con cinco centavos» es .05 y «con cincuenta» es .50.");
      } else {
        pistas.push("Las cifras no coinciden con el monto dictado. Escríbelo por bloques: primero los millones, luego los miles y al final las unidades, con sus ceros.");
      }
    }
    return { ok: false, pistas: pistas };
  }

  /* ---- Voz del navegador (Web Speech API) ---- */
  function hayVoz() {
    return typeof window.speechSynthesis !== "undefined" && typeof window.SpeechSynthesisUtterance !== "undefined";
  }

  function elegirVozEspanol() {
    if (!hayVoz()) return null;
    var voces = window.speechSynthesis.getVoices() || [];
    var preferidas = ["es-DO", "es-US", "es-MX", "es-419", "es-CO", "es-ES"];
    for (var i = 0; i < preferidas.length; i++) {
      for (var j = 0; j < voces.length; j++) {
        if (String(voces[j].lang).replace("_", "-") === preferidas[i]) return voces[j];
      }
    }
    for (var k = 0; k < voces.length; k++) {
      if (/^es/i.test(String(voces[k].lang))) return voces[k];
    }
    return null;
  }

  /* Devuelve "ok", "sin-voz-es" (no hay voz en español instalada) o "no" */
  function hablar(texto, lento) {
    if (!hayVoz()) return "no";
    try {
      var voces = window.speechSynthesis.getVoices() || [];
      var voz = elegirVozEspanol();
      if (voces.length && !voz) return "sin-voz-es";
      window.speechSynthesis.cancel();
      var locucion = new window.SpeechSynthesisUtterance(texto);
      if (voz) {
        locucion.voice = voz;
        locucion.lang = voz.lang;
      } else {
        locucion.lang = "es-ES";
      }
      locucion.rate = lento ? 0.68 : 0.92;
      window.speechSynthesis.speak(locucion);
      return "ok";
    } catch (e) {
      return "no";
    }
  }

  function detenerVoz() {
    if (!hayVoz()) return;
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      /* Sin soporte real de voz: no hay nada que detener */
    }
  }

  if (hayVoz()) {
    /* Algunos navegadores cargan la lista de voces de forma diferida */
    try {
      window.speechSynthesis.getVoices();
    } catch (e) {
      /* Se ignora: se volverá a consultar al pulsar «Escuchar» */
    }
  }

  var cifras = { lote: [], indice: 0, aciertos: 0, comprobado: false, visible: false, escuchas: 0 };

  function iniciarTandaCifras() {
    detenerVoz();
    var nivel = parseInt($("select-nivel-cifras").value, 10) || 2;
    cifras.lote = [];
    for (var i = 0; i < 10; i++) cifras.lote.push(generarMonto(nivel));
    cifras.indice = 0;
    cifras.aciertos = 0;
    pintarCifra();
  }

  function asegurarTandaCifras() {
    if (!cifras.lote.length || cifras.indice >= cifras.lote.length) iniciarTandaCifras();
  }

  function pintarCifra() {
    var total = cifras.lote.length;
    var zona = $("zona-cifras");

    if (cifras.indice >= total) {
      var pct = sumarEstadistica("cifras", cifras.aciertos, total);
      zona.innerHTML =
        '<div class="caja-consigna-dictado">' +
          '<p class="consigna-instruccion">¡Tanda completada! Escribiste bien <strong>' + cifras.aciertos + " de " + total + "</strong> montos (" + pct + " %).</p>" +
          '<div class="consigna-frase">' + (pct >= 90
            ? "Muy bien. Sube de nivel o repite hasta que te salga sin usar «Ver en letras»."
            : "Repite la tanda fijándote en las pistas: casi siempre el fallo está en la puntuación o en los ceros intermedios.") + "</div>" +
        "</div>" +
        '<div class="acciones-fila"><button type="button" class="btn btn-primario" data-cifra="nueva">Nueva tanda (10)</button></div>';
      return;
    }

    var m = cifras.lote[cifras.indice];
    cifras.comprobado = false;
    cifras.visible = !hayVoz();
    cifras.escuchas = 0;

    zona.innerHTML =
      '<div class="progreso-linea-cabecera">' +
        "<span>Monto " + (cifras.indice + 1) + " de " + total + "</span>" +
        '<span class="insignia-exito">Aciertos: ' + cifras.aciertos + "</span>" +
      "</div>" +
      '<div class="barra-progreso-fondo"><div class="barra-progreso-relleno" style="width:' + Math.round((cifras.indice / total) * 100) + '%"></div></div>' +
      '<div class="caja-consigna-dictado">' +
        '<p class="consigna-instruccion">Escucha el monto y escríbelo en números, con la moneda delante.</p>' +
        '<div class="acciones-fila">' +
          '<button type="button" class="btn btn-primario" data-cifra="escuchar">▶ Escuchar el monto</button>' +
          '<button type="button" class="btn btn-secundario" data-cifra="lento">Repetir más lento</button>' +
          '<button type="button" class="btn btn-texto" data-cifra="ver">Ver en letras</button>' +
          '<span class="insignia-estado" id="cifra-escuchas">Escuchas: 0</span>' +
        "</div>" +
        '<div id="cifra-aviso-voz" class="alerta-inline oculto"></div>' +
        '<div id="cifra-en-letras" class="cifra-en-letras' + (cifras.visible ? "" : " oculto") + '">«' + esc(montoALetras(m)) + "»</div>" +
      "</div>" +
      '<form id="form-cifra" class="fila-entrada-dictado" autocomplete="off">' +
        '<input type="text" id="input-cifra" class="input-dictado" placeholder="Ej.: RD$ 12,500.75" spellcheck="false" autocomplete="off" inputmode="text">' +
        '<button type="submit" id="btn-comprobar-cifra" class="btn btn-primario">Comprobar</button>' +
        '<button type="button" id="btn-siguiente-cifra" class="btn btn-primario oculto" data-cifra="siguiente">Siguiente →</button>' +
      "</form>" +
      '<div id="cifra-feedback" class="feedback-caja oculto"></div>';

    if (!hayVoz()) {
      avisarVoz("Este navegador no tiene voz disponible, así que el monto se muestra en letras. La conversión de letras a números se practica igual.");
    }
    $("form-cifra").addEventListener("submit", function (ev) {
      ev.preventDefault();
      comprobarCifra();
    });
    /* Sin desplazar la página: así el título y las reglas siguen a la vista */
    try {
      $("input-cifra").focus({ preventScroll: true });
    } catch (e) {
      $("input-cifra").focus();
    }
  }

  function avisarVoz(mensaje) {
    var aviso = $("cifra-aviso-voz");
    if (!aviso) return;
    aviso.textContent = mensaje;
    aviso.classList.remove("oculto");
  }

  function reproducirCifra(lento) {
    var m = cifras.lote[cifras.indice];
    if (!m) return;
    var estado = hablar(montoALetras(m), lento);
    if (estado === "ok") {
      cifras.escuchas += 1;
      $("cifra-escuchas").textContent = "Escuchas: " + cifras.escuchas;
    } else {
      avisarVoz(estado === "sin-voz-es"
        ? "Tu navegador no tiene instalada una voz en español; por eso el monto se muestra en letras."
        : "No se pudo reproducir la voz en este navegador; el monto se muestra en letras.");
      $("cifra-en-letras").classList.remove("oculto");
    }
  }

  function comprobarCifra() {
    if (cifras.comprobado) {
      cifras.indice += 1;
      pintarCifra();
      return;
    }
    var m = cifras.lote[cifras.indice];
    var escrito = $("input-cifra").value.trim();
    if (!escrito) return;

    detenerVoz();
    cifras.comprobado = true;
    var resultado = evaluarMonto(escrito, m);
    if (resultado.ok) cifras.aciertos += 1;

    $("input-cifra").disabled = true;
    $("btn-comprobar-cifra").classList.add("oculto");
    $("btn-siguiente-cifra").classList.remove("oculto");
    $("cifra-en-letras").classList.remove("oculto");

    var fb = $("cifra-feedback");
    fb.classList.remove("oculto", "ok", "err");
    fb.classList.add(resultado.ok ? "ok" : "err");
    fb.innerHTML = resultado.ok
      ? "<strong>¡Correcto!</strong> «" + esc(montoCanonico(m)) + "»."
      : "<strong>Revisa el monto.</strong> Escribiste «" + esc(escrito) + "» y lo correcto es <strong>«" + esc(montoCanonico(m)) + "»</strong>." +
        "<ul class=\"lista-pistas-cifra\">" + resultado.pistas.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>";
    $("btn-siguiente-cifra").focus();
  }

  $("zona-cifras").addEventListener("click", function (ev) {
    var boton = ev.target.closest("[data-cifra]");
    if (!boton) return;
    var accion = boton.getAttribute("data-cifra");
    if (accion === "escuchar") reproducirCifra(false);
    else if (accion === "lento") reproducirCifra(true);
    else if (accion === "ver") $("cifra-en-letras").classList.toggle("oculto");
    else if (accion === "siguiente") {
      cifras.indice += 1;
      pintarCifra();
    } else if (accion === "nueva") iniciarTandaCifras();
  });

  $("btn-nueva-tanda-cifras").addEventListener("click", iniciarTandaCifras);
  $("select-nivel-cifras").addEventListener("change", iniciarTandaCifras);

  /* =========================================================
     7. RESUMEN EN «MI PROGRESO»
     ========================================================= */
  function renderizarProgresoExtras() {
    var ex = extras();
    var filas = [
      ["cifras", "Dictado de cifras"],
      ["comprobacion", "Comprobación rápida de nombres"],
      ["domino", "Simulacro de dominó"]
    ];
    $("progreso-extras").innerHTML = filas.map(function (f) {
      var st = ex[f[0]];
      var pct = st && st.total ? Math.round((st.aciertos / st.total) * 100) : 0;
      var etiqueta = st && st.total
        ? st.aciertos + "/" + st.total + " (" + pct + " %) · mejor tanda: " + st.mejor + " %"
        : "Sin datos";
      return '<div class="fila-barra-dominio">' +
        '<div class="barra-dom-sup"><span>' + esc(f[1]) + "</span><span>" + esc(etiqueta) + "</span></div>" +
        '<div class="barra-progreso-fondo"><div class="barra-progreso-relleno" style="width:' + pct + '%"></div></div>' +
        "</div>";
    }).join("");
  }

  /* ---------------------------------------------------------
     Reacción a la navegación de la aplicación principal
     --------------------------------------------------------- */
  document.addEventListener("orto:submodo", function (ev) {
    detenerVoz();
    if (ev.detail === "cifras") asegurarTandaCifras();
  });

  document.addEventListener("app:vista", function (ev) {
    detenerVoz();
    detenerTemporizadorExtra();
    ocultarPanelesPsico();
    if (ev.detail === "psicometria") renderizarTarjetasExtras();
    if (ev.detail === "progreso") renderizarProgresoExtras();
  });

  if ($("btn-confirmar-reset")) {
    $("btn-confirmar-reset").addEventListener("click", function () {
      window.setTimeout(function () {
        renderizarProgresoExtras();
        renderizarTarjetasExtras();
      }, 0);
    });
  }

  /* Funciones puras a disposición de las pruebas automáticas */
  window.APP_BANCA_EXTRAS = {
    enteroALetras: enteroALetras,
    montoALetras: montoALetras,
    montoCanonico: montoCanonico,
    evaluarMonto: evaluarMonto,
    generarMonto: generarMonto,
    alterarTexto: alterarTexto,
    alterarNumero: alterarNumero,
    resaltarPar: resaltarPar,
    generarFilasComprobacion: generarFilasComprobacion,
    construirMalEscritas: construirMalEscritas
  };

  renderizarInfoEvaluacion();
  renderizarTarjetasExtras();
  renderizarTiposLetras();
  renderizarProgresoExtras();
})();
