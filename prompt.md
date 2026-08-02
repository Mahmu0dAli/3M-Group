# البرومبت الرئيسي لتنفيذ المشروع (Master Prompt for Project Development)

> **حالة التنفيذ:** تم استخدام هذا البرومبت وتطبيقه بنجاح لبناء منصة **مجموعة 3M Group** ببرمجة خاصة كاملة تعتمد على معمارية **Node.js/Express MVC** وقاعدة بيانات **SQLite** مع واجهات محاكية للهوية البصرية لمؤسستكم.

---

```text
أنت مهندس برمجة وتطوير مواقع خبير (Senior Full-Stack Developer & UI/UX Expert).
أريدك أن تساعدني في بناء وتطوير موقع جديد ببرمجة خاصة (Custom Development) لحساب شركة "مجموعة 3M - 3M Group" المخصصة في المعدات الصناعية وقطاعات الليزر وتكنولوجيا الماكينات والخدمات اللوجستية.

الموقع السابق كان يعتمد على WordPress/WooCommerce، ونريد إعادة بنائه بالكامل ببرمجة خاصة بتصميم عالي الجودة وفريد كلياً (Modern, Premium Industrial Design).

---
### 🛠️ التقنيات المطلوبة (Tech Stack):
- **Backend:** Laravel (PHP 8.2+) أو Next.js (Node.js) مع كود نظيف وتصميم معمارية RESTful API / MVC.
- **Frontend:** Tailwind CSS + React.js / Vue.js أو Alpine.js لضمان السرعة والتجاوب مع جميع الشاشات (Responsive Design).
- **Database:** MySQL / PostgreSQL.

---
### 📐 هيكلة المحتوى والصفحات المطلوبة:

1. **الصفحة الرئيسية (Homepage):**
   - هيرو سكشن (Hero Section) تفاعلي يعكس قوة ومجال الشركة.
   - أقسام لأبرز المنتجات والمعدات المتميزة (Featured Products).
   - قسم تعريف بشركة 3M Group وخدماتها.
   - قسم أحدث المقالات/المدونة وقسم اتصل بنا وتعبئة طلب استفسار سريع.

2. **صفحات المنتجات (Product Pages) - متطلب أساسي:**
   - **صفحة الفهرس/المتجر (Products Catalog Page):**
     * عرض المنتجات في شبكة (Grid Layout) مع فلترة ديناميكية (Filter) حسب (التصنيف، المواصفات الفنية، الكلمات المفتاحية).
     * بطاقات المنتجات تظهر الصورة الرئيسية، اسم المنتج، نبذة، والتصنيف.
   - **صفحة تفاصيل المنتج المستقلة (Dedicated Product Detail Page):**
     * رابط فريد لكل منتج (Slug).
     * معرض صور وفيديوهات للمنتج مع خاصية التكبير (Zoom/Lightbox).
     * جدول منظّم للمواصفات الفنية (Technical Specifications Table) المعتمدة على حقول ديناميكية (JSON Key-Value).
     * وصف تفصيلي للمنتج ومميزاته ومجالات استخدامه.
     * نموذج تفاعلي: "طلب عرض سعر" / "زر استفسار مباشر عبر واتساب" مع إرسال تفاصيل المنتج التلقائية مع الرسالة.
     * قسم للمنتجات ذات الصلة (Related Products).

3. **صفحة المدونة والمقالات (Blog Posts - منفصلة تماماً عن المنتجات):**
   - عرض المقالات التقنية والنصائح الصناعية في صفحات منفصلة بعيداً عن المنتجات.

4. **صفحات تعريفية إضافية:**
   - من نحن (About Us)، الخدمات (Services)، اتصل بنا (Contact Us).

---
### 🗄️ هيكل قاعدة البيانات (Database Architecture):
قم بإنشاء الجداول التالية مع العلاقات المناسبة:
- `users`: (id, name, email, password, role)
- `product_categories`: (id, name, slug, image, description)
- `products`: (id, category_id, title, slug, short_description, description, featured_image, gallery [JSON], specifications [JSON], is_featured, status, views_count)
- `posts`: (id, title, slug, content, image, status)
- `inquiries`: (id, product_id [nullable], name, phone, email, message, status)

---
### 🎛️ لوحة التحكم المخصصة (Custom Admin Dashboard):
- **إدارة المنتجات:** إضافة/تعديل/حذف المنتجات، رفع الصور المتعددة، وإدخال المواصفات الفنية بحقول ديناميكية.
- **إدارة الاستفسارات (CRM المصغر):** استقبال طلبات عروض الأسعار القادمة من صفحات المنتجات، مع إمكانية تحديث حالة كل طلب (جديد، تم الرد، قيد المعالجة).
- **إدارة المحتوى والتصنيفات والمدونة.**
- **إعدادات SEO:** تخصيص Meta Titles/Descriptions والكلمات المفتاحية لكل صفحة ومنتج.

---
### 🎨 نظام التصميم والهوية البصرية (Design System):
```css
:root {
  --primary-dark: #0A2647;      /* الأزرق البحري للهيدر والفوتر والعناوين الكبيرة */
  --secondary-teal: #1B7C8C;    /* الزبرجدي للخلفيات الثانوية والأيقونات */
  --accent-yellow: #F5C518;     /* الأصفر للأزرار الرئيسية والكلمات المفتاحية */
  --bg-light: #F4F7FC;          /* خلفية الموقع الأساسية */
  --text-dark: #1E293B;         /* لون النصوص الأساسي */
  --text-white: #FFFFFF;        /* النصوص البيضاء */
}

.btn-primary {
  background-color: var(--accent-yellow);
  color: var(--primary-dark);
  font-weight: 700;
  border: none;
  padding: 14px 32px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--secondary-teal);
  color: var(--text-white);
  box-shadow: 0 8px 20px rgba(27, 124, 140, 0.4);
}

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

---
### 🎯 المخرجات المطلوبة:
1. كتابة كود برمجيات نظيف، آمن، موثق (Clean & Documented Code).
2. بناء الواجهات بتصميم فريد وعصري مناسب للهوية الصناعية لـ 3M Group.
3. التجاوب التام مع جميع الأجهزة (موبايل، تابلت، ديسك توب).
4. سرعة تحميل فائقة وتوافق كامل مع محركات البحث (SEO Friendly).

ابدأ الآن باقتراح هيكلة الملفات وكتابة الكود خطوة بخطوة.
```
