import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import toast from 'react-hot-toast';

export function InventoryForm({ onClose }: { onClose: () => void }) {
  const { inventory: items, updateInventory } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    category: 'medicine' as 'medicine' | 'equipment' | 'consumable',
    quantity: 0,
    unit: '',
    threshold: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const item = {
      id: crypto.randomUUID(),
      ...formData,
      lastUpdated: new Date().toISOString(),
    };

    updateInventory(item.id, item);
    toast.success('Item added successfully!');
    onClose();
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Add Inventory Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            >
              <option value="medicine">Medicine</option>
              <option value="equipment">Equipment</option>
              <option value="consumable">Consumable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <input
              type="text"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              placeholder="e.g., pieces, boxes, ml"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              min="0"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Alert Threshold</label>
            <input
              type="number"
              value={formData.threshold}
              onChange={(e) => setFormData({ ...formData, threshold: parseInt(e.target.value) })}
              min="0"
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
            Add Item
          </button>
        </div>
      </form>
    </Card>
  );
}