import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { FooterComponent } from './footer.component';

const meta: Meta<FooterComponent> = {
  title: 'Organisms/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  render: () => ({
    template: `<upala-footer />`,
  }),
};
export default meta;

type Story = StoryObj<FooterComponent>;

export const Default: Story = {};
