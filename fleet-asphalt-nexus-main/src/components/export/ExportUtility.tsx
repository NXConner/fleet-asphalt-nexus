import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

interface ExportUtilityProps {
  data: any[];
  filename: string;
  availableFields: { key: string; label: string }[];
  type: 'estimates' | 'jobs' | 'invoices' | 'vehicles' | 'inventory';
}

export const ExportUtility = ({ data, filename, availableFields, type }: ExportUtilityProps) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'excel'>('csv');
  const [selectedFields, setSelectedFields] = useState<string[]>(availableFields.slice(0, 5).map(f => f.key));
  const [isExporting, setIsExporting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleFieldToggle = (fieldKey: string) => {
    setSelectedFields(prev =>
      prev.includes(fieldKey)
        ? prev.filter(f => f !== fieldKey)
        : [...prev, fieldKey]
    );
  };

  const exportToCSV = (exportData: any[]) => {
    const headers = availableFields
      .filter(field => selectedFields.includes(field.key))
      .map(field => field.label);

    const csvContent = [
      headers.join(','),
      ...exportData.map(row =>
        selectedFields.map(field => {
          const value = row[field];
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = async (exportData: any[]) => {
    const doc = new jsPDF();
    const headers = availableFields.filter(field => selectedFields.includes(field.key)).map(field => field.label);
    let y = 10;
    doc.setFontSize(12);
    doc.text(filename + ' Export', 10, y);
    y += 10;
    doc.setFont('helvetica', 'bold');
    headers.forEach((header, i) => {
      doc.text(header, 10 + i * 40, y);
    });
    y += 8;
    doc.setFont('helvetica', 'normal');
    exportData.forEach(row => {
      selectedFields.forEach((field, i) => {
        const value = row[field] !== undefined ? String(row[field]) : '';
        doc.text(value, 10 + i * 40, y);
      });
      y += 8;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });
    doc.save(`${filename}.pdf`);
    toast.success('PDF exported successfully');
  };

  const exportToExcel = async (exportData: any[]) => {
    // Simulate Excel generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Excel export would be generated here with a proper Excel library');
  };

  const handleExport = async () => {
    if (selectedFields.length === 0) {
      toast.error('Please select at least one field to export');
      return;
    }

    setIsExporting(true);
    
    try {
      const exportData = data.map(item => {
        const filteredItem: any = {};
        selectedFields.forEach(field => {
          filteredItem[field] = item[field] || '';
        });
        return filteredItem;
      });

      switch (exportFormat) {
        case 'csv':
          exportToCSV(exportData);
          break;
        case 'pdf':
          await exportToPDF(exportData);
          break;
        case 'excel':
          await exportToExcel(exportData);
          break;
      }

      toast.success(`Successfully exported ${data.length} records`);
    } catch (error) {
      toast.error('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={() => setShowOptions(!showOptions)}
          className="flex items-center gap-2 border text-xs px-2 py-1"
        >
          <Download className="h-4 w-4" />
          Export ({data.length} records)
        </Button>

        <Button
          onClick={handleExport}
          disabled={isExporting || selectedFields.length === 0}
          className="flex items-center gap-2 text-xs px-2 py-1 bg-blue-500 text-white rounded"
        >
          {isExporting ? (
            <LoadingSpinner size="sm" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          {isExporting ? 'Exporting...' : 'Quick Export'}
        </Button>
      </div>

      {showOptions && (
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Export Format</label>
              <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      CSV File
                    </div>
                  </SelectItem>
                  <SelectItem value="excel">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      Excel File
                    </div>
                  </SelectItem>
                  <SelectItem value="pdf">
                    <div className="flex items-center gap-2">
                      <Printer className="h-4 w-4" />
                      PDF Report
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Select Fields ({selectedFields.length}/{availableFields.length})
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {availableFields.map(field => (
                  <label key={field.key} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={selectedFields.includes(field.key)}
                      onCheckedChange={() => handleFieldToggle(field.key)}
                    />
                    <span className="text-sm">{field.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setSelectedFields(availableFields.map(f => f.key))}
                className="text-xs px-2 py-1 border"
              >
                Select All
              </Button>
              <Button
                onClick={() => setSelectedFields([])}
                className="text-xs px-2 py-1 border"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
