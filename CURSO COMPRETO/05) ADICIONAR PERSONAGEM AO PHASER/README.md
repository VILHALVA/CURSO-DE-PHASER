# ADICIONAR PERSONAGEM AO PHASER
Adicionar um personagem ao seu jogo no Phaser envolve criar um sprite para representar o personagem e manipular suas propriedades e comportamentos. Vamos expandir o exemplo anterior para incluir um personagem simples. Certifique-se de ter uma imagem para o personagem (por exemplo, `player.png`) na pasta `assets`.

1. **Estrutura de Pasta:**
   Certifique-se de ter uma estrutura de pasta semelhante à seguinte:

   ```
   - SeuProjeto
     - node_modules
     - assets
       - sky.png
       - player.png
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
   }

   function create() {
       // Adiciona o fundo
       this.add.image(400, 300, 'sky');

       // Adiciona o jogador
       this.player = this.add.sprite(400, 300, 'player');
   }

   function update() {
       // Lógica de atualização do jogo
   }
   ```

   Aqui, adicionamos a imagem do jogador (`'player.png'`) ao pré-carregamento e criamos um sprite do jogador na função `create`.

3. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, você verá o fundo e o jogador na tela.

Este é um exemplo simples de como adicionar um personagem ao Phaser. Se quiser adicionar movimento ou interações, podemos ajustar o código de acordo.