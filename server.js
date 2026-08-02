// =========================================================
// 3M Group Custom Platform - Full-Stack Express & SQLite Server
// Features: Dedicated Products, Admin CRM, Auth, & Email Notifications
// =========================================================

const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'database.sqlite');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure Nodemailer for Inquiry Notifications
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER || 'placeholder_user',
        pass: process.env.SMTP_PASS || 'placeholder_pass'
    }
});

// Initialize SQLite Database
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error("Error opening database", err.message);
    } else {
        console.log("Connected to SQLite Database.");
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'admin',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS product_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            image TEXT,
            description TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            short_description TEXT,
            description TEXT,
            featured_image TEXT,
            gallery TEXT,
            specifications TEXT,
            is_featured BOOLEAN DEFAULT 0,
            status TEXT DEFAULT 'published',
            views_count INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES product_categories(id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT,
            message TEXT,
            status TEXT DEFAULT 'new',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products(id)
        )`, () => {
            seedData();
        });
    });
}

function seedData() {
    db.run(`INSERT OR IGNORE INTO users (id, name, email, password, role) VALUES (1, 'مدير النظام', 'admin@3mgroup.com', 'admin123', 'admin')`);

    db.get("SELECT COUNT(*) as count FROM product_categories", (err, row) => {
        if (row.count === 0) {
            console.log("Seeding initial 3M Group data...");
            
            const cats = [
                { id: 1, name: "ماكينات تقطيع الليزر (Laser Cutting)", slug: "laser-cutting", desc: "أحدث ماكينات ألياف الليزر لقطع وتشكيل المعادن بدقة فائقة." },
                { id: 2, name: "حلول وشبكات اللوجستيات (Logistics)", slug: "logistics", desc: "معدات الشحن والخدمات اللوجستية المتقدمة للمصانع والشركات." },
                { id: 3, name: "المعدات والصناعات الثقيلة (Heavy Equipment)", slug: "heavy-equipment", desc: "خطوط الإنتاج والمعدات الصناعية الكبرى ذات الاعتمادية العالية." }
            ];

            const stmtCat = db.prepare("INSERT INTO product_categories (id, name, slug, description) VALUES (?, ?, ?, ?)");
            cats.forEach(c => stmtCat.run(c.id, c.name, c.slug, c.desc));
            stmtCat.finalize();

            const prods = [
                {
                    category_id: 1,
                    title: "قطاعة ليزر الألياف عالية القوة (Fiber Laser Cutter SF3015H)",
                    slug: "fiber-laser-cutter-sf3015h",
                    short_desc: "ماكينة ليزر فايبر بقدرة فائقة لقطع المعادن والصلب بدقة عالية وبسرعة تشغيلية ممتازة.",
                    desc: "تعتبر SF3015H الجيل الأحدث من ماكينات ألياف الليزر المخصصة للمصانع والورش الكبرى، وتتميز بهيكل قوي مضاد للاعتزاز، مع نظام تبريد متطور وواجهة تحكم ذكية.",
                    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
                    gallery: JSON.stringify([
                        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                    ]),
                    specs: JSON.stringify({
                        "قوة الليزر (Laser Power)": "3000W - 12000W",
                        "نطاق العمل (Working Area)": "3000mm x 1500mm",
                        "دقة التحديد (Positioning Accuracy)": "±0.03mm",
                        "الحد الأقصى للسرعة (Max Speed)": "120m/min",
                        "الوزن الأجمالي (Total Weight)": "4500 kg"
                    }),
                    is_featured: 1
                },
                {
                    category_id: 2,
                    title: "نظام النقل والخدمات اللوجستية المتطور (Modern Shipping Logistics)",
                    slug: "modern-shipping-logistics",
                    short_desc: "حلول لوجستية متكاملة لإدارة سلاسل الإمداد ونقل المعدات الثقيلة بأمان تام.",
                    desc: "توفر 3M Group حظائر نقل وشاحنات مجهزة بأحدث تقنيات التتبع والرفع لضمان وصول المعدات الصناعية إلى مواقع الإنشاءات والورش في المواعيد المحددة.",
                    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
                    gallery: JSON.stringify([
                        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                    ]),
                    specs: JSON.stringify({
                        "سعة التحميل (Loading Capacity)": "Up to 50 Tons",
                        "أنظمة التتبع (Tracking System)": "GPS Real-time",
                        "التغطية (Coverage)": "International & Regional",
                        "الأمان (Security)": "Fully Insured & Certified"
                    }),
                    is_featured: 1
                },
                {
                    category_id: 3,
                    title: "ماكينة تقطيع الأنابيب بالليزر (Tube Laser Cutter G-Series)",
                    slug: "tube-laser-cutter-g-series",
                    short_desc: "ماكينة مخصصة لقطع الأنابيب والمقاطع المعدنية بأعلى سرعة وكفاءة إنتاجية.",
                    desc: "سلسلة G-Series صُممت خصيصاً للتشغيل المستمر في تصنيع الهياكل المعدنية والأنابيب الدائرية والمربعة بأقل نسبة هدر في المواد الخام.",
                    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
                    gallery: JSON.stringify([
                        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
                    ]),
                    specs: JSON.stringify({
                        "طول الأنبوب (Tube Length)": "6000mm",
                        "قطر المعالجة (Processing Diameter)": "20-220mm",
                        "طاقة الفايبر (Fiber Power)": "2000W - 6000W"
                    }),
                    is_featured: 1
                }
            ];

            const stmtProd = db.prepare(`INSERT INTO products (category_id, title, slug, short_description, description, featured_image, gallery, specifications, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
            prods.forEach(p => {
                stmtProd.run(p.category_id, p.title, p.slug, p.short_desc, p.desc, p.image, p.gallery, p.specs, p.is_featured);
            });
            stmtProd.finalize();
            console.log("Seeding completed successfully.");
        }
    });
}

