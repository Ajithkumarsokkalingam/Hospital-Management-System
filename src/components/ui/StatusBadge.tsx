import React from 'react';

interface StatusBadgeProps {
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    confirmed: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    completed: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}