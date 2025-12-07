import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // State for the interactive Gallery
  const [selectedImage, setSelectedImage] = useState(null);

  // Review Form State
  const [newReview, setNewReview] = useState({ user: '', comment: '', rating: 5 });

  useEffect(() => {
    window.scrollTo(0, 0); 
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        // Set the initial big image to the product's main image
        setSelectedImage(res.data.image); 
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Product link copied to clipboard!");
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!newReview.user || !newReview.comment) return;
    const updatedReviews = [...product.reviews, { ...newReview, date: new Date() }];
    setProduct({ ...product, reviews: updatedReviews });
    setNewReview({ user: '', comment: '', rating: 5 });
    alert("Thank you for your review!");
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'100px'}}>Loading Details...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-container">
      
      {/* LEFT COLUMN: Image & Gallery */}
      <div className="image-section">
        {/* The Big Interactive Image */}
        <div className="main-image">
          <img src={selectedImage} alt={product.name} />
        </div>

        {/* The Thumbnail Gallery */}
        {product.gallery && product.gallery.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            {/* Show original image as first thumbnail */}
            <img 
              src={product.image} 
              alt="Original"
              onClick={() => setSelectedImage(product.image)}
              style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', border: selectedImage === product.image ? '2px solid #333' : '1px solid #ddd' }}
            />
            {/* Show extra gallery images */}
            {product.gallery.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`View ${index}`} 
                onClick={() => setSelectedImage(img)}
                style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', border: selectedImage === img ? '2px solid #333' : '1px solid #ddd' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Info & Details */}
      <div className="info-section">
        <span className="brand-tag">{product.brand}</span>
        <h1 className="product-title">{product.name}</h1>
        <div className="product-price">${product.price}</div>

        <p className="product-description">{product.description}</p>

        <div className="action-buttons">
          <button className="add-cart-btn">Add to Bag</button>
          <button className="share-btn" onClick={handleShare}>Share 🔗</button>
        </div>

        {/* Technical Specs Grid */}
        <div className="specs-container">
          <div className="spec-item">
            <strong>Category</strong>
            <span>{product.specs?.category || 'Parfum'}</span>
          </div>
          <div className="spec-item">
            <strong>Volume</strong>
            <span>{product.specs?.volume || '100ml'}</span>
          </div>
          <div className="spec-item">
            <strong>Gender</strong>
            <span>{product.specs?.gender || 'Unisex'}</span>
          </div>
          <div className="spec-item">
            <strong>Season</strong>
            <span>{product.specs?.season || 'All Season'}</span>
          </div>
        </div>

        {/* Fragrance Pyramid / Notes */}
        <div className="notes-section">
          <h3>Olfactory Notes</h3>
          <div className="note-row">
            <div className="note-label">Top Notes:</div>
            <div className="note-value">{product.notes?.top || 'Citrus, Fresh Air'}</div>
          </div>
          <div className="note-row">
            <div className="note-label">Heart Notes:</div>
            <div className="note-value">{product.notes?.middle || 'Floral, Spice'}</div>
          </div>
          <div className="note-row">
            <div className="note-label">Base Notes:</div>
            <div className="note-value">{product.notes?.base || 'Wood, Musk, Amber'}</div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-container">
          <h3>Customer Reviews ({product.reviews.length})</h3>
          
          {product.reviews.length === 0 ? <p style={{color:'#888'}}>No reviews yet. Be the first!</p> : (
            product.reviews.map((rev, index) => (
              <div key={index} className="review-card">
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <strong>{rev.user}</strong>
                  <span style={{color:'#ff9800'}}>{'★'.repeat(rev.rating)}</span>
                </div>
                <p style={{marginTop:'5px', color:'#555'}}>{rev.comment}</p>
              </div>
            ))
          )}

          <div style={{marginTop:'30px'}}>
            <h4>Write a Review</h4>
            <form onSubmit={submitReview} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
              <input 
                placeholder="Your Name" 
                value={newReview.user}
                onChange={e => setNewReview({...newReview, user: e.target.value})}
                style={{padding:'10px', border:'1px solid #ddd', borderRadius:'5px'}}
              />
              <textarea 
                placeholder="Tell us what you think..." 
                value={newReview.comment}
                onChange={e => setNewReview({...newReview, comment: e.target.value})}
                style={{padding:'10px', border:'1px solid #ddd', borderRadius:'5px', minHeight:'80px'}}
              />
              <button type="submit" style={{padding:'10px', background:'#333', color:'white', border:'none', borderRadius:'5px', cursor:'pointer'}}>
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;