/* =========================================================
   Correos corporativos y bancarios interactivos, preguntas
   de párrafos de correo y guías completas de aprendizaje.
   Norma ortográfica: RAE (2010). Sin dependencias externas.
   ========================================================= */

var CORREOS_INTERACTIVOS = [
  {
    id: "cor-01",
    categoria: "Banca Personal · Préstamos",
    titulo: "Documentación pendiente para préstamo hipotecario",
    de: "Mariela Almonte <m.almonte@bancodominicano.com.do>",
    para: "Carlos Henríquez <c.henriquez@correo-rd.do>",
    fecha: "14 de marzo de 2026, 9:15 a. m.",
    asunto: "Requisitos pendientes para su {prestamo|préstamo|«Préstamo» es palabra esdrújula (prés-ta-mo); todas las esdrújulas llevan tilde.} hipotecario",
    cuerpo: "Estimado señor Henríquez:\n\nPor medio del presente le saludamos cordialmente y le informamos que hemos recibido su {solisitud|solicitud|«Solicitud» se escribe con «c» (so-li-ci-tud), igual que «solicitar».} de financiamiento. Sin embargo, al revisar el expediente notamos que falta el estado de cuenta más {resiente|reciente|«Reciente» se escribe con «c» en la terminación «-iente».} y una copia legible de su {cedula|cédula|«Cédula» es palabra esdrújula (cé-du-la) y siempre lleva tilde.}.\n\nLe agradecemos que nos {envie|envíe|«Envíe» lleva tilde en la «í» por hiato de vocal cerrada tónica seguida de vocal abierta (en-ví-e).} estos documentos {através|a través|La locución «a través» se escribe siempre en dos palabras y con tilde en «través».} de esta misma vía antes del próximo viernes, o los deposite en nuestra sucursal de la Avenida {Jhon|John|El nombre «John» (en Avenida John F. Kennedy) lleva la «h» después de la «o», nunca «Jhon».} F. Kennedy.\n\nQuedamos a su entera disposición ante cualquier consulta.\n\nSaludos cordiales,\nMariela Almonte\nOficial de Negocios"
  },
  {
    id: "cor-02",
    categoria: "Operaciones · Estados de Cuenta",
    titulo: "Aclaración sobre cargos en tarjeta de crédito",
    de: "Servicio al Cliente <atencion@bancodominicano.com.do>",
    para: "Laura Peña <l.pena@empresa-sdq.do>",
    fecha: "16 de marzo de 2026, 10:40 a. m.",
    asunto: "Respuesta a su reclamación de {targéta|tarjeta|«Tarjeta» se escribe con «j» y no lleva tilde por ser palabra llana terminada en vocal.} de crédito",
    cuerpo: "Estimada señora Peña:\n\n{Agradesco|Agradezco|Los verbos terminados en «-cer» forman la primera persona del presente con «-zco»: agradecer → agradezco.} su comunicación del pasado martes. Luego de realizar el {analisis|análisis|«Análisis» es palabra esdrújula (a-ná-li-sis) y siempre lleva tilde.} correspondiente en nuestro sistema, confirmamos que {hubieron|hubo|Cuando el verbo «haber» indica existencia es impersonal y solo se usa en singular: «hubo dos cargos», nunca «hubieron».} dos cargos duplicados por error de conexión del comercio.\n\nYa procedimos con el reverso del monto total y verá el ajuste reflejado en su {proximo|próximo|«Próximo» es palabra esdrújula (pró-xi-mo) y lleva tilde.} corte del mes de {Abril|abril|En español, los meses del año y los días de la semana se escriben con minúscula inicial.}.\n\nLamentamos los inconvenientes causados y reiteramos nuestro compromiso de brindarle un excelente servicio.\n\nAtentamente,\nDepartamento de Reclamaciones"
  },
  {
    id: "cor-03",
    categoria: "Gerencia · Reunión de Equipo",
    titulo: "Convocatoria a reunión mensual de resultados",
    de: "Roberto Guzmán <r.guzman@corporaciondeleste.com.do>",
    para: "Equipo Comercial <comercial@corporaciondeleste.com.do>",
    fecha: "18 de marzo de 2026, 8:05 a. m.",
    asunto: "Convocatoria a {reunion|reunión|«Reunión» es palabra aguda terminada en «n» (reu-nión); por tanto, lleva tilde.} de cierre mensual",
    cuerpo: "Buenos días, equipo:\n\nLes convoco a nuestra sesión mensual este {Jueves|jueves|Los días de la semana se escriben con minúscula inicial en español.} a las 3:00 p. m. en el salón principal de la torre corporativa ubicada en la Avenida {Abrahan|Abraham|El nombre «Abraham» (en Avenida Abraham Lincoln) termina en «m», no en «n».} {Lincon|Lincoln|El apellido «Lincoln» lleva una «l» antes de la «n» final (Lin-coln).}.\n\nVamos {haber|a ver|«A ver» (preposición «a» + verbo «ver») equivale a «veamos» o «revisemos»; no debe confundirse con el verbo «haber».} los indicadores de ventas del trimestre y las metas del nuevo proyecto. Es indispensable que cada supervisor traiga su {resúmen|resumen|«Resumen» es palabra llana terminada en «n» y NO lleva tilde (su plural «resúmenes» sí la lleva por ser esdrújula).} ejecutivo impreso.\n\nPor favor, confirmen su {asistensia|asistencia|Las palabras terminadas en «-ancia» y «-encia» se escriben con «c» (excepto «ansia» y «hortensia»).} antes del mediodía.\n\nSaludos,\nRoberto Guzmán\nGerente Comercial"
  },
  {
    id: "cor-04",
    categoria: "Auditoría y QA · Sistemas",
    titulo: "Reporte de incidencias antes del pase a producción",
    de: "Daniela Mejía <d.mejia@tecnobanca.com.do>",
    para: "Desarrollo Core <desarrollo@tecnobanca.com.do>",
    fecha: "19 de marzo de 2026, 5:20 p. m.",
    asunto: "Hallazgos de pruebas en el módulo de {conciliasión|conciliación|«Conciliación» proviene de «conciliar» y se escribe con la terminación «-ción» y tilde.}",
    cuerpo: "Estimados compañeros:\n\n{Ajunto|Adjunto|La palabra «adjunto» conserva el grupo consonántico «dj» (ad-jun-to).} encontrarán el informe técnico de aseguramiento de calidad sobre la nueva versión del portal transaccional. Durante las pruebas detectamos cinco errores críticos; {hay|ahí|«Ahí» (con «h» intercalada y tilde) es adverbio de lugar («en ese documento»); «hay» es forma del verbo «haber».} en la tercera hoja detallamos los pasos exactos para reproducirlos.\n\nEsperamos que no {haiga|haya|La forma correcta del presente de subjuntivo del verbo «haber» es «haya»; «haiga» es un vulgarismo.} retrasos en las correcciones, ya que si el equipo no resuelve estos casos hoy, {sino|si no|Debe escribirse separado («si no») cuando expresa condición negativa: «si no se corrige mañana, pospondremos la salida».} se corrigen antes de mañana al mediodía, tendremos que posponer la salida a producción.\n\nQuedo atenta a la actualización del {codigo|código|«Código» es palabra esdrújula (có-di-go) y lleva tilde.}.\n\nCordialmente,\nDaniela Mejía\nAnalista Líder de QA"
  },
  {
    id: "cor-05",
    categoria: "Recursos Humanos · Bienvenida",
    titulo: "Inducción para personal de nuevo ingreso",
    de: "Gestión Humana <rrhh@grupoempresarialrd.com.do>",
    para: "Nuevos Ingresos <ingresos@grupoempresarialrd.com.do>",
    fecha: "20 de marzo de 2026, 11:00 a. m.",
    asunto: "Programa de {indución|inducción|Cuando en la familia léxica existe «-ct-» (inductor, inductivo), el sustantivo se escribe con doble «c»: «inducción».} corporativa",
    cuerpo: "Estimados colaboradores:\n\n¡Bienvenidos a nuestra institución! Nos alegra recibirlos y deseamos que esta etapa sea de gran crecimiento profesional. La jornada de bienvenida se {realisará|realizará|El verbo «realizar» y sus formas conservan la «z» ante «a» y «o»: «realizará».} el próximo lunes en nuestra sede de la Avenida {Wiston|Winston|El nombre «Winston» (en Avenida Winston Churchill) lleva «n» antes de la «s»: Wins-ton.} {Churchil|Churchill|El apellido «Churchill» termina con doble «l».}, tercer piso.\n\nRecuerden traer su documento de identidad y llegar quince minutos antes para el registro de acceso. También les entregaremos el {guión|guion|Desde la Ortografía de la RAE de 2010, «guion» se considera monosílabo ortográfico y se escribe siempre sin tilde.} de actividades y el manual de ética.\n\nSi alguien tiene algún {imconveniente|inconveniente|Antes de «c» y de «v» se escribe «n», nunca «m»: in-con-ve-nien-te.} para llegar, puede comunicarse con recepción.\n\nSaludos cordiales,\nDepartamento de Gestión Humana"
  },
  {
    id: "cor-06",
    categoria: "Cumplimiento · PLAFT",
    titulo: "Actualización obligatoria de expediente Conozca a su Cliente",
    de: "Cumplimiento Normativo <cumplimiento@bancodominicano.com.do>",
    para: "Gerentes de Sucursal <sucursales@bancodominicano.com.do>",
    fecha: "21 de marzo de 2026, 2:30 p. m.",
    asunto: "Actualización regulatoria de expedientes de alto {riezgo|riesgo|«Riesgo» se escribe con «s», igual que «arriesgar».}",
    cuerpo: "Estimados gerentes:\n\nDe conformidad con las normativas vigentes de prevención de lavado de activos, les recordamos que es {nesesario|necesario|«Necesario» se escribe primero con «c» y luego con «s»: ne-ce-sa-rio.} completar la debida diligencia reforzada de las cuentas corporativas asignadas a su cartera.\n\nEn la auditoría anterior {habían|había|El verbo «haber» impersonal (existencia) va siempre en singular: «había veinticinco expedientes», no «habían».} veinticinco expedientes sin sustento de {orígen|origen|«Origen» es palabra llana terminada en «n» y no lleva tilde (su plural «orígenes» sí lleva tilde).} de fondos. Por ello, cada oficial debe {berificar|verificar|«Verificar» se escribe con «v» inicial.} las declaraciones juradas antes del cierre del mes.\n\nAgradecemos su estricto apego a los controles internos.\n\nAtentamente,\nDirección de Cumplimiento"
  },
  {
    id: "cor-07",
    categoria: "Tesorería · Transferencias Internacionales",
    titulo: "Confirmación de transferencia cablegráfica y tasa de cambio",
    de: "Mesa de Divisas <divisas@bancodominicano.com.do>",
    para: "Importadora Del Valle <finanzas@importadoradelvalle.do>",
    fecha: "23 de marzo de 2026, 11:45 a. m.",
    asunto: "Confirmación de {transación|transacción|«Transacción» se escribe con doble «c» (trans-ac-ción) y lleva tilde por ser aguda terminada en «n».} internacional",
    cuerpo: "Estimado licenciado Morales:\n\nPor esta vía confirmamos que su transferencia al exterior {fué|fue|«Fue» es un monosílabo y nunca lleva tilde.} procesada con éxito en horas de la mañana. Se aplicó una {taza|tasa|Cuando se refiere a porcentaje, índice o tipo de cambio se escribe «tasa» con «s»; «taza» con «z» es el recipiente para beber.} preferencial autorizada por nuestra mesa de cambio para operaciones de {diviza|divisa|«Divisa» empieza por «div-» y su terminación se escribe con «s»: di-vi-sa.}.\n\nEn el comprobante anexo podrá visualizar el monto debitado y la {comición|comisión|«Comisión» se escribe con «s» en la terminación «-sión» y lleva tilde.} bancaria correspondiente. {Sólo|Solo|Según la RAE (2010), el adverbio «solo» («únicamente») se escribe sin tilde.} resta esperar la acreditación del banco corresponsal en un plazo de veinticuatro horas.\n\nSaludos cordiales,\nUnidad de Comercio Exterior"
  },
  {
    id: "cor-08",
    categoria: "Compras y Proveedores · Cotizaciones",
    titulo: "Solicitud de propuesta económica para mobiliario de oficina",
    de: "Compras Corporativas <compras@segurosantillanos.com.do>",
    para: "Muebles y Diseños Caribe <ventas@mueblescaribe.do>",
    fecha: "24 de marzo de 2026, 9:50 a. m.",
    asunto: "Solicitud de {cotisación|cotización|«Cotización» proviene de «cotizar» (con «z») y termina en «-ción» con tilde.} para nueva sucursal",
    cuerpo: "Estimados señores:\n\nNuestra empresa abrirá próximamente una oficina de atención en la Avenida {Nuñez|Núñez|El apellido «Núñez» es palabra llana terminada en «z» y lleva tilde en la «ú».} de {Caceres|Cáceres|«Cáceres» es palabra esdrújula (Cá-ce-res) y lleva tilde en la «á».}, por lo cual invitamos a cada {provedor|proveedor|«Proveedor» proviene del verbo «proveer» y se escribe con doble «e»: pro-ve-e-dor.} registrado a presentar su oferta técnica y económica.\n\nNecesitamos cuarenta escritorios ergonómicos y sillas ejecutivas con {garantia|garantía|«Garantía» lleva tilde en la «í» por hiato de vocal cerrada tónica ante vocal abierta (ga-ran-tí-a).} mínima de tres años. El {presupesto|presupuesto|La palabra correcta es «presupuesto» (pre-su-pues-to), con diptongo «ue».} debe detallar por separado el impuesto y el costo de transporte e instalación.\n\nQuedamos a la espera de su propuesta antes del viernes.\n\nAtentamente,\nDepartamento de Compras"
  },
  {
    id: "cor-09",
    categoria: "Cobros · Gestión Preventiva",
    titulo: "Recordatorio cordial de fecha límite de pago",
    de: "Gestión de Cobros <cobros@bancodominicano.com.do>",
    para: "Andrés Villalona <a.villalona@correo-rd.do>",
    fecha: "25 de marzo de 2026, 4:10 p. m.",
    asunto: "Recordatorio de vencimiento de cuota de su {credito|crédito|«Crédito» es palabra esdrújula (cré-di-to) y lleva tilde.}",
    cuerpo: "Estimado señor Villalona:\n\nEsperamos que se encuentre muy bien. Le escribimos de manera preventiva para recordarle que el {dia|día|«Día» lleva tilde en la «í» por hiato (dí-a).} treinta de este mes vence la cuota mensual de su facilidad comercial.\n\nPuede efectuar el pago sin {ningun|ningún|«Ningún» es palabra aguda terminada en «n» y lleva tilde.} recargo mediante transferencia en línea o en cualquiera de nuestras oficinas. Si usted ya realizó el abono —o como nos indicó que ya {habia|había|«Había» lleva tilde en la «í» por hiato (ha-bí-a).} programado el {débitto|débito|«Débito» se escribe con una sola «t» y con tilde por ser esdrújula.} automático—, le pedimos omitir {éste|este|Según la RAE (2010), los demostrativos («este», «ese», «aquel») no llevan tilde.} aviso.\n\nAgradecemos su puntualidad y preferencia.\n\nSaludos cordiales,\nUnidad de Cartera Activa"
  },
  {
    id: "cor-10",
    categoria: "Atención al Cliente · Sucursales",
    titulo: "Aviso de mantenimiento eléctrico en agencia bancaria",
    de: "Comunicaciones Internas <avisos@bancodominicano.com.do>",
    para: "Clientes Zona Oriental <clientes@bancodominicano.com.do>",
    fecha: "26 de marzo de 2026, 1:15 p. m.",
    asunto: "Cambio temporal de {orario|horario|«Horario» proviene de «hora» y se escribe siempre con «h» inicial.} en sucursal Santo Domingo Este",
    cuerpo: "Estimados clientes:\n\nLes informamos que este sábado nuestra oficina situada en la Avenida {Charle|Charles|El nombre correcto de la vía es Avenida Charles de Gaulle, con «s» final en «Charles».} de {Gaule|Gaulle|El apellido francés «Gaulle» se escribe con doble «l»: Gau-lle.} cerrará a las 12:00 p. m. debido a trabajos programados de mantenimiento en la planta eléctrica.\n\nDurante la tarde tendrán disponibles nuestros cajeros automáticos y todos los canales digitales para hacer consultas, pagos y transferencias sin {interrupsión|interrupción|«Interrupción» proviene de «interrumpir» y se escribe con «pc» antes de «-ión»: in-te-rrup-ción.}. El servicio habitual para todo el {publico|público|«Público» es palabra esdrújula (pú-bli-co) y lleva tilde.} se retomará el lunes a las 8:30 a. m.\n\n{Porfavor|Por favor|La expresión «por favor» se escribe siempre separada en dos palabras.} tomen las previsiones de lugar.\n\nAtentamente,\nGerencia de Canales"
  },
  {
    id: "cor-11",
    categoria: "Contabilidad · Cierre Fiscal",
    titulo: "Entrega de comprobantes fiscales del mes",
    de: "Contabilidad General <contabilidad@grupomirador.com.do>",
    para: "Encargados de Área <encargados@grupomirador.com.do>",
    fecha: "27 de marzo de 2026, 10:00 a. m.",
    asunto: "Recepción de facturas con valor de crédito {fizcal|fiscal|«Fiscal» se escribe con «s», igual que «fisco».}",
    cuerpo: "Estimados encargados:\n\nCon miras al cierre contable del mes, les solicitamos remitir todas las facturas pendientes de caja chica a más tardar mañana antes de las 4:00 p. m. Es fundamental revisar que el número de comprobante no {este|esté|«Esté» lleva tilde cuando corresponde al verbo «estar» (palabra aguda terminada en vocal), para diferenciarlo del demostrativo «este».} vencido y que coincida exactamente con la razón social de la {compañia|compañía|«Compañía» lleva tilde en la «í» por hiato (com-pa-ñí-a).}.\n\nEl mes pasado {nadien|nadie|El pronombre indefinido correcto es «nadie»; «nadien» es un vulgarismo que debe evitarse.} del equipo de logística entregó a tiempo los soportes de combustible, lo cual {ocasiono|ocasionó|«Ocasionó» (pasado en tercera persona) es palabra aguda terminada en vocal y lleva tilde.} diferencias en el reporte impositivo. Contamos con la colaboración de cada {area|área|«Área» es palabra esdrújula (á-re-a) formada por hiato de vocales abiertas y lleva tilde.}.\n\nSaludos cordiales,\nDepartamento de Contabilidad"
  },
  {
    id: "cor-12",
    categoria: "Banca Digital · Seguridad",
    titulo: "Alerta preventiva contra correos fraudulentos",
    de: "Seguridad de la Información <ciberseguridad@bancodominicano.com.do>",
    para: "Toda la Organización <personal@bancodominicano.com.do>",
    fecha: "28 de marzo de 2026, 8:45 a. m.",
    asunto: "Campaña de {prebención|prevención|«Prevención» proviene de «prevenir» (con «v») y termina en «-ción» con tilde.} contra intentos de suplantación",
    cuerpo: "Estimados colaboradores:\n\nEn los últimos días hemos detectado mensajes externos sospechosos que intentan obtener contraseñas corporativas. Recuerden que el área de {tecnolojía|tecnología|Todos los sustantivos terminados en «-logía» se escriben con «g» y llevan tilde por hiato.} jamás solicita claves personales ni códigos de validación por correo {electronico|electrónico|«Electrónico» es palabra esdrújula (e-lec-tró-ni-co) y lleva tilde.}.\n\n{Aveces|A veces|La locución adverbial «a veces» se escribe siempre en dos palabras y con «c».} estos correos imitan el logotipo institucional para engañar al usuario. Si usted {resibe|recibe|El verbo «recibir» y todas sus formas se escriben con «c» y con «b»: re-ci-be.} un enlace dudoso, no haga clic en él y repórtelo de inmediato a la extensión 4400.\n\nProteger la información es responsabilidad de todos.\n\nAtentamente,\nOficina de Ciberseguridad"
  },
  {
    id: "cor-13",
    categoria: "Operaciones de Caja · Cuadre Diario",
    titulo: "Diferencia detectada en arqueo de bóveda y ventanilla",
    de: "Supervisión Operativa <operaciones@bancodominicano.com.do>",
    para: "Luis Polanco <l.polanco@bancodominicano.com.do>",
    fecha: "30 de marzo de 2026, 6:05 p. m.",
    asunto: "Revisión de arqueo vespertino en sucursal {Maximo|Máximo|«Máximo» es palabra esdrújula (má-xi-mo) y lleva tilde.} {Gomez|Gómez|«Gómez» es palabra llana terminada en «z» y lleva tilde.}",
    cuerpo: "Estimado Luis:\n\nAl revisar el acta de cierre de hoy observamos una diferencia menor en el desglose de efectivo de la ventanilla tres. En la conversación telefónica me {dijistes|dijiste|La segunda persona singular del pretérito perfecto simple nunca lleva «-s» al final: lo correcto es «dijiste».} que {habia|había|«Había» lleva tilde en la «í» por hiato.} un volante pendiente de digitación por un depósito mixto.\n\nPor favor, {rebisa|revisa|«Revisar» se escribe con «v» y con «s»: re-vi-sa.} mañana a primera hora las tiras de auditoría junto al subgerente para dejar el cuadre conciliado antes de abrir la oficina. Cualquier ajuste adicional debe quedar debidamente {justifikado|justificado|En español el sonido /k/ ante «a», «o», «u» se representa con «c»: justificado.} en el sistema.\n\nSaludos,\nSupervisión de Operaciones"
  },
  {
    id: "cor-14",
    categoria: "Negocios Corporativos · Propuesta",
    titulo: "Presentación de nómina electrónica empresarial",
    de: "Banca Corporativa <corporativa@bancodominicano.com.do>",
    para: "Patricia Tavárez <p.tavarez@industriasdelnorte.do>",
    fecha: "31 de marzo de 2026, 3:25 p. m.",
    asunto: "Propuesta de afiliación al servicio de {nomina|nómina|«Nómina» es palabra esdrújula (nó-mi-na) y siempre lleva tilde.} automática",
    cuerpo: "Estimada licenciada Tavárez:\n\nFue un gusto conversar con usted durante nuestra visita a sus instalaciones en Santiago de los {Cavalleros|Caballeros|«Caballeros» se escribe con «b» y doble «l» (como «caballo»).}. Tal como acordamos, le remito las condiciones preferenciales para dispersar los pagos quincenales de su personal sin costo de emisión de tarjetas.\n\nEstoy {deacuerdo|de acuerdo|La locución «de acuerdo» se escribe siempre separada en dos palabras.} con incluir la capacitación presencial para su equipo administrativo. Además, cada empleado obtendrá {benefisios|beneficios|«Beneficios» empieza con «bene-» (con «b») y termina en «-cios» con «c».} inmediatos en tasas de consumo y acceso sin cargos a nuestra red nacional.\n\nQuedo atento por si desea que {vallamos|vayamos|La forma correcta del verbo «ir» es «vayamos» con «y»; «vallamos» con «ll» pertenece al verbo «vallar» (cercar).} el {Miercoles|miércoles|Los días de la semana van en minúscula y «miércoles» lleva tilde por ser palabra esdrújula.} a recoger los formularios firmados.\n\nCordialmente,\nEjecutivo de Cuentas Corporativas"
  },
  {
    id: "cor-15",
    categoria: "Recursos Humanos · Vacaciones",
    titulo: "Aprobación de solicitud de vacaciones anuales",
    de: "Nómina y Compensación <compensacion@corporaciondeleste.com.do>",
    para: "Esteban Rosario <e.rosario@corporaciondeleste.com.do>",
    fecha: "1 de abril de 2026, 11:10 a. m.",
    asunto: "Confirmación de disfrute de {bacaciones|vacaciones|«Vacaciones» se escribe con «v» inicial y con «c» en ambas sílabas finales.}",
    cuerpo: "Estimado Esteban:\n\nTe informamos que tu solicitud correspondiente al período anual ha sido {aprovada|aprobada|«Aprobar» y sus derivados («aprobada», «aprobación») se escriben con «b».} por la gerencia de tu departamento. Tus catorce días laborables iniciarán el lunes seis de {Mayo|mayo|Los meses del año se escriben siempre con minúscula inicial en español.} y deberás reintegrarte el martes veintiséis.\n\nAntes de salir, recuerda dejar configurada la respuesta automática en tu buzón y entregar la matriz de {seguimíento|seguimiento|«Seguimiento» contiene el diptongo «ie» y es palabra llana terminada en vocal; por tanto, no lleva tilde.} a tu suplente para que ningún caso urgente quede detenido. El bono vacacional te {sera|será|«Será» (futuro del verbo «ser») es palabra aguda terminada en vocal y lleva tilde.} acreditado en la próxima quincena.\n\n¡Que disfrutes tu descanso!\n\nSaludos cordiales,\nUnidad de Compensación y Beneficios"
  },
  {
    id: "cor-16",
    categoria: "Departamento Legal · Contratos",
    titulo: "Observaciones al contrato de arrendamiento comercial",
    de: "Consultoría Jurídica <legal@grupoempresarialrd.com.do>",
    para: "Administración <administracion@grupoempresarialrd.com.do>",
    fecha: "2 de abril de 2026, 4:50 p. m.",
    asunto: "Revisión legal de contrato para local en Avenida Gustavo {Mejia|Mejía|El apellido «Mejía» lleva tilde en la «í» por hiato (Me-jí-a).} Ricart",
    cuerpo: "Estimados colegas:\n\nHemos concluido la revisión del borrador de alquiler para el nuevo punto de servicio. En sentido general el texto protege los intereses de la empresa, aunque recomendamos modificar dos cláusulas antes de que el representante legal lo {fírme|firme|«Firme» es palabra llana terminada en vocal; no lleva tilde.}.\n\nEn primer lugar, la penalidad por terminación anticipada resulta {exesiva|excesiva|«Excesiva» se escribe con «xc» (ex-ce-si-va) y con «v» en la terminación «-iva».}; en segundo lugar, conviene precisar que el propietario {absorverá|absorberá|«Absorber» (asumir un gasto o empapar) se escribe con «b» en ambas sílabas; no debe confundirse con «absolver» (perdonar).} las reparaciones estructurales del inmueble. {Osea|O sea|El conector explicativo «o sea» («es decir») se escribe siempre en dos palabras separadas.}, solo asumiremos el mantenimiento ordinario interior.\n\nAdjuntamos la versión con control de cambios para remitirla al arrendador.\n\nAtentamente,\nConsultoría Jurídica"
  },
  {
    id: "cor-17",
    categoria: "Servicio al Cliente · Certificaciones",
    titulo: "Entrega de carta de referencia bancaria para embajada",
    de: "Centro de Atención <certificaciones@bancodominicano.com.do>",
    para: "Sofía Peralta <s.peralta@correo-rd.do>",
    fecha: "3 de abril de 2026, 9:30 a. m.",
    asunto: "Disponibilidad de su carta de {referensia|referencia|Las palabras terminadas en «-encia» se escriben con «c»: referencia, transferencia, vigencia.} bancaria",
    cuerpo: "Estimada señora Peralta:\n\nLe notificamos que la certificación de balances solicitada para trámites consulares ya está lista para retiro en nuestra agencia de la Avenida {Romulo|Rómulo|«Rómulo» es palabra esdrújula (Ró-mu-lo) y lleva tilde.} {Betancur|Betancourt|El nombre oficial de la avenida conserva la grafía «Betancourt» (terminada en «-court»).}.\n\nPara retirar el documento sellado debe presentar su documento de identidad original; no se entregan certificaciones a terceros, {sino|si no|Va separado («si no») porque introduce una condición: «en caso de que no cuenten con un poder».} cuentan con un poder notarizado. Asimismo, le confirmamos que el cargo administrativo ya se {desconto|descontó|«Descontó» (pretérito en tercera persona) es palabra aguda terminada en vocal y lleva tilde.} de su cuenta de ahorros.\n\nAgradecemos su confianza en nuestra entidad.\n\nCordialmente,\nÁrea de Certificaciones"
  },
  {
    id: "cor-18",
    categoria: "Riesgo Crediticio · Comité",
    titulo: "Evaluación financiera de línea de capital de trabajo",
    de: "Riesgo Empresarial <riesgo@bancodominicano.com.do>",
    para: "Comité de Crédito <comite@bancodominicano.com.do>",
    fecha: "6 de abril de 2026, 2:00 p. m.",
    asunto: "Dictamen técnico sobre renovación de línea rotativa",
    cuerpo: "Estimados miembros del comité:\n\nRemitimos para su ponderación el expediente financiero de Distribuidora Antillana, cliente con ocho años de {trayectoría|trayectoria|«Trayectoria» termina en el diptongo «ia» y es palabra llana terminada en vocal; no lleva tilde.} impecable en nuestra institución. El flujo de caja auditado demuestra suficiente {liquides|liquidez|Los sustantivos abstractos de cualidad terminados en «-ez» se escriben con «z»: liquidez, solidez, rapidez.} para cubrir el servicio de la deuda propuesta.\n\nNo obstante, sugerimos mantener la garantía hipotecaria actual y {exijir|exigir|Los verbos terminados en «-ger» y «-gir» se escriben con «g» (excepto «tejer» y «crujir»): exigir.} estados financieros intermedios cada semestre. El {exámen|examen|«Examen» es palabra llana terminada en «n» y NO lleva tilde (su plural «exámenes» sí la lleva).} del buró de crédito evidencia cero atrasos tanto con nosotros como con el resto del sector {bancário|bancario|«Bancario» termina en el diptongo «io» y es palabra llana terminada en vocal; no lleva tilde.}.\n\nQuedamos atentos a su decisión en la sesión de mañana.\n\nAtentamente,\nGerencia de Riesgo de Crédito"
  },
  {
    id: "cor-19",
    categoria: "Logística y Mensajería · Valija",
    titulo: "Retraso en ruta de valija interna hacia zona norte",
    de: "Servicios Generales <logistica@bancodominicano.com.do>",
    para: "Sucursales Cibao <cibao@bancodominicano.com.do>",
    fecha: "7 de abril de 2026, 10:20 a. m.",
    asunto: "Demora en entrega de valija física de hoy",
    cuerpo: "Buenos días, estimados encargados:\n\nLes informamos que el {vehiculo|vehículo|«Vehículo» es palabra esdrújula (ve-hí-cu-lo) con «h» intercalada y lleva tilde en la «í».} asignado al transporte de correspondencia interna sufrió un contratiempo mecánico en la autopista Duarte, por lo cual la llegada de sobres y plásticos de reposición {tendra|tendrá|«Tendrá» es palabra aguda terminada en vocal y lleva tilde.} un retraso aproximado de dos horas.\n\nLos mensajeros ya {trajieron|trajeron|En el pretérito de «traer», «decir» y verbos en «-ducir» no se escribe «i» después de la «j»: lo correcto es «trajeron», «dijeron», «produjeron».} una unidad de respaldo para completar el {trayécto|trayecto|«Trayecto» es palabra llana terminada en vocal y no lleva tilde.} hacia La Vega y Santiago sin afectar la seguridad de los documentos. Les pedimos disculpas por las molestias que {ésto|esto|El pronombre demostrativo neutro «esto» nunca lleva tilde.} pueda causar en la entrega a clientes.\n\nSaludos cordiales,\nCoordinación de Valija y Transporte"
  },
  {
    id: "cor-20",
    categoria: "Capacitación · Escuela Bancaria",
    titulo: "Inscripción al taller de redacción ejecutiva y servicio",
    de: "Desarrollo Organizacional <formacion@bancodominicano.com.do>",
    para: "Oficiales de Servicio <servicio@bancodominicano.com.do>",
    fecha: "8 de abril de 2026, 9:00 a. m.",
    asunto: "Apertura de cupos para taller de comunicación escrita",
    cuerpo: "Estimados colaboradores:\n\nNos complace anunciar el inicio del taller práctico de redacción corporativa, diseñado para fortalecer la calidad de las respuestas que enviamos diariamente a nuestros clientes. Las sesiones se impartirán de forma virtual durante el mes de {Julio|julio|Los meses del año se escriben con minúscula inicial en español.} en dos horarios flexibles.\n\nTodo participante que {conclulla|concluya|En los verbos cuyo infinitivo no tiene «ll» ni «y» (como «concluir»), las formas con ese sonido se escriben con «y»: concluya, concluyó.} satisfactoriamente los módulos recibirá un certificado digital para su expediente laboral. Deseamos que este espacio {contribulla|contribuya|«Contribuir» forma sus conjugaciones con «y»: contribuyo, contribuya.} al desarrollo de cada {jóven|joven|«Joven» es palabra llana terminada en «n» y NO lleva tilde (su plural «jóvenes» sí la lleva por ser esdrújula).} talento y de todo el personal con mayor experiencia; para reservar su cupo, basta con llenar el formulario que está {ahi|ahí|«Ahí» (adverbio de lugar) lleva «h» intercalada y tilde en la «í» por hiato.} en la intranet antes del {Viernes|viernes|Los días de la semana se escriben siempre con minúscula inicial.}.\n\n¡Contamos con su entusiasmo!\n\nSaludos,\nEscuela de Formación"
  },
  {
    id: "cor-21",
    categoria: "Mercadeo y Comunicaciones · Campaña",
    titulo: "Validación de artes finales para feria inmobiliaria",
    de: "Mercadeo Institucional <mercadeo@bancodominicano.com.do>",
    para: "Agencia Creativa <cuentas@agenciacreativa.do>",
    fecha: "9 de abril de 2026, 4:35 p. m.",
    asunto: "Aprobación de material gráfico para feria de vivienda",
    cuerpo: "Estimado equipo creativo:\n\nRevisamos las piezas gráficas enviadas para la feria de este fin de semana y el diseño luce muy limpio. Sin embargo, antes de mandar a imprimir la {vaya|valla|Cuando significa cartel publicitario o cerca se escribe «valla» con «ll»; «vaya» con «y» es del verbo «ir».} exterior ubicada en la Avenida {Sarasotta|Sarasota|El nombre de la Avenida Sarasota se escribe con una sola «t».}, debemos corregir dos detalles de texto.\n\nEn el titular principal falta el signo de apertura de exclamación y aparece mal escrita la palabra «{hipotéca|hipoteca|«Hipoteca» es palabra llana terminada en vocal; no lleva tilde.}». Además, recuerden ajustar la {imágen|imagen|«Imagen» es palabra llana terminada en «n» y NO lleva tilde (su plural «imágenes» sí lleva tilde).} inferior para que el número telefónico se lea con total nitidez desde lejos. Una vez {echo|hecho|Aquí es el participio del verbo «hacer» y lleva «h» inicial: «una vez hecho el cambio»; «echo» sin «h» proviene de «echar».} el cambio, por favor reenvíen el archivo final para autorizar la {impreción|impresión|«Impresión» se relaciona con «impreso» y se escribe con «s» en la terminación «-sión».}.\n\nMuchas gracias por su rápida gestión.\n\nSaludos cordiales,\nGerencia de Mercadeo"
  },
  {
    id: "cor-22",
    categoria: "Soporte Técnico · Equipos",
    titulo: "Reemplazo programado de computadoras portátiles",
    de: "Mesa de Ayuda TI <soporte@corporaciondeleste.com.do>",
    para: "Analistas Financieros <finanzas@corporaciondeleste.com.do>",
    fecha: "10 de abril de 2026, 11:30 a. m.",
    asunto: "Renovación de equipos portátiles del departamento financiero",
    cuerpo: "Estimados usuarios:\n\nDentro del plan anual de modernización tecnológica, la próxima semana sustituiremos los equipos que cumplieron cuatro años de uso. Para agilizar la migración, cada analista debe guardar sus hojas de cálculo en la carpeta compartida y no dejar archivos críticos únicamente en el disco local, {porqué|porque|Para introducir una causa o explicación se usa la conjunción «porque» (junta y sin tilde); «porqué» con tilde es sustantivo («el motivo»).} el equipo anterior será formateado.\n\nNuestro técnico pasará por cada estación según el orden asignado; a {tí|ti|El pronombre personal «ti» nunca lleva tilde (no existe otra palabra igual de la cual diferenciarlo).} o a tu supervisor les llegará una cita individual en el calendario. Si utilizan algún programa especializado que {requiéra|requiera|«Requiera» contiene el diptongo «ie» y es palabra llana terminada en vocal; no lleva tilde.} licencia adicional, notifíquenlo respondiendo este mensaje para {instalárlo|instalarlo|«Instalarlo» es palabra llana terminada en vocal y no lleva tilde.} con antelación y evitar {perdida|pérdida|El sustantivo «pérdida» es palabra esdrújula (pér-di-da) y lleva tilde; sin tilde («perdida») es participio o adjetivo.} de tiempo.\n\nAtentamente,\nMesa de Ayuda Tecnológica"
  },
  {
    id: "cor-23",
    categoria: "Seguros y Pólizas · Renovación",
    titulo: "Renovación de póliza de seguro de vehículo endosada",
    de: "Unidad de Seguros <seguros@bancodominicano.com.do>",
    para: "Ramón Altagracia <r.altagracia@correo-rd.do>",
    fecha: "13 de abril de 2026, 3:05 p. m.",
    asunto: "Vencimiento próximo de la {poliza|póliza|«Póliza» es palabra esdrújula (pó-li-za) y siempre lleva tilde.} endosada a su préstamo",
    cuerpo: "Estimado señor Altagracia:\n\nLe informamos que el seguro comprensivo del automóvil financiado con nuestra entidad vence el día veintiocho del mes en curso. Conforme a lo establecido en su contrato, puede renovar con su aseguradora actual o remitirnos una nueva cobertura emitida por cualquier empresa {autorisada|autorizada|«Autorizar» y «autorizada» se escriben con «z».} en el país.\n\nEn caso de gestionar la renovación de forma directa, {envienos|envíenos|«Envíenos» es palabra esdrújula (en-ví-e-nos) y lleva tilde en la «í».} el endoso de cesión a favor del banco con al menos cinco días {habiles|hábiles|«Hábiles» es palabra esdrújula (há-bi-les) con «h» inicial y lleva tilde.} de anticipación. Así evitará la inclusión automática en la cobertura colectiva y cualquier {cárgo|cargo|«Cargo» es palabra llana terminada en vocal y no lleva tilde.} adicional en su próxima cuota.\n\nQuedamos a sus órdenes en nuestra oficina de la Avenida {Tiradente|Tiradentes|El nombre correcto de la vía es Avenida Tiradentes, terminada en «-s».}.\n\nSaludos cordiales,\nDepartamento de Seguros y Garantías"
  },
  {
    id: "cor-24",
    categoria: "Banca PYME · Desembolso",
    titulo: "Notificación de desembolso de capital para inventario",
    de: "Banca PYME <pyme@bancodominicano.com.do>",
    para: "Ferretería San Cristóbal <administracion@ferreteriasc.do>",
    fecha: "14 de abril de 2026, 1:50 p. m.",
    asunto: "Acreditación exitosa de fondos en su cuenta corriente",
    cuerpo: "Estimada señora Santana:\n\nNos complace comunicarle que en la tarde de hoy {efectuámos|efectuamos|«Efectuamos» es palabra llana terminada en «s» (e-fec-tua-mos) y no lleva tilde.} el desembolso del financiamiento solicitado para compra de mercancía. Los fondos ya se encuentran disponibles en su cuenta comercial terminada en 8842.\n\nJunto a este mensaje le anexamos la tabla definitiva de {amortisasión|amortización|«Amortización» proviene de «amortizar» (con «z») y lleva la terminación «-ción» con tilde.}, donde podrá consultar el detalle de capital e {interes|interés|«Interés» es palabra aguda terminada en «s» y lleva tilde en la segunda «e».} de cada vencimiento mensual. Si desea realizar abonos extraordinarios al capital más adelante, recuerde que nuestro producto PYME le permite hacerlo sin {penalidád|penalidad|«Penalidad» es palabra aguda terminada en «d»; las agudas terminadas en «d» no llevan tilde.} tras cumplir el primer semestre, tal como nos {solicitastes|solicitaste|La segunda persona del pretérito perfecto simple nunca lleva «-s» final: «solicitaste» (o «solicitó» en trato de usted).} al evaluar las condiciones.\n\nÉxitos en sus proyectos comerciales.\n\nAtentamente,\nGerencia de Negocios PYME"
  },
  {
    id: "cor-25",
    categoria: "Auditoría Interna · Sucursales",
    titulo: "Solicitud de descargos sobre arqueo documental",
    de: "Auditoría Interna <auditoria@bancodominicano.com.do>",
    para: "Gerencia Sucursal Piantini <piantini@bancodominicano.com.do>",
    fecha: "15 de abril de 2026, 10:15 a. m.",
    asunto: "Plazo de respuesta al informe preliminar de {auditoria|auditoría|«Auditoría» lleva tilde en la «í» por hiato de vocal cerrada tónica ante vocal abierta (au-di-to-rí-a).}",
    cuerpo: "Estimada licenciada Cabrera:\n\nLuego de concluir nuestra visita ordinaria a la oficina ubicada en la Avenida Roberto {Pastorisa|Pastoriza|El nombre correcto de la calle es Roberto Pastoriza, escrito con «z».}, le compartimos la matriz preliminar de observaciones operativas. En general destacamos el orden en la bóveda y la agilidad en caja, aunque quedaron tres aperturas de cuenta pendientes de firma del oficial supervisor.\n\nAgradeceremos que nos remita el plan de acción con fechas precisas de {correción|corrección|«Corrección» proviene de la misma familia que «correcto» (-ct-) y se escribe con doble «c»: co-rrec-ción.} y las evidencias escaneadas antes del próximo martes. Es importante que cada comentario indique con {presición|precisión|«Precisión» se escribe primero con «c» y luego con «s» (de «preciso» → pre-ci-sión), además de tilde.} el colaborador responsable del seguimiento para cerrar formalmente el informe ante el comité.\n\nQuedamos a su disposición si necesita aclarar {algun|algún|«Algún» es palabra aguda terminada en «n» y lleva tilde.} punto del documento.\n\nCordialmente,\nDirección de Auditoría Interna"
  },
  {
    id: "cor-26",
    categoria: "Canales Electrónicos · Pagos ACH",
    titulo: "Aclaración sobre horario de corte en transferencias interbancarias",
    de: "Soporte Canales Empresariales <ach@bancodominicano.com.do>",
    para: "Tesorería Clínica Del Prado <tesoreria@clinicadelprado.do>",
    fecha: "16 de abril de 2026, 4:55 p. m.",
    asunto: "Información sobre acreditación de lotes interbancarios",
    cuerpo: "Estimado señor Méndez:\n\nEn atención a su consulta telefónica, verificamos el lote de pagos enviado a suplidores hoy a las 4:20 p. m. Como la instrucción ingresó {despues|después|«Después» es palabra aguda terminada en «s» y lleva tilde en la «e».} de la hora de corte vespertino del sistema compensador, los créditos se reflejarán en los bancos de destino mañana en el primer ciclo matutino.\n\nCuando requiera que una operación interbancaria de alto monto se acredite de forma inmediata el mismo día, le sugerimos {elejir|elegir|Los verbos terminados en «-gir» se escriben con «g» (excepto «crujir»): elegir.} la opción de pagos al instante LBTR dentro de la plataforma corporativa. {Hay|Ahí|Aquí indica lugar («en esa sección de la plataforma»), por lo que corresponde escribir «Ahí» con «h» intercalada y tilde.} mismo el sistema muestra en pantalla la tarifa aplicable antes de que el autorizador {de|dé|«Dé» lleva tilde diacrítica cuando corresponde al verbo «dar», para diferenciarlo de la preposición «de».} su aprobación final; así evitarán cualquier {confución|confusión|«Confusión» proviene de «confuso» y se escribe con «s» en la terminación «-sión».} con las fechas de corte.\n\nTambién le anexamos el instructivo actualizado de horarios bancarios vigente desde {Enero|enero|Los nombres de los meses se escriben siempre con minúscula inicial.}.\n\nSaludos cordiales,\nSoporte de Banca en Línea Empresarial"
  },
  {
    id: "cor-27",
    categoria: "Atención Ejecutiva · Tarjetas Corporativas",
    titulo: "Notificación de viaje al extranjero y activación preventiva",
    de: "Banca Preferencial <preferencial@bancodominicano.com.do>",
    para: "Ing. Héctor Lantigua <h.lantigua@constructoralantigua.do>",
    fecha: "17 de abril de 2026, 11:20 a. m.",
    asunto: "Registro exitoso de aviso de {viage|viaje|Todas las palabras terminadas en «-aje» se escriben con «j»: viaje, mensaje, garaje, equipaje.} en sus tarjetas",
    cuerpo: "Estimado ingeniero Lantigua:\n\nLe confirmamos que hemos registrado su notificación de consumo internacional para sus tarjetas de crédito desde el veinte hasta el treinta de este mes. Gracias a este aviso previo, nuestro motor de monitoreo no aplicará bloqueos preventivos mientras realice pagos en el {extrangero|extranjero|Las palabras terminadas en «-jero» y «-jera» se escriben con «j»: extranjero, cajero, pasajero.}.\n\nDe igual modo, le recordamos que a través de nuestra aplicación móvil puede consultar su disponible en dólares, ajustar límites diarios y {resolber|resolver|«Resolver» se escribe con «v» (igual que «resuelto» y «solvencia»).} cualquier imprevisto activando o apagando el plástico en tiempo real. Si durante su estadía {tubiese|tuviese|El pretérito imperfecto de subjuntivo del verbo «tener» se escribe con «v»: tuviese, tuviera.} algún inconveniente o necesita asistencia de emergencia, puede {comunicárse|comunicarse|«Comunicarse» es palabra llana terminada en vocal; no lleva tilde.} al número internacional al dorso de su tarjeta, donde un {acesor|asesor|«Asesor» se escribe con «s» en ambas sílabas: a-se-sor.} le atenderá las veinticuatro horas, incluso en días {feríados|feriados|«Feriados» contiene el diptongo «ia» y es palabra llana terminada en «s»; no lleva tilde.}.\n\nLe deseamos un excelente viaje de negocios.\n\nAtentamente,\nUnidad de Banca Preferencial"
  },
  {
    id: "cor-28",
    categoria: "Administración de Propiedades · Mantenimiento",
    titulo: "Coordinación de acceso para fumigación e inventario en archivo central",
    de: "Administración de Edificios <inmuebles@bancodominicano.com.do>",
    para: "Custodia Documental <archivo@bancodominicano.com.do>",
    fecha: "18 de abril de 2026, 3:40 p. m.",
    asunto: "Jornada preventiva de higiene en nave de {almacen|almacén|«Almacén» es palabra aguda terminada en «n» y lleva tilde.} documental",
    cuerpo: "Estimado equipo de Custodia:\n\nPor este medio les informamos que el próximo sábado realizaremos la jornada trimestral de control ambiental y limpieza profunda en el centro documental ubicado cerca de la Avenida Gregorio {Luperon|Luperón|«Luperón» es palabra aguda terminada en «n» y lleva tilde.}. La brigada ingresará a las 2:00 p. m., una vez haya concluido el despacho matutino de cajas.\n\nLes solicitamos cubrir los escáneres de alta velocidad y verificar que ninguna gaveta metálica quede {avierta|abierta|«Abierta» proviene del verbo «abrir» y se escribe con «b».} antes de retirarse. El supervisor de seguridad nos {aseguro|aseguró|«Aseguró» (pretérito en tercera persona) es palabra aguda terminada en vocal y lleva tilde.} que acompañará al técnico externo durante todo el recorrido para garantizar la {integridád|integridad|«Integridad» es palabra aguda terminada en «d» y no lleva tilde.} de los archivos físicos. Asimismo, el lunes temprano hay que ventilar el salón durante treinta minutos antes de reanudar las labores {habitúales|habituales|«Habituales» contiene el diptongo «ua» y es palabra llana terminada en «s»; no lleva tilde.}.\n\nAgradecemos de antemano su valiosa cooperación.\n\nSaludos cordiales,\nDepartamento de Servicios Inmobiliarios"
  }
];

