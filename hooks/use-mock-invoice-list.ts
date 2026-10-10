'use client';

import { useQuery } from '@tanstack/react-query';
import type { PageListResponse } from '@/ascendra-ui';
import { fetchMockInvoices, type Invoice } from '@/lib/mock/invoice-mock';

export function   useMockInvoiceList(queryId: string) {
  return useQuery<PageListResponse<Invoice>, Error>({
    queryKey: ['mock-invoices', queryId],
    queryFn: () => fetchMockInvoices(queryId),
    staleTime: 0,
    retry: 1,
  });
}
