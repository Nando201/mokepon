//Ataques de jugador y enemigo para el combate
let ataquesJugador = [] //Secuencia de ataques del jugador
let ataquesEnemigo = [] //Secuencia de ataques aleatorios del enemigo a la par del jugador


let idEnemigo = null
let idJugador = null
let opcionesDeMokepon
let inputHipodoge
let inputRatigueya
let inputCapipepo
let opcionesDeAtaque
let mascotaElegida // Mascota que escogio el jugador
let botonFuego
let botonAgua
let botonTierra
let botonesAtaques = []
let ataquesMokeponEnemigo = [] //Ataques de la mascota que escogio el enemigo
let indexAtaquesJugador
let indexAtaquesEnemigo
let numeroVictoriasJugador = 0
let numeroVictoriasEnemigo = 0
let mascotaJugadorObjeto
let mascotaEnemigoObjeto
let mokeponEnemigo = null
let mokeponEnemigoNombre = null
let competidores = [] //Lista de ompetidores devueltos por el backend
let listaMokeponesEnemigo = []
let enemigosConAtaques = null

const botonMascotaJugador = document.getElementById("boton-mascota")
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")

const spanMascotaJugador = document.getElementById("mascota-jugador")

const sectionSeleccionarMascota = document.getElementById(
  "seleccionar-mascota"
)
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const resultadoCombate = document.getElementById("resultado-de-combate")
const containerAtaquesDelJugador = document.getElementById("ataques-jugador")
const containerAtaquesDelEnemigo = document.getElementById("ataques-enemigo")

const botonReiniciar = document.getElementById("boton-reiniciar")
const resultadoFinal = document.getElementById("resultado-de-combate")
const contenedorMokepones = document.getElementById("contenedor-mokepones")
const contenedorAtaques = document.getElementById("contenedor-ataques")
const mokepones = []

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = '../assets/mapa.png'

let anchoMapa = window.innerWidth - 20 
let alturaQueBuscamos = anchoMapa*600/800
const anchoMaximoMapa = 350

if(anchoMapa > anchoMaximoMapa){
  anchoMapa = anchoMaximoMapa
  alturaQueBuscamos = anchoMaximoMapa*600/800
}

mapa.width = anchoMapa
mapa.height = alturaQueBuscamos

//Variables para la colision - jugador
let arribaJugador
let abajoJugador
let izquierdaJugador
let derechaJugador

//Variables para la colision - jugador
let arribaEnemigo
let abajoEnemigo
let izquierdaEnemigo
let derechaEnemigo

//Jugador
let hipodoge = new Mokepon("Hipodoge", "./assets/hipodoge.png", '../assets/imghipodoge.png')
let capipepo = new Mokepon("Capipepo", "assets/capipepo.png", '../assets/imgcapipepo.png')
let ratigueya = new Mokepon("Ratigueya", "assets/ratigueya.png", '../assets/imgratigueya.png')

let hipodogeEnemigo
let capipepoEnemigo
let ratigueyaEnemigo

const HIPODOGE_ATAQUES = [
  { nombre: "💧"}, //0
  { nombre: "💧"}, //1
  { nombre: "💧"}, //2
  { nombre: "🔥"}, //3
  { nombre: "🌱"} //4
]

const CAPIPEPO_ATAQUES = [
  { nombre: "🌱"}, //0
  { nombre: "🌱"}, //1
  { nombre: "🌱"}, //2
  { nombre: "💧"}, //3
  { nombre: "🔥"} //4
]

const RATIGUEYA_ATAQUES = [
  { nombre: "🔥"}, //0
  { nombre: "🔥"}, //1
  { nombre: "🔥"}, //2
  { nombre: "💧"}, //3
  { nombre: "🌱"} //4
]


//Ataques mascotas Jugadores
hipodoge.ataques.push(...HIPODOGE_ATAQUES);
capipepo.ataques.push(...CAPIPEPO_ATAQUES);
ratigueya.ataques.push(...RATIGUEYA_ATAQUES); 


