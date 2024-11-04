const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    sessionToken: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
