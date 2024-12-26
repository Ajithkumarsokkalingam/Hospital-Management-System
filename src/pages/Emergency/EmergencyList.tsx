import React from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import { AlertCircle } from 'lucide-react';

export function EmergencyList() {
  const { appointments } = useStore();
  const emergencies = appointments.filter(apt => apt.type === 'emergency');

  return (
    <div className="space-y-4">
      {emergencies.map((emergency) => (
        <Card key={emergency.id} className="border-l-4 border-red-500">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Emergency Case #{emergency.id.slice(0, 8)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(emergency.date).toLocaleDateString()} at {emergency.time}
                  </p>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  {emergency.status}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Respond Now
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}