const router = require("express").Router();

const {
  createProduct,
  getProductById,
  updateProduct,
  getProducts,
  deleteProduct,
  getNewProducts
} = require("../controllers/productControllers");

const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(protect, admin, createProduct).get(getProducts);
router.get('/new', getNewProducts)
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
