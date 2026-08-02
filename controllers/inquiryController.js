// =========================================================
// Inquiry Controller - معالجة طلبات الاستفسار وإرسال البريد
// =========================================================

const nodemailer = require('nodemailer');
const InquiryModel = require('../models/inquiryModel');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER || 'placeholder_user',
        pass: process.env.SMTP_PASS || 'placeholder_pass'
    }
});

const InquiryController = {
    // إنشاء طلب استفسار جديد
    createInquiry: (req, res) => {
        const { name, phone, email, message } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ success: false, message: "يرجى كتابة الاسم ورقم الهاتف" });
        }

        InquiryModel.create(req.body, function(err) {
            if (err) return res.status(500).json({ success: false, message: err.message });
            
            const inquiryId = this.lastID;

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
        });
    }
};

module.exports = InquiryController;
