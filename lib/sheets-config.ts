import type { SheetMeta } from './types';

export const sheetsConfig: SheetMeta[] = [
  {
    slug: 'employee-profile',
    name: 'Employee Profile',
    description:
      'Full HR record with tabbed layout — employment details, contact info, bio, and work history. Includes an active/inactive status toggle.',
    type: 'Detail',
    domain: 'HR',
    components: ['Sheet', 'SimpleBadge', 'NameAvatar', 'Switch', 'Item'],
  },
  {
    slug: 'order-details',
    name: 'Order Details',
    description:
      'E-commerce order breakdown — order meta, line items with quantities and prices, shipping address, and a running total with tax.',
    type: 'Detail',
    domain: 'E-commerce',
    components: ['Sheet', 'Item', 'SimpleBadge', 'Button'],
  },
  {
    slug: 'support-ticket',
    name: 'Support Ticket',
    description:
      'Ticket detail with parallel meta fields followed by a chronological activity timeline — comments, status changes, and actor avatars.',
    type: 'Activity',
    domain: 'SaaS',
    components: ['Sheet', 'Item', 'NameAvatar', 'StatusDot', 'SimpleBadge', 'Button'],
  },
  {
    slug: 'notification-preferences',
    name: 'Notification Preferences',
    description:
      'Grouped switch rows across Email, Push, and In-App channels — each with a label and supporting description.',
    type: 'Settings',
    domain: 'SaaS',
    components: ['Sheet', 'Switch', 'Button'],
  },
  {
    slug: 'customer-profile',
    name: 'Customer Profile',
    description:
      'CRM snapshot — avatar + name hero, parallel contact and account fields (plan, ARR, seats, status), and a recent activity list.',
    type: 'Preview',
    domain: 'CRM',
    components: ['Sheet', 'NameAvatar', 'SimpleBadge', 'StatusDot', 'Item', 'Button'],
  },
  {
    slug: 'invoice-preview',
    name: 'Invoice Preview',
    description:
      'Finance document at a glance — bill-to details, parallel invoice meta, line items, subtotal/tax/total summary, and an overdue alert.',
    type: 'Preview',
    domain: 'Finance',
    components: ['Sheet', 'Item', 'SimpleBadge', 'SimpleAlert', 'Button'],
  },
  {
    slug: 'project-overview',
    name: 'Project Overview',
    description:
      'PM record with tabbed layout — Overview shows key project meta and a milestone list with status dots; Members tab lists the team.',
    type: 'Detail',
    domain: 'Project Management',
    components: ['Sheet', 'NameAvatar', 'SimpleBadge', 'StatusDot', 'Item', 'Button'],
  },
  {
    slug: 'audit-log-entry',
    name: 'Audit Log Entry',
    description:
      'System event detail — actor, resource, method, and timestamp in parallel key-value layout, a compliance alert, and a monospace payload block.',
    type: 'Detail',
    domain: 'System / Admin',
    components: ['Sheet', 'SimpleBadge', 'SimpleAlert', 'Button'],
  },
  {
    slug: 'product-details',
    name: 'Product Details',
    description:
      'Catalog item snapshot — image placeholder, parallel spec grid (category, price, stock, weight, battery life), vendor info, and tags.',
    type: 'Preview',
    domain: 'Catalog',
    components: ['Sheet', 'SimpleBadge', 'StatusDot', 'Button'],
  },
  {
    slug: 'account-settings',
    name: 'Account Settings',
    description:
      'Privacy, security, and notification controls in grouped switch rows — includes a "Recommended" badge on the two-factor authentication toggle.',
    type: 'Settings',
    domain: 'Platform',
    components: ['Sheet', 'Switch', 'SimpleBadge', 'Button'],
  },
];

export function getSheetBySlug(slug: string): SheetMeta | undefined {
  return sheetsConfig.find((s) => s.slug === slug);
}
