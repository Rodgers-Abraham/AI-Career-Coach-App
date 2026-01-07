export class Job {
  id: string;
  title: string;
  company: string; // e.g., Safaricom, KRA
  location: string; // e.g., Nairobi, Mombasa, Remote
  salary: string; 
  type: string; // Job or Course
  requirements: string[]; // e.g., "KCSE B+", "Python"
}