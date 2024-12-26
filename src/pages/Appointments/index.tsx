import React from 'react';
import { AppointmentList } from './AppointmentList';
import { AppointmentForm } from './AppointmentForm';
import { Calendar } from 'lucide-react';

function Appointments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Appointments
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AppointmentList />
        </div>
        <div>
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
}

export default Appointments;