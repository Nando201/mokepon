let ataquesJugador = [] //Secuencia de ataques del jugador
let ataquesEnemigo = [] //Secuencia de ataques aleatorios del enemigo a la par del jugador
let vidasJugador = 3
let vidasEnemigo = 3
let opcionesDeMokepon
let inputHipodoge 
let inputRatigueya 
let inputCapipepo 
let inputLangostelvis
let inputTucapalma
let inputPydos
let opcionesDeAtaque
let mascotaElegida // Mascota que escogio el jugador
let botonFuego 
let botonAgua 
let botonTierra 
let botonesAtaques = []
let ataquesMokeponEnemigo = [] //Ataques de la mascota que escogio el enemigo
// let resultados = [] Solucion de conteo de ataques alternativo
let indexAtaquesJugador
let indexAtaquesEnemigo
let numeroVictoriasJugador = 0
let numeroVictoriasEnemigo = 0
let empates = 0


const botonMascotaJugador = document.getElementById('boton-mascota')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')

const spanMascotaJugador = document.getElementById('mascota-jugador')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')


const resultadoCombate = document.getElementById('resultado-de-combate')
const ataquesDelJugador = document.getElementById('ataques-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-enemigo')

const botonReiniciar = document.getElementById('boton-reiniciar') 
const resultadoFinal = document.getElementById('resultado-de-combate')
const contenedorMokepones = document.getElementById('contenedor-mokepones')
const contenedorAtaques = document.getElementById('contenedor-ataques')
const mokepones = []

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
let lienzo = mapa.getContext('2d')
document.addEventListener('keydown', moverMokepon)


class Mokepon {
  constructor(nombre, foto){
    this.nombre = nombre
    this.foto = foto
    this.ataques = []
    this.x = 0
    this.y = 0
    this.width = 80
    this.height = 80
    this.imagen = new Image()
    this.imagen.src = foto
  }
}

let hipodoge = new Mokepon('Hipodoge','./assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', 'assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', 'assets/ratigueya.png')
let langostelvis = new Mokepon('Langostelvis', 'assets/langostelvis.png')
let tucapalma = new Mokepon('Tucapalma', 'assets/tucapalma.png')
let pydos = new Mokepon('Pydos', 'assets/pydos.png')


//Mascotas tipo fuego: Ratigueya,Tucapalma
//Mascotas tipo agua: Hipodoge,Langostelvis
//Mascotas tipo tierra: Capipepo, Pydos

hipodoge.ataques.push(
  {nombre: '💧', id: 'boton-agua'},   //0
  {nombre: '💧', id: 'boton-agua'},   //1
  {nombre: '💧', id: 'boton-agua'},   //2
  {nombre: '🔥', id: 'boton-fuego'},  //3
  {nombre: '🌱', id: 'boton-tierra'}, //4
)

capipepo.ataques.push(
  {nombre: '🌱', id: 'boton-tierra'},   //0
  {nombre: '🌱', id: 'boton-tierra'},   //1
  {nombre: '🌱', id: 'boton-tierra'},   //2
  {nombre: '💧', id: 'boton-agua'},  //3
  {nombre: '🔥', id: 'boton-fuego'}, //4
)

ratigueya.ataques.push(
  {nombre: '🔥', id: 'boton-fuego'},   //0
  {nombre: '🔥', id: 'boton-fuego'},   //1
  {nombre: '🔥', id: 'boton-fuego'},   //2
  {nombre: '💧', id: 'boton-agua'},  //3
  {nombre: '🌱', id: 'boton-tierra'}, //4
)

langostelvis.ataques.push(
  {nombre: '💧', id: 'boton-agua'},   //0
  {nombre: '💧', id: 'boton-agua'},   //1
  {nombre: '💧', id: 'boton-agua'},   //2
  {nombre: '💧', id: 'boton-agua'},  //3
  {nombre: '🌱', id: 'boton-tierra'} //4
)

tucapalma.ataques.push(
  {nombre: '🔥', id: 'boton-fuego'},   //0
  {nombre: '🔥', id: 'boton-fuego'},   //1
  {nombre: '🔥', id: 'boton-fuego'},   //2
  {nombre: '🔥', id: 'boton-fuego'},  //3
  {nombre: '🌱', id: 'boton-tierra'} //4
)

