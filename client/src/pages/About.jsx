import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Our Essence</h1>
        <p style={{fontSize:'1.2rem', color:'#888'}}>Crafting memories, one scent at a time.</p>
      </div>

      <div className="about-section">
        <p>
          Founded in 2024, Perfume Shop was born from a desire to bring the world's most 
          exquisite fragrances to your doorstep. We believe that a scent is not just an accessory, 
          but a signature of your soul. Our collection is curated from the finest artisan perfumers 
          across the globe.
        </p>
      </div>

      <div className="values-grid">
        <div className="value-box">
          <h3>Authenticity</h3>
          <p>100% genuine products sourced directly from brands.</p>
        </div>
        <div className="value-box">
          <h3>Sustainability</h3>
          <p>Eco-friendly packaging and cruelty-free selection.</p>
        </div>
        <div className="value-box">
          <h3>Luxury</h3>
          <p>Premium experience from browsing to unboxing.</p>
        </div>
      </div>
    </div>
  );
};

export default About;