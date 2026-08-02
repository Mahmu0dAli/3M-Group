// =========================================================
// Product Model - إدارة استعلامات المنتجات والتصنيفات
// =========================================================

const db = require('./db');

const ProductModel = {
    // جلب كل التصنيفات
    getAllCategories: (callback) => {
        db.all("SELECT * FROM product_categories", callback);
    },

    // جلب المنتجات مع الفلترة والبحث
    getProducts: ({ category, search }, callback) => {
        let query = "SELECT * FROM products WHERE status = 'published'";
        let params = [];

        if (category) {
            query += " AND category_id = ?";
            params.push(category);
        }
        if (search) {
            query += " AND (title LIKE ? OR short_description LIKE ?)";
            params.push(`%${search}%`, `%${search}%`);
        }

        query += " ORDER BY id DESC";
        db.all(query, params, callback);
    },

    // جلب تفاصيل منتج عبر الـ Slug
    getBySlug: (slug, callback) => {
        db.get("SELECT * FROM products WHERE slug = ?", [slug], callback);
    },

    // زيادة عدد المشاهدات للمنتج
    incrementViews: (id) => {
        db.run("UPDATE products SET views_count = views_count + 1 WHERE id = ?", [id]);
    },

    // جلب كل المنتجات للوحة التحكم
    getAllForAdmin: (callback) => {
        db.all("SELECT * FROM products ORDER BY id DESC", callback);
    },

    // إضافة منتج جديد
    create: (data, callback) => {
        const { category_id, title, slug, short_description, description, featured_image, specifications } = data;
        const specsJson = typeof specifications === 'string' ? specifications : JSON.stringify(specifications || {});

        db.run(
            `INSERT INTO products (category_id, title, slug, short_description, description, featured_image, specifications) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [category_id, title, slug, short_description, description, featured_image, specsJson],
            callback
        );
    },

    // حذف منتج
    delete: (id, callback) => {
        db.run("DELETE FROM products WHERE id = ?", [id], callback);
    }
};

module.exports = ProductModel;
