import type { Meta, StoryObj } from '@storybook/angular';

import { ArticleHeaderComponent } from './article-header.component';
import { articleMock } from '../../../mocks/article.mock';

const meta: Meta<ArticleHeaderComponent> = {
  title: 'Organisms/ArticleHeader',
  component: ArticleHeaderComponent,
  tags: ['autodocs'],
  args: { article: articleMock },
  render: (args) => ({
    props: args,
    template: `<div class="mx-auto max-w-3xl px-4"><upala-article-header [article]="article" /></div>`,
  }),
};
export default meta;

type Story = StoryObj<ArticleHeaderComponent>;

export const Default: Story = {};
