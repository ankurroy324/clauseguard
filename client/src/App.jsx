import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import './index.css';

function App() {
  // Global fluid rainbow animation tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [dragOver, setDragOver] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'login', 'register', or null
  
  const { user, login, logout, loading: authLoading } = useContext(AuthContext);
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const analyze = async () => {
    if (!text && !file) {
      setError('Please paste some text or upload a file first.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        if (text) formData.append('text', text);
        
        response = await fetch('/api/analyze', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to analyze contract');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setText('');
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header__inner">
          <div className="header__logo">
            <svg className="header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <h1 className="header__name">ClauseGuard</h1>
          </div>
          
          <div className="header__actions">
            {!authLoading && user ? (
              <div className="user-menu">
                <span className="user-menu__name">{user.name}</span>
                <button className="header__btn header__btn--outline" onClick={logout}>Log Out</button>
              </div>
            ) : !authLoading && !user ? (
              <div className="auth-actions">
                <button className="header__btn header__btn--ghost" onClick={() => setAuthModal('login')}>Log In</button>
                <button className="header__btn header__btn--outline" onClick={() => setAuthModal('register')}>Sign Up</button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className="main">
        {!result ? (
          <>
            <section className="hero">
              <h2 className="hero__title">
                Uncover hidden <span className="hero__title--accent">risks</span>.
              </h2>
              <p className="hero__subtitle">
                Paste your contract or upload a document, and our AI will highlight the clauses you need to watch out for.
              </p>
            </section>

            <section className="input-area">
              <div className="textarea-wrap">
                <textarea
                  className="textarea"
                  placeholder="Paste your Terms & Conditions, Privacy Policy, or any legal contract here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
                <div className="textarea-footer">
                  <span>{text.length} characters</span>
                </div>
              </div>

              <div className="divider">
                <div className="divider__line"></div>
                <div className="divider__text">OR UPLOAD FILE</div>
                <div className="divider__line"></div>
              </div>

              <div
                className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="upload-zone__input"
                  accept=".txt,.pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <svg className="upload-zone__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <div className="upload-zone__text">
                  <strong>Click to upload</strong> or drag and drop
                </div>
                <span className="upload-zone__hint">PDF or TXT up to 5MB</span>
                
                {file && (
                  <div className="file-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    {file.name}
                    <button className="file-badge__remove" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFile(null); }}>&times;</button>
                  </div>
                )}
              </div>

              {error && (
                <div className="error-toast">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {error}
                </div>
              )}

              <button
                className={`btn-analyze ${loading ? 'loading' : ''}`}
                onClick={analyze}
                disabled={loading || (!text && !file)}
              >
                <span className="btn-analyze__text">Analyze Contract</span>
                <svg className="btn-analyze__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <div className="btn-analyze__loader">
                  <span></span><span></span><span></span>
                </div>
              </button>
            </section>
          </>
        ) : (
          <section className="results">
            <div className="score-banner">
              <div className="score-banner__left">
                <div className={`score-badge score-badge--${result.overallRiskScore?.toLowerCase() || 'medium'}`}>
                  Risk Level: {result.overallRiskScore}
                </div>
                <div className="score-meta">
                  <span>{result.totalClausesAnalyzed} clauses analyzed</span>
                </div>
              </div>
              <button className="btn-new" onClick={reset}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                New Scan
              </button>
            </div>

            <div className="glass-card summary-card">
              <h3 className="summary-card__title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Plain-English Summary
              </h3>
              <p className="summary-card__text">{result.summary}</p>
            </div>

            <div className="clauses-heading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Identified Risks
            </div>

            <div className="filter-bar">
              {['all', 'critical', 'high', 'medium', 'low'].map(severity => {
                const count = severity === 'all' 
                  ? result.clauses.length 
                  : result.clauses.filter(c => c.severity === severity).length;
                
                if (severity !== 'all' && count === 0) return null;
                
                return (
                  <button
                    key={severity}
                    className={`filter-chip ${activeFilter === severity ? 'active' : ''}`}
                    onClick={() => setActiveFilter(severity)}
                  >
                    {severity.charAt(0).toUpperCase() + severity.slice(1)} ({count})
                  </button>
                );
              })}
            </div>

            <div className="clauses-grid">
              {result.clauses.map((clause, idx) => (
                <ClauseCard key={idx} clause={clause} isVisible={activeFilter === 'all' || activeFilter === clause.severity} />
              ))}
            </div>
          </section>
        )}
      </main>
      {/* AUTH MODAL */}
      {authModal && (
        <div className="modal-overlay" onClick={() => setAuthModal(null)}>
          <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{authModal === 'login' ? 'Welcome Back' : 'Create an Account'}</h3>
              <button className="modal-close" onClick={() => setAuthModal(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <form 
                className="contact-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const btn = form.querySelector('button');
                  btn.disabled = true;
                  btn.innerText = 'Please wait...';
                  const data = {
                    email: form.email.value,
                    password: form.password.value,
                    ...(authModal === 'register' && { name: form.name.value })
                  };
                  try {
                    const res = await fetch(`/api/auth/${authModal}`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    });
                    const resData = await res.json();
                    if (!res.ok) throw new Error(resData.error);
                    
                    login(resData.token, resData.user);
                    setAuthModal(null);
                  } catch (err) {
                    alert(err.message);
                    btn.disabled = false;
                    btn.innerText = authModal === 'login' ? 'Log In' : 'Sign Up';
                  }
                }}
              >
                {authModal === 'register' && (
                  <input type="text" name="name" className="contact-form__input" placeholder="Your Name" required />
                )}
                <input type="email" name="email" className="contact-form__input" placeholder="Email Address" required />
                <input type="password" name="password" className="contact-form__input" placeholder="Password" required />
                <button type="submit" className="contact-form__button">
                  {authModal === 'login' ? 'Log In' : 'Sign Up'}
                </button>
              </form>
              <div className="auth-switch">
                {authModal === 'login' ? (
                  <>Don't have an account? <span onClick={() => setAuthModal('register')}>Sign up</span></>
                ) : (
                  <>Already have an account? <span onClick={() => setAuthModal('login')}>Log in</span></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function Footer() {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (e, title, content, isContact = false) => {
    e.preventDefault();
    setModalContent({ title, content, isContact });
  };

  return (
    <>
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <svg className="footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>ClauseGuard</span>
          </div>
          <div className="footer__links">
            <a href="#" onClick={(e) => openModal(e, 'Terms of Service', '1. Acceptance of Terms: By accessing or using ClauseGuard, you agree to be bound by these Terms of Service.\n\n2. Service Description: ClauseGuard is an AI-powered legal analysis tool designed for informational purposes only. It does not provide legal advice, nor does it create an attorney-client relationship.\n\n3. User Responsibilities: You are solely responsible for any documents you upload. Do not upload classified, illegal, or extremely sensitive materials.\n\n4. Limitation of Liability: ClauseGuard and its creators shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the service.\n\n5. Modifications: We reserve the right to modify these terms at any time without prior notice.')}>Terms of Service</a>
            <a href="#" onClick={(e) => openModal(e, 'Privacy Policy', '1. Data Collection: We collect the text and PDF documents you upload strictly for the purpose of analyzing them via our AI models.\n\n2. Data Retention: Uploaded files are immediately deleted from our servers after analysis. We do not store your contracts or terms of service permanently.\n\n3. Third-Party Services: ClauseGuard utilizes third-party AI APIs (e.g., Google Gemini). By using this service, your data is processed according to their respective privacy agreements.\n\n4. Analytics: We may collect anonymized usage data to improve the performance and accuracy of our models.\n\n5. Contact: For privacy concerns, please contact our support team.')}>Privacy Policy</a>
            <a href="#" onClick={(e) => openModal(e, 'Contact Support', null, true)}>Contact Support</a>
          </div>
          <div className="footer__disclaimer">
            This is a tool for informational purposes only. It does not constitute legal advice.
          </div>
        </div>
      </footer>

      {/* INFO MODALS (TOS, Privacy, Contact) */}
      {modalContent && (
        <div className="modal-overlay" onClick={() => setModalContent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalContent.title}</h3>
              <button className="modal-close" onClick={() => setModalContent(null)}>&times;</button>
            </div>
            <div className="modal-body">
              {modalContent.isContact ? (
                <form 
                  className="contact-form"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target;
                    const btn = form.querySelector('button');
                    btn.innerText = 'Sending...';
                    btn.disabled = true;
                    try {
                      const res = await fetch('/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: form.name.value,
                          email: form.email.value,
                          message: form.message.value
                        })
                      });
                      const data = await res.json();
                      if (!res.ok) throw new Error(data.error);
                      btn.innerText = 'Sent successfully!';
                      btn.style.background = 'var(--sev-low)';
                      setTimeout(() => setModalContent(null), 1500);
                    } catch (err) {
                      btn.innerText = 'Error sending';
                      btn.disabled = false;
                      alert(err.message);
                    }
                  }}
                >
                  <input type="text" name="name" placeholder="Your Name" required className="contact-form__input" />
                  <input type="email" name="email" placeholder="Your Email Address" required className="contact-form__input" />
                  <textarea name="message" placeholder="How can we help you?" required className="contact-form__textarea"></textarea>
                  <button type="submit" className="contact-form__button">Send Message</button>
                </form>
              ) : (
                <p style={{ whiteSpace: 'pre-wrap' }}>{modalContent.content}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ClauseCard({ clause, isVisible }) {
  const [showOriginal, setShowOriginal] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="clause-card" data-severity={clause.severity}>
      <div className="clause-card__header">
        <h4 className="clause-card__title">{clause.title}</h4>
        <div className="clause-card__badges">
          <span className={`severity-tag severity-tag--${clause.severity}`}>
            {clause.severity}
          </span>
          <span className="category-tag">{clause.category}</span>
        </div>
      </div>
      <p className="clause-card__explanation">{clause.explanation}</p>
      
      <button 
        className="clause-card__toggle" 
        onClick={() => setShowOriginal(!showOriginal)}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {showOriginal ? (
            <polyline points="18 15 12 9 6 15"></polyline>
          ) : (
            <polyline points="6 9 12 15 18 9"></polyline>
          )}
        </svg>
        {showOriginal ? 'Hide original text' : 'Show original text'}
      </button>
      
      {showOriginal && (
        <div className="clause-card__quote">
          "{clause.originalText}"
        </div>
      )}

      {clause.recommendation && (
        <div className="clause-card__rec">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          {clause.recommendation}
        </div>
      )}
    </div>
  );
}

export default App;
