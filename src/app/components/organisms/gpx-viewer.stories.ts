import type { Meta, StoryObj } from '@storybook/angular';

import { GpxViewerComponent } from './gpx-viewer.component';

const meta: Meta<GpxViewerComponent> = {
  title: 'Organisms/GpxViewer',
  component: GpxViewerComponent,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    title: { control: 'text' },
  },
  args: {
    src: '/content/tracks/madeira_1.gpx',
    title: 'Madère — Étape 1',
  },
  render: (args) => ({
    props: args,
    template: `<div class="mx-auto max-w-3xl px-4">
      <upala-gpx-viewer [src]="src" [title]="title" />
    </div>`,
  }),
};
export default meta;

type Story = StoryObj<GpxViewerComponent>;

export const Default: Story = {};
