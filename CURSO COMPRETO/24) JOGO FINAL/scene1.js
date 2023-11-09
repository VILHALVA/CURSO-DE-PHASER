class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena
    }
 
    preload () {

        this.load.image("Fondo","assets/Background.png"); // decimos donde esta la imagen a phaser
        this.load.image("plataformas","assets/plataforma.png"); // imagen plataforma 
        this.load.spritesheet("jugador","assets/jugador.png",{ frameWidth: 48.4,frameHeight: 50});// spritesheet personaje
        this.load.image("moneda","assets/moneda.png"); // imagen plataforma 
        this.load.image("enemigo","assets/enemigo.png"); // imagen plataforma 
        this.load.audio("salto","assets/salto.mp3");
        this.load.audio("sonidoMoneda","assets/sonidoMoneda.mp3");
        this.load.image("btnReiniciar","assets/btnReiniciar.png");
        this.load.image("ventana","assets/ventana.png");
      
    }

    create () {
        gameOver=false;
        // sonidos

        sonidoMoneda=this.sound.add("sonidoMoneda");
        sonidoSalto=this.sound.add("salto");


        // fondo 
        var fondo = this.add.image(930,530,"Fondo"); // agregamos el fondo a la escena
        fondo.setScale(3.5);//escalamos el fondo



        // puntos
        txtPuntos=this.add.text(100,20,"Puntos: 0",{font:"40px Arial Black",fill:"#FF0000"}); // creamos el texto puntos cons sus propiedeades
        
        puntos=0;// inicializamos la variable punrtos en 0

        // enemigos

        enemigos=this.physics.add.group({
            key:"enemigo", // nombre de la imagen cargada en el preload
            repeat:2,// cuantas monedas va a crear 
            setScale:{x:0.3,y:0.3}, // escalamos 
            setXY:{x:500,y:50,stepX:200} // donde se van a crear y cada cuanta distancia
        });

        enemigos.children.iterate(function (enemigo){
            enemigo.setSize(140,200);
            enemigo.setBounce(1)
            enemigo.setVelocityX(100)
            enemigo.setCollideWorldBounds()

        });




        // animaciones 
        this.anims.create({
            key: "detenido", // nombre de la animacion
            frames: this.anims.generateFrameNumbers("jugador",{start:0,end:3}),// desde que frame hasta que frame
            frameRate:7,// velocidad de animacion
            repeat:-1// si se va a reptir y cuantas veces, al estar en -1 se repite infinito
        });

        this.anims.create({
            key: "caminar",
            frames: this.anims.generateFrameNumbers("jugador",{start:4,end:9}),
            frameRate:10,
            repeat:-1
        });

        /// creamos el grupo monederos

        monedero=this.physics.add.group({
            key:"moneda", // nombre de la imagen cargada en el preload
            repeat:9,// cuantas monedas va a crear 
            setScale:{x:0.1,y:0.1}, // escalamos 
            setXY:{x:50,y:50,stepX:200} // donde se van a crear y cada cuanta distancia
        });


        //// recorremos todas las monedas del grupo monedero
        monedero.children.iterate(function (monedas){
            monedas.setBounce(0.5) // le decimos a todas las monedas del grupo monedero que reboten 

        });


        // Grupo plataformas 

        plataformas= this.physics.add.staticGroup();
        plataformas.create(200,500,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);// hijos de ese grupo 
        plataformas.create(500,800,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);; // hijos de ese grupo 
        plataformas.create(1600,600,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);; // hijos de ese grupo 
        plataformas.create(1500,800,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);; // hijos de ese grupo 
        plataformas.create(1000,700,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);; // hijos de ese grupo 
        plataformas.create(600,500,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);; // hijos de ese grupo 
        plataformas.create(1200,900,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);; // hijos de ese grupo 
        plataformas.create(1000,1000,"plataformas").setScale(80,1.5).setSize(1920,45).setOffset(-980,-5);; // hijos de ese grupo 


        // jugador  
        jugador= this.physics.add.sprite(500,500,"jugador"); //agregamos el jugador a la escena
        jugador.setScale(4);// escalamos el jugador
        jugador.setSize(15,35); // escalabamos el body
        jugador.setOffset(7,14);// acomodamos el personaje dentro de el
        jugador.setCollideWorldBounds(true);// hacemos que colisione con el borde del mundo


        /// teclas 
        cursors = this.input.keyboard.createCursorKeys();

        // botones
        fondoVentana=this.add.image(900,550,"ventana")
        fondoVentana.setScale(0.4)
        fondoVentana.setVisible(false) // hace invisible las cosas pero siguen estando

        botonReiniciar=this.add.image(900,650,"btnReiniciar");
        botonReiniciar.setScale(0.4)
        botonReiniciar.setVisible(false) /// hace invisible las cosas pero siguen estando
        botonReiniciar.on("pointerdown",()=> this.scene.restart())

        txtPuntosFinales=this.add.text(845,500,"0",{font:"60px Arial Black",fill:"#FF0000"});
        txtPuntosFinales.setVisible(false)

       

        // colisones 

        this.physics.add.collider(plataformas,jugador); //detecta las colisones entre objetos
        this.physics.add.collider(plataformas,monedero);
        this.physics.add.collider(plataformas,enemigos);
        this.physics.add.overlap(jugador,monedero,this.destruyeMonedas,null,this)
        this.physics.add.overlap(jugador,enemigos,this.gameOver,null,this)


    }

    update () {

// manejo del jugador


        if(gameOver==false) {

        

        if (cursors.right.isDown) {  // si la tecla derecha esta presionada move al personaje en el eje x con una velocidad de 180
           jugador.setVelocityX(180); 
           jugador.anims.play("caminar",true);
           jugador.setOffset(7,14);
           if(jugador.flipX==true) {
            jugador.x=jugador.x+55
        }
           jugador.flipX=false;

           
        }
        else if (cursors.left.isDown) {
            jugador.setVelocityX(-180); // si la tecla derecha esta presionada move al personaje en el eje x con una velocidad de -180
            jugador.anims.play("caminar",true);// reproduce la animación caminar
            jugador.setOffset(26,14);

            if(jugador.flipX==false) {
                jugador.x=jugador.x-55
            }
            jugador.flipX=true; // espejar la imagen
          
        }

        else {
            jugador.setVelocityX(0); // si no estan ninguna de estas teclas presionadas su velocidad es 0
            jugador.anims.play("detenido",true);
        }

        if (cursors.up.isDown && jugador.body.touching.down) {  /// si se presiona la tecla arriba y  el personaje esta tocando algo abajo salta
            jugador.setVelocityY(-650);
            sonidoSalto.play()
        }
        
    }

       
    }
    // funcion es llamada cuando se superponen el jugador y las monedas
    destruyeMonedas(jugador,coins) {

        //monedero.destroy(); // destruye las monedas
        coins.disableBody(true,true);// desactiva las monedas
        puntos=puntos+100; /// suma puntos
        console.log(puntos); // uso la consola de chrome para debuguear
        txtPuntos.setText("Puntos: "+puntos) // cambio el valor del texto a puntos y le concateno l variable puntos
        sonidoMoneda.play();

// controlo si todas las monedas desaparecieron las recorro y las subo para arriba así caen otra vez
        if (monedero.countActive()===0) {

            monedero.children.iterate(function (monedas){
                monedas.enableBody(true,monedas.x,10,true,true)
    
            });


        }
        
    }

    /// creo la función game over
    gameOver() {
        
        gameOver=true; // cambio la variable game over a true
       this.physics.pause() // detengo las phisicas
       botonReiniciar.setVisible(true) // hago el boton reiniciar visible
       fondoVentana.setVisible(true) // hago la ventana azul visible
       botonReiniciar.setInteractive() // hago que el boton sea interactivo y clikeable
       txtPuntosFinales.setVisible(true) // hago que los puntos finales  sean visivles 
       txtPuntosFinales.setText(puntos)// a puntos finales le pongo  puntos que hice hasta perder
       
       

    }

}