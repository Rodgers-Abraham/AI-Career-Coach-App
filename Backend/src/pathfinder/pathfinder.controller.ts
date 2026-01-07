import { PathfinderService } from './pathfinder.service';

export class PathfinderController {
  private service = new PathfinderService();

  async recommend(interest: string) {
    // Now we use 'await' because the AI takes a second to think
    const reply = await this.service.chatWithAI(interest, []);
    return {
      interest: interest,
      recommended_course: reply
    };
  }

  // ... keep the other location methods (getCounties, etc.) ...
  getCounties() { return this.service.getCounties(); }
  getTypes(c: string) { return this.service.getTypesInCounty(c); }
  getInstitutions(c: string, t: string) { return this.service.getInstitutions(c, t); }
  getCourses(c: string, t: string, i: string) { return this.service.getCourses(c, t, i); }
}