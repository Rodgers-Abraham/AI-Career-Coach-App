import { JobService } from './job.service';

export class JobController {
  private jobService = new JobService();

  async findJobs(keyword: string) {
  
    return await this.jobService.searchLiveJobs(keyword);
  }
}