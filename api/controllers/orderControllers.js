const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel");

//@desc create new order
//@route POST/api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    discount,
    itemsPrice,
    totalPrice,
    taxPrice,
    shippingPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("Вы еще ничего не заказали");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      discount,
      itemsPrice,
      totalPrice,
      taxPrice,
      shippingPrice,
    });
    const createOrder = await order.save();
    res.status(200).json(createOrder);
  }
});

//@desc get order by id
//@route GET/api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error("Заказ не найден");
  }
});

//@desc update order to paid
//@route PUT/api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    (order.isPaid = true), (order.paidAt = Date.now());
    /* order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }; */
    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
  } else {
    res.status(400);
    throw new Error("Заказ не найден");
  }
});

//@desc update order to delivered
//@route PUT/api/orders/:id/deliver
//@access Private/Admin
const updateOrdertoDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isDelivered = true), (order.deliveredAt = Date.now());
    const updateOrder = await order.save();

    res.status(201).json(updateOrder);
  } else {
    res.status(400);
    throw new Error("Заказ не найден");
  }
});

//@desc Get logged in user orders
//@route GET/api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//@desc get all orders
//@route GET/api/orders
//@access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrdertoDelivered,
  getMyOrders,
  getAllOrders,
};
