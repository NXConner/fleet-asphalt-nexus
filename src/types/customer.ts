
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  company?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'prospect';
  projects: CustomerProject[];
  totalValue: number;
  lastContact: string;
}

export interface CustomerProject {
  id: string;
  title: string;
  type: 'paving' | 'maintenance' | 'striping' | 'sealcoating' | 'patching';
  status: 'quoted' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  estimatedValue: number;
  actualValue?: number;
  startDate?: string;
  completionDate?: string;
}

export interface CustomerContact {
  id: string;
  customerId: string;
  type: 'email' | 'phone' | 'meeting' | 'site-visit';
  subject: string;
  notes: string;
  date: string;
  followUpRequired: boolean;
  followUpDate?: string;
}
