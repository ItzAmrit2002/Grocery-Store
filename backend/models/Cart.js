const mongoose = require('mongoose')


const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type: String,
        required: [true, 'Please add a name']
    },
    price:{
        type: Number,
        required: [true, 'Please add an email']

    },
    rating:{
        type: Number,
        required: [true, 'Please add a password']
    },
    image:{
        type: String,
        required: [true, 'Please add a URL']
    },
    status:{
        type: String,
        required: [true, 'Please add a category']
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', cartSchema)