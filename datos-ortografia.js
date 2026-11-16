/* =========================================================
   Banco de preguntas de ortografía
   Formato de cada línea:
   - Palabra u oración:   correcta|incorrecta1|incorrecta2|incorrecta3|explicación
   - Completar oración:   oración con ___|correcta|incorrecta1|incorrecta2|incorrecta3|explicación
   ========================================================= */
var CATEGORIAS_ORTO = [
  { id: "tildes", nombre: "Tildes" },
  { id: "bv", nombre: "B/V" },
  { id: "csz", nombre: "C/S/Z" },
  { id: "h", nombre: "H" },
  { id: "lly", nombre: "LL/Y" },
  { id: "correos", nombre: "Errores en correos" },
  { id: "diacritica", nombre: "Tilde diacrítica" },
  { id: "homofonos", nombre: "Homófonos en contexto" },
  { id: "cqk", nombre: "C/Q/K" },
  { id: "gj", nombre: "G/J" },
  { id: "rd", nombre: "Calles y lugares de RD" }
];

var DATOS_ORTO = {};

DATOS_ORTO.bv = `
escribir|escrivir|ezcribir|escribír|Los verbos terminados en -bir se escriben con b (escribir, recibir, subir). Excepciones: hervir, servir y vivir.
recibir|resibir|recivir|resivir|Verbo terminado en -bir: lleva b. Además, recibir se escribe con c (re-ci-bir).
caminaba|caminava|kaminaba|caminavá|El pretérito imperfecto de los verbos terminados en -ar se escribe con b: caminaba, trabajaba, estudiábamos.
también|tanbién|tambien|tamvién|Antes de b se escribe m (mb). Además, también es aguda terminada en n: lleva tilde.
enviar|embiar|enbiar|emviar|Después de n se escribe v (nv): enviar, invierno, convenio.
invierno|imvierno|inbierno|imbierno|Después de n se escribe v: invierno, invitar, enviar.
carnívoro|carníboro|carnivoro|karnívoro|Las palabras terminadas en -ívoro o -ívora se escriben con v (excepto víbora). Es esdrújula: lleva tilde.
activo|actibo|aktivo|áctivo|Los adjetivos terminados en -ivo o -iva se escriben con v: activo, positivo, decisiva.
posibilidad|posivilidad|pocibilidad|posibilidád|Las palabras terminadas en -bilidad se escriben con b (excepto movilidad y civilidad).
amable|amavle|hamable|amáble|Las palabras terminadas en -ble se escriben con b: amable, posible, responsable.
responsable|responsavle|resposable|responzable|Terminación -ble con b. Además, se escribe con s: res-pon-sa-ble.
buscar|vuscar|buzcar|buskar|Las palabras que empiezan por bu-, bur- y bus- se escriben con b: buscar, burla, buzón.
burbuja|vurbuja|burbuga|burvuja|Empieza por bur-: se escribe con b. La terminación -uja lleva j.
beneficio|veneficio|benefisio|beneficío|Las palabras que empiezan por bien- o bene- se escriben con b: beneficio, bienvenido.
biblioteca|vivlioteca|bibloteca|bibliotéca|Biblio- (libro) se escribe con b. En las combinaciones bl y br siempre va b.
obvio|ovbio|obio|ovio|Obvio lleva b y luego v (ob-vio). No se omite ninguna de las dos letras.
nueve|nuebe|nuéve|nuevé|Las palabras terminadas en -eve se escriben con v: nueve, breve, leve.
evaluación|ebaluación|evaluasión|evaluacion|Las palabras que empiezan por eva-, eve-, evi- y evo- se escriben con v (excepto ébano y ebanista).
evidente|ebidente|evidénte|evidete|Empieza por evi-: se escribe con v (evidente, evitar).
advertir|adbertir|advertír|avertir|Después de d se escribe v: advertir, adverbio, adversario.
hablaba|ablaba|hablava|havlaba|Hablar lleva h y b; el imperfecto de los verbos en -ar termina en -aba.
haber|aber|haver|abér|El verbo haber se escribe con h y con b: haber, había, hubo.
llevar|llebar|yevar|llevár|Llevar se escribe con ll y con v: lleva, llevamos.
vivir|bivir|vibir|bibir|Vivir es una de las tres excepciones de los verbos en -bir: se escribe con v (como hervir y servir).
servir|serbir|cervir|servír|Servir es una excepción de los verbos en -bir: se escribe con v.
subrayar|suvrayar|subrrayar|subrallar|El prefijo sub- se escribe con b. Después de b, la r suena fuerte, pero se escribe una sola: subrayar.
obtener|ovtener|obtenér|obetener|Las sílabas ob- y sub- se escriben con b: obtener, objeto, subtítulo.
favor|fabor|favór|faborr|Favor se escribe con v, igual que favorito y favorable.
novedad|nobedad|novedád|nobedá|Novedad pertenece a la familia de nuevo, que se escribe con v.
objetivo|ovjetivo|objetibo|obgetivo|Ob- con b; -ivo con v; y la j de objeto se mantiene.
probable|provable|probavle|prováble|La terminación -ble y la combinación br se escriben con b.
hubo|huvo|ubo|uvo|Las formas del verbo haber se escriben con h y b: hubo, había, hubiera.
estuvo|estubo|estuvó|eztuvo|El pretérito de estar, andar y tener se escribe con v: estuve, anduvo, tuvimos.
absorber|absorver|absorbér|abzorber|Absorber (empapar, atraer) se escribe con b; no confundir con absolver (perdonar).
deber|dever|devér|deberr|Deber se escribe con b: debo, debía, deberes.
bancario|vancario|bancário|bamcario|Banco y bancario se escriben con b. Antes de c se escribe n.
débito|dévito|débitto|dévitto|Débito se escribe con b y lleva tilde (esdrújula).
volver|bolver|volber|bolber|Volver se escribe con dos v: vol-ver.
valor|balor|valór|vallor|Valor se escribe con v: valor, valorar, evaluar.
cobro|covro|cóbro|kobro|En la combinación br siempre va b: cobro, cobrar.
abierto|avierto|abiérto|habierto|Abierto viene de abrir (combinación br): se escribe con b.
vigente|bigente|vijente|vigénte|Vigente se escribe con v y con g.
divisa|dibisa|divissa|devisa|Las palabras que empiezan por div- se escriben con v (excepto dibujo y sus derivados).
servicio|serbicio|servisio|cervicio|Servicio viene de servir (con v) y se escribe con c: ser-vi-cio.
habilidad|havilidad|abilidad|habilidád|Habilidad lleva h, y la terminación -bilidad va con b.
vicepresidente|bicepresidente|visepresidente|vicepresidénte|El prefijo vice- se escribe con v y c: vicepresidente, vicerrector.
`;

DATOS_ORTO.csz = `
canción|cansión|canzión|cancion|Se escribe -ción cuando en la familia hay palabras con -to, -tor o -dor: cantor → canción.
decisión|desición|decición|decisíon|Se escribe -sión cuando en la familia hay palabras con -so, -sor, -sivo o -sible: decisivo → decisión. Ojo: de-ci-sión (primero c, luego s).
atención|atensión|atenzión|atencion|Atento → atención: si la familia tiene -to, se escribe -ción.
confusión|confución|confuzión|confusion|Confuso → confusión: si la familia tiene -so, se escribe -sión.
lápices|lápizes|lapices|lápises|Las palabras terminadas en z cambian la z por c en plural: lápiz → lápices. Es esdrújula: lleva tilde.
veces|vezes|beces|veses|Vez termina en z; en plural la z cambia a c: veces.
conozco|conosco|conozko|conozo|Los verbos terminados en -cer y -cir forman la primera persona con -zco: conocer → conozco.
produzco|produsco|produzo|prodúzco|Producir → produzco (terminación -zco).
buenísimo|buenícimo|buenízimo|buenisimo|El superlativo -ísimo se escribe con s y siempre lleva tilde (es esdrújula).
ventajoso|ventajozo|ventagoso|bentajoso|Los adjetivos terminados en -oso u -osa se escriben con s: ventajoso, famoso.
canadiense|canadience|canadienze|canadiensé|Los gentilicios terminados en -ense se escriben con s: canadiense, nicaragüense, costarricense.
esperanza|esperansa|esperamza|ezperanza|La terminación -anza se escribe con z: esperanza, confianza, enseñanza.
confianza|confiansa|confiaza|comfianza|Terminación -anza con z. Antes de f se escribe n: con-fian-za.
vejez|vejés|bejez|vegez|Los sustantivos que expresan cualidades y terminan en -ez o -eza se escriben con z: vejez, rapidez, belleza.
belleza|bellesa|beyeza|belléza|Terminación -eza (cualidad) con z: belleza, tristeza, pobreza.
portazo|portaso|portasso|pórtazo|El sufijo -azo (golpe o aumentativo) se escribe con z: portazo, codazo, golpazo.
cafecito|cafesito|cafezito|cafécito|Los diminutivos -cito y -cita se escriben con c: cafecito, panecito (si la palabra base no lleva s; de casa → casita).
paciencia|pasiencia|paciensia|paciencía|Las terminaciones -ancia, -encia, -ancio y -encio se escriben con c (excepto ansia y hortensia).
distancia|distansia|dihtancia|distanzia|Terminación -ancia con c: distancia, importancia, ganancia.
excepción|exepción|excepsión|ecepción|Excepción lleva xc (ex-cep-ción) y termina en -ción.
hacer|aser|haser|hacér|Hacer se escribe con h y c: hacer, hice, hacemos (pero hizo, con z ante o).
empezar|empesar|enpezar|empezár|Los verbos terminados en -zar se escriben con z: empezar, organizar, utilizar. Antes de p se escribe m.
empecé|empezé|empesé|enpecé|En los verbos en -zar, la z cambia a c ante e: empezar → empecé, organizar → organicé.
organización|organisación|organizasión|organizacíon|Organizar se escribe con z; por eso organización conserva la z y termina en -ción.
necesario|nesesario|nececario|necesário|Necesario: primero c y luego s (ne-ce-sa-rio). Truco: «es neCeSario poner la C antes que la S».
precisión|presición|precición|presisión|Preciso → precisión: si la familia tiene -so, se escribe -sión. Primero c, luego s: pre-ci-sión.
conclusión|conclución|concluzión|conclusion|Concluso → conclusión, con -sión y tilde.
comenzar|comensar|comenzár|komenzar|Verbo terminado en -zar: se escribe con z.
sociedad|sosiedad|zociedad|sociedád|Sociedad se escribe con s inicial y c: viene de socio.
sencillo|sensillo|senciyo|zencillo|Sencillo se escribe con s inicial, c y ll: sen-ci-llo.
dirección|direción|dirreción|direcsión|Se escribe -cc- cuando en la familia aparece -ct-: director, directo → dirección.
reducción|redución|reducsión|reduccíon|Reductor → reducción: si en la familia hay -ct-, se escribe -cc-.
explicación|esplicación|explicasión|explicacíon|Explicar lleva x; el sustantivo termina en -ción.
transacción|transación|transaccíon|tranzacción|Transacción lleva cc (trans-ac-ción) y tilde por ser aguda terminada en n.
comisión|comición|comisíon|comision|Comisión termina en -sión (como comisionar) y lleva tilde.
cancelación|cancelasión|canselación|cancelacion|Cancelar → cancelación: con c en ca-ce y terminación -ción.
balance|valance|balanse|balanze|Balance se escribe con b y termina en -ance, con c.
cifra|zifra|sifra|cifrá|Cifra se escribe con c inicial.
asesor|acesor|asezor|asesór|Asesor se escribe con dos s: a-se-sor.
proceso|prosseso|proseso|procezo|Proceso: primero c y luego s (pro-ce-so).
consciente|conciente|conscíente|consiénte|Consciente lleva sc: cons-cien-te.
almacén|almasén|almazén|almacen|Almacén se escribe con c y lleva tilde (aguda terminada en n).
interés|interéz|interes|enterés|Interés termina en s y lleva tilde (aguda terminada en s).
conciliación|consiliación|conciliasión|conciliacíon|Conciliar → conciliación: con c y terminación -ción.
efectivo|efetivo|efectibo|efektivo|Efectivo lleva ct (como efecto) y la terminación -ivo con v.
`;

