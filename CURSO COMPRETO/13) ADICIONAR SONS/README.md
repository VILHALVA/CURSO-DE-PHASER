# ADICIONAR SONS
Adicionar sons ao seu jogo pode criar uma experiência mais envolvente. Vamos adicionar efeitos sonoros simples para a coleta de moedas e colisão com inimigos.

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
       - enemy.png
       - coin-collect.mp3
       - hit-enemy.mp3
     - index.html
     - index.js
     - package.json
   ```

2. **index.js:**
   Atualize o arquivo `index.js` com o seguinte código para adicionar sons ao jogo:

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
       this.load.image('enemy', 'assets/enemy.png');
       this.load.audio('coinCollect', 'assets/coin-collect.mp3');
       this.load.audio('hitEnemy', 'assets/hit-enemy.mp3');
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

       // Adiciona grupo de inimigos
       this.enemies = this.physics.add.group({
           key: 'enemy',
           repeat: 3, // Número de inimigos
           setXY: { x: 200, y: 0, stepX: 200 }
       });

       this.enemies.children.iterate(function (child) {
           // Adiciona colisão entre os inimigos e as plataformas
           child.setBounceX(1);
           child.setCollideWorldBounds(true);
       });

       this.physics.add.collider(this.enemies, this.platforms);
       this.physics.add.collider(this.player, this.enemies, hitEnemy, null, this);

       // Adiciona texto para exibir os pontos
       this.score = 0;
       this.scoreText = this.add.text(16, 16, 'Pontos: 0', { fontSize: '32px', fill: '#000' });

       // Adiciona sons
       this.coinCollectSound = this.sound.add('coinCollect');
       this.hitEnemySound = this.sound.add('hitEnemy');
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
       this.score += 10; // Aumenta a pontuação
       this.scoreText.setText('Pontos: ' + this.score); // Atualiza o texto da pontuação
       this.coinCollectSound.play(); // Reproduz o som de coleta de moeda
   }

   function hitEnemy(player, enemy) {
       // Lógica de colisão com inimigo
       this.physics.pause();
       this.player.setTint(0xff0000);
       this.player.anims.play('turn');
       this.gameOver = true;
       this.hitEnemySound.play(); // Reproduz o som de colisão com inimigo
   }
   ```

   Adicionamos dois sons (`coinCollect` e `hitEnemy`) ao carregar os recursos, e reproduzimos esses sons quando o jogador coleta uma moeda ou colide com um inimigo.

2. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, o jogo terá efeitos sonoros para a coleta de moedas e colisão com inimigos.

