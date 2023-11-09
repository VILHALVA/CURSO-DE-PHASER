class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena
    }
 
    preload () {
        this.load.image("Fondo",".//assets/Background.png"); // decimos donde esta la imagen a phaser
        this.load.spritesheet("jugador","assets/jugador.png",{ frameWidth: 48.4,frameHeight: 50});// spritesheet personaje
    }

    create () {

        var fondo = this.add.image(930,530,"Fondo"); // agregamos el fondo a la escena
        fondo.setScale(3.5);//escalamos el fondo
        var personaje = this.physics.add.sprite(500,500,"jugador");  // agregamos el personaje
        personaje.setScale(4); // agrandamos el personaje
        personaje.setCollideWorldBounds(true); // le decimos que no se salga de la pantalla
        personaje.setSize(10,35);// escalamos el body
        personaje.setOffset(10,14); // acomodamos el body

        

    }

   

}