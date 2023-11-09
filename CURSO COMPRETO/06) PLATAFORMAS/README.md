# PLATAFORMAS 
Adicionar plataformas ao seu jogo no Phaser 3 envolve a criação de sprites para representar as plataformas e configurar a física para interagir com o personagem. Vamos estender o exemplo anterior para incluir plataformas básicas. Certifique-se de ter uma imagem para a plataforma (por exemplo, `platform.png`) na pasta `assets`.

1. **Estrutura de Pasta:**
   Certifique-se de ter uma estrutura de pasta semelhante à seguinte:

   ```
   - SeuProjeto
     - node_modules
     - assets
       - sky.png
       - player.png
       - platform.png
     - index.html
     - index.js
     - package.json
   ```

2. **index.js:**
   Atualize o arquivo `index.js` com o seguinte código:

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
   }

   function update() {
       // Lógica de atualização do jogo
   }
   ```

   Aqui, criamos uma `staticGroup` para as plataformas, adicionamos uma plataforma no centro da tela e configuramos a física do jogador para interagir com as plataformas.

3. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, você verá o fundo, o jogador e uma plataforma na tela.

Este é um exemplo simples de como adicionar plataformas ao Phaser. 