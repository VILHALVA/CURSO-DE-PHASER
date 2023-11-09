class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena-
    }
 
    preload ()  {
        this.load.image("fondo","assets/Background.png");
        this.load.spritesheet("jugador","assets/jugador.png",{frameWidth:48.4,frameHeigth:50});
        this.load.image("EnemigosEsqueletos","assets/enemigo.png");
        this.load.image("BarraVida","assets/barraVida.png");
        
     

    }
    create () {
      

        var fondo=this.add.image(500,500,"fondo");
        fondo.setScale(6);

      ////////////////

        jugador=this.physics.add.sprite(500,500,"jugador");
        jugador.setScale(3);
        jugador.golpeado=false;
        jugador.tiempoInmunidad=0;
        
 
      ///////////// 
      // enemigos 
      Enemigos =this.physics.add.group();
      Enemigos.create(1200,500,"EnemigosEsqueletos").setScale(0.3);
      Enemigos.create(1200,800,"EnemigosEsqueletos").setScale(0.3);

      // barra vida 

      BarraDeVida=this.add.image(50,100,"BarraVida");
      BarraDeVida.cantidad=500;
      BarraDeVida.displayOriginX=0;



        ///CAMARA//
        this.cameras.main.startFollow(jugador); /// camara sigue al jugador
        
      //// teclas ///
        if (cursors =! undefined){
                  
            cursors = this.input.keyboard.createCursorKeys();
        }
  ///////////

  this.physics.add.collider(Enemigos,Enemigos)
  this.physics.add.overlap(jugador,Enemigos,this.PierdeVida,null,this);
        
    }
    update () {

        // barra vida 
        BarraDeVida.setScrollFactor(0);
       
        BarraDeVida.displayWidth=BarraDeVida.cantidad;

        console.log(this.time.now);

        if(this.time.now >= jugador.tiempoInmunidad) {
            jugador.golpeado=false;
            jugador.clearTint();
        }

     
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

        Enemigos.children.iterate(function(child){

            if ((Phaser.Math.Distance.BetweenPoints(jugador,child)<=350) ) {


                if ((jugador.x-child.x)<-20) {
                    child.setVelocityX(-50);
                    
                }
                else if ((jugador.x-child.x)>20) {
                    child.setVelocityX(50);
                }

                else {
                    child.setVelocityX(0);
                }

                if ((jugador.y-child.y)<-20) {
                    child.setVelocityY(-50);
                    
                }
                else if ((jugador.y-child.y)>20) {
                    child.setVelocityY(50);
                }

                else {
                    child.setVelocityY(0);
                }




            }
            else {
                child.setVelocity(0);
            }





        });


    
    }

    PierdeVida() {
        if (BarraDeVida.cantidad>0) {

            if (jugador.golpeado==false) {
                BarraDeVida.cantidad=BarraDeVida.cantidad-20;
                jugador.golpeado=true;
                jugador.setTint(0xe7f24e);
                jugador.tiempoInmunidad=this.time.now + 2000
            }
           



        }
        
    }
   
 

}