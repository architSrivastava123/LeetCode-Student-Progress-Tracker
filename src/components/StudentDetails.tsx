import React from 'react';
import { Trophy, Target, ThumbsUp, Calendar, Trash2 } from 'lucide-react';
import { Student } from '../types/student';

interface StudentDetailsProps {
  student: Student;
  onRemove: (username: string) => void;
}

export function StudentDetails({ student, onRemove }: StudentDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{student.username}</h2>
          <p className="text-gray-500">{student.email}</p>
        </div>
        <button
          onClick={() => onRemove(student.username)}
          className="text-red-500 hover:text-red-700 p-2"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
          <Trophy className="text-blue-500" size={24} />
          <div>
            <p className="text-sm text-gray-600">Ranking</p>
            <p className="text-xl font-bold text-blue-600">
              {student.ranking.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg">
          <Target className="text-green-500" size={24} />
          <div>
            <p className="text-sm text-gray-600">Acceptance Rate</p>
            <p className="text-xl font-bold text-green-600">
              {student.acceptanceRate}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Problem Solving Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Easy</p>
              <p className="text-xl font-bold text-green-600">
                {student.easySolved}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Medium</p>
              <p className="text-xl font-bold text-yellow-600">
                {student.mediumSolved}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Hard</p>
              <p className="text-xl font-bold text-red-600">
                {student.hardSolved}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-500" />
              <h3 className="font-semibold">Activity</h3>
            </div>
            <div className="text-sm text-gray-500">
              Last active: {new Date(student.lastActive).toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg">
            <ThumbsUp className="text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Contribution Points</p>
              <p className="text-xl font-bold text-purple-600">
                {student.contributionPoints}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}