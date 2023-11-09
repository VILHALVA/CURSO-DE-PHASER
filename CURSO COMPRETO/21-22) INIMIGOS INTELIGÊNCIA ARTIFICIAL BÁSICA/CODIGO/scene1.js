class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena-
    }
 
    preload ()  {
        this.load.image("fondo","assets/Background.png");
        this.load.spritesheet("jugador","assets/jugador.png",{frameWidth:48.4,frameHeigth:50});
             

    }
    create () {
      

        var fondo=this.add.image(500,500,"fondo");
        fondo.setScale(6);

      ////////////////

        jugador=this.physics.add.sprite(500,500,"jugador");
        jugador.setScale(3)

 

        ///CAMARA//
        this.cameras.main.startFollow(jugador); /// camara sigue al jugador
        
      //// teclas ///
        if (cursors =! undefined){
                  
            cursors = this.input.keyboard.createCursorKeys();
        }
  ///////////

 
        
    }
    update () {

     
        if (cursors.up.isDown ) {
            jugador.setVelocityY(-200);
        }
        else if (cursors.down.isDown ) {
            jugador.setVelocityY(200);
        }
        else if (cursors.left.isDown ) {
            jugador.setVelocityX(-200);
        }
        else if (cursors.right.isDown ) {
            jugador.setVelocityX(200);
        }
        else {
            jugador.setVelocity(0);
        }



    
    }
   
 

}