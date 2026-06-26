import type { Meta, StoryObj } from '@storybook/angular';

import { HeadingComponent } from './heading.component';

const meta: Meta<HeadingComponent> = {
  title: 'Atoms/Heading',
  component: HeadingComponent,
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'inline-radio', options: [1, 2, 3, 4] },
  },
  args: { level: 2 },
  render: (args) => ({
    props: args,
    template: `<upala-heading [level]="level">Le sentier des cimes</upala-heading>`,
  }),
};
export default meta;

type Story = StoryObj<HeadingComponent>;

export const Level1: Story = { args: { level: 1 } };
export const Level2: Story = { args: { level: 2 } };
export const Level3: Story = { args: { level: 3 } };
export const Level4: Story = { args: { level: 4 } };

export const Scale: Story = {
  render: () => ({
    template: `
      <upala-heading [level]="1">Titre niveau 1</upala-heading>
      <upala-heading [level]="2">Titre niveau 2</upala-heading>
      <upala-heading [level]="3">Titre niveau 3</upala-heading>
      <upala-heading [level]="4">Titre niveau 4</upala-heading>
    `,
  }),
};
