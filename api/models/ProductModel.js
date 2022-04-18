const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {type: String, required: true},
    price: {type: Array},
    image: {type: String},
    desc: {type: String},
    size: {type: Array},
    weight: {type: Array},
    scope: {type: Array}, 
    category: {type: String, required: true}, 

},
    {timestamps: true}
)

module.exports = mongoose.model('Product', productSchema)