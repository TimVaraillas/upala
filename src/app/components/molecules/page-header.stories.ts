import type { Meta, StoryObj } from '@storybook/angular';

import { PageHeaderComponent } from './page-header.component';

const meta: Meta<PageHeaderComponent> = {
  title: 'Molecules/PageHeader',
  component: PageHeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: {
    title: 'Carnets de route',
    subtitle: 'Récits d’expédition et guides de trek, du sentier balisé au hors-piste.',
  },
  render: (args) => ({
    props: args,
    template: `<upala-page-header [title]="title" [subtitle]="subtitle" />`,
  }),
};
export default meta;

type Story = StoryObj<PageHeaderComponent>;

export const Default: Story = {};
export const TitleOnly: Story = { args: { subtitle: '' } };
