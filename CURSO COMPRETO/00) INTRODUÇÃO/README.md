# INTRODUÇÃO, INSTALAÇÃO E CONFIGURAÇÃO
## Introdução:
Phaser é um framework JavaScript para desenvolvimento de jogos 2D. Ele simplifica a criação de jogos para web e dispositivos móveis, oferecendo uma variedade de funcionalidades e uma comunidade ativa de desenvolvedores.

## Instalação:
Para começar, você pode baixar o Phaser diretamente do [site oficial](https://phaser.io/) ou usar um gerenciador de pacotes como o npm. Vou mostrar como instalar usando npm:

1. Abra o terminal e navegue até o diretório do seu projeto.

2. Execute o seguinte comando para instalar o Phaser:
   ```bash
   npm install phaser
   ```

## Configuração:
Agora que você tem o Phaser instalado, você pode criar um arquivo HTML básico para começar. Aqui está um exemplo simples:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Jogo Phaser</title>
    <script src="path/to/phaser.min.js"></script>
</head>
<body>

<script>
    // Seu código Phaser vai aqui
</script>

</body>
</html>
```

Certifique-se de substituir `"path/to/phaser.min.js"` pelo caminho real do arquivo Phaser que você baixou ou instalou.

## SUBIR SERVIDOR?
O Phaser pode ser executado diretamente no navegador sem a necessidade de um servidor Node.js para muitos casos de desenvolvimento. Isso é especialmente útil para prototipagem e desenvolvimento local.

No entanto, se você estiver trabalhando com recursos que requerem solicitações de servidor, como carregar assets externos, ou se estiver desenvolvendo funcionalidades que envolvem o backend, pode ser útil configurar um servidor local usando Node.js.

Para muitos projetos simples, você pode criar um servidor local usando o comando `http-server` ou `live-server` do Node.js. Basta instalar o Node.js, se ainda não o tiver, e usar o seguinte comando no diretório do seu projeto:

```bash
npx http-server
```

Isso iniciará um servidor local, e você poderá acessar seu jogo através do navegador.

Agora, você está pronto para começar a construir seu jogo usando o Phaser! 