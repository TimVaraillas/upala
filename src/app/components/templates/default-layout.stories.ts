import type { Meta, StoryObj } from '@storybook/angular';

import { DefaultLayoutComponent } from './default-layout.component';

const meta: Meta<DefaultLayoutComponent> = {
  title: 'Templates/DefaultLayout',
  component: DefaultLayoutComponent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: {
    title: 'À propos',
    subtitle: 'Qui se cache derrière ces récits de sentier.',
  },
  render: (args) => ({
    props: args,
    template: `<upala-default-layout [title]="title" [subtitle]="subtitle">
      <div main class="mx-auto max-w-3xl px-4">
        <p class="text-stone-700">Contenu principal projeté dans le slot [main].</p>
      </div>
    </upala-default-layout>`,
  }),
};
export default meta;

type Story = StoryObj<DefaultLayoutComponent>;

export const WithHeader: Story = {};
export const WithoutHeader: Story = { args: { title: '', subtitle: '' } };
