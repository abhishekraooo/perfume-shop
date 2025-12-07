import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Catalog from './pages/Catalog'; // The grid of 20 items
import ProductPage from './pages/ProductPage';
import Profile from './pages/Profile';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;