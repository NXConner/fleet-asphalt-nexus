import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Upload, Plus, Edit } from "lucide-react";
import { toast } from "sonner";
import jsPDF from 'jspdf';
import emailjs from '@emailjs/browser';
import SignatureCanvas from 'react-signature-canvas';

interface CustomerContract {
  id: string;
  customerId: string;
  customerName: string;
  contractType: 'service' | 'maintenance' | 'project' | 'master';
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  value: number;
  status: 'draft' | 'pending' | 'signed' | 'active' | 'completed' | 'cancelled';
  signedDate?: string;
  documentUrl?: string;
  terms: string;
  createdAt: string;
  customerEmail?: string;
  signature?: string;
}

export function CustomerContractManager() {
  const [contracts, setContracts] = useState<CustomerContract[]>([
    {
      id: '1',
      customerId: 'cust-1',
      customerName: 'ABC Construction',
      contractType: 'project',
      title: 'Parking Lot Paving Contract',
      description: 'Complete paving of office complex parking lot',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      value: 85000,
      status: 'signed',
      signedDate: '2024-01-25',
      terms: 'Net 30 payment terms. Materials included.',
      createdAt: '2024-01-20',
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingContract, setEditingContract] = useState<CustomerContract | null>(null);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  const handleCreateContract = () => {
    const newContract: CustomerContract = {
      id: `contract-${Date.now()}`,
      customerId: '',
      customerName: '',
      contractType: 'service',
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      value: 0,
      status: 'draft',
      terms: '',
      createdAt: new Date().toISOString(),
    };
    setEditingContract(newContract);
    setIsCreating(true);
  };

  const handleSaveContract = () => {
    if (editingContract) {
      if (isCreating) {
        setContracts(prev => [...prev, editingContract]);
        toast.success("Contract created successfully");
      } else {
        setContracts(prev => prev.map(c => c.id === editingContract.id ? editingContract : c));
        toast.success("Contract updated successfully");
      }
      setIsCreating(false);
      setEditingContract(null);
    }
  };

  const handleUploadDocument = (contractId: string, file: File) => {
    const url = URL.createObjectURL(file);
    setContracts(prev => prev.map(c => 
      c.id === contractId ? { ...c, documentUrl: url } : c
    ));
    toast.success("Contract document uploaded");
  };

  const downloadContract = (contract: CustomerContract) => {
    if (contract.documentUrl) {
      const link = document.createElement('a');
      link.href = contract.documentUrl;
      link.download = `${contract.title}.pdf`;
      link.click();
    } else {
      // Generate contract document as PDF
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Contract', 10, 10);
      doc.setFontSize(12);
      doc.text(`Title: ${contract.title}`, 10, 20);
      doc.text(`Customer: ${contract.customerName}`, 10, 30);
      doc.text(`Type: ${contract.contractType}`, 10, 40);
      doc.text(`Start: ${contract.startDate}`, 10, 50);
      doc.text(`End: ${contract.endDate}`, 10, 60);
      doc.text(`Value: $${contract.value.toLocaleString()}`, 10, 70);
      doc.text(`Status: ${contract.status}`, 10, 80);
      doc.text(`Terms: ${contract.terms}`, 10, 90);
      if (contract.signature) {
        doc.addImage(contract.signature, 'PNG', 10, 100, 80, 30);
      }
      doc.save(`${contract.title}.pdf`);
      toast.success('Contract PDF downloaded');
    }
  };

  const sendContractEmail = async (contract: CustomerContract) => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Contract', 10, 10);
      doc.setFontSize(12);
      doc.text(`Title: ${contract.title}`, 10, 20);
      doc.text(`Customer: ${contract.customerName}`, 10, 30);
      doc.text(`Type: ${contract.contractType}`, 10, 40);
      doc.text(`Start: ${contract.startDate}`, 10, 50);
      doc.text(`End: ${contract.endDate}`, 10, 60);
      doc.text(`Value: $${contract.value.toLocaleString()}`, 10, 70);
      doc.text(`Status: ${contract.status}`, 10, 80);
      doc.text(`Terms: ${contract.terms}`, 10, 90);
      if (contract.signature) {
        doc.addImage(contract.signature, 'PNG', 10, 100, 80, 30);
      }
      const pdfBlob = doc.output('blob');
      const form = document.createElement('form');
      form.style.display = 'none';
      form.innerHTML = `
        <input name="to_name" value="${contract.customerName}" />
        <input name="to_email" value="${contract.customerEmail || ''}" />
        <input name="message" value="Please find your contract attached." />
        <input name="contract_id" value="${contract.id}" />
      `;
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.name = 'attachment';
      const file = new File([pdfBlob], `contract-${contract.title}.pdf`, { type: 'application/pdf' });
      // @ts-ignore
      fileInput.files = { 0: file, length: 1, item: (i: number) => file };
      form.appendChild(fileInput);
      document.body.appendChild(form);
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const userId = import.meta.env.VITE_EMAILJS_USER_ID;
      if (!serviceId || !templateId || !userId) {
        toast.error('EmailJS environment variables are not set.');
        document.body.removeChild(form);
        return;
      }
      await emailjs.sendForm(serviceId, templateId, form, userId);
      document.body.removeChild(form);
      toast.success(`Contract sent to ${contract.customerName}`);
    } catch (error) {
      toast.error('Failed to send contract');
    }
  };

  const getStatusColor = (status: CustomerContract['status']) => {
    switch (status) {
      case 'signed': return 'default';
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'pending': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const handleSaveSignature = (sigPad: any) => {
    const dataUrl = sigPad.getTrimmedCanvas().toDataURL('image/png');
    setSignatureData(dataUrl);
    if (editingContract) {
      setEditingContract({ ...editingContract, signature: dataUrl });
    }
    setShowSignaturePad(false);
  };

  if (editingContract) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{isCreating ? 'Create New Contract' : 'Edit Contract'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Customer Name</Label>
              <Input
                value={editingContract.customerName}
                onChange={(e) => setEditingContract({...editingContract, customerName: e.target.value})}
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <Label>Contract Type</Label>
              <select
                title="Contract Type"
                className="w-full p-2 border rounded"
                value={editingContract.contractType}
                onChange={(e) => setEditingContract({...editingContract, contractType: e.target.value as any})}
              >
                <option value="service">Service Agreement</option>
                <option value="maintenance">Maintenance Contract</option>
                <option value="project">Project Contract</option>
                <option value="master">Master Agreement</option>
              </select>
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={editingContract.title}
                onChange={(e) => setEditingContract({...editingContract, title: e.target.value})}
                placeholder="Contract title"
              />
            </div>
            <div>
              <Label>Contract Value</Label>
              <Input
                type="number"
                value={editingContract.value}
                onChange={(e) => setEditingContract({...editingContract, value: parseFloat(e.target.value)})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={editingContract.startDate}
                onChange={(e) => setEditingContract({...editingContract, startDate: e.target.value})}
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={editingContract.endDate}
                onChange={(e) => setEditingContract({...editingContract, endDate: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label>Description</Label>
            <Textarea
              value={editingContract.description}
              onChange={(e) => setEditingContract({...editingContract, description: e.target.value})}
              placeholder="Contract description"
            />
          </div>
          
          <div>
            <Label>Terms & Conditions</Label>
            <Textarea
              value={editingContract.terms}
              onChange={(e) => setEditingContract({...editingContract, terms: e.target.value})}
              placeholder="Terms and conditions"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleSaveContract}>Save Contract</Button>
            <Button variant="outline" onClick={() => {setEditingContract(null); setIsCreating(false);}}>
              Cancel
            </Button>
          </div>
          <Button onClick={() => setShowSignaturePad(true)} variant="outline">Sign Contract</Button>
          {showSignaturePad && (
            <div className="my-4">
              <SignatureCanvas
                penColor="black"
                canvasProps={{ width: 400, height: 150, className: 'border rounded' }}
                ref={(ref) => (window.sigPad = ref)}
              />
              <div className="flex gap-2 mt-2">
                <Button onClick={() => handleSaveSignature(window.sigPad)}>Save Signature</Button>
                <Button variant="outline" onClick={() => setShowSignaturePad(false)}>Cancel</Button>
              </div>
            </div>
          )}
          {editingContract?.signature && (
            <div className="my-2">
              <img src={editingContract.signature} alt="Signature" className="h-16" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Customer Contracts</h3>
        <Button onClick={handleCreateContract}>
          <Plus className="h-4 w-4 mr-2" />
          New Contract
        </Button>
      </div>

      <div className="grid gap-4">
        {contracts.map((contract) => (
          <Card key={contract.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold">{contract.title}</h4>
                  <p className="text-sm text-muted-foreground">{contract.customerName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(contract.status)}>
                    {contract.status}
                  </Badge>
                  <span className="font-semibold">${contract.value.toLocaleString()}</span>
                </div>
              </div>
              
              <p className="text-sm mb-4">{contract.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {contract.startDate} - {contract.endDate}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingContract(contract)}>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => downloadContract(contract)}>
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => sendContractEmail(contract)}>
                    <FileText className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUploadDocument(contract.id, file);
                    }}
                    className="hidden"
                    id={`upload-${contract.id}`}
                  />
                  <Button size="sm" variant="outline" onClick={() => document.getElementById(`upload-${contract.id}`)?.click()}>
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
