import type { Meta, StoryObj } from '@storybook/angular';

import { FaqComponent } from './faq.component';
import { FaqItem } from '../../core/utils/markdown';

const items: FaqItem[] = [
  {
    question: 'Peut-on le faire seul ?',
    answerHtml:
      '<p>Oui, le West Coast Trail peut se faire en solo. Les campements sont nombreux ' +
      'et la fréquentation régulière, on ne se retrouve jamais totalement isolé.</p>',
  },
  {
    question: 'Y a-t-il du réseau ?',
    answerHtml:
      '<p>Le réseau est très variable. Il ne doit jamais être considéré comme un moyen ' +
      'de sécurité : prévenez vos proches et emportez une balise GPS si possible.</p>',
  },
  {
    question: 'Où trouve-t-on de l’eau ?',
    answerHtml:
      '<p>L’eau est disponible tout au long du parcours, potable après filtration ou ' +
      'purification.</p>',
  },
];

const meta: Meta<FaqComponent> = {
  title: 'Organisms/Faq',
  component: FaqComponent,
  tags: ['autodocs'],
  args: { items },
  render: (args) => ({
    props: args,
    template: `<div class="mx-auto max-w-3xl px-4">
      <upala-faq [items]="items" />
    </div>`,
  }),
};
export default meta;

type Story = StoryObj<FaqComponent>;

export const Default: Story = {};
