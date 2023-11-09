# MOVA O JOGADOR
Vamos adicionar movimento ao jogador no Phaser 3. Isso envolve a detecção de entrada do teclado e a aplicação de forças ao jogador para movê-lo pela tela.

Aqui está como você pode fazer isso:

1. **index.js:**
   Atualize o arquivo `index.js` com o seguinte código para adicionar movimento ao jogador:

   ```javascript
   const config = {
       type: Phaser.AUTO,
       width: 800,
       height: 600,
       physics: {
           default: 'arcade',
           arcade: {
               gravity: { y: 300 },
               debug: false
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
           this.player.setVelocityY(-330);
       }
   }
   ```

   Neste código, adicionamos um objeto `cursors` para capturar as teclas de seta e, no método `update`, aplicamos uma velocidade ao jogador com base nas teclas pressionadas.

2. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, você deve ser capaz de controlar o jogador usando as teclas de seta.

Este é um exemplo simples de como adicionar movimento ao jogador no Phaser. 