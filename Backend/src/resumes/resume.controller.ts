// resume.controller.ts
import { Resume } from './resume.entity';

export class ResumeController {

  // 1. UPLOAD RESUME
  // This listens for a POST request to '/resumes/upload'
  // It expects a file AND the ID of the user who owns it
  uploadResume(file: any, userId: string): any {
    console.log(`Received file: ${file.name} from User: ${userId}`);

    // Validation: Check if it is actually a PDF
    if (file.type !== 'application/pdf') {
      throw new Error("Error: Only PDF files are allowed!");
    }

    // Success response
    return {
      message: "File uploaded successfully",
      fileName: file.name,
      // In real life, this would be the path where we saved it
      path: `/uploads/${userId}/${file.name}`
    };
  }

  // 2. GET MY RESUMES
  // This listens for GET '/resumes/:userId'
  getResumes(userId: string): Resume[] {
    console.log("Fetching resumes for user:", userId);
    
    // We return an empty array [] for now until we connect the Service
    return [];
  }
}