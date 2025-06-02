import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export function useDailyLogs(employeeId?: string) {
  const queryClient = useQueryClient();

  const { data: dailyLogs = [], isLoading } = useQuery(['daily_logs', employeeId], async () => {
    let query = supabase.from('daily_logs').select('*').order('date', { ascending: false });
    if (employeeId) query = query.eq('employee_id', employeeId);
    const { data, error } = await query;
    if (error) throw error;
    return data as Tables<'daily_logs'>[];
  });

  const addDailyLog = useMutation({
    mutationFn: async (log: Omit<Tables<'daily_logs'>, 'id'>) => {
      const { data, error } = await supabase.from('daily_logs').insert(log).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['daily_logs', employeeId])
  });

  const updateDailyLog = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Tables<'daily_logs'>> }) => {
      const { data, error } = await supabase.from('daily_logs').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['daily_logs', employeeId])
  });

  const deleteDailyLog = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('daily_logs').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries(['daily_logs', employeeId])
  });

  return { dailyLogs, isLoading, addDailyLog, updateDailyLog, deleteDailyLog };
} 