DATOS_ORTO.cqk = `
queso|keso|qeso|cueso|Ante e e i, el sonido k se escribe qu (con u muda): queso, quinto.
quince|kince|quinse|qince|Ante i se escribe qu: quince. La q siempre va acompañada de u.
quiero|kiero|qiero|quero|Querer → quiero: ante i, el sonido k se escribe qu.
cuaderno|quaderno|kuaderno|cuadermo|Ante a, o, u el sonido k se escribe con c: cuaderno, cuando, cosa. En español no se escribe «qua».
cuando|quando|kuando|cuamdo|Ante u se escribe c: cuando, cuatro, cuenta.
técnico|tecnico|téknico|tégnico|Al final de sílaba, el sonido k se escribe con c: téc-ni-co. Es esdrújula: lleva tilde.
acción|aqción|accion|ación|Acción lleva cc: la primera c cierra la sílaba (ac-ción). Es aguda terminada en n: lleva tilde.
pequeño|pekeño|pequeno|peqeño|Ante e se escribe qu: pe-que-ño. Lleva ñ.
equipo|ekipo|equípo|eqipo|Ante i se escribe qu: e-qui-po.
química|kímica|quimica|químika|Ante i se escribe qu; ante a, c: quí-mi-ca. Es esdrújula: lleva tilde.
paquete|paqete|pakete|paquéte|Ante e se escribe qu: pa-que-te.
arquitecto|arkitecto|arqitecto|arquitekto|Ante i se escribe qu; al final de sílaba, c: ar-qui-tec-to.
quedar|kedar|qedar|quedár|Ante e se escribe qu: quedar, quedo, quedamos.
acuerdo|aquerdo|akuerdo|acuerdó|Ante u se escribe c: a-cuer-do.
cualquier|qualquier|cualquíer|kualquier|Ante u se escribe c: cualquier, cuál, cuánto.
frecuencia|frequencia|frecuensia|frekuencia|Ante u se escribe c (fre-cuen-cia) y la terminación -encia lleva c.
adquirir|adquirír|adkirir|adqirir|Ante i se escribe qu: ad-qui-rir. Las palabras agudas terminadas en r no llevan tilde.
esquina|eskina|esqina|ezquina|Ante i se escribe qu: es-qui-na.
máquina|mákina|máqina|maquína|Ante i se escribe qu: má-qui-na. Es esdrújula: lleva tilde.
banquete|bamquete|banqete|banquéte|Ante e se escribe qu. Antes de q se escribe n, no m.
busqué|buscé|buské|busqe|Los verbos terminados en -car cambian c por qu ante e: buscar → busqué.
practiqué|practicé|practiké|practiqé|Practicar → practiqué: la c cambia a qu ante e.
saqué|sacé|saqé|zaqué|Sacar → saqué: la c cambia a qu ante e.
octubre|otubre|octubré|oktubre|Al final de sílaba, el sonido k se escribe con c: oc-tu-bre. Los meses van en minúscula.
conquista|conkista|conqista|comquista|Ante i se escribe qu: con-quis-ta.
cuestión|questión|cuestion|kuestión|Ante u se escribe c: cues-tión. Es aguda terminada en n: lleva tilde.
tranquilo|trankilo|tranqilo|tranquílo|Ante i se escribe qu: tran-qui-lo.
parque|parke|parqe|párque|Ante e se escribe qu: par-que.
karaoke|caraoke|qaraoke|karaoque|Karaoke es una palabra de origen japonés que conserva la k.
aquí|akí|aqui|aqí|Ante i se escribe qu. Aquí es aguda terminada en vocal: lleva tilde.
`;

DATOS_ORTO.gj = `
proteger|protejer|proteguer|protegér|Los verbos terminados en -ger y -gir se escriben con g (excepto tejer y crujir).
elegir|elejir|elegír|eleguir|Verbo terminado en -gir: se escribe con g.
protejo|protego|protégo|protexo|En los verbos en -ger y -gir, la g cambia a j ante a y o para mantener el sonido: proteger → protejo.
dije|dige|díje|dijé|Los pretéritos de decir, traer y los verbos en -ducir se escriben con j: dije, traje, conduje.
dijeron|dijieron|digeron|dijéron|Después de j no se añade i: dijeron, trajeron, condujeron (nunca «dijieron»).
trajeron|trajieron|trageron|trajéron|Traer → trajeron, con j y sin i después de la j.
condujo|condució|condujó|condugo|Los verbos en -ducir forman el pretérito con j: conducir → condujo; producir → produjo.
mensaje|mensage|mensáje|menzaje|Las palabras terminadas en -aje se escriben con j: mensaje, viaje, garaje.
viaje|viage|biaje|víaje|Terminación -aje con j.
tecnología|tecnolojía|tecnologia|tegnología|La terminación -logía se escribe con g. Lleva tilde por hiato (gí-a).
religión|relijión|religion|religíon|Las terminaciones -gión, -gio y -gía se escriben con g: religión, colegio, energía.
colegio|colejio|colegío|colejío|Terminación -gio con g.
geografía|jeografía|geografia|geográfia|El prefijo geo- (tierra) se escribe con g: geografía, geología.
extranjero|extrangero|estranjero|extranjéro|Las terminaciones -jero y -jera se escriben con j: extranjero, mensajero, cajera.
relojería|relogería|relojeria|reyojería|Las palabras terminadas en -jería se escriben con j; además, viene de reloj.
guerra|gerra|guera|güerra|Para el sonido suave ante e se escribe gu (u muda): guerra. Entre vocales, el sonido fuerte se escribe rr.
guitarra|gitarra|guitara|guitárra|Ante i, el sonido g suave se escribe gui: guitarra.
pingüino|pinguino|pingüíno|pinjüino|Se usa diéresis (ü) cuando la u debe pronunciarse en güe o güi: pingüino, vergüenza.
vergüenza|verguenza|vergüensa|bergüenza|La u suena: lleva diéresis (güe). La terminación -enza va con z.
bilingüe|bilingue|bilinjüe|bilingüé|La u suena: lleva diéresis. Bilingüe es llana terminada en vocal: sin tilde.
agencia|ajencia|agensia|agéncia|Las palabras con -gen- suelen escribirse con g: agencia, urgente, gente (excepto ajeno, berenjena y algunas más).
urgente|urjente|urgénte|hurgente|La terminación -gente se escribe con g: urgente, inteligente, vigente.
general|jeneral|generál|genaral|Gen- se escribe con g: general, género, generoso.
imagen|imajen|imágen|imagén|Imagen se escribe con g y sin tilde (llana terminada en n). Su plural, imágenes, sí lleva tilde.
origen|orijen|orígen|origén|Origen: con g y sin tilde (llana terminada en n). Plural: orígenes.
tejer|teger|tejér|texer|Tejer es una excepción: aunque termina en -er, se escribe con j (como crujir).
jefe|gefe|jéfe|hefe|Jefe se escribe con j, igual que jefatura.
garaje|garage|garáje|garraje|Terminación -aje con j. «Garage» es la forma francesa; en español es garaje.
exigir|exijir|exigír|ecsigir|Verbo terminado en -gir: con g. Lleva x: e-xi-gir.
cirugía|cirujía|cirugia|sirugía|Terminación -gía con g; lleva tilde por hiato.
ejemplo|egemplo|ejenplo|ejémplo|Ejemplo se escribe con j; antes de p va m.
`;

