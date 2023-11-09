# TELA COMPLETA
Para tornar o jogo em tela cheia, podemos usar a API de tela cheia fornecida pelos navegadores modernos. Vamos adicionar um botão no canto da tela que os jogadores podem clicar para ativar o modo de tela cheia.

1. **index.js:**
   Atualize o arquivo `index.js` com as alterações necessárias:

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
       this.player.setSize(32, 48); // Tamanho da hitbox
       this.player.setOffset(8, 8); // Offset para alinhar a hitbox

       // Adiciona colisão entre o jogador e as plataformas
       this.physics.add.collider(this.player, this.platforms);

       // Adiciona teclas de seta para movimentação
       this.cursors = this.input.keyboard.createCursorKeys();

       // Atualiza a posição do jogador com o mouse
       this.input.on('pointerdown', (pointer) => {
           const targetX = pointer.x;
           const targetY = pointer.y;

           // Calcula a distância entre a posição atual e a posição do mouse
           const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, targetX, targetY);

           // Calcula a duração do movimento com base na distância
           const duration = distance / 200; // Ajuste conforme necessário

           // Move o jogador para a posição do mouse com uma animação
           this.tweens.add({
               targets: this.player,
               x: targetX,
               y: targetY,
               duration: duration,
               ease: 'Linear',
               onComplete: () => {
                   // Lógica adicional após a conclusão do movimento, se necessário
               }
           });
       });

       // Adiciona um botão para tela cheia
       this.fullscreenButton = this.add.text(750, 16, 'Fullscreen', { fontSize: '16px', fill: '#fff' })
           .setInteractive()
           .on('pointerdown', toggleFullscreen);
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

       // Desabilita os botões durante o game over
       this.restartButton.input.enabled = false;
       this.pauseButton.input.enabled = false;
   }

   function restartGame() {
       // Reinicia o jogo
       this.scene.restart();

       // Habilita os botões após o reinício
       this.restartButton.input.enabled = true;
       this.pauseButton.input.enabled = true;

       // Reseta a variável de jogo encerrado
       this.gameOver = false;
   }

   function togglePause() {
       if (this.isPaused) {
           // Retoma o jogo
           this.physics.resume();


           this.isPaused = false;
           this.pauseButton.setText('Pausar');
       } else {
           // Pausa o jogo
           this.physics.pause();
           this.isPaused = true;
           this.pauseButton.setText('Retomar');
       }
   }

   function toggleFullscreen() {
       if (this.scale.isFullscreen) {
           this.scale.stopFullscreen();
       } else {
           this.scale.startFullscreen();
       }
   }
   ```

   Adicionamos um botão `Fullscreen` no canto superior direito da tela. Quando esse botão é clicado, ele ativa ou desativa o modo de tela cheia.

2. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, você deve ser capaz de clicar no botão `Fullscreen` para ativar ou desativar o modo de tela cheia.

