const mongoose = require('mongoose');

const perfumeSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    description: String,
    image: String,
    gallery: [String],
    // New Advanced Fields
    isComingSoon: { type: Boolean, default: false }, // For the Hero Section
    specs: {
        volume: String, // e.g., "100ml"
        category: String,   // e.g., "Eau de Parfum"
        gender: String, // e.g., "Unisex"
        season: String  // e.g., "Winter/Fall"
    },
    notes: {
        top: String,    // e.g., "Bergamot, Lemon"
        middle: String, // e.g., "Jasmine, Rose"
        base: String    // e.g., "Vanilla, Musk"
    },
    reviews: [
        {
            user: String,
            comment: String,
            rating: Number,
            date: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Perfume', perfumeSchema);