DATOS_ORTO.h = `
hielo|ielo|hiélo|jielo|Las palabras que empiezan por hia-, hie-, hue- y hui- se escriben con h: hielo, hierro.
huevo|uevo|huebo|güevo|Empieza por hue-: con h. Además, se escribe con v.
hueso|ueso|güeso|huezo|Empieza por hue-: con h. Ojo: su derivado óseo no lleva h.
humano|umano|humáno|jumano|Las palabras que empiezan por hum- seguido de vocal llevan h: humano, humedad, humilde.
hidratar|idratar|hidrattar|hidratár|El prefijo hidr- (agua) se escribe con h: hidratar, hidráulico.
hipótesis|ipótesis|hipotesis|hipótesís|El prefijo hipo- (debajo) se escribe con h. Es esdrújula: lleva tilde.
ahora|aora|ahóra|agora|Ahora lleva h intercalada: a-ho-ra.
prohibir|proibir|prohivir|proibír|Prohibir lleva h intercalada y b (verbo en -bir).
vehículo|veículo|vehiculo|behículo|Vehículo lleva h intercalada y tilde en la í (es esdrújula: ve-hí-cu-lo).
alcohol|alcol|alcool|alcojol|Alcohol lleva h intercalada: al-co-hol.
zanahoria|zanaoria|sanahoria|zanahória|Zanahoria lleva z inicial y h intercalada.
había|abía|havía|habia|Las formas del verbo haber llevan h y b. Había lleva tilde por hiato (ha-bí-a).
hoy|oy|hoi|ohy|Hoy lleva h inicial y termina en y (tras vocal, a final de palabra).
horario|orario|horário|jorario|Horario viene de hora, que lleva h.
hombre|ombre|honbre|hombré|Hombre lleva h y m antes de b.
hermano|ermano|hermáno|jermano|Hermano se escribe con h inicial.
hospital|ospital|hospitál|hostipal|Hospital se escribe con h inicial.
ahorro|aorro|ahoro|haorro|Ahorro lleva h intercalada y rr.
helado|elado|heládo|jelado|Helado viene de hielo: conserva la h.
huir|uir|huír|juir|Empieza por hui-: con h. Huir no lleva tilde.
exhibir|exibir|exhivir|ecsibir|Exhibir lleva h intercalada después de la x y b (verbo en -bir).
deshacer|desacer|deshaser|desaser|Deshacer = des + hacer: conserva la h de hacer.
hablar|ablar|havlar|hablár|Hablar se escribe con h y b.
hormiga|ormiga|hormíga|jormiga|Hormiga se escribe con h inicial.
búho|buho|búo|buhó|Búho lleva h intercalada y tilde en la ú por hiato (bú-ho): la h no impide el hiato.
hiperactivo|iperactivo|hiperáctivo|hiperactibo|El prefijo hiper- (exceso) se escribe con h.
hoja|oja|hoga|hója|Hoja se escribe con h inicial y j.
horizonte|orizonte|horisonte|orisonte|Horizonte se escribe con h inicial y z.
habitación|abitación|havitación|habitasión|Habitar y sus derivados llevan h y b: habitación, habitante.
hemorragia|emorragia|hemorrajia|hemorragía|El prefijo hemo- (sangre) se escribe con h.
huelga|uelga|güelga|huerga|Empieza por hue-: con h.
hipoteca|ipoteca|hipotéca|hipoteka|El prefijo hipo- se escribe con h: hipoteca, hipótesis.
historial|istorial|historiál|hystorial|Historial viene de historia, con h.
honorarios|onorarios|honorários|honorarioz|Honorarios viene de honor, con h.
humedad|umedad|humedád|humeda|Hum- seguido de vocal: con h. Termina en d.
hacienda|acienda|hasienda|haciénda|Hacienda se escribe con h y c.
hábil|ábil|habil|hábill|Hábil lleva h y tilde (llana terminada en l).
rehén|reén|rehen|réhen|Rehén lleva h intercalada y tilde (aguda terminada en n).
cohete|coete|cohéte|cojete|Cohete lleva h intercalada: co-he-te.
huésped|uésped|huesped|güésped|Empieza por hue-: con h. Es llana terminada en d: lleva tilde.
herramienta|erramienta|herramiénta|herramyenta|Herramienta se escribe con h inicial.
honesto|onesto|honésto|onezto|Honesto se escribe con h, como honestidad y honradez.
`;

DATOS_ORTO.lly = `
cuchillo|cuchiyo|cuchilo|kuchillo|Las terminaciones -illo e -illa se escriben con ll: cuchillo, pasillo, mantequilla.
pasillo|pasiyo|pacillo|pasilo|Terminación -illo con ll. Viene de paso: por eso lleva s.
leyó|lelló|leió|leyo|Si el infinitivo no tiene ll ni y, sus formas con ese sonido se escriben con y: leer → leyó.
construyó|construlló|contruyó|construió|Construir → construyó: se escribe con y (el infinitivo no tiene ll).
oyendo|ollendo|oiendo|hoyendo|Oír → oyendo: con y.
huyeron|hulleron|huieron|uyeron|Huir → huyeron: con y.
proyecto|prollecto|proyeto|proyécto|Las palabras con -yec- se escriben con y: proyecto, trayecto, inyección.
ayer|aller|ayér|haller|Ayer se escribe con y y sin h.
rey|rei|réy|rrey|Al final de palabra, tras vocal y sin acento, el sonido i se escribe y: rey, hoy, ley, muy.
muy|mui|múy|muí|Al final de palabra, tras vocal, el sonido i átono se escribe y: muy, hoy, estoy.
llave|yave|llabe|yabe|Llave se escribe con ll y v.
lluvia|yuvia|llubia|lluvía|Lluvia se escribe con ll y v.
calle|caye|cálle|kalle|Calle se escribe con ll.
orilla|oriya|horilla|orila|Terminación -illa con ll.
desarrollar|desarroyar|desarollar|desarrolar|Los verbos terminados en -llar se escriben con ll. Desarrollar lleva rr y ll.
apoyo|apollo|apoio|hapoyo|Apoyo se escribe con y.
ensayo|ensallo|ensaio|emsayo|Ensayo se escribe con y.
yerno|llerno|yérno|ierno|Las palabras que empiezan por yer- se escriben con y: yerno, yerba.
joya|jolla|joia|jóya|Joya se escribe con y.
billete|biyete|villete|bilete|Billete se escribe con b y ll.
brillante|briyante|brilante|brillánte|Brillar y brillante se escriben con ll.
caballo|cabayo|cavallo|cabalo|Caballo se escribe con b y ll.
sello|seyo|selo|zello|Sello se escribe con s y ll.
atropellar|atropeyar|atropelar|atropellár|Verbo terminado en -llar: con ll.
cayeron|calleron|caieron|callieron|Caer → cayeron: con y (el infinitivo no tiene ll).
trayecto|trallecto|trayeto|trayécto|Palabras con -yec-: con y.
inyección|inllección|inyeción|inyexión|Después de n, el sonido y se escribe con y: inyección. Lleva cc (inyectar → inyección).
ayudar|alludar|aiudar|hayudar|Ayudar se escribe con y y sin h.
semilla|semiya|cemilla|semila|Terminación -illa con ll.
playa|plalla|plaia|pláya|Playa se escribe con y.
millón|miyón|millon|milón|Millón se escribe con ll y lleva tilde (aguda terminada en n).
cónyuge|cónllugue|cónyugue|conyuge|Cónyuge se escribe con y, termina en -ge (no «cónyugue») y lleva tilde (esdrújula).
detalle|detaye|detále|detalye|Detalle se escribe con ll.
pantalla|pantaya|pantála|pamtalla|Pantalla se escribe con ll. Antes de t se escribe n.
folleto|foyeto|foleto|folléto|Folleto se escribe con ll.
yema|llema|yéma|iema|Yema se escribe con y.
leyes|lelles|leies|lleyes|El plural de ley conserva la y: leyes, reyes, bueyes.
taller|tayer|tallér|taler|Taller se escribe con ll.
batalla|bataya|vatalla|batála|Batalla se escribe con b y ll.
apellido|apeyido|apelido|apellído|Apellido se escribe con ll.
mayúscula|mallúscula|mayuscula|mayúsculá|Mayúscula se escribe con y. Es esdrújula: lleva tilde.
estrella|estreya|estrélla|eztrella|Estrella se escribe con ll.
`;

