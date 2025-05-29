
import { useState } from 'react';
import { Filter, X, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface FilterState {
  dateRange: { from: string; to: string };
  status: string[];
  amountRange: { min: number; max: number };
  projectType: string[];
  searchTerm: string;
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  availableStatuses: string[];
  availableProjectTypes: string[];
}

export const AdvancedFilters = ({ 
  onFiltersChange, 
  availableStatuses, 
  availableProjectTypes 
}: AdvancedFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: '', to: '' },
    status: [],
    amountRange: { min: 0, max: 0 },
    projectType: [],
    searchTerm: ''
  });

  const [savedFilters, setSavedFilters] = useState<{name: string, filters: FilterState}[]>([
    { name: 'This Month', filters: { ...filters, dateRange: { from: '2024-01-01', to: '2024-01-31' } } },
    { name: 'High Value', filters: { ...filters, amountRange: { min: 50000, max: 0 } } }
  ]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleStatus = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    updateFilter('status', newStatuses);
  };

  const toggleProjectType = (type: string) => {
    const newTypes = filters.projectType.includes(type)
      ? filters.projectType.filter(t => t !== type)
      : [...filters.projectType, type];
    updateFilter('projectType', newTypes);
  };

  const clearFilters = () => {
    const clearedFilters = {
      dateRange: { from: '', to: '' },
      status: [],
      amountRange: { min: 0, max: 0 },
      projectType: [],
      searchTerm: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const saveCurrentFilter = () => {
    const name = prompt('Enter filter name:');
    if (name) {
      setSavedFilters(prev => [...prev, { name, filters }]);
    }
  };

  const loadSavedFilter = (savedFilter: {name: string, filters: FilterState}) => {
    setFilters(savedFilter.filters);
    onFiltersChange(savedFilter.filters);
  };

  const activeFiltersCount = [
    filters.status.length > 0,
    filters.projectType.length > 0,
    filters.dateRange.from || filters.dateRange.to,
    filters.amountRange.min > 0 || filters.amountRange.max > 0,
    filters.searchTerm.length > 0
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by client, project, or ID..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear all
          </Button>
        )}
      </div>

      {/* Active filters display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.status.map(status => (
            <Badge key={status} variant="secondary" className="cursor-pointer" onClick={() => toggleStatus(status)}>
              {status} <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          {filters.projectType.map(type => (
            <Badge key={type} variant="secondary" className="cursor-pointer" onClick={() => toggleProjectType(type)}>
              {type} <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          {(filters.dateRange.from || filters.dateRange.to) && (
            <Badge variant="secondary" className="cursor-pointer">
              <Calendar className="h-3 w-3 mr-1" />
              Date range <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          {(filters.amountRange.min > 0 || filters.amountRange.max > 0) && (
            <Badge variant="secondary" className="cursor-pointer">
              <DollarSign className="h-3 w-3 mr-1" />
              Amount range <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
        </div>
      )}

      {showFilters && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Advanced Filters</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={saveCurrentFilter}>
                  Save Filter
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Saved Filters */}
            {savedFilters.length > 0 && (
              <div className="space-y-2">
                <Label>Saved Filters</Label>
                <div className="flex flex-wrap gap-2">
                  {savedFilters.map((saved, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => loadSavedFilter(saved)}
                    >
                      {saved.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Date Range */}
              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="space-y-2">
                  <Input
                    type="date"
                    placeholder="From"
                    value={filters.dateRange.from}
                    onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, from: e.target.value })}
                  />
                  <Input
                    type="date"
                    placeholder="To"
                    value={filters.dateRange.to}
                    onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, to: e.target.value })}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="space-y-2">
                  {availableStatuses.map(status => (
                    <label key={status} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={() => toggleStatus(status)}
                        className="rounded"
                      />
                      <span className="text-sm">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Project Type Filter */}
              <div className="space-y-2">
                <Label>Project Type</Label>
                <div className="space-y-2">
                  {availableProjectTypes.map(type => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.projectType.includes(type)}
                        onChange={() => toggleProjectType(type)}
                        className="rounded"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amount Range */}
              <div className="space-y-2">
                <Label>Amount Range</Label>
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Min amount"
                    value={filters.amountRange.min || ''}
                    onChange={(e) => updateFilter('amountRange', { 
                      ...filters.amountRange, 
                      min: parseFloat(e.target.value) || 0 
                    })}
                  />
                  <Input
                    type="number"
                    placeholder="Max amount"
                    value={filters.amountRange.max || ''}
                    onChange={(e) => updateFilter('amountRange', { 
                      ...filters.amountRange, 
                      max: parseFloat(e.target.value) || 0 
                    })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
