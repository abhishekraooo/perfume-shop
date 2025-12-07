import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [heroProduct, setHeroProduct] = useState(null);

  useEffect(() => {
    // Fetch all products, then find the Hero
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const hero = res.data.find(p => p.isComingSoon === true);
        setHeroProduct(hero);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="landing-container">
      {/* 1. Marquee Strip */}
      <div className="marquee-strip">
        <div className="marquee-content">
          COMING SOON &nbsp;•&nbsp; MYSTERY COLLECTION &nbsp;•&nbsp; LAUNCHING WINTER 2025 &nbsp;•&nbsp; 
          COMING SOON &nbsp;•&nbsp; MYSTERY COLLECTION &nbsp;•&nbsp; LAUNCHING WINTER 2025 &nbsp;•&nbsp;
        </div>
      </div>

      {heroProduct ? (
        <>
          {/* 2. Floating Image */}
          <div className="hero-image-container">
            <img src={heroProduct.image} alt="Hero Perfume" className="hero-img" />
          </div>

          {/* 3. Text Overlay */}
          <div className="hero-text">
            <h2>{heroProduct.brand}</h2>
            <h1>{heroProduct.name}</h1>
            <p style={{color: '#ccc', maxWidth: '500px', margin: '10px auto'}}>
              {heroProduct.description}
            </p>
            <br />
            <Link to="/products" className="explore-btn">
              Explore Current Collection
            </Link>
          </div>
        </>
      ) : (
        <p>Loading Experience...</p>
      )}
    </div>
  );
};

export default LandingPage;