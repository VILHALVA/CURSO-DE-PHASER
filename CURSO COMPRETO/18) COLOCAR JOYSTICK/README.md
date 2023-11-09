# COLOCAR JOYSTICK
Adicionar suporte para joystick ou controle virtual pode melhorar a experiência do jogador em dispositivos móveis ou em navegadores que oferecem suporte a esses dispositivos. Vamos adicionar um joystick virtual simples ao jogo usando a biblioteca Virtual Joystick for Phaser.

1. **Instalação da Biblioteca Virtual Joystick for Phaser:**
   Você precisará baixar a biblioteca `phaser-virtual-joystick.min.js` e incluí-la no seu projeto. Você pode baixá-la do repositório oficial: [Phaser Virtual Joystick](https://github.com/aaccurso/phaser-virtual-joystick).

   Após baixar o arquivo, coloque-o na pasta do seu projeto e adicione a referência ao final do seu arquivo HTML, logo após a referência à biblioteca Phaser.

   ```html
   <script src="path/to/phaser.js"></script>
   <script src="path/to/phaser-virtual-joystick.min.js"></script>
   ```

2. **Atualização do Código:**
   Agora, vamos atualizar o código para integrar o joystick virtual ao jogo.

   ```javascript
   const config = {
       // ... (o resto do código permanece o mesmo)
   };

   const game = new Phaser.Game(config);

   function preload() {
       // ... (o resto do código permanece o mesmo)
   }

   function create() {
       // ... (o resto do código permanece o mesmo)

       // Adiciona o joystick virtual
       this.joystick = this.plugins.add(PhaserVirtualJoystick.JoystickPlugin, {
           x: 100,
           y: 500,
           radius: 50,
           base: this.add.circle(0, 0, 50, 0x888888),
           thumb: this.add.circle(0, 0, 25, 0xcccccc),
           enable: true
       });

       // Configura a função de atualização para movimentar o jogador com o joystick
       this.input.on('pointermove', (pointer) => {
           if (this.joystick.enable) {
               const angle = this.joystick.rotation;
               const speed = this.joystick.speed;

               // Calcula as componentes x e y do vetor de movimento
               const vx = Math.cos(angle) * speed;
               const vy = Math.sin(angle) * speed;

               // Aplica a velocidade ao jogador
               this.player.setVelocityX(vx * 160);
               this.player.setVelocityY(vy * 160);
           }
       });
   }

   function update() {
       // ... (o resto do código permanece o mesmo)
   }

   // Resto do código permanece o mesmo
   ```

   Este trecho adiciona um joystick virtual à cena do jogo usando a biblioteca Phaser Virtual Joystick. O joystick é configurado para ficar na posição (100, 500) e possui um raio de 50 pixels. A função de atualização é configurada para mover o jogador com base na posição e velocidade do joystick.

3. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, ao tocar e arrastar no joystick virtual, o jogador deve se mover na direção correspondente.

Experimente o jogo e veja como o joystick virtual melhora a jogabilidade em dispositivos móveis ou em navegadores com suporte a dispositivos de entrada.