mokepones.push(hipodoge, capipepo, ratigueya)
iniciarJuego()

function iniciarJuego() {
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  mokepones.forEach((mokepon) => {
    opcionesDeMokepon = `
      <input type="radio" name="mascota" id=${mokepon.nombre} />
      <label class="tarjeta-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <div class="image-container">
          <img src= ${mokepon.foto} alt=${mokepon.nombre}>
        </div>
      </label>
    `
    contenedorMokepones.innerHTML += opcionesDeMokepon;
  })

  sectionSeleccionarAtaque.style.display = "none"
  sectionReiniciar.style.display = "none"
  sectionVerMapa.style.display = "none"
  unirseAlJuego()
}

function unirseAlJuego(){
  //Hacer la peticion y que nos devuelva algo toma un tiempo indeterminado
  const promise = fetch('http://192.168.0.19:8080/unirse')
  promise.then((response) => {
    if(!response.ok){
      throw new Error('Ups algo salio mal con la conexion') 
    }
    return response.text()
  })
  .then((data) => { 
    idJugador = data
    console.log(data) //Devuelve el ID del jugador
  })
  .catch( err => console.error(err))

}

function seleccionarMascotaJugador() {
  
  inputHipodoge = document.getElementById("Hipodoge")
  inputCapipepo = document.getElementById("Capipepo")
  inputRatigueya = document.getElementById("Ratigueya")

  if(inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id
    mascotaElegida = inputHipodoge.id
  }else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id
    mascotaElegida = inputCapipepo.id
  }else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id
    mascotaElegida = inputRatigueya.id
  }else{
    alert("Escoge una mascota");
    return;
  }
  sectionSeleccionarMascota.style.display = "none";
  seleccionarMokeponOnline(mascotaElegida)
  extraerAtaquesMascota(mascotaElegida)
  sectionVerMapa.style.display = "flex"
  iniciarMapa()
}

function seleccionarMokeponOnline(mascota){

  fetch(`http://192.168.0.19:8080/mokepon/${idJugador}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      'mokepon': mascota 
    }) //El cuerpo de la solicitud, debe ser una cadena de texto
  })
  .then(response => {
    if(!response.ok){
      throw new Error('Algo salio mal') 
    }
    return response.json()
  })
  .then(respuesta => {console.log(respuesta)})
  .catch(err => console.error(err))
}

function extraerAtaquesMascota(mascotaElegida) {
  let ataques = []; //Ataques de la mascota elegida por el jugador
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaElegida === mokepones[i].nombre) {
      ataques = mokepones[i].ataques
    }
  }
  mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    opcionesDeAtaque = `
      <button class="boton-de-ataque Bataque">${ataque.nombre}</button>
    `
    contenedorAtaques.innerHTML += opcionesDeAtaque;
  })
  botonesAtaques = document.querySelectorAll(".Bataque")
}

function secuenciadeAtaque(){
  botonesAtaques.forEach((botonAtaque) => {
    botonAtaque.addEventListener("click", (e) => {
      //Crear secuencia de ataques
      if (e.target.innerText == "🔥") {
        ataquesJugador.push("FUEGO")
        botonAtaque.style.background = "#1D5B79"
        botonAtaque.disabled = true
      }else if (e.target.innerText == "💧") {
        ataquesJugador.push("AGUA");
        botonAtaque.style.background = "#1D5B79"
        botonAtaque.disabled = true
      }else {
        ataquesJugador.push("TIERRA")
        botonAtaque.style.background = "#1D5B79"
        botonAtaque.disabled = true
      }
      //console.log("Longitud de array jugadores" + ataquesJugador.length)
      if(ataquesJugador.length === 5){
        enviarAtaques()
      }
    })
  })
}

function seleccionarMascotaEnemigo(mascotaEnemigo) {
  //let mascotaAleatorio = aleatorio(0, mokepones.length - 1)
  //spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
  spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre
  //ataquesMokeponEnemigo = mascotaEnemigo.ataques
  //ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques //Ataques de la mascota elegida de forma aleatoria
  secuenciadeAtaque()
  //seleccionAtaquesEnemigo(mascotaEnemigo) Ya no se llamaria desde aqui
}


async function obtenerAtaquesEnemigo() {
  try{
    let response = await fetch(`http://192.168.0.19:8080/mokepon/ataquesEnemigo/${idEnemigo}`)
    if(!response.ok){
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    let {ataques} = await response.json()
    ataquesEnemigo = ataques
    if(ataquesEnemigo.length === 5){
      console.log('Hora del combate')
      combate()
    }
  }catch(err){
    console.error(err)
  }
  //let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)
/*
  if (ataquesMokeponEnemigo[ataqueAleatorio].nombre == "🔥"){
    ataquesEnemigo.push("FUEGO")
  } else if (ataquesMokeponEnemigo[ataqueAleatorio].nombre == "💧") {
    ataquesEnemigo.push("AGUA")
  } else {
    ataquesEnemigo.push("TIERRA")
  }
  //console.log(ataquesEnemigo);
  inicializaCombate(); */
}

function inicializaCombate() {
  if (ataquesJugador.length == 5){
    //combate();
  }
}

async function enviarAtaques(){
  try{
    let response = await fetch(`http://192.168.0.19:8080/mokepon/ataques/${idJugador}`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ataquesJugador
      })
    })
    if(!response.ok){
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    intervalo = setInterval(obtenerAtaquesEnemigo, 50)
  }catch(err){
    console.error(err)
  }
}

