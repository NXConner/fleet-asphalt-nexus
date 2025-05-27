
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface JobsHeaderProps {
  onCreateJob: () => void;
}

const JobsHeader = ({ onCreateJob }: JobsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Job Management</h1>
        <p className="text-muted-foreground mt-2">Track and manage your asphalt projects</p>
      </div>
      <Button onClick={onCreateJob}>
        <Plus className="h-4 w-4 mr-2" />
        Create Job
      </Button>
    </div>
  );
};

export default JobsHeader;
