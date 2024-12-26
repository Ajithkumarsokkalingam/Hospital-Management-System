import React from 'react';
import { EmergencyList } from './EmergencyList';
import { AlertCircle } from 'lucide-react';

function Emergency() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-8 h-8 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Emergency Cases
          </h1>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Report Emergency
        </button>
      </div>

      <EmergencyList />
    </div>
  );
}

export default Emergency;