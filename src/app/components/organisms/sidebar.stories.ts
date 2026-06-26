import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { SidebarComponent } from './sidebar.component';
import { articleSummariesMock } from '../../../mocks/article.mock';
import { DestinationNode } from '../../core/models/article.model';

const destinations: DestinationNode[] = [
  {
    country: 'Portugal',
    count: 3,
    regions: [
      { region: 'Madère', count: 2 },
      { region: 'Açores', count: 1 },
    ],
  },
  {
    country: 'France',
    count: 4,
    regions: [
      { region: 'Alpes', count: 2 },
      { region: 'Corse', count: 2 },
    ],
  },
];

const tags = [
  { tag: 'Trek', count: 5 },
  { tag: 'Autonomie', count: 3 },
  { tag: 'Montagne', count: 4 },
  { tag: 'Conseils', count: 2 },
];

const meta: Meta<SidebarComponent> = {
  title: 'Organisms/Sidebar',
  component: SidebarComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideRouter([])] })],
  args: {
    tags,
    recent: articleSummariesMock,
    activeTags: [],
    destinations,
    activeCountry: '',
    activeRegion: '',
  },
  render: (args) => ({
    props: args,
    template: `<div class="max-w-xs">
      <upala-sidebar
        [tags]="tags"
        [recent]="recent"
        [activeTags]="activeTags"
        [destinations]="destinations"
        [activeCountry]="activeCountry"
        [activeRegion]="activeRegion"
      />
    </div>`,
  }),
};
export default meta;

type Story = StoryObj<SidebarComponent>;

export const Default: Story = {};

export const WithActiveFilters: Story = {
  args: { activeTags: ['Trek'], activeCountry: 'Portugal', activeRegion: 'Madère' },
};

export const WithoutDestinations: Story = { args: { destinations: [] } };
