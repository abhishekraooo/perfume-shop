import { useState } from 'react';
import './Profile.css';

const Profile = () => {
  // Simulation State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fake Login Handler
  const handleLogin = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoading(false);
    }, 1500);
  };

  // 1. Guest View (Login Form)
  if (!isLoggedIn) {
    return (
      <div className="profile-container">
        <div className="login-card">
          <h1>Welcome Back</h1>
          <p style={{color:'#666', marginBottom:'30px'}}>Sign in to view your profile and orders.</p>
          
          {loading ? (
            <div style={{color:'#4285F4'}}>Connectings to Google...</div>
          ) : (
            <button className="google-btn" onClick={handleLogin}>
              <span>G</span> Sign in with Google
            </button>
          )}
          
          <p style={{fontSize:'0.8rem', color:'#aaa', marginTop:'20px'}}>
            (This is a simulation. No real data is sent.)
          </p>
        </div>
      </div>
    );
  }

  // 2. Logged In View (Dashboard)
  return (
    <div className="profile-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="avatar">A</div>
        <div className="user-info">
          <h2>Abhishek Rao</h2>
          <p>abhishek.demo@gmail.com</p>
        </div>
      </div>

      {/* User Details Grid */}
      <h3>Personal Details</h3>
      <div className="details-grid">
        <div className="detail-card">
          <label>Phone Number</label>
          <div className="value">+91 98765 43210</div>
        </div>
        <div className="detail-card">
          <label>Date of Birth</label>
          <div className="value">15 Aug 1998</div>
        </div>
        <div className="detail-card">
          <label>Membership</label>
          <div className="value" style={{color:'gold'}}>Gold Tier</div>
        </div>
        <div className="detail-card">
          <label>Total Orders</label>
          <div className="value">12</div>
        </div>
      </div>

      <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;