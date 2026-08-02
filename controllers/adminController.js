// =========================================================
// Admin Controller - معالجة لوحة التحكم والمنتجات والاستفسارات
// =========================================================

const UserModel = require('../models/userModel');
const ProductModel = require('../models/productModel');
const InquiryModel = require('../models/inquiryModel');

const AdminController = {
    // تسجيل الدخول
    login: (req, res) => {
        const { email, password } = req.body;
        UserModel.findAdminByEmail(email, (err, user) => {
            if (err || !user) {
                return res.status(401).json({ success: false, message: "بيانات الدخول غير صحيحة" });
            }
            if (user.password !== password) {
                return res.status(401).json({ success: false, message: "كلمة المرور غير صحيحة" });
            }
            res.json({ success: true, message: "تم تسجيل الدخول بنجاح", token: "3m_admin_secure_token_xyz_2026" });
        });
    },

    // Middleware التحقق من صلاحية المدير
    requireAdmin: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.includes('3m_admin_secure_token_xyz_2026')) {
            next();
        } else {
            res.status(401).json({ success: false, message: "غير مصرح بالوصول، يرجى تسجيل الدخول كمدير" });
        }
    },

    // جلب الاستفسارات للوحة التحكم
    getInquiries: (req, res) => {
        InquiryModel.getAllWithProducts((err, rows) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, data: rows });
        });
    },

    // جلب المنتجات للوحة التحكم
    getProducts: (req, res) => {
        ProductModel.getAllForAdmin((err, rows) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            rows.forEach(p => {
                try { p.specifications = JSON.parse(p.specifications || '{}'); } catch(e){ p.specifications = {}; }
            });
            res.json({ success: true, data: rows });
        });
    },

    // إضافة منتج جديد
    createProduct: (req, res) => {
        ProductModel.create(req.body, function(err) {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.status(201).json({ success: true, message: "تم إضافة المنتج بنجاح", product_id: this.lastID });
        });
    },

    // حذف منتج
    deleteProduct: (req, res) => {
        ProductModel.delete(req.params.id, function(err) {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, message: "تم حذف المنتج بنجاح" });
        });
    }
};

module.exports = AdminController;
