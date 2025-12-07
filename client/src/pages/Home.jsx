import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS we just made

const Home = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from your Backend API
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setPerfumes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{textAlign:'center', marginTop:'50px'}}>Loading amazing scents...</div>;

  return (
    <div>
      {/* Call to Action Banner */}
      <div className="banner">
        <h1>Find Your Signature Scent</h1>
        <p>Exclusive collection for the elegant you.</p>
        <button>Shop Now</button>
      </div>

      <h2 style={{textAlign:'center', margin:'20px'}}>Latest Arrivals</h2>

      {/* Product Cards Grid */}
      <div className="product-grid">
        {perfumes.map(perfume => (
          <div key={perfume._id} className="card">
            <img src={perfume.image} alt={perfume.name} />
            <div className="card-info">
              <h3>{perfume.name}</h3>
              <p>{perfume.brand}</p>
              <div className="price">${perfume.price}</div>
              {/* Card Redirection */}
              <Link to={`/product/${perfume._id}`} className="details-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;