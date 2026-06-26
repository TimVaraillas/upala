import type { Meta, StoryObj } from '@storybook/angular';

import { IconComponent } from './icon.component';

const ICON_NAMES = [
  'mountain',
  'map',
  'compass',
  'tent',
  'arrow-right',
  'clock',
  'calendar',
  'tag',
  'menu',
  'close',
] as const;

const meta: Meta<IconComponent> = {
  title: 'Atoms/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: ICON_NAMES },
    size: { control: { type: 'range', min: 12, max: 64, step: 2 } },
  },
  args: { name: 'mountain', size: 32 },
  render: (args) => ({
    props: args,
    template: `<span class="text-moss-700"><upala-icon [name]="name" [size]="size" /></span>`,
  }),
};
export default meta;

type Story = StoryObj<IconComponent>;

export const Default: Story = {};

export const Gallery: Story = {
  render: () => ({
    props: { names: ICON_NAMES },
    template: `
      <div class="grid grid-cols-5 gap-6 text-moss-700">
        @for (n of names; track n) {
          <div class="flex flex-col items-center gap-2">
            <upala-icon [name]="n" [size]="28" />
            <span class="text-xs text-stone-500">{{ n }}</span>
          </div>
        }
      </div>
    `,
  }),
};
