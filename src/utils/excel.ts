import * as XLSX from 'xlsx';
import { Student } from '../types/student';

export function exportToExcel(students: Student[]): void {
  const worksheet = XLSX.utils.json_to_sheet(
    students.map(student => ({
      Username: student.username,
      'Total Solved': student.totalSolved,
      'Easy Problems': student.easySolved,
      'Medium Problems': student.mediumSolved,
      'Hard Problems': student.hardSolved,
      'Acceptance Rate': student.acceptanceRate,
      Ranking: student.ranking,
      'Contribution Points': student.contributionPoints
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students Progress');
  XLSX.writeFile(workbook, 'leetcode-progress.xlsx');
}