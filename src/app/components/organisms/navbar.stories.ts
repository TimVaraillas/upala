import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { NavbarComponent } from './navbar.component';

const meta: Meta<NavbarComponent> = {
  title: 'Organisms/Navbar',
  component: NavbarComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  parameters: { layout: 'fullscreen' },
  render: () => ({
    template: `<upala-navbar />`,
  }),
};
export default meta;

type Story = StoryObj<NavbarComponent>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
