import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  FileText, 
  Briefcase, 
  Mail, 
  Download,
  Edit,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import jsPDF from 'jspdf';
import emailjs from '@emailjs/browser';

interface EstimateActionsProps {
  estimate: {
    id: string;
    status: string;
    clientName: string;
    amount: number;
    clientEmail?: string;
  };
  onStatusChange: (id: string, status: string) => void;
  onConvertToJob: (id: string) => void;
}

export const EstimateActions = ({ estimate, onStatusChange, onConvertToJob }: EstimateActionsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onStatusChange(estimate.id, 'Approved');
      toast.success('Estimate approved successfully');
    } catch (error) {
      toast.error('Failed to approve estimate');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onStatusChange(estimate.id, 'Rejected');
      toast.success('Estimate rejected');
    } catch (error) {
      toast.error('Failed to reject estimate');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Estimate', 10, 10);
      doc.setFontSize(12);
      doc.text(`Estimate ID: ${estimate.id}`, 10, 20);
      doc.text(`Client: ${estimate.clientName}`, 10, 30);
      doc.text(`Status: ${estimate.status}`, 10, 40);
      // Add more fields as needed
      doc.save(`estimate-${estimate.id}.pdf`);
      toast.success('PDF generated successfully');
    } catch (error) {
      toast.error('Failed to generate PDF');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleConvertToJob = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onConvertToJob(estimate.id);
      toast.success('Estimate converted to job successfully');
    } catch (error) {
      toast.error('Failed to convert estimate to job');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendEmail = async () => {
    setIsProcessing(true);
    try {
      // Generate PDF
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Estimate', 10, 10);
      doc.setFontSize(12);
      doc.text(`Estimate ID: ${estimate.id}`, 10, 20);
      doc.text(`Client: ${estimate.clientName}`, 10, 30);
      doc.text(`Status: ${estimate.status}`, 10, 40);
      const pdfBlob = doc.output('blob');
      // Prepare form for emailjs.sendForm
      const form = document.createElement('form');
      form.style.display = 'none';
      form.innerHTML = `
        <input name="to_name" value="${estimate.clientName}" />
        <input name="to_email" value="${estimate.clientEmail || ''}" />
        <input name="message" value="Please find your estimate attached." />
        <input name="estimate_id" value="${estimate.id}" />
      `;
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.name = 'attachment';
      const file = new File([pdfBlob], `estimate-${estimate.id}.pdf`, { type: 'application/pdf' });
      // @ts-ignore
      fileInput.files = { 0: file, length: 1, item: (i: number) => file };
      form.appendChild(fileInput);
      document.body.appendChild(form);
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const userId = import.meta.env.VITE_EMAILJS_USER_ID;
      if (!serviceId || !templateId || !userId) {
        toast.error('EmailJS environment variables are not set.');
        setIsProcessing(false);
        return;
      }
      await emailjs.sendForm(serviceId, templateId, form, userId);
      document.body.removeChild(form);
      toast.success(`Estimate sent to ${estimate.clientName}`);
    } catch (error) {
      toast.error('Failed to send estimate');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline">
        <Eye className="h-4 w-4 mr-1" />
        View
      </Button>

      <Button size="sm" variant="outline">
        <Edit className="h-4 w-4 mr-1" />
        Edit
      </Button>

      <Button 
        size="sm" 
        variant="outline"
        onClick={handleGeneratePDF}
        disabled={isGeneratingPdf}
      >
        {isGeneratingPdf ? (
          <LoadingSpinner size="sm" className="mr-1" />
        ) : (
          <Download className="h-4 w-4 mr-1" />
        )}
        PDF
      </Button>

      <Button 
        size="sm" 
        variant="outline"
        onClick={handleSendEmail}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <LoadingSpinner size="sm" className="mr-1" />
        ) : (
          <Mail className="h-4 w-4 mr-1" />
        )}
        Email
      </Button>

      {estimate.status === 'Pending' && (
        <>
          <Button 
            size="sm" 
            variant="default"
            onClick={handleApprove}
            disabled={isProcessing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isProcessing ? (
              <LoadingSpinner size="sm" className="mr-1" />
            ) : (
              <CheckCircle className="h-4 w-4 mr-1" />
            )}
            Approve
          </Button>

          <Button 
            size="sm" 
            variant="destructive"
            onClick={handleReject}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <LoadingSpinner size="sm" className="mr-1" />
            ) : (
              <XCircle className="h-4 w-4 mr-1" />
            )}
            Reject
          </Button>
        </>
      )}

      {estimate.status === 'Approved' && (
        <Button 
          size="sm" 
          onClick={handleConvertToJob}
          disabled={isProcessing}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isProcessing ? (
            <LoadingSpinner size="sm" className="mr-1" />
          ) : (
            <Briefcase className="h-4 w-4 mr-1" />
          )}
          Convert to Job
        </Button>
      )}
    </div>
  );
};
