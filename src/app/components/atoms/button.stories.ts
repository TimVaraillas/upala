import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    type: { control: 'inline-radio', options: ['button', 'submit', 'reset'] },
  },
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `<upala-button [variant]="variant" [size]="size" [type]="type">Découvrir le trek</upala-button>`,
  }),
};
export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };

export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center gap-4">
        <upala-button variant="primary" size="sm">Petit</upala-button>
        <upala-button variant="primary" size="md">Moyen</upala-button>
        <upala-button variant="primary" size="lg">Grand</upala-button>
      </div>
    `,
  }),
};

export const AsLink: Story = {
  render: (args) => ({
    props: args,
    template: `<upala-button [variant]="variant" routerLink="/blog">Voir les carnets</upala-button>`,
  }),
};
