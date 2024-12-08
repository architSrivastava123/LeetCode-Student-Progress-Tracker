import { Student } from '../types/student';

export async function sendInactivityReminders(students: Student[]): Promise<void> {
  // In a real application, this would use a backend service to send emails
  // For demonstration, we'll just log the emails that would be sent
  students.forEach(student => {
    console.log(`Sending reminder email to ${student.email}`);
    console.log(`Subject: Stay Active on LeetCode!`);
    console.log(`
Dear ${student.username},

We noticed you haven't solved any new problems on LeetCode in the past 3 days. 
Remember, consistency is key to improving your coding skills!

Your current progress:
- Total problems solved: ${student.totalSolved}
- Current ranking: ${student.ranking}

Keep up the momentum and try to solve at least one problem daily!

Best regards,
LeetCode Student Tracker Team
    `);
  });
}