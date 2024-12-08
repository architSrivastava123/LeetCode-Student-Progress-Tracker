import React from 'react';
import { Download, Users } from 'lucide-react';
import { Student } from '../types/student';
import { exportToExcel } from '../utils/excel';

interface StatsHeaderProps {
  students: Student[];
}

export function StatsHeader({ students }: StatsHeaderProps) {
  const totalStudents = students.length;
  const averageSolved = students.length
    ? Math.round(students.reduce((acc, s) => acc + s.totalSolved, 0) / students.length)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Class Statistics</h2>
        <button
          onClick={() => exportToExcel(students)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Download size={20} />
          Export to Excel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
          <Users className="text-blue-500" size={24} />
          <div>
            <p className="text-sm text-gray-600">Total Students</p>
            <p className="text-2xl font-bold text-blue-600">{totalStudents}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg">
          <div className="text-green-500 text-xl font-bold">Ø</div>
          <div>
            <p className="text-sm text-gray-600">Average Problems Solved</p>
            <p className="text-2xl font-bold text-green-600">{averageSolved}</p>
          </div>
        </div>
      </div>
    </div>
  );
}