export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  contentPath?: string;
  author: string;
  date: string;
  image: string;
  featured: boolean;
  tags: string[];
}

export const posts: Post[] = [
  {
    id: "fine-tuning",
    title: "#0 I.A para devs: Fine-Tuning, quando, como e por que ajustar um modelo de linguagem",
    excerpt: "Um guia prático sobre fine-tuning de LLMs: quando vale a pena, como preparar seus dados e as melhores estratégias para obter resultados reais.",
    contentPath: "posts/fine-tuning.md",
    author: "Bruno Theodoro",
    date: "17 Feb 2026",
    image: "/fine-tuning.jpg",
    featured: true,
    tags: ["AI", "LLM", "Fine-Tuning", "Machine Learning"]
  },
  {
    id: "context-window",
    title: "#1 I.A para devs: Context Window, o que é, por que importa e como usar melhor",
    excerpt: "Entenda o conceito de context window em LLMs, como ela afeta a qualidade das respostas e estratégias práticas para aproveitá-la ao máximo no seu dia a dia.",
    contentPath: "posts/context-window.md",
    author: "Bruno Theodoro",
    date: "17 Feb 2026",
    image: "/context-window.jpg",
    featured: true,
    tags: ["AI", "LLM", "Context Window", "Engenharia"]
  },
];
