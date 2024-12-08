import React from 'react';
import { Bell, X } from 'lucide-react';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReminderModal({ isOpen, onClose }: ReminderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Bell className="text-yellow-500" size={24} />
            <h2 className="text-xl font-bold">Daily Reminder</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Don't forget to solve at least one LeetCode problem today! Consistency is key to improving your coding skills.
          </p>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Daily Goals:</h3>
            <ul className="list-disc list-inside text-yellow-700 space-y-1">
              <li>Solve minimum 1 problem</li>
              <li>Review previous solutions</li>
              <li>Learn from discussion section</li>
            </ul>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}