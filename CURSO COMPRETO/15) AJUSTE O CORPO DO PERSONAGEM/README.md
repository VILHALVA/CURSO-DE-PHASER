# AJUSTE O CORPO DO PERSONAGEM
Vamos ajustar o corpo do personagem para garantir que a hitbox corresponda melhor à aparência visual do jogador. Para isso, podemos ajustar a posição, tamanho e offset da hitbox.

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
   ```

   O trecho acima ajusta o tamanho da hitbox para 32x48 pixels e define um offset de 8 pixels para alinhar melhor a hitbox com a imagem do jogador.

2. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, o corpo do jogador deve se alinhar melhor com a aparência visual.

