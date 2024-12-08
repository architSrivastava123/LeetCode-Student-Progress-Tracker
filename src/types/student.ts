export interface Student {
  username: string;
  email: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: string;
  ranking: number;
  contributionPoints: number;
  lastActive: Date;
  lastUpdated: Date;
}

export interface LeetCodeStats {
  status: string;
  message: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: string;
  ranking: number;
  contributionPoints: number;
}