pydos.ataques.push(
  {nombre: '🌱', id: 'boton-tierra'},   //0
  {nombre: '🌱', id: 'boton-tierra'},   //1
  {nombre: '🌱', id: 'boton-tierra'},   //2
  {nombre: '🌱', id: 'boton-tierra'},  //3
  {nombre: '💧', id: 'boton-agua'} //4
)



mokepones.push(hipodoge,capipepo,ratigueya,langostelvis,tucapalma,pydos)


function iniciarJuego(){
  botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
  
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
    contenedorMokepones.innerHTML += opcionesDeMokepon
  })
  
  sectionSeleccionarAtaque.style.display = 'none'
  sectionReiniciar.style.display = 'none'
}

function seleccionarMascotaJugador(){

  sectionSeleccionarMascota.style.display = 'none'
  sectionVerMapa.style.display = 'flex'
  //sectionSeleccionarAtaque.style.display = 'flex'

  inputHipodoge = document.getElementById('Hipodoge')
  inputCapipepo = document.getElementById('Capipepo')
  inputRatigueya = document.getElementById('Ratigueya')
  inputLangostelvis = document.getElementById('Langostelvis')
  inputTucapalma = document.getElementById('Tucapalma')
  inputPydos = document.getElementById('Pydos')
  
  if(inputHipodoge.checked){
    spanMascotaJugador.innerHTML = inputHipodoge.id
    mascotaElegida = inputHipodoge.id
  }else if(inputCapipepo.checked){
    spanMascotaJugador.innerHTML = inputCapipepo.id
    mascotaElegida = inputCapipepo.id
  }else if(inputRatigueya.checked){
    spanMascotaJugador.innerHTML = inputRatigueya.id
    mascotaElegida = inputRatigueya.id
  }else if(inputLangostelvis.checked){
    spanMascotaJugador.innerHTML = inputLangostelvis.id
    mascotaElegida = inputLangostelvis.id
  }else if(inputTucapalma.checked){
    spanMascotaJugador.innerHTML = inputTucapalma.id
    mascotaElegida = inputTucapalma.id
  }else if(inputPydos.checked){
    spanMascotaJugador.innerHTML = inputPydos.id
    mascotaElegida = inputPydos.id
  }else {
    alert('Escoge una mascota')
  }
  extraerAtaquesMascota(mascotaElegida)
  seleccionarMascotaEnemigo()
}
//mascotaElegida = 'Capipepo'

function extraerAtaquesMascota(mascotaElegida){
  let ataques //Ataques de la mascota elegida por el jugador

  for(let i = 0; i < mokepones.length; i++){
    if(mascotaElegida === mokepones[i].nombre){
      ataques = mokepones[i].ataques
    }
  }
  
  mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){

  ataques.forEach((ataque) => {
    opcionesDeAtaque = `
      <button class="boton-de-ataque Bataque" id="${ataque.id}">${ataque.nombre}</button>
    `
    contenedorAtaques.innerHTML += opcionesDeAtaque
  })
  botonesAtaques = document.querySelectorAll('.Bataque')
}

function secuenciadeAtaque(){
  botonesAtaques.forEach((botonAtaque) => {
    botonAtaque.addEventListener('click', (e) => {
      //Crear secuencia de ataques
      if(e.target.innerText == '🔥'){
        ataquesJugador.push('FUEGO')
        botonAtaque.style.background = '#1D5B79'
        botonAtaque.disabled = true
      }else if(e.target.innerText == '💧'){
        ataquesJugador.push('AGUA')
        botonAtaque.style.background = '#1D5B79'
        botonAtaque.disabled = true
      }else{
        ataquesJugador.push('TIERRA')
        botonAtaque.style.background = '#1D5B79'
        botonAtaque.disabled = true
      }
      console.log(ataquesJugador)
      seleccionaAtaqueEnemigo()
    })
  })
}


function seleccionarMascotaEnemigo(){
  let mascotaAleatorio = aleatorio(0, mokepones.length - 1)
  spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
  ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques //Ataques de la mascota elegida de forma aleatoria
  secuenciadeAtaque()
}