function indexAmbosAtaques(index) {
  indexAtaquesJugador = ataquesJugador[index];
  indexAtaquesEnemigo = ataquesEnemigo[index];
}

function combate() {
  clearInterval(intervalo)
  for (let i = 0; i < ataquesJugador.length; i++) {
    if (ataquesJugador[i] == ataquesEnemigo[i]) {
      indexAmbosAtaques(i);
      mostrarMensajeDeAtaques();
    } else if (ataquesJugador[i] == "AGUA" && ataquesEnemigo[i] == "FUEGO") {
      indexAmbosAtaques(i);
      mostrarMensajeDeAtaques();
      numeroVictoriasJugador++;
    } else if (ataquesJugador[i] == "FUEGO" && ataquesEnemigo[i] == "TIERRA") {
      indexAmbosAtaques(i);
      mostrarMensajeDeAtaques();
      numeroVictoriasJugador++;
    } else if (ataquesJugador[i] == "TIERRA" && ataquesEnemigo[i] == "AGUA") {
      indexAmbosAtaques(i);
      mostrarMensajeDeAtaques();
      numeroVictoriasJugador++;
    } else {
      indexAmbosAtaques(i);
      mostrarMensajeDeAtaques();
      numeroVictoriasEnemigo++;
    }
  }

  spanVidasJugador.textContent = numeroVictoriasJugador;
  spanVidasEnemigo.textContent = numeroVictoriasEnemigo;
  revisarVictorias() //Antes -> revisarVidas()
}

