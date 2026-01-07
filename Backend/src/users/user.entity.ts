import { Resume } from '../resumes/resume.entity';
export class User {
  id: string;

  username: string;
  email: string;

  passwordHash: string;

  isPremium: boolean = false;

  resumes: Resume[] = [];

  createdAt: Date = new Date();
}