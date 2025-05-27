
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Employee } from "@/types/employee";
import { ArrowLeft } from "lucide-react";

interface EmployeeFormProps {
  employee?: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

export const EmployeeForm = ({ employee, onSave, onCancel }: EmployeeFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    employeeId: '',
    department: '',
    position: '',
    status: 'active' as const,
    employeeType: 'full-time' as const,
    manager: '',
    workLocation: 'office' as const,
    hireDate: '',
    payType: 'hourly' as const,
    baseRate: 0,
    overtimeRate: 0,
    currency: 'USD',
    payFrequency: 'bi-weekly' as const,
    effectiveDate: '',
    healthInsurance: false,
    dentalInsurance: false,
    visionInsurance: false,
    retirement401k: false,
    paidTimeOff: 0,
    sickLeave: 0,
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    emergencyContactEmail: '',
    notes: ''
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.personalInfo.firstName,
        lastName: employee.personalInfo.lastName,
        email: employee.personalInfo.email,
        phone: employee.personalInfo.phone,
        dateOfBirth: employee.personalInfo.dateOfBirth,
        street: employee.personalInfo.address.street,
        city: employee.personalInfo.address.city,
        state: employee.personalInfo.address.state,
        zipCode: employee.personalInfo.address.zipCode,
        employeeId: employee.employment.employeeId,
        department: employee.employment.department,
        position: employee.employment.position,
        status: employee.employment.status,
        employeeType: employee.employment.employeeType,
        manager: employee.employment.manager || '',
        workLocation: employee.employment.workLocation,
        hireDate: employee.employment.hireDate,
        payType: employee.compensation.payType,
        baseRate: employee.compensation.baseRate,
        overtimeRate: employee.compensation.overtimeRate || 0,
        currency: employee.compensation.currency,
        payFrequency: employee.compensation.payFrequency,
        effectiveDate: employee.compensation.effectiveDate,
        healthInsurance: employee.benefits.healthInsurance,
        dentalInsurance: employee.benefits.dentalInsurance,
        visionInsurance: employee.benefits.visionInsurance,
        retirement401k: employee.benefits.retirement401k,
        paidTimeOff: employee.benefits.paidTimeOff,
        sickLeave: employee.benefits.sickLeave,
        emergencyContactName: employee.emergencyContact.name,
        emergencyContactRelationship: employee.emergencyContact.relationship,
        emergencyContactPhone: employee.emergencyContact.phone,
        emergencyContactEmail: employee.emergencyContact.email || '',
        notes: employee.notes || ''
      });
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEmployee: Employee = {
      id: employee?.id || `emp-${Date.now()}`,
      personalInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        }
      },
      employment: {
        employeeId: formData.employeeId,
        hireDate: formData.hireDate,
        status: formData.status,
        department: formData.department,
        position: formData.position,
        employeeType: formData.employeeType,
        manager: formData.manager,
        workLocation: formData.workLocation
      },
      compensation: {
        payType: formData.payType,
        baseRate: formData.baseRate,
        overtimeRate: formData.overtimeRate,
        currency: formData.currency,
        payFrequency: formData.payFrequency,
        effectiveDate: formData.effectiveDate
      },
      benefits: {
        healthInsurance: formData.healthInsurance,
        dentalInsurance: formData.dentalInsurance,
        visionInsurance: formData.visionInsurance,
        retirement401k: formData.retirement401k,
        paidTimeOff: formData.paidTimeOff,
        sickLeave: formData.sickLeave
      },
      skills: employee?.skills || [],
      certifications: employee?.certifications || [],
      performanceReviews: employee?.performanceReviews || [],
      timeTracking: {
        totalHoursWorked: employee?.timeTracking?.totalHoursWorked || 0,
        overtime: employee?.timeTracking?.overtime || 0,
        currentWeekHours: employee?.timeTracking?.currentWeekHours || 0
      },
      emergencyContact: {
        name: formData.emergencyContactName,
        relationship: formData.emergencyContactRelationship,
        phone: formData.emergencyContactPhone,
        email: formData.emergencyContactEmail
      },
      documents: employee?.documents || [],
      notes: formData.notes,
      createdAt: employee?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(newEmployee);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">
          {employee ? 'Edit Employee' : 'Add New Employee'}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="compensation">Compensation</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => updateFormData('street', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData('zipCode', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employment">
            <Card>
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={(e) => updateFormData('employeeId', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => updateFormData('department', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => updateFormData('position', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'active' | 'inactive' | 'terminated' | 'on-leave') => updateFormData('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employeeType">Employment Type</Label>
                  <Select value={formData.employeeType} onValueChange={(value: 'full-time' | 'part-time' | 'contractor' | 'temporary') => updateFormData('employeeType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contractor">Contractor</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="workLocation">Work Location</Label>
                  <Select value={formData.workLocation} onValueChange={(value: 'office' | 'remote' | 'hybrid' | 'field') => updateFormData('workLocation', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="field">Field</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hireDate">Hire Date</Label>
                  <Input
                    id="hireDate"
                    type="date"
                    value={formData.hireDate}
                    onChange={(e) => updateFormData('hireDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="manager">Manager</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => updateFormData('manager', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compensation">
            <Card>
              <CardHeader>
                <CardTitle>Compensation</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payType">Pay Type</Label>
                  <Select value={formData.payType} onValueChange={(value: 'hourly' | 'salary') => updateFormData('payType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="baseRate">Base Rate</Label>
                  <Input
                    id="baseRate"
                    type="number"
                    step="0.01"
                    value={formData.baseRate}
                    onChange={(e) => updateFormData('baseRate', parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="overtimeRate">Overtime Rate</Label>
                  <Input
                    id="overtimeRate"
                    type="number"
                    step="0.01"
                    value={formData.overtimeRate}
                    onChange={(e) => updateFormData('overtimeRate', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => updateFormData('currency', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="payFrequency">Pay Frequency</Label>
                  <Select value={formData.payFrequency} onValueChange={(value: 'weekly' | 'bi-weekly' | 'semi-monthly' | 'monthly') => updateFormData('payFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="semi-monthly">Semi-monthly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="effectiveDate">Effective Date</Label>
                  <Input
                    id="effectiveDate"
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => updateFormData('effectiveDate', e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits">
            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="healthInsurance"
                      checked={formData.healthInsurance}
                      onCheckedChange={(checked) => updateFormData('healthInsurance', checked)}
                    />
                    <Label htmlFor="healthInsurance">Health Insurance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="dentalInsurance"
                      checked={formData.dentalInsurance}
                      onCheckedChange={(checked) => updateFormData('dentalInsurance', checked)}
                    />
                    <Label htmlFor="dentalInsurance">Dental Insurance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="visionInsurance"
                      checked={formData.visionInsurance}
                      onCheckedChange={(checked) => updateFormData('visionInsurance', checked)}
                    />
                    <Label htmlFor="visionInsurance">Vision Insurance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="retirement401k"
                      checked={formData.retirement401k}
                      onCheckedChange={(checked) => updateFormData('retirement401k', checked)}
                    />
                    <Label htmlFor="retirement401k">401(k) Retirement</Label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paidTimeOff">Paid Time Off (days)</Label>
                    <Input
                      id="paidTimeOff"
                      type="number"
                      value={formData.paidTimeOff}
                      onChange={(e) => updateFormData('paidTimeOff', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sickLeave">Sick Leave (days)</Label>
                    <Input
                      id="sickLeave"
                      type="number"
                      value={formData.sickLeave}
                      onChange={(e) => updateFormData('sickLeave', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContactName">Contact Name</Label>
                  <Input
                    id="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={(e) => updateFormData('emergencyContactName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                  <Input
                    id="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={(e) => updateFormData('emergencyContactRelationship', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContactPhone">Phone</Label>
                  <Input
                    id="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => updateFormData('emergencyContactPhone', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContactEmail">Email</Label>
                  <Input
                    id="emergencyContactEmail"
                    type="email"
                    value={formData.emergencyContactEmail}
                    onChange={(e) => updateFormData('emergencyContactEmail', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    placeholder="Additional notes about the employee..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {employee ? 'Update Employee' : 'Create Employee'}
          </Button>
        </div>
      </form>
    </div>
  );
};
