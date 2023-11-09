class scene1 extends Phaser.Scene {

    constructor () {
        super ("nivel1"); // nombre escena
    }
 
    preload () {

        this.load.image("Fondo",".//assets/Background.png"); // decimos donde esta la imagen a phaser
        this.load.image("plataformas",".//assets/plataforma.png"); // imagen plataforma 
        this.load.spritesheet("jugador",".//assets/jugador.png",{ frameWidth: 48.4,frameHeight: 50});// spritesheet personaje


    }

    create () {


        // fondo 
        var fondo = this.add.image(930,530,"Fondo"); // agregamos el fondo a la escena
        fondo.setScale(3.5);//escalamos el fondo
        // Grupo plataformas 

        plataformas= this.physics.add.staticGroup();
        plataformas.create(200,500,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);// hijos de ese grupo 
        plataformas.create(500,800,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);; // hijos de ese grupo 
        plataformas.create(1600,500,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);; // hijos de ese grupo 
        plataformas.create(1500,800,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);; // hijos de ese grupo 
        plataformas.create(1000,700,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);; // hijos de ese grupo 
        plataformas.create(600,500,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);; // hijos de ese grupo 
        plataformas.create(1200,900,"plataformas").setScale(6,1.5).setSize(185,45).setOffset(-75,-5);; // hijos de ese grupo 
        plataformas.create(1000,1000,"plataformas").setScale(80,1.5).setSize(1920,45).setOffset(-980,-5);; // hijos de ese grupo 


        // jugador  
        jugador= this.physics.add.sprite(500,500,"jugador"); //agregamos el jugador a la escena
        jugador.setScale(4);// escalamos el jugador
        jugador.setSize(15,35);
        jugador.setOffset(7,14);
        jugador.setCollideWorldBounds(true);// hacemos que colisione con el borde del mundo


        /// teclas 
        cursors = this.input.keyboard.createCursorKeys();

        // colisones 

        this.physics.add.collider(plataformas,jugador); //detecta las colisones entre objetos


    }

    update () {

// manejo del jugador

        if (cursors.right.isDown) {  // si la tecla derecha esta presionada move al personaje en el eje x con una velocidad de 180
           jugador.setVelocityX(180); 
        }
        else if (cursors.left.isDown) {
            jugador.setVelocityX(-180); // si la tecla derecha esta presionada move al personaje en el eje x con una velocidad de -180
        }

        else {
            jugador.setVelocityX(0); // si no estan ninguna de estas teclas presionadas su velocidad es 0
        }

    


    }

}