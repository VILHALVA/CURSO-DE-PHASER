class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena
    }
 
    preload ()  {
        this.load.image("fondo","assets/Background.png");
        this.load.spritesheet("jugador","assets/jugador.png",{frameWidth:48.4,frameHeigth:50});
    }
    create () {
        var fondo=this.add.image(500,500,"fondo");
        fondo.setScale(6);
        jugador=this.physics.add.sprite(500,500,"jugador");
        jugador.setScale(3)

        distancia= 0;
        objetivo= new Phaser.Math.Vector2(0,0);

        var pointer=this.input.activePointer; //  activamos la función puntero

        // escucha todo el tiempo cuando se haga algun click
        this.input.on("pointerdown",()=>{ 
            objetivo.x = pointer.worldX // guardame la posición del puntero en x  en el vector x del objetivo 
            objetivo.y = pointer.worldY  // guardame la posición del puntero en y  en el vector y del objetivo 
            this.physics.moveToObject(jugador,objetivo,200); // move el jugador al vector del objetivo
            
        })

        this.cameras.main.startFollow(jugador); /// camara sigue al jugador

 


    }
    update () {
        distancia = Phaser.Math.Distance.BetweenPoints(jugador,objetivo); // medime todo el tiempo la distancia entre el personaje y el objetivo
        if (distancia<20) {  /// si la distancia es menor a 20 px deten el personaje
            jugador.setVelocity(0);
        }
    
    }

}