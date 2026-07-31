'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMockInvoices, type InvoiceListData } from '@/lib/mock/invoice-mock';

export function   useMockInvoiceList(queryId: string) {
  return useQuery<InvoiceListData, Error>({
    queryKey: ['mock-invoices', queryId],
    queryFn: () => fetchMockInvoices(queryId),
    staleTime: 0,
    retry: 1,
  });
}
