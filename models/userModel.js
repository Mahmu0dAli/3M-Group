// =========================================================
// User Model - إدارة استعلامات المستخدمين والمصادقة
// =========================================================

const db = require('./db');

const UserModel = {
    // جلب بيانات مدير النظام عبر البريد الإلكتروني
    findAdminByEmail: (email, callback) => {
        db.get("SELECT * FROM users WHERE email = ? AND role = 'admin'", [email], callback);
    }
};

module.exports = UserModel;
