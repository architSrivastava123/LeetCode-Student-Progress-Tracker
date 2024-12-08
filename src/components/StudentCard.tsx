import React from 'react';
import { Trophy, Target, ThumbsUp } from 'lucide-react';
import { Student } from '../types/student';

interface StudentCardProps {
  student: Student;
  onRemove: (username: string) => void;
}

export function StudentCard({ student, onRemove }: StudentCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{student.username}</h3>
        <button
          onClick={() => onRemove(student.username)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          <div>
            <p className="text-sm text-gray-600">Ranking</p>
            <p className="font-semibold">{student.ranking.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Target className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Acceptance Rate</p>
            <p className="font-semibold">{student.acceptanceRate}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Solved:</span>
          <span className="font-semibold">{student.totalSolved}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-green-600">Easy:</span>
          <span className="font-semibold text-green-600">{student.easySolved}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-yellow-600">Medium:</span>
          <span className="font-semibold text-yellow-600">{student.mediumSolved}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-red-600">Hard:</span>
          <span className="font-semibold text-red-600">{student.hardSolved}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex items-center gap-2">
        <ThumbsUp className="text-purple-500" />
        <div>
          <p className="text-sm text-gray-600">Contribution Points</p>
          <p className="font-semibold">{student.contributionPoints}</p>
        </div>
      </div>
    </div>
  );
}