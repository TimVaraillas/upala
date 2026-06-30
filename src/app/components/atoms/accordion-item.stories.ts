import type { Meta, StoryObj } from '@storybook/angular';

import { AccordionItemComponent } from './accordion-item.component';

const meta: Meta<AccordionItemComponent> = {
  title: 'Atoms/AccordionItem',
  component: AccordionItemComponent,
  tags: ['autodocs'],
  args: { question: 'Peut-on faire le trek en solo ?' },
  render: (args) => ({
    props: args,
    template: `<div class="mx-auto max-w-2xl px-4">
      <upala-accordion-item [question]="question">
        <p class="text-stone-600">
          Oui, c'est tout à fait possible. Le sentier est régulièrement fréquenté et
          les campements nombreux, on ne se retrouve jamais totalement isolé.
        </p>
      </upala-accordion-item>
    </div>`,
  }),
};
export default meta;

type Story = StoryObj<AccordionItemComponent>;

export const Default: Story = {};
