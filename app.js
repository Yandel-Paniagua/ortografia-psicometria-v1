/* =========================================================
   Lógica Principal · Plataforma de Ortografía, Psicometría
   y Pruebas Psicológicas Corporativas / Bancarias RD
   100 % Vanilla JS · Funciona sin servidor (file://)
   ========================================================= */

(function () {
  "use strict";

  var CLAVE_STORAGE = "practica_banca_rd_v1";
  var memoriaRespaldo = null;

  /* ---------------------------------------------------------
     Utilidades generales y persistencia segura (localStorage)
     --------------------------------------------------------- */
  function $(id) {
    return document.getElementById(id);
  }

  function esc(texto) {
    return String(texto == null ? "" : texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalizarBusqueda(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function mezclar(arr) {
    var copia = arr.slice();
    for (var i = copia.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copia[i];
      copia[i] = copia[j];
      copia[j] = tmp;
    }
    return copia;
  }

  function formatearSegundos(seg) {
    var s = Math.max(0, Math.floor(seg));
    var m = Math.floor(s / 60);
    var r = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
  }

  /* Letras de las opciones (hasta 6 por si una pregunta trae 5 o 6 alternativas) */
  var LETRAS_OPCION = ["A", "B", "C", "D", "E", "F"];

  /* Devuelve una copia de la pregunta con sus opciones barajadas y el índice
     correcto recalculado. Así la respuesta no queda siempre en la misma letra
     (en la V1 casi nunca caía en la D). Las preguntas marcadas con
     ordenFijo: true (Línea 1-4, Fila A-D, Oficina 1-4…) conservan su orden. */
  function barajarOpcionesPregunta(p) {
    if (!p || !Array.isArray(p.opciones) || p.ordenFijo) return p;
    var indices = mezclar(p.opciones.map(function (_, i) { return i; }));
    var copia = {};
    for (var k in p) {
      if (Object.prototype.hasOwnProperty.call(p, k)) copia[k] = p[k];
    }
    copia.opciones = indices.map(function (i) { return p.opciones[i]; });
    copia.correcta = indices.indexOf(p.correcta);
    return copia;
  }

  function estadoInicialProgreso() {
    return {
      ortoCat: {},
      psicoCat: {},
      erroresOrto: {},
      correosCompletados: {},
      historialExamenes: [],
      perfilLaboral: null,
      /* Estadísticas de las pruebas añadidas en la V2 (cifras, comprobación, dominó) */
      extras: {}
    };
  }

  function cargarProgreso() {
    try {
      var crudo = window.localStorage.getItem(CLAVE_STORAGE);
      if (!crudo) return estadoInicialProgreso();
      var obj = JSON.parse(crudo);
      var base = estadoInicialProgreso();
      for (var k in base) {
        if (obj && obj[k] !== undefined) base[k] = obj[k];
      }
      return base;
    } catch (e) {
      return memoriaRespaldo || estadoInicialProgreso();
    }
  }

  function guardarProgreso() {
    memoriaRespaldo = progreso;
    try {
      window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(progreso));
    } catch (e) {
      /* Respaldo en memoria activo si el navegador restringe file:// */
    }
    actualizarResumenCabecera();
  }

  var progreso = cargarProgreso();

  /* ---------------------------------------------------------
     Construcción unificada de bancos de preguntas
     --------------------------------------------------------- */
  var BANCO_ORTO_BASE = construirBancoOrto();
  var BANCO_ORTO = BANCO_ORTO_BASE.slice();

  /* Integra las 16 preguntas de párrafos de correo en la categoría "correos" */
  PREGUNTAS_CORREOS_EXTRA.forEach(function (q, idx) {
    BANCO_ORTO.push({
      id: q.id || ("cor-extra-" + (idx + 1)),
      cat: "correos",
      catNombre: "Errores en correos",
      tipo: "parrafo-correo",
      oracion: q.pregunta,
      correcta: q.correcta,
      incorrectas: q.incorrectas.slice(),
      explicacion: q.explicacion
    });
  });

  var MAPA_ORTO_ID = {};
  BANCO_ORTO.forEach(function (p) {
    MAPA_ORTO_ID[p.id] = p;
  });

  var TODAS_PSICO = obtenerTodasPsico();

  function registrarResultadoOrto(pregunta, acertada) {
    var cat = pregunta.cat || "general";
    if (!progreso.ortoCat[cat]) progreso.ortoCat[cat] = { aciertos: 0, total: 0 };
    progreso.ortoCat[cat].total += 1;
    if (acertada) {
      progreso.ortoCat[cat].aciertos += 1;
      if (progreso.erroresOrto[pregunta.id]) {
        progreso.erroresOrto[pregunta.id].racha = (progreso.erroresOrto[pregunta.id].racha || 0) + 1;
        if (progreso.erroresOrto[pregunta.id].racha >= 2) {
          delete progreso.erroresOrto[pregunta.id];
        }
      }
    } else {
      var prev = progreso.erroresOrto[pregunta.id] || { fallos: 0 };
      progreso.erroresOrto[pregunta.id] = {
        id: pregunta.id,
        cat: pregunta.cat,
        catNombre: pregunta.catNombre || "Ortografía",
        correcta: pregunta.correcta,
        oracion: pregunta.oracion || "",
        explicacion: pregunta.explicacion || "",
        fallos: prev.fallos + 1,
        racha: 0
      };
    }
    guardarProgreso();
  }

  function registrarErrorCorreo(idVirtual, mal, bien, regla) {
    var prev = progreso.erroresOrto[idVirtual] || { fallos: 0 };
    progreso.erroresOrto[idVirtual] = {
      id: idVirtual,
      cat: "correos",
      catNombre: "Errores en correos",
      correcta: bien,
      incorrectaBase: mal,
      oracion: "En el correo aparecía «" + mal + "»; selecciona la forma correcta:",
      explicacion: regla,
      fallos: prev.fallos + 1,
      racha: 0
    };
  }

  function registrarResultadoPsico(pregunta, acertada) {
    var cat = pregunta.cat || "general";
    if (!progreso.psicoCat[cat]) progreso.psicoCat[cat] = { aciertos: 0, total: 0 };
    progreso.psicoCat[cat].total += 1;
    if (acertada) progreso.psicoCat[cat].aciertos += 1;
    guardarProgreso();
  }

  function contarErroresPendientes() {
    return Object.keys(progreso.erroresOrto || {}).length;
  }

  function calcularTotalesGlobales() {
    var aciertos = 0;
    var total = 0;
    Object.keys(progreso.ortoCat).forEach(function (k) {
      aciertos += progreso.ortoCat[k].aciertos || 0;
      total += progreso.ortoCat[k].total || 0;
    });
    Object.keys(progreso.psicoCat).forEach(function (k) {
      aciertos += progreso.psicoCat[k].aciertos || 0;
      total += progreso.psicoCat[k].total || 0;
    });
    return { aciertos: aciertos, total: total };
  }

  function actualizarResumenCabecera() {
    var tot = calcularTotalesGlobales();
    var pct = tot.total > 0 ? Math.round((tot.aciertos / tot.total) * 100) + " %" : "—";
    var nErr = contarErroresPendientes();
    $("hdr-precision").textContent = "Precisión global: " + pct + (tot.total ? " (" + tot.aciertos + "/" + tot.total + ")" : "");
    $("hdr-errores-pendientes").textContent = "Errores por repasar: " + nErr;
    $("pill-errores-orto").textContent = String(nErr);
  }

  /* ---------------------------------------------------------
     Navegación principal entre las 5 pestañas
     --------------------------------------------------------- */
  var temporizadorQuiz = null;

  function detenerTemporizador() {
    if (temporizadorQuiz) {
      clearInterval(temporizadorQuiz);
      temporizadorQuiz = null;
    }
  }

  function activarPestana(nombreVista) {
    var botones = $("nav-pestanas").querySelectorAll(".nav-btn");
    for (var i = 0; i < botones.length; i++) {
      botones[i].classList.toggle("activo", botones[i].getAttribute("data-vista") === nombreVista);
    }
    var vistas = ["aprende", "ortografia", "psicometria", "psicologia", "progreso"];
    vistas.forEach(function (v) {
      $("vista-" + v).classList.toggle("activa", v === nombreVista);
    });

    if (nombreVista === "ortografia") {
      renderizarCategoriasOrto();
      renderizarPanelErrores();
    } else if (nombreVista === "psicometria") {
      renderizarInicioPsicometria();
    } else if (nombreVista === "progreso") {
      renderizarPanelProgreso();
    }
    avisarCambio("app:vista", nombreVista);
    window.scrollTo(0, 0);
  }

  $("nav-pestanas").addEventListener("click", function (ev) {
    var btn = ev.target.closest(".nav-btn");
    if (!btn) return;
    activarPestana(btn.getAttribute("data-vista"));
  });

  /* =========================================================
     1. PESTAÑA APRENDE (Guías + Buscador instantáneo)
     ========================================================= */
  var filtroGuiaActivo = "todas";

  function renderizarFiltrosGuias() {
    var html = '<button type="button" class="chip-filtro activo" data-guia-id="todas">Todas las reglas (' + GUIAS_ORTO.length + ")</button>";
    GUIAS_ORTO.forEach(function (g) {
      var nombreCorto = g.titulo.split("(")[0].trim();
      html += '<button type="button" class="chip-filtro" data-guia-id="' + esc(g.id) + '">' + esc(nombreCorto) + "</button>";
    });
    $("filtros-guias").innerHTML = html;

    $("filtros-guias").addEventListener("click", function (ev) {
      var chip = ev.target.closest(".chip-filtro");
      if (!chip) return;
      filtroGuiaActivo = chip.getAttribute("data-guia-id");
      var chips = $("filtros-guias").querySelectorAll(".chip-filtro");
      for (var i = 0; i < chips.length; i++) {
        chips[i].classList.toggle("activo", chips[i] === chip);
      }
      renderizarTarjetasGuias($("input-buscar-dudas").value);
    });
  }

  function renderizarTarjetasGuias(termino) {
    var q = normalizarBusqueda(termino);
    var filtradas = GUIAS_ORTO.filter(function (g) {
      if (filtroGuiaActivo !== "todas" && g.id !== filtroGuiaActivo) return false;
      if (!q) return true;
      var bloque = normalizarBusqueda(
        g.titulo + " " + g.resumen + " " + g.claves + " " + g.truco + " " + g.reglas.join(" ")
      );
      return bloque.indexOf(q) >= 0;
    });

    if (!filtradas.length) {
      $("contenedor-guias").innerHTML = '<div class="tarjeta estado-vacio">No se encontraron guías temáticas para «' + esc(termino) + '». Revisa las coincidencias directas del banco arriba o limpia el filtro.</div>';
      return;
    }

    $("contenedor-guias").innerHTML = filtradas.map(function (g) {
      var reglasHtml = g.reglas.map(function (r) {
        return "<li>" + esc(r) + "</li>";
      }).join("");
      var ejemplosHtml = (g.ejemplos || []).map(function (ej) {
        return '<div class="par-ejemplo">' +
          '<span class="ej-bien">✓ Correcto: ' + esc(ej.bien).replace(/\n/g, " · ") + "</span>" +
          '<span class="ej-mal">✗ Evitar: ' + esc(ej.mal).replace(/\n/g, " · ") + "</span>" +
          "</div>";
      }).join("");

      return '<article class="tarjeta-guia">' +
        "<div><h3>" + esc(g.titulo) + '</h3><p class="guia-resumen">' + esc(g.resumen) + "</p></div>" +
        '<ul class="lista-reglas-guia">' + reglasHtml + "</ul>" +
        '<div class="caja-truco"><strong>Truco de memoria:</strong> ' + esc(g.truco) + "</div>" +
        '<div class="caja-ejemplos-guia">' + ejemplosHtml + "</div>" +
        "</article>";
    }).join("");
  }

  function ejecutarBusquedaDudas() {
    var texto = $("input-buscar-dudas").value;
    var q = normalizarBusqueda(texto);
    $("btn-limpiar-busqueda").classList.toggle("oculto", !texto.trim());
    renderizarTarjetasGuias(texto);

    var panel = $("resultados-banco-dudas");
    if (q.length < 2) {
      panel.classList.add("oculto");
      panel.innerHTML = "";
      return;
    }

    var coincidencias = [];
    for (var i = 0; i < BANCO_ORTO.length && coincidencias.length < 12; i++) {
      var item = BANCO_ORTO[i];
      var buscable = normalizarBusqueda(
        item.correcta + " " + item.oracion + " " + item.incorrectas.join(" ") + " " + item.explicacion
      );
      if (buscable.indexOf(q) >= 0) {
        coincidencias.push(item);
      }
    }

    panel.classList.remove("oculto");
    if (!coincidencias.length) {
      panel.innerHTML = "<strong>Consulta rápida en banco de palabras:</strong> No hay entradas exactas para «" + esc(texto) + "».";
      return;
    }

    panel.innerHTML = "<strong>Coincidencias exactas en el banco ortográfico (" + coincidencias.length + "):</strong>" +
      coincidencias.map(function (it) {
        var contexto = it.oracion ? '<div style="font-size:0.88rem;color:#334155;margin-bottom:0.2rem">' + esc(it.oracion.replace("___", "[" + it.correcta + "]")) + "</div>" : "";
        return '<div class="item-duda-banco">' +
          '<span class="insignia-cat">' + esc(it.catNombre) + "</span>" +
          contexto +
          '<span class="duda-correcta">✓ ' + esc(it.correcta) + "</span>" +
          '<span class="duda-incorrectas">' + esc(it.incorrectas.slice(0, 2).join(" / ")) + "</span>" +
          '<p class="duda-regla">' + esc(it.explicacion) + "</p>" +
          "</div>";
      }).join("");
  }

  $("input-buscar-dudas").addEventListener("input", ejecutarBusquedaDudas);
  $("btn-limpiar-busqueda").addEventListener("click", function () {
    $("input-buscar-dudas").value = "";
    ejecutarBusquedaDudas();
  });

  /* =========================================================
     MOTOR REUTILIZABLE DE CUESTIONARIOS (Práctica y Examen)
     ========================================================= */
  function iniciarMotorQuiz(config) {
    /* config: { contenedorEl, titulo, preguntas, minutos (0 = práctica),
                 modoExamen (bool), alResponder(p, ok), alFinalizar(res), alSalir() } */
    detenerTemporizador();
    var estado = {
      preguntas: config.preguntas.map(function (p) {
        if (p.opciones) {
          return config.barajarOpciones === false ? p : barajarOpcionesPregunta(p);
        }
        /* Convierte pregunta de ortografía a estructura estándar de 4 opciones */
        var mezcladas = mezclar([p.correcta].concat(p.incorrectas));
        return {
          id: p.id,
          cat: p.cat,
          catNombre: p.catNombre,
          enunciado: p.tipo === "contexto"
            ? "Completa la oración correctamente:\n«" + p.oracion + "»"
            : (p.tipo === "parrafo-correo" ? p.oracion : "Selecciona la forma escrita sin ningún error ortográfico:"),
          opciones: mezcladas,
          correcta: mezcladas.indexOf(p.correcta),
          explicacion: p.explicacion,
          originalOrto: p
        };
      }),
      indice: 0,
      respuestas: {},
      dudas: {},
      terminado: false,
      segundosRestantes: (config.minutos || 0) * 60,
      inicioMs: Date.now()
    };

    var cont = config.contenedorEl;
    cont.classList.remove("oculto");

    if (config.modoExamen && config.minutos > 0) {
      temporizadorQuiz = setInterval(function () {
        estado.segundosRestantes -= 1;
        var elReloj = cont.querySelector("[data-quiz-reloj]");
        if (elReloj) {
          elReloj.textContent = "⏱ " + formatearSegundos(estado.segundosRestantes);
          elReloj.classList.toggle("reloj-urgente", estado.segundosRestantes <= 180);
        }
        if (estado.segundosRestantes <= 0) {
          finalizarQuiz();
        }
      }, 1000);
    }

    function finalizarQuiz() {
      if (estado.terminado) return;
      estado.terminado = true;
      detenerTemporizador();

      var aciertos = 0;
      var porCat = {};
      estado.preguntas.forEach(function (p, idx) {
        var resp = estado.respuestas[idx];
        var ok = resp === p.correcta;
        if (ok) aciertos += 1;
        var claveCat = p.catNombre || p.cat || "General";
        if (!porCat[claveCat]) porCat[claveCat] = { ok: 0, tot: 0 };
        porCat[claveCat].tot += 1;
        if (ok) porCat[claveCat].ok += 1;
        if (config.modoExamen && config.alResponder) {
          config.alResponder(p.originalOrto || p, ok);
        }
      });

      var segsUsados = Math.round((Date.now() - estado.inicioMs) / 1000);
      var pct = Math.round((aciertos / estado.preguntas.length) * 100);

      if (config.alFinalizar) {
        config.alFinalizar({
          titulo: config.titulo,
          aciertos: aciertos,
          total: estado.preguntas.length,
          porcentaje: pct,
          segundos: segsUsados
        });
      }

      var desgloseHtml = Object.keys(porCat).map(function (c) {
        var d = porCat[c];
        var pCat = Math.round((d.ok / d.tot) * 100);
        return '<div class="fila-barra-dominio">' +
          '<div class="barra-dom-sup"><span>' + esc(c) + "</span><span>" + d.ok + "/" + d.tot + " (" + pCat + " %)</span></div>" +
          '<div class="barra-progreso-fondo" style="margin-bottom:0.35rem"><div class="barra-progreso-relleno" style="width:' + pCat + '%"></div></div>' +
          "</div>";
      }).join("");

      var revisionHtml = estado.preguntas.map(function (p, idx) {
        var elegida = estado.respuestas[idx];
        var ok = elegida === p.correcta;
        var txtElegida = elegida === undefined
          ? "Sin responder"
          : (p.esOpcionHtml ? "Opción " + LETRAS_OPCION[elegida] : esc(p.opciones[elegida]));
        var txtCorrecta = p.esOpcionHtml
          ? "Opción " + LETRAS_OPCION[p.correcta] + '<div style="margin-top:0.35rem">' + p.opciones[p.correcta] + "</div>"
          : esc(p.opciones[p.correcta]);

        return '<div class="revision-item ' + (ok ? "rev-ok" : "rev-err") + '">' +
          '<div style="font-weight:700;margin-bottom:0.3rem">Pregunta ' + (idx + 1) + " · " + (ok ? "✓ Correcta" : "✗ Por reforzar") + "</div>" +
          '<div style="white-space:pre-line;margin-bottom:0.45rem">' + esc(p.enunciado) + "</div>" +
          (p.figuraHtml ? '<div class="contenedor-figura-pregunta">' + p.figuraHtml + "</div>" : "") +
          (!ok ? '<div style="color:#b91c1c;font-size:0.9rem">Tu respuesta: ' + txtElegida + "</div>" : "") +
          '<div style="color:#047857;font-weight:600;font-size:0.92rem">Respuesta correcta: ' + txtCorrecta + "</div>" +
          '<div style="color:#475569;font-size:0.9rem;margin-top:0.35rem">' + esc(p.explicacion) + "</div>" +
          "</div>";
      }).join("");

      cont.innerHTML =
        '<div class="resumen-final-examen">' +
          '<span class="etiqueta-seccion">Resultados de la sesión</span>' +
          "<h2>" + esc(config.titulo) + "</h2>" +
          '<p style="font-size:1.15rem">Puntaje obtenido: <strong>' + aciertos + " de " + estado.preguntas.length + " (" + pct + " %)</strong> · Tiempo empleado: <strong>" + formatearSegundos(segsUsados) + "</strong></p>" +
          '<div class="lista-barras-dominio" style="margin:1rem 0 1.25rem">' + desgloseHtml + "</div>" +
          '<div class="acciones-fila">' +
            '<button type="button" class="btn btn-primario" data-accion-quiz="salir">Volver al menú de la sección</button>' +
          "</div>" +
        "</div>" +
        "<h3>Revisión detallada pregunta por pregunta</h3>" +
        revisionHtml;
    }

    function pintarPregunta() {
      var p = estado.preguntas[estado.indice];
      var respActual = estado.respuestas[estado.indice];
      var yaRespondida = respActual !== undefined;
      /* Cuando las respuestas son letras (formatos de letras), las opciones se
         rotulan con números para no confundir «opción B» con «respuesta B». */
      var letras = p.etiquetasNumericas ? ["1", "2", "3", "4", "5", "6"] : LETRAS_OPCION;
      var respondidasCount = Object.keys(estado.respuestas).length;

      var opcionesHtml = p.opciones.map(function (op, i) {
        var clases = "opcion-btn";
        if (config.modoExamen) {
          if (respActual === i) clases += " seleccionada";
        } else if (yaRespondida) {
          if (i === p.correcta) clases += " correcta";
          else if (respActual === i) clases += " incorrecta";
        }
        var deshabilitar = (!config.modoExamen && yaRespondida) ? " disabled" : "";
        var cuerpoOp = p.esOpcionHtml ? op : "<span>" + esc(op) + "</span>";
        return '<button type="button" class="' + clases + '" data-opt-idx="' + i + '"' + deshabilitar + ">" +
          '<span class="opcion-letra">' + letras[i] + "</span>" +
          cuerpoOp +
          "</button>";
      }).join("");

      var feedbackHtml = "";
      if (!config.modoExamen && yaRespondida) {
        var acertada = respActual === p.correcta;
        feedbackHtml = '<div class="feedback-caja ' + (acertada ? "ok" : "err") + '">' +
          "<strong>" + (acertada ? "¡Excelente! Respuesta correcta." : "Respuesta incorrecta. La opción correcta es «" + (p.esOpcionHtml ? letras[p.correcta] : esc(p.opciones[p.correcta])) + "».") + "</strong><br>" +
          esc(p.explicacion) +
          "</div>";
      }

      var mapaHtml = "";
      if (config.modoExamen) {
        var celdas = estado.preguntas.map(function (_, idx) {
          var cls = "mapa-celda";
          if (idx === estado.indice) cls += " actual";
          if (estado.dudas[idx]) cls += " marcada-duda";
          else if (estado.respuestas[idx] !== undefined) cls += " respondida";
          return '<button type="button" class="' + cls + '" data-ir-idx="' + idx + '">' + (idx + 1) + "</button>";
        }).join("");
        mapaHtml = '<div class="mapa-preguntas">' +
          '<div style="font-size:0.86rem;font-weight:700;color:#475569">Navegador del examen (' + respondidasCount + "/" + estado.preguntas.length + " respondidas):</div>" +
          '<div class="mapa-rejilla">' + celdas + "</div>" +
          "</div>";
      }

      var claseEnunciado = "quiz-enunciado" + (p.cat === "atencion" ? " codigo-atencion" : "");

      cont.innerHTML =
        '<div class="quiz-barra-superior">' +
          "<div><strong>" + esc(config.titulo) + '</strong> <span class="insignia-estado" style="margin-left:0.4rem">Pregunta ' + (estado.indice + 1) + " de " + estado.preguntas.length + "</span></div>" +
          '<div class="acciones-fila">' +
            (config.modoExamen && config.minutos > 0
              ? '<span class="reloj-examen' + (estado.segundosRestantes <= 180 ? " reloj-urgente" : "") + '" data-quiz-reloj="1">⏱ ' + formatearSegundos(estado.segundosRestantes) + "</span>"
              : "") +
            '<button type="button" class="btn btn-secundario btn-pequeno" data-accion-quiz="salir">Salir</button>' +
          "</div>" +
        "</div>" +
        '<div class="quiz-tarjeta-pregunta">' +
          (p.catNombre || p.tema ? '<span class="insignia-cat">' + esc(p.catNombre || p.tema) + "</span>" : "") +
          '<div class="' + claseEnunciado + '">' + esc(p.enunciado || p.situacion) + "</div>" +
          /* En la prueba real no se permite calculadora: se recuerda en cada ejercicio de cálculo */
          (p.cat === "numerico" ? '<div class="aviso-a-mano">Resuélvelo con lápiz y papel, sin calculadora, como en la prueba.</div>' : "") +
          (p.figuraHtml ? '<div class="contenedor-figura-pregunta">' + p.figuraHtml + "</div>" : "") +
          '<div class="lista-opciones-quiz' + (p.esOpcionHtml ? " opciones-svg-grid" : "") + '">' + opcionesHtml + "</div>" +
          feedbackHtml +
        "</div>" +
        '<div class="quiz-controles-inferiores">' +
          '<div class="acciones-fila">' +
            '<button type="button" class="btn btn-secundario" data-accion-quiz="anterior"' + (estado.indice === 0 ? " disabled" : "") + ">← Anterior</button>" +
            (config.modoExamen
              ? '<button type="button" class="btn btn-secundario" data-accion-quiz="duda">' + (estado.dudas[estado.indice] ? "Quitar marca de duda" : "Marcar duda") + "</button>"
              : "") +
          "</div>" +
          '<div class="acciones-fila">' +
            (estado.indice < estado.preguntas.length - 1
              ? '<button type="button" class="btn btn-primario" data-accion-quiz="siguiente">Siguiente →</button>'
              : '<button type="button" class="btn btn-exito" data-accion-quiz="finalizar">' + (config.modoExamen ? "Entregar y calificar examen" : "Ver resumen final") + "</button>") +
            (config.modoExamen && estado.indice < estado.preguntas.length - 1
              ? '<button type="button" class="btn btn-exito" data-accion-quiz="finalizar">Entregar examen</button>'
              : "") +
          "</div>" +
        "</div>" +
        mapaHtml;
    }

    cont.onclick = function (ev) {
      var btnOpt = ev.target.closest("[data-opt-idx]");
      if (btnOpt && !estado.terminado) {
        var idxOpt = parseInt(btnOpt.getAttribute("data-opt-idx"), 10);
        var preg = estado.preguntas[estado.indice];
        if (!config.modoExamen && estado.respuestas[estado.indice] !== undefined) return;
        estado.respuestas[estado.indice] = idxOpt;
        if (!config.modoExamen && config.alResponder) {
          config.alResponder(preg.originalOrto || preg, idxOpt === preg.correcta);
        }
        pintarPregunta();
        return;
      }

      var btnIr = ev.target.closest("[data-ir-idx]");
      if (btnIr && !estado.terminado) {
        estado.indice = parseInt(btnIr.getAttribute("data-ir-idx"), 10);
        pintarPregunta();
        return;
      }

      var btnAcc = ev.target.closest("[data-accion-quiz]");
      if (!btnAcc) return;
      var acc = btnAcc.getAttribute("data-accion-quiz");
      if (acc === "anterior" && estado.indice > 0) {
        estado.indice -= 1;
        pintarPregunta();
      } else if (acc === "siguiente" && estado.indice < estado.preguntas.length - 1) {
        estado.indice += 1;
        pintarPregunta();
      } else if (acc === "duda") {
        estado.dudas[estado.indice] = !estado.dudas[estado.indice];
        pintarPregunta();
      } else if (acc === "finalizar") {
        finalizarQuiz();
      } else if (acc === "salir") {
        detenerTemporizador();
        cont.classList.add("oculto");
        cont.innerHTML = "";
        if (config.alSalir) config.alSalir();
      }
    };

    pintarPregunta();
  }

  /* =========================================================
     2. PESTAÑA PRACTICA ORTOGRAFÍA (5 submodos)
     ========================================================= */
  var submodoOrtoActual = "categorias";

  function cambiarSubmodoOrto(submodo) {
    detenerTemporizador();
    submodoOrtoActual = submodo;
    $("orto-motor-quiz").classList.add("oculto");
    $("orto-motor-quiz").innerHTML = "";

    var botones = $("submodos-ortografia").querySelectorAll(".submodo-btn");
    for (var i = 0; i < botones.length; i++) {
      botones[i].classList.toggle("activo", botones[i].getAttribute("data-submodo") === submodo);
    }

    /* Cada submodo muestra su panel; los paneles nuevos (V2) solo existen si
       index.html los declara, por eso se comprueba antes de alternarlos. */
    var paneles = {
      categorias: "orto-panel-categorias",
      examen: "orto-panel-examen-intro",
      malescrita: "orto-panel-malescrita",
      correos: "orto-panel-correos",
      dictado: "orto-panel-dictado",
      cifras: "orto-panel-cifras",
      errores: "orto-panel-errores"
    };
    Object.keys(paneles).forEach(function (clave) {
      var panel = $(paneles[clave]);
      if (panel) panel.classList.toggle("oculto", submodo !== clave);
    });

    if (submodo === "categorias") renderizarCategoriasOrto();
    if (submodo === "correos") renderizarVistaCorreos();
    if (submodo === "dictado") asegurarSesionDictado();
    if (submodo === "errores") renderizarPanelErrores();

    avisarCambio("orto:submodo", submodo);
  }

  /* Aviso para los módulos de app-extras.js (dominó, cifras, comprobación…) */
  function avisarCambio(nombre, detalle) {
    try {
      document.dispatchEvent(new CustomEvent(nombre, { detail: detalle }));
    } catch (e) {
      /* Navegadores muy antiguos sin CustomEvent: los extras simplemente no se enteran */
    }
  }

  $("submodos-ortografia").addEventListener("click", function (ev) {
    var btn = ev.target.closest(".submodo-btn");
    if (!btn) return;
    cambiarSubmodoOrto(btn.getAttribute("data-submodo"));
  });

  function renderizarCategoriasOrto() {
    var html = '<button type="button" class="tarjeta-categoria cat-todas" data-cat-orto="todas">' +
      '<div class="cat-fila-sup"><span class="cat-titulo">Todas mezcladas</span><span class="cat-conteo">' + BANCO_ORTO.length + " preg.</span></div>" +
      '<div class="cat-dominio">Práctica integral combinando las 11 categorías del banco.</div>' +
      "</button>";

    CATEGORIAS_ORTO.forEach(function (cat) {
      var listaCat = BANCO_ORTO.filter(function (p) { return p.cat === cat.id; });
      var est = progreso.ortoCat[cat.id] || { aciertos: 0, total: 0 };
      var domTxt = est.total > 0
        ? "Dominio actual: " + Math.round((est.aciertos / est.total) * 100) + " % (" + est.aciertos + "/" + est.total + ")"
        : "Aún sin practicar";

      html += '<button type="button" class="tarjeta-categoria" data-cat-orto="' + esc(cat.id) + '">' +
        '<div class="cat-fila-sup"><span class="cat-titulo">' + esc(cat.nombre) + '</span><span class="cat-conteo">' + listaCat.length + " preg.</span></div>" +
        '<div class="cat-dominio">' + esc(domTxt) + "</div>" +
        "</button>";
    });

    $("rejilla-categorias-orto").innerHTML = html;
  }

  $("rejilla-categorias-orto").addEventListener("click", function (ev) {
    var card = ev.target.closest("[data-cat-orto]");
    if (!card) return;
    var catId = card.getAttribute("data-cat-orto");
    var candidatas = catId === "todas"
      ? BANCO_ORTO
      : BANCO_ORTO.filter(function (p) { return p.cat === catId; });
    var cantVal = $("select-cantidad-orto").value;
    var seleccion = mezclar(candidatas);
    if (cantVal !== "todas") {
      seleccion = seleccion.slice(0, parseInt(cantVal, 10));
    }
    var nombreCat = catId === "todas"
      ? "Práctica integral (todas las categorías)"
      : "Práctica · " + (CATEGORIAS_ORTO.filter(function (c) { return c.id === catId; })[0] || {}).nombre;

    $("orto-panel-categorias").classList.add("oculto");
    iniciarMotorQuiz({
      contenedorEl: $("orto-motor-quiz"),
      titulo: nombreCat,
      preguntas: seleccion,
      minutos: 0,
      modoExamen: false,
      alResponder: registrarResultadoOrto,
      alSalir: function () {
        cambiarSubmodoOrto("categorias");
      }
    });
  });

  /* Submodo 2B: Examen cronometrado de 40 preguntas / 30 min */
  $("btn-iniciar-examen-orto").addEventListener("click", function () {
    /* Selección balanceada: al menos 3 de cada una de las 11 categorías + resto al azar hasta 40 */
    var elegidas = [];
    var usados = {};
    CATEGORIAS_ORTO.forEach(function (cat) {
      var sub = mezclar(BANCO_ORTO.filter(function (p) { return p.cat === cat.id; })).slice(0, 3);
      sub.forEach(function (p) {
        elegidas.push(p);
        usados[p.id] = true;
      });
    });
    var resto = mezclar(BANCO_ORTO.filter(function (p) { return !usados[p.id]; }));
    while (elegidas.length < 40 && resto.length > 0) {
      elegidas.push(resto.pop());
    }
    elegidas = mezclar(elegidas);

    $("orto-panel-examen-intro").classList.add("oculto");
    iniciarMotorQuiz({
      contenedorEl: $("orto-motor-quiz"),
      titulo: "Examen Cronometrado de Ortografía (40 preguntas)",
      preguntas: elegidas,
      minutos: 30,
      modoExamen: true,
      alResponder: registrarResultadoOrto,
      alFinalizar: function (res) {
        progreso.historialExamenes.unshift({
          fecha: new Date().toLocaleDateString("es-DO"),
          tipo: "Ortografía (40 preg.)",
          aciertos: res.aciertos,
          total: res.total,
          porcentaje: res.porcentaje,
          segundos: res.segundos
        });
        progreso.historialExamenes = progreso.historialExamenes.slice(0, 25);
        guardarProgreso();
      },
      alSalir: function () {
        cambiarSubmodoOrto("examen");
      }
    });
  });

  /* Submodo 2C: Detecta los errores en el correo (28 correos clicables) */
  var estadoCorreo = {
    indice: 0,
    mapaTokens: {},
    listaErroresActual: [],
    seleccionados: {},
    verificado: false
  };

  function tokenizarSegmentoCorreo(texto, contadorRef, esCuerpo) {
    var errores = [];
    var conMarcas = texto.replace(/\{([^}]+)\}/g, function (_, contenido) {
      var partes = contenido.split("|");
      var idx = errores.length;
      errores.push({
        mal: partes[0],
        bien: partes[1],
        regla: partes[2] || ""
      });
      return "\uE000" + idx + "\uE001";
    });

    function procesarLinea(linea) {
      var trozos = linea.split(/(\s+)/);
      return trozos.map(function (t) {
        if (!t || /^\s+$/.test(t)) return t;
        var mPref = t.match(/^[¡¿«"(\[]*/);
        var pref = mPref ? mPref[0] : "";
        var resto = t.slice(pref.length);
        var mSuf = resto.match(/[.,;:!?»")\]—]*$/);
        var suf = mSuf ? mSuf[0] : "";
        var nucleo = resto.slice(0, resto.length - suf.length);

        var mErr = nucleo.match(/^\uE000(\d+)\uE001$/);
        if (mErr) {
          var eObj = errores[parseInt(mErr[1], 10)];
          var idTokE = "tok-" + (++contadorRef.n);
          estadoCorreo.mapaTokens[idTokE] = {
            esError: true,
            mal: eObj.mal,
            bien: eObj.bien,
            regla: eObj.regla
          };
          estadoCorreo.listaErroresActual.push({ tokId: idTokE, mal: eObj.mal, bien: eObj.bien, regla: eObj.regla });
          return esc(pref) + '<span class="tok-palabra" data-tok-id="' + idTokE + '">' + esc(eObj.mal) + "</span>" + esc(suf);
        }

        if (/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9]/.test(nucleo) && nucleo.indexOf("@") < 0) {
          var idTokN = "tok-" + (++contadorRef.n);
          estadoCorreo.mapaTokens[idTokN] = {
            esError: false,
            texto: nucleo
          };
          return esc(pref) + '<span class="tok-palabra" data-tok-id="' + idTokN + '">' + esc(nucleo) + "</span>" + esc(suf);
        }
        return esc(t);
      }).join("");
    }

    if (!esCuerpo) {
      return procesarLinea(conMarcas);
    }

    return conMarcas.split(/\n\n+/).map(function (parrafo) {
      var lineas = parrafo.split("\n").map(procesarLinea).join("<br>");
      return '<p class="parrafo-correo">' + lineas + "</p>";
    }).join("");
  }

  function renderizarSelectorLateralCorreos() {
    $("lista-correos-selector").innerHTML = CORREOS_INTERACTIVOS.map(function (c, idx) {
      var comp = progreso.correosCompletados[c.id];
      var marca = comp ? (comp.perfecto ? "✓ 100 %" : comp.pct + " %") : "";
      return '<button type="button" class="item-selector-correo' + (idx === estadoCorreo.indice ? " activo" : "") + '" data-correo-idx="' + idx + '">' +
        '<div class="item-correo-num"><span>Correo ' + (idx + 1) + "</span><span>" + esc(marca) + "</span></div>" +
        '<div class="item-correo-tit">' + esc(c.titulo) + "</div>" +
        "</button>";
    }).join("");
  }

  function cargarCorreoActual() {
    var c = CORREOS_INTERACTIVOS[estadoCorreo.indice];
    estadoCorreo.mapaTokens = {};
    estadoCorreo.listaErroresActual = [];
    estadoCorreo.seleccionados = {};
    estadoCorreo.verificado = false;

    var contadorRef = { n: 0 };
    $("ventana-correo-interactivo").classList.remove("verificado");
    $("correo-indice-actual").textContent = "Correo " + (estadoCorreo.indice + 1) + " de " + CORREOS_INTERACTIVOS.length;
    $("correo-marcadas-contador").textContent = "Palabras marcadas: 0";
    $("correo-cat").textContent = c.categoria;
    $("correo-de").textContent = c.de;
    $("correo-para").textContent = c.para;
    $("correo-fecha").textContent = c.fecha;

    $("correo-asunto-tokens").innerHTML = tokenizarSegmentoCorreo(c.asunto, contadorRef, false);
    $("correo-cuerpo-tokens").innerHTML = tokenizarSegmentoCorreo(c.cuerpo, contadorRef, true);

    $("correo-retroalimentacion").classList.add("oculto");
    $("correo-retroalimentacion").innerHTML = "";
    $("btn-verificar-correo").disabled = false;
    $("btn-limpiar-marcas-correo").disabled = false;
    $("btn-correo-reintentar").classList.add("oculto");
    $("btn-correo-anterior").disabled = estadoCorreo.indice === 0;
    $("btn-correo-siguiente").disabled = estadoCorreo.indice === CORREOS_INTERACTIVOS.length - 1;

    renderizarSelectorLateralCorreos();
  }

  function renderizarVistaCorreos() {
    cargarCorreoActual();
  }

  function alternarClickPalabraCorreo(ev) {
    if (estadoCorreo.verificado) return;
    var span = ev.target.closest(".tok-palabra");
    if (!span) return;
    var id = span.getAttribute("data-tok-id");
    if (estadoCorreo.seleccionados[id]) {
      delete estadoCorreo.seleccionados[id];
      span.classList.remove("marcada");
    } else {
      estadoCorreo.seleccionados[id] = true;
      span.classList.add("marcada");
    }
    $("correo-marcadas-contador").textContent = "Palabras marcadas: " + Object.keys(estadoCorreo.seleccionados).length;
  }

  $("correo-asunto-tokens").addEventListener("click", alternarClickPalabraCorreo);
  $("correo-cuerpo-tokens").addEventListener("click", alternarClickPalabraCorreo);

  $("lista-correos-selector").addEventListener("click", function (ev) {
    var item = ev.target.closest("[data-correo-idx]");
    if (!item) return;
    estadoCorreo.indice = parseInt(item.getAttribute("data-correo-idx"), 10);
    cargarCorreoActual();
  });

  $("btn-limpiar-marcas-correo").addEventListener("click", function () {
    if (estadoCorreo.verificado) return;
    estadoCorreo.seleccionados = {};
    var spans = $("ventana-correo-interactivo").querySelectorAll(".tok-palabra.marcada");
    for (var i = 0; i < spans.length; i++) spans[i].classList.remove("marcada");
    $("correo-marcadas-contador").textContent = "Palabras marcadas: 0";
  });

  $("btn-verificar-correo").addEventListener("click", function () {
    if (estadoCorreo.verificado) return;
    estadoCorreo.verificado = true;
    $("ventana-correo-interactivo").classList.add("verificado");
    $("btn-verificar-correo").disabled = true;
    $("btn-limpiar-marcas-correo").disabled = true;
    $("btn-correo-reintentar").classList.remove("oculto");

    var aciertos = 0;
    var omitidos = 0;
    var falsosPositivos = 0;
    var c = CORREOS_INTERACTIVOS[estadoCorreo.indice];

    var todosSpans = $("ventana-correo-interactivo").querySelectorAll(".tok-palabra");
    for (var i = 0; i < todosSpans.length; i++) {
      var sp = todosSpans[i];
      var tid = sp.getAttribute("data-tok-id");
      var info = estadoCorreo.mapaTokens[tid];
      var fueMarcada = !!estadoCorreo.seleccionados[tid];
      sp.classList.remove("marcada");

      if (info.esError && fueMarcada) {
        aciertos += 1;
        sp.classList.add("acierto");
        sp.title = "Correcto: «" + info.bien + "»";
      } else if (info.esError && !fueMarcada) {
        omitidos += 1;
        sp.classList.add("omitida");
        sp.title = "Faltó detectar: «" + info.bien + "»";
        registrarErrorCorreo("err-" + c.id + "-" + tid, info.mal, info.bien, info.regla);
      } else if (!info.esError && fueMarcada) {
        falsosPositivos += 1;
        sp.classList.add("falso-positivo");
        sp.title = "Esta palabra estaba bien escrita.";
      }
    }

    var totalObj = estadoCorreo.listaErroresActual.length;
    if (!progreso.ortoCat.correos) progreso.ortoCat.correos = { aciertos: 0, total: 0 };
    progreso.ortoCat.correos.aciertos += aciertos;
    progreso.ortoCat.correos.total += totalObj + falsosPositivos;

    var pctNeto = Math.max(0, Math.round(((aciertos - falsosPositivos * 0.5) / totalObj) * 100));
    progreso.correosCompletados[c.id] = {
      pct: pctNeto,
      perfecto: aciertos === totalObj && falsosPositivos === 0
    };
    guardarProgreso();
    renderizarSelectorLateralCorreos();

    var tarjetasDetalle = estadoCorreo.listaErroresActual.map(function (er) {
      var det = !!estadoCorreo.seleccionados[er.tokId];
      return '<div class="item-correccion-correo ' + (det ? "fue-detectado" : "fue-omitido") + '">' +
        "<div><strong>" + (det ? "✓ Detectado: " : "⚠ No marcado: ") + "</strong>" +
        '<span style="color:#b91c1c;text-decoration:line-through">' + esc(er.mal) + "</span> → " +
        '<strong style="color:#047857">' + esc(er.bien) + "</strong></div>" +
        '<div style="color:#475569;margin-top:0.25rem">' + esc(er.regla) + "</div>" +
        "</div>";
    }).join("");

    var retro = $("correo-retroalimentacion");
    retro.classList.remove("oculto");
    retro.innerHTML =
      "<h3>Resultado de la revisión del correo</h3>" +
      "<p>Errores detectados: <strong style='color:#047857'>" + aciertos + " de " + totalObj + "</strong> · " +
      "Errores no detectados: <strong style='color:#b45309'>" + omitidos + "</strong> · " +
      "Falsos positivos (palabras correctas clicadas): <strong style='color:#b91c1c'>" + falsosPositivos + "</strong></p>" +
      '<div class="lista-correcciones-correo">' + tarjetasDetalle + "</div>";
  });

  $("btn-correo-reintentar").addEventListener("click", cargarCorreoActual);
  $("btn-correo-anterior").addEventListener("click", function () {
    if (estadoCorreo.indice > 0) {
      estadoCorreo.indice -= 1;
      cargarCorreoActual();
    }
  });
  $("btn-correo-siguiente").addEventListener("click", function () {
    if (estadoCorreo.indice < CORREOS_INTERACTIVOS.length - 1) {
      estadoCorreo.indice += 1;
      cargarCorreoActual();
    }
  });

  $("btn-quiz-parrafos-correo").addEventListener("click", function () {
    var pregs = PREGUNTAS_CORREOS_EXTRA.map(function (q) {
      var mez = mezclar([q.correcta].concat(q.incorrectas));
      return {
        id: q.id,
        cat: "correos",
        catNombre: "Errores en correos",
        enunciado: q.pregunta,
        opciones: mez,
        correcta: mez.indexOf(q.correcta),
        explicacion: q.explicacion,
        originalOrto: {
          id: q.id,
          cat: "correos",
          catNombre: "Errores en correos",
          oracion: q.pregunta,
          correcta: q.correcta,
          explicacion: q.explicacion
        }
      };
    });
    $("orto-panel-correos").classList.add("oculto");
    iniciarMotorQuiz({
      contenedorEl: $("orto-motor-quiz"),
      titulo: "Test de Párrafos de Correos Corporativos (16 preguntas)",
      preguntas: mezclar(pregs),
      minutos: 0,
      modoExamen: false,
      alResponder: registrarResultadoOrto,
      alSalir: function () {
        cambiarSubmodoOrto("correos");
      }
    });
  });

  /* Submodo 2D: Escritura / Dictado en contexto */
  var estadoDictado = {
    lote: [],
    indice: 0,
    aciertos: 0,
    comprobado: false
  };

  function poblarSelectorDictado() {
    var html = '<option value="todas">Todas las categorías</option>';
    CATEGORIAS_ORTO.forEach(function (c) {
      html += '<option value="' + esc(c.id) + '">' + esc(c.nombre) + "</option>";
    });
    $("select-cat-dictado").innerHTML = html;
  }

  function iniciarLoteDictado() {
    var catId = $("select-cat-dictado").value || "todas";
    var base = BANCO_ORTO_BASE.filter(function (p) {
      return catId === "todas" || p.cat === catId;
    });
    estadoDictado.lote = mezclar(base).slice(0, 15);
    estadoDictado.indice = 0;
    estadoDictado.aciertos = 0;
    pintarEjercicioDictado();
  }

  function asegurarSesionDictado() {
    if (!estadoDictado.lote.length) iniciarLoteDictado();
  }

  function generarEsqueletoPista(correcta) {
    return correcta.split(" ").map(function (pal) {
      if (pal.length <= 2) return pal[0] + "_";
      return pal[0] + Array(pal.length - 1).join("_") + pal[pal.length - 1];
    }).join("   ");
  }

  function pintarEjercicioDictado() {
    var total = estadoDictado.lote.length;
    if (estadoDictado.indice >= total) {
      $("dictado-instruccion").textContent = "¡Tanda completada! Obtuviste " + estadoDictado.aciertos + " de " + total + " respuestas exactas.";
      $("dictado-frase").textContent = "Pulsa «Nueva tanda (15)» para seguir practicando tu escritura.";
      $("dictado-borrador").classList.add("oculto");
      $("form-dictado").classList.add("oculto");
      $("dictado-barra").style.width = "100%";
      return;
    }

    $("form-dictado").classList.remove("oculto");
    $("dictado-borrador").classList.remove("oculto");
    var p = estadoDictado.lote[estadoDictado.indice];
    estadoDictado.comprobado = false;

    $("dictado-progreso-txt").textContent = "Ejercicio " + (estadoDictado.indice + 1) + " de " + total;
    $("dictado-aciertos-txt").textContent = "Aciertos: " + estadoDictado.aciertos;
    $("dictado-barra").style.width = Math.round((estadoDictado.indice / total) * 100) + "%";
    $("dictado-categoria-badge").textContent = p.catNombre;

    if (p.tipo === "contexto") {
      $("dictado-instruccion").textContent = "Escribe únicamente la palabra o expresión que completa correctamente el espacio en blanco:";
      $("dictado-frase").textContent = "«" + p.oracion + "»";
      $("dictado-borrador").textContent = "Borrador mal escrito detectado: «" + p.incorrectas[0] + "»";
    } else {
      $("dictado-instruccion").textContent = "Corrige el siguiente borrador escribiendo la palabra, frase o avenida de forma 100 % correcta:";
      $("dictado-frase").textContent = "";
      $("dictado-borrador").textContent = "Borrador con error: «" + p.incorrectas[0] + "»";
    }

    $("input-respuesta-dictado").value = "";
    $("input-respuesta-dictado").disabled = false;
    $("btn-comprobar-dictado").classList.remove("oculto");
    $("btn-siguiente-dictado").classList.add("oculto");
    $("dictado-pista-caja").classList.add("oculto");
    $("dictado-feedback").classList.add("oculto");
    $("input-respuesta-dictado").focus();
  }

  $("teclado-tildes-dictado").addEventListener("click", function (ev) {
    var btn = ev.target.closest(".tecla-tilde");
    if (!btn || estadoDictado.comprobado) return;
    var ch = btn.getAttribute("data-char");
    var inp = $("input-respuesta-dictado");
    var ini = inp.selectionStart || inp.value.length;
    var fin = inp.selectionEnd || inp.value.length;
    inp.value = inp.value.slice(0, ini) + ch + inp.value.slice(fin);
    inp.focus();
    inp.setSelectionRange(ini + ch.length, ini + ch.length);
  });

  $("btn-pista-dictado").addEventListener("click", function () {
    var p = estadoDictado.lote[estadoDictado.indice];
    if (!p) return;
    var caja = $("dictado-pista-caja");
    caja.classList.remove("oculto");
    caja.textContent = "Estructura de letras: " + generarEsqueletoPista(p.correcta) + "  (" + p.correcta.length + " caracteres)";
  });

  $("form-dictado").addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (estadoDictado.comprobado) {
      estadoDictado.indice += 1;
      pintarEjercicioDictado();
      return;
    }
    var p = estadoDictado.lote[estadoDictado.indice];
    var escrito = $("input-respuesta-dictado").value.trim().replace(/\s+/g, " ");
    if (!escrito) return;

    estadoDictado.comprobado = true;
    var exacta = escrito === p.correcta;
    if (exacta) estadoDictado.aciertos += 1;
    registrarResultadoOrto(p, exacta);

    $("dictado-aciertos-txt").textContent = "Aciertos: " + estadoDictado.aciertos;
    $("input-respuesta-dictado").disabled = true;
    $("btn-comprobar-dictado").classList.add("oculto");
    $("btn-siguiente-dictado").classList.remove("oculto");

    var fb = $("dictado-feedback");
    fb.classList.remove("oculto", "ok", "err");
    fb.classList.add(exacta ? "ok" : "err");
    fb.innerHTML = (exacta
      ? "<strong>¡Escritura impecable!</strong> «" + esc(p.correcta) + "»."
      : "<strong>Revisa la escritura exacta:</strong> Escribiste «" + esc(escrito) + "» y la forma correcta es <strong>«" + esc(p.correcta) + "»</strong>.") +
      "<br>" + esc(p.explicacion);
    $("btn-siguiente-dictado").focus();
  });

  $("btn-siguiente-dictado").addEventListener("click", function () {
    estadoDictado.indice += 1;
    pintarEjercicioDictado();
  });
  $("select-cat-dictado").addEventListener("change", iniciarLoteDictado);
  $("btn-nuevo-lote-dictado").addEventListener("click", iniciarLoteDictado);

  /* Submodo 2E: Repaso de mis errores */
  function obtenerListaErroresGuardados() {
    return Object.keys(progreso.erroresOrto || {}).map(function (k) {
      return progreso.erroresOrto[k];
    });
  }

  function renderizarPanelErrores() {
    var lista = obtenerListaErroresGuardados();
    $("btn-practicar-errores").disabled = lista.length === 0;
    $("btn-limpiar-errores-guardados").disabled = lista.length === 0;

    if (!lista.length) {
      $("contenedor-lista-errores").innerHTML =
        '<div class="estado-vacio">¡Felicidades! Actualmente no tienes errores pendientes en tu bandeja de repaso.</div>';
      return;
    }

    $("contenedor-lista-errores").innerHTML =
      '<table class="tabla-simple"><thead><tr><th>Forma correcta</th><th>Categoría</th><th>Regla / Explicación</th><th>Fallos</th></tr></thead><tbody>' +
      lista.map(function (e) {
        return "<tr>" +
          "<td><strong style='color:#047857'>" + esc(e.correcta) + "</strong></td>" +
          "<td>" + esc(e.catNombre) + "</td>" +
          "<td>" + esc(e.explicacion) + "</td>" +
          "<td>" + (e.fallos || 1) + "</td>" +
          "</tr>";
      }).join("") +
      "</tbody></table>";
  }

  function lanzarPracticaDeErrores() {
    var lista = obtenerListaErroresGuardados();
    if (!lista.length) return;
    var pregs = lista.map(function (e) {
      if (MAPA_ORTO_ID[e.id]) return MAPA_ORTO_ID[e.id];
      /* Construye pregunta dinámica para errores provenientes de correos clicables */
      var distractores = [e.incorrectaBase || (e.correcta + "s"), e.correcta.toLowerCase() === e.correcta ? e.correcta.toUpperCase() : e.correcta.toLowerCase(), "Ninguna es válida"];
      var unicos = [e.correcta];
      distractores.forEach(function (d) {
        if (d && unicos.indexOf(d) < 0) unicos.push(d);
      });
      while (unicos.length < 4) unicos.push("Variante incorrecta " + unicos.length);
      var mez = mezclar(unicos.slice(0, 4));
      return {
        id: e.id,
        cat: "correos",
        catNombre: e.catNombre,
        enunciado: e.oracion || "Selecciona la escritura correcta:",
        opciones: mez,
        correcta: mez.indexOf(e.correcta),
        explicacion: e.explicacion,
        originalOrto: { id: e.id, cat: "correos", catNombre: e.catNombre, correcta: e.correcta, explicacion: e.explicacion }
      };
    });

    $("orto-panel-errores").classList.add("oculto");
    iniciarMotorQuiz({
      contenedorEl: $("orto-motor-quiz"),
      titulo: "Sesión de Repaso de Mis Errores (" + pregs.length + ")",
      preguntas: mezclar(pregs),
      minutos: 0,
      modoExamen: false,
      alResponder: registrarResultadoOrto,
      alSalir: function () {
        cambiarSubmodoOrto("errores");
      }
    });
  }

  $("btn-practicar-errores").addEventListener("click", lanzarPracticaDeErrores);
  $("btn-limpiar-errores-guardados").addEventListener("click", function () {
    progreso.erroresOrto = {};
    guardarProgreso();
    renderizarPanelErrores();
  });

  /* =========================================================
     3. PESTAÑA PSICOMÉTRICAS (4 exámenes de 30 + 5 habilidades)
     ========================================================= */
  function renderizarInicioPsicometria() {
    $("psico-inicio").classList.remove("oculto");
    $("psico-motor-quiz").classList.add("oculto");
    $("psico-motor-quiz").innerHTML = "";

    $("rejilla-examenes-psico").innerHTML = EXAMENES_PSICO.map(function (ex) {
      var previos = progreso.historialExamenes.filter(function (h) { return h.examenId === ex.id; });
      var mejor = previos.length
        ? "Mejor resultado: " + Math.max.apply(null, previos.map(function (h) { return h.porcentaje; })) + " %"
        : "Sin intentos previos";

      return '<div class="tarjeta-examen-psico">' +
        '<span class="insignia-cat">' + ex.preguntas.length + " preguntas · " + ex.minutos + " min</span>" +
        "<h4>" + esc(ex.titulo) + "</h4>" +
        '<p style="color:#475569;font-size:0.9rem;margin:0">' + esc(ex.subtitulo) + "</p>" +
        '<div style="font-size:0.83rem;color:#047857;font-weight:600;margin-top:auto">' + esc(mejor) + "</div>" +
        '<button type="button" class="btn btn-primario" data-iniciar-psico-ex="' + esc(ex.id) + '">Iniciar simulacro (' + ex.minutos + ":00)</button>" +
        "</div>";
    }).join("");

    $("rejilla-habilidades-psico").innerHTML = CATEGORIAS_PSICO.map(function (cat) {
      var n = TODAS_PSICO.filter(function (p) { return p.cat === cat.id; }).length;
      var est = progreso.psicoCat[cat.id] || { aciertos: 0, total: 0 };
      var dom = est.total > 0
        ? "Precisión: " + Math.round((est.aciertos / est.total) * 100) + " % (" + est.aciertos + "/" + est.total + ")"
        : n + " ejercicios guiados";

      return '<div class="tarjeta-examen-psico">' +
        '<div class="cat-fila-sup"><h4>' + esc(cat.nombre) + '</h4><span class="cat-conteo">' + n + "</span></div>" +
        '<p style="color:#475569;font-size:0.88rem;margin:0">' + esc(cat.descripcion) + "</p>" +
        '<div style="font-size:0.82rem;color:#475569;margin-top:auto">' + esc(dom) + "</div>" +
        '<button type="button" class="btn btn-secundario" data-practicar-psico-cat="' + esc(cat.id) + '">Practicar habilidad</button>' +
        "</div>";
    }).join("");
  }

  $("rejilla-examenes-psico").addEventListener("click", function (ev) {
    var btn = ev.target.closest("[data-iniciar-psico-ex]");
    if (!btn) return;
    var exId = btn.getAttribute("data-iniciar-psico-ex");
    var ex = EXAMENES_PSICO.filter(function (e) { return e.id === exId; })[0];
    if (!ex) return;

    var mapCatNom = {};
    CATEGORIAS_PSICO.forEach(function (c) { mapCatNom[c.id] = c.nombre; });
    var pregs = ex.preguntas.map(function (p) {
      var cp = {};
      for (var k in p) cp[k] = p[k];
      cp.catNombre = mapCatNom[p.cat] || p.cat;
      return cp;
    });

    $("psico-inicio").classList.add("oculto");
    iniciarMotorQuiz({
      contenedorEl: $("psico-motor-quiz"),
      titulo: ex.titulo,
      preguntas: pregs,
      minutos: ex.minutos,
      modoExamen: true,
      alResponder: registrarResultadoPsico,
      alFinalizar: function (res) {
        progreso.historialExamenes.unshift({
          examenId: ex.id,
          fecha: new Date().toLocaleDateString("es-DO"),
          tipo: ex.titulo,
          aciertos: res.aciertos,
          total: res.total,
          porcentaje: res.porcentaje,
          segundos: res.segundos
        });
        progreso.historialExamenes = progreso.historialExamenes.slice(0, 25);
        guardarProgreso();
      },
      alSalir: renderizarInicioPsicometria
    });
  });

  $("rejilla-habilidades-psico").addEventListener("click", function (ev) {
    var btn = ev.target.closest("[data-practicar-psico-cat]");
    if (!btn) return;
    var catId = btn.getAttribute("data-practicar-psico-cat");
    var catObj = CATEGORIAS_PSICO.filter(function (c) { return c.id === catId; })[0];
    var pregs = mezclar(TODAS_PSICO.filter(function (p) { return p.cat === catId; })).map(function (p) {
      /* Las preguntas de letras ya traen su etiqueta «Formato N · …»: se conserva */
      if (!p.catNombre) p.catNombre = catObj ? catObj.nombre : catId;
      return p;
    });

    $("psico-inicio").classList.add("oculto");
    iniciarMotorQuiz({
      contenedorEl: $("psico-motor-quiz"),
      titulo: "Práctica · " + (catObj ? catObj.nombre : catId),
      preguntas: pregs,
      minutos: 0,
      modoExamen: false,
      alResponder: registrarResultadoPsico,
      alSalir: renderizarInicioPsicometria
    });
  });

  /* =========================================================
     4. PESTAÑA PSICOLÓGICAS (Guía, Wartegg, Simulador, Juicio y STAR)
     ========================================================= */
  $("submodos-psicologia").addEventListener("click", function (ev) {
    var btn = ev.target.closest(".submodo-btn");
    if (!btn) return;
    var sub = btn.getAttribute("data-subpsico");
    var botones = $("submodos-psicologia").querySelectorAll(".submodo-btn");
    for (var i = 0; i < botones.length; i++) {
      botones[i].classList.toggle("activo", botones[i] === btn);
    }
    $("psicologia-panel-guia").classList.toggle("oculto", sub !== "guia");
    $("psicologia-panel-simulador").classList.toggle("oculto", sub !== "simulador");
    $("psicologia-panel-situacional").classList.toggle("oculto", sub !== "situacional");
    $("psicologia-panel-entrevista").classList.toggle("oculto", sub !== "entrevista");
  });

  function renderizarSeccionPsicologia() {
    /* 4A: Guías psicológicas */
    $("contenedor-guia-psicologia").innerHTML = GUIA_PSICOLOGIA.map(function (g) {
      return '<article class="tarjeta-guia">' +
        "<div><span class='etiqueta-seccion'>" + esc(g.subtitulo) + "</span><h3>" + esc(g.titulo) + "</h3>" +
        '<p class="guia-resumen">' + esc(g.resumen) + "</p></div>" +
        '<ul class="lista-reglas-guia">' + g.puntos.map(function (pt) { return "<li>" + esc(pt) + "</li>"; }).join("") + "</ul>" +
        '<div class="caja-truco"><strong>Recomendación clave:</strong> ' + esc(g.consejo) + "</div>" +
        "</article>";
    }).join("");

    /* 4A-2: Cuadrícula interactiva Wartegg */
    $("rejilla-wartegg").innerHTML = CAMPOS_WARTEGG.map(function (c, idx) {
      return '<button type="button" class="cuadro-wartegg-btn' + (idx === 0 ? " activo" : "") + '" data-wartegg-idx="' + idx + '" aria-label="Campo ' + c.num + '">' +
        '<span class="wartegg-num">' + c.num + "</span>" +
        '<svg viewBox="0 0 80 80" width="66" height="66">' + c.svg + "</svg>" +
        "</button>";
    }).join("");

    function mostrarCampoWartegg(idx) {
      var c = CAMPOS_WARTEGG[idx];
      $("detalle-wartegg").innerHTML =
        '<span class="insignia-cat">Campo ' + c.num + " · Estímulo " + esc(c.tipo) + "</span>" +
        "<h4>" + esc(c.nombre) + " (" + esc(c.estimulo) + ")</h4>" +
        "<p><strong>Qué evalúa:</strong> " + esc(c.evalua) + "</p>" +
        '<div class="caja-truco"><strong>Consejo práctico de dibujo:</strong> ' + esc(c.sugerencia) + "</div>";
    }
    mostrarCampoWartegg(0);

    $("rejilla-wartegg").addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-wartegg-idx]");
      if (!b) return;
      var idx = parseInt(b.getAttribute("data-wartegg-idx"), 10);
      var todos = $("rejilla-wartegg").querySelectorAll(".cuadro-wartegg-btn");
      for (var i = 0; i < todos.length; i++) todos[i].classList.toggle("activo", i === idx);
      mostrarCampoWartegg(idx);
    });

    /* 4B: Simulador de perfil laboral (24 ítems) */
    $("simulador-instrucciones").textContent = SIMULADOR_PERFIL.instrucciones;
    renderizarItemsSimulador();
    if (progreso.perfilLaboral) {
      pintarResultadoPerfil(progreso.perfilLaboral);
    }

    /* 4D: Entrevista STAR */
    $("contenedor-pasos-star").innerHTML = GUIA_ENTREVISTA.metodoStar.map(function (s) {
      return '<div class="paso-star">' +
        '<div class="letra-star">' + esc(s.letra) + "</div>" +
        "<h4>" + esc(s.titulo) + "</h4>" +
        '<p style="margin:0;font-size:0.9rem;color:#475569">' + esc(s.detalle) + "</p>" +
        "</div>";
    }).join("");

    $("contenedor-preguntas-entrevista").innerHTML = GUIA_ENTREVISTA.preguntas.map(function (q, idx) {
      return '<div class="item-entrevista">' +
        '<button type="button" class="cabecera-entrevista-btn" data-ent-toggle="' + idx + '">' +
          "<span>" + esc(q.pregunta) + "</span><span>▾</span>" +
        "</button>" +
        '<div class="cuerpo-entrevista' + (idx === 0 ? "" : " oculto") + '" data-ent-body="' + idx + '">' +
          "<p style='margin-top:0.75rem'><strong>Qué evalúa RR. HH.:</strong> " + esc(q.evalua) + "</p>" +
          "<p style='color:#b91c1c'><strong>Error que debes evitar:</strong> " + esc(q.evitar) + "</p>" +
          '<div class="respuesta-modelo-star"><strong>Ejemplo de respuesta sólida (STAR):</strong><br>' + esc(q.ejemploStar) + "</div>" +
        "</div>" +
      "</div>";
    }).join("");

    $("contenedor-preguntas-entrevista").addEventListener("click", function (ev) {
      var cab = ev.target.closest("[data-ent-toggle]");
      if (!cab) return;
      var idx = cab.getAttribute("data-ent-toggle");
      var cuerpo = $("contenedor-preguntas-entrevista").querySelector('[data-ent-body="' + idx + '"]');
      if (cuerpo) cuerpo.classList.toggle("oculto");
    });
  }

  var respuestasSimulador = {};

  function renderizarItemsSimulador() {
    $("contenedor-items-simulador").innerHTML = SIMULADOR_PERFIL.items.map(function (it, idx) {
      var valActual = respuestasSimulador[it.id];
      var botones = [1, 2, 3, 4, 5].map(function (v) {
        return '<button type="button" class="btn-escala' + (valActual === v ? " activo" : "") + '" data-sim-id="' + it.id + '" data-sim-val="' + v + '" title="' + esc(SIMULADOR_PERFIL.escala[v - 1].texto) + '">' + v + "</button>";
      }).join("");
      return '<div class="fila-item-simulador">' +
        '<div class="simulador-texto-item"><strong>' + (idx + 1) + ".</strong> " + esc(it.texto) + "</div>" +
        '<div class="simulador-opciones-escala">' + botones + "</div>" +
        "</div>";
    }).join("");
  }

  $("contenedor-items-simulador").addEventListener("click", function (ev) {
    var btn = ev.target.closest("[data-sim-id]");
    if (!btn) return;
    var id = btn.getAttribute("data-sim-id");
    var val = parseInt(btn.getAttribute("data-sim-val"), 10);
    respuestasSimulador[id] = val;
    var fila = btn.parentNode.querySelectorAll(".btn-escala");
    for (var i = 0; i < fila.length; i++) fila[i].classList.toggle("activo", fila[i] === btn);
    $("aviso-simulador-incompleto").classList.add("oculto");
  });

  $("btn-reiniciar-simulador").addEventListener("click", function () {
    respuestasSimulador = {};
    $("resultado-simulador-perfil").classList.add("oculto");
    $("aviso-simulador-incompleto").classList.add("oculto");
    renderizarItemsSimulador();
  });

  function pintarResultadoPerfil(res) {
    var pPrim = SIMULADOR_PERFIL.perfilesDisc[res.primario];
    var pSec = SIMULADOR_PERFIL.perfilesDisc[res.secundario];

    var barrasDisc = ["D", "I", "S", "C"].map(function (k) {
      var pct = res.discPct[k];
      return '<div class="fila-barra-dominio">' +
        '<div class="barra-dom-sup"><span>' + esc(SIMULADOR_PERFIL.perfilesDisc[k].nombre) + "</span><span>" + pct + " %</span></div>" +
        '<div class="barra-progreso-fondo"><div class="barra-progreso-relleno" style="width:' + pct + '%"></div></div>' +
        "</div>";
    }).join("");

    var barrasOcean = Object.keys(SIMULADOR_PERFIL.dimensionesOcean).map(function (k) {
      var pct = res.oceanPct[k];
      return '<div class="fila-barra-dominio">' +
        '<div class="barra-dom-sup"><span>' + esc(SIMULADOR_PERFIL.dimensionesOcean[k]) + "</span><span>" + pct + " %</span></div>" +
        '<div class="barra-progreso-fondo"><div class="barra-progreso-relleno" style="width:' + pct + '%"></div></div>' +
        "</div>";
    }).join("");

    var caja = $("resultado-simulador-perfil");
    caja.classList.remove("oculto");
    caja.innerHTML =
      '<span class="etiqueta-seccion">Perfil orientativo calculado</span>' +
      "<h3>Estilo principal: " + esc(pPrim.nombre) + " · Secundario: " + esc(res.secundario) + "</h3>" +
      "<p><strong>Fortalezas para banca y empresa:</strong> " + esc(pPrim.fortalezas) + "</p>" +
      "<p><strong>Áreas donde sueles destacar:</strong> " + esc(pPrim.rolesAfines) + " (con aporte complementario en: " + esc(pSec.nombre) + ").</p>" +
      '<div class="caja-truco" style="margin-bottom:1.2rem"><strong>Punto a cuidar en pruebas y entrevistas:</strong> ' + esc(pPrim.cuidar) + "</div>" +
      '<div class="rejilla-dos-columnas">' +
        "<div><h4>Dimensiones conductuales DISC</h4>" + barrasDisc + "</div>" +
        "<div><h4>Factores Cinco Grandes (Big Five)</h4>" + barrasOcean + "</div>" +
      "</div>";
  }

  $("btn-calcular-perfil").addEventListener("click", function () {
    var faltantes = SIMULADOR_PERFIL.items.filter(function (it) { return !respuestasSimulador[it.id]; });
    if (faltantes.length > 0) {
      var av = $("aviso-simulador-incompleto");
      av.classList.remove("oculto");
      av.textContent = "Aún te faltan " + faltantes.length + " enunciados por valorar (del 1 al 5) para obtener un perfil preciso.";
      return;
    }

    var sumas = {};
    var maximos = {};
    SIMULADOR_PERFIL.items.forEach(function (it) {
      sumas[it.dim] = (sumas[it.dim] || 0) + respuestasSimulador[it.id];
      maximos[it.dim] = (maximos[it.dim] || 0) + 5;
    });

    var discPct = {};
    ["D", "I", "S", "C"].forEach(function (k) {
      discPct[k] = Math.round((sumas[k] / maximos[k]) * 100);
    });
    var ordenDisc = ["D", "I", "S", "C"].sort(function (a, b) { return discPct[b] - discPct[a]; });

    var oceanPct = {};
    Object.keys(SIMULADOR_PERFIL.dimensionesOcean).forEach(function (k) {
      oceanPct[k] = Math.round((sumas[k] / maximos[k]) * 100);
    });

    var resultado = {
      primario: ordenDisc[0],
      secundario: ordenDisc[1],
      discPct: discPct,
      oceanPct: oceanPct,
      fecha: new Date().toLocaleDateString("es-DO")
    };
    progreso.perfilLaboral = resultado;
    guardarProgreso();
    pintarResultadoPerfil(resultado);
  });

  /* 4C: Juicio Situacional Bancario */
  function lanzarJuicioSituacional(cantidad) {
    var lista = mezclar(JUICIO_SITUACIONAL).slice(0, cantidad).map(function (j) {
      /* Mezcla el orden de las 4 opciones manteniendo el índice correcto */
      var textoCorrecto = j.opciones[j.correcta];
      var mez = mezclar(j.opciones);
      return {
        id: j.id,
        tema: j.tema,
        situacion: j.situacion,
        opciones: mez,
        correcta: mez.indexOf(textoCorrecto),
        explicacion: j.explicacion
      };
    });

    $("situacional-intro").classList.add("oculto");
    iniciarMotorQuiz({
      contenedorEl: $("situacional-motor-quiz"),
      titulo: "Juicio Situacional Bancario (" + lista.length + " casos)",
      preguntas: lista,
      minutos: 0,
      modoExamen: false,
      alFinalizar: function (res) {
        progreso.historialExamenes.unshift({
          fecha: new Date().toLocaleDateString("es-DO"),
          tipo: "Juicio Situacional (" + res.total + " casos)",
          aciertos: res.aciertos,
          total: res.total,
          porcentaje: res.porcentaje,
          segundos: res.segundos
        });
        progreso.historialExamenes = progreso.historialExamenes.slice(0, 25);
        guardarProgreso();
      },
      alSalir: function () {
        $("situacional-intro").classList.remove("oculto");
      }
    });
  }

  $("btn-situacional-todos").addEventListener("click", function () {
    lanzarJuicioSituacional(JUICIO_SITUACIONAL.length);
  });
  $("btn-situacional-corto").addEventListener("click", function () {
    lanzarJuicioSituacional(15);
  });

  /* =========================================================
     5. PESTAÑA MI PROGRESO
     ========================================================= */
  function renderizarPanelProgreso() {
    var tot = calcularTotalesGlobales();
    var pctGlobal = tot.total > 0 ? Math.round((tot.aciertos / tot.total) * 100) + " %" : "0 %";
    var nErr = contarErroresPendientes();
    var nCorreos = Object.keys(progreso.correosCompletados || {}).length;

    $("contenedor-kpis-progreso").innerHTML =
      '<div class="tarjeta-kpi"><div class="kpi-valor">' + tot.total + '</div><div class="kpi-etiqueta">Ejercicios respondidos</div></div>' +
      '<div class="tarjeta-kpi"><div class="kpi-valor">' + pctGlobal + '</div><div class="kpi-etiqueta">Precisión acumulada</div></div>' +
      '<div class="tarjeta-kpi"><div class="kpi-valor">' + nCorreos + " / " + CORREOS_INTERACTIVOS.length + '</div><div class="kpi-etiqueta">Correos auditados</div></div>' +
      '<div class="tarjeta-kpi"><div class="kpi-valor">' + nErr + '</div><div class="kpi-etiqueta">Palabras por reforzar</div></div>';

    $("barras-progreso-orto").innerHTML = CATEGORIAS_ORTO.map(function (c) {
      var st = progreso.ortoCat[c.id] || { aciertos: 0, total: 0 };
      var p = st.total > 0 ? Math.round((st.aciertos / st.total) * 100) : 0;
      var etq = st.total > 0 ? st.aciertos + "/" + st.total + " (" + p + " %)" : "Sin datos";
      return '<div class="fila-barra-dominio">' +
        '<div class="barra-dom-sup"><span>' + esc(c.nombre) + "</span><span>" + etq + "</span></div>" +
        '<div class="barra-progreso-fondo"><div class="barra-progreso-relleno" style="width:' + p + '%"></div></div>' +
        "</div>";
    }).join("");

    $("barras-progreso-psico").innerHTML = CATEGORIAS_PSICO.map(function (c) {
      var st = progreso.psicoCat[c.id] || { aciertos: 0, total: 0 };
      var p = st.total > 0 ? Math.round((st.aciertos / st.total) * 100) : 0;
      var etq = st.total > 0 ? st.aciertos + "/" + st.total + " (" + p + " %)" : "Sin datos";
      return '<div class="fila-barra-dominio">' +
        '<div class="barra-dom-sup"><span>' + esc(c.nombre) + "</span><span>" + etq + "</span></div>" +
        '<div class="barra-progreso-fondo"><div class="barra-progreso-relleno" style="width:' + p + '%"></div></div>' +
        "</div>";
    }).join("");

    if (progreso.perfilLaboral) {
      var pf = SIMULADOR_PERFIL.perfilesDisc[progreso.perfilLaboral.primario];
      $("resumen-perfil-guardado").innerHTML =
        "<strong>Último perfil laboral simulado (" + esc(progreso.perfilLaboral.fecha) + "):</strong><br>" +
        esc(pf.nombre) + " (secundario: " + esc(progreso.perfilLaboral.secundario) + ").";
    } else {
      $("resumen-perfil-guardado").innerHTML =
        '<span style="color:#64748b">Aún no has completado el Simulador de Perfil Laboral en la pestaña «Psicológicas».</span>';
    }

    var listaErr = obtenerListaErroresGuardados();
    $("btn-ir-repaso-desde-progreso").disabled = listaErr.length === 0;
    if (!listaErr.length) {
      $("progreso-lista-palabras-falladas").innerHTML = '<div class="estado-vacio">No tienes palabras pendientes de repaso.</div>';
    } else {
      $("progreso-lista-palabras-falladas").innerHTML =
        '<table class="tabla-simple"><thead><tr><th>Correcta</th><th>Categoría</th><th>Fallos</th></tr></thead><tbody>' +
        listaErr.slice(0, 15).map(function (e) {
          return "<tr><td><strong style='color:#047857'>" + esc(e.correcta) + "</strong></td><td>" + esc(e.catNombre) + "</td><td>" + e.fallos + "</td></tr>";
        }).join("") +
        "</tbody></table>";
    }

    var hist = progreso.historialExamenes || [];
    if (!hist.length) {
      $("progreso-tabla-historial").innerHTML = '<div class="estado-vacio">Aún no has finalizado ningún simulacro completo.</div>';
    } else {
      $("progreso-tabla-historial").innerHTML =
        '<table class="tabla-simple"><thead><tr><th>Fecha</th><th>Simulacro</th><th>Nota</th><th>Tiempo</th></tr></thead><tbody>' +
        hist.map(function (h) {
          return "<tr><td>" + esc(h.fecha) + "</td><td>" + esc(h.tipo) + "</td><td><strong>" + h.aciertos + "/" + h.total + " (" + h.porcentaje + " %)</strong></td><td>" + formatearSegundos(h.segundos) + "</td></tr>";
        }).join("") +
        "</tbody></table>";
    }
  }

  $("btn-ir-repaso-desde-progreso").addEventListener("click", function () {
    activarPestana("ortografia");
    cambiarSubmodoOrto("errores");
  });

  $("btn-pedir-reset").addEventListener("click", function () {
    $("btn-pedir-reset").classList.add("oculto");
    $("confirmacion-reset-caja").classList.remove("oculto");
  });

  $("btn-cancelar-reset").addEventListener("click", function () {
    $("confirmacion-reset-caja").classList.add("oculto");
    $("btn-pedir-reset").classList.remove("oculto");
  });

  $("btn-confirmar-reset").addEventListener("click", function () {
    progreso = estadoInicialProgreso();
    respuestasSimulador = {};
    guardarProgreso();
    $("confirmacion-reset-caja").classList.add("oculto");
    $("btn-pedir-reset").classList.remove("oculto");
    $("resultado-simulador-perfil").classList.add("oculto");
    renderizarItemsSimulador();
    renderizarPanelProgreso();
  });

  /* ---------------------------------------------------------
     Modal de Evaluación y Comentarios de Revisión (V1)
     --------------------------------------------------------- */
  var CLAVE_FB_V1 = "orto_psico_feedback_v1";

  function cargarFeedbackV1() {
    try {
      var raw = localStorage.getItem(CLAVE_FB_V1);
      if (!raw) return;
      var d = JSON.parse(raw);
      if ($("fb-v1-autor")) $("fb-v1-autor").value = d.autor || "";
      if ($("fb-v1-calificacion") && d.calificacion) $("fb-v1-calificacion").value = d.calificacion;
      if ($("fb-v1-ortografia")) $("fb-v1-ortografia").value = d.ortografia || "";
      if ($("fb-v1-psico")) $("fb-v1-psico").value = d.psico || "";
      if ($("fb-v1-general")) $("fb-v1-general").value = d.general || "";
    } catch (e) {}
  }

  function guardarFeedbackV1() {
    try {
      var d = {
        autor: $("fb-v1-autor") ? $("fb-v1-autor").value : "",
        calificacion: $("fb-v1-calificacion") ? $("fb-v1-calificacion").value : "",
        ortografia: $("fb-v1-ortografia") ? $("fb-v1-ortografia").value : "",
        psico: $("fb-v1-psico") ? $("fb-v1-psico").value : "",
        general: $("fb-v1-general") ? $("fb-v1-general").value : ""
      };
      localStorage.setItem(CLAVE_FB_V1, JSON.stringify(d));
    } catch (e) {}
  }

  function construirTextoFeedbackV1() {
    var autor = ($("fb-v1-autor") && $("fb-v1-autor").value.trim()) || "Evaluador";
    var cal = ($("fb-v1-calificacion") && $("fb-v1-calificacion").value) || "Sin calificar";
    var orto = ($("fb-v1-ortografia") && $("fb-v1-ortografia").value.trim()) || "Sin observaciones adicionales.";
    var psico = ($("fb-v1-psico") && $("fb-v1-psico").value.trim()) || "Sin observaciones adicionales.";
    var gen = ($("fb-v1-general") && $("fb-v1-general").value.trim()) || "Sin observaciones adicionales.";
    return [
      "=== EVALUACIÓN DE PLATAFORMA — VERSIÓN V1 ===",
      "Fecha: " + new Date().toLocaleDateString("es-DO"),
      "Evaluador: " + autor,
      "Valoración general: " + cal,
      "",
      "1) Ortografía, Reglas y Correos Corporativos:",
      orto,
      "",
      "2) Pruebas Psicométricas y Psicológicas:",
      psico,
      "",
      "3) Sugerencias generales para V2:",
      gen
    ].join("\n");
  }

  function abrirModalFeedbackV1() {
    cargarFeedbackV1();
    if ($("fb-v1-aviso")) $("fb-v1-aviso").classList.add("oculto");
    if ($("modal-feedback-v1")) $("modal-feedback-v1").classList.remove("oculto");
  }

  function cerrarModalFeedbackV1() {
    guardarFeedbackV1();
    if ($("modal-feedback-v1")) $("modal-feedback-v1").classList.add("oculto");
  }

  if ($("btn-abrir-feedback-v1")) $("btn-abrir-feedback-v1").addEventListener("click", abrirModalFeedbackV1);
  if ($("btn-abrir-feedback-pie")) $("btn-abrir-feedback-pie").addEventListener("click", abrirModalFeedbackV1);
  if ($("btn-cerrar-feedback-v1")) $("btn-cerrar-feedback-v1").addEventListener("click", cerrarModalFeedbackV1);
  if ($("modal-feedback-v1")) {
    $("modal-feedback-v1").addEventListener("click", function (e) {
      if (e.target === $("modal-feedback-v1")) cerrarModalFeedbackV1();
    });
  }
  ["fb-v1-autor", "fb-v1-calificacion", "fb-v1-ortografia", "fb-v1-psico", "fb-v1-general"].forEach(function (id) {
    if ($(id)) $(id).addEventListener("input", guardarFeedbackV1);
  });

  if ($("btn-copiar-feedback-v1")) {
    $("btn-copiar-feedback-v1").addEventListener("click", function () {
      guardarFeedbackV1();
      var txt = construirTextoFeedbackV1();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(function () {
          $("fb-v1-aviso").textContent = "¡Comentarios de la V1 copiados al portapapeles! Ya puedes pegarlos en WhatsApp o correo.";
          $("fb-v1-aviso").classList.remove("oculto");
        });
      } else {
        var ta = document.createElement("textarea");
        ta.value = txt;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        $("fb-v1-aviso").textContent = "¡Comentarios de la V1 copiados al portapapeles!";
        $("fb-v1-aviso").classList.remove("oculto");
      }
    });
  }

  if ($("btn-descargar-feedback-v1")) {
    $("btn-descargar-feedback-v1").addEventListener("click", function () {
      guardarFeedbackV1();
      var txt = construirTextoFeedbackV1();
      var blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "comentarios-evaluacion-V1.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      $("fb-v1-aviso").textContent = "Archivo comentarios-evaluacion-V1.txt descargado.";
      $("fb-v1-aviso").classList.remove("oculto");
    });
  }

  /* ---------------------------------------------------------
     Inicialización al abrir index.html
     --------------------------------------------------------- */
  function iniciarAplicacion() {
    actualizarResumenCabecera();
    renderizarFiltrosGuias();
    renderizarTarjetasGuias("");
    poblarSelectorDictado();
    renderizarCategoriasOrto();
    renderizarInicioPsicometria();
    renderizarSeccionPsicologia();
  }

  /* ---------------------------------------------------------
     Interfaz mínima para app-extras.js (pruebas añadidas en la V2:
     dominó, preguntas de letras, comprobación, dictado de cifras
     y «palabra mal escrita»). Solo expone lo que esos módulos usan.
     --------------------------------------------------------- */
  window.APP_BANCA = {
    $: $,
    esc: esc,
    mezclar: mezclar,
    formatearSegundos: formatearSegundos,
    iniciarMotorQuiz: iniciarMotorQuiz,
    detenerTemporizador: detenerTemporizador,
    registrarResultadoOrto: registrarResultadoOrto,
    registrarResultadoPsico: registrarResultadoPsico,
    cambiarSubmodoOrto: cambiarSubmodoOrto,
    renderizarInicioPsicometria: renderizarInicioPsicometria,
    obtenerBancoOrto: function () { return BANCO_ORTO; },
    obtenerTodasPsico: function () { return TODAS_PSICO; },
    obtenerProgreso: function () { return progreso; },
    guardarProgreso: guardarProgreso,
    registrarSimulacro: function (entrada) {
      progreso.historialExamenes.unshift(entrada);
      progreso.historialExamenes = progreso.historialExamenes.slice(0, 25);
      guardarProgreso();
    }
  };

  iniciarAplicacion();
})();
