const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Required for file serving
const Perfume = require('./models/Perfume');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- SERVE STATIC IMAGES ---
// This lets the frontend access images at http://localhost:5000/images/filename.jpg
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Database Connection
mongoose.connect('mongodb+srv://abhishek:abhi123@cluster0.ziyhir4.mongodb.net/?appName=Cluster0') // <--- PASTE YOUR CONNECTION STRING HERE
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// --- ROUTES ---

// 1. Get All Products (Filtered by Standard vs Hero handled on Frontend usually, or separate route)
app.get('/api/products', async (req, res) => {
    try {
        const products = await Perfume.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Get Single Product
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Perfume.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. SEED DATA (Uses your 15 Local Images + 1 Hero)
app.get('/seed', async (req, res) => {
    try {
        await Perfume.deleteMany({}); // Clear old data

        const brands = ["LuxeScent", "Aurora", "Noir", "Elysium", "Velvet", "Oud Royal", "Zenith"];
        const categories = ["Eau de Parfum", "Eau de Toilette", "Parfum", "Cologne"];
        const seasons = ["Winter", "Summer", "All Season", "Spring"];
        
        // 1. Create the "Coming Soon" Hero Product
        const heroProduct = {
            name: "Nebula Noir",
            brand: "Galactic",
            price: 150,
            description: "An enigmatic fragrance arriving from the stars. Prepare your senses.",
            image: "http://localhost:5000/images/hero.png", // Your local PNG
            isComingSoon: true,
            specs: { volume: "100ml", category: "Parfum", gender: "Unisex", season: "Winter" },
            notes: { top: "Star Dust", middle: "Black Rose", base: "Void Musk" },
            reviews: []
        };

        // 2. Generate 19 Standard Products (Looping through your 15 images)
        let standardProducts = [];
        for (let i = 1; i < 20; i++) {
            const randomBrand = brands[Math.floor(Math.random() * brands.length)];
            
            // Logic to cycle images: p1.jpg to p15.jpg
            // (i % 15) gives 0-14. We add 1 to get 1-15.
            const imageIndex = (i % 15) + 1; 
            const imageName = `p${imageIndex}.jpg`;

            standardProducts.push({
                name: `${randomBrand} No. ${i}`,
                brand: randomBrand,
                price: Math.floor(Math.random() * 100) + 50,
                description: `A sophisticated blend designed for the modern individual. Experience the essence of ${randomBrand}.`,
                image: `http://localhost:5000/images/${imageName}`, 
                gallery: [], // You can add logic here if you have extra images
                isComingSoon: false,
                specs: {
                    volume: "100ml",
                    category: categories[Math.floor(Math.random() * categories.length)],
                    gender: "Unisex",
                    season: seasons[Math.floor(Math.random() * seasons.length)]
                },
                notes: { top: "Bergamot", middle: "Jasmine", base: "Amber" },
                reviews: [{ user: "Verified Buyer", comment: "Excellent longevity.", rating: 5, date: new Date() },
                    { 
                        user: "Sarah Jenkins", 
                        comment: "The scent lasts all day! Definitely buying again.", 
                        rating: 5, 
                        date: new Date("2023-11-15") 
                    },
                    { 
                        user: "Mike T.", 
                        comment: "Good packaging, but the top notes fade a bit too fast for me.", 
                        rating: 4, 
                        date: new Date("2023-12-02") 
                    },
                    { 
                        user: "Anonymous", 
                        comment: "Fast shipping. The bottle looks premium.", 
                        rating: 5, 
                        date: new Date("2024-01-10") 
                    }
                ]
            });
        }

        // Combine and Insert
        const allProducts = [heroProduct, ...standardProducts];
        await Perfume.insertMany(allProducts);
        
        res.json({ message: "Database updated with 20 products using local images!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));