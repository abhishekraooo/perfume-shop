import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Catalog.css'; // Make sure to import the new CSS

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Define Filter Categories
  const categories = ['All', 'Parfum', 'Eau de Parfum', 'Eau de Toilette', 'Cologne'];

  useEffect(() => {
    // Fetch data
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        // Exclude the Hero product from the main grid
        const standardProducts = res.data.filter(p => !p.isComingSoon);
        setProducts(standardProducts);
        setFilteredProducts(standardProducts);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  // Handle Filtering
  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      // Filter based on the 'category' we put in the DB specs
      const filtered = products.filter(p => p.specs.category === category);
      setFilteredProducts(filtered);
    }
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'100px'}}>Loading Collection...</div>;

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>The Collection</h1>
        <p style={{color:'#666'}}>Curated fragrances for the modern soul.</p>
      </div>

      {/* Filter Buttons */}
      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="catalog-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link key={product._id} to={`/product/${product._id}`} className="product-card">
              <div className="card-img-wrapper">
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <div className="card-details">
                <div className="card-brand">{product.brand}</div>
                <div className="card-name">{product.name}</div>
                <div className="card-price">${product.price}</div>
              </div>
            </Link>
          ))
        ) : (
          <div style={{gridColumn:'1/-1', textAlign:'center', color:'#888', marginTop:'20px'}}>
            No perfumes found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;