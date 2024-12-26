import React from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import { User } from 'lucide-react';

export function PatientList() {
  const { patients, users } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => {
        const user = users.find(u => u.id === patient.userId);
        
        return (
          <Card key={patient.id}>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {user?.name || 'Patient'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Blood Group: {patient.bloodGroup}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
                </p>
                <div className="mt-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    View Details
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