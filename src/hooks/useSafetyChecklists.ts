import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export function useSafetyChecklists(employeeId?: string) {
  const queryClient = useQueryClient();

  const { data: safetyChecklists = [], isLoading } = useQuery(['safety_checklists', employeeId], async () => {
    let query = supabase.from('safety_checklists').select('*').order('date', { ascending: false });
    if (employeeId) query = query.eq('employee_id', employeeId);
    const { data, error } = await query;
    if (error) throw error;
    return data as Tables<'safety_checklists'>[];
  });

  const addSafetyChecklist = useMutation({
    mutationFn: async (checklist: Omit<Tables<'safety_checklists'>, 'id'>) => {
      const { data, error } = await supabase.from('safety_checklists').insert(checklist).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['safety_checklists', employeeId])
  });

  const updateSafetyChecklist = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Tables<'safety_checklists'>> }) => {
      const { data, error } = await supabase.from('safety_checklists').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['safety_checklists', employeeId])
  });

  const deleteSafetyChecklist = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('safety_checklists').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries(['safety_checklists', employeeId])
  });

  return { safetyChecklists, isLoading, addSafetyChecklist, updateSafetyChecklist, deleteSafetyChecklist };
} 