import type { Meta, StoryObj } from '@storybook/angular';

import { TableOfContentsComponent } from './table-of-contents.component';
import { TocEntry } from '../../core/utils/markdown';

const entries: TocEntry[] = [
  { id: 'preparatifs', text: 'Préparatifs', level: 2 },
  { id: 'materiel', text: 'Matériel', level: 3 },
  { id: 'itineraire', text: 'Itinéraire', level: 2 },
  { id: 'etape-1', text: 'Étape 1 — Porto Moniz', level: 3 },
  { id: 'etape-2', text: 'Étape 2 — Fanal', level: 3 },
  { id: 'conclusion', text: 'Conclusion', level: 2 },
];

const meta: Meta<TableOfContentsComponent> = {
  title: 'Organisms/TableOfContents',
  component: TableOfContentsComponent,
  tags: ['autodocs'],
  argTypes: {
    entries: { control: 'object' },
  },
  args: { entries },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-xs"><upala-table-of-contents [entries]="entries" /></div>`,
  }),
};
export default meta;

type Story = StoryObj<TableOfContentsComponent>;

export const Default: Story = {};
export const Empty: Story = { args: { entries: [] } };
