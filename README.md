# BTD6 Dúvidas

Site de FAQs em português para iniciantes em **Bloons TD 6**. Sem IA, sem custo de API — só conteúdo curado e busca instantânea.

## Funcionalidades

- 179+ perguntas frequentes em PT-BR (10 categorias)
- Revisão periódica de meta (ver `META_REVIEW.md` e `data/meta-review.json`)
- Busca por palavra-chave (camo, CHIMPS, round 24…)
- Filtro por categoria (torres, bloons, modos, etc.)
- Layout responsivo (mobile-friendly)
- Hospedagem estática (GitHub Pages, Netlify, Vercel)

## Como rodar localmente

```bash
npx serve .
```

Abra `http://localhost:3000` no navegador.

## Estrutura

```
btd6-duvidas/
├── index.html      # Página principal
├── css/style.css   # Estilos
├── js/app.js       # Busca e filtros
└── data/faq.json   # Perguntas e respostas
```

## Adicionar perguntas

Edite `data/faq.json`. Cada FAQ precisa de:

- `id` — identificador único
- `category` — id de uma categoria existente
- `question` — pergunta
- `answer` — resposta
- `tags` — palavras para busca

## Deploy gratuito (GitHub Pages)

1. Crie um repositório no GitHub
2. Envie este projeto
3. Settings → Pages → Source: branch `main`, pasta `/ (root)`

## Disclaimer

Projeto de fãs. Não afiliado à Ninja Kiwi ou à Bloons TD 6.
