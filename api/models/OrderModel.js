const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        orderItems: [
            {
                name: {type: String, required: true},
                count: {type: Number, required: true},
                image: {type: String, required: true},
                price: {type: Number, required: true},
                size : {type: Number, required: true},
                weight: {type: Number, required: true},
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                }
            }
        ],
        shippingAddress: {
            tel: {type: String},
            street: {type: String},
            house: {type: Number},
            building: {type: Number},
            front: {type: Number},
            floor: {type: Number},
            apartment: {type: Number},
            intercom: {type: Number}
        },
        paymentMethod: {
            type: String
        },
        paymentResult: {
            id: {type: String},
            status: {type: String},
            update_time: {type: String},
            email_address: {type: String}
        },
        taxPrice: {
            type: Number, required: true, default: 0.0
        },
        shippingPrice: {
            type: Number, required: true, default: 0.0
        },
        discount: {
            type: Number, required: true, default: 0.0
        },
        totalPrice: {
            type: Number, required: true, default: 0.0
        },
        isPaid: {
            type: Boolean, required: true, default: false
        },
        paidAt: {
            type: Date
        },
        isDelivered: {
            type: Boolean, required: true, default: false
        },
        deliveredAt: {
            type: Date
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Order', orderSchema)