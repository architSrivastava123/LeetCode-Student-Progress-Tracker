import React from 'react';
import { User, CheckCircle, XCircle } from 'lucide-react';
import { Student } from '../types/student';

interface StudentListProps {
  students: Student[];
  selectedStudent: Student | null;
  onSelectStudent: (student: Student) => void;
}

export function StudentList({ students, selectedStudent, onSelectStudent }: StudentListProps) {
  const isStudentActive = (student: Student) => {
    const lastActive = new Date(student.lastActive);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return lastActive >= threeDaysAgo;
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-700">Students ({students.length})</h3>
      </div>
      <div className="divide-y">
        {students.map(student => (
          <button
            key={student.username}
            onClick={() => onSelectStudent(student)}
            className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
              selectedStudent?.username === student.username ? 'bg-blue-50' : ''
            }`}
          >
            <User
              size={24}
              className={
                selectedStudent?.username === student.username
                  ? 'text-blue-500'
                  : 'text-gray-400'
              }
            />
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">{student.username}</p>
              <p className="text-sm text-gray-500">
                Solved: {student.totalSolved} problems
              </p>
            </div>
            {isStudentActive(student) ? (
              <CheckCircle size={20} className="text-green-500" />
            ) : (
              <XCircle size={20} className="text-red-500" />
            )}
          </button>
        ))}
        {students.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No students added yet
          </div>
        )}
      </div>
    </div>
  );
}