# دليل مشروع مجموعة 3M Group (Project Summary & Reference)

هذا الملف مرجع شامل لكافة تفاصيل وبنيّة تطبيق **مجموعة 3M Group** المطور ببرمجة خاصة (Custom Development) لحساب خدمات الاستيراد والتصدير واللوجستيات وماكينات التقطيع بالليزر.

---

## 1. بيانات الدخول لولوحة التحكم (Admin Credentials)
للوصول إلى لوحة التحكم الآمنة على الرابط `/admin.html`:
* **البريد الإلكتروني:** `admin@3mgroup.com`
* **كلمة المرور:** `admin123`

---

## 2. هيكل الملفات والمجلدات (Project File Structure - MVC Architecture)
```text
3M Group/
├── package.json               # إعدادات حزم المشروع
├── README.md                  # دليل التشغيل والتوثيق
└── src/
    ├── server.js              # نقطة تشغيل السيرفر الرئيسية
    ├── models/                # طبقة قواعد البيانات (Database Access)
    ├── controllers/           # منطق العمل (Business Logic)
    ├── routes/                # إدارة مسارات الـ API
    ├── database.sqlite        # قاعدة البيانات المحلية
    └── public/                # الواجهات الأمامية (HTML/CSS/JS)
```

---

## 3. نظام التصميم والهوية البصرية المعتمدة (Industrial-Tech Corporate UI/UX)

```css
:root {
  --primary-dark: #0A2647;      /* الأزرق البحري للهيدر والفوتر والعناوين الكبيرة */
  --secondary-teal: #1B7C8C;    /* الزبرجدي للخلفيات الثانوية والأيقونات */
  --accent-yellow: #F5C518;     /* الأصفر للأزرار الرئيسية والكلمات المفتاحية */
  --bg-light: #F4F7FC;          /* خلفية الموقع الأساسية */
  --text-dark: #1E293B;         /* لون النصوص الأساسي */
  --text-white: #FFFFFF;        /* النصوص البيضاء */
}

/* مثال على تصميم زر رئيسي */
.btn-primary {
  background-color: var(--accent-yellow);
  color: var(--primary-dark);
  font-weight: 700;
  border: none;
  padding: 14px 32px;
  border-radius: 4px; /* زوايا حادة قليلاً */
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--secondary-teal);
  color: var(--text-white);
  box-shadow: 0 8px 20px rgba(27, 124, 140, 0.4);
}

/* مثال على بطاقة خدمة */
.service-card {
  background: var(--text-white);
  border-left: 6px solid var(--secondary-teal);
  padding: 24px;
  transition: 0.3s;
}

.service-card:hover {
  border-left-color: var(--accent-yellow);
  transform: translateY(-5px);
}
```

### 📐 المواصفات التصميمية:
* **الهيكل والشبكة:** شبكة كاملة بنوافذ ذات زوايا حادة وتصميم هندسي صارم.
* **الخطوط:** استخدام خط Tajawal / Cairo للمحتوى العربي و Inter للمستندات بالإنجليزية.
* **قسم الهيرو (Hero Section):** خلفية كحلية (#0A2647) غنية مع عناوين بارزة باللون الأبيض والأصفر.
* **بطاقات الخدمات (Service Cards):** خلفية بيضاء (#FFFFFF) مع شريط جانبي باللون الزبرجدي (#1B7C8C) يتحول للأصفر (#F5C518) عند الـ Hover.
* **شريط الإحصائيات (Statistics Section):** خلفية بعرض كامل باللون الزبرجدي (#1B7C8C)، الأرقام باللون الأبيض، والنصوص باللون الأصفر (#F5C518).
* **الفوتر:** تدرج كحلي دافئ من #0A2647 إلى #1B7C8C مع تفاصيل التواصل الكاملة.

---

## 4. مسارات الـ API (API Endpoints)

### أ. المسارات العامة (Public API)
* `GET /api/categories` - جلب جميع أقسام المنتجات.
* `GET /api/products` - جلب جميع المنتجات (يدعم فلترة `?category=ID` والبحث `?search=QUERY`).
* `GET /api/products/:slug` - جلب تفاصيل منتج معين عبر الرابط المستقل (Slug).
* `POST /api/inquiries` - إرسال طلب عرض سعر أو استفسار جديد من العملاء.

### ب. المسارات المحمية لمدير النظام (Protected Admin API - يتطلب توكن مصادقة)
* `POST /api/admin/login` - تسجيل دخول مدير النظام وإرجاع رمز المصادقة (Token).
* `GET /api/admin/products` - جلب جميع المنتجات للوحة التحكم.
* `POST /api/admin/products` - إضافة معدة أو منتج جديد.
* `DELETE /api/admin/products/:id` - حذف منتج.
* `GET /api/admin/inquiries` - جلب كافة استفسارات العملاء وطلبات عروض الأسعار (CRM).

---

## 5. كيفية تشغيل المشروع (How to Run)
1. **تثبيت التبعيات:**
   ```bash
   npm install
   ```
2. **تشغيل السيرفر:**
   ```bash
   npm start
   ```
3. **روابط التصفح المحلية:**
   * **الموقع الرئيسي:** `http://localhost:3000`
   * **كتالوج المنتجات:** `http://localhost:3000/catalog.html`
   * **لوحة التحكم الآمنة:** `http://localhost:3000/admin.html`
