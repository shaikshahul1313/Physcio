require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
let db = null;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Nodemailer transporter config
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'shaheedshaik236@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

if (process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'your_gmail_app_password_here') {
  transporter.verify((error) => {
    if (error) {
      console.warn('⚠️ Email config notice:', error.message);
    } else {
      console.log('✅ Email server ready to dispatch notifications');
    }
  });
} else {
  console.log('ℹ️ Email notifications will log to console (set valid EMAIL_PASS in server/.env for live Gmail delivery)');
}

// Default practice settings & profile
const defaultProfile = {
  name: "Dr. Shaik Mohamed Shaheed",
  credentials: "B.P.T, CDNT.",
  title: "Consultant Physiotherapist & Certified Dry Needling Therapist",
  bio: "Modern physiotherapy and advanced rehabilitation tailored for active, pain-free recovery.",
  image: "/uploads/doctor-photo.png"
};

const defaultSettings = {
  serviceMode: "both", // "home_visits" | "clinic" | "both"
  serviceArea: "Home Visits across the city & surrounding areas",
  clinicAddress: "Physio Pulse Clinic, Home service, India",
  phone: "9392473392",
  whatsapp: "9392473392",
  email: "shaheedshaik236@gmail.com",
  timings: "Monday - Saturday: 8:00 AM - 8:00 PM",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.471553580572!2d78.4746!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjAiTiA3OMKwMjgnMjguNiJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
  instagram: "physioonreels",
  instagramUrl: "https://instagram.com/physioonreels",
  facebook: "Physio Pulse Clinic",
  facebookUrl: "https://facebook.com",
  youtube: "physioonreels",
  youtubeUrl: "https://youtube.com/@physioonreels?si=S2lBoYVgr6a5Ng2R"
};

