const mongoose = require('mongoose')


const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    price: {
        type: Number,
        required: [true, 'Please add an email'],
    },
    rating: {
        type: Number,
        required: [true, 'Please add a password']
    },
    image: {
        type: String,
        required: [true, 'Please add a URL']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model('Item', itemSchema)