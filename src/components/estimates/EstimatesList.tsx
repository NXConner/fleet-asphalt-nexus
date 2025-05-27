
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Estimate {
  id: string;
  clientName: string;
  projectType: string;
  location: string;
  amount: number;
  status: string;
  date: string;
  expiryDate: string;
  description: string;
}

interface EstimatesListProps {
  estimates: Estimate[];
}

const EstimatesList = ({ estimates }: EstimatesListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Estimates ({estimates.length})</CardTitle>
        <CardDescription>Track and manage your project estimates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {estimates.map((estimate) => (
            <div key={estimate.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{estimate.clientName}</h3>
                    <Badge className={getStatusColor(estimate.status)}>
                      {estimate.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{estimate.id} • {estimate.projectType}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ${estimate.amount.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-500">Estimated value</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Location</p>
                  <p className="text-sm text-gray-600">{estimate.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Created</p>
                  <p className="text-sm text-gray-600">{estimate.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Expires</p>
                  <p className="text-sm text-gray-600">{estimate.expiryDate}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{estimate.description}</p>
              
              <div className="flex gap-2">
                <Button size="sm">View Details</Button>
                <Button variant="outline" size="sm">Edit</Button>
                {estimate.status === "Approved" && (
                  <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                    Convert to Job
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimatesList;
