import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb.component';

const meta: Meta<BreadcrumbComponent> = {
  title: 'Molecules/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  argTypes: {
    items: { control: 'object' },
  },
  args: {
    items: [
      { label: 'Accueil', link: '/' },
      { label: 'Carnets', link: '/blog' },
      { label: 'Madère en autonomie' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<upala-breadcrumb [items]="items" />`,
  }),
};
export default meta;

type Story = StoryObj<BreadcrumbComponent>;

export const Default: Story = {};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Accueil', link: '/' },
      { label: 'À propos' },
    ],
  },
};
