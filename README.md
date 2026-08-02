# مجموعة 3M Group - منصة الخدمات الصناعية واللوجستية (Custom Application)

مشروع برمجة خاصة متكامل لموقع **مجموعة 3M Group** المتخصصة في ماكينات تقطيع الليزر (Laser Cutting)، حلول وشبكات اللوجستيات، والمعدات الصناعية، مع تركيز خاص على عرض المنتجات في **صفحات مستقلة مخصصة** (Dedicated Product Pages) بدلاً من هيكل المدونات التقليدي.

---

## 🌟 مميزات المشروع الرئيسية (Key Features)

1. **صفحات منتجات مستقلة ومخصصة (Dedicated Product Pages):**
   * كل معدة أو منتج يمتلك رابطاً فريداً (`/product.html?slug=...`).
   * عرض تفصيلي يشمل جدول المواصفات الفنية الديناميكية (Dynamic Technical Specs)، معرض صور متعدد، ووصف دقيق.
   * زر تواصل فوري عبر **واتساب** محمل باسم المنتج تلقائياً.

2. **نظام إدارة الاستفسارات وطلبات عروض الأسعار (CRM):**
   * نموذج طلب عرض سعر متكامل مرتبط بكل منتج أو الخدمة العامة.
   * إرسال إشعارات فورية عبر البريد الإلكتروني (Nodemailer) إلى فريق المبيعات.

3. **لوحة تحكم آمنة ومتقدمة (Admin Dashboard):**
   * حماية كاملة بنظام توكن مصادقة.
   * إدارة المنتجات (إضافة، تعديل، حذف).
   * متابعة وعرض كافة استفسارات وطلبات العملاء الواردة.

4. **هوية بصرية صناعية تقنية (Industrial-Tech Corporate UI/UX):**
   * تصميم هندسي صارم بزوايا حادة وألوان كحلية (`#0A2647`) وزبرجدية (`#1B7C8C`) مع لمسات صفراء (`#F5C518`).

---

## 📂 هيكل المشروع (Project File Structure)

```text
3M Group/
├── package.json               # إعدادات حزم ونقاط تشغيل المشروع
├── project_summary.md         # الدليل المرجعي الشامل للمشروع
├── project_analysis.md        # تحليل المشروع والتحويل من ووردبريس
├── audit_report.md            # تقرير الفحص والتدقيق متعدد الموديلات
├── DEPLOYMENT.md              # دليل النشر السحابي
├── prompt.md                  # البرومبت الرئيسي للمشروع
└── src/
    ├── server.js              # خادم Express.js وقاعدة بيانات SQLite والـ API
    ├── database.sqlite        # قاعدة البيانات المحلية
    ├── config/
    │   └── schema.sql         # هيكل جداول قاعدة البيانات العلائقية
    └── public/
        ├── index.html         # الصفحة الرئيسية (الهيرو، الخدمات، الإحصائيات)
        ├── catalog.html       # كتالوج المنتجات والفلترة (Grid & Filter)
        ├── product.html       # صفحة تفاصيل المنتج المستقلة + واتساب
        └── admin.html         # لوحة التحكم الآمنة ونظام إدارة الاستفسارات (CRM)
```

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

* **Backend:** Node.js, Express.js
* **Database:** SQLite (قاعدة بيانات محلية سريعة ومحمولة مع دعم JSON للمواصفات)
* **Frontend:** HTML5, CSS3 (Modern Flexbox/Grid), JavaScript (Vanilla JS Fetch API)
* **Email & Notifications:** Nodemailer لإشعارات البريد الإلكتروني

---

## 🔑 بيانات الدخول للوحة التحكم (Admin Credentials)

للوصول إلى لوحة التحكم الإدارية على الرابط `/admin.html`:
* **البريد الإلكتروني:** `admin@3mgroup.com`
* **كلمة المرور:** `admin123`

---

## 🚀 طريقة التثبيت والتشغيل المحلي (Installation & Running)

1. **استنساخ أو تحميل المستودع:**
   ```bash
   cd "3M Group"
   ```

2. **تثبيت الحزم البرمجية:**
   ```bash
   npm install
   ```

3. **تشغيل خادم الإنتاج:**
   ```bash
   npm start
   ```

4. **تصفح التطبيق:**
   * الموقع الرئيسي: `http://localhost:3000`
   * كتالوج المنتجات: `http://localhost:3000/catalog.html`
   * لوحة التحكم: `http://localhost:3000/admin.html`

---

## 📡 مسارات الـ API (API Endpoints Overview)

### أ. المسارات العامة (Public API)
* `GET /api/categories` - جلب أقسام المنتجات.
* `GET /api/products` - جلب المنتجات (يدعم الفلترة `?category=ID` والبحث `?search=QUERY`).
* `GET /api/products/:slug` - جلب تفاصيل منتج معين عبر الرابط المستقل.
* `POST /api/inquiries` - إرسال استفسار جديد أو طلب عرض سعر.

### ب. المسارات المحمية لمدير النظام (Protected Admin API)
* `POST /api/admin/login` - تسجيل دخول المدير.
* `GET /api/admin/products` - جلب المنتجات للإدارة.
* `POST /api/admin/products` - إضافة منتج جديد.
* `DELETE /api/admin/products/:id` - حذف منتج.
* `GET /api/admin/inquiries` - جلب استفسارات العملاء (CRM).

---

## 📄 المستندات المرجعية الأخرى (Documentation)
* [دليل المشروع المرجعي (`project_summary.md`)](./project_summary.md)
* [تحليل التحويل من ووردبريس (`project_analysis.md`)](./project_analysis.md)
* [دليل النشر السحابي (`DEPLOYMENT.md`)](./DEPLOYMENT.md)
* [تقرير الفحص والتدقيق (`audit_report.md`)](./audit_report.md)