// Initialize DB and start server
(async () => {
  const { Low, JSONFile } = await import('lowdb');
  db = new Low(new JSONFile(path.join(__dirname, 'db.json')));
  await db.read();
  
  db.data ||= {};
  db.data.stories ||= [];
  db.data.bookings ||= [];
  db.data.profile = { ...defaultProfile, ...(db.data.profile || {}) };
  if (!db.data.profile.image) {
    db.data.profile.image = defaultProfile.image;
  }
  db.data.settings = { ...defaultSettings, ...(db.data.settings || {}) };
  await db.write();
  console.log('Database initialized with lowdb');

  // ---------- PRACTICE SETTINGS & PROFILE ROUTES ----------
  app.get('/api/settings', async (req, res) => {
    try {
      if (!db) throw new Error('DB not ready');
      await db.read();
      res.json({
        success: true,
        profile: db.data.profile || defaultProfile,
        settings: db.data.settings || defaultSettings
      });
    } catch (error) {
      console.error('Settings fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch settings', profile: defaultProfile, settings: defaultSettings });
    }
  });

  app.post('/api/settings', async (req, res) => {
    try {
      if (!db) throw new Error('DB not ready');
      await db.read();
      const { profile, settings } = req.body;
      if (profile) {
        db.data.profile = { ...db.data.profile, ...profile };
      }
      if (settings) {
        db.data.settings = { ...db.data.settings, ...settings };
      }
      await db.write();
      res.json({ success: true, profile: db.data.profile, settings: db.data.settings });
    } catch (error) {
      console.error('Settings update error:', error);
      res.status(500).json({ success: false, error: 'Failed to update settings' });
    }
  });

  app.post('/api/profile-photo', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No image file uploaded' });
      }
      if (!db) throw new Error('DB not ready');
      await db.read();
      const imagePath = `/uploads/${req.file.filename}`;
      db.data.profile ||= { ...defaultProfile };
      db.data.profile.image = imagePath;
      await db.write();

      console.log('Doctor profile photo updated:', imagePath);
      res.json({ success: true, image: imagePath, profile: db.data.profile });
    } catch (error) {
      console.error('Profile photo upload error:', error);
      res.status(500).json({ success: false, message: 'Failed to upload photo' });
    }
  });

  // ---------- BOOKING ROUTES ----------
  app.get('/api/bookings', async (req, res) => {
    try {
      if (!db) throw new Error('DB not ready');
      await db.read();
      res.json(db.data.bookings || []);
    } catch (error) {
      console.error('Bookings fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  app.post('/api/bookings', async (req, res) => {
    try {
      const {
        name,
        age,
        gender,
        condition,
        subCondition,
        description,
        phone,
        email,
        date,
        time,
        serviceMode
      } = req.body;

      const newBooking = {
        id: Date.now().toString(),
        name: name || 'Unnamed Patient',
        age: age || 'N/A',
        gender: gender || 'N/A',
        condition: condition || 'General',
        subCondition: subCondition || 'N/A',
        description: description || 'N/A',
        phone: phone || '9392473392',
        email: email || 'shaheedshaik236@gmail.com',
        date: date || new Date().toISOString().split('T')[0],
        time: time || 'Flexible',
        serviceMode: serviceMode || 'Home Visit / Clinic',
        status: 'new',
        createdAt: new Date().toISOString()
      };

      if (db) {
        await db.read();
        db.data.bookings ||= [];
        db.data.bookings.unshift(newBooking);
        await db.write();
      }

      console.log('New patient booking registered:', newBooking.id, newBooking.name);

      // Attempt email delivery if credentials configured
      if (process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'your_gmail_app_password_here') {
        try {
          await transporter.sendMail({
            from: `"Physio Pulse Appointments" <${process.env.EMAIL_USER || 'shaheedshaik236@gmail.com'}>`,
            to: "shaheedshaik236@gmail.com",
            replyTo: email || "shaheedshaik236@gmail.com",
            subject: `New Patient Appointment: ${newBooking.name} - ${newBooking.condition} (${newBooking.subCondition})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="background: linear-gradient(135deg, #0d9488, #2563eb); color: white; padding: 24px; text-align: center;">
                  <h1 style="margin: 0; font-size: 22px;">New Appointment Request</h1>
                  <p style="margin: 6px 0 0; opacity: 0.9; font-size: 14px;">Physio Pulse - Dr. Shaik Mohamed Shaheed</p>
                </div>
                <div style="padding: 24px; background: #ffffff;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                    <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b; width: 35%;"><strong>Patient Name:</strong></td><td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${newBooking.name}</td></tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;"><strong>Age / Gender:</strong></td><td style="padding: 10px 0; color: #0f172a;">${newBooking.age} yrs / ${newBooking.gender}</td></tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;"><strong>Primary Condition:</strong></td><td style="padding: 10px 0; color: #0d9488; font-weight: bold;">${newBooking.condition}</td></tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;"><strong>Specific Area / Condition:</strong></td><td style="padding: 10px 0; color: #0f172a;">${newBooking.subCondition}</td></tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;"><strong>Contact Phone:</strong></td><td style="padding: 10px 0; color: #0f172a;"><a href="tel:${newBooking.phone}">${newBooking.phone}</a></td></tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; color: #64748b;"><strong>Description / Symptoms:</strong></td><td style="padding: 10px 0; color: #334155; line-height: 1.5;">${newBooking.description}</td></tr>
                    <tr><td style="padding: 10px 0; color: #64748b;"><strong>Preferred Date:</strong></td><td style="padding: 10px 0; color: #0f172a;">${newBooking.date}</td></tr>
                  </table>
                  <div style="margin-top: 24px; text-align: center;">
                    <a href="https://wa.me/${newBooking.phone.replace(/[^0-9]/g, '')}" style="background-color: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Reply on WhatsApp</a>
                  </div>
                </div>
              </div>
            `
          });
        } catch (emailErr) {
          console.warn('Email dispatch warning (check SMTP credentials):', emailErr.message);
        }
      }

      res.json({
        success: true,
        message: 'Booking details registered successfully.',
        booking: newBooking
      });
    } catch (error) {
      console.error('Booking creation error:', error);
      res.status(500).json({ success: false, message: 'Failed to record booking.' });
    }
  });

  app.delete('/api/bookings/:id', async (req, res) => {
    try {
      if (!db) throw new Error('DB not ready');
      await db.read();
      db.data.bookings = (db.data.bookings || []).filter(b => b.id !== req.params.id);
      await db.write();
      res.json({ success: true });
    } catch (error) {
      console.error('Booking deletion error:', error);
      res.status(500).json({ error: 'Failed to delete booking' });
    }
  });

  app.patch('/api/bookings/:id', async (req, res) => {
    try {
      if (!db) throw new Error('DB not ready');
      await db.read();
      const booking = (db.data.bookings || []).find(b => b.id === req.params.id);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });
      Object.assign(booking, req.body);
      await db.write();
      res.json({ success: true, booking });
    } catch (error) {
      console.error('Booking update error:', error);
      res.status(500).json({ error: 'Failed to update booking' });
    }
  });

  // ---------- SUCCESS STORIES ROUTES ----------
  app.get(['/api/stories', '/api/success-stories'], async (req, res) => {
    try {
      if (!db) throw new Error('DB not ready');
      await db.read();
      res.json(db.data?.stories || []);
    } catch (error) {
      console.error('Stories fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch stories' });
    }
  });

  const handleStoryCreate = async (req, res) => {
    try {
      if (!db) throw new Error('DB not ready');
      await db.read();
      const story = {
        id: Date.now().toString(),
        title: req.body.title || 'Recovery Success',
        description: req.body.description || '',
        image: req.file ? `/uploads/${req.file.filename}` : null,
        createdAt: new Date().toISOString()
      };
      db.data.stories ||= [];
      db.data.stories.unshift(story);
      await db.write();
      console.log('Story added:', story.id);
      res.status(201).json({ success: true, story });
    } catch (error) {
      console.error('Story create error:', error);
      res.status(500).json({ success: false, message: 'Failed to add story' });
    }
  };

  app.post('/api/stories', upload.single('image'), handleStoryCreate);
  app.post('/api/success-stories', upload.single('image'), handleStoryCreate);

  const handleStoryDelete = async (req, res) => {
    try {
      if (!db) throw new Error('DB not ready');
      await db.read();
      db.data.stories = (db.data.stories || []).filter(story => story.id !== req.params.id);
      await db.write();
      res.json({ success: true });
    } catch (error) {
      console.error('Story delete error:', error);
      res.status(500).json({ error: 'Failed to delete story' });
    }
  };

  app.delete('/api/stories/:id', handleStoryDelete);
  app.delete('/api/success-stories/:id', handleStoryDelete);

  app.listen(PORT, () => {
    console.log(`Physio Pulse API running on port ${PORT}`);
    console.log(`Uploads serving at http://localhost:${PORT}/uploads`);
  });
})();
