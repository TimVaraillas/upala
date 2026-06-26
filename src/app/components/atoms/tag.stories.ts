import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { TagComponent } from './tag.component';

const meta: Meta<TagComponent> = {
  title: 'Atoms/Tag',
  component: TagComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  argTypes: {
    label: { control: 'text' },
    activeTags: { control: 'object' },
  },
  args: { label: 'Trek', activeTags: [] },
  render: (args) => ({
    props: args,
    template: `<upala-tag [label]="label" [activeTags]="activeTags" />`,
  }),
};
export default meta;

type Story = StoryObj<TagComponent>;

export const Inactive: Story = { args: { activeTags: [] } };
export const Active: Story = { args: { label: 'Trek', activeTags: ['Trek'] } };

export const Group: Story = {
  render: () => ({
    props: { tags: ['Trek', 'Autonomie', 'Montagne', 'Conseils'], active: ['Autonomie'] },
    template: `
      <div class="flex flex-wrap gap-2">
        @for (t of tags; track t) {
          <upala-tag [label]="t" [activeTags]="active" />
        }
      </div>
    `,
  }),
};
