import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { CalloutComponent } from './callout.component';

const meta: Meta<CalloutComponent> = {
  title: 'Atoms/Callout',
  component: CalloutComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [CalloutComponent] })],
  argTypes: {
    variant: { control: 'inline-radio', options: ['info', 'tip', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
  },
  args: { variant: 'tip', title: 'Petit conseil' },
  render: (args) => ({
    props: args,
    template: `<div class="mx-auto max-w-2xl px-4">
      <upala-callout [variant]="variant" [title]="title">
        <p>Réfléchissez au sens dans lequel vous souhaitez parcourir le sentier
        ainsi qu'au nombre de jours que vous prévoyez avant de réserver.</p>
      </upala-callout>
    </div>`,
  }),
};
export default meta;

type Story = StoryObj<CalloutComponent>;

export const Tip: Story = { args: { variant: 'tip', title: 'Petit conseil' } };
export const Info: Story = { args: { variant: 'info', title: 'Bon à savoir' } };
export const Success: Story = { args: { variant: 'success', title: 'Réservation confirmée' } };
export const Warning: Story = { args: { variant: 'warning', title: 'Les places partent vite' } };
export const Danger: Story = { args: { variant: 'danger', title: 'Zone exposée' } };
