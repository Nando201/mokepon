class Mokepon{
    constructor(nombre, foto, imagen, id = null) {
      this.nombre = nombre
      this.foto = foto
      this.ataques = []
      this.id = id
      this.width = 40
      this.height = 40
      this.posX = aleatorio(0, mapa.width - this.width)
      this.posY = aleatorio(0, mapa.height - this.height)
      this.imagen = new Image()
      this.imagen.src = imagen
      this.velocidadX = 0
      this.velocidadY = 0
    }
  
    pintarMokepon(){
      lienzo.drawImage(
        this.imagen,
        this.posX,
        this.posY,
        this.width,
        this.height
      )
    }
}