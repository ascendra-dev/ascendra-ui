import type { DrawerMeta } from './types';

export const drawersConfig: DrawerMeta[] = [
  {
    slug: 'quick-actions',
    name: 'Quick Actions',
    description:
      'Touch-friendly action sheet with five entity operations — Rename, Duplicate, Share, Archive, and Delete — each as a full-width tappable row.',
    type: 'Action',
    domain: 'General',
    components: ['Drawer', 'Item', 'Button'],
  },
  {
    slug: 'smart-filter',
    name: 'Smart Filter',
    description:
      'Two snap points: partially open (40%) shows active filter summary with chips; fully open shows the complete filter form with switches and a category list.',
    type: 'Panel',
    domain: 'E-commerce',
    components: ['Drawer', 'Switch', 'Item', 'SimpleBadge', 'Button'],
  },
  {
    slug: 'share-sheet',
    name: 'Share Sheet',
    description:
      'Icon grid of share destinations — Copy Link, Email, Slack, Export PDF, Export CSV, and Open in Browser. Copy Link shows an inline "Copied!" confirmation.',
    type: 'Action',
    domain: 'General',
    components: ['Drawer', 'Button'],
  },
  {
    slug: 'event-preview',
    name: 'Event Preview',
    description:
      'Two snap points: peeked (35%) shows event title, time, and location; expanded (85%) reveals the full description, attendee list, and action button.',
    type: 'Preview',
    domain: 'Calendar',
    components: ['Drawer', 'NameAvatar', 'StatusDot', 'Button'],
  },
  {
    slug: 'media-attachment',
    name: 'Media Attachment',
    description:
      'File detail panel — image placeholder, then a parallel key-value grid covering filename, type, size, dimensions, uploader, and date added.',
    type: 'Preview',
    domain: 'File Management',
    components: ['Drawer', 'Button'],
  },
  {
    slug: 'assign-task',
    name: 'Assign Task',
    description:
      'Search input followed by a scrollable team member list. Selection is highlighted with a checkmark. Confirm button stays disabled until a member is chosen.',
    type: 'Input',
    domain: 'Project Management',
    components: ['Drawer', 'Input', 'NameAvatar', 'Item', 'Button'],
  },
  {
    slug: 'notification-center',
    name: 'Notification Center',
    description:
      'Right-side panel listing recent notifications with unread dots. "Mark all read" clears the indicators. Demonstrates the drawer opening from the right edge.',
    type: 'Panel',
    domain: 'SaaS',
    components: ['Drawer', 'BubbleBadge', 'StatusDot', 'Button'],
  },
  {
    slug: 'danger-zone',
    name: 'Danger Zone',
    description:
      'Mobile-optimized destructive confirmation — consequences list, typed verification input. Delete button unlocks only after the user types "DELETE".',
    type: 'Action',
    domain: 'Settings',
    components: ['Drawer', 'Input', 'SimpleAlert', 'Button'],
  },
];

export function getDrawerBySlug(slug: string): DrawerMeta | undefined {
  return drawersConfig.find((d) => d.slug === slug);
}
