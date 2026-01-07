import { useState, useEffect } from 'react';

export default function Pathfinder() {
  // --- STATE ---
  const [messages, setMessages] = useState<{sender: 'user' | 'bot', text: string}[]>([
    { sender: 'bot', text: 'Hello! I am your AI Career Coach. Tell me what you love doing, and I will recommend a course in Kenya!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Database State
  const [counties, setCounties] = useState<string[]>([]);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [institutions, setInstitutions] = useState<string[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [courses, setCourses] = useState<any>(null);

  // --- LOGIC ---
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('https://ai-career-coach-app-kbcq.onrender.com/pathfinder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interest: userMsg })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.recommended_course }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: "Connection error. Try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    fetch('https://ai-career-coach-app-kbcq.onrender.com/locations/counties').then(res => res.json()).then(setCounties);
  }, []);

  const handleCountyChange = (val: string) => {
    setSelectedCounty(val); setSelectedType(''); setInstitutions([]); setCourses(null);
    fetch(`https://ai-career-coach-app-kbcq.onrender.com/locations/types?county=${val}`).then(res => res.json()).then(setTypes);
  };
  const handleTypeChange = (val: string) => {
    setSelectedType(val); setSelectedInstitution(''); setCourses(null);
    fetch(`https://ai-career-coach-app-kbcq.onrender.com/locations/institutions?county=${selectedCounty}&type=${val}`).then(res => res.json()).then(setInstitutions);
  };
  const handleInstitutionChange = (val: string) => {
    setSelectedInstitution(val);
    fetch(`https://ai-career-coach-app-kbcq.onrender.com/locations/courses?county=${selectedCounty}&type=${selectedType}&institution=${val}`).then(res => res.json()).then(setCourses);
  };

  // --- RENDER ---
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '10px' }}>🇰🇪 Education Hub</h1>
      <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '50px' }}>
        Ask the AI or Search the Database.
      </p>

      {/* GRID LAYOUT */}
      <div className="responsive-grid">
        
        {/* --- LEFT: AI CHAT --- */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #444' }}>
          <h2 style={{ borderBottom: '1px solid #444', paddingBottom: '10px', margin: '0 0 20px 0' }}>🤖 AI Assistant</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#646cff' : '#333',
                color: 'white',
                padding: '12px 18px',
                borderRadius: '15px',
                maxWidth: '85%',
                lineHeight: '1.5',
                textAlign: 'left'
              }}>
                {msg.text}
              </div>
            ))}
            {isTyping && <div style={{ color: '#aaa', fontStyle: 'italic' }}>AI is typing...</div>}
          </div>

          <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #444', paddingTop: '20px' }}>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type here..."
              style={{ flex: 1, padding: '15px', borderRadius: '30px', border: '1px solid #555', background: '#222', color: 'white' }}
            />
            <button 
              onClick={sendMessage} 
              style={{ borderRadius: '50%', width: '50px', height: '50px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', background: '#646cff', border: 'none', cursor: 'pointer' }}
            >
              ➤
            </button>
          </div>
        </div>

        {/* --- RIGHT: DATABASE SEARCH --- */}
        <div className="glass-card" style={{ borderLeft: '5px solid #00d2ff' }}>
          <h2>🏛️ Search Institutions</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>County</label>
            <select value={selectedCounty} onChange={(e) => handleCountyChange(e.target.value)} style={selectStyle}>
              <option value="">-- Select --</option>
              {counties.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {selectedCounty && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>Type</label>
              <select value={selectedType} onChange={(e) => handleTypeChange(e.target.value)} style={selectStyle}>
                <option value="">-- Select --</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          )}

          {selectedType && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>Institution</label>
              <select value={selectedInstitution} onChange={(e) => handleInstitutionChange(e.target.value)} style={selectStyle}>
                <option value="">-- Select --</option>
                {institutions.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          )}

          {courses && (
            <div style={{ marginTop: '30px' }}>
              {Object.keys(courses).map(level => (
                <div key={level} style={{ marginBottom: '20px' }}>
                  <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '5px', color: '#00d2ff' }}>{level}s</h3>
                  <ul style={{ paddingLeft: '20px', color: '#ddd' }}>
                    {courses[level].map((c: string) => <li key={c} style={{ marginBottom: '5px' }}>{c}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const selectStyle = { width: '100%', padding: '12px', borderRadius: '8px', background: '#222', color: 'white', border: '1px solid #444' };