function mostrarMensajeDeAtaques() {
  let nuevoAtaqueJugador = document.createElement("p");
  let nuevoAtaqueEnemigo = document.createElement("p");
  nuevoAtaqueJugador.innerHTML = indexAtaquesJugador;
  nuevoAtaqueEnemigo.innerHTML = indexAtaquesEnemigo;
  containerAtaquesDelJugador.appendChild(nuevoAtaqueJugador);
  containerAtaquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function revisarVictorias() {
  if (numeroVictoriasJugador == numeroVictoriasEnemigo) {
    crearMensajeFinal("EMPATARON");
  } else if (numeroVictoriasJugador > numeroVictoriasEnemigo) {
    crearMensajeFinal("FELICIDADES , GANASTE!");
  } else if (numeroVictoriasEnemigo > numeroVictoriasJugador) {
    crearMensajeFinal("LO SENTIMOS! , PERDISTE");
  }
}

function crearMensajeFinal(endResult) {
  resultadoFinal.innerHTML = endResult;
  sectionReiniciar.style.display = "block";
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas(){
  mascotaJugadorObjeto.posY += mascotaJugadorObjeto.velocidadY
  mascotaJugadorObjeto.posX += mascotaJugadorObjeto.velocidadX
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
  lienzo.drawImage(mapaBackground, 0,0, mapa.width, mapa.height)
  enviarCoordenadas(mascotaJugadorObjeto.posX, mascotaJugadorObjeto.posY)
  mascotaJugadorObjeto.pintarMokepon()
  pintarCompetidores()
  /*listaMokeponesEnemigo.forEach((enemigo) => {
      enemigo.pintarMokepon()
  })*/
  //Revisar colision, si la mascota se esta moviendo
  if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
    detenerEnBordesDeMapa()
    listaMokeponesEnemigo.forEach((competidor) => {
      determinarColision(competidor)
    })
  }
}

function pintarCompetidores(){
  //Validar que tengan un mokepon asignado
  let competidoresFiltrados = competidores.filter((competidor) => competidor.mokepon !== undefined)
  competidoresFiltrados.forEach((competidor) => {
      mokeponEnemigoNombre = competidor.mokepon.nombre || "asi no era"
      //Nombre del enemigo    
      if(mokeponEnemigoNombre === 'Hipodoge'){
          mokeponEnemigo = new Mokepon("Hipodoge", "./assets/hipodoge.png", '../assets/imghipodoge.png', competidor.id)
          mokeponEnemigo.ataques.push(...HIPODOGE_ATAQUES)
      }else if(mokeponEnemigoNombre === 'Capipepo'){
          mokeponEnemigo = new Mokepon("Capipepo", "assets/capipepo.png", '../assets/imgcapipepo.png', competidor.id)
          mokeponEnemigo.ataques.push(...CAPIPEPO_ATAQUES);
      }else if(mokeponEnemigoNombre === 'Ratigueya'){
          mokeponEnemigo = new Mokepon("Ratigueya", "assets/ratigueya.png", '../assets/imgratigueya.png', competidor.id)
          mokeponEnemigo.ataques.push(...RATIGUEYA_ATAQUES);
      }
      // Verificar si el mokepon ya existe en el array
      let mokeponExist = listaMokeponesEnemigo.some(competidor => competidor.nombre === mokeponEnemigoNombre);
      // Si no existe, añadir al array
      if (!mokeponExist) {
          listaMokeponesEnemigo.push(mokeponEnemigo);
      }
      const jugadorIndex = listaMokeponesEnemigo.findIndex((competidor) => competidor.nombre === mokeponEnemigoNombre)
      if(jugadorIndex >= 0){
        listaMokeponesEnemigo[jugadorIndex].posX = competidor.posicionX
        listaMokeponesEnemigo[jugadorIndex].posY = competidor.posicionY
      }
      listaMokeponesEnemigo[jugadorIndex].pintarMokepon()
    })
}

/*

function pintarCompetidoresCurso(){

  //Filtra todos los competidores que ya tengan un mokepon asignado
  let competidoresFiltrados = competidores.filter((competidor) => competidor.mokepon !== undefined)
  listaMokeponesEnemigo = competidoresFiltrados.map((competidor) => {
      mokeponEnemigoNombre = competidor.mokepon.nombre || ""
      //Nombre del enemigo
      if(mokeponEnemigoNombre === 'Hipodoge'){
          mokeponEnemigo = new Mokepon("Hipodoge", "./assets/hipodoge.png", '../assets/imghipodoge.png', competidor.id)
          mokeponEnemigo.ataques.push(...HIPODOGE_ATAQUES)
      }else if(mokeponEnemigoNombre === 'Capipepo'){
          mokeponEnemigo = new Mokepon("Capipepo", "assets/capipepo.png", '../assets/imgcapipepo.png', competidor.id)
          mokeponEnemigo.ataques.push(...CAPIPEPO_ATAQUES);
      }else if(mokeponEnemigoNombre === 'Ratigueya'){
          mokeponEnemigo = new Mokepon("Ratigueya", "assets/ratigueya.png", '../assets/imgratigueya.png', competidor.id)
          mokeponEnemigo.ataques.push(...RATIGUEYA_ATAQUES);
      }
      mokeponEnemigo.posX = competidor.posicionX
      mokeponEnemigo.posY = competidor.posicionY
      return mokeponEnemigo
  })
}
*/

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5
}

