const router = require('express').Router()
const {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrdertoDelivered,
    getMyOrders,
    getAllOrders
} = require('../controllers/orderControllers')

const { protect, admin } = require('../middleware/authMiddleware')

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/delivered').put(protect, admin, updateOrdertoDelivered)

module.exports = router