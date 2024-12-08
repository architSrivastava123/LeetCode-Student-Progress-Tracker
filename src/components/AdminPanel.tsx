import React, { useState } from 'react';
import { Settings, Users, Bell, Mail } from 'lucide-react';
import { Student } from '../types/student';
import { StudentList } from './StudentList';
import { StudentDetails } from './StudentDetails';
import { sendInactivityReminders } from '../utils/email';

interface AdminPanelProps {
  students: Student[];
  onRemoveStudent: (username: string) => void;
}

export function AdminPanel({ students, onRemoveStudent }: AdminPanelProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState<'students' | 'settings'>('students');

  const handleSendReminders = async () => {
    const inactiveStudents = students.filter(student => {
      const lastActive = new Date(student.lastActive);
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      return lastActive < threeDaysAgo;
    });

    if (inactiveStudents.length > 0) {
      await sendInactivityReminders(inactiveStudents);
      alert(`Reminders sent to ${inactiveStudents.length} inactive students`);
    } else {
      alert('No inactive students found');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-2 px-6 py-4 focus:outline-none ${
              activeTab === 'students'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users size={20} />
            <span>Students</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-6 py-4 focus:outline-none ${
              activeTab === 'settings'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'students' ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
              <button
                onClick={handleSendReminders}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <Mail size={20} />
                Send Reminders
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <StudentList
                  students={students}
                  onSelectStudent={setSelectedStudent}
                  selectedStudent={selectedStudent}
                />
              </div>
              <div className="lg:col-span-2">
                {selectedStudent ? (
                  <StudentDetails
                    student={selectedStudent}
                    onRemove={onRemoveStudent}
                  />
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                    <Users size={48} className="mx-auto mb-4 text-gray-400" />
                    <p>Select a student to view their details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="text-gray-500" />
                  <div>
                    <h3 className="font-semibold">Email Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Send reminders for inactive students
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}