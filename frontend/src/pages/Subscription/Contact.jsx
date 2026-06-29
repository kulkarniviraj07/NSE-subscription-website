import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Clock, Twitter, Linkedin, Facebook, MessageCircle, X, PhoneCall, Instagram, Youtube, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showFinalSuccess, setShowFinalSuccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [contactData, setContactData] = useState({ name: "", phone: "" });

  // WhatsApp Number Configuration
  const WHATSAPP_NUMBER = "919529988048"; 

  const handleInitialSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('user_name'),
      phone: formData.get('user_contact'),
      timestamp: new Date().toISOString()
    };
    setContactData(data);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPopup(true);
    }, 800);
  };

  const handleSelection = (selection) => {
    const message = encodeURIComponent(`Hi, I'm ${userName}. I'm interested in ${selection} unlisted shares.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    setShowPopup(false);
    setShowFinalSuccess(true);
  };

  const resetAll = () => {
    setShowFinalSuccess(false);
    setShowPopup(false);
    setUserName("");
    form.current.reset();
  };

  return (
    <div style={{ backgroundColor: '#0b1a30', fontFamily: 'Inter, sans-serif', position: 'relative' }}>
      
      {/* Contact Section */}
      <div style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ color: '#f3eded', fontSize: '2.8rem', fontWeight: 'bold' }}>
              Connect with <span style={{ color: '#00d09c' }}>Experts</span>
            </h1>
            <p style={{ color: '#94a3b8', marginTop: '15px', fontSize: '1.1rem' }}>
              Quick support for your equity alerts.
            </p>
          </div>

          <div style={layoutGrid}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}> 
              <a href = "tel:+919529988048"style={{textDecoration:"none"}}><div style={infoCard}><div style={iconCircle}><Phone size={22} color="#00d09c"/></div><div><h4 style={infoTitle}>Call Us</h4><p style={infoText}>+91 95299 88048</p></div></div></a>
              <a href = "mailto:support@unlistedshares.com"style={{textDecoration:"none"}}><div style={infoCard}><div style={iconCircle}><Mail size={22}color="#00d09c"/></div><div><h4 style={infoTitle}>Email Us</h4><p style={infoText}>support@equityalerts.com</p></div></div></a>
              <div style={infoCard}><div style={iconCircle}><MapPin size={22} color="#00d09c" /></div><div><h4 style={infoTitle}>Corporate Office</h4><p style={infoText}>Parbhani, India</p></div></div>
              
              {/* WhatsApp Tile (Now Last) */}
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <div style={infoCard}>
                  <div style={iconCircle}><MessageCircle size={22} color="#00d09c" /></div>
                  <div>
                    <h4 style={infoTitle}>WhatsApp</h4>
                    <p style={{ ...infoText, color: '#45504a', fontWeight: 'bold' }}>+91 95299 88048</p> 
                  </div>
                </div>
              </a>
            </div>

            <div style={formContainer}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <PhoneCall size={20} color="#00d09c" />
                <h3 style={{ color: '#0b1a30', margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}>Request a Callback</h3>
              </div>
              <form ref={form} onSubmit={handleInitialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={inputGroup}>
                  <label style={labelStyle}>Full Name</label>
                  <input name="user_name" required type="text" placeholder="Enter Your Name" style={inputStyle} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div style={inputGroup}>
                  <label style={labelStyle}>Contact Number</label>
                  <input name="user_contact" required type="tel" placeholder="+91 XXXXX XXXXX" style={inputStyle} />
                </div>
                <button type="submit" disabled={isSubmitting} style={submitButton}>
                  {isSubmitting ? "Processing..." : "Get Started"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Modal 1: Interest Selection */}
      {showPopup && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <CheckCircle size={50} color="#00d09c" style={{ marginBottom: '15px' }} />
            <h2 style={{ color: '#0b1a30', marginBottom: '10px' }}>Hello, {userName}!</h2>
            <p style={{ color: '#475569', marginBottom: '25px' }}>How would you like us to assist you today?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              <button style={optionBtn} onClick={() => handleSelection("Buying")}>I want to BUY unlisted shares</button>
              <button style={optionBtn} onClick={() => handleSelection("Selling")}>I want to SELL my shares</button>
              <button style={optionBtn} onClick={() => handleSelection("Advice")}>I need investment advice</button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up Modal 2: Final Success */}
      {showFinalSuccess && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <div style={successIconBg}><Send size={30} color="#fff" /></div>
            <h2 style={{ color: '#0b1a30', marginBottom: '10px' }}>Request Accepted!</h2>
            <p style={{ color: '#475569', marginBottom: '25px', lineHeight: '1.6' }}>
              Thank you, <strong>{userName}</strong>. Our team will call you on <strong>{contactData.phone}</strong> shortly. WhatsApp has also been initiated for your convenience.
            </p>
            <button style={{ ...submitButton, width: '100%' }} onClick={resetAll}>Got it!</button>
          </div>
        </div>
      )}

      {/* --- FULL COMPLETED FOOTER SECTION --- */}
      <footer style={footerStyle}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          
          {/* Section 1: Brand Info */}
          <div>
            <h3 style={{ color: '#00d09c', fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '15px' }}>UnlistedShares</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
              India's leading platform for unlisted and pre-IPO shares. Bringing transparency and trust to private markets.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <Facebook size={20} color="#94a3b8" cursor="pointer" />
              <Twitter size={20} color="#94a3b8" cursor="pointer" />
              <Linkedin size={20} color="#94a3b8" cursor="pointer" />
              <Instagram size={20} color="#94a3b8" cursor="pointer" />
              <Youtube size={20} color="#94a3b8" cursor="pointer" />
            </div>
        </div>

          {/* Section 4: Others/Legal */}
          <div>
            <h4 style={footerColTitle}>Others</h4>
            <ul style={footerList}>
              <li style={{ marginBottom: '15px' }}><Link to="/about" style={footerLink}>About Us</Link></li>
              <li style={{ marginBottom: '15px' }}><Link to="/contact" style={footerLink}>Contact Us</Link></li>
              <li style={{ marginBottom: '15px' }}><Link to="/privacy-policy" style={footerLink}>Privacy Policy</Link></li>
              <li style={{ marginBottom: '15px' }}><Link to="/terms" style={footerLink}>Terms & Conditions</Link></li>
              <li style={{ marginBottom: '15px' }}><Link to="/disclaimer" style={footerLink}>Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #1e293b', marginTop: '60px', paddingTop: '30px', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            © 2026 EquityAlerts. All Rights Reserved..
          </p>
        </div>
      </footer>
    </div>
  );
};

// --- Styles (Restored) ---
const layoutGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' };
const infoCard = { backgroundColor: '#fff', padding: '25px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '18px', border: '1px solid #e2e8f0' };
const whatsappIconCircle = { backgroundColor: '#25D366', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const iconCircle = { backgroundColor: '#f0fdf4', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const infoTitle = { margin: 0, fontSize: '1.1rem', color: '#0b1a30', fontWeight: 'bold' };
const infoText = { margin: '4px 0 0 0', fontSize: '0.95rem', color: '#475569' };
const formContainer = { backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' };
const inputGroup = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '0.9rem', fontWeight: '600', color: '#475569' };
const inputStyle = { padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' };
const submitButton = { backgroundColor: '#00d09c', color: '#0b1a30', padding: '16px', borderRadius: '12px', border: 'none', fontSize: '1rem', fontWeight: '700', cursor: 'pointer' };

const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(11, 26, 48, 0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContent = { backgroundColor: '#fff', padding: '40px', borderRadius: '24px', maxWidth: '450px', width: '90%', textAlign: 'center', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' };
const successIconBg = { backgroundColor: '#00d09c', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' };
const optionBtn = { backgroundColor: '#f8fafc', color: '#0b1a30', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: '600', cursor: 'pointer', textAlign: 'left', marginBottom: '10px' };

const footerStyle = { backgroundColor: '#0b1a30', borderTop: '1px solid #1e293b', padding: '80px 20px 40px 20px' };
const footerColTitle = { color: '#f3eded', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '25px' };
const footerList = { listStyle: 'none', padding: 0, margin: 0 };
const footerLink = { color: '#94a3b8', fontSize: '0.9rem', textDecoration: 'none', display: 'block' };

export default ContactUs;