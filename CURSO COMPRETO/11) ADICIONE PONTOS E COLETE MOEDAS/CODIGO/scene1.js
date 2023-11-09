class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena
    }
 
    preload () {

        this.load.image("Fondo",".//assets/Background.png"); // decimos donde esta la imagen a phaser
        this.load.image("plataformas",".//assets/plataforma.png"); // imagen plataforma 
        this.load.spritesheet("jugador",".//assets/jugador.png",{ frameWidth: 48.4,frameHeight: 50});// spritesheet personaje
        this.load.image("moneda",".//assets/moneda.png"); // imagen plataforma 

    }

    create () {
        // fondo 
        var fondo = this.add.image(930,530,"Fondo"); // agregamos el fondo a la escena
        fondo.setScale(3.5);//escalamos el fondo

        txtPuntos=this.add.text(100,20,"Puntos: 0",{font:"20px Arial Black",fill:"#FF0000"}); // creamos el texto puntos cons sus propiedeades
        puntos=0;// inicializamos la variable punrtos en 0

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

        // colisones 

        this.physics.add.collider(plataformas,jugador); //detecta las colisones entre objetos
        this.physics.add.collider(plataformas,monedero);
        this.physics.add.overlap(jugador,monedero,this.destruyeMonedas,null,this)


    }

    update () {

// manejo del jugador

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
        }
        
       

       
    }
    // funcion es llamada cuando se superponen el jugador y las monedas
    destruyeMonedas(jugador,coins) {

        //monedero.destroy(); // destruye las monedas
        coins.disableBody(true,true);// desactiva las monedas
        puntos=puntos+100; /// suma puntos
        console.log(puntos);
        txtPuntos.setText("Puntos: "+puntos)


        if (monedero.countActive()===0) {

            monedero.children.iterate(function (monedas){
                monedas.enableBody(true,monedas.x,10,true,true)
    
            });
        }
        
        
        
        
        
        

    }

}