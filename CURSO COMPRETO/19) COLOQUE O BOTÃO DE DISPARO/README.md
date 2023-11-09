# COLOQUE O BOTÃO DE DISPARO
Vamos adicionar um botão de disparo ao jogo. Quando esse botão for pressionado, o jogador realizará uma ação de disparo. Vamos integrar esse botão usando a biblioteca Virtual Joystick for Phaser.

1. **Atualização do Código:**
   Vamos atualizar o código para incluir o botão de disparo.

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

       // Adiciona o botão de disparo
       this.fireButton = this.plugins.add(PhaserVirtualJoystick.ButtonPlugin, {
           x: 700,
           y: 500,
           radius: 30,
           base: this.add.circle(0, 0, 30, 0x888888),
           enable: true
       });

       // Configura a função de atualização para movimentar o jogador com o joystick e verificar o botão de disparo
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

           // Verifica se o botão de disparo está pressionado
           if (this.fireButton.enable && this.fireButton.isDown) {
               // Lógica de disparo aqui
               // Substitua ou adicione a lógica de disparo conforme necessário
               console.log('Disparo!');
           }
       });
   }

   function update() {
       // ... (o resto do código permanece o mesmo)
   }

   // Resto do código permanece o mesmo
   ```

   Este trecho adiciona um botão de disparo à cena do jogo usando a biblioteca Phaser Virtual Joystick. O botão é configurado para ficar na posição (700, 500) e possui um raio de 30 pixels. A função de atualização é configurada para verificar se o botão de disparo está pressionado e executar a lógica de disparo quando necessário.

2. **Executando o Jogo:**
   Certifique-se de que o servidor local ainda está em execução (caso contrário, execute `npx http-server` novamente) e abra o navegador para `http://localhost:8080`. Agora, ao tocar e arrastar no joystick virtual, e pressionar o botão de disparo, a lógica de disparo será acionada.

