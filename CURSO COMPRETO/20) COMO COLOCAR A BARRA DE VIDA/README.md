# COMO COLOCAR A BARRA DE VIDA?
Adicionar uma barra de vida (health bar) ao jogador ou aos inimigos em um jogo Phaser envolve a criação de elementos gráficos que representam visualmente a quantidade de vida restante. Vamos criar uma barra de vida simples para o jogador neste exemplo.

1. **Atualização do Código:**
   Adicione uma barra de vida ao jogador no método `create` e atualize-a no método `update`.

   ```javascript
   var config = {
       // ... (código anterior permanece o mesmo)
   };

   var game = new Phaser.Game(config);
   var player;
   var enemies;
   var playerHealth = 100; // Vida inicial do jogador
   var playerMaxHealth = 100; // Vida máxima do jogador

   var healthBar;

   function preload() {
       // ... (código anterior permanece o mesmo)
   }

   function create() {
       player = this.physics.add.sprite(100, 100, "player");
       enemies = this.physics.add.group();

       // Adiciona inimigos
       for (let i = 0; i < 5; i++) {
           let enemy = enemies.create(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), "enemy");
       }

       // Adiciona a barra de vida do jogador
       healthBar = this.add.graphics();
       updateHealthBar();

       // Restante do código permanece o mesmo
   }

   function update() {
       // ... (código anterior permanece o mesmo)

       // Atualiza a barra de vida do jogador
       updateHealthBar();
   }

   function updateHealthBar() {
       healthBar.clear();

       // Define a cor da barra de vida
       healthBar.fillStyle(0x2ecc71);

       // Calcula a largura proporcional da barra de vida com base na saúde atual
       const barWidth = (playerHealth / playerMaxHealth) * 100;

       // Desenha a barra de vida
       healthBar.fillRect(player.x - 50, player.y - 60, barWidth, 5);
   }
   ```

   Neste exemplo, criamos uma variável `playerHealth` para rastrear a vida do jogador e uma variável `playerMaxHealth` para armazenar a vida máxima do jogador. A função `updateHealthBar` desenha a barra de vida proporcional à saúde atual do jogador.

2. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, você deverá ver uma barra de vida acima do jogador, refletindo a saúde atual.

Esse é um exemplo básico. Dependendo do seu jogo, você pode querer personalizar a aparência da barra de vida, adicionar animações ou incorporar lógica adicional, como regeneração de vida ou efeitos visuais quando a vida é perdida. 