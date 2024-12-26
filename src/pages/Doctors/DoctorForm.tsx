import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import toast from 'react-hot-toast';

export function DoctorForm({ onClose }: { onClose: () => void }) {
  const { addDoctor, currentUser } = useStore();
  const [formData, setFormData] = useState({
    specialty: '',
    department: '',
    availableDays: [] as string[],
    availableHours: [] as string[],
    phone: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const doctor = {
      id: crypto.randomUUID(),
      userId: currentUser?.id || '',
      specialty: formData.specialty,
      department: formData.department,
      availability: {
        days: formData.availableDays,
        hours: formData.availableHours,
      },
      contact: {
        phone: formData.phone,
        email: formData.email,
      },
    };

    addDoctor(doctor);
    toast.success('Doctor added successfully!');
    onClose();
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const toggleHour = (hour: string) => {
    setFormData(prev => ({
      ...prev,
      availableHours: prev.availableHours.includes(hour)
        ? prev.availableHours.filter(h => h !== hour)
        : [...prev.availableHours, hour],
    }));
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Specialty</label>
            <input
              type="text"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
          <div className="flex flex-wrap gap-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.availableDays.includes(day)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Hours</label>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 12 }, (_, i) => `${i + 8}:00`).map(hour => (
              <button
                key={hour}
                type="button"
                onClick={() => toggleHour(hour)}
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.availableHours.includes(hour)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </Card>
  );
}