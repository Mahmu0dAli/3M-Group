// =========================================================
// 3M Group - Database Connection & Schema Initialization Module
// إدارة الاتصال بقاعدة البيانات وتهيئة الجداول (SQLite)
// =========================================================

const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '../database.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error("Error opening database", err.message);
    } else {
        console.log("Connected to SQLite Database (via models module).");
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // جدول المستخدمين ومديري النظام
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'admin',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // جدول تصنيفات المنتجات الصناعية
        db.run(`CREATE TABLE IF NOT EXISTS product_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            image TEXT,
            description TEXT
        )`);

        // جدول المنتجات (مع دعم صفحات مستقلة ومواصفات JSON)
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

        // جدول الاستفسارات وطلبات عروض الأسعار
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
    // إضافة مستخدم الافتراضي لمدير النظام
    db.run(`INSERT OR IGNORE INTO users (id, name, email, password, role) VALUES (1, 'مدير النظام', 'admin@3mgroup.com', 'admin123', 'admin')`);

    // إدخال البيانات الأولية إذا كان الكتالوج فارغاً
    db.get("SELECT COUNT(*) as count FROM product_categories", (err, row) => {
        if (row && row.count === 0) {
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

module.exports = db;
