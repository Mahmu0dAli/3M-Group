// =========================================================
// Product Controller - معالجة منطق المنتجات والتصنيفات
// =========================================================

const ProductModel = require('../models/productModel');

const ProductController = {
    // جلب التصنيفات
    getCategories: (req, res) => {
        ProductModel.getAllCategories((err, rows) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, data: rows });
        });
    },

    // جلب قائمة المنتجات مع الفلترة والبحث
    getProducts: (req, res) => {
        ProductModel.getProducts(req.query, (err, rows) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.json({ success: true, count: rows.length, data: rows });
        });
    },

    // جلب تفاصيل المنتج عبر Slug
    getProductBySlug: (req, res) => {
        ProductModel.getBySlug(req.params.slug, (err, product) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            if (!product) return res.status(404).json({ success: false, message: "المنتج غير موجود" });

            try {
                product.gallery = JSON.parse(product.gallery || '[]');
                product.specifications = JSON.parse(product.specifications || '{}');
            } catch (e) {
                product.gallery = [];
                product.specifications = {};
            }

            ProductModel.incrementViews(product.id);
            res.json({ success: true, data: product });
        });
    }
};

module.exports = ProductController;
