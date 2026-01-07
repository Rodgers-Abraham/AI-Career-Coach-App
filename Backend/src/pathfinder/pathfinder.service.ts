import { GoogleGenerativeAI } from "@google/generative-ai";
import { KenyaEducationDB } from './kenya_education_db';

// 1. Setup the AI Model
// Remember to replace this with your actual API Key from Google AI Studio
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export class PathfinderService {
  
  // --- REAL AI CHAT LOGIC ---
  async chatWithAI(userMessage: string, history: string[]): Promise<string> {
    try {
      const prompt = `
        You are a helpful, encouraging Kenyan Career Coach for students.
        The user says: "${userMessage}"
        
        Rules:
        1. Recommend specific Kenyan courses (Degrees/Diplomas) based on their interest.
        2. Mention specific Kenyan universities (UoN, KU, JKUAT, KMTC) if relevant.
        3. Be conversational and short (max 3 sentences).
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("AI Error:", error);
      return "I'm having trouble connecting to my brain right now. Please try again!";
    }
  }

  // --- DATABASE LOGIC (Fixed Type Errors) ---
  
  getCounties() { 
    return Object.keys(KenyaEducationDB); 
  }

  getTypesInCounty(county: string) {
    // We cast to 'any' to stop TypeScript from complaining about the index
    const data = (KenyaEducationDB as any)[county];
    if (!data) return [];
    return Object.keys(data);
  }

  getInstitutions(county: string, type: string) {
    const countyData = (KenyaEducationDB as any)[county];
    if (!countyData) return [];
    
    const institutions = countyData[type];
    if (!institutions) return [];

    return Object.keys(institutions);
  }

  getCourses(county: string, type: string, institution: string) {
    const countyData = (KenyaEducationDB as any)[county];
    if (!countyData) return {};

    const typeData = countyData[type];
    if (!typeData) return {};

    const courseList = typeData[institution];
    return courseList || {};
  }
}