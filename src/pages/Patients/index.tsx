import React, { useState } from 'react';
import { PatientList } from './PatientList';
import { PatientForm } from './PatientForm';
import { Modal } from '../../components/Modal';
import { Users } from 'lucide-react';

function Patients() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Patients
          </h1>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add New Patient
        </button>
      </div>

      <PatientList />

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <PatientForm onClose={() => setIsFormOpen(false)} />
      </Modal>
    </div>
  );
}

export default Patients;