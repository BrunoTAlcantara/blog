# Posts Directory

Esta pasta contém os arquivos markdown dos posts do blog. Cada post é um arquivo `.md` com frontmatter YAML contendo os metadados.

## Estrutura dos Arquivos

Cada arquivo de post deve seguir esta estrutura:

```markdown
---
title: "Título do Post"
excerpt: "Resumo do post..."
author: "Nome do Autor"
date: "DD MMM YYYY"
image: "/api/placeholder/128/128"
featured: true/false
tags: ["tag1", "tag2", "tag3"]
---

# Conteúdo do Post

Aqui vai o conteúdo em markdown...
```

## Metadados Obrigatórios

- `title`: Título do post
- `excerpt`: Resumo/descrição do post
- `author`: Nome do autor
- `date`: Data de publicação (formato: "DD MMM YYYY")
- `image`: URL da imagem do post
- `featured`: Se o post é destaque (true/false)
- `tags`: Array de tags do post

## Como Adicionar um Novo Post

1. Crie um novo arquivo `.md` na pasta `posts/`
2. Use o ID do post como nome do arquivo (ex: `meu-novo-post.md`)
3. Adicione o frontmatter YAML com todos os metadados
4. Escreva o conteúdo em markdown
5. Atualize o arquivo `src/data/posts.ts` adicionando uma entrada para o novo post

## Exemplo de Post

```markdown
---
title: "Meu Novo Post"
excerpt: "Este é um exemplo de como criar um novo post"
author: "Bruno Theodoro"
date: "26 Oct 2025"
image: "/api/placeholder/128/128"
featured: false
tags: ["exemplo", "tutorial"]
---

# Meu Novo Post

Este é o conteúdo do meu post em markdown.

## Seção 1

Aqui posso escrever o que quiser...

- Lista item 1
- Lista item 2

### Subseção

Mais conteúdo aqui...
```

## Integração com o Sistema

O sistema automaticamente:
- Lê os metadados do frontmatter
- Processa o conteúdo markdown
- Gera as páginas dos posts
- Atualiza a listagem na página principal

## Notas Importantes

- Os arquivos devem estar na pasta `posts/` na raiz do projeto
- Use nomes de arquivo descritivos e em kebab-case
- O frontmatter deve estar no topo do arquivo, entre `---`
- O conteúdo markdown suporta todas as funcionalidades padrão do markdown
