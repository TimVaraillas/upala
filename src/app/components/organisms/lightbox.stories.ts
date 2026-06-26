import type { Meta, StoryObj } from '@storybook/angular';

import { LightboxComponent } from './lightbox.component';
import { PhotoItem } from '../../core/utils/markdown';

const photos: PhotoItem[] = [
  { src: 'https://picsum.photos/seed/l1/1200/800', caption: 'Lever de soleil sur les crêtes' },
  { src: 'https://picsum.photos/seed/l2/1200/800', caption: 'La levada à flanc de montagne' },
  { src: 'https://picsum.photos/seed/l3/1200/800', caption: 'Bivouac au col' },
];

const meta: Meta<LightboxComponent> = {
  title: 'Organisms/Lightbox',
  component: LightboxComponent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { images: photos, startIndex: 0 },
  render: (args) => ({
    props: args,
    template: `<upala-lightbox [images]="images" [startIndex]="startIndex" />`,
  }),
};
export default meta;

type Story = StoryObj<LightboxComponent>;

export const Default: Story = {};
export const SinglePhoto: Story = { args: { images: [photos[0]] } };
export const StartOnSecond: Story = { args: { startIndex: 1 } };
