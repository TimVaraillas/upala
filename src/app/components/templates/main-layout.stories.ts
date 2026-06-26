import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';

const meta: Meta<MainLayoutComponent> = {
  title: 'Templates/MainLayout',
  component: MainLayoutComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  parameters: { layout: 'fullscreen' },
  render: () => ({
    template: `<upala-main-layout />`,
  }),
};
export default meta;

type Story = StoryObj<MainLayoutComponent>;

export const Default: Story = {};
