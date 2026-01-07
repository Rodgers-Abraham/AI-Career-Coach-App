import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Pathfinder from './pages/Pathfinder';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page: string) => {
    window.scrollTo(0, 0); // Scroll to top when changing pages
    setCurrentPage(page);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', position: 'relative' }}>
      
      {/* Background Orbs (Visual flair) */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      {/* NAVBAR */}
      <nav className="responsive-nav">
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer' }} onClick={() => navigateTo('home')}>
          🚀 AI Career Coach
        </h2>
        <div>
          <button onClick={() => navigateTo('home')} style={{ background: 'transparent', marginRight: '15px' }}>Home</button>
          <button onClick={() => navigateTo('dashboard')} style={{ marginRight: '15px' }}>Jobs</button>
          <button onClick={() => navigateTo('pathfinder')}>Student Guide</button>
        </div>
      </nav>

      {/* --- HOME PAGE LANDING --- */}
      {currentPage === 'home' && (
        <div style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* HERO SECTION */}
          <div style={{ textAlign: 'center', padding: '100px 0 60px 0' }}>
            <h1 className="animate-fade-in" style={{ 
              fontSize: '4.5rem', margin: '0 0 20px 0', lineHeight: 1.1,
              background: 'linear-gradient(to right, #00d2ff, #3a7bd5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' 
            }}>
              Design Your Future.<br /> Powered by AI.
            </h1>
            <p className="animate-fade-in animate-delay-1" style={{ fontSize: '1.4rem', color: '#aaa', maxWidth: '700px', margin: '0 auto 40px auto' }}>
              Stop guessing. Let artificial intelligence analyze your interests and match you with 
              real jobs and university courses in Kenya instantly.
            </p>
            <div className="animate-fade-in animate-delay-2">
              <button 
                onClick={() => navigateTo('pathfinder')}
                style={{ padding: '16px 40px', fontSize: '1.2rem', borderRadius: '50px', background: 'white', color: 'black', fontWeight: 'bold', marginRight: '20px' }}
              >
                I'm a Student 🎓
              </button>
              <button 
                onClick={() => navigateTo('dashboard')}
                style={{ padding: '16px 40px', fontSize: '1.2rem', borderRadius: '50px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                I'm Job Hunting 💼
              </button>
            </div>
          </div>

          {/* FEATURES GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', padding: '60px 0' }}>
            
            {/* Card 1 */}
            <div className="glass-card animate-fade-in animate-delay-3" style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🤖</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>AI Career Chatbot</h3>
              <p style={{ color: '#aaa' }}>
                Talk to our Gemini-powered AI. Tell it your hobbies (e.g., "I love gaming"), and it will recommend the perfect Kenyan degree for you.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card animate-fade-in animate-delay-3" style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌍</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Live Job Search</h3>
              <p style={{ color: '#aaa' }}>
                Access real-time job listings from Safaricom, Equity, and Google. We scan the web so you don't have to.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card animate-fade-in animate-delay-3" style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🇰🇪</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Kenyan Database</h3>
              <p style={{ color: '#aaa' }}>
                A complete database of courses from Universities, KMTC, and TVETs. Filter by county and institution type instantly.
              </p>
            </div>

          </div>

          {/* STATS SECTION */}
          <div className="glass-card animate-fade-in animate-delay-3" style={{ display: 'flex', justifyContent: 'space-around', padding: '40px', marginTop: '20px', textAlign: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#00d2ff' }}>47</h2>
              <p style={{ color: '#aaa' }}>Counties Covered</p>
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#00d2ff' }}>1000+</h2>
              <p style={{ color: '#aaa' }}>Courses Listed</p>
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#00d2ff' }}>24/7</h2>
              <p style={{ color: '#aaa' }}>AI Availability</p>
            </div>
          </div>

          {/* FOOTER */}
          <footer style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
            <p>&copy; 2026 AI Career Coach Kenya. Built with 🧠 and 💻.</p>
          </footer>

        </div>
      )}

      {/* --- PAGES --- */}
      {currentPage === 'pathfinder' && (
         <div className="animate-fade-in">
           <Pathfinder />
         </div>
      )}

      {currentPage === 'dashboard' && (
        <div className="animate-fade-in">
           <Dashboard />
        </div>
      )}

    </div>
  );
}