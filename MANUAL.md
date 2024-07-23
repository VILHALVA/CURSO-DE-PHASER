# MANUAL
## INSTALAÇÃO DO PHASER:
1. **Instalar Node.js:**
   - Phaser requer Node.js para gerenciar pacotes e dependências. Baixe e instale o Node.js do [site oficial](https://nodejs.org/).

2. **Criar um Novo Projeto:**
   - Crie um diretório para o seu projeto. Abra o terminal (ou prompt de comando) e navegue até esse diretório.
   - Execute o comando `npm init` para inicializar um novo projeto Node.js. Siga as instruções para definir o nome do projeto, a versão, etc.

3. **Instalar o Phaser:**
   - No terminal, dentro do diretório do projeto, execute o comando:
     ```sh
     npm install phaser
     ```

4. **Configurar o Webpack (Opcional):**
   - Webpack é uma ferramenta para empacotar módulos JavaScript. Para usá-lo com Phaser, instale o Webpack e seu servidor de desenvolvimento:
     ```sh
     npm install --save-dev webpack webpack-cli webpack-dev-server
     ```

5. **Configurar o Babel (Opcional):**
   - Babel é um compilador JavaScript que permite usar a última versão do JavaScript. Instale o Babel:
     ```sh
     npm install --save-dev babel-loader @babel/core @babel/preset-env
     ```

6. **Criar o Estrutura do Projeto:**
   - Crie a estrutura básica do projeto com os seguintes diretórios e arquivos:
     ```
     my-phaser-game/
     ├── package.json
     ├── node_modules/
     ├── public/
     │   ├── index.html
     │   └── assets/
     ├── src/
     │   ├── index.js
     │   └── scenes/
     └── webpack.config.js
     ```

## CONFIGURAÇÃO DO PROJETO:
1. **Configurar o Webpack:**
   - Crie um arquivo `webpack.config.js` no diretório raiz do projeto com o seguinte conteúdo:
     ```js
     const path = require('path');

     module.exports = {
       entry: './src/index.js',
       output: {
         filename: 'bundle.js',
         path: path.resolve(__dirname, 'public'),
       },
       module: {
         rules: [
           {
             test: /\.js$/,
             exclude: /node_modules/,
             use: {
               loader: 'babel-loader',
               options: {
                 presets: ['@babel/preset-env'],
               },
             },
           },
         ],
       },
       devServer: {
         contentBase: path.resolve(__dirname, 'public'),
         publicPath: '/',
       },
     };
     ```

2. **Configurar o Babel:**
   - Crie um arquivo `.babelrc` no diretório raiz do projeto com o seguinte conteúdo:
     ```json
     {
       "presets": ["@babel/preset-env"]
     }
     ```

3. **Configurar o HTML:**
   - No diretório `public`, crie um arquivo `index.html` com o seguinte conteúdo:
     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Phaser Game</title>
     </head>
     <body>
       <script src="bundle.js"></script>
     </body>
     </html>
     ```

4. **Configurar o JavaScript:**
   - No diretório `src`, crie um arquivo `index.js` com o seguinte conteúdo:
     ```js
     import Phaser from 'phaser';

     const config = {
       type: Phaser.AUTO,
       width: 800,
       height: 600,
       scene: {
         preload: preload,
         create: create,
         update: update,
       },
     };

     const game = new Phaser.Game(config);

     function preload() {
       this.load.image('sky', 'assets/sky.png');
     }

     function create() {
       this.add.image(400, 300, 'sky');
     }

     function update() {
     }
     ```

## PRIMEIRO JOGO:
1. **Adicionar Assets:**
   - Adicione os arquivos de imagem e outros assets ao diretório `public/assets`.

2. **Preload:**
   - No método `preload`, carregue as imagens e outros assets:
     ```js
     function preload() {
       this.load.image('sky', 'assets/sky.png');
       this.load.image('star', 'assets/star.png');
     }
     ```

3. **Create:**
   - No método `create`, adicione os elementos do jogo à cena:
     ```js
     function create() {
       this.add.image(400, 300, 'sky');
       this.add.image(400, 300, 'star');
     }
     ```

4. **Update:**
   - No método `update`, defina a lógica do jogo que será executada a cada quadro:
     ```js
     function update() {
       // Lógica do jogo
     }
     ```

## EXECUTAR O JOGO:
1. **Executar o Webpack Dev Server:**
   - No terminal, execute o comando:
     ```sh
     npx webpack serve
     ```
   - Isso iniciará o servidor de desenvolvimento e abrirá o jogo no navegador.

2. **Testar o Jogo:**
   - Abra o navegador e navegue até `http://localhost:8080` para ver seu jogo em ação.
