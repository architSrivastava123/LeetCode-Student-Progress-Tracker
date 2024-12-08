import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface StudentFormProps {
  onAddStudent: (username: string, email: string) => void;
  isLoading: boolean;
}

export function StudentForm({ onAddStudent, isLoading }: StudentFormProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && email.trim()) {
      onAddStudent(username.trim(), email.trim());
      setUsername('');
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter LeetCode username"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter student email"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        <PlusCircle size={20} />
        Add Student
      </button>
    </form>
  );
}