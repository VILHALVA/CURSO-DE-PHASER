class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena
    }
 
    preload ()  {

        this.load.image("fondo","assets/Background.png");
        this.load.spritesheet("jugador","assets/jugador.png",{frameWidth:48.4,frameHeigth:50});
        this.load.image("botonFullScreen","assets/pantalla.png");
    }
    create () {

       var fondo=this.add.image(500,500,"fondo");
       fondo.setScale(6);
      
       jugador=this.physics.add.sprite(500,500,"jugador").setScale(2.5);


       let botonFull=this.add.image(1700,100,"botonFullScreen");// agregamos una imagen
// decirle a la imagen boton que sea interactiva osea clickeable 
//que compruebe si se hace click en el boton pone el juego en pantalla completa
       botonFull.setInteractive().on("pointerdown",function() {
        if(this.scene.scale.isFullscreen==false) {
            this.scene.scale.startFullscreen();
        }
        else {
            this.scene.scale.stopFullscreen();
        }
        
       })
 
    }
    update () {

       
    
    }

 

}