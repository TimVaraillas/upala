import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { ArticleListComponent } from './article-list.component';
import { articleSummariesMock } from '../../../mocks/article.mock';

const meta: Meta<ArticleListComponent> = {
  title: 'Organisms/ArticleList',
  component: ArticleListComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  argTypes: {
    emptyMessage: { control: 'text' },
  },
  args: { articles: articleSummariesMock, emptyMessage: 'Aucun carnet pour le moment.' },
  render: (args) => ({
    props: args,
    template: `<div class="mx-auto max-w-5xl px-4">
      <upala-article-list [articles]="articles" [emptyMessage]="emptyMessage" />
    </div>`,
  }),
};
export default meta;

type Story = StoryObj<ArticleListComponent>;

export const Default: Story = {};
export const Empty: Story = { args: { articles: [] } };