DATOS_ORTO.tildes = `
teléfono|telefono|teléfóno|telefóno|Es esdrújula (te-LÉ-fo-no): todas las esdrújulas llevan tilde.
rápido|rapido|rapído|rrápido|Es esdrújula (RÁ-pi-do): siempre lleva tilde.
árbol|arbol|arból|árból|Es llana terminada en l (consonante distinta de n o s): lleva tilde.
lápiz|lapiz|lapíz|lápis|Llana terminada en z: lleva tilde.
fácil|facil|facíl|fásil|Llana terminada en l: lleva tilde.
difícil|dificil|díficil|difísil|Llana terminada en l (di-FÍ-cil): lleva tilde.
examen|exámen|examén|éxamen|Es llana terminada en n: NO lleva tilde. Su plural, exámenes, sí (esdrújula).
exámenes|examenes|exámenés|examénes|Es esdrújula (e-XÁ-me-nes): lleva tilde.
joven|jóven|jovén|joben|Llana terminada en n: sin tilde. Plural: jóvenes (esdrújula, con tilde).
jóvenes|jovenes|jovénes|jóvenés|Esdrújula: siempre lleva tilde.
café|cafe|cáfe|kafé|Aguda terminada en vocal: lleva tilde.
sofá|sofa|sófa|zofá|Aguda terminada en vocal: lleva tilde.
reloj|relój|réloj|relog|Aguda terminada en j (no en n, s ni vocal): sin tilde.
país|pais|paíz|paiz|Hiato: la í tónica junto a vocal abierta siempre lleva tilde (pa-ís).
baúl|baul|bául|vaúl|Hiato: la ú tónica junto a vocal abierta lleva tilde (ba-úl).
maíz|maiz|máiz|mais|Hiato: la í tónica junto a la a lleva tilde (ma-íz).
policía|policia|polícia|polisía|Hiato: la í tónica lleva tilde (po-li-CÍ-a).
economía|economia|económia|ecónomia|Hiato: la í tónica lleva tilde (e-co-no-MÍ-a).
actúa|actua|áctua|actuá|Hiato: la ú tónica lleva tilde (ac-TÚ-a).
héroe|heroe|heróe|eroe|Las dos vocales abiertas forman hiato y siguen las reglas generales: HÉ-ro-e es esdrújula, lleva tilde.
océano|oceano|oceáno|océanó|O-CÉ-a-no es esdrújula: lleva tilde.
dígamelo|digamelo|digámelo|dígamélo|Sobresdrújula (DÍ-ga-me-lo): siempre lleva tilde.
rápidamente|rapidamente|rápidaménte|rapidaménte|Los adverbios en -mente conservan la tilde del adjetivo: rápido → rápidamente.
fácilmente|facilmente|fácilménte|facílmente|Fácil lleva tilde, así que fácilmente también.
comunicación|comunicacion|comunícación|comúnicación|Aguda terminada en n: lleva tilde.
reunión|reunion|reúnion|reuníon|Aguda terminada en n (reu-NIÓN): lleva tilde.
dieciséis|dieciseis|diesiséis|diecíseis|Aguda terminada en s (die-ci-SÉIS): lleva tilde.
después|despues|déspues|despúes|Aguda terminada en s: lleva tilde en la e (des-PUÉS).
jamás|jamas|jámas|hamás|Aguda terminada en s: lleva tilde.
fui|fuí|fúi|fuy|Los monosílabos no llevan tilde (salvo la diacrítica): fui, fue, dio, vio, ti.
guion|guión|guíon|gion|Desde 2010, guion se considera monosílabo y se escribe sin tilde.
vio|vió|bió|vío|Vio es monosílabo: no lleva tilde. Se escribe con v (verbo ver).
dio|dió|dío|dyo|Dio es monosílabo: no lleva tilde.
ti|tí|ty|tii|Ti nunca lleva tilde.
caracteres|carácteres|caractéres|caracterés|El plural de carácter es caracteres (ca-rac-TE-res): llana terminada en s, sin tilde.
régimen|regimen|regímen|régimén|Esdrújula (RÉ-gi-men): lleva tilde. Su plural es regímenes.
préstamo|prestamo|préztamo|préstamó|Esdrújula (PRÉS-ta-mo): lleva tilde.
crédito|credito|credíto|créditó|Esdrújula (CRÉ-di-to): lleva tilde.
cédula|cedula|cedúla|zédula|Esdrújula (CÉ-du-la): lleva tilde.
mínimo|minimo|minímo|mínimó|Esdrújula (MÍ-ni-mo): lleva tilde.
débil|debil|debíl|débill|Llana terminada en l: lleva tilde.
automático|automatico|automátíco|áutomatico|Esdrújula (au-to-MÁ-ti-co): lleva tilde.
garantía|garantia|garántia|garanntía|Hiato: la í tónica junto a la a lleva tilde (ga-ran-TÍ-a).
compañía|compañia|compáñia|compania|Hiato: la í tónica lleva tilde (com-pa-ÑÍ-a).
estadística|estadistica|estadístíca|estádistica|Esdrújula (es-ta-DÍS-ti-ca): lleva tilde.
dólar|dolar|dolár|dólár|Llana terminada en r: lleva tilde.
útil|util|utíl|úttil|Llana terminada en l: lleva tilde.
periódico|periodico|periodíco|períodico|Esdrújula (pe-RIÓ-di-co): lleva tilde.
`;

DATOS_ORTO.diacritica = `
Tú sabes que él no toma té.|Tu sabes que él no toma té.|Tú sabes que el no toma té.|Tú sabes que él no toma te.|Tú y él (pronombres) llevan tilde; té (bebida) también. Tu (posesivo), el (artículo) y te (pronombre) no.
A mí me gusta mi trabajo.|A mi me gusta mi trabajo.|A mí me gusta mí trabajo.|A mi me gusta mí trabajo.|Mí (pronombre, después de preposición) lleva tilde; mi (posesivo, antes de un sustantivo) no.
Sí, ya sé que se fue temprano.|Si, ya sé que se fue temprano.|Sí, ya se que se fue temprano.|Sí, ya sé que sé fue temprano.|Sí (afirmación) y sé (verbo saber) llevan tilde; se (pronombre) no.
Quiero que me dé una respuesta de inmediato.|Quiero que me de una respuesta de inmediato.|Quiero que me dé una respuesta dé inmediato.|Quiero que me de una respuesta dé inmediato.|Dé (verbo dar) lleva tilde; de (preposición) no.
Quiero más tiempo, mas no me lo dan.|Quiero mas tiempo, mas no me lo dan.|Quiero más tiempo, más no me lo dan.|Quiero mas tiempo, más no me lo dan.|Más (cantidad) lleva tilde; mas (equivale a «pero») no.
Si llueve, sí iré a buscarte.|Sí llueve, sí iré a buscarte.|Si llueve, si iré a buscarte.|Sí llueve, si iré a buscarte.|Si (condicional) va sin tilde; sí (afirmación) lleva tilde.
¿Qué quieres que te diga?|¿Que quieres que te diga?|¿Qué quieres qué te diga?|¿Que quieres qué te diga?|Qué lleva tilde cuando es interrogativo o exclamativo; que (conjunción) no.
No sé dónde dejé las llaves.|No se dónde dejé las llaves.|No sé donde dejé las llaves.|No se donde deje las llaves.|Dónde lleva tilde en las preguntas indirectas («no sé dónde»); sé es del verbo saber.
La casa donde nací está en Santiago.|La casa dónde nací está en Santiago.|La casa donde nací esta en Santiago.|La casa dónde naci está en Santiago.|Donde va sin tilde cuando no pregunta (es relativo). Está (verbo) lleva tilde.
¿Cómo te fue en la entrevista?|¿Como te fue en la entrevista?|¿Cómo te fué en la entrevista?|¿Como te fué en la entrevista?|Cómo (interrogativo) lleva tilde; fue, monosílabo, nunca lleva tilde.
Lo hice como me explicaste.|Lo hice cómo me explicaste.|Lo hice como me explicastes.|Lo hice cómo me explicastes.|Como (modo, sin pregunta) va sin tilde; la forma correcta es «explicaste», sin s final.
Aún no ha llegado el informe.|Aun no ha llegado el informe.|Aún no a llegado el informe.|Aun no a llegado el informe.|Aún (= todavía) lleva tilde; «ha llegado» es del verbo haber, con h.
Aun así, seguiremos adelante.|Aún así, seguiremos adelante.|Aun asi, seguiremos adelante.|Aún asi, seguiremos adelante.|Aun (= incluso, hasta) no lleva tilde: «aun así». Así lleva tilde (aguda terminada en vocal).
Solo trabajo los sábados.|Sólo trabajo los sábados.|Solo trabajo los sabados.|Sólo trabajo los sabados.|Según la norma actual, «solo» se escribe sin tilde. Sábados es esdrújula: lleva tilde.
Este informe es mejor que ese.|Éste informe es mejor que ése.|Este informe es mejor que ése.|Éste informe es mejor que ese.|Los demostrativos (este, ese, aquel) se escriben sin tilde según la norma actual.
¿Cuál es tu correo electrónico?|¿Cual es tu correo electrónico?|¿Cuál es tú correo electrónico?|¿Cuál es tu correo electronico?|Cuál (interrogativo) lleva tilde; tu (posesivo) no; electrónico es esdrújula.
¿Quién llamó esta mañana?|¿Quien llamó esta mañana?|¿Quién llamo esta mañana?|¿Quien llamo esta mañana?|Quién (interrogativo) lleva tilde; llamó (pasado, aguda terminada en vocal) también.
Pregúntale cuándo será la reunión.|Preguntale cuándo será la reunión.|Pregúntale cuando será la reunión.|Pregúntale cuándo sera la reunion.|Cuándo lleva tilde en las preguntas indirectas. Pregúntale es esdrújula.
Te llamo cuando salga de la oficina.|Te llamo cuándo salga de la oficina.|Té llamo cuando salga de la oficina.|Té llamo cuándo salga de la oficina.|Cuando va sin tilde si no pregunta; te (pronombre) va sin tilde.
Él dijo que el jefe vendría.|El dijo que el jefe vendría.|Él dijo que él jefe vendría.|El dijo que él jefe vendría.|Él (pronombre) lleva tilde; el (artículo, antes de un sustantivo) no.
¡Qué buena noticia!|¡Que buena noticia!|¡Qué buena noticía!|¡Que buena noticía!|Qué exclamativo lleva tilde.
Tengo 3 o 4 reuniones hoy.|Tengo 3 ó 4 reuniones hoy.|Tengo 3 o 4 reuniónes hoy.|Tengo 3 ó 4 reuniónes hoy.|Desde 2010, la conjunción o no lleva tilde, ni siquiera entre números. Reuniones es llana terminada en s: sin tilde.
Esto es para ti.|Esto es para tí.|Ésto es para ti.|Ésto es para tí.|Ti nunca lleva tilde. «Esto» tampoco.
No sé por qué no vino.|No sé porque no vino.|No se por qué no vino.|No sé porqué no vino.|«Por qué» (separado y con tilde) se usa en preguntas directas e indirectas.
No vino porque estaba enfermo.|No vino por qué estaba enfermo.|No vino porqué estaba enfermo.|No vino por que estaba enfermo.|«Porque» (junto y sin tilde) introduce una causa.
Nadie sabe el porqué de su renuncia.|Nadie sabe el por qué de su renuncia.|Nadie sabe el porque de su renuncia.|Nadie sabe él porqué de su renuncia.|«El porqué» es un sustantivo (= la razón): junto y con tilde.
Estamos ansiosos por que llegue el viernes.|Estamos ansiosos porque llegue el viernes.|Estamos ansiosos por qué llegue el viernes.|Estamos ansiosos porqué llegue el viernes.|«Por que» (separado y sin tilde): preposición «por» + «que». Se dice «ansiosos por algo»: por que llegue el viernes.
Dile a él que me lo dé a mí.|Dile a el que me lo de a mi.|Dile a él que me lo de a mí.|Dile a él que me lo dé a mi.|Él (pronombre), dé (verbo dar) y mí (pronombre) llevan tilde.
Sé puntual, por favor.|Se puntual, por favor.|Sé puntúal, por favor.|Se puntúal, por favor.|Sé es también el imperativo del verbo ser: «sé puntual».
¿Te gusta el té frío?|¿Té gusta el té frío?|¿Te gusta el te frío?|¿Te gusta el té frio?|Té (bebida) lleva tilde; te (pronombre) no. Frío lleva tilde por hiato.
Mientras más estudies, más aprenderás.|Mientras mas estudies, mas aprenderás.|Mientras más estudies, mas aprenderás.|Mientras más estudies, más aprenderas.|Más (cantidad) lleva tilde; aprenderás es aguda terminada en s.
`;

