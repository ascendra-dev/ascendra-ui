import type { DialogMeta } from './types';

export const dialogsConfig: DialogMeta[] = [
  // ─── Confirmation ─────────────────────────────────────────────────────────────
  {
    slug: 'archive-project',
    name: 'Archive Project',
    description:
      'Confirms archiving a project with a bullet list of consequences before the user commits.',
    type: 'Confirmation',
    components: ['Dialog', 'Button'],
  },
  {
    slug: 'transfer-ownership',
    name: 'Transfer Ownership',
    description:
      'High-stakes confirmation gated by a checkbox acknowledgement that must be checked before the CTA enables.',
    type: 'Confirmation',
    components: ['Dialog', 'Checkbox', 'Button'],
  },

  // ─── Destructive ──────────────────────────────────────────────────────────────
  {
    slug: 'delete-record',
    name: 'Delete Record',
    description:
      'Standard single-record delete with a brief consequence note and a destructive CTA.',
    type: 'Destructive',
    components: ['Dialog', 'Button'],
  },
  {
    slug: 'delete-account',
    name: 'Delete Account',
    description:
      'Maximum-stakes delete gated by a typed confirmation — the user must type DELETE before the button unlocks.',
    type: 'Destructive',
    components: ['Dialog', 'Input', 'Field', 'Button'],
  },

  // ─── Input ────────────────────────────────────────────────────────────────────
  {
    slug: 'rename-item',
    name: 'Rename Item',
    description:
      'Single-field rename with the current name pre-filled — the simplest possible input dialog.',
    type: 'Input',
    components: ['Dialog', 'Input', 'Field', 'Button'],
  },
  {
    slug: 'add-note',
    name: 'Add Note',
    description:
      'Textarea capture for a short note or comment visible to all team members.',
    type: 'Input',
    components: ['Dialog', 'InputGroup', 'Field', 'Button'],
  },
  {
    slug: 'invite-member',
    name: 'Invite Member',
    description:
      'Email input with a role selector — covers the common invite-to-team pattern.',
    type: 'Input',
    components: ['Dialog', 'Input', 'Select', 'Field', 'Button'],
  },
  {
    slug: 'change-password',
    name: 'Change Password',
    description:
      'Three-field password update covering current, new, and confirmation — the account security staple.',
    type: 'Input',
    components: ['Dialog', 'Input', 'Field', 'Button'],
  },

  // ─── Alert ────────────────────────────────────────────────────────────────────
  {
    slug: 'session-expired',
    name: 'Session Expired',
    description:
      'Header-only layout with no body — demonstrates the minimal header + footer structure.',
    type: 'Alert',
    components: ['Dialog', 'Button'],
  },
  {
    slug: 'payment-failed',
    name: 'Payment Failed',
    description:
      'Billing error alert with two actionable next steps in the footer.',
    type: 'Alert',
    components: ['Dialog', 'SimpleAlert', 'Button'],
  },

  // ─── Feature ──────────────────────────────────────────────────────────────────
  {
    slug: 'feature-announcement',
    name: 'Feature Announcement',
    description:
      "What's New style modal with a feature highlight list and a primary explore CTA.",
    type: 'Feature',
    components: ['Dialog', 'Button'],
  },
  {
    slug: 'upgrade-required',
    name: 'Upgrade Required',
    description:
      "Premium feature gate with a \"don't show again\" checkbox — the upsell dialog pattern.",
    type: 'Feature',
    components: ['Dialog', 'Checkbox', 'Button'],
  },
];

export function getDialogBySlug(slug: string): DialogMeta | undefined {
  return dialogsConfig.find((d) => d.slug === slug);
}
