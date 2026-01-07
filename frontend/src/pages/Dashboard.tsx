import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the shape of a Job object
interface Job {
  job_id: string;
  employer_name: string;
  employer_logo?: string;
  job_title: string;
  job_city: string;
  job_country: string;
  job_apply_link: string;
  job_description?: string;
}

export default function Dashboard() {
  const [keyword, setKeyword] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to search jobs
  const fetchJobs = async (searchTerm: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/jobs?keyword=${searchTerm}`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search automatically on first load
  useEffect(() => {
    fetchJobs('Software Developer');
  }, []);

  // List of fallback sites
  const externalSites = [
    { name: 'BrighterMonday', url: 'https://www.brightermonday.co.ke', desc: 'Best for Corporate Jobs in Kenya 🇰🇪' },
    { name: 'Fuzu', url: 'https://www.fuzu.com/kenya', desc: 'Career Coaching & Learning 🚀' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs', desc: 'Networking & International Jobs 🌍' },
    { name: 'MyJobMag', url: 'https://www.myjobmag.co.ke', desc: 'Daily Verified Listings ✅' },
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      
      {/* Background Orbs */}
      <div className="orb orb-1" style={{ top: '20%', left: '10%' }}></div>
      <div className="orb orb-2" style={{ bottom: '20%', right: '10%' }}></div>

      {/* HEADER SECTION */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>💼 Live Job Search</h1>
        <p style={{ color: '#aaa', fontSize: '1.2rem' }}>
          Real-time listings from top companies worldwide.
        </p>

        {/* MODERN SEARCH BAR */}
        <div style={{ 
          maxWidth: '600px', margin: '30px auto', display: 'flex', gap: '10px',
          background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '50px',
          border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)'
        }}>
          <input 
            type="text" 
            placeholder="e.g. Python, Nurse, Driver..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchJobs(keyword)}
            style={{ 
              flex: 1, padding: '15px 25px', borderRadius: '50px', border: 'none', 
              background: 'transparent', color: 'white', fontSize: '1.1rem', outline: 'none'
            }}
          />
          <button 
            onClick={() => fetchJobs(keyword)}
            disabled={loading}
            style={{ 
              borderRadius: '50px', padding: '15px 40px', fontSize: '1.1rem',
              background: '#646cff', color: 'white', border: 'none', cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* JOBS GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '30px', 
        width: '100%',
        paddingBottom: '50px'
      }}>
        {jobs.map((job) => (
          <div key={job.job_id} className="glass-card animate-fade-in" style={{ 
            padding: '25px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            position: 'relative', 
            height: 'auto', 
            minHeight: '280px'
          }}>
            
            {/* TOP: Logo & Title */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ 
                  width: '50px', height: '50px', borderRadius: '12px', background: 'white', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', 
                  marginRight: '15px', flexShrink: 0 
                }}>
                  <img 
                    src={job.employer_logo || `https://logo.clearbit.com/${job.employer_name.replace(/ /g, '')}.com`} 
                    alt={job.employer_name} 
                    style={{ width: '80%', height: 'auto', objectFit: 'contain' }} 
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('clearbit')) {
                        target.src = `https://logo.clearbit.com/${job.employer_name.replace(/ /g, '')}.com`;
                      } else {
                        target.style.display = 'none';
                      }
                    }} 
                  />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff', wordBreak: 'break-word' }}>{job.employer_name}</h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#aaa' }}>{job.job_city}, {job.job_country}</p>
                </div>
              </div>

              <h2 style={{ fontSize: '1.4rem', marginBottom: '10px', lineHeight: '1.3', wordWrap: 'break-word' }}>{job.job_title}</h2>
              
              <p style={{ 
                color: '#ccc', fontSize: '0.95rem', lineHeight: '1.5', 
                // FIX 3: Clean up the description clipping
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' 
              }}>
                {job.job_description ? job.job_description.substring(0, 150) + "..." : "No description available."}
              </p>
            </div>

            {/* BOTTOM: Apply Button */}
            <a 
              href={job.job_apply_link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'block', textAlign: 'center', marginTop: '20px', padding: '12px', 
                borderRadius: '8px', background: 'rgba(100, 108, 255, 0.2)', color: '#646cff', 
                textDecoration: 'none', fontWeight: 'bold', border: '1px solid rgba(100, 108, 255, 0.4)',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(100, 108, 255, 0.4)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(100, 108, 255, 0.2)'}
            >
              Apply Now 🚀
            </a>

          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {!loading && jobs.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>
          <h2>No jobs found. Try searching for something else!</h2>
        </div>
      )}
{/* --- NEW SECTION: EXTERNAL RESOURCES --- */}
      <div style={{ marginTop: '100px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#ccc' }}>Still looking? Explore these top sites:</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {externalSites.map((site) => (
            <a 
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card"
              style={{ 
              
                display: 'block', 
                textDecoration: 'none', 
                color: 'white', 
                padding: '20px', 
                textAlign: 'center', 
                transition: 'transform 0.2s', 
                border: '1px solid rgba(255,255,255,0.05)',
                height: '100%' 
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 style={{ color: '#00d2ff', marginBottom: '5px' }}>{site.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#aaa', margin: 0 }}>{site.desc}</p>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}