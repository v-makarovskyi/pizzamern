const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

//@desc create a product
//@route POST/api/products
//@access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    user: req.user._id,
    price: req.body.price,
    image: req.body.image,
    desc: req.body.desc,
    category: req.body.category,
    size: req.body.size,
    weight: req.body.weight,
    scope: req.body.scope,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
  console.log(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, desc, scope, weight, size, category } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    (product.name = name),
      (product.price = price),
      (product.image = image),
      (product.desc = desc),
      (product.scope = scope),
      (product.weight = weight),
      (product.size = size);
    product.category = category;

    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Продукт не найден");
  }
});

//@desc fetch single product
//@route GET/api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error("ПРолукт не найден");
  }
});

//@desc fetch all products
//@route GET/api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const queryCategory = req.query.category;

  let products;

  if (queryCategory) {
    products = await Product.find({
      category: {
        $in: [queryCategory],
      },
    });
  } else {
    products = await Product.find();
  }
  res.json(products);
});


//@desc delete a product
//@route DELETE/api/products/:id
//@access Private
const deleteProduct = asyncHandler(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json('Продукт успешно удален')
})


//@desc get new products
//@route GET/api/products/new
//@access Public
const getNewProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ price: -1 }).limit(4)
  res.json(products)
  
})


module.exports = { createProduct, getProductById, updateProduct, getProducts, deleteProduct, getNewProducts };
