
export interface Invoice {
  id: string;
  invoiceNumber: string;
  estimateId?: string;
  jobId?: string;
  customerId: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  amountPaid: number;
  balanceRemaining: number;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: 'cash' | 'check' | 'credit-card' | 'bank-transfer' | 'financing';
  notes?: string;
  terms: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: 'cash' | 'check' | 'credit-card' | 'bank-transfer';
  reference?: string;
  date: string;
  notes?: string;
  createdAt: string;
}