DATOS_ORTO.homofonos = `
Ojalá que ___ buen tiempo mañana.|haya|halla|aya|allá|Haya es del verbo haber. Halla = encuentra; aya = niñera; allá = lugar.
Ella siempre ___ la solución a los problemas.|halla|haya|aya|alla|Halla es del verbo hallar (encontrar).
Ya he ___ el informe que me pidieron.|hecho|echo|hechó|echó|Hecho (con h) es el participio de hacer. Echo y echó son del verbo echar (tirar, botar).
Yo ___ la basura todas las noches.|echo|hecho|echó|écho|Echo (sin h) es del verbo echar. Hecho (con h) viene de hacer.
___ un error en la factura.|Hay|Ahí|Ay|Ai|Hay es del verbo haber (existir). Ahí indica lugar; ay expresa dolor o sorpresa.
Deja los documentos ___, sobre el escritorio.|ahí|hay|ay|ahi|Ahí indica lugar. Lleva tilde por hiato.
¡___, me lastimé el dedo con la puerta!|Ay|Hay|Ahí|Ahy|Ay es una exclamación de dolor o sorpresa.
Vamos ___ qué dice el gerente.|a ver|haber|aver|a haber|«A ver» (preposición + verbo ver) significa «veamos».
Debe ___ una solución para este problema.|haber|a ver|aver|haver|Haber es un verbo (existir); va detrás de otro verbo: «debe haber».
No es azul, ___ verde.|sino|si no|sinó|cino|«Sino» (junto) contrapone ideas: no es esto, sino aquello.
___ estudias, no aprobarás.|Si no|Sino|Sinó|Sí no|«Si no» (separado) es el condicional «si» más la negación «no».
Ella canta ___ como su madre.|tan bien|también|tan vien|tanbién|«Tan bien» significa «de manera tan buena». «También» significa «además, igualmente».
Yo ___ quiero ir a la reunión.|también|tan bien|tamvién|tambien|«También» = igualmente, además.
Juan ___ llegado tarde otra vez.|ha|a|ah|há|Ha (con h) es del verbo haber; va antes de un participio (llegado).
Mañana voy ___ la oficina temprano.|a|ha|ah|há|A (sin h) es una preposición: indica dirección.
El niño se ___ de la bicicleta.|cayó|calló|callo|cayo|Cayó viene de caer. Calló viene de callar (guardar silencio).
Cuando entró el jefe, todos se ___.|callaron|cayeron|calleron|cayaron|Callaron viene de callar (guardar silencio). Cayeron viene de caer.
Pusieron una ___ publicitaria en la avenida.|valla|vaya|baya|balla|Valla = cartel publicitario o cerca. Vaya = verbo ir o exclamación. Baya = fruto.
Espero que te ___ bien en el examen.|vaya|valla|baya|balla|Vaya es del verbo ir.
Se me cayó el ___ de agua.|vaso|baso|bazo|vazo|Vaso = recipiente para beber. Bazo = órgano del cuerpo.
Una ___ enorme mojó a los bañistas.|ola|hola|olla|holla|Ola (sin h) = onda del mar. Hola (con h) = saludo. Olla = recipiente de cocina.
___, ¿cómo estás?|Hola|Ola|Óla|Holá|Hola (saludo) se escribe con h.
Trabajaré ___ las cinco de la tarde.|hasta|asta|hazta|ásta|Hasta indica límite. Asta = palo de la bandera o cuerno.
La bandera ondea en lo alto del ___.|asta|hasta|azta|hazta|Asta (sin h) = palo de la bandera.
Tengo que ___ el botón de la camisa.|coser|cocer|cozer|cosser|Coser = unir con hilo y aguja. Cocer = cocinar.
Hay que ___ los plátanos antes de hacer el mangú.|cocer|coser|cozer|cocér|Cocer (con c) = cocinar. Coser (con s) = unir con hilo.
Se rompió un ___ del agua en el baño.|tubo|tuvo|tuvó|túbo|Tubo = pieza cilíndrica hueca. Tuvo = verbo tener.
Ayer el gerente ___ una reunión importante.|tuvo|tubo|tuvó|tubó|Tuvo es del verbo tener: se escribe con v.
Mañana vamos a ___ en las elecciones.|votar|botar|vottar|votár|Votar = elegir en unas elecciones. Botar = tirar, echar (muy usado en RD).
No olvides ___ la basura antes de salir.|botar|votar|botár|bottar|Botar = tirar, echar. Votar = dar el voto.
Voy a ___ el queso para la pasta.|rallar|rayar|ralar|rayyar|Rallar = desmenuzar con el rallador. Rayar = hacer rayas.
No dejes que el niño ___ la pared.|raye|ralle|rraye|rálle|Rayar = hacer rayas. Rallar = desmenuzar.
Lo ___ mucho, no pude llegar a tiempo.|siento|ciento|sciento|ziento|Siento viene de sentir. Ciento es un número (100).
El total es ___ cincuenta pesos.|ciento|siento|sciento|ziento|Ciento (con c) es el número. Siento (con s) viene de sentir.
La ___ de la junta empezó a las nueve.|sesión|cesión|seción|sessión|Sesión = reunión o período de actividad. Cesión = acción de ceder.
Corrió a ___ a su madre en el aeropuerto.|abrazar|abrasar|habrazar|abrazár|Abrazar = rodear con los brazos. Abrasar = quemar.
Vamos a ___ la reunión para quienes no puedan asistir.|grabar|gravar|gravár|grabár|Grabar = registrar sonido o imagen. Gravar = imponer un impuesto.
El banco cobra una ___ de interés del 12 %.|tasa|taza|tassa|tasá|Tasa (con s) = porcentaje, índice o tributo. Taza (con z) = recipiente para beber.
`;

