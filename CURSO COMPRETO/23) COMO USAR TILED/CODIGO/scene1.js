class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena-
    }
 
    preload ()  {
        this.load.image("fondo","assets/Background.png");
        this.load.spritesheet("jugador","assets/jugador.png",{frameWidth:48.4,frameHeigth:50});
        this.load.image("EnemigosEsqueletos","assets/enemigo.png");

        // tiled
        this.load.image("Pisos","assets/Pisos.png"); // donde estan los patrones
        this.load.tilemapTiledJSON("tilemap","assets/PisosJuego.json") // donde esta el achivo json
    

    }
    create () {
      

        var fondo=this.add.image(500,500,"fondo");
        fondo.setScale(6);

      ////////////////

      var map = this.make.tilemap({key:"tilemap"})  //  hace un archivo asi

      var tileset = map.addTilesetImage("aaaaa","Pisos"); 

      var fondo = map.createLayer("PisosDelJuego",tileset)

      fondo.setCollisionByProperty({colision:true})


        jugador=this.physics.add.sprite(500,500,"jugador");
        jugador.setScale(3)

 
      ///////////// 
      // enemigos 
      Enemigos =this.physics.add.group();
      Enemigos.create(1200,500,"EnemigosEsqueletos").setScale(0.3);
      Enemigos.create(1200,800,"EnemigosEsqueletos").setScale(0.3);


        ///CAMARA//
        this.cameras.main.startFollow(jugador); /// camara sigue al jugador
        
      //// teclas ///
        if (cursors =! undefined){
                  
            cursors = this.input.keyboard.createCursorKeys();
        }
  ///////////

  this.physics.add.collider(Enemigos,Enemigos)
  this.physics.add.collider(jugador,fondo)
 
        
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
   
 

}