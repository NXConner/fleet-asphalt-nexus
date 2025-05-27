
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeTimeTracker } from "@/components/timeTracking/EmployeeTimeTracker";
import { useEmployeeManagement } from "@/hooks/useEmployeeManagement";
import { Clock, Users, TrendingUp, MapPin } from "lucide-react";

export default function TimeTracking() {
  const { employees } = useEmployeeManagement();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");

  const selectedEmployee = employees.find(emp => emp.id === selectedEmployeeId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Clock className="h-8 w-8" />
          Employee Time Tracking
        </h1>
        <p className="text-muted-foreground mt-2">
          Track employee hours, location, and activities with GPS precision
        </p>
      </div>

      <Tabs defaultValue="tracker" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tracker">Time Tracker</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="tracker">
          <div className="space-y-6">
            {/* Employee Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Employee</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select an employee...</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.personalInfo.firstName} {employee.personalInfo.lastName} - {employee.employment.position}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>

            {/* Time Tracker Component */}
            {selectedEmployee && (
              <EmployeeTimeTracker
                employeeId={selectedEmployee.id}
                employeeName={`${selectedEmployee.personalInfo.firstName} ${selectedEmployee.personalInfo.lastName}`}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Time Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detailed time reports and analytics will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                GPS tracking analytics and route optimization will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Time Tracking Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configure time tracking preferences and GPS settings.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
