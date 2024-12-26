import React, { useState } from 'react';
import { InventoryList } from './InventoryList';
import { InventoryForm } from './InventoryForm';
import { Modal } from '../../components/Modal';
import { Package } from 'lucide-react';

function Inventory() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Inventory
          </h1>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add New Item
        </button>
      </div>

      <InventoryList />

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <InventoryForm onClose={() => setIsFormOpen(false)} />
      </Modal>
    </div>
  );
}

export default Inventory;