/* =========================================================
   16 preguntas adicionales de opción múltiple sobre
   párrafos y redacción de correos corporativos
   ========================================================= */
var PREGUNTAS_CORREOS_EXTRA = [
  {
    id: "cor-mc-01",
    pregunta: "¿Cuál de las siguientes versiones del párrafo de correo está escrita SIN ningún error ortográfico?",
    correcta: "Estimada señora Gómez: Por medio de la presente le envío la cotización solicitada el pasado martes. Quedo a la espera de sus comentarios.",
    incorrectas: [
      "Estimada Señora Gómez, Por medio de la presente le envío la cotización solicitada el pasado Martes. Quedo a la espera de sus comentarios.",
      "Estimada señora Gómez: Por medio de la presente le envio la cotisación solicitada el pasado martes. Quedo a la espera de sus comentarios.",
      "Estimada señora Gomez: Por medio de la presente le envío la cotización solisitada el pasado martes. Quedo a la espera de sus comentarios."
    ],
    explicacion: "Tras el saludo se escriben dos puntos (:), «señora» y «martes» van en minúscula, «Gómez» lleva tilde, «envío» lleva tilde por hiato, «cotización» va con «z» y «-ción», y «solicitada» con «c»."
  },
  {
    id: "cor-mc-02",
    pregunta: "¿Cuántos errores ortográficos tiene este mensaje?: «Buenos dias, equipo: Les recuerdo que el Jueves habrá reunion através de la plataforma virtual».",
    correcta: "4 errores",
    incorrectas: ["2 errores", "3 errores", "5 errores"],
    explicacion: "Tiene exactamente 4 errores: 1) «dias» → «días» (tilde por hiato), 2) «Jueves» → «jueves» (minúscula), 3) «reunion» → «reunión» (tilde en aguda), y 4) «através» → «a través» (separado)."
  },
  {
    id: "cor-mc-03",
    pregunta: "¿Cuál opción presenta el cierre y saludo de un correo formal correctamente escritos según la RAE?",
    correcta: "Estimado licenciado Pérez: / Saludos cordiales,",
    incorrectas: [
      "Estimado Licenciado Pérez, / Saludos Cordiales,",
      "Estimado licenciado Pérez, / Saludos cordiales,",
      "Estimado Licenciado Perez: / Saludos Cordiales,"
    ],
    explicacion: "En español los cargos o títulos («licenciado») se escriben con minúscula, después del saludo van dos puntos (no coma, que es anglicismo), y en la despedida solo lleva mayúscula la primera palabra («Saludos cordiales,»)."
  },
  {
    id: "cor-mc-04",
    pregunta: "¿Cuántos errores ortográficos hay en el siguiente párrafo?: «Adjunto el exámen financiero del cliente; sólo falta que gerencia nos de su aprobación final».",
    correcta: "3 errores",
    incorrectas: ["1 error", "2 errores", "4 errores"],
    explicacion: "Hay 3 errores: 1) «exámen» → «examen» (llana terminada en «n», sin tilde), 2) «sólo» → «solo» (sin tilde según norma RAE 2010), y 3) «de» → «dé» (forma del verbo «dar», lleva tilde diacrítica)."
  },
  {
    id: "cor-mc-05",
    pregunta: "Seleccione la oración redactada de manera impecable para un reporte bancario:",
    correcta: "Ayer hubo tres reclamaciones en la sucursal de la Avenida Abraham Lincoln, pero todas fueron resueltas.",
    incorrectas: [
      "Ayer hubieron tres reclamaciones en la sucursal de la Avenida Abraham Lincoln, pero todas fueron resueltas.",
      "Ayer hubo tres reclamaciones en la sucursal de la Avenida Abrahan Lincon, pero todas fueron resueltas.",
      "Ayer hubieron tres reclamaciónes en la sucursal de la Avenida Abraham Lincon, pero todas fueron resueltas."
    ],
    explicacion: "«Hubo» se usa en singular para indicar existencia (nunca «hubieron»), y el nombre correcto de la vía es «Avenida Abraham Lincoln»."
  },
  {
    id: "cor-mc-06",
    pregunta: "¿Cuál de las siguientes frases de seguimiento comercial está escrita correctamente?",
    correcta: "Vamos a ver si el proveedor confirma el descuento; si no, solicitaremos tres nuevas propuestas.",
    incorrectas: [
      "Vamos haber si el proveedor confirma el descuento; sino, solicitaremos tres nuevas propuestas.",
      "Vamos a ver si el provedor confirma el descuento; sino, solicitaremos tres nuevas propuestas.",
      "Vamos aver si el proveedor confirma el descuento; si no, solisitaremos tres nuevas propuestas."
    ],
    explicacion: "«A ver» (preposición + verbo «ver») equivale a «veamos»; «proveedor» lleva doble «e»; y «si no» va separado cuando introduce una condición («en caso contrario»)."
  },
  {
    id: "cor-mc-07",
    pregunta: "¿Cuántos errores contiene el siguiente aviso?: «Porfavor verifique los saldos ahí en el archivo anexo antes de las 4:00 p. m. del Viernes».",
    correcta: "2 errores",
    incorrectas: ["1 error", "3 errores", "Ningún error"],
    explicacion: "Contiene 2 errores: 1) «Porfavor» debe escribirse separado («Por favor»), y 2) «Viernes» debe ir en minúscula («viernes»). «Ahí», «anexo» y «4:00 p. m.» están perfectamente escritos."
  },
  {
    id: "cor-mc-08",
    pregunta: "Elija la versión sin errores para notificar una transferencia bancaria:",
    correcta: "La transacción fue procesada a una tasa de cambio de RD$ 59.50 por dólar y sin comisión adicional.",
    incorrectas: [
      "La transación fué procesada a una taza de cambio de RD$ 59.50 por dólar y sin comición adicional.",
      "La transacción fue prosesada a una taza de cambio de RD$ 59.50 por dolar y sin comisión adicional.",
      "La transacción fué procesada a una tasa de cambio de RD$ 59.50 por dólar y sin comision adicional."
    ],
    explicacion: "«Transacción» lleva «cc» y tilde; «fue» es monosílabo sin tilde; «tasa» (tipo de cambio) va con «s»; «dólar» lleva tilde; «comisión» va con «s» y tilde."
  },
  {
    id: "cor-mc-09",
    pregunta: "¿Cuál respuesta a un auditor interno está escrita con ortografía 100 % correcta?",
    correcta: "Agradezco sus observaciones; ya corregimos el guion de atención telefónica para evitar cualquier confusión.",
    incorrectas: [
      "Agradesco sus observaciones; ya corregimos el guión de atención telefónica para evitar cualquier confusión.",
      "Agradezco sus observasiones; ya correjimos el guion de atención telefónica para evitar cualquier confución.",
      "Agradezco sus observaciones; ya corregimos el guión de atencion telefónica para evitar cualquier confución."
    ],
    explicacion: "«Agradezco» lleva «zc»; «corregimos» conserva la «g» ante «i»; «guion» no lleva tilde desde 2010; «confusión» termina en «-sión»."
  },
  {
    id: "cor-mc-10",
    pregunta: "¿Cuántos errores hay en este texto?: «Esperamos que no haiga inconvenientes con la póliza de su vehiculo durante el mes de Octubre».",
    correcta: "3 errores",
    incorrectas: ["2 errores", "4 errores", "1 error"],
    explicacion: "Tiene 3 errores: 1) «haiga» → «haya», 2) «vehiculo» → «vehículo» (esdrújula), y 3) «Octubre» → «octubre» (mes en minúscula). «Inconvenientes» y «póliza» están bien escritos."
  },
  {
    id: "cor-mc-11",
    pregunta: "Identifique el párrafo redactado correctamente sobre protección de datos bancarios:",
    correcta: "Aún no hemos recibido la autorización firmada por él; por eso el sistema no permite que se le dé acceso al historial crediticio.",
    incorrectas: [
      "Aun no hemos recibido la autorización firmada por el; por eso el sistema no permite que se le de acceso al historial crediticio.",
      "Aún no hemos resibido la autorisación firmada por él; por eso el sistema no permite que se le dé acceso al istorial crediticio.",
      "Aún no hemos recibido la autorización firmada por él; por eso él sistema no permite que se le de acceso al historial crediticio."
    ],
    explicacion: "«Aún» (= todavía), «él» (pronombre personal) y «dé» (verbo dar) llevan tilde diacrítica; «el sistema» lleva artículo sin tilde."
  },
  {
    id: "cor-mc-12",
    pregunta: "¿Cuál es la forma correcta de redactar esta dirección en un correo corporativo en Santo Domingo?",
    correcta: "Nuestra oficina principal está en la Avenida Winston Churchill esquina Avenida Gustavo Mejía Ricart.",
    incorrectas: [
      "Nuestra oficina principal está en la Avenida Wiston Churchil esquina Avenida Gustavo Mejia Ricart.",
      "Nuestra oficina principal esta en la Avenida Winston Churchil esquina Avenida Gustavo Megía Ricart.",
      "Nuestra oficina principal está en la Avenida Winston Churchill ezquina Avenida Gustavo Mejía Ricar."
    ],
    explicacion: "«Está» lleva tilde; «Winston» lleva «n» antes de «s»; «Churchill» lleva doble «l»; «Mejía» lleva «j» y tilde por hiato; «Ricart» termina en «t»."
  },
  {
    id: "cor-mc-13",
    pregunta: "¿Cuántos errores ortográficos presenta este mensaje?: «Me dijistes que habian cinco expedientes listos, mas solo encontré tres en la bandeja».",
    correcta: "2 errores",
    incorrectas: ["3 errores", "4 errores", "1 error"],
    explicacion: "Hay 2 errores: 1) «dijistes» → «dijiste» (sin «s» final), y 2) «habian» → «había» (singular y con tilde por hiato). Nota: «mas» sin tilde es correcto aquí porque equivale a «pero», y «solo» va sin tilde."
  },
  {
    id: "cor-mc-14",
    pregunta: "¿Cuál de estas oraciones usa correctamente los cuatro tipos de «porqué» en un correo laboral?",
    correcta: "Necesito saber por qué se rechazó el pago, porque el cliente exige conocer el porqué de la demora.",
    incorrectas: [
      "Necesito saber porque se rechazó el pago, por qué el cliente exige conocer el porqué de la demora.",
      "Necesito saber por qué se rechazó el pago, porque el cliente exige conocer el por qué de la demora.",
      "Necesito saber porqué se rechazó el pago, porque el cliente exije conocer el porqué de la demora."
    ],
    explicacion: "«Por qué» (separado y con tilde) introduce pregunta indirecta; «porque» (junto y sin tilde) expresa causa; «el porqué» (junto y con tilde) es sustantivo equivalente a «la razón» o «el motivo»."
  },
  {
    id: "cor-mc-15",
    pregunta: "Seleccione el asunto de correo escrito de manera completamente correcta:",
    correcta: "Solicitud de conciliación de saldos y análisis de variaciones — cierre de marzo",
    incorrectas: [
      "Solisitud de conciliasión de saldos y analisis de variaciones — cierre de Marzo",
      "Solicitud de conciliación de saldos y análisis de bariaciones — cierre de Marzo",
      "Solicitud de consiliación de saldos y análisis de variaciones — sierre de marzo"
    ],
    explicacion: "«Solicitud» y «conciliación» van con «c»; «análisis» lleva tilde por ser esdrújula; «variaciones» va con «v»; «cierre» con «c»; y «marzo» en minúscula."
  },
  {
    id: "cor-mc-16",
    pregunta: "¿Cuál párrafo cumple todas las normas de acentuación y escritura de abreviaturas y símbolos según la RAE?",
    correcta: "La reunión iniciará a las 9:30 a. m. para evaluar la reducción del 15 % en los tiempos de respuesta al cliente.",
    incorrectas: [
      "La reunion iniciará a las 9:30 am para evaluar la redución del 15% en los tiempos de respuesta al cliente.",
      "La reunión iniciara a las 9:30 a.m. para ebaluar la reducción del 15 % en los tiempos de respuesta al cliente.",
      "La reunión iniciará a las 9:30 a. m. para evaluar la reduccsión del 15 % en los tiempos de respuesta al cliente."
    ],
    explicacion: "Según la RAE, las abreviaturas «a. m.» y «p. m.» llevan punto y espacio tras cada letra, el símbolo «%» se separa de la cifra con un espacio («15 %»), y «reducción» lleva doble «c»."
  }
];