DATOS_ORTO.correos = `
a través|através|a travéz|atravez|«A través» se escribe siempre separado y con tilde en través (aguda terminada en s).
adjunto|ajunto|adjúnto|adyunto|Adjunto lleva dj: ad-jun-to.
información|imformación|informacion|infornación|Antes de f se escribe n. Es aguda terminada en n: lleva tilde.
gestión|gestion|jestión|gestíon|Gestión se escribe con g y lleva tilde (aguda terminada en n).
envío|envio|embío|enbío|Envío lleva tilde por hiato (en-VÍ-o) y v después de n.
próximo|proximo|prócsimo|prósimo|Esdrújula: lleva tilde. Se escribe con x.
análisis|analisis|análisís|analísis|Esdrújula (a-NÁ-li-sis): lleva tilde.
código|codigo|códico|cógido|Esdrújula (CÓ-di-go): lleva tilde.
área|area|áera|hárea|Esdrújula (Á-re-a): lleva tilde.
éxito|exito|écsito|éxsito|Esdrújula: lleva tilde. Se escribe con x.
sugerencia|sujerencia|sugerensia|sugerencía|Sugerir y sugerencia se escriben con g; la terminación -encia lleva c.
cotización|cotisación|cotizasión|cotizacion|Cotizar → cotización: conserva la z y termina en -ción, con tilde.
proveedor|probeedor|provedor|proveédor|Proveedor viene de proveer: lleva v y dos e.
solicitud|solisitud|solicitúd|solicitub|Solicitud se escribe con c (so-li-ci-tud) y sin tilde (aguda terminada en d).
presupuesto|presupesto|precupuesto|presupuezto|Presupuesto = pre + supuesto, con s.
inconveniente|imconveniente|inconbeniente|inconveniénte|Antes de c y de v se escribe n: in-con-ve-nien-te.
electrónico|electronico|eléctronico|electróniko|Esdrújula (e-lec-TRÓ-ni-co): lleva tilde.
anexo|anecso|ánexo|annexo|Anexo se escribe con x.
Estimado señor:|Estimado señor,|Estimado Señor:|Estimado Señor,|Tras el saludo de una carta o correo se escriben dos puntos (la coma es un anglicismo), y «señor» va en minúscula.
Saludos cordiales|Saludos Cordiales|saludos Cordiales|Saludos cordiáles|En la despedida solo va en mayúscula la primera palabra.
Le envío el informe ___ de este correo.|a través|através|atravez|a travez|«A través» se escribe siempre separado y con tilde.
Vamos ___ si podemos reunirnos el lunes.|a ver|haber|aver|a haber|«A ver» (= veamos) es la preposición a más el verbo ver.
Por favor, ___ el contrato antes del viernes.|revise|rebise|revice|révise|Revisar se escribe con v y s.
___ su atención y quedo a la espera de su respuesta.|Agradezco|Agradesco|Agradeszco|Agradezko|Agradecer → agradezco (los verbos en -cer forman la primera persona con -zco).
Espero que no ___ inconvenientes con la entrega.|haya|haiga|halla|aya|La forma correcta es «haya» (verbo haber). «Haiga» es un vulgarismo.
Le confirmo la ___ del jueves a las 10:00 a. m.|reunión|reunion|reuníon|reúnion|Reunión es aguda terminada en n: lleva tilde.
Hubo varios problemas en el sistema.|Hubieron varios problemas en el sistema.|Hubo barios problemas en el sistema.|Hubieron barios problemas en el sistema.|El verbo haber, cuando indica existencia, se usa siempre en singular: hubo, había, habrá problemas.
Había muchas personas en la reunión.|Habían muchas personas en la reunión.|Había muchas personas en la reunion.|Habían muchas personas en la reunion.|Haber impersonal va en singular: «había muchas personas».
Nadie respondió el correo.|Nadien respondió el correo.|Nadie respondio el correo.|Nadien respondio el correo.|La forma correcta es «nadie» (no «nadien»). Respondió es aguda terminada en vocal: lleva tilde.
¿Recibiste el archivo que te envié?|¿Recibistes el archivo que te envié?|¿Recibiste el archivo que te envie?|¿Recibistes el archivo que te envie?|La segunda persona del pretérito no termina en s: recibiste, dijiste, enviaste.
Me dijiste que llamarías al cliente.|Me dijistes que llamarías al cliente.|Me dijiste que llamarias al cliente.|Me dijistes que llamarias al cliente.|«Dijiste», sin s final. Llamarías lleva tilde por hiato.
El lunes 5 de marzo tendremos la reunión.|El Lunes 5 de Marzo tendremos la reunión.|El lunes 5 de Marzo tendremos la reunión.|El Lunes 5 de marzo tendremos la reunión.|Los días de la semana y los meses se escriben con minúscula.
Buenos días, Ana:|Buenos dias, Ana:|Buenos días Ana,|Buenos Días, Ana:|Días lleva tilde; el nombre de la persona a quien se saluda se separa con coma, y tras el saludo van dos puntos.
Por favor, confirme su asistencia.|Porfavor, confirme su asistencia.|Por favor, confirme su asistensia.|Porfavor, confirme su asistensia.|«Por favor» se escribe separado. Asistencia se escribe con c en la terminación -encia.
A veces el sistema tarda en responder.|Aveces el sistema tarda en responder.|A veses el sistema tarda en responder.|Abeces el sistema tarda en responder.|«A veces» se escribe separado; vez cambia la z por c en plural.
Estoy de acuerdo con la propuesta.|Estoy deacuerdo con la propuesta.|Estoy de acuerdo con la propuezta.|Estoy deacuerdo con la propuezta.|«De acuerdo» se escribe en dos palabras.
O sea, la entrega será el viernes.|Osea, la entrega será el viernes.|O sea, la entrega sera el viernes.|Osea, la entrega sera el viernes.|«O sea» siempre va separado. Será es aguda terminada en vocal: lleva tilde.
Le informo que la reunión se realizará el próximo jueves a las 10:00 a. m. en la sala de conferencias.|Le informo que la reunion se realizará el proximo jueves a las 10:00 a. m. en la sala de conferencias.|Le imformo que la reunión se realizara el próximo jueves a las 10:00 a. m. en la sala de conferencias.|Le informo que la reunión se realizará el próximo Jueves a las 10:00 a. m. en la sala de conferensias.|Reunión, realizará y próximo llevan tilde; informo lleva n antes de f; los días van en minúscula y conferencias se escribe con c.
Adjunto encontrará el análisis de riesgo del cliente. Si tiene alguna duda, no dude en contactarme.|Ajunto encontrará el analisis de riesgo del cliente. Si tiene alguna duda, no dude en contactarme.|Adjunto encontrara el análisis de riesgo del cliente. Si tiene alguna duda, no dude en contáctarme.|Adjunto encontrará el análisis de riezgo del cliente. Si tiene alguna duda, no dude en contactarme.|Adjunto lleva dj; encontrará (aguda) y análisis (esdrújula) llevan tilde; riesgo se escribe con s; contactarme no lleva tilde (llana terminada en vocal).
Hubo un error en el sistema, por eso no se procesaron las transferencias. Ya estamos trabajando en la solución.|Hubo un error en el sistema, por eso no se procesaron las tranferencias. Ya estamos trabajando en la solución.|Hubo un herror en el sistema, por eso no se procesaron las transferencias. Ya estamos trabajando en la solucion.|Hubo un error en el sistema, por eso no se prosesaron las transferencias. Ya estámos trabajando en la solución.|Transferencias lleva ns; error no lleva h; solución lleva tilde; procesaron va con c y s; estamos es llana terminada en s: sin tilde.
Le solicitamos que nos envíe una copia de su cédula y un estado de cuenta reciente.|Le solicitamos que nos envie una copia de su cedula y un estado de cuenta reciente.|Le solisitamos que nos embíe una copia de su cédula y un estado de cuenta reciente.|Le solicitamos que nos envíe una copia de su cédula y un estado de cuenta resiente.|Envíe lleva tilde por hiato; cédula es esdrújula; solicitamos va con c; envíe con v (después de n); reciente se escribe con c.
A través de este correo le confirmo que su solicitud fue aprobada. También le enviaremos el contrato por mensajería.|Através de este correo le confirmo que su solicitud fue aprobada. Tambien le enviaremos el contrato por mensajería.|A través de este correo le confirmo que su solisitud fue aprovada. También le enviaremos el contrato por mensajería.|A travez de este correo le confirmo que su solicitud fue aprobada. También le embiaremos el contrato por mensajeria.|«A través» va separado y con tilde; también lleva tilde; solicitud con c; aprobada con b; enviaremos con v; mensajería lleva tilde por hiato.
Vamos a ver si el cliente acepta la propuesta; si no, tendremos que ajustar la tasa.|Vamos haber si el cliente acepta la propuesta; sino, tendremos que ajustar la tasa.|Vamos a ver si el cliente acepta la propuesta; sino, tendremos que ajustar la taza.|Vamos aver si el cliente acepta la propuesta; si no, tendremos que ajustar la tasa.|«A ver» (= veamos) va separado; «si no» (= en caso contrario) también; tasa (porcentaje) se escribe con s, no taza (recipiente).
No pude asistir a la capacitación porque tuve una emergencia familiar. ¿Podría enviarme la presentación?|No pude asistir a la capacitación por qué tuve una emergencia familiar. ¿Podría enviarme la presentación?|No pude asistir a la capasitación porque tube una emergencia familiar. ¿Podría enviarme la presentación?|No pude asistir a la capacitación porque tuve una emergencia familiar. ¿Podria enviarme la precentación?|«Porque» (causa) va junto y sin tilde; capacitación con c; tuve (de tener) con v; podría lleva tilde por hiato; presentación con s.
Les recuerdo que el horario de atención al público es de lunes a viernes, de 8:30 a. m. a 4:00 p. m.|Les recuerdo que el horario de atención al público es de Lunes a Viernes, de 8:30 a. m. a 4:00 p. m.|Les recuerdo que el orario de atención al publico es de lunes a viernes, de 8:30 a. m. a 4:00 p. m.|Les recuerdo que el horario de atencion al público es de lunes a viernes, de 8:30 a. m. a 4:00 p. m.|Los días van en minúscula; horario lleva h; público es esdrújula; atención es aguda terminada en n.
Ya revisé el informe y encontré algunas inconsistencias en los saldos. Ahí le marqué las correcciones.|Ya revicé el informe y encontré algunas inconsistencias en los saldos. Hay le marqué las correcciones.|Ya revisé el informe y encontre algunas incosistencias en los saldos. Ahí le marqué las correcciones.|Ya revisé el imforme y encontré algunas inconsistensias en los saldos. Ahí le marque las correcciones.|Revisé con s; ahí (lugar) con h y tilde; encontré y marqué llevan tilde; inconsistencias lleva n antes de s y c en -encia; informe, n antes de f.
Por este medio solicito un día libre el próximo viernes para realizar una diligencia personal.|Por este medio solicito un dia libre el próximo viernes para realizar una dilijencia personal.|Por este medio solisito un día libre el proximo viernes para realizar una diligencia personal.|Por este medio solicito un día libre el próximo viernes para realisar una diligencia personal.|Día lleva tilde por hiato; diligencia con g; solicito con c; próximo es esdrújula; realizar con z.
Le informamos que su tarjeta de crédito ha sido bloqueada de forma preventiva. Por favor, comuníquese con nosotros.|Le informamos que su tarjeta de credito a sido bloqueada de forma preventiva. Por favor, comuníquese con nosotros.|Le informamos que su tarjeta de crédito ha sido vloqueada de forma prebentiva. Por favor, comuníquese con nosotros.|Le informamos que su tarjeta de crédito ha sido bloqueada de forma preventiva. Porfavor, comuniquese con nosotros.|Crédito y comuníquese son esdrújulas; «ha sido» es del verbo haber; bloqueada lleva bl; preventiva, v; «por favor» va separado.
El cliente se quejó porque no recibió el estado de cuenta. Hay que verificar su dirección.|El cliente se quejo porque no recibió el estado de cuenta. Ahí que verificar su dirección.|El cliente se quejó porque no resibió el estado de cuenta. Hay que verificar su direción.|El cliente se quejó por que no recibió el estado de cuenta. Hay que berificar su dirección.|Quejó lleva tilde; «hay que» es del verbo haber; recibió con c; dirección con cc; «porque» (causa) va junto; verificar con v.
`;

