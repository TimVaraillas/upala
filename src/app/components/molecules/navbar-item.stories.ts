import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { NavbarItemComponent } from './navbar-item.component';

const meta: Meta<NavbarItemComponent> = {
  title: 'Molecules/NavbarItem',
  component: NavbarItemComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  argTypes: {
    link: { control: 'text' },
    exact: { control: 'boolean' },
  },
  args: { link: '/blog', exact: false },
  render: (args) => ({
    props: args,
    template: `<upala-navbar-item [link]="link" [exact]="exact">Carnets</upala-navbar-item>`,
  }),
};
export default meta;

type Story = StoryObj<NavbarItemComponent>;

export const Default: Story = {};

export const Group: Story = {
  render: () => ({
    template: `
      <nav class="flex items-center gap-8">
        <upala-navbar-item link="/" [exact]="true">Accueil</upala-navbar-item>
        <upala-navbar-item link="/blog">Carnets</upala-navbar-item>
        <upala-navbar-item link="/about">Qui sommes-nous ?</upala-navbar-item>
      </nav>
    `,
  }),
};
