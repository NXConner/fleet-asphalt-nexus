import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export function useObjectives(assignedTo?: string) {
  const queryClient = useQueryClient();

  const { data: objectives = [], isLoading } = useQuery(['objectives', assignedTo], async () => {
    let query = supabase.from('objectives').select('*').order('due_date', { ascending: true });
    if (assignedTo) query = query.eq('assigned_to', assignedTo);
    const { data, error } = await query;
    if (error) throw error;
    return data as Tables<'objectives'>[];
  });

  const addObjective = useMutation({
    mutationFn: async (objective: Omit<Tables<'objectives'>, 'id'>) => {
      const { data, error } = await supabase.from('objectives').insert(objective).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['objectives', assignedTo])
  });

  const updateObjective = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Tables<'objectives'>> }) => {
      const { data, error } = await supabase.from('objectives').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(['objectives', assignedTo])
  });

  const deleteObjective = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('objectives').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries(['objectives', assignedTo])
  });

  return { objectives, isLoading, addObjective, updateObjective, deleteObjective };
} 