// ================= PUBLIC API ROUTES =================

app.get('/api/categories', (req, res) => {
    db.all("SELECT * FROM product_categories", (err, rows) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, data: rows });
    });
});

app.get('/api/products', (req, res) => {
    const { category, search } = req.query;
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

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, count: rows.length, data: rows });
    });
});

app.get('/api/products/:slug', (req, res) => {
    const slug = req.params.slug;
    db.get("SELECT * FROM products WHERE slug = ?", [slug], (err, product) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        if (!product) return res.status(404).json({ success: false, message: "المنتج غير موجود" });

        try {
            product.gallery = JSON.parse(product.gallery || '[]');
            product.specifications = JSON.parse(product.specifications || '{}');
        } catch (e) {
            product.gallery = [];
            product.specifications = {};
        }

        db.run("UPDATE products SET views_count = views_count + 1 WHERE id = ?", [product.id]);
        res.json({ success: true, data: product });
    });
});

app.post('/api/inquiries', (req, res) => {
    const { product_id, name, phone, email, message } = req.body;
    if (!name || !phone) {
        return res.status(400).json({ success: false, message: "يرجى كتابة الاسم ورقم الهاتف" });
    }

    db.run("INSERT INTO inquiries (product_id, name, phone, email, message) VALUES (?, ?, ?, ?, ?)",
        [product_id || null, name, phone, email || '', message || ''],
        function(err) {
            if (err) return res.status(500).json({ success: false, message: err.message });
            
            const inquiryId = this.lastID;

            // Send Email Notification
            const mailOptions = {
                from: '"3M Group CRM" <no-reply@3mgroup.com>',
                to: process.env.ADMIN_EMAIL || 'admin@3mgroup.com',
                subject: `طلب استفسار جديد #${inquiryId} - مجموعة 3M`,
                text: `تم استلام طلب جديد من العميل:\nالاسم: ${name}\nالهاتف: ${phone}\nالبريد: ${email || '-'}\nالرسالة: ${message || '-'}`
            };

            transporter.sendMail(mailOptions, (mailErr) => {
                if (mailErr) {
                    console.log("Email notification note (SMTP awaiting configuration):", mailErr.message);
                } else {
                    console.log("Email notification sent successfully.");
                }
            });

            res.status(201).json({ success: true, message: "تم استلام طلبك بنجاح، سيتم التواصل معك قريباً!", inquiry_id: inquiryId });
        }
    );
});

// ================= ADMIN AUTHENTICATION API =================

app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ? AND role = 'admin'", [email], (err, user) => {
        if (err || !user) {
            return res.status(401).json({ success: false, message: "بيانات الدخول غير صحيحة" });
        }
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "كلمة المرور غير صحيحة" });
        }
        res.json({ success: true, message: "تم تسجيل الدخول بنجاح", token: "3m_admin_secure_token_xyz_2026" });
    });
});

function requireAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.includes('3m_admin_secure_token_xyz_2026')) {
        next();
    } else {
        res.status(401).json({ success: false, message: "غير مصرح بالوصول، يرجى تسجيل الدخول كمدير" });
    }
}

// ================= SECURED ADMIN API ROUTES =================

app.get('/api/admin/inquiries', requireAdmin, (req, res) => {
    db.all(`SELECT inquiries.*, products.title as product_title FROM inquiries LEFT JOIN products ON inquiries.product_id = products.id ORDER BY inquiries.id DESC`, (err, rows) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, data: rows });
    });
});

app.get('/api/admin/products', requireAdmin, (req, res) => {
    db.all("SELECT * FROM products ORDER BY id DESC", (err, rows) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        rows.forEach(p => {
            try { p.specifications = JSON.parse(p.specifications || '{}'); } catch(e){ p.specifications = {}; }
        });
        res.json({ success: true, data: rows });
    });
});

app.post('/api/admin/products', requireAdmin, (req, res) => {
    const { category_id, title, slug, short_description, description, featured_image, specifications } = req.body;
    const specsJson = typeof specifications === 'string' ? specifications : JSON.stringify(specifications || {});

    db.run(`INSERT INTO products (category_id, title, slug, short_description, description, featured_image, specifications) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [category_id, title, slug, short_description, description, featured_image, specsJson],
        function(err) {
            if (err) return res.status(500).json({ success: false, message: err.message });
            res.status(201).json({ success: true, message: "تم إضافة المنتج بنجاح", product_id: this.lastID });
        }
    );
});

app.delete('/api/admin/products/:id', requireAdmin, (req, res) => {
    db.run("DELETE FROM products WHERE id = ?", [req.params.id], function(err) {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, message: "تم حذف المنتج بنجاح" });
    });
});

app.listen(PORT, () => {
    console.log(`[3M Group Production Server] Running on http://localhost:${PORT}`);
});
