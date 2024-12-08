import React, { useState, useEffect } from 'react';
import { Code2 } from 'lucide-react';
import { StudentForm } from './components/StudentForm';
import { AdminPanel } from './components/AdminPanel';
import { ReminderModal } from './components/ReminderModal';
import { StatsHeader } from './components/StatsHeader';
import { fetchLeetCodeStats } from './utils/leetcode';
import { Student } from './types/student';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    setShowReminder(true);
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0, 0);
    const timeUntilTomorrow = tomorrow.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      setShowReminder(true);
    }, timeUntilTomorrow);

    return () => clearTimeout(timeout);
  }, []);

  const handleAddStudent = async (username: string, email: string) => {
    if (students.some(student => student.username === username)) {
      setError('Student already exists!');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const stats = await fetchLeetCodeStats(username);
      const newStudent: Student = {
        username,
        email,
        totalSolved: stats.totalSolved,
        easySolved: stats.easySolved,
        mediumSolved: stats.mediumSolved,
        hardSolved: stats.hardSolved,
        acceptanceRate: stats.acceptanceRate,
        ranking: stats.ranking,
        contributionPoints: stats.contributionPoints,
        lastActive: new Date(),
        lastUpdated: new Date()
      };
      
      setStudents(prev => [...prev, newStudent]);
    } catch (err) {
      setError('Failed to fetch student data. Please check the username and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveStudent = (username: string) => {
    setStudents(prev => prev.filter(student => student.username !== username));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Code2 size={40} className="text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800">LeetCode Student Tracker</h1>
        </div>

        <StatsHeader students={students} />

        <div className="mb-8">
          <StudentForm onAddStudent={handleAddStudent} isLoading={isLoading} />
          {error && (
            <p className="mt-2 text-red-500">{error}</p>
          )}
        </div>

        <AdminPanel
          students={students}
          onRemoveStudent={handleRemoveStudent}
        />

        <ReminderModal
          isOpen={showReminder}
          onClose={() => setShowReminder(false)}
        />
      </div>
    </div>
  );
}

export default App;