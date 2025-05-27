
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Users, Calendar, DollarSign, Award } from "lucide-react";
import { mockEmployees, mockDepartments } from "@/data/mockEmployeeData";
import { Employee } from "@/types/employee";

const EmployeeManagement = () => {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter(employee =>
    `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    employee.employment.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Employee['employment']['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'on-leave':
        return 'bg-blue-100 text-blue-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.employment.status === 'active').length,
    departments: mockDepartments.length,
    avgPerformance: employees.reduce((sum, emp) => {
      const latestReview = emp.performanceReviews[emp.performanceReviews.length - 1];
      return sum + (latestReview?.overallRating || 0);
    }, 0) / employees.length
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive employee lifecycle management and HR operations
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{stats.totalEmployees}</div>
                <div className="text-sm text-muted-foreground">Total Employees</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.activeEmployees}</div>
                <div className="text-sm text-muted-foreground">Active Employees</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{stats.departments}</div>
                <div className="text-sm text-muted-foreground">Departments</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{stats.avgPerformance.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Avg Performance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        <TabsContent value="employees" className="space-y-4">
          <div className="grid gap-4">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedEmployee(employee)}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {employee.personalInfo.firstName} {employee.personalInfo.lastName}
                        </h3>
                        <Badge className={getStatusColor(employee.employment.status)} variant="secondary">
                          {employee.employment.status}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Employee ID: {employee.employeeId}</div>
                        <div>Position: {employee.employment.position}</div>
                        <div>Department: {employee.employment.department}</div>
                        <div>Hire Date: {new Date(employee.employment.hireDate).toLocaleDateString()}</div>
                        <div>Email: {employee.personalInfo.email}</div>
                        <div>Phone: {employee.personalInfo.phone}</div>
                      </div>

                      <div className="flex gap-4 mt-3">
                        <div className="text-sm">
                          <span className="font-medium">Skills: </span>
                          {employee.skills.slice(0, 3).join(", ")}
                          {employee.skills.length > 3 && "..."}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2 ml-6">
                      <div className="text-lg font-bold text-green-600">
                        {employee.compensation.payType === 'hourly' 
                          ? `$${employee.compensation.baseRate}/hr`
                          : `$${employee.compensation.baseRate.toLocaleString()}/yr`
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Hours this week: {employee.timeTracking.currentWeekHours}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total hours: {employee.timeTracking.totalHoursWorked.toLocaleString()}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                        <Button size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid gap-4">
            {mockDepartments.map((department) => (
              <Card key={department.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{department.name}</h3>
                      <p className="text-muted-foreground">{department.description}</p>
                      <div className="text-sm space-y-1">
                        <div>Manager: {department.manager}</div>
                        <div>Employees: {department.employeeCount}</div>
                        <div>Budget: ${department.budget.toLocaleString()}</div>
                      </div>
                    </div>
                    <Button variant="outline">
                      Manage Department
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Management</CardTitle>
              <CardDescription>Process payroll and manage employee compensation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-20 flex flex-col">
                  <DollarSign className="h-6 w-6 mb-2" />
                  Process Payroll
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  View Pay Schedules
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Employee Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Benefits Administration</CardTitle>
              <CardDescription>Manage employee benefits and enrollment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Health Insurance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-2">
                        <div>Enrolled: {employees.filter(e => e.benefits.healthInsurance).length} employees</div>
                        <div>Coverage: Medical, Prescription, Emergency</div>
                        <Button size="sm" variant="outline">Manage Plans</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">401(k) Retirement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-2">
                        <div>Enrolled: {employees.filter(e => e.benefits.retirement401k).length} employees</div>
                        <div>Company Match: 4% of salary</div>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Management</CardTitle>
              <CardDescription>Track employee performance and conduct reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex flex-col">
                    <Award className="h-6 w-6 mb-2" />
                    Conduct Review
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Calendar className="h-6 w-6 mb-2" />
                    Schedule Reviews
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    Performance Reports
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeManagement;
