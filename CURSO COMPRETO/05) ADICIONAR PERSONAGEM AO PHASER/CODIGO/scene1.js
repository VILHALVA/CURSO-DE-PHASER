class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena
    }
 
    preload () {
        this.load.image("Fondo",".//assets/Background.png"); // decimos donde esta la imagen a phaser
        this.load.spritesheet("jugador",".//assets/jugador.png",{ frameWidth: 48.4,frameHeight: 50});
    }

    create () {

        var fondo = this.add.image(930,530,"Fondo"); // agregamos el fondo a la escena
        fondo.setScale(3.5);//escalamos el fondo 
        var jugador= this.physics.add.sprite(500,500,"jugador"); //agregamos el jugador a la escena
        jugador.setScale(4);// escalamos el jugador
        jugador.setCollideWorldBounds(true);// hacemos que colisione con el borde del mundo


    }

    update () {

    }

}