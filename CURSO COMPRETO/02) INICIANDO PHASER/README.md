# INICIANDO PHASER
Agora que você tem o Visual Studio Code instalado, podemos começar a criar um projeto Phaser simples. Primeiro, certifique-se de que o Phaser está instalado no seu projeto usando o npm. Se você ainda não fez isso, abra o terminal no diretório do seu projeto e execute:

```bash
npm install phaser
```

Agora, crie um arquivo HTML básico para o seu jogo. Abra o Visual Studio Code, crie um novo arquivo chamado `index.html` e adicione o seguinte código:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Primeiro Jogo Phaser</title>
    <script src="node_modules/phaser/dist/phaser.min.js"></script>
</head>
<body>

<script>
    // Seu código Phaser vai aqui
</script>

</body>
</html>
```

Certifique-se de ajustar o caminho do script Phaser para o local onde o npm instalou o Phaser no seu projeto.

Agora, podemos adicionar um código Phaser básico. Substitua o comentário "Seu código Phaser vai aqui" com o seguinte:

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
}

function create() {
    this.add.image(400, 300, 'sky');
}

function update() {
    // Lógica de atualização do jogo
}
```

Este é um código Phaser básico que carrega uma imagem de fundo e a exibe na tela. Certifique-se de ter uma imagem chamada `sky.png` na pasta `assets` do seu projeto.

Agora, você pode abrir o arquivo `index.html` no seu navegador para ver o jogo em ação. Este é apenas um começo, e há muito mais que você pode fazer com o Phaser. 