import type { Meta, StoryObj } from '@storybook/angular';

import { AuthorInfoComponent } from './author-info.component';

const meta: Meta<AuthorInfoComponent> = {
  title: 'Molecules/AuthorInfo',
  component: AuthorInfoComponent,
  tags: ['autodocs'],
  argTypes: {
    author: { control: 'text' },
    date: { control: 'text' },
    readingTime: { control: 'number' },
  },
  args: {
    author: 'Un pas après l’autre',
    date: '2025-09-14',
    readingTime: 12,
  },
  render: (args) => ({
    props: args,
    template: `<upala-author-info [author]="author" [date]="date" [readingTime]="readingTime" />`,
  }),
};
export default meta;

type Story = StoryObj<AuthorInfoComponent>;

export const Default: Story = {};
export const WithoutReadingTime: Story = { args: { readingTime: null } };
export const CustomAuthor: Story = { args: { author: 'Camille Dufour' } };
