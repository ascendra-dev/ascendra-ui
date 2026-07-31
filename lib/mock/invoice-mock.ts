export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Cancelled';

export interface Invoice {
  id: string;
  merchantId: string;
  clientId: string;
  clientName: string;
  invoiceNumber: string;
  title: string;
  description?: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  issuedAt: string;
  paidAt?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface InvoiceListData {
  data: Invoice[];
  meta: PaginationMeta;
}

// ─── Dataset ──────────────────────────────────────────────────────────────────

const ALL_INVOICES: Invoice[] = [
  {
    id: '1', merchantId: 'm1', clientId: 'c1',
    invoiceNumber: 'INV-001', title: 'Tuition Fee — Term 1',
    clientName: 'Ahmed Khan', amount: 12000,
    dueDate: '2024-02-15', status: 'Paid', issuedAt: '2024-01-15', paidAt: '2024-02-10',
  },
  {
    id: '2', merchantId: 'm1', clientId: 'c2',
    invoiceNumber: 'INV-002', title: 'Registration Fee',
    clientName: 'Sara Ali', amount: 8500,
    dueDate: '2024-02-20', status: 'Pending', issuedAt: '2024-01-20',
  },
  {
    id: '3', merchantId: 'm1', clientId: 'c3',
    invoiceNumber: 'INV-003', title: 'Tuition Fee — Term 1',
    clientName: 'Usman Raza', amount: 15000,
    dueDate: '2024-01-30', status: 'Overdue', issuedAt: '2024-01-01',
  },
  {
    id: '4', merchantId: 'm1', clientId: 'c4',
    invoiceNumber: 'INV-004', title: 'Transport Fee',
    clientName: 'Fatima Malik', amount: 9200,
    dueDate: '2024-02-28', status: 'Paid', issuedAt: '2024-01-28', paidAt: '2024-02-25',
  },
  {
    id: '5', merchantId: 'm1', clientId: 'c5',
    invoiceNumber: 'INV-005', title: 'Activity & Lab Fee',
    clientName: 'Bilal Sheikh', amount: 22000,
    dueDate: '2024-02-10', status: 'Cancelled', issuedAt: '2024-01-10',
    description: 'Cancelled due to student withdrawal.',
  },
  {
    id: '6', merchantId: 'm1', clientId: 'c6',
    invoiceNumber: 'INV-006', title: 'Uniform & Books',
    clientName: 'Ayesha Noor', amount: 5500,
    dueDate: '2024-03-01', status: 'Pending', issuedAt: '2024-02-01',
  },
  {
    id: '7', merchantId: 'm1', clientId: 'c7',
    invoiceNumber: 'INV-007', title: 'Tuition Fee — Term 2',
    clientName: 'Hassan Tariq', amount: 18500,
    dueDate: '2024-01-25', status: 'Overdue', issuedAt: '2023-12-25',
  },
  {
    id: '8', merchantId: 'm1', clientId: 'c8',
    invoiceNumber: 'INV-008', title: 'Exam Fee',
    clientName: 'Zara Qureshi', amount: 11000,
    dueDate: '2024-03-15', status: 'Paid', issuedAt: '2024-02-15', paidAt: '2024-03-10',
  },
  {
    id: '9', merchantId: 'm1', clientId: 'c9',
    invoiceNumber: 'INV-009', title: 'Tuition Fee — Term 1',
    clientName: 'Kamran Mirza', amount: 62000,
    dueDate: '2024-02-05', status: 'Paid', issuedAt: '2024-01-05', paidAt: '2024-02-03',
  },
  {
    id: '10', merchantId: 'm1', clientId: 'c10',
    invoiceNumber: 'INV-010', title: 'Lab Fee — Class 10',
    clientName: 'Nadia Hussain', amount: 4800,
    dueDate: '2024-03-20', status: 'Pending', issuedAt: '2024-02-20',
  },
  {
    id: '11', merchantId: 'm1', clientId: 'c11',
    invoiceNumber: 'INV-011', title: 'Transport Fee',
    clientName: 'Tariq Mahmood', amount: 7200,
    dueDate: '2024-01-20', status: 'Overdue', issuedAt: '2023-12-20',
  },
  {
    id: '12', merchantId: 'm1', clientId: 'c12',
    invoiceNumber: 'INV-012', title: 'Tuition Fee — Term 3',
    clientName: 'Sana Baig', amount: 15000,
    dueDate: '2024-04-01', status: 'Pending', issuedAt: '2024-03-01',
  },
  {
    id: '13', merchantId: 'm1', clientId: 'c13',
    invoiceNumber: 'INV-013', title: 'Registration + Tuition',
    clientName: 'Imran Chaudhry', amount: 78000,
    dueDate: '2024-02-01', status: 'Paid', issuedAt: '2024-01-02', paidAt: '2024-01-30',
  },
  {
    id: '14', merchantId: 'm1', clientId: 'c14',
    invoiceNumber: 'INV-014', title: 'Exam Preparatory Fee',
    clientName: 'Rabia Farooq', amount: 3200,
    dueDate: '2024-03-10', status: 'Cancelled', issuedAt: '2024-02-10',
    description: 'Cancelled — duplicate invoice.',
  },
  {
    id: '15', merchantId: 'm1', clientId: 'c15',
    invoiceNumber: 'INV-015', title: 'Activity Fee — Q2',
    clientName: 'Omer Siddiqui', amount: 6500,
    dueDate: '2024-04-15', status: 'Pending', issuedAt: '2024-03-15',
  },
];

// ─── Query-aware filters ───────────────────────────────────────────────────────

function filterByQuery(queryId: string): Invoice[] {
  switch (queryId) {
    case 'all-active':
      return ALL_INVOICES.filter((i) => i.status === 'Pending' || i.status === 'Overdue');
    case 'last-3-months': {
      const cutoff = new Date('2024-01-15');
      return ALL_INVOICES.filter((i) => new Date(i.issuedAt) >= cutoff);
    }
    case 'user-high-value':
      return ALL_INVOICES.filter((i) => i.amount >= 50000);
    case 'user-class-10':
      return ALL_INVOICES.filter((i) => i.title.toLowerCase().includes('class 10'));
    default:
      return ALL_INVOICES;
  }
}

// ─── Mock fetch ───────────────────────────────────────────────────────────────

const ERROR_RATE = 0.08;
const PAGE_SIZE = 5;

function delay(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

export async function fetchMockInvoices(
  queryId: string,
  batch = 1,
  pageSize = PAGE_SIZE,
): Promise<InvoiceListData> {
  await delay(700 + Math.random() * 600);

  if (Math.random() < ERROR_RATE) {
    throw new Error('Failed to load invoices. The mock service rolled a bad number.');
  }

  const allRows = filterByQuery(queryId);
  const totalPages = Math.max(1, Math.ceil(allRows.length / pageSize));
  const safeBatch = Math.min(Math.max(1, batch), totalPages);
  const start = (safeBatch - 1) * pageSize;
  const pageRows = allRows.slice(start, start + pageSize);

  return {
    data: pageRows,
    meta: { page: safeBatch, limit: pageSize, total: allRows.length, totalPages },
  };
}

// ─── Invoice Queries ───────────────────────────────────────────────────────────

import type { QueryDef } from '@/ascendra-ui';

export const PRESET_QUERIES: QueryDef[] = [
  {
    id: 'all-active',
    group: 'query',
    title: 'All Active Invoices',
    description: 'Currently pending or overdue',
  },
  {
    id: 'last-3-months',
    group: 'query',
    title: 'Last 3 Months',
    description: 'Invoices from the past 90 days',
  },
  // ── 1-column filters ─────────────────────────────────────────────────────
  {
    id: 'by-status',
    group: 'filter',
    title: 'Invoices by Status',
    description: 'Filter invoices by one or more statuses',
    params: [
      {
        name: 'statuses',
        label: 'Statuses',
        type: 'multiselect',
        required: true,
        mandatory: true,
        options: [
          { value: 'Paid', label: 'Paid' },
          { value: 'Pending', label: 'Pending' },
          { value: 'Overdue', label: 'Overdue' },
          { value: 'Cancelled', label: 'Cancelled' },
        ],
      },
    ],
  },
  {
    id: 'by-date-range',
    group: 'filter',
    title: 'Invoices by Date Range',
    description: 'Filter by custom issue date window',
    params: [
      {
        name: 'dateRange',
        label: 'Date Range',
        type: 'daterange',
        required: true,
        mandatory: true,
      },
    ],
  },

  // ── 2-column filter — tests sm:1 md:2 lg:2 + mixed spans ────────────────
  {
    id: 'by-client',
    group: 'filter',
    title: 'By Client & Student',
    description: 'Search by client name, student, grade level, and payment status',
    columns: { sm: 1, md: 2, lg: 2 },
    params: [
      {
        name: 'clientName',
        label: 'Client Name',
        type: 'text',
        placeholder: 'e.g. Ahmed Family',
        optional: true,
        span: 1,
        info: 'Partial match',
        description: 'Matches any part of the client display name',
      },
      {
        name: 'studentName',
        label: 'Student Name',
        type: 'text',
        placeholder: 'e.g. Hamza',
        optional: true,
        span: 1,
        info: 'Partial match',
      },
      { _type: 'section', title: 'Filters' },
      {
        name: 'gradeLevel',
        label: 'Grade Level',
        type: 'select',
        optional: true,
        span: 1,
        options: [
          { value: 'class-9', label: 'Class 9' },
          { value: 'class-10', label: 'Class 10' },
          { value: 'class-11', label: 'Class 11' },
          { value: 'class-12', label: 'Class 12' },
        ],
      },
      {
        name: 'paymentStatus',
        label: 'Payment Status',
        type: 'select',
        optional: true,
        span: 1,
        options: [
          { value: 'Paid', label: 'Paid' },
          { value: 'Pending', label: 'Pending' },
          { value: 'Overdue', label: 'Overdue' },
        ],
      },
      {
        name: 'issueDateRange',
        label: 'Issue Date Range',
        type: 'daterange',
        optional: true,
        span: 'full',
        info: 'Optional date window',
        description: 'Narrow results to a specific issue date window',
      },
    ],
  },

  // ── 3-column filter — tests sm:1 md:2 lg:3 + span 1 / 2 / full ─────────
  {
    id: 'advanced-filter',
    group: 'filter',
    title: 'Advanced Invoice Filter',
    description: 'Comprehensive filter covering all parameter types',
    info: 'All active filters use AND logic — results must match every condition you set.',
    columns: { sm: 1, md: 2, lg: 3 },
    params: [
      // Row 1 (lg): [clientName][invoiceNumber][primaryStatus]
      {
        name: 'clientName',
        label: 'Client Name',
        type: 'text',
        placeholder: 'e.g. Ahmed Family',
        required: false,
        optional: true,
        span: 1,
        minLength: 2,
        maxLength: 50,
        info: 'Partial match',
        description: 'Matches any part of the client display name',
      },
      {
        name: 'invoiceNumber',
        label: 'Invoice Number',
        type: 'text',
        placeholder: 'INV-001',
        required: true,
        mandatory: true,
        span: 1,
        maxLength: 20,
        info: 'Exact reference match',
      },
      {
        name: 'primaryStatus',
        label: 'Invoice Status',
        type: 'select',
        required: true,
        mandatory: true,
        span: 1,
        info: ' ',
        options: [
          { value: 'Paid', label: 'Paid' },
          { value: 'Pending', label: 'Pending' },
          { value: 'Overdue', label: 'Overdue' },
          { value: 'Cancelled', label: 'Cancelled' },
        ],
      },
      // Row 2 (lg): [minAmount][maxAmount][issuedFrom]
      {
        name: 'minAmount',
        label: 'Min Amount (PKR)',
        type: 'number',
        placeholder: '0',
        required: false,
        optional: true,
        span: 1,
        min: 0,
        max: 9999999,
        info: 'Inclusive lower bound',
      },
      {
        name: 'maxAmount',
        label: 'Max Amount (PKR)',
        type: 'number',
        placeholder: '500,000',
        required: true,
        mandatory: true,
        span: 1,
        min: 1,
        max: 9999999,
        info: 'Inclusive upper bound',
      },
      {
        name: 'issuedFrom',
        label: 'Issued From',
        type: 'date',
        required: true,
        mandatory: true,
        span: 1,
        info: 'Inclusive start date',
        description: 'Invoices issued on or after this date',
      },
      {
        name: 'dueDateRange',
        label: 'Due Date Range',
        type: 'daterange',
        required: true,
        optional: true,
        span: 'full',
        info: 'Optional date window',
        description: 'Optionally narrow results by due date window',
      },

      // ── Sort & Options section ────────────────────────────────────────────
      { _type: 'section', title: 'Sort & Options', showTitle: true },

      {
        name: 'sortOrder',
        label: 'Sort Order',
        type: 'radio',
        mandatory: true,
        required: true,
        span: 'full',
        options: [
          { value: 'newest', label: 'Newest First' },
          { value: 'oldest', label: 'Oldest First' },
          { value: 'highest', label: 'Highest Amount' },
          { value: 'lowest', label: 'Lowest Amount' },
        ],
      },
      {
        name: 'includeArchived',
        label: 'Include Archived',
        type: 'checkbox',
        span: 'full',
        description: 'Include archived invoices in results',
        mandatory: true,
        required: true,
      },
    ],
  },
];
