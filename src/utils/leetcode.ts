import axios from 'axios';
import { LeetCodeStats } from '../types/student';

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  try {
    const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch LeetCode stats');
  }
}