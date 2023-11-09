# MOVER PERSONAGEM COM MOUSE
Para mover o personagem com o mouse, podemos usar a entrada do mouse para detectar a posição do cursor e, em seguida, mover o jogador para essa posição. Vamos implementar essa funcionalidade.

1. **index.js:**
   Atualize o trecho responsável pelo jogador no arquivo `index.js` com as alterações necessárias:

   ```javascript
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
   ```

   O trecho acima adiciona um ouvinte de evento para o evento `pointerdown` (clique do mouse). Quando ocorre um clique, a posição do cursor é usada para calcular a distância entre a posição atual do jogador e a posição do cursor. Em seguida, uma animação de movimento é criada usando a biblioteca Tween do Phaser para mover o jogador até a posição do cursor.

2. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, você deve ser capaz de clicar em qualquer lugar na tela para movimentar o jogador até essa posição.

