
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Employee } from "@/types/employee";
import { toast } from "sonner";

interface EmployeeFormProps {
  employee?: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

export const EmployeeForm = ({ employee, onSave, onCancel }: EmployeeFormProps) => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: employee?.personalInfo.firstName || "",
    lastName: employee?.personalInfo.lastName || "",
    email: employee?.personalInfo.email || "",
    phone: employee?.personalInfo.phone || "",
    dateOfBirth: employee?.personalInfo.dateOfBirth || "",
    
    // Address
    street: employee?.personalInfo.address.street || "",
    city: employee?.personalInfo.address.city || "",
    state: employee?.personalInfo.address.state || "",
    zipCode: employee?.personalInfo.address.zipCode || "",
    
    // Employment
    employeeId: employee?.employment.employeeId || `EMP-${Date.now()}`,
    department: employee?.employment.department || "",
    position: employee?.employment.position || "",
    hireDate: employee?.employment.hireDate || "",
    status: employee?.employment.status || "active",
    
    // Compensation
    payType: employee?.compensation.payType || "hourly",
    baseRate: employee?.compensation.baseRate || 0,
    overtimeRate: employee?.compensation.overtimeRate || 0,
    
    // Emergency Contact
    emergencyName: employee?.emergencyContact?.name || "",
    emergencyPhone: employee?.emergencyContact?.phone || "",
    emergencyRelation: employee?.emergencyContact?.relationship || "",
    
    // Benefits
    healthInsurance: employee?.benefits.healthInsurance || false,
    retirement401k: employee?.benefits.retirement401k || false,
    
    // Notes
    notes: employee?.notes || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const employeeData: Employee = {
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
        department: formData.department,
        position: formData.position,
        hireDate: formData.hireDate,
        status: formData.status as 'active' | 'inactive' | 'terminated'
      },
      compensation: {
        payType: formData.payType as 'hourly' | 'salary',
        baseRate: formData.baseRate,
        overtimeRate: formData.overtimeRate
      },
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relationship: formData.emergencyRelation
      },
      benefits: {
        healthInsurance: formData.healthInsurance,
        retirement401k: formData.retirement401k,
        paidTimeOff: employee?.benefits.paidTimeOff || 0,
        sickLeave: employee?.benefits.sickLeave || 0
      },
      timeTracking: employee?.timeTracking || {
        currentWeekHours: 0,
        totalHours: 0,
        overtimeHours: 0,
        lastClockIn: null,
        isCurrentlyWorking: false
      },
      skills: employee?.skills || [],
      certifications: employee?.certifications || [],
      performanceReviews: employee?.performanceReviews || [],
      notes: formData.notes,
      createdAt: employee?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(employeeData);
    toast.success(`Employee ${employee ? 'updated' : 'created'} successfully`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              required
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              required
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Employment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Employment Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              value={formData.employeeId}
              onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="department">Department *</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="administration">Administration</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="position">Position *</Label>
            <Input
              id="position"
              required
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="hireDate">Hire Date</Label>
            <Input
              id="hireDate"
              type="date"
              value={formData.hireDate}
              onChange={(e) => setFormData(prev => ({ ...prev, hireDate: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Compensation */}
      <Card>
        <CardHeader>
          <CardTitle>Compensation</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="payType">Pay Type</Label>
            <Select
              value={formData.payType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, payType: value }))}
            >
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
            <Label htmlFor="baseRate">
              {formData.payType === 'hourly' ? 'Hourly Rate' : 'Annual Salary'}
            </Label>
            <Input
              id="baseRate"
              type="number"
              step="0.01"
              value={formData.baseRate}
              onChange={(e) => setFormData(prev => ({ ...prev, baseRate: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          {formData.payType === 'hourly' && (
            <div>
              <Label htmlFor="overtimeRate">Overtime Rate</Label>
              <Input
                id="overtimeRate"
                type="number"
                step="0.01"
                value={formData.overtimeRate}
                onChange={(e) => setFormData(prev => ({ ...prev, overtimeRate: parseFloat(e.target.value) || 0 }))}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="emergencyName">Contact Name</Label>
            <Input
              id="emergencyName"
              value={formData.emergencyName}
              onChange={(e) => setFormData(prev => ({ ...prev, emergencyName: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="emergencyPhone">Contact Phone</Label>
            <Input
              id="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="emergencyRelation">Relationship</Label>
            <Input
              id="emergencyRelation"
              value={formData.emergencyRelation}
              onChange={(e) => setFormData(prev => ({ ...prev, emergencyRelation: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Benefits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="healthInsurance"
              checked={formData.healthInsurance}
              onChange={(e) => setFormData(prev => ({ ...prev, healthInsurance: e.target.checked }))}
            />
            <Label htmlFor="healthInsurance">Health Insurance</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="retirement401k"
              checked={formData.retirement401k}
              onChange={(e) => setFormData(prev => ({ ...prev, retirement401k: e.target.checked }))}
            />
            <Label htmlFor="retirement401k">401(k) Retirement Plan</Label>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Additional notes about the employee..."
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {employee ? 'Update Employee' : 'Create Employee'}
        </Button>
      </div>
    </form>
  );
};
