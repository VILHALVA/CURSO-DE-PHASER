# COMO USAR TILED?
O Tiled é uma ferramenta popular para a criação de mapas em jogos, e o Phaser tem suporte integrado para carregar e usar mapas Tiled em seus projetos. Vamos passar por um exemplo básico de como usar o Tiled com o Phaser.

1. **Criar um Mapa no Tiled:**
   - Baixe e instale o Tiled: [Tiled Map Editor](https://www.mapeditor.org/)
   - Crie um novo mapa ou abra um existente no Tiled.
   - Adicione camadas, objetos, tiles, etc., conforme necessário para o seu jogo.
   - Exporte o mapa como um arquivo JSON.

2. **Exportar o Mapa em JSON:**
   - No Tiled, vá em "File" > "Export As..." e escolha o formato "JSON".
   - Salve o arquivo JSON no diretório do seu projeto.

3. **Configurar o Phaser para Carregar o Mapa:**
   - Certifique-se de ter o arquivo JSON do seu mapa no diretório do seu projeto.
   - Atualize o código do seu jogo para carregar e exibir o mapa usando o Phaser.

   ```javascript
   var config = {
       type: Phaser.AUTO,
       scale: {
           mode: Phaser.Scale.FIT,
           autoCenter: Phaser.Scale.CENTER_BOTH,
           width: 800,
           height: 600,
       },
       physics: {
           default: "arcade",
           arcade: {
               gravity: { y: 300 },
               debug: false,
           },
       },
       scene: {
           preload: preload,
           create: create,
           update: update,
       },
   };

   var game = new Phaser.Game(config);
   var player;

   function preload() {
       this.load.tilemapTiledJSON("map", "assets/map/map.json");
       this.load.image("tiles", "assets/tiles/tiles.png");
       this.load.spritesheet("player", "assets/player.png", { frameWidth: 32, frameHeight: 48 });
   }

   function create() {
       // Carrega o mapa
       var map = this.make.tilemap({ key: "map" });
       var tileset = map.addTilesetImage("tiles");

       // Cria as camadas do mapa
       var groundLayer = map.createLayer("Ground", tileset, 0, 0);
       var objectLayer = map.createLayer("Objects", tileset, 0, 0);

       // Define as colisões
       this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
       this.physics.add.collider(player, groundLayer);

       // Cria o jogador
       player = this.physics.add.sprite(100, 100, "player");
   }

   function update() {
       // Adicione a lógica de atualização do jogo aqui
   }
   ```

   Certifique-se de substituir os caminhos dos arquivos (como `"assets/map/map.json"`, `"assets/tiles/tiles.png"`, `"assets/player.png"`) pelos caminhos corretos nos seus diretórios.

   Este é um exemplo básico que carrega um mapa Tiled em um jogo Phaser. Dependendo do seu mapa e requisitos do jogo, você pode precisar ajustar o código e adicionar mais lógica, como interações com objetos do mapa, inimigos, etc.

