import type { Meta, StoryObj } from '@storybook/angular';

import { ArticleLayoutComponent } from './article-layout.component';

const meta: Meta<ArticleLayoutComponent> = {
  title: 'Templates/ArticleLayout',
  component: ArticleLayoutComponent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: {
    title: 'Madère en autonomie : 7 étapes',
    subtitle: 'Sept jours de marche à travers les levadas et les sommets volcaniques.',
  },
  render: (args) => ({
    props: args,
    template: `<upala-article-layout [title]="title" [subtitle]="subtitle">
      <div header>
        <p class="text-sm text-stone-500">En-tête de l'article (slot [header]).</p>
      </div>
      <p class="text-stone-700">Corps de l'article projeté dans le slot par défaut.</p>
      <div aside>
        <p class="text-sm text-stone-500">Sommaire (slot [aside]).</p>
      </div>
    </upala-article-layout>`,
  }),
};
export default meta;

type Story = StoryObj<ArticleLayoutComponent>;

export const Default: Story = {};
