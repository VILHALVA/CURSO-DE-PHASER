var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: true,
        },
    },
    scene: {
        create: create, // Adiciona a função create à cena
    },
};

function create() {
    // Adiciona o joystick virtual
    this.joystick = this.plugins.add(PhaserVirtualJoystick.JoystickPlugin, {
        x: 100,
        y: 500,
        radius: 50,
        base: this.add.circle(0, 0, 50, 0x888888),
        thumb: this.add.circle(0, 0, 25, 0xcccccc),
        enable: true,
    });

    // Adiciona o botão de disparo
    this.fireButton = this.plugins.add(PhaserVirtualJoystick.ButtonPlugin, {
        x: 700,
        y: 500,
        radius: 30,
        base: this.add.circle(0, 0, 30, 0x888888),
        enable: true,
    });

    // Configura a função de atualização para movimentar o jogador com o joystick e verificar o botão de disparo
    this.input.on("pointermove", (pointer) => {
        if (this.joystick.enable) {
            const angle = this.joystick.rotation;
            const speed = this.joystick.speed;

            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;

            this.jugador.setVelocityX(vx * 160);
            this.jugador.setVelocityY(vy * 160);
        }

        if (this.fireButton.enable && this.fireButton.isDown) {
            console.log("Disparo!");
        }
    });
}

var game = new Phaser.Game(config);
