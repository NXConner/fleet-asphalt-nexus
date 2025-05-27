
import { useState } from "react";
import CustomersList from "@/components/customers/CustomersList";
import CustomerForm from "@/components/customers/CustomerForm";
import { Customer } from "@/types/customer";
import { toast } from "sonner";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "CUST-001",
      name: "John Smith",
      email: "john@example.com",
      phone: "(555) 123-4567",
      address: {
        street: "123 Main St",
        city: "Richmond",
        state: "VA",
        zipCode: "23230"
      },
      company: "Smith Construction",
      notes: "Regular customer, prefers email communication",
      createdAt: "2024-01-15T00:00:00Z",
      updatedAt: "2024-01-27T10:30:00Z",
      status: "active",
      projects: [
        {
          id: "PROJ-001",
          title: "Parking Lot Resurfacing",
          type: "paving",
          status: "completed",
          estimatedValue: 25000,
          actualValue: 24500,
          startDate: "2024-01-20",
          completionDate: "2024-01-25"
        }
      ],
      totalValue: 24500,
      lastContact: "2024-01-25T00:00:00Z"
    },
    {
      id: "CUST-002",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "(555) 987-6543",
      address: {
        street: "456 Oak Avenue",
        city: "Norfolk",
        state: "VA",
        zipCode: "23510"
      },
      notes: "Interested in sealcoating services",
      createdAt: "2024-01-20T00:00:00Z",
      updatedAt: "2024-01-26T14:20:00Z",
      status: "prospect",
      projects: [],
      totalValue: 0,
      lastContact: "2024-01-26T14:20:00Z"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();

  const handleSaveCustomer = (customerData: Partial<Customer>) => {
    if (editingCustomer) {
      // Update existing customer
      setCustomers(prev => prev.map(customer => 
        customer.id === editingCustomer.id 
          ? { ...customer, ...customerData }
          : customer
      ));
      toast.success("Customer updated successfully");
    } else {
      // Add new customer
      setCustomers(prev => [...prev, customerData as Customer]);
      toast.success("Customer created successfully");
    }
    
    setShowForm(false);
    setEditingCustomer(undefined);
  };

  const handleNewCustomer = () => {
    setEditingCustomer(undefined);
    setShowForm(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleViewCustomer = (customer: Customer) => {
    // TODO: Implement customer detail view
    toast.info(`Viewing ${customer.name} - Detail view coming soon`);
  };

  if (showForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <CustomerForm
          customer={editingCustomer}
          onSave={handleSaveCustomer}
          onCancel={() => {
            setShowForm(false);
            setEditingCustomer(undefined);
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CustomersList
        customers={customers}
        onViewCustomer={handleViewCustomer}
        onEditCustomer={handleEditCustomer}
        onNewCustomer={handleNewCustomer}
      />
    </div>
  );
};

export default CustomerManagement;
