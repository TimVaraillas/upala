import { Article, ArticleSummary } from '../app/core/models/article.model';

/** Shared mock data used by Storybook stories. */

export const articleSummaryMock: ArticleSummary = {
  title: 'Madère en autonomie : 7 étapes hors des sentiers battus',
  date: '2025-09-14',
  tags: ['Trek', 'Autonomie', 'Île'],
  coverImage: 'https://picsum.photos/seed/madeira/1280/720',
  slug: 'madere-autonomie-7-etapes',
  excerpt:
    'Sept jours de marche à travers les levadas et les sommets volcaniques de Madère, sac sur le dos et tente légère.',
  readingTime: 12,
  author: 'Un pas après l’autre',
  country: 'Portugal',
  region: 'Madère',
};

export const articleSummariesMock: ArticleSummary[] = [
  articleSummaryMock,
  {
    title: 'Alimentation en trek : préparer ses repas en autonomie',
    date: '2025-08-02',
    tags: ['Conseils', 'Nutrition'],
    coverImage: 'https://picsum.photos/seed/food/1280/720',
    slug: 'alimentation-trek-autonomie-conseils-exemples-repas',
    excerpt:
      'Comment composer des repas légers, caloriques et savoureux pour plusieurs jours loin de tout ravitaillement.',
    readingTime: 9,
    author: 'Un pas après l’autre',
    country: 'France',
    region: 'Alpes',
  },
  {
    title: 'GR20 : la traversée intégrale de la Corse',
    date: '2025-06-21',
    tags: ['Trek', 'Montagne'],
    coverImage: 'https://picsum.photos/seed/gr20/1280/720',
    slug: 'gr20-traversee-corse',
    excerpt:
      'Le GR20, réputé le plus difficile d’Europe : récit d’une traversée de 180 km à travers les crêtes corses.',
    readingTime: 15,
    author: 'Un pas après l’autre',
    country: 'France',
    region: 'Corse',
  },
];

export const articleMock: Article = {
  ...articleSummaryMock,
  markdown: '# Madère en autonomie\n\nUn récit de sept étapes...',
  html: '<p>Un récit de sept étapes...</p>',
  blocks: [{ type: 'html', html: '<p>Un récit de sept étapes...</p>' }],
  toc: [
    { id: 'preparatifs', text: 'Préparatifs', level: 2 },
    { id: 'etape-1', text: 'Étape 1 — Porto Moniz', level: 2 },
    { id: 'materiel', text: 'Matériel', level: 3 },
    { id: 'etape-2', text: 'Étape 2 — Fanal', level: 2 },
  ],
};
