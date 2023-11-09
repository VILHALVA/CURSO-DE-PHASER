# CRIAÇÃO DE CENA E PLANO DE FUNDO
Vou te mostrar como criar uma cena e definir um plano de fundo usando o Phaser 3. Aqui está um exemplo básico:

1. **Estrutura de Pasta:**
   Certifique-se de ter uma estrutura de pasta semelhante à seguinte:

   ```
   - SeuProjeto
     - node_modules
     - assets
       - sky.png
     - index.html
     - index.js
     - package.json
   ```

2. **Instalação do Phaser:**
   Se você ainda não instalou o Phaser, execute o seguinte comando no terminal dentro do diretório do seu projeto:

   ```bash
   npm install phaser
   ```

3. **index.html:**
   Abra o arquivo `index.html` e adicione o seguinte código:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Minha Cena Phaser</title>
       <script src="node_modules/phaser/dist/phaser.min.js"></script>
   </head>
   <body>

   <script src="index.js"></script>

   </body>
   </html>
   ```

4. **index.js:**
   Agora, crie o arquivo `index.js` e adicione o seguinte código:

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

   Este código cria uma cena básica com uma imagem de fundo (`sky.png`). Certifique-se de ter a imagem de fundo na pasta `assets`.

5. **Executando o Jogo:**
   Abra o terminal no diretório do seu projeto e execute:

   ```bash
   npx http-server
   ```

   Isso iniciará um servidor local. Abra o navegador e acesse `http://localhost:8080` (ou a porta que o servidor indicar). Você deverá ver sua cena com a imagem de fundo.

