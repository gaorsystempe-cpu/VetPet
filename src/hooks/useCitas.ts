import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Appointment, AppointmentStatus } from '../types';

export function useCitas() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          pet:pets(*),
          service:services(*),
          client:clients(*)
        `)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: AppointmentStatus) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      await fetchAppointments();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const createAppointment = async (appointmentData: any) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .insert([appointmentData]);
      if (error) throw error;
      await fetchAppointments();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return { appointments, loading, error, fetchAppointments, updateStatus, createAppointment };
}
