
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface FollowUpItem {
  id: string;
  estimateId: string;
  clientName: string;
  type: 'email' | 'call' | 'meeting';
  scheduledDate: string;
  status: 'pending' | 'completed' | 'overdue';
  notes: string;
}

export const EstimateFollowUp = () => {
  const [followUps, setFollowUps] = useState<FollowUpItem[]>([
    {
      id: 'fu-001',
      estimateId: 'EST-001',
      clientName: 'ABC Construction',
      type: 'email',
      scheduledDate: '2024-01-30',
      status: 'pending',
      notes: 'Follow up on parking lot estimate'
    },
    {
      id: 'fu-002',
      estimateId: 'EST-002',
      clientName: 'City Municipality',
      type: 'call',
      scheduledDate: '2024-01-28',
      status: 'overdue',
      notes: 'Discuss timeline for road repair project'
    }
  ]);

  const [newFollowUp, setNewFollowUp] = useState({
    estimateId: '',
    type: 'email' as const,
    scheduledDate: '',
    notes: ''
  });

  const handleCreateFollowUp = () => {
    if (!newFollowUp.estimateId || !newFollowUp.scheduledDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const followUp: FollowUpItem = {
      id: `fu-${Date.now()}`,
      estimateId: newFollowUp.estimateId,
      clientName: 'Sample Client', // In real app, get from estimate
      type: newFollowUp.type,
      scheduledDate: newFollowUp.scheduledDate,
      status: 'pending',
      notes: newFollowUp.notes
    };

    setFollowUps([...followUps, followUp]);
    setNewFollowUp({ estimateId: '', type: 'email', scheduledDate: '', notes: '' });
    toast.success('Follow-up scheduled successfully');
  };

  const handleMarkComplete = (id: string) => {
    setFollowUps(followUps.map(fu => 
      fu.id === id ? { ...fu, status: 'completed' as const } : fu
    ));
    toast.success('Follow-up marked as completed');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'meeting': return <MessageSquare className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Follow-Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Estimate ID</label>
              <Input
                value={newFollowUp.estimateId}
                onChange={(e) => setNewFollowUp({ ...newFollowUp, estimateId: e.target.value })}
                placeholder="EST-001"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Follow-up Type</label>
              <Select value={newFollowUp.type} onValueChange={(value: any) => setNewFollowUp({ ...newFollowUp, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="call">Phone Call</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Scheduled Date</label>
              <Input
                type="date"
                value={newFollowUp.scheduledDate}
                onChange={(e) => setNewFollowUp({ ...newFollowUp, scheduledDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={newFollowUp.notes}
              onChange={(e) => setNewFollowUp({ ...newFollowUp, notes: e.target.value })}
              placeholder="Follow-up notes..."
              rows={2}
            />
          </div>
          <Button onClick={handleCreateFollowUp} className="w-full">
            Schedule Follow-Up
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Follow-Ups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {followUps.map((followUp) => (
              <div key={followUp.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getTypeIcon(followUp.type)}
                  <div>
                    <div className="font-medium">{followUp.clientName}</div>
                    <div className="text-sm text-muted-foreground">
                      {followUp.estimateId} • {followUp.scheduledDate}
                    </div>
                    {followUp.notes && (
                      <div className="text-sm text-muted-foreground mt-1">{followUp.notes}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(followUp.status)}>
                    {followUp.status}
                  </Badge>
                  {followUp.status === 'pending' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleMarkComplete(followUp.id)}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
