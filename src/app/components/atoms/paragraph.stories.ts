import type { Meta, StoryObj } from '@storybook/angular';

import { ParagraphComponent } from './paragraph.component';

const meta: Meta<ParagraphComponent> = {
  title: 'Atoms/Paragraph',
  component: ParagraphComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['body', 'lead', 'muted'] },
  },
  args: { variant: 'body' },
  render: (args) => ({
    props: args,
    template: `<upala-paragraph [variant]="variant">
      Les levadas de Madère serpentent à flanc de montagne, suivant le fil de l'eau
      à travers la forêt de laurisilva. Chaque pas révèle un nouveau panorama sur
      l'océan, mille mètres plus bas.
    </upala-paragraph>`,
  }),
};
export default meta;

type Story = StoryObj<ParagraphComponent>;

export const Body: Story = { args: { variant: 'body' } };
export const Lead: Story = { args: { variant: 'lead' } };
export const Muted: Story = { args: { variant: 'muted' } };