/* =========================================================
   Guías estructuradas para la pestaña «Aprende»
   ========================================================= */
var GUIAS_ORTO = [
  {
    id: "guia-acentuacion",
    titulo: "Reglas de acentuación, hiatos y cambios RAE (2010)",
    icono: "tilde",
    resumen: "Domina cuándo tildar agudas, llanas, esdrújulas, hiatos como «envío» y las palabras que ya NO llevan tilde.",
    claves: "agudas graves llanas esdrujulas sobresdrujulas hiatos diptongos envio dia continua solo este ese aquel guion fui fue vio dio ti",
    reglas: [
      "Agudas (fuerza en la última sílaba): llevan tilde cuando terminan en N, S o VOCAL. Ejemplos: reunión, interés, café, comité, Luperón. Sin tilde: solicitud, reloj, almacenar.",
      "Graves o llanas (fuerza en la penúltima sílaba): llevan tilde cuando NO terminan en N, S ni VOCAL. Ejemplos: dólar, hábil, lápiz, Núñez, Bolívar. ¡Cuidado!: examen, resumen, origen, imagen y joven NO llevan tilde (sus plurales exámenes, resúmenes, orígenes, imágenes y jóvenes sí, por ser esdrújulas).",
      "Esdrújulas y sobresdrújulas: SIEMPRE llevan tilde sin excepción. Ejemplos: crédito, préstamo, cédula, análisis, código, póliza, envíenos, dígamelo.",
      "Hiatos de vocal cerrada tónica (í, ú) junto a vocal abierta (a, e, o): SIEMPRE llevan tilde aunque rompan las reglas generales. Ejemplos clave en correos: envío, envíe, día, había, garantía, auditoría, compañía, continúa, actúa.",
      "Norma RAE 2010 (¡muy evaluada en bancos!): NO llevan tilde los monosílabos «fue, fui, vio, dio, ti, fe, guion»; TAMPOCO llevan tilde el adverbio «solo», los demostrativos «este, ese, aquel» (ni sus femeninos y plurales) ni la conjunción «o» entre números («3 o 4 días»)."
    ],
    truco: "Piensa en el código SEGA (Sobresdrújula - Esdrújula - Grave - Aguda) contando sílabas de derecha a izquierda. Y recuerda el grupo «FIN DE TILDES 2010»: solo, este, guion, fue, vio, dio y ti van SIEMPRE limpios.",
    ejemplos: [
      { bien: "Le envío el examen y el resumen del crédito.", mal: "Le envio el exámen y el resúmen del credito." },
      { bien: "Este guion fue revisado hace 3 o 4 días.", mal: "Éste guión fué revisado hace 3 ó 4 dias." }
    ]
  },
  {
    id: "guia-diacritica",
    titulo: "Tilde diacrítica y los cuatro «porqués»",
    icono: "diacritica",
    resumen: "Diferencia monosílabos idénticos (tú/tu, él/el, mí/mi, dé/de, sé/se, más/mas, sí/si, aún/aun) y domina por qué / porque.",
    claves: "tilde diacritica tu el mi si se de mas te aun porque por que interrogativos que quien como cuando donde cual",
    reglas: [
      "tú (pronombre: «tú decides») / tu (posesivo: «tu cuenta») · él (pronombre: «hablé con él») / el (artículo: «el banco»).",
      "mí (pronombre tras preposición: «para mí») / mi (posesivo: «mi correo») · NOTA: «ti» NUNCA lleva tilde.",
      "dé (verbo dar: «espero que nos dé respuesta») / de (preposición: «estado de cuenta»).",
      "sé (verbos saber o ser: «ya lo sé», «sé prudente») / se (pronombre: «se procesó ayer»).",
      "más (cantidad o suma: «más plazo») / mas (equivale a «pero»: «intenté llamar, mas no contestó»).",
      "sí (afirmación o pronombre reflexivo: «sí acepto», «para sí mismo») / si (condicional: «si aprueba el comité») · té (bebida) / te (pronombre).",
      "aún (equivale a «todavía»: «aún no llega») / aun (equivale a «incluso» o «hasta»: «aun así continuaremos»).",
      "Interrogativos y exclamativos directos e indirectos llevan tilde: «¿Cuál es el monto?», «Indíquenos cuándo pasará y dónde desea recibir el plástico».",
      "Los 4 porqués: 1) «por qué» = pregunta directa o indirecta («¿Por qué falló?», «No sé por qué tardó»); 2) «porque» = causa («Porque cayó la red»); 3) «el porqué» = sustantivo, equivale a «el motivo» («Explicó el porqué del ajuste»); 4) «por que» = preposición + que («Velamos por que se cumpla la norma»)."
    ],
    truco: "Si puedes sustituir «aún» por «todavía», ponle tilde. Si puedes cambiar «por qué» agregando «razón» («por qué razón»), va separado y con tilde; si equivale a «ya que», va junto y sin tilde («porque»).",
    ejemplos: [
      { bien: "Aún no sé por qué él pidió que le dé más plazo.", mal: "Aun no se porque el pidió que le de mas plazo." },
      { bien: "Dime cuándo vendrás porque necesito tu firma.", mal: "Dime cuando vendrás por qué necesito tú firma." }
    ]
  },
  {
    id: "guia-bv",
    titulo: "Uso correcto de B y V",
    icono: "letras",
    resumen: "Reglas seguras sin dudar: terminaciones en -aba, -bir, -bilidad, combinaciones mb / nv / dv y vocabulario bancario.",
    claves: "uso de b y v escribir recibir iba caminaba habilidad enviar invierno obvio absorber estuvo tuvo aprobar",
    reglas: [
      "Se escribe B después de M (cambio, reembolso, también) y en las combinaciones BL y BR (bloqueo, cobro, abrir, tabla).",
      "Se escriben con B los verbos terminados en -BIR y -BUIR (escribir, recibir, prohibir, exhibir, contribuir, distribuir). Únicas 3 excepciones: hervir, servir y vivir (y sus derivados como servicio y vivienda).",
      "Llevan B las terminaciones del pretérito imperfecto en -ABA (trabajaba, cuadrábamos, revisaban) y del verbo «ir» (iba, íbamos).",
      "Llevan B las palabras terminadas en -BLE y -BILIDAD (amable, contable, rentabilidad, disponibilidad), excepto movilidad y civilidad.",
      "Llevan B los prefijos BI-/BIS- (dos), BENEF-/BIEN- y SUB-/OB-/ABS- (beneficio, obtener, subgerente, obvio, absorber).",
      "Se escribe V después de N, D y B (enviar, inversión, convenio, advertir, obvio, subvención).",
      "Llevan V los adjetivos terminados en -AVA, -AVE, -AVO, -EVA, -EVE, -EVO, -IVA, -IVO (nueva, breve, activo, ejecutivo, preventiva, masivo).",
      "Llevan V los pasados fuertes de estar, andar y tener: estuve, estuvo, anduvo, tuve, tuvimos, tuvieron (pero «había/hubo» del verbo haber va siempre con B)."
    ],
    truco: "«EnViar en inVierno un conVenio»: después de N SIEMPRE va V; después de M SIEMPRE va B. Y recuerda el trío rebelde con V: herVir, serVir y viVir.",
    ejemplos: [
      { bien: "El ejecutivo estuvo revisando la rentabilidad y aprobó el desembolso.", mal: "El ejecutibo estubo rebisando la rentavilidad y aprovó el desembolso." },
      { bien: "El banco absorberá el costo de envío.", mal: "El banco absorverá el costo de embío." }
    ]
  },
  {
    id: "guia-csz",
    titulo: "Uso de C, S y Z (especial para el seseo dominicano)",
    icono: "letras",
    resumen: "En República Dominicana pronunciamos igual C, S y Z; domina las terminaciones -ción, -sión, -cción, -ez y -anza.",
    claves: "c s z seseo cion sion ccion decision precision necesario cotizacion transaccion tasa taza liquidez",
    reglas: [
      "¿-CIÓN o -SIÓN?: Escribe -CIÓN cuando en la misma familia hay palabras terminadas en -TO, -TOR, -DO o -DOR (atento → atención, auditor → auditoría/audición, cotizar/cotizado → cotización). Escribe -SIÓN cuando en la familia hay -SO, -SOR, -SIVO o -SIBLE (decisivo → decisión, preciso → precisión, comisionar/comisario → comisión, impreso → impresión).",
      "¿Cuándo va doble CC (-CCIÓN)?: Cuando alguna palabra de la misma familia tiene el grupo -CT- (directo → dirección, transactor → transacción, reductor → reducción, correcto → corrección, proyector → proyección). Si no hay -CT-, va una sola C (relación, inflación, discreción).",
      "Se escriben con C las terminaciones -ANCIA y -ENCIA (transferencia, vigencia, solvencia, constancia, ganancia), salvo «ansia» y «hortensia».",
      "Los verbos terminados en -ZAR cambian la Z por C delante de la vocal E: empezar → empecé, realizar → realicé, autorizar → autoricé, garantizar → garanticen; pero conservan la Z en sustantivos ante A/O y derivados como «cotización, organización, amortización».",
      "Los verbos terminados en -CER y -CIR forman la primera persona con -ZCO: agradecer → agradezco, conocer → conozco, producir → produzco, ofrecer → ofrezco.",
      "Llevan Z los sustantivos abstractos de cualidad terminados en -EZ y -EZA (liquidez, solidez, honradez, rapidez, certeza) y los terminados en -ANZA (confianza, cobranza, mudanza). En plural la Z pasa a C: vez → veces, capaz → capaces.",
      "Palabras trampa de examen: neCeSario, deCiSión, preCiSión, proCeSo, aSeSor, eXCeSivo, consCiente, taSa (porcentaje o cambio) vs. taZa (recipiente), seSión (reunión) vs. ceSión (traspaso de derechos)."
    ],
    truco: "En «neCeSario», «deCiSión», «preCiSión» y «proCeSo» sigue el orden alfabético: primero va la C y después va la S.",
    ejemplos: [
      { bien: "Agradezco la precisión en la conciliación de cada transacción.", mal: "Agradesco la presición en la consiliación de cada transación." },
      { bien: "La comisión aprobó una tasa preferencial con total liquidez.", mal: "La comición aprobó una taza preferencial con total liquides." }
    ]
  },
  {
    id: "guia-cqk",
    titulo: "Uso de C, Q y K",
    icono: "letras",
    resumen: "Representación exacta del sonido /k/ en español: cuándo usar C, cuándo usar QU y qué préstamos conservan K.",
    claves: "c q k queso quince cheque requisito cuando cuatro cuota frecuente accion efectivo busque practique",
    reglas: [
      "Ante las vocales A, O, U se escribe siempre C: caja, cobro, cuenta, cuota, cuadre, cuando, cuatro, frecuente, acuerdo (en español NUNCA se escribe «qua» ni «quo»).",
      "Al final de sílaba o antes de consonante se escribe C: crédito, cliente, acción, transacción, efectivo, técnico, octubre.",
      "Ante las vocales E, I se escribe QU (con «u» muda que no se pronuncia): cheque, quincena, requisito, equipo, paquete, esquina, adquirir, aquí.",
      "Los verbos terminados en -CAR cambian la C por QU delante de E en sus conjugaciones: buscar → busqué, practicar → practiqué, indicar → indique, aplicar → aplique, explicar → expliqué.",
      "La letra K se reserva para préstamos de otras lenguas y unidades internacionales: kilómetro, kilogramo, kilovatio, karaoke, búnker, marketing."
    ],
    truco: "Piensa en el bloque «CA - QUE - QUI - CO - CU»: la Q nunca camina sola (siempre lleva su U muda de la mano) y jamás va delante de A, O ni U.",
    ejemplos: [
      { bien: "Indique cuándo desea cobrar el cheque de la quincena.", mal: "Indiqe quando desea cobrar el cheke de la quinsena." },
      { bien: "Ya busqué el acuerdo técnico de octubre.", mal: "Ya buscé el aquerdo téknico de oktubre." }
    ]
  },
  {
    id: "guia-gj",
    titulo: "Uso de G y J (incluyendo GU y diéresis Ü)",
    icono: "letras",
    resumen: "Domina los verbos en -ger/-gir, las terminaciones -aje y -jería, la diéresis ü y evita errores como «dijieron».",
    claves: "g j gu dieresis pinguino bilingue verguenza proteger elegir exigir dijeron trajeron mensaje viaje garaje agencia urgente",
    reglas: [
      "Se escriben con G los verbos terminados en -GER y -GIR (proteger, elegir, exigir, corregir, dirigir, recoger, surgir), EXCEPTO «tejer» y «crujir». ¡Atención!: ante A y O cambian la G por J para mantener el sonido fuerte: elijo, exija, corrijo, dirija, protejo.",
      "Llevan G el prefijo GEO-, el grupo -GEN- (agencia, urgente, vigente, gerente, margen, origen, imagen; excepciones: ajeno, berenjena, jengibre) y las terminaciones -GÍA, -GIO, -GIÓN (tecnología, metodología, estrategia, colegio, litigio, gestión, región).",
      "Se escriben con J todas las palabras terminadas en -AJE, -EJE, -JERO, -JERA y -JERÍA (viaje, mensaje, porcentaje, garaje, corretaje, cajero, extranjero, mensajería, relojería).",
      "Los pretéritos de decir, traer y verbos terminados en -DUCIR se escriben con J y NUNCA llevan «i» después de la J: dije, dijeron, traje, trajeron, condujo, condujeron, produjo, produjeron.",
      "Uso de GU y DIÉRESIS (Ü): Ante E, I el sonido suave se escribe GU con «u» muda (seguimiento, guía, guerra). Cuando la «u» SÍ debe sonar ante E, I, lleva diéresis obligatoria: bilingüe, antigüedad, vergüenza, pingüino, Higüey."
    ],
    truco: "Todo lo que termina en -AJE va con J («el cajero envió un mensaje sobre el porcentaje del viaje y el garaje»). Y recuerda: «dijeron» y «trajeron» jamás llevan «i» tras la J.",
    ejemplos: [
      { bien: "Exigimos que el ejecutivo bilingüe elija la cuenta y registre el porcentaje.", mal: "Exijimos que el ejecutivo bilingue eliga la cuenta y rejistre el porsentaje." },
      { bien: "Ellos trajeron los documentos con suficiente antigüedad.", mal: "Ellos trajieron los documentos con suficiente antiguedad." }
    ]
  },
  {
    id: "guia-h",
    titulo: "Uso de H y palabras sin H",
    icono: "letras",
    resumen: "Reglas seguras de la H inicial e intercalada, familias léxicas y diferenciación entre hecho/echo, ha/a y hasta/asta.",
    claves: "h sin h hielo huevo hueso ahorro ahora vehiculo prohibir exhibir hecho echo ha a hasta asta horario hipoteca",
    reglas: [
      "Llevan H todas las formas de los verbos HABER (ha, hay, había, hubo, haya, hemos), HACER (hago, hecho, deshacer, rehacer), HABLAR, HABITAR y HALLAR.",
      "Se escriben con H inicial las palabras que empiezan por los diptongos HIA-, HIE-, HUE-, HUI- (hiato, hielo, hierro, huevo, hueso, huella, huelga, huésped, huir). Nota culta: algunos derivados sin diptongo pierden la H (hueso → óseo; huevo → oval; huérfano → orfanato).",
      "Llevan H los prefijos HIDR- (agua), HIPER- (exceso), HIPO- (debajo o caballo), HOMO- (igual) y HUM- seguido de vocal: hidratar, hiperactivo, hipoteca, hipótesis, humano, humedad, humilde, honorarios, historial, horario, hábil, honesto.",
      "Llevan H intercalada palabras muy frecuentes en evaluaciones: ahora, ahorro, ahí, vehículo, prohibir, exhibir, alcohol, rehén, cohete, búho, zanahoria, Barahona.",
      "Pares con H y sin H: «ha» (auxiliar + participio: «ha enviado, ha dicho») vs. «a» (preposición + infinitivo o nombre: «va a enviar, llamó a Juan»); «hecho» (de hacer o suceso: «fue un hecho») vs. «echo» (de echar/botar: «echo la carta al buzón»); «hasta» (límite) vs. «asta» (palo de bandera); «hola» (saludo) vs. «ola» (mar)."
    ],
    truco: "Prueba del plural para «ha» vs. «a»: cambia el verbo a plural; si suena «han» («ha llegado → han llegado»), va con H. Si no admite «han» («voy a salir»), va sin H.",
    ejemplos: [
      { bien: "El cliente ha hecho un buen ahorro para su vehículo e hipoteca.", mal: "El cliente a echo un buen aorro para su veículo e ipoteca." },
      { bien: "Ahora mismo voy a revisar el horario de atención.", mal: "Aora mismo voy ha revisar el orario de atención." }
    ]
  },
  {
    id: "guia-lly",
    titulo: "Uso de LL y Y (yeísmo: valla/vaya/baya, calló/cayó, halla/haya/aya)",
    icono: "letras",
    resumen: "En el español dominicano pronunciamos igual LL e Y; aprende a distinguirlas por regla verbal y por significado.",
    claves: "ll y yeismo valla vaya baya callo cayo halla haya aya rallar rayar leyo construyo concluya cónyuge folleto billete",
    reglas: [
      "Regla de oro en verbos: Si el infinitivo NO tiene ni LL ni Y, todas las formas conjugadas donde aparezca ese sonido se escriben con Y: leer → leyó, caer → cayó/cayeron, construir → construyó, concluir → concluya, contribuir → contribuya, oír → oyendo, huir → huyeron, ir → vaya/vayamos.",
      "Se escriben con LL las terminaciones -ILLO, -ILLA, -ALLE, -ELLE, -ELLO (ventanilla, planilla, pasillo, billete, detalle, calle, sello, folleto, apellido) y los verbos terminados en -LLAR (desarrollar, detallar, sellar, atropellar, hallar, callar).",
      "Se escribe Y después de los prefijos AD-, DIS-, SUB- (adyacente, disyuntiva, subyacente), en la sílaba -YEC- (proyecto, trayecto, inyección) y al final de palabra tras vocal si es átona (hoy, ley, rey, muy, estoy, Higüey; plural: leyes, reyes). Cuidado con «cónyuge» (con Y y G, sin U).",
      "Trío 1 — VALLA / VAYA / BAYA: «valla» = cartel publicitario o cerca; «vaya» = verbo ir («espero que le vaya bien») o interjección; «baya» = fruto carnoso.",
      "Trío 2 — HALLA / HAYA / AYA (y ALLÁ): «halla» = encuentra (verbo hallar); «haya» = verbo haber («espero que haya cupo») o árbol; «aya» = niñera o cuidadora de niños; «allá» = adverbio de lugar lejano.",
      "Pares clásicos — CALLÓ / CAYÓ y RALLAR / RAYAR: «calló» = guardó silencio (callar) vs. «cayó» = se desplomó o venció en fecha (caer); «rallar» = desmenuzar con rallador vs. «rayar» = trazar líneas o tachar."
    ],
    truco: "Si viene de «caer», «leer» o «ir», va con Y («se cayó», «leyó el acta», «cuando vaya»). Si puedes sustituirlo por «encuentra», escribe «halla» con LL.",
    ejemplos: [
      { bien: "Espero que no haya errores en la valla del proyecto y que el cliente halla o encuentre rápido la sucursal.", mal: "Espero que no halla errores en la vaya del prollecto y que el cliente haya rápido la sucursal." },
      { bien: "Todos se callaron cuando se cayó el sistema en ventanilla.", mal: "Todos se cayeron cuando se calló el sistema en ventaniya." }
    ]
  },
  {
    id: "guia-rr-mp",
    titulo: "Uso de R / RR y de M antes de B y P",
    icono: "letras",
    resumen: "Cuándo duplicar la R y cómo no fallar jamás en combinaciones nasales MB, MP, NV y NF.",
    claves: "r rr doble erre alrededor enrique enriquillo subrayar vicerrector m antes de b y p cambio impuesto enviar informe",
    reglas: [
      "Doble RR: Únicamente se escribe RR cuando el sonido vibrante fuerte aparece ENTRE DOS VOCALES: ahorro, desarrollo, prórroga, cierre, arreglo, correo, bancarrota, vicerrector, contrarrestar.",
      "Una sola R con sonido fuerte: Al inicio de palabra SIEMPRE va una sola R (reunión, reporte, riesgo, Romana). Y después de las consonantes N, L o S SIEMPRE va una sola R aunque suene fuerte: Enrique, Enriquillo, honra, alrededor, subrayar, Israel.",
      "Una sola R con sonido suave entre vocales: cartera, interés, tarifa, horario, tesorería (cuidado: pero → perro, caro → carro, cero → cerro).",
      "M antes de B y P: Antes de B y de P SIEMPRE se escribe M, nunca N: cambio, reembolso, ambiente, también, timbre, impuesto, empresa, cumplimiento, empezar, comprobante, tiempo.",
      "N antes de V, F y otras consonantes: Antes de V y de F SIEMPRE se escribe N, nunca M: enviar, inversión, convenio, inconveniente, informe, confianza, transferencia; y en «inyección, inmediato, conmemorar, perenne» (NM / NN)."
    ],
    truco: "Regla visual «CoMPra y CaMBia con M; eNVía el iNForme con N». Y recuerda: tras N, L y S («NeLSon»), la R nunca se duplica.",
    ejemplos: [
      { bien: "Subrayaron el comprobante de reembolso en la sucursal de Enriquillo.", mal: "Subrrayaron el conprobante de reenbolso en la sucursal de Enrriquillo." },
      { bien: "El vicerrector envió el informe de cumplimiento sin inconvenientes.", mal: "El vicerector embió el imforme de cunplimiento sin imconvenientes." }
    ]
  },
  {
    id: "guia-confusiones",
    titulo: "Pares confusos en oficinas: haber/a ver, hay/ahí/ay, sino/si no",
    icono: "alerta",
    resumen: "Las expresiones que más puntos restan en pruebas de admisión y redacción ejecutiva.",
    claves: "haber a ver hay ahi ay sino si no a traves o sea por favor de acuerdo a veces tan bien tambien",
    reglas: [
      "HABER vs. A VER: «haber» es verbo (infinitivo) y acompaña a otros verbos o participios («debe haber soporte», «gracias por haber asistido»). «a ver» es preposición + verbo ver y equivale a «veamos» o «revisemos» («vamos a ver el balance», «a ver si aprueban hoy»). Nota: «aver» junto NO existe.",
      "HAY / AHÍ / AY: «hay» es verbo haber = existe («hay tres clientes en fila»); «ahí» es lugar = en ese sitio, lleva H intercalada y tilde («deje el expediente ahí»); «¡ay!» es exclamación de dolor o sorpresa.",
      "SINO vs. SI NO: «sino» (junto) contrapone una idea tras una negación («no es cuenta corriente, sino de ahorros»). «si no» (separado) es condicional + negación; admite meter un sujeto en medio («si [usted] no envía la cédula, no podremos avanzar»).",
      "TAMBIÉN vs. TAN BIEN / TAMPOCO vs. TAN POCO: «también» = además; «tan bien» = de forma tan buena («explicó tan bien el producto que cerraron el trato»).",
      "Locuciones que SIEMPRE van SEPARADAS: «a través» (dos palabras y tilde), «por favor» (dos palabras), «o sea» (dos palabras), «de acuerdo» (dos palabras), «a veces» (dos palabras), «en seguida» o «enseguida» (ambas válidas, preferible «enseguida»)."
    ],
    truco: "Prueba del sándwich para «si no»: intenta meter «usted» o «el cliente» entre «si» y «no». Si tiene sentido («si el cliente no firma»), va SEPARADO.",
    ejemplos: [
      { bien: "Vamos a ver si hay cupo ahí; si no, buscaremos no una, sino dos salas.", mal: "Vamos haber si ahí cupo hay; sino, buscaremos no una, si no dos salas." },
      { bien: "Por favor, confirme a través de este correo si está de acuerdo.", mal: "Porfavor, confirme através de este correo si está deacuerdo." }
    ]
  },
  {
    id: "guia-rd",
    titulo: "Errores frecuentes en RD y escritura de calles dominicanas",
    icono: "mapa",
    resumen: "Evita dominicanismos no normativos en contextos formales y escribe sin fallos las principales avenidas y provincias del país.",
    claves: "republica dominicana haiga nadien dijistes hubieron habian kennedy lincoln churchill betancourt pastoriza gasset higuey macoris",
    reglas: [
      "«Hubo / Había / Habrá» en singular: Cuando el verbo «haber» indica existencia nunca lleva plural, aunque lo que siga sea plural. Correcto: «Hubo varios reclamos», «Había veinte personas», «Habrá nuevas plazas». Incorrecto: «hubieron reclamos», «habían veinte personas».",
      "Segunda persona del pasado SIN -S final: Lo culto y correcto es «dijiste, hiciste, fuiste, enviaste, recibiste, solicitaste» (NUNCA «dijistes, hicistes, recibistes»).",
      "Formas inexistentes en la norma culta: Nunca escribas «haiga» (es «haya»), «nadien» (es «nadie»), «más mayor / más mejor / más peor» (es «mayor, mejor, peor»), ni «en base a» (prefiere «con base en» o «sobre la base de»).",
      "Avenidas extranjeras muy evaluadas en RD: Avenida John F. Kennedy (h después de o, doble n), Avenida Abraham Lincoln (m final en Abraham, l antes de n en Lincoln), Avenida Winston Churchill (ns y doble l), Avenida Rómulo Betancourt (tilde en Rómulo, termina en -court), Avenida Charles de Gaulle (doble l), Avenida José Ortega y Gasset (doble s, una t), Avenida George Washington (sh y ng), Avenida Sarasota (s-s y una t).",
      "Avenidas y topónimos nacionales clave: Av. Núñez de Cáceres, Av. Máximo Gómez, Av. Gustavo Mejía Ricart, Av. Tiradentes (con s final), Av. Pedro Henríquez Ureña, Av. Enriquillo (una sola r y ll), Calle Roberto Pastoriza (con z), Higüey (con h, diéresis ü e y), San Pedro de Macorís (tilde y s), Bávaro (tilde, b y v), Barahona (b y h intercalada)."
    ],
    truco: "Recuerda la fórmula de oro de las tres grandes avenidas del Polígono Central: «JoHN KeNNedy · AbrahaM LincoLN · WiNSton ChurchiLL».",
    ejemplos: [
      { bien: "Hubo mucha lluvia en la Avenida John F. Kennedy esquina Abraham Lincoln.", mal: "Hubieron muchas lluvias en la Avenida Jhon F. Kenedy esquina Abrahan Lincon." },
      { bien: "Nadie me comentó lo que dijiste en la sucursal de Higüey.", mal: "Nadien me comentó lo que dijistes en la sucursal de Higuey." }
    ]
  },
  {
    id: "guia-correos-corp",
    titulo: "Manual práctico de redacción de correos corporativos y bancarios",
    icono: "correo",
    resumen: "Estructura impecable desde el asunto hasta la firma: puntuación del saludo, minúsculas, cifras, horas y tono ejecutivo.",
    claves: "correos corporativos bancarios saludo dos puntos estimado senor despedida dias meses mayusculas minusculas a. m. porcentaje",
    reglas: [
      "Asunto claro y específico: Debe resumir la acción y referencia en 6 a 10 palabras, sin punto final. Ejemplo: «Solicitud de aprobación de crédito — Expediente 40921».",
      "Saludo con DOS PUNTOS (:), nunca coma: En español la coma tras el saludo («Estimado cliente,») es un anglicismo incorrecto. Lo normativo es: «Estimado señor Almonte:», «Estimada licenciada Peña:» o «Buenos días, equipo:» (nota la coma antes del nombre cuando saludas con «Buenos días, Ana:»).",
      "Uso correcto de minúsculas: Se escriben con minúscula los días de la semana («lunes, jueves»), los meses («marzo, octubre»), las estaciones y los cargos o títulos («el gerente general, la licenciada Gómez, el señor Pérez, usted»).",
      "Horas, porcentajes y monedas según la RAE: Las abreviaturas horarias llevan punto y espacio («9:00 a. m.», «4:30 p. m.»). El signo de porcentaje lleva espacio tras la cifra («12 %», «0.5 %»). Evita mezclar «a. m.» con formato de 24 horas («15:00 p. m.» es redundante; usa «3:00 p. m.» o «15:00 h»).",
      "Cuerpo en 3 párrafos breves: 1) Motivo directo del correo, 2) Detalle o documentos adjuntos («Adjunto encontrará…», evitando muletillas arcaicas como «Por medio de la presente me dirijo a usted con la finalidad de…»), y 3) Llamado claro a la acción con fecha límite.",
      "Despedida limpia: Solo lleva mayúscula la primera palabra, seguida de coma: «Saludos cordiales,» o «Atentamente,» (NO «Saludos Cordiales»)."
    ],
    truco: "Antes de pulsar «Enviar», aplica la lista de 5 segundos: 1) ¿Dos puntos tras el saludo? 2) ¿Días, meses y cargos en minúscula? 3) ¿«envío / día / través / próximo / análisis» con tilde? 4) ¿«Adjunto» adjuntado de verdad? 5) ¿Despedida sin mayúsculas sobrantes?",
    ejemplos: [
      { bien: "Estimada señora Díaz:\nAdjunto le envío el estado de cuenta de marzo con la tasa del 11 %.\nSaludos cordiales,", mal: "Estimada Señora Díaz,\nAjunto le envio el estado de cuenta de Marzo con la taza del 11%.\nSaludos Cordiales," }
    ]
  }
];
