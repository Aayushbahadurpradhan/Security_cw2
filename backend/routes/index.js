const express = require('express');
const router = express.Router();

const { createUser, verifyEmail } = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const paymentController = require('../controller/order/paymentController');
const webhooks = require('../controller/order/webhook');
const orderController = require('../controller/order/order.controller');
const allOrderController = require('../controller/order/allOrder.controller');
const updatePassword = require('../controller/user/updatepasswordController');

const { fetchAllAuditLogs, fetchAuditLogsByUserId, fetchAuditLogsByAction } = require('../controller/user/auditlogController');

// User Routes
router.post("/signup", createUser);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.post("/verify-email", verifyEmail);

// Admin Panel Routes
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.put('/update-password', authToken, updatePassword);

// Product Routes
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// User Add to Cart Routes
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// Payment and Order Routes
router.post('/checkout', authToken, paymentController);
router.post('/webhook', webhooks);
router.get("/order-list", authToken, orderController);
router.get("/all-order", authToken, allOrderController);

// Audit Logs Routes (for Admin)
router.get('/audit/logs', authToken, fetchAllAuditLogs);
router.get('/audit/logs/user/:userId', authToken, fetchAuditLogsByUserId);
router.get('/audit/logs/action/:action', authToken, fetchAuditLogsByAction);

module.exports = router;
