import type { FormMeta } from './types';

export const formsConfig: FormMeta[] = [
  {
    slug: 'contact-inquiry',
    name: 'Contact & Inquiry',
    description:
      'A clean single-section contact form covering the most common lead-capture and general inquiry scenarios.',
    domain: 'General / Marketing',
    complexity: 'Simple',
    layout: 'Single column, vertical',
    components: ['Input', 'Select', 'Field', 'Button', 'UnsavedChangesBar'],
  },
  {
    slug: 'user-profile',
    name: 'User Profile Settings',
    description:
      'Account settings split into Personal Info and Preferences sections — a staple pattern for any SaaS product.',
    domain: 'SaaS / Product',
    complexity: 'Medium',
    layout: '2 sections, mixed vertical & horizontal fields',
    components: ['Input', 'Select', 'Switch', 'Combobox', 'Field', 'FieldGroup', 'UnsavedChangesBar'],
    hasEditMode: true,
  },
  {
    slug: 'support-ticket',
    name: 'Support Ticket',
    description:
      'Issue reporting form with priority radio, dynamic conditional fields revealed by a Switch, and an inline alert guiding the user.',
    domain: 'IT / SaaS',
    complexity: 'Medium',
    layout: 'Single column with conditional section reveal',
    components: ['Input', 'Select', 'RadioGroup', 'Combobox', 'Checkbox', 'Switch', 'SimpleAlert', 'Field', 'UnsavedChangesBar'],
  },
  {
    slug: 'appointment-booking',
    name: 'Appointment Booking',
    description:
      'Three-stage booking flow: pick a service → choose a date & time slot → confirm patient details.',
    domain: 'Healthcare / Services',
    complexity: 'Medium',
    layout: '3 sections, step-like visual flow',
    components: ['RadioGroup', 'DatePicker', 'Combobox', 'Input', 'SimpleBadge', 'SimpleAlert', 'Field', 'FieldGroup', 'UnsavedChangesBar'],
  },
  {
    slug: 'job-application',
    name: 'Job Application',
    description:
      'Multi-section application form covering personal details, position preferences, and portfolio links — common in career portals.',
    domain: 'HR / Recruitment',
    complexity: 'Medium',
    layout: '3 sections, single column with 2-column grid rows',
    components: ['Input', 'InputGroup', 'Select', 'Combobox', 'DatePicker', 'Checkbox', 'Field', 'FieldGroup', 'UnsavedChangesBar'],
  },
  {
    slug: 'financial-transaction',
    name: 'Financial Transaction',
    description:
      'Compact transaction entry with account lookup, currency-prefixed amount, and a recurring schedule section — typical in accounting or banking UIs.',
    domain: 'Finance / Banking',
    complexity: 'Medium',
    layout: '2 sections, horizontal-label compact layout',
    components: ['Input', 'InputGroup', 'Select', 'RadioGroup', 'DatePicker', 'DateRangePicker', 'TableLookup', 'Field', 'FieldGroup', 'UnsavedChangesBar'],
  },
  {
    slug: 'create-product',
    name: 'Create Product Listing',
    description:
      'Product creation form spanning basic info, pricing & inventory, and shipping — representative of e-commerce admin backends.',
    domain: 'E-Commerce',
    complexity: 'Complex',
    layout: '3 sections, mixed 1-column and 2-column grid',
    components: ['Input', 'InputGroup', 'Select', 'Combobox', 'Switch', 'Checkbox', 'SimpleAlert', 'Field', 'FieldGroup', 'UnsavedChangesBar'],
    hasEditMode: true,
  },
  {
    slug: 'project-kickoff',
    name: 'Project Kickoff',
    description:
      'Project creation spanning basics, team composition, and timeline & budget — covering project management tool patterns.',
    domain: 'Project Management',
    complexity: 'Complex',
    layout: '3 sections, mixed 1-column and 2-column grids',
    components: ['Input', 'InputGroup', 'Select', 'Combobox', 'Checkbox', 'DateRangePicker', 'Field', 'FieldGroup', 'SimpleAlert', 'UnsavedChangesBar'],
  },
  {
    slug: 'search-filter',
    name: 'Search & Filter Panel',
    description:
      'Sidebar-style filter panel with date range, multi-select categories, status checkboxes, and a quick-search input — universal across list and report views.',
    domain: 'Universal Utility',
    complexity: 'Simple',
    layout: 'Compact sidebar panel, single column',
    components: ['Input', 'DateRangePicker', 'Checkbox', 'Combobox', 'RadioGroup', 'Field', 'FieldGroup', 'Button'],
  },
  {
    slug: 'employee-onboarding',
    name: 'Employee Onboarding Stepper',
    description:
      'Four-step stepper covering personal info, employment details, compensation, and IT access — the broadest coverage of the component library in one form.',
    domain: 'HR / Enterprise',
    complexity: 'Complex',
    layout: '4-step stepper with step indicator and per-step sections',
    components: ['Input', 'InputGroup', 'Select', 'Combobox', 'RadioGroup', 'Checkbox', 'Switch', 'DatePicker', 'TableLookup', 'SimpleAlert', 'Field', 'FieldGroup', 'UnsavedChangesBar'],
  },
];

export function getFormBySlug(slug: string): FormMeta | undefined {
  return formsConfig.find((f) => f.slug === slug);
}
