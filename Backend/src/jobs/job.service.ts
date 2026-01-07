import axios from 'axios'; 

export class JobService {
  
  // 1. THE REAL API FETCH (Optional - requires Key)
  async searchLiveJobs(keyword: string) {
    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: `${keyword} in Kenya`, // Forces search to look in Kenya
        num_pages: '1'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY as string,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    };

    try {
      // If we had a key, we would do this:
       const response = await axios.request(options);
      return response.data.data;

      // But for now, let's return the "High Quality Mock Data"
    //return this.getMockData(keyword);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // 2. THE HIGH-QUALITY MOCK DATA (With Real Logos!)
  // This mimics EXACTLY what the real API returns
  getMockData(keyword: string) {
    console.log(`Searching for: ${keyword}`);
    
    const allJobs = [
      {
        job_id: '1',
        job_title: 'Software Engineer',
        employer_name: 'Safaricom',
        employer_logo: 'https://logo.clearbit.com/safaricom.co.ke',
        job_city: 'Nairobi',
        job_country: 'KE',
        job_apply_link: 'https://www.safaricom.co.ke/careers',
        job_description: 'Join the MPESA team to build the next generation of fintech solutions. Requires Java, Spring Boot, and AWS experience.'
      },
      {
        job_id: '2',
        job_title: 'Digital Marketing Manager',
        employer_name: 'Equity Bank',
        employer_logo: 'https://logo.clearbit.com/equitygroupholdings.com',
        job_city: 'Nairobi',
        job_country: 'KE',
        job_apply_link: 'https://equitybank.group/careers',
        job_description: 'Lead our digital transformation strategies. Experience with SEO, Google Analytics, and Social Media campaigns required.'
      },
      {
        job_id: '3',
        job_title: 'Data Scientist',
        employer_name: 'Google',
        employer_logo: 'https://logo.clearbit.com/google.com',
        job_city: 'Nairobi',
        job_country: 'KE',
        job_apply_link: 'https://careers.google.com/locations/nairobi/',
        job_description: 'Work at the Microsoft Africa Development Center. Machine Learning and Python skills are a must.'
      },
      {
        job_id: '4',
        job_title: 'Registered Nurse',
        employer_name: 'Aga Khan Hospital',
        employer_logo: 'https://logo.clearbit.com/aku.edu',
        job_city: 'Mombasa',
        job_country: 'KE',
        job_apply_link: 'https://www.agakhanhospitals.org/nairobi',
        job_description: 'Emergency department nurse needed. Must have valid license from the Nursing Council of Kenya.'
      }
    ];

    // Simple filter to make the search bar work
    if (!keyword) return allJobs;
    return allJobs.filter(j => 
      j.job_title.toLowerCase().includes(keyword.toLowerCase()) || 
      j.employer_name.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}