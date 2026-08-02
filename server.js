// =========================================================
// 3M Group Custom Platform - Main Server (Clean MVC Entry)
// =========================================================

const express = require('express');
const path = require('path');

const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ربط المسارات المنظمة
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`[3M Group Production Server] Running on http://localhost:${PORT}`);
});