function seleccionaAtaqueEnemigo(){
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1) 

  if(ataquesMokeponEnemigo[ataqueAleatorio].nombre == '🔥'){
      ataquesEnemigo.push('FUEGO')
  }else if(ataquesMokeponEnemigo[ataqueAleatorio].nombre == '💧'){
      ataquesEnemigo.push('AGUA')
  }else{
      ataquesEnemigo.push('TIERRA')
  }
  console.log(ataquesEnemigo)
  inicializaCombate()
}

function inicializaCombate(){
  if(ataquesJugador.length == 5){
    combate()
  }
}

function indexAmbosAtaques(index){
  indexAtaquesJugador = ataquesJugador[index]
  indexAtaquesEnemigo = ataquesEnemigo[index]
}

function combate(){ 

  for(let i = 0; i < ataquesJugador.length; i++){
    if(ataquesJugador[i] == ataquesEnemigo[i]){
      indexAmbosAtaques(i)
      mostrarMensajeDeAtaques()
      //resultados.push('EMPATE')
    }else if(ataquesJugador[i]== 'AGUA' && ataquesEnemigo[i] == 'FUEGO'){
      //resultados.push('GANASTE')
      indexAmbosAtaques(i)
      mostrarMensajeDeAtaques()
      numeroVictoriasJugador++
    }else if(ataquesJugador[i] == 'FUEGO' && ataquesEnemigo[i] == 'TIERRA'){
      //resultados.push('GANASTE')
      indexAmbosAtaques(i)
      mostrarMensajeDeAtaques()
      numeroVictoriasJugador++
    }else if(ataquesJugador[i] == 'TIERRA' && ataquesEnemigo[i] == 'AGUA'){
      //resultados.push('GANASTE')
      indexAmbosAtaques(i)
      mostrarMensajeDeAtaques()
      numeroVictoriasJugador++
    }else{
      //resultados.push('PERDISTE')
      indexAmbosAtaques(i)
      mostrarMensajeDeAtaques()
      numeroVictoriasEnemigo++
    }
  }
  
  spanVidasJugador.innerHTML = numeroVictoriasJugador
  spanVidasEnemigo.innerHTML = numeroVictoriasEnemigo
  revisarVictorias() //Antes -> revisarVidas()
}

function mostrarMensajeDeAtaques(){

  let nuevoAtaqueJugador = document.createElement('p')
  let nuevoAtaqueEnemigo = document.createElement('p')
  nuevoAtaqueJugador.innerHTML = indexAtaquesJugador
  nuevoAtaqueEnemigo.innerHTML = indexAtaquesEnemigo
  ataquesDelJugador.appendChild(nuevoAtaqueJugador)
  ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo)

}

function revisarVictorias(){
 


/*  Solucion alternativa
  resultados.forEach((resultado) => {
    if(resultado == 'EMPATE'){
      empates++
    }else if(resultado == 'GANASTE'){
      victoriasJugador++
    }else if(resultado == 'PERDISTE'){
      victoriasEnemigo++
    }
  }) */

  if(numeroVictoriasJugador == numeroVictoriasEnemigo){
    crearMensajeFinal('EMPATARON')
  }else if(numeroVictoriasJugador > numeroVictoriasEnemigo){
    crearMensajeFinal('FELICIDADES , GANASTE!')
  }else if(numeroVictoriasEnemigo > numeroVictoriasJugador){
    crearMensajeFinal('LO SENTIMOS! , PERDISTE')
  } 
}

function crearMensajeFinal(endResult){
  resultadoFinal.innerHTML = endResult
  sectionReiniciar.style.display = 'block'
  botonReiniciar.addEventListener('click', reiniciarJuego)
}

function reiniciarJuego(){
  location.reload()
}


function aleatorio(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function dibujaMokepon(){
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
  lienzo.drawImage(hipodoge.imagen,hipodoge.x,hipodoge.y,hipodoge.width,hipodoge.height)
}

function moverMokepon(e){
  console.log(e)
}



window.addEventListener('load', iniciarJuego)