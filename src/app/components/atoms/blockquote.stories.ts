import type { Meta, StoryObj } from '@storybook/angular';

import { BlockquoteComponent } from './blockquote.component';

const meta: Meta<BlockquoteComponent> = {
  title: 'Atoms/Blockquote',
  component: BlockquoteComponent,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'inline-radio', options: ['dark', 'light'] },
    author: { control: 'text' },
  },
  args: { tone: 'dark', author: 'Sylvain Tesson' },
  render: (args) => ({
    props: args,
    template: `<upala-blockquote [author]="author" [tone]="tone">
      Marcher, c'est faire l'expérience du réel.
    </upala-blockquote>`,
  }),
};
export default meta;

type Story = StoryObj<BlockquoteComponent>;

export const Dark: Story = { args: { tone: 'dark' } };

export const Light: Story = {
  args: { tone: 'light' },
  render: (args) => ({
    props: args,
    template: `<div class="bg-stone-800 p-8">
      <upala-blockquote [author]="author" tone="light">
        Marcher, c'est faire l'expérience du réel.
      </upala-blockquote>
    </div>`,
  }),
};

export const WithoutAuthor: Story = {
  render: () => ({
    template: `<upala-blockquote>Le voyage commence là où s'arrête la route.</upala-blockquote>`,
  }),
};
