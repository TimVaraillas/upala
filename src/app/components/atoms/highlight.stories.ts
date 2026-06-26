import type { Meta, StoryObj } from '@storybook/angular';

import { HighlightComponent } from './highlight.component';

const meta: Meta<HighlightComponent> = {
  title: 'Atoms/Highlight',
  component: HighlightComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['marker', 'underline', 'badge', 'bold'] },
    tone: { control: 'inline-radio', options: ['moss', 'sand', 'amber'] },
  },
  args: { variant: 'marker', tone: 'moss' },
  render: (args) => ({
    props: args,
    template: `<p class="text-base text-stone-700">
      Le sentier grimpe vers le
      <upala-highlight [variant]="variant" [tone]="tone">Pico Ruivo</upala-highlight>,
      point culminant de l'île.
    </p>`,
  }),
};
export default meta;

type Story = StoryObj<HighlightComponent>;

export const Marker: Story = { args: { variant: 'marker' } };
export const Underline: Story = { args: { variant: 'underline' } };
export const Badge: Story = { args: { variant: 'badge' } };
export const Bold: Story = { args: { variant: 'bold' } };

export const AllTones: Story = {
  render: () => ({
    template: `
      <div class="space-y-2 text-base text-stone-700">
        <p><upala-highlight tone="moss" variant="marker">Moss</upala-highlight></p>
        <p><upala-highlight tone="sand" variant="marker">Sand</upala-highlight></p>
        <p><upala-highlight tone="amber" variant="marker">Amber</upala-highlight></p>
      </div>
    `,
  }),
};
