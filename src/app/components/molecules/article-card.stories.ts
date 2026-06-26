import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { ArticleCardComponent } from './article-card.component';
import { articleSummaryMock } from '../../../mocks/article.mock';

const meta: Meta<ArticleCardComponent> = {
  title: 'Molecules/ArticleCard',
  component: ArticleCardComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  args: { article: articleSummaryMock },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-sm"><upala-article-card [article]="article" /></div>`,
  }),
};
export default meta;

type Story = StoryObj<ArticleCardComponent>;

export const Default: Story = {};

export const LongExcerpt: Story = {
  args: {
    article: {
      ...articleSummaryMock,
      excerpt:
        'Un récit beaucoup plus long destiné à montrer comment le texte est tronqué après trois lignes grâce à la classe line-clamp-3, garantissant une grille de cartes régulière même lorsque les résumés varient en longueur.',
    },
  },
};
