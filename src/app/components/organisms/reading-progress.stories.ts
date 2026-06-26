import type { Meta, StoryObj } from '@storybook/angular';

import { ReadingProgressComponent } from './reading-progress.component';

const meta: Meta<ReadingProgressComponent> = {
  title: 'Organisms/ReadingProgress',
  component: ReadingProgressComponent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  render: () => ({
    template: `
      <upala-reading-progress />
      <div class="space-y-4 p-8 text-stone-600">
        <p class="text-sm">
          La barre fixe en haut suit la progression de lecture. Faites défiler la
          page (dans le canvas) pour la voir avancer.
        </p>
        @for (i of placeholder; track i) {
          <p>Paragraphe {{ i }} — contenu de remplissage pour permettre le défilement.</p>
        }
      </div>
    `,
    props: { placeholder: Array.from({ length: 40 }, (_, i) => i + 1) },
  }),
};
export default meta;

type Story = StoryObj<ReadingProgressComponent>;

export const Default: Story = {};
