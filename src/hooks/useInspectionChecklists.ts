import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export function useInspectionChecklists(employeeId?: string, jobId?: string) {
  const queryClient = useQueryClient();

  const { data: inspectionChecklists = [], isLoading } = useQuery(['inspection_checklists', employeeId, jobId], async () => {
    let query = supabase.from('inspection_checklists').select('*').order('date', { ascending: false });
    if (employeeId) query = query.eq('employee_id', employeeId);
    if (jobId) query = query.eq('job_id', jobId);
    const { data, error } = await query;
    if (error) throw error;
    return data as Tables<'inspection_checklists'>[];
  });

  const addInspectionChecklist = useMutation({
    mutationFn: async (checklist: Omit<Tables<'inspection_checklists'>, 'id'>) => {
      const { data, error } = await supabase.from('inspection_checklists').insert(checklist).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['inspection_checklists', employeeId, jobId])
  });

  const updateInspectionChecklist = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Tables<'inspection_checklists'>> }) => {
      const { data, error } = await supabase.from('inspection_checklists').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['inspection_checklists', employeeId, jobId])
  });

  const deleteInspectionChecklist = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('inspection_checklists').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries(['inspection_checklists', employeeId, jobId])
  });

  return { inspectionChecklists, isLoading, addInspectionChecklist, updateInspectionChecklist, deleteInspectionChecklist };
} 