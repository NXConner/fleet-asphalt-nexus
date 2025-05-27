
export interface Customer {
  id: string;
  type: 'individual' | 'business' | 'government';
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contactPerson?: string;
  taxId?: string;
  creditLimit: number;
  paymentTerms: 'net-15' | 'net-30' | 'net-60' | 'due-on-receipt';
  status: 'active' | 'inactive' | 'prospect';
  notes: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomerInteraction {
  id: string;
  customerId: string;
  type: 'call' | 'email' | 'meeting' | 'proposal' | 'follow-up';
  subject: string;
  description: string;
  outcome: string;
  nextAction?: string;
  nextActionDate?: string;
  userId: string;
  createdAt: string;
}
