import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { BlogLayoutComponent } from './blog-layout.component';

const meta: Meta<BlogLayoutComponent> = {
  title: 'Templates/BlogLayout',
  component: BlogLayoutComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: {
    title: 'Carnets de route',
    subtitle: 'Récits d’expédition et guides de trek.',
  },
  render: (args) => ({
    props: args,
    template: `<upala-blog-layout [title]="title" [subtitle]="subtitle">
      <div main>
        <p class="text-stone-700">Liste des articles projetée dans le slot [main].</p>
      </div>
      <div sidebar>
        <p class="text-sm text-stone-500">Barre latérale projetée dans le slot [sidebar].</p>
      </div>
    </upala-blog-layout>`,
  }),
};
export default meta;

type Story = StoryObj<BlogLayoutComponent>;

export const Default: Story = {};
