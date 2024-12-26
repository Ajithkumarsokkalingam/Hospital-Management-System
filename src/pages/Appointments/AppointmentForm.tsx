import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import { Label, Text } from '../../components/ui/Typography';
import toast from 'react-hot-toast';

export function AppointmentForm() {
  const { doctors, addAppointment, currentUser } = useStore();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctorId: '',
    type: 'regular' as 'regular' | 'emergency',
    notes: '',
  });

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  // Update available time slots based on selected doctor and date
  useEffect(() => {
    if (formData.doctorId && formData.date) {
      const doctor = doctors.find(d => d.id === formData.doctorId);
      if (doctor) {
        const dayOfWeek = new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long' });
        if (doctor.availability.days.includes(dayOfWeek)) {
          setAvailableSlots(doctor.availability.hours);
        } else {
          setAvailableSlots([]);
          toast.error('Doctor not available on selected day');
        }
      }
    }
  }, [formData.doctorId, formData.date, doctors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error('Please log in to book an appointment');
      return;
    }

    const appointment = {
      id: crypto.randomUUID(),
      patientId: currentUser.id,
      doctorId: formData.doctorId,
      date: formData.date,
      time: formData.time,
      status: 'pending',
      type: formData.type,
      notes: formData.notes,
    };

    addAppointment(appointment);
    toast.success('Appointment scheduled successfully!');
    
    // Reset form
    setFormData({
      date: '',
      time: '',
      doctorId: '',
      type: 'regular',
      notes: '',
    });
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Select Doctor</Label>
          <select
            value={formData.doctorId}
            onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Choose a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.specialty}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Date</Label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <Label>Time</Label>
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
              required
              disabled={availableSlots.length === 0}
            >
              <option value="">Select time</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {availableSlots.length === 0 && formData.date && (
              <Text className="mt-1 text-red-500">
                No available slots for selected date
              </Text>
            )}
          </div>
        </div>

        <div>
          <Label>Appointment Type</Label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'regular' | 'emergency' })}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="regular">Regular</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>

        <div>
          <Label>Notes</Label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
            placeholder="Any additional information..."
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Schedule Appointment
        </button>
      </form>
    </Card>
  );
}