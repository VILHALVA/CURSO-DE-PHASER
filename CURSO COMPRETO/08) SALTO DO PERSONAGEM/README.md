# SALTO DO PERSONAGEM
Adicionar um salto ao personagem no Phaser é uma adição empolgante. Vamos ajustar o código para permitir que o jogador pule. Aqui está como você pode fazer isso:

1. **index.js:**
   Atualize o arquivo `index.js` com o seguinte código para adicionar uma lógica de salto ao jogador:

   ```javascript
   const config = {
       type: Phaser.AUTO,
       width: 800,
       height: 600,
       physics: {
           default: 'arcade',
           arcade: {
               gravity: { y: 300 },
               debug: true // Ativar debug para ver as hitboxes
           }
       },
       scene: {
           preload: preload,
           create: create,
           update: update
       }
   };

   const game = new Phaser.Game(config);

   function preload() {
       this.load.image('sky', 'assets/sky.png');
       this.load.image('player', 'assets/player.png');
       this.load.image('platform', 'assets/platform.png');
   }

   function create() {
       // Adiciona o fundo
       this.add.image(400, 300, 'sky');

       // Adiciona as plataformas
       this.platforms = this.physics.add.staticGroup();
       this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();

       // Adiciona o jogador
       this.player = this.physics.add.sprite(100, 450, 'player');
       this.player.setBounce(0.2);
       this.player.setCollideWorldBounds(true);

       // Ajusta a hitbox do jogador
       this.player.setSize(40, 60);
       this.player.setOffset(6, 4);

       // Adiciona colisão entre o jogador e as plataformas
       this.physics.add.collider(this.player, this.platforms);

       // Adiciona teclas de seta para movimentação
       this.cursors = this.input.keyboard.createCursorKeys();
   }

   function update() {
       // Lógica de movimentação do jogador
       if (this.cursors.left.isDown) {
           this.player.setVelocityX(-160);
       } else if (this.cursors.right.isDown) {
           this.player.setVelocityX(160);
       } else {
           this.player.setVelocityX(0);
       }

       // Pula quando a tecla para cima é pressionada
       if (this.cursors.up.isDown && this.player.body.touching.down) {
           this.player.setVelocityY(-400);
       }
   }
   ```

   Agora, ao pressionar a tecla para cima, o jogador receberá uma força vertical negativa (`-400`), fazendo-o pular.

2. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, você deve ser capaz de controlar o jogador e fazê-lo pular.

