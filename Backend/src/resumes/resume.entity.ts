// resume.entity.ts

// We import the User class so we can link to it
import { User } from '../users/user.entity'; 

export class Resume {
  // 1. Unique ID for this specific resume
  id: string;

  // 2. The Title: Helps the user organize (e.g., "Google Application" vs "Startup Resume")
  title: string;

  // 3. The Content: This is the raw text extracted from the PDF
  // We need this text specifically for the AI to analyze keywords
  content: string;

  // 4. File Path: Where the actual PDF is stored (e.g., "uploads/my-cv.pdf")
  filePath: string;

  // 5. The Link: This connects this resume back to a specific User
  user: User; 
  userId: string; // The ID of the user who owns this

  // 6. Timestamp
  createdAt: Date = new Date();
}