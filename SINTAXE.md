# SINTAXE
Abaixo está um exemplo simples de como usar o Phaser para criar um jogo básico de "Pong", onde os jogadores controlam barras para rebater uma bola. Vou explicar cada parte do código à medida que avançamos:

```javascript
// Criar uma instância do jogo com largura e altura específicas
const game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', { preload: preload, create: create, update: update });

// Variáveis globais para os objetos do jogo
let player1;
let player2;
let ball;

function preload() {
    // Carregar imagens necessárias
    game.load.image('paddle', 'assets/paddle.png');
    game.load.image('ball', 'assets/ball.png');
}

function create() {
    // Adicionar os jogadores (barras) no jogo
    player1 = game.add.sprite(50, game.world.centerY, 'paddle');
    player2 = game.add.sprite(game.world.width - 50, game.world.centerY, 'paddle');
    
    // Centralizar a origem das barras
    player1.anchor.setTo(0.5, 0.5);
    player2.anchor.setTo(0.5, 0.5);
    
    // Habilitar física para as barras
    game.physics.arcade.enable(player1);
    game.physics.arcade.enable(player2);
    
    // Permitir que as barras não saiam da tela
    player1.body.collideWorldBounds = true;
    player2.body.collideWorldBounds = true;
    player1.body.immovable = true;
    player2.body.immovable = true;
    
    // Adicionar a bola ao jogo
    ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
    ball.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1, 1); // Bola com rebote total
    ball.body.velocity.x = 200; // Velocidade inicial da bola
    
    // Adicionar teclas de controle dos jogadores
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    // Movimento do jogador 1 com as teclas de seta
    if (cursors.up.isDown) {
        player1.body.velocity.y = -300;
    } else if (cursors.down.isDown) {
        player1.body.velocity.y = 300;
    } else {
        player1.body.velocity.y = 0;
    }
    
    // Movimento do jogador 2 com as teclas W e S
    if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        player2.body.velocity.y = -300;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        player2.body.velocity.y = 300;
    } else {
        player2.body.velocity.y = 0;
    }
    
    // Verificar colisões entre a bola e os jogadores
    game.physics.arcade.collide(ball, player1);
    game.physics.arcade.collide(ball, player2);
}
```

Aqui está uma breve explicação de cada função e parte do código:

- **preload()**: Esta função é usada para pré-carregar todos os recursos necessários para o jogo, como imagens e sons. No exemplo, estamos carregando as imagens das barras (paddle) e da bola.

- **create()**: Aqui é onde os objetos do jogo são criados. Estamos adicionando os jogadores (barras) e a bola ao jogo, definindo suas propriedades, como posição, âncora, e habilitando a física para eles.

- **update()**: Esta função é chamada a cada quadro do jogo e é onde a lógica do jogo é atualizada. Aqui, estamos verificando as entradas do teclado para mover os jogadores, detectando colisões entre a bola e os jogadores e atualizando a posição da bola.

Este é um exemplo muito básico de um jogo de Pong usando Phaser. Você pode expandir e melhorar este código adicionando mais funcionalidades, como pontuação, efeitos sonoros, animações, entre outros.