# INIMIGOS INTELIGÊNCIA ARTIFICIAL BÁSICA
Implementar uma inteligência artificial básica para inimigos em um jogo Phaser pode ser feito usando lógica condicional simples. Vamos criar um exemplo básico onde os inimigos seguem o jogador.

1. **Atualização do Código:**
   Vamos adicionar inimigos que seguirão o jogador. Vamos supor que os inimigos seguem diretamente o jogador, sem obstáculos no caminho.

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
               gravity: { y: 0 },
               debug: true,
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
   var enemies;

   function preload() {
       this.load.image("player", "assets/player.png");
       this.load.image("enemy", "assets/enemy.png");
   }

   function create() {
       player = this.physics.add.sprite(100, 100, "player");
       enemies = this.physics.add.group();

       // Adiciona inimigos
       for (let i = 0; i < 5; i++) {
           let enemy = enemies.create(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), "enemy");
       }
   }

   function update() {
       // Movimenta o jogador com o joystick virtual
       if (this.joystick.enable) {
           const angle = this.joystick.rotation;
           const speed = this.joystick.speed;

           const vx = Math.cos(angle) * speed;
           const vy = Math.sin(angle) * speed;

           player.setVelocityX(vx * 160);
           player.setVelocityY(vy * 160);
       }

       // Move os inimigos em direção ao jogador
       enemies.children.iterate(function (enemy) {
           const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
           const speed = 100;

           const vx = Math.cos(angle) * speed;
           const vy = Math.sin(angle) * speed;

           enemy.setVelocityX(vx);
           enemy.setVelocityY(vy);
       });
   }
   ```

   Neste exemplo, adicionamos um grupo de inimigos (`enemies`) e, no método `update`, iteramos sobre cada inimigo, calculando o ângulo entre o inimigo e o jogador. Em seguida, aplicamos uma velocidade ao inimigo na direção do jogador.

   Certifique-se de ajustar os detalhes conforme necessário para atender aos requisitos específicos do seu jogo.

2. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, você deverá ver inimigos que perseguem o jogador quando ele se move.

Esse é um exemplo muito básico. Dependendo do seu jogo, você pode querer adicionar lógica mais sofisticada para os inimigos, como esquivar-se de obstáculos, patrulhar áreas específicas, etc. 