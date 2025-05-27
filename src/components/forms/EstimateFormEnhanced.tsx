
import { useState } from 'react';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useFormValidation } from '@/hooks/useFormValidation';
import { toast } from 'sonner';

const estimateSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Valid email is required'),
  clientPhone: z.string().min(10, 'Valid phone number is required'),
  projectType: z.string().min(1, 'Project type is required'),
  location: z.string().min(1, 'Location is required'),
  area: z.number().min(1, 'Area must be greater than 0'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  estimatedValue: z.number().min(1, 'Estimated value must be greater than 0'),
  validUntil: z.string().min(1, 'Valid until date is required')
});

type EstimateFormData = z.infer<typeof estimateSchema>;

const initialValues: EstimateFormData = {
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  projectType: '',
  location: '',
  area: 0,
  description: '',
  estimatedValue: 0,
  validUntil: ''
};

export const EstimateFormEnhanced = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { values, errors, isValid, setValue, validate } = useFormValidation(estimateSchema, initialValues);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fix the form errors before submitting');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Estimate created successfully!');
      console.log('Estimate data:', values);
    } catch (error) {
      toast.error('Failed to create estimate. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Estimate</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={values.clientName}
                onChange={(e) => setValue('clientName', e.target.value)}
                className={errors.clientName ? 'border-red-500' : ''}
              />
              {errors.clientName && (
                <p className="text-sm text-red-500">{errors.clientName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email *</Label>
              <Input
                id="clientEmail"
                type="email"
                value={values.clientEmail}
                onChange={(e) => setValue('clientEmail', e.target.value)}
                className={errors.clientEmail ? 'border-red-500' : ''}
              />
              {errors.clientEmail && (
                <p className="text-sm text-red-500">{errors.clientEmail}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientPhone">Client Phone *</Label>
              <Input
                id="clientPhone"
                value={values.clientPhone}
                onChange={(e) => setValue('clientPhone', e.target.value)}
                className={errors.clientPhone ? 'border-red-500' : ''}
              />
              {errors.clientPhone && (
                <p className="text-sm text-red-500">{errors.clientPhone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type *</Label>
              <Select value={values.projectType} onValueChange={(value) => setValue('projectType', value)}>
                <SelectTrigger className={errors.projectType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paving">Paving</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="striping">Striping</SelectItem>
                  <SelectItem value="sealcoating">Sealcoating</SelectItem>
                  <SelectItem value="patching">Patching</SelectItem>
                </SelectContent>
              </Select>
              {errors.projectType && (
                <p className="text-sm text-red-500">{errors.projectType}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={values.location}
                onChange={(e) => setValue('location', e.target.value)}
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area (sq ft) *</Label>
              <Input
                id="area"
                type="number"
                value={values.area}
                onChange={(e) => setValue('area', parseFloat(e.target.value) || 0)}
                className={errors.area ? 'border-red-500' : ''}
              />
              {errors.area && (
                <p className="text-sm text-red-500">{errors.area}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedValue">Estimated Value ($) *</Label>
              <Input
                id="estimatedValue"
                type="number"
                value={values.estimatedValue}
                onChange={(e) => setValue('estimatedValue', parseFloat(e.target.value) || 0)}
                className={errors.estimatedValue ? 'border-red-500' : ''}
              />
              {errors.estimatedValue && (
                <p className="text-sm text-red-500">{errors.estimatedValue}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until *</Label>
              <Input
                id="validUntil"
                type="date"
                value={values.validUntil}
                onChange={(e) => setValue('validUntil', e.target.value)}
                className={errors.validUntil ? 'border-red-500' : ''}
              />
              {errors.validUntil && (
                <p className="text-sm text-red-500">{errors.validUntil}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              value={values.description}
              onChange={(e) => setValue('description', e.target.value)}
              className={errors.description ? 'border-red-500' : ''}
              rows={4}
              placeholder="Describe the project details, materials, and scope of work..."
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating Estimate...
                </>
              ) : (
                'Create Estimate'
              )}
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              Save as Draft
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
