import type { Meta, StoryObj } from '@storybook/angular';

import { LogoComponent } from './logo.component';

const meta: Meta<LogoComponent> = {
  title: 'Atoms/Logo',
  component: LogoComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['full', 'inline', 'type'] },
    alt: { control: 'text' },
    imgClass: { control: 'text' },
    fill: { control: 'text' },
  },
  args: { variant: 'inline', alt: 'Upala', imgClass: 'h-10 w-auto', fill: null },
  render: (args) => ({
    props: args,
    template: `<upala-logo [variant]="variant" [alt]="alt" [imgClass]="imgClass" [fill]="fill" />`,
  }),
};
export default meta;

type Story = StoryObj<LogoComponent>;

export const Inline: Story = { args: { variant: 'inline' } };
export const Full: Story = { args: { variant: 'full', imgClass: 'h-32 w-auto' } };
export const Type: Story = { args: { variant: 'type', imgClass: 'h-8 w-auto' } };

export const Tinted: Story = {
  args: { variant: 'inline', imgClass: 'h-10 w-auto', fill: 'bg-moss-700' },
};
