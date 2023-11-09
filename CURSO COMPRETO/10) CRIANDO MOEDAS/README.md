# CRIANDO MOEDAS
Adicionar moedas ao seu jogo é uma maneira divertida de introduzir elementos de coleta. Vamos criar algumas moedas que o jogador pode coletar enquanto se move pelo jogo.

1. **Estrutura de Pasta:**
   Certifique-se de ter uma estrutura de pasta semelhante à seguinte:

   ```
   - SeuProjeto
     - node_modules
     - assets
       - sky.png
       - player.png
       - platform.png
       - coin.png
     - index.html
     - index.js
     - package.json
   ```

2. **index.js:**
   Atualize o arquivo `index.js` com o seguinte código para adicionar moedas ao jogo:

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
       this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 64 });
       this.load.image('platform', 'assets/platform.png');
       this.load.image('coin', 'assets/coin.png');
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

       // Adiciona animações ao jogador
       this.anims.create({
           key: 'left',
           frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
           frameRate: 10,
           repeat: -1
       });

       this.anims.create({
           key: 'turn',
           frames: [ { key: 'player', frame: 4 } ],
           frameRate: 20
       });

       this.anims.create({
           key: 'right',
           frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
           frameRate: 10,
           repeat: -1
       });

       // Adiciona grupo de moedas
       this.coins = this.physics.add.group({
           key: 'coin',
           repeat: 10, // Número de moedas
           setXY: { x: 12, y: 0, stepX: 70 }
       });

       this.coins.children.iterate(function (child) {
           // Adiciona colisão entre as moedas e as plataformas
           child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
           child.setCollideWorldBounds(true);
       });

       this.physics.add.collider(this.coins, this.platforms);
       this.physics.add.overlap(this.player, this.coins, collectCoin, null, this);
   }

   function update() {
       // Lógica de movimentação do jogador
       if (this.cursors.left.isDown) {
           this.player.setVelocityX(-160);
           this.player.anims.play('left', true);
       } else if (this.cursors.right.isDown) {
           this.player.setVelocityX(160);
           this.player.anims.play('right', true);
       } else {
           this.player.setVelocityX(0);
           this.player.anims.play('turn');
       }

       // Pula quando a tecla para cima é pressionada
       if (this.cursors.up.isDown && this.player.body.touching.down) {
           this.player.setVelocityY(-400);
       }
   }

   function collectCoin(player, coin) {
       coin.disableBody(true, true); // Desabilita a moeda
   }
   ```

   Neste código, adicionamos um grupo de moedas (`this.coins`) e configuramos a colisão entre as moedas e o jogador. Quando o jogador sobre uma moeda, a função `collectCoin` é chamada, desabilitando a moeda.

3. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, o jogador pode coletar moedas enquanto se move pelo jogo.

