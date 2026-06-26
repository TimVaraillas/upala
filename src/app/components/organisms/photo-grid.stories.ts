import type { Meta, StoryObj } from '@storybook/angular';

import { PhotoGridComponent } from './photo-grid.component';
import { PhotoItem } from '../../core/utils/markdown';

const photos: PhotoItem[] = [
  { src: 'https://picsum.photos/seed/p1/800/600', caption: 'Lever de soleil sur les crêtes' },
  { src: 'https://picsum.photos/seed/p2/800/600', caption: 'La levada à flanc de montagne' },
  { src: 'https://picsum.photos/seed/p3/800/600', caption: 'Bivouac au col' },
];

const meta: Meta<PhotoGridComponent> = {
  title: 'Organisms/PhotoGrid',
  component: PhotoGridComponent,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'inline-radio', options: [1, 2, 3] },
    maxHeight: { control: 'text' },
  },
  args: { layout: 3, images: photos, maxHeight: '14rem' },
  render: (args) => ({
    props: args,
    template: `<div class="mx-auto max-w-3xl px-4">
      <upala-photo-grid [layout]="layout" [images]="images" [maxHeight]="maxHeight" />
    </div>`,
  }),
};
export default meta;

type Story = StoryObj<PhotoGridComponent>;

export const Single: Story = { args: { layout: 1, images: [photos[0]], maxHeight: undefined } };
export const Pair: Story = { args: { layout: 2, images: photos.slice(0, 2) } };
export const Triptych: Story = { args: { layout: 3, images: photos } };
