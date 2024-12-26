import React from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import { Package } from 'lucide-react';

export function InventoryList() {
  const { inventory } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {inventory.map((item) => (
        <Card key={item.id}>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-yellow-100 rounded-full">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quantity: {item.quantity} {item.unit}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Category: {item.category}
              </p>
              {item.quantity <= item.threshold && (
                <p className="text-sm text-red-600 mt-1">Low Stock Alert!</p>
              )}
              <div className="mt-2">
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  Update Stock
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}