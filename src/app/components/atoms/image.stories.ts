import type { Meta, StoryObj } from '@storybook/angular';

import { ImageComponent } from './image.component';

const meta: Meta<ImageComponent> = {
  title: 'Atoms/Image',
  component: ImageComponent,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    priority: { control: 'boolean' },
    imgClass: { control: 'text' },
  },
  args: {
    src: 'https://picsum.photos/seed/upala/800/500',
    alt: 'Paysage de montagne',
    width: 800,
    height: 500,
    priority: false,
    imgClass: 'h-full w-full object-cover',
  },
  render: (args) => ({
    props: args,
    template: `<div class="w-96 overflow-hidden rounded-xl border border-sand-200">
      <upala-image [src]="src" [alt]="alt" [width]="width" [height]="height"
                   [priority]="priority" [imgClass]="imgClass" />
    </div>`,
  }),
};
export default meta;

type Story = StoryObj<ImageComponent>;

export const Default: Story = {};