DATOS_ORTO.rd = `
Avenida John F. Kennedy|Avenida Jhon F. Kenedy|Avenida John F. Kenedy|Avenida Jhon F. Kennedy|Se escribe John (no «Jhon») y Kennedy con doble n.
Avenida Abraham Lincoln|Avenida Abrahan Lincon|Avenida Abraham Lincon|Avenida Abrahan Lincoln|Abraham termina en m; Lincoln lleva una l antes de la n final, aunque no se pronuncia.
Avenida Winston Churchill|Avenida Wiston Churchil|Avenida Winston Churchil|Avenida Wiston Churchill|Winston lleva n antes de la s; Churchill termina en doble l.
Avenida Máximo Gómez|Avenida Maximo Gomez|Avenida Máximo Gomes|Avenida Maximo Gómes|Máximo (esdrújula) y Gómez (llana terminada en z) llevan tilde; Gómez termina en z.
Avenida Gustavo Mejía Ricart|Avenida Gustavo Mejia Ricar|Avenida Gustavo Megía Ricart|Avenida Gustavo Mejía Ricard|Mejía lleva j y tilde por hiato; Ricart termina en t.
Avenida Rómulo Betancourt|Avenida Romulo Betancur|Avenida Rómulo Betancur|Avenida Romulo Betancourt|Rómulo es esdrújula; Betancourt conserva su grafía original con «court».
Avenida Núñez de Cáceres|Avenida Nuñez de Caceres|Avenida Núñes de Cáceres|Avenida Núñez de Cáseres|Núñez y Cáceres llevan tilde; Núñez termina en z y Cáceres se escribe con c en ambas sílabas.
Avenida Sarasota|Avenida Sarazota|Avenida Sarasotta|Avenida Zarasota|Sarasota (nombre de una ciudad de Florida) se escribe con s en ambas posiciones y una sola t.
Avenida Tiradentes|Avenida Tiradente|Avenida Tiradentez|Avenida Tirandentes|Tiradentes (héroe brasileño) termina en -tes.
Avenida José Ortega y Gasset|Avenida José Ortega y Gaset|Avenida Jose Ortega y Gasset|Avenida José Ortega y Gasett|Gasset lleva doble s y una sola t; José lleva tilde (aguda terminada en vocal).
Avenida Bolívar|Avenida Bolivar|Avenida Bolíbar|Avenida Bolivár|Bolívar es llana terminada en r: lleva tilde en la í. Se escribe con v.
Avenida Independencia|Avenida Independensia|Avenida Indepedencia|Avenida Imdependencia|La terminación -encia lleva c; antes de d se escribe n.
Avenida George Washington|Avenida George Whashington|Avenida George Washinton|Avenida Gorge Washington|George se escribe con eo; Washington lleva g antes de la t: Wash-ing-ton.
Avenida 27 de Febrero|Avenida 27 de Febreo|Avenida 27 de Febrrero|Avenida 27 de Febero|Febrero se escribe con br y una sola r al final: fe-bre-ro.
Calle Duarte|Calle Duartte|Calle Duharte|Calle Duart|Duarte se escribe con una sola t y sin h.
Avenida Charles de Gaulle|Avenida Charles de Gaule|Avenida Charles de Gol|Avenida Charle de Gaulle|Charles de Gaulle conserva su grafía francesa: Gaulle con doble l y e final.
Avenida Jacobo Majluta|Avenida Jacobo Magluta|Avenida Jacobo Mayluta|Avenida Jacobo Majlutta|Majluta se escribe con j seguida de l y una sola t.
Avenida Ecológica|Avenida Ecologica|Avenida Ecolójica|Avenida Écologica|Ecológica es esdrújula: lleva tilde en la o; se escribe con g.
Avenida Luperón|Avenida Luperon|Avenida Luperóm|Avenida Lupperón|Luperón es aguda terminada en n: lleva tilde.
Avenida Los Próceres|Avenida Los Proceres|Avenida Los Prócere|Avenida Los Prósceres|Próceres es esdrújula: lleva tilde.
Avenida Anacaona|Avenida Anacahona|Avenida Anacaóna|Avenida Anakaona|Anacaona (cacica taína) se escribe sin h, con c y sin tilde (llana terminada en vocal).
Avenida Pedro Henríquez Ureña|Avenida Pedro Enríquez Ureña|Avenida Pedro Henriquez Ureña|Avenida Pedro Henríquez Urena|Henríquez lleva h inicial y tilde; Ureña lleva ñ.
Avenida Leopoldo Navarro|Avenida Leopoldo Nabarro|Avenida Leopoldo Navaro|Avenida Lepoldo Navarro|Navarro se escribe con v y doble r; Leopoldo, con eo.
Avenida Francia|Avenida Fransia|Avenida Francía|Avenida Franzia|Francia se escribe con c y sin tilde.
Avenida Lope de Vega|Avenida Lope de Bega|Avenida Lopes de Vega|Avenida Lope de Vegas|Lope de Vega (escritor español): Lope sin s, Vega con v.
Avenida Federico Geraldino|Avenida Federico Jeraldino|Avenida Federico Geraldíno|Avenida Federíco Geraldino|Geraldino se escribe con g; ninguna de las dos palabras lleva tilde (llanas terminadas en vocal).
Calle Roberto Pastoriza|Calle Roberto Pastorisa|Calle Roberto Pastoríza|Calle Robert Pastoriza|Pastoriza se escribe con z y sin tilde.
Avenida Gregorio Luperón|Avenida Gregorio Luperon|Avenida Gregório Luperón|Avenida Grégorio Luperón|Gregorio no lleva tilde (llana terminada en vocal); Luperón sí (aguda terminada en n).
Avenida Enriquillo|Avenida Enriquiyo|Avenida Henriquillo|Avenida Enrriquillo|Enriquillo lleva ll, no lleva h y tiene una sola r (después de n, la r suena fuerte sin duplicarse).
Avenida San Martín|Avenida San Martin|Avenida Sam Martín|Avenida San Martím|Martín es aguda terminada en n: lleva tilde. Antes de M se escribe n en «San».
Avenida Isabel Aguiar|Avenida Isabel Agiar|Avenida Izabel Aguiar|Avenida Isabel Aguíar|Aguiar se escribe con gui y sin tilde; Isabel, con s.
Avenida Monumental|Avenida Monumentál|Avenida Monumetal|Avenida Munumental|Monumental es aguda terminada en l: no lleva tilde.
Avenida Venezuela|Avenida Venesuela|Avenida Benezuela|Avenida Venezuéla|Venezuela se escribe con v y z, y sin tilde.
Avenida México|Avenida Mexico|Avenida Méxíco|Avenida Mécsico|México es esdrújula: lleva tilde. Se escribe con x, que aquí suena como j.
Avenida Mella|Avenida Meya|Avenida Mela|Avenida Mellá|Mella (por Matías Ramón Mella) se escribe con ll y sin tilde.
Autopista Las Américas|Autopista Las Americas|Autopista Las Ámericas|Autopista Las Amérikas|Américas es esdrújula: lleva tilde en la e.
Avenida Hermanas Mirabal|Avenida Hermanas Miraval|Avenida Hermanas Mirabál|Avenida Hermanas Mirabar|Mirabal se escribe con b y termina en l (no en r); es aguda terminada en l, sin tilde.
Avenida Juan Pablo Duarte|Avenida Juan Pavlo Duarte|Avenida Juan Pablo Duartte|Avenida Jhuan Pablo Duarte|Pablo lleva bl; Duarte, una sola t; Juan no lleva h.
Calle Sánchez|Calle Sanchez|Calle Sánches|Calle Sanches|Sánchez es llana terminada en z: lleva tilde. Termina en z.
Avenida Benito Juárez|Avenida Benito Juarez|Avenida Benito Juáres|Avenida Benito Huárez|Juárez es llana terminada en z: lleva tilde. Se escribe con j.
Avenida Alma Máter|Avenida Alma Mater|Avenida Alma Matér|Avenida Alma Máther|Máter es llana terminada en r: lleva tilde.
Avenida José Contreras|Avenida Jose Contreras|Avenida José Contrera|Avenida José Contréras|José lleva tilde; Contreras termina en s y no lleva tilde (llana terminada en s).
Santo Domingo|Santo Domíngo|Santo Domingos|Santo Dumingo|Domingo es llana terminada en vocal: no lleva tilde.
Higüey|Higuey|Higüei|Igüey|Higüey lleva h inicial, diéresis para que suene la u y termina en y.
San Pedro de Macorís|San Pedro de Macoris|San Pedro de Macorí|San Pedro de Macoríz|Macorís es aguda terminada en s: lleva tilde.
Puerto Plata|Puerto Prata|Puerto Platta|Puertoplata|Puerto Plata se escribe en dos palabras, con pl y una sola t.
Samaná|Samana|Sámana|Zamaná|Samaná es aguda terminada en vocal: lleva tilde. Se escribe con s.
Barahona|Baraona|Barajona|Varahona|Barahona se escribe con b y con h intercalada.
La Romana|La Rromana|La Ramona|La Romána|Al inicio de palabra nunca se escribe rr. Romana no lleva tilde (llana terminada en vocal).
Bávaro|Bavaro|Bábaro|Bávaros|Bávaro es esdrújula: lleva tilde. Se escribe con b y luego v.
Boca Chica|Boca Chíca|Voca Chica|Boca Shica|Boca Chica: boca con b y chica con ch, sin tilde.
Santiago de los Caballeros|Santiago de los Cavalleros|Santiago de los Caballero|Santiago de los Cabayeros|Caballeros se escribe con b y ll, y en plural.
Avenida Charles Sumner|Avenida Charles Summer|Avenida Charle Sumner|Avenida Charles Sunmer|Sumner (senador estadounidense) se escribe con mn: Sum-ner. No es «Summer» (verano, en inglés).
Avenida Sabana Larga|Avenida Sábana Larga|Avenida Savana Larga|Avenida Sabana Larja|Sabana (llanura) es llana terminada en vocal: no lleva tilde. No confundir con sábana (ropa de cama). Se escribe con b.
Calle El Conde|Calle El Comde|Calle El Conte|Calle El Condé|Conde se escribe con n antes de d y sin tilde (llana terminada en vocal).
Calle Arzobispo Meriño|Calle Arsobispo Meriño|Calle Arzobispo Merino|Calle Arzovispo Meriño|Arzobispo se escribe con z y con b; Meriño lleva ñ.
Calle Arzobispo Nouel|Calle Arzobispo Noel|Calle Arzobispo Nuel|Calle Arsobispo Nouel|El apellido Nouel conserva su grafía con «ou»; arzobispo, con z.
Calle Padre Billini|Calle Padre Bilini|Calle Padre Villini|Calle Padre Billiní|Billini se escribe con b y doble l, y no lleva tilde.
Calle Isabel la Católica|Calle Isabel la Catolica|Calle Izabel la Católica|Calle Isabel la Catolíca|Católica es esdrújula: lleva tilde en la o. Isabel se escribe con s.
Calle Hostos|Calle Ostos|Calle Hóstos|Calle Hostoz|Hostos (por Eugenio María de Hostos) lleva h inicial, termina en s y no lleva tilde.
Calle Santomé|Calle Santome|Calle Zantomé|Calle Santomés|Santomé es aguda terminada en vocal: lleva tilde.
Calle Palo Hincado|Calle Palo Incado|Calle Palo Hincádo|Calle Palo Hinkado|Hincado (de hincar, clavar) lleva h inicial y se escribe con c.
Calle Max Henríquez Ureña|Calle Max Enríquez Ureña|Calle Max Henriquez Ureña|Calle Max Henríques Ureña|Henríquez lleva h inicial, tilde y termina en z; Ureña lleva ñ.
Calle Fantino Falco|Calle Fantino Falcó|Calle Fantíno Falco|Calle Fantino Falko|Fantino y Falco son llanas terminadas en vocal: no llevan tilde. Falco se escribe con c.
Calle Rafael Augusto Sánchez|Calle Rafael Agusto Sánchez|Calle Rafael Augusto Sanchez|Calle Rafaél Augusto Sánchez|Augusto lleva au; Sánchez lleva tilde; Rafael es aguda terminada en l: sin tilde.
Autopista Joaquín Balaguer|Autopista Joaquin Balaguer|Autopista Joaquín Balaguér|Autopista Juaquín Balaguer|Joaquín es aguda terminada en n: lleva tilde. Balaguer es aguda terminada en r: no lleva tilde.
Puente Juan Bosch|Puente Juan Bosh|Puente Juan Boch|Puente Juan Bosc|El apellido Bosch termina en «sch».
Puente Francisco J. Peynado|Puente Francisco J. Peinado|Puente Fransisco J. Peynado|Puente Francisco J. Peynádo|El apellido Peynado se escribe con y; Francisco, con c.
Avenida Salvador Estrella Sadhalá|Avenida Salvador Estrella Sadalá|Avenida Salvador Estrella Sadhala|Avenida Salvador Estreya Sadhalá|Sadhalá lleva h después de la d y tilde en la última a (aguda terminada en vocal). Estrella se escribe con ll.
Avenida Bartolomé Colón|Avenida Bartolome Colón|Avenida Bartolomé Colon|Avenida Vartolomé Colón|Bartolomé (aguda terminada en vocal) y Colón (aguda terminada en n) llevan tilde.
Avenida Ulises Francisco Espaillat|Avenida Ulises Francisco Espaillad|Avenida Ulises Francisco Espayat|Avenida Ulices Francisco Espaillat|Espaillat se escribe con ll y termina en t; Ulises, con s.
Avenida Nicolás de Ovando|Avenida Nicolas de Ovando|Avenida Nicolás de Obando|Avenida Nicólas de Ovando|Nicolás es aguda terminada en s: lleva tilde en la a. Ovando se escribe con v.
Avenida Francisco del Rosario Sánchez|Avenida Francisco del Rosario Sanchez|Avenida Francisco del Rozario Sánchez|Avenida Francisco del Rosario Sánches|Sánchez lleva tilde y termina en z; Rosario se escribe con s.
Avenida Pedro Livio Cedeño|Avenida Pedro Libio Cedeño|Avenida Pedro Livio Cedeno|Avenida Pedro Livio Sedeño|Livio se escribe con v; Cedeño, con c inicial y ñ.
Avenida Albert Thomas|Avenida Albert Tomas|Avenida Alber Thomas|Avenida Albert Thomás|Albert Thomas conserva su grafía original: Albert termina en t y Thomas lleva th, sin tilde.
Avenida Los Restauradores|Avenida Los Restauradorez|Avenida Los Restoradores|Avenida Los Restauradóres|Restauradores viene de restaurar: lleva au, termina en -es y no lleva tilde.
Avenida República de Colombia|Avenida Republica de Colombia|Avenida República de Colonbia|Avenida República de Columbia|República es esdrújula: lleva tilde. Colombia se escribe con o y con m antes de b (no «Columbia»).
Avenida Jiménez Moya|Avenida Jimenez Moya|Avenida Giménez Moya|Avenida Jiménes Moya|Jiménez se escribe con j, lleva tilde (llana terminada en z) y termina en z.
Avenida Paseo de los Locutores|Avenida Paseo de los Locutorez|Avenida Paceo de los Locutores|Avenida Paseo de los Locutóres|Paseo se escribe con s; locutores es llana terminada en s: no lleva tilde.
Avenida Cayetano Germosén|Avenida Cayetano Germosen|Avenida Cayetano Jermosén|Avenida Calletano Germosén|Germosén se escribe con g y lleva tilde (aguda terminada en n); Cayetano, con y.
Autopista 6 de Noviembre|Autopista 6 de Nobiembre|Autopista 6 de Novienbre|Autopista 6 de Nobienbre|Noviembre se escribe con v y con m antes de b.
Autovía del Este|Autovia del Este|Autobía del Este|Autovía del Éste|Autovía lleva tilde por hiato (au-to-ví-a) y se escribe con v; «este» (punto cardinal) no lleva tilde.
Piantini|Piantiní|Piantinni|Piantiny|Piantini es llana terminada en vocal: no lleva tilde. Termina en i latina y lleva una sola n.
Arroyo Hondo|Arrollo Hondo|Arroyo Ondo|Aroyo Hondo|Arroyo se escribe con rr y con y; Hondo (profundo) lleva h.
Los Cacicazgos|Los Casicazgos|Los Cacicasgos|Los Cacicazgo|Cacicazgo viene de cacique: se escribe con c en las dos primeras sílabas y con z antes de la g.
Bella Vista|Beya Vista|Vella Vista|Bella Bista|Bella se escribe con b y ll; Vista, con v.
Ensanche Quisqueya|Ensanche Kiskeya|Ensanche Quisquella|Enzanche Quisqueya|Quisqueya se escribe con qu en las dos sílabas y con y; ensanche, con s.
Villa Mella|Villa Meya|Billa Mella|Villa Mela|Villa se escribe con v y ll; Mella, con ll.
Los Alcarrizos|Los Alcarrisos|Los Alcarizos|Los Alcarrizo|Alcarrizos lleva rr y z, y va en plural.
Bajos de Haina|Bajos de Aina|Bajos de Jaina|Vajos de Haina|Haina se escribe con h inicial; Bajos, con b y j.
San Cristóbal|San Cristobal|San Cristóval|Sam Cristóbal|Cristóbal es llana terminada en l: lleva tilde. Se escribe con b.
Baní|Bani|Vaní|Banní|Baní es aguda terminada en vocal: lleva tilde. Se escribe con b.
Jarabacoa|Jaravacoa|Harabacoa|Jarabacóa|Jarabacoa se escribe con j y con b, y no lleva tilde.
Constanza|Constansa|Costanza|Constánza|Constanza lleva n antes de la s y termina en -anza, con z.
Cotuí|Cotui|Cotuy|Kotuí|Cotuí es aguda terminada en vocal: lleva tilde en la í.
San Francisco de Macorís|San Francisco de Macoris|San Fransisco de Macorís|San Francisco de Macoríz|Macorís es aguda terminada en s: lleva tilde. Francisco se escribe con c.
Dajabón|Dajabon|Dajavón|Dagabón|Dajabón es aguda terminada en n: lleva tilde. Se escribe con j y con b.
Hato Mayor|Ato Mayor|Hato Mallor|Hato Mayór|Hato lleva h; Mayor se escribe con y y sin tilde (aguda terminada en r).
Jimaní|Jimani|Gimaní|Jimaný|Jimaní es aguda terminada en vocal: lleva tilde. Se escribe con j.
Sosúa|Sosua|Sozúa|Sosuá|Sosúa lleva tilde en la ú por hiato (so-sú-a). Se escribe con s.
Las Terrenas|Las Terenas|Las Terrénas|Las Terrenaz|Terrenas se escribe con rr y sin tilde (llana terminada en s).
San Juan de la Maguana|San Juan de la Magüana|San Juan de la Maguána|San Juan de la Mahuana|Maguana se escribe con gu: ante a, la u suena sin necesidad de diéresis. No lleva tilde.
Monseñor Nouel|Monseñor Noel|Monsenor Nouel|Monseñor Nuel|Monseñor lleva ñ; Nouel conserva su grafía con «ou».
Elías Piña|Elias Piña|Elías Pina|Elíaz Piña|Elías lleva tilde por hiato (e-lí-as); Piña lleva ñ.
Villa Altagracia|Villa Altagrasia|Villa Alta Gracia|Billa Altagracia|Altagracia se escribe en una sola palabra y con c.
`;

/* Convierte los datos en una lista de preguntas */
function construirBancoOrto() {
  var banco = [];
  CATEGORIAS_ORTO.forEach(function (cat) {
    var texto = DATOS_ORTO[cat.id] || "";
    var n = 0;
    texto.split("\n").forEach(function (linea) {
      linea = linea.trim();
      if (!linea) return;
      var f = linea.split("|").map(function (s) { return s.trim(); });
      var p;
      if (f[0].indexOf("___") >= 0) {
        p = { tipo: "contexto", oracion: f[0], correcta: f[1], incorrectas: [f[2], f[3], f[4]], explicacion: f[5] || "" };
      } else {
        p = { tipo: "palabra", oracion: "", correcta: f[0], incorrectas: [f[1], f[2], f[3]], explicacion: f[4] || "" };
      }
      n++;
      p.id = cat.id + "-" + n;
      p.cat = cat.id;
      p.catNombre = cat.nombre;
      p.campos = f.length;
      banco.push(p);
    });
  });
  return banco;
}
