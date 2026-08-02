// =========================================================
// Admin Routes - مسارات الـ API المحمية لمدير النظام
// =========================================================

const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// مسار تسجيل الدخول
router.post('/login', AdminController.login);

// حماية المسارات التالية باستخدام Middleware الخاص بالمدير
router.use(AdminController.requireAdmin);

// مسارات إدارة المنتجات والاستفسارات
router.get('/inquiries', AdminController.getInquiries);
router.get('/products', AdminController.getProducts);
router.post('/products', AdminController.createProduct);
router.delete('/products/:id', AdminController.deleteProduct);

module.exports = router;