function detenerMovimiento(){
  mascotaJugadorObjeto.velocidadY = 0
  mascotaJugadorObjeto.velocidadX = 0
} 

function moverMokepon(e){
  switch (e.key){
    case 'ArrowUp':
      moverArriba()
    break
    case 'ArrowDown':
      moverAbajo()
    break
    case 'ArrowRight':
      moverDerecha()
    break
    case 'ArrowLeft':
      moverIzquierda()
    break
  }
}

function iniciarMapa(){
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaElegida) //Objeto completo
  intervalo = setInterval(pintarCanvas, 50)
  window.addEventListener('keydown', moverMokepon)
  window.addEventListener('keyup', detenerMovimiento)
}

async function enviarCoordenadas(x,y){
  try{
    let response = await fetch(`http://192.168.0.19:8080/mokepon/coordenadas/${idJugador}`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        x,
        y
      })
    })
    if(!response.ok){
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    let {enemigos} = await response.json() //Uso la destructuracion para traer solo el array de los enemigos
    competidores = enemigos
    //console.log(competidores)

  }catch(err){
    console.error(err)
  }
}

function obtenerObjetoMascota(mascotaElegida){
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaElegida === mokepones[i].nombre) {
        return mokepones[i]
    }
  }
}

function determinarColision(enemigo) {
    
  arribaJugador = mascotaJugadorObjeto.posY
  abajoJugador = mascotaJugadorObjeto.posY + mascotaJugadorObjeto.height
  izquierdaJugador = mascotaJugadorObjeto.posX
  derechaJugador = mascotaJugadorObjeto.posX + mascotaJugadorObjeto.width

  arribaEnemigo = enemigo.posY
  abajoEnemigo = enemigo.posY + enemigo.height
  izquierdaEnemigo = enemigo.posX 
  derechaEnemigo = enemigo.posX + enemigo.width

  //Determinar si no hay colision
  if((abajoEnemigo < arribaJugador) || 
    (arribaEnemigo > abajoJugador)  ||
    (derechaEnemigo < izquierdaJugador) || 
    (izquierdaEnemigo > derechaJugador)){
        return
    }
    console.log("Colision con: " + enemigo.nombre)
    idEnemigo = enemigo.id
    console.log(idEnemigo)
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

function detenerEnBordesDeMapa(){
  const arribaMapa = 0
  const abajoMapa = mapa.height
  const derechaMapa = mapa.width
  const izquierdaMapa = 0
  
  const arribaJugador = mascotaJugadorObjeto.posY
  const derechaJugador = mascotaJugadorObjeto.posX + mascotaJugadorObjeto.width
  const izquierdaJugador = mascotaJugadorObjeto.posX
  const abajoJugador = mascotaJugadorObjeto.posY + mascotaJugadorObjeto.height

  if (arribaJugador < arribaMapa) {
    mascotaJugadorObjeto.posY = arribaMapa
  }
  
  if (abajoJugador > abajoMapa) {
    mascotaJugadorObjeto.posY = abajoMapa - mascotaJugadorObjeto.height
  }
  
  if (derechaJugador > derechaMapa) {
    mascotaJugadorObjeto.posX = derechaMapa - mascotaJugadorObjeto.width
  }
  
  if (izquierdaJugador < izquierdaMapa) {
    mascotaJugadorObjeto.posX = izquierdaMapa
  }
}

//window.addEventListener("load", iniciarJuego);
