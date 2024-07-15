const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

const app = express();

const jugadores = [];

class Jugador {
  constructor(id) {
    this.id = id;
  }
  asignarMokepon(mokepon) {
    this.mokepon = mokepon;
  }
  establecerCoordenadas(x,y) {
    this.posicionX = x;
    this.posicionY = y;
  }

  asignarAtaques(ataques){
    this.ataques = ataques;
  }
}

class Mokepon {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

app.use(express.static('public'))
app.use(cors());
app.use(morgan("dev")); //Registrador de solicitudes HTTP
app.use(express.json());

/* app.use((req,res, next) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type')
    next()
}) */

//Asignarle un id al jugador al momento de ingresar al juego
app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);
  console.log(jugadores);
  console.log("Nº jugadores:", jugadores.length);
  res.send(id);
});


//Recibir la mascota del jugador atraves su id, y la mascota que habia seleccionado
app.post("/mokepon/:idJugador", (req, res) => {
    const idJugador = req.params.idJugador || "";
    const nombreMokepon = req.body.mokepon || "";
    console.log("ID recibido:", idJugador);

    //Validaciones para saber si se recibio un id un mokepon
    if (!idJugador) {
        console.log("No existe un ID");
        return res.status(400).json({ error: "No existe un ID" });
    }
    if (!nombreMokepon) {
        console.log("No hay un nombre de Mokepon");
        return res.status(400).json({ error: "No hay un nombre de Mokepon" });
    }

    if(jugadores.length == 0){
        console.log("No hay elementos en el array");
        return res.status(400).json({ error: "No hay elementos en el array" });
    }

    const mokepon = new Mokepon(nombreMokepon);
    //Verificar que exista un jugador y asignarle su mascota
    const jugadorIndex = jugadores.findIndex((jugador) => idJugador === jugador.id);
    if (jugadorIndex >= 0) { //Si existe
        jugadores[jugadorIndex].asignarMokepon(mokepon);
        res.json("Mokepon añadido correctamente");
    }
 
});

//Recibir coordenadas
app.post('/mokepon/coordenadas/:idJugador', (req, res) => {
  const idJugador = req.params.idJugador || "";
  const {x, y} = req.body  
  if (!idJugador) {
    console.log("No existe un ID");
    return res.status(400).json({ error: "No existe un ID" });
  }
  const jugadorIndex = jugadores.findIndex((jugador) => idJugador === jugador.id);
  if (jugadorIndex >= 0) { //Si existe
    jugadores[jugadorIndex].establecerCoordenadas(x,y);
  }

  //Obtener coordenadas de todos los jugadores
  const enemigos = jugadores.filter((jugador) => idJugador !== jugador.id)
  res.json({enemigos})
})

//Enviar secuencia de ataques 
app.post('/mokepon/ataques/:idJugador',(req,res) =>{
  const idJugador = req.params.idJugador || ""; 
  const {ataquesJugador} = req.body
  if (!idJugador) {
    console.log("No existe un ID");
    return res.status(400).json({ error: "No existe un ID" });
  }
  console.log(ataquesJugador)
  const jugadorIndex = jugadores.findIndex((jugador) => idJugador === jugador.id);
  if (jugadorIndex >= 0) { //Si existe
    jugadores[jugadorIndex].asignarAtaques(ataquesJugador);
  }
  res.end()
})

//Solicitando los ataques del enemigo
app.get('/mokepon/ataquesEnemigo/:idEnemigo', (req,res) =>{
  const {idEnemigo} = req.params || ""; 
  if (!idEnemigo) {
    console.log("No existe un ID");
    return res.status(400).json({ error: "No existe un ID" });
  }
  console.log("Este es el id del enemigo con sus ataques: " + idEnemigo)
  const jugador = jugadores.find((jugador) => jugador.id === idEnemigo)
  console.log(jugador)
  res.send({
    ataques: jugador.ataques || []
   })
})

app.listen(PORT, () => {
  console.log("Servidor funcionando");
});


