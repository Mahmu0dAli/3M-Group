# دليل نشر مشروع مجموعة 3M Group على الاستضافة السحابية (Deployment Guide)

يوضح هذا المستند الخطوات اللازمة لنشر تطبيق **مجموعة 3M Group** (المطور بـ Node.js/Express و SQLite) على الاستضافات السحابية مثل **Render** أو **Railway** أو السيرفرات الخاصة (VPS).

---

## 1. المتطلبات الأساسية قبل النشر
1. وجود حساب على [GitHub](https://github.com) ومستودع (Repository) خاص بالمشروع.
2. التأكد من عمل المشروع محلياً بشكل سليم (`npm start`).
3. التأكد من وجود ملف `package.json` ونقاط التشغيل الصحيحة:
   ```json
   "scripts": {
     "start": "node src/server.js"
   }
   ```

---

## 2. خطوات النشر على منصة Render (منصة سحابية مقترحة)

1. **رفع الكود إلى GitHub:**
   إذا لم تقم برفعه بعد، نفذ الأوامر التالية في مجلد المشروع:
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin https://github.com/Mahmu0dAli/3M-Group.git
   git push -u origin main
   ```

2. **إنشاء خدمة جديدة على Render:**
   * سجل الدخول إلى [Render Dashboard](https://dashboard.render.com).
   * اضغط على **New +** ثم اختر **Web Service**.
   * اربط حسابك على GitHub واختبر مستودع المشروع (`3m-group-platform`).

3. **إعدادات البناء والتشغيل (Build & Start Settings):**
   * **Name:** `3m-group`
   * **Environment:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `npm start`
   * **Plan:** اختر الخطة المجانية (Free) أو المدفوعة.

4. **متغيرات البيئة (Environment Variables):**
   اضف المتغيرات التالية في قسم **Environment** على لوحة تحكم Render:
   * `PORT` = `3000` (أو اتركه ليعين تلقائياً)
   * `ADMIN_EMAIL` = `admin@3mgroup.com`
   * `ADMIN_PASSWORD` = `admin123` (أو القيمة المسجلة)
   * `SMTP_HOST` = (اختياري - لإشعارات البريد)
   * `SMTP_USER` = (اختياري)
   * `SMTP_PASS` = (اختياري)

5. اضغط على **Create Web Service** وسيتم بناء ونشر الموقع خلال دقائق والحصول على رابط مباشر (مثل `https://3m-group.onrender.com`).

---

## 3. ملاحظة هامة بخصوص قاعدة البيانات (SQLite)
* نظراً لأن المشروع يعتمد على قاعدة بيانات **SQLite** (`src/database.sqlite`)، فإن التخزين على خطط الـ Free Tier يكون مؤقتاً (Ephemerel).
* للحفاظ على المنتجات والاستفسارات الواردة، يفضل ربط **Persistent Disk** في إعدادات Render على المسار الذي يحفظ قاعدة البيانات، أو الانتقال لاحقاً إلى قاعدة بيانات سحابية خارجية (مثل PostgreSQL أو MySQL).

---

## 4. النشر على سيرفر خاص (VPS / Ubuntu / DigitalOcean)
إذا كنت تستخدم سيرفر خاص بك:
1. قم بتثبيت Node.js و Git على السيرفر.
2. استسخخ المستودع: `git clone https://github.com/...`
3. ثبّت الحزم: `npm install --production`
4. استخدم أداة **PM2** لتشغيل التطبيق وضمان استمراريته:
   ```bash
   sudo npm install -g pm2
   pm2 start src/server.js --name "3m-group"
   pm2 startup
   pm2 save
   ```
5. اربط السيرفر بـ Nginx كـ Reverse Proxy وقم بتثبيت شهادة SSL مجانية عبر Certbot.
