class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena-
    }
 
    preload ()  {
        this.load.image("fondo","assets/Background.png");
        this.load.spritesheet("jugador","assets/jugador.png",{frameWidth:48.4,frameHeigth:50});
    
        // joystick
    let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
    this.load.plugin('rexvirtualjoystickplugin', url, true);

    }
    create () {
      

        var fondo=this.add.image(500,500,"fondo");
        fondo.setScale(6);

       

         // joystick
         this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 400,
            y: 800,
            radius: 100,
            base: this.add.circle(0, 0, 100, 0x888888),
            thumb: this.add.circle(0, 0, 30, 0xcccccc),
      });

      this.joystickCursors = this.joyStick.createCursorKeys();

      ///
        jugador=this.physics.add.sprite(500,500,"jugador");
        jugador.setScale(3)

 
        this.cameras.main.startFollow(jugador); /// camara sigue al jugador

 


    }
    update () {

     
        if (this.joystickCursors.up.isDown ) {
            jugador.setVelocityY(-200);
        }
        else if (this.joystickCursors.down.isDown ) {
            jugador.setVelocityY(200);
        }
        else if (this.joystickCursors.left.isDown ) {
            jugador.setVelocityX(-200);
        }
        else if (this.joystickCursors.right.isDown ) {
            jugador.setVelocityX(200);
        }
        else {
            jugador.setVelocity(0);
        }
    
    }

 

}