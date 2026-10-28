# Rumo aos 90 kg — app para celular (PWA)

App de acompanhamento do plano de 12 semanas, para instalar no celular a partir do GitHub Pages, como o app de registro de ponto.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app completo |
| `manifest.webmanifest` | Nome, ícone e cores para a instalação no celular |
| `sw.js` | Funcionamento offline e leitura dos anexos guardados |
| `icons/` | Ícones do app (tela inicial, Android e iPhone) |

Envie todos para a raiz do repositório, mantendo a pasta `icons`.

## Publicar no GitHub Pages

1. No GitHub, crie um repositório novo, por exemplo `rumo90`. Ele precisa ser **público** no plano gratuito.
2. Toque em **Add file › Upload files**, arraste todos os arquivos e a pasta `icons`, e confirme em **Commit changes**.
3. Vá em **Settings › Pages**. Em *Build and deployment*, escolha **Deploy from a branch**, depois a branch **main** e a pasta **/ (root)**, e toque em **Save**.
4. Em um ou dois minutos, o endereço aparece no topo da página: `https://SEU-USUARIO.github.io/rumo90/`.

## Instalar no celular

- **Android (Chrome):** abra o endereço e toque em **Instalar app** (ou ⋮ › *Adicionar à tela inicial*).
- **iPhone (Safari):** abra o endereço e toque em **Compartilhar › Adicionar à Tela de Início**.

O app abre em tela cheia, com ícone próprio, e funciona sem internet. Só a leitura automática de arquivos precisa de conexão.

## Onde ficam os dados

- Todos os registros, anexos e fotos ficam **no próprio celular**. Nada vai para o GitHub.
- Em **Mais › Consulta › Seus dados**, use **Fazer backup** de vez em quando. Para trocar de aparelho, instale o app no novo celular e use **Restaurar backup**.
- O backup leva os registros, mas não os anexos e as fotos.
- No iPhone, o app instalado e o Safari guardam dados separados. Use sempre pelo ícone da tela inicial.

## Leitura automática (laudo, dieta e treino)

Fora do Claude, a leitura usa a API da Anthropic com a sua chave:

1. Crie uma conta em **console.anthropic.com**, adicione crédito e gere uma chave em **API Keys**.
2. No app, vá em **Mais › Consulta › Leitura automática**, cole a chave e toque em **Salvar chave**.

A chave fica guardada só no celular. Cada leitura custa centavos e é cobrada na sua conta da API. O modelo padrão é `claude-sonnet-5-5`, e dá para trocar no mesmo lugar.

## Atualizar o app

Para publicar uma versão nova, substitua os arquivos no repositório. Se o celular continuar mostrando a versão antiga, feche e abra o app duas vezes. Os dados não se perdem na atualização.

Desenvolvido por TEX Engenharia & Inovação.
