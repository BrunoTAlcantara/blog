# Blog Notion-Style

Um blog moderno e minimalista inspirado no design do Notion, construído com Next.js 14, TypeScript e Tailwind CSS.

## 🚀 Características

- **Design System Notion**: Tipografia, cores e espaçamentos inspirados no Notion
- **Posts em Markdown**: Sistema completo de posts com suporte a Markdown
- **Busca Inteligente**: Funcionalidade de busca com dropdown e navegação por teclado
- **Responsivo**: Design adaptável para desktop e mobile
- **Performance**: Otimizado com Next.js 14 e App Router
- **TypeScript**: Tipagem completa para melhor desenvolvimento

## 🛠️ Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Remark** - Processamento de Markdown
- **React** - Biblioteca de interface

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd blog
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📝 Como Adicionar Posts

### Método 1: Adicionar via código

1. Edite o arquivo `src/data/posts.ts`
2. Adicione um novo objeto Post no array `posts`:

```typescript
{
  id: "meu-novo-post",
  title: "Título do Post",
  excerpt: "Resumo do post...",
  content: `# Meu Post

Conteúdo em markdown aqui...`,
  author: "Seu Nome",
  date: "01 Jan 2024",
  image: "/api/placeholder/128/128",
  featured: false,
  tags: ["tag1", "tag2"]
}
```

### Método 2: Exportar do Notion

1. Exporte sua página do Notion como Markdown
2. Copie o conteúdo para o campo `content` do post
3. Ajuste o título, excerpt e metadados conforme necessário

## 🎨 Personalização

### Cores

As cores estão definidas no `tailwind.config.js` na seção `notion`:

```javascript
notion: {
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    // ... outras cores
  }
}
```

### Tipografia

A tipografia Notion está configurada no CSS global (`src/app/globals.css`) e no Tailwind config.

### Componentes

- `Header.tsx` - Cabeçalho com navegação e busca
- `Hero.tsx` - Seção principal da homepage
- `PostCard.tsx` - Card de post para listagem
- `Search.tsx` - Componente de busca com dropdown

## 🔍 Funcionalidades

### Busca

- Busca em tempo real nos títulos, conteúdo, tags e autores
- Dropdown com resultados
- Navegação por teclado (setas, Enter, Escape)
- Limite de 5 resultados por busca

### Posts

- Renderização completa de Markdown
- Suporte a tabelas, listas, código, etc.
- Tags e metadados
- URLs amigáveis baseadas no ID

### Design

- Layout responsivo
- Hover states e transições suaves
- Imagens placeholder automáticas
- Tipografia otimizada para leitura

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/placeholder/     # API para imagens placeholder
│   ├── posts/[slug]/        # Páginas dinâmicas de posts
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Homepage
├── components/
│   ├── Header.tsx           # Cabeçalho
│   ├── Hero.tsx             # Seção principal
│   ├── PostCard.tsx         # Card de post
│   └── Search.tsx           # Componente de busca
├── data/
│   └── posts.ts             # Dados dos posts
└── lib/
    ├── markdown.ts          # Utilitários de Markdown
    └── search.ts            # Lógica de busca
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente se necessário
3. Deploy automático a cada push

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se você tiver dúvidas ou problemas, abra uma issue no repositório.