// resume.service.ts
import { Resume } from './resume.entity';

export class ResumeService {
  private resumes: Resume[] = [];

  // 1. ANALYZE RESUME (The AI Part)
  async analyzeResume(file: any, userId: string): Promise<any> {
    console.log("Service: Starting AI analysis...");

    // Step A: Simulate extracting text from PDF
    // In real code: const text = await pdfParser(file);
    const extractedText = "Experience: I am a software engineer with 5 years of Python...";
    
    // Step B: Simulate calling an AI API (like OpenAI)
    // We check for keywords based on our logic
    const score = this.calculateScore(extractedText);
    
    // Step C: Save the result
    const newResume = new Resume();
    newResume.id = "res-" + (this.resumes.length + 1);
    newResume.userId = userId;
    newResume.content = extractedText;
    
    this.resumes.push(newResume);

    return {
      status: "Analysis Complete",
      resumeScore: score,
      tips: score > 50 ? "Great job!" : "Try adding more keywords."
    };
  }

  // 2. HELPER FUNCTION (The logic we discussed earlier)
  private calculateScore(text: string): number {
    let score = 0;
    // Simple logic: If they mention "Python", they get points
    if (text.includes("Python")) score += 30;
    if (text.includes("engineer")) score += 20;
    if (text.includes("lead")) score += 10;
    return score;
  }
}