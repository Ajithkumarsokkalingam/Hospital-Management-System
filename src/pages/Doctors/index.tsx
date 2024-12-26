import React, { useState } from 'react';
import { DoctorList } from './DoctorList';
import { DoctorForm } from './DoctorForm';
import { Modal } from '../../components/Modal';
import { Stethoscope } from 'lucide-react';

function Doctors() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Stethoscope className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Doctors
          </h1>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add New Doctor
        </button>
      </div>

      <DoctorList />

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <DoctorForm onClose={() => setIsFormOpen(false)} />
      </Modal>
    </div>
  );
}

export default Doctors;