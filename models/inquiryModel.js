// =========================================================
// Inquiry Model - إدارة استعلامات الاستفسارات والـ CRM
// =========================================================

const db = require('./db');

const InquiryModel = {
    // إضافة استفسار / طلب عرض سعر جديد
    create: (data, callback) => {
        const { product_id, name, phone, email, message } = data;
        db.run(
            "INSERT INTO inquiries (product_id, name, phone, email, message) VALUES (?, ?, ?, ?, ?)",
            [product_id || null, name, phone, email || '', message || ''],
            callback
        );
    },

    // جلب كافة الاستفسارات للوحة التحكم مع اسم المنتج المرتبط
    getAllWithProducts: (callback) => {
        db.all(
            `SELECT inquiries.*, products.title as product_title 
             FROM inquiries 
             LEFT JOIN products ON inquiries.product_id = products.id 
             ORDER BY inquiries.id DESC`,
            callback
        );
    }
};

module.exports = InquiryModel;
