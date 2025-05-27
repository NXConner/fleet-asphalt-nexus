
import { useState } from 'react';
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

interface EstimateActionsProps {
  estimate: {
    id: string;
    status: string;
    clientName: string;
    amount: number;
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('PDF generated successfully');
      // Simulate PDF download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `estimate-${estimate.id}.pdf`;
      link.click();
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
      await new Promise(resolve => setTimeout(resolve, 1000));
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
