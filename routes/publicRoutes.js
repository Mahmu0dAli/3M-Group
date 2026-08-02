// =========================================================
// Public Routes - مسارات الـ API العامة للموقع
// =========================================================

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const InquiryController = require('../controllers/inquiryController');

router.get('/categories', ProductController.getCategories);
router.get('/products', ProductController.getProducts);
router.get('/products/:slug', ProductController.getProductBySlug);
router.post('/inquiries', InquiryController.createInquiry);

module.exports = router;
