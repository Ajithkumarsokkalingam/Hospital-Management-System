import React from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import { Stethoscope } from 'lucide-react';

export function DoctorList() {
  const { doctors, users } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctors.map((doctor) => {
        const user = users.find(u => u.id === doctor.userId);
        
        return (
          <Card key={doctor.id}>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-100 rounded-full">
                <Stethoscope className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Dr. {user?.name || 'Doctor'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {doctor.specialty}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {doctor.department}
                </p>
                <div className="mt-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    View Schedule
                  </button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}