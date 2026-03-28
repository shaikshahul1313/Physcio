require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// LowDB setup - fixed async init

// Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}

// Nodemailer transporter - improved Gmail config
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email config error:', error);
  } else {
    console.log('Email server ready');
  }
});

// Initialize DB first, then start server and routes
(async () => {
  db = new Low(new JSONFile('db.json'));
  await db.read();
  db.data ||= { stories: [] };
  await db.write();
  console.log('Database initialized with lowdb');

  // Routes
  // Bookings - fixed with service, proper response
  app.post('/api/bookings', async (req, res) => {

  try {
    const { name, email, phone, date, time, service, message } = req.body;
    
    console.log('New booking:', { name, email, phone, date, time, service });

    await transporter.sendMail({
      from: `"Physio Pulse" <${process.env.EMAIL_USER}>`,
      to: "shaheedshaik236@gmail.com",
      replyTo: email,
      subject: `New Appointment Booking - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2dd4bf;">New Booking Request</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding: 8px;"><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td style="padding: 8px;"><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td style="padding: 8px;"><strong>Phone:</strong></td><td>${phone}</td></tr>
            <tr><td style="padding: 8px;"><strong>Date:</strong></td><td>${date}</td></tr>
            <tr><td style="padding: 8px;"><strong>Time:</strong></td><td>${time}</td></tr>
            <tr><td style="padding: 8px;"><strong>Service:</strong></td><td>${service || 'N/A'}</td></tr>
            <tr><td style="padding: 8px;"><strong>Message:</strong></td><td>${message || 'N/A'}</td></tr>
          </table>
          <p><strong>Physio Pulse</strong><br>9392473392</p>
        </div>
      `
    });

    res.json({ success: true, message: 'Booking successful! Check your email.' });
  } catch (error) {
    console.error('Booking email error:', error);
    res.status(500).json({ success: false, message: 'Booking failed. Please try again.' });
  }
});

// Success Stories
app.get('/api/stories', async (req, res) => {
  try {
    if (!db) throw new Error('DB not ready');
    await db.read();
    res.json(db.data?.stories || []);
  } catch (error) {
    console.error('Stories fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// Alias for success-stories
app.get('/api/success-stories', async (req, res) => {
  try {
    if (!db) throw new Error('DB not ready');
    await db.read();
    res.json(db.data?.stories || []);
  } catch (error) {
    console.error('Success stories fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

app.delete('/api/success-stories/:id', async (req, res) => {
  try {
    if (!db) throw new Error('DB not ready');
    await db.read();
    db.data.stories = db.data.stories.filter(story => story.id !== req.params.id);
    await db.write();
    res.json({ success: true });
  } catch (error) {
    console.error('Success story delete error:', error);
    res.status(500).json({ error: 'Failed to delete story' });
  }
});

app.post('/api/stories', upload.single('image'), async (req, res) => {
  try {
    console.log('POST /api/stories - body:', req.body, 'file:', req.file?.filename);
    if (!db) throw new Error('DB not ready');
    await db.read();
    const story = {
      id: Date.now().toString(),
      title: req.body.title,
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: new Date().toISOString()
    };
    db.data.stories.push(story);
    await db.write();
    console.log('Story added:', story.id);
    res.status(201).json({ success: true, story });
  } catch (error) {
    console.error('Story create error:', error);
    res.status(500).json({ success: false, message: 'Failed to add story' });
  }
});

// Alias for /api/success-stories
app.post('/api/success-stories', upload.single('image'), async (req, res) => {
  try {
    console.log('POST /api/success-stories - body:', req.body, 'file:', req.file?.filename);
    if (!db) throw new Error('DB not ready');
    await db.read();
    const story = {
      id: Date.now().toString(),
      title: req.body.title,
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: new Date().toISOString()
    };
    db.data.stories.push(story);
    await db.write();
    console.log('Story added:', story.id);
    res.status(201).json({ success: true, story });
  } catch (error) {
    console.error('Success story create error:', error);
    res.status(500).json({ success: false, message: 'Failed to add story' });
  }
});


app.delete('/api/stories/:id', async (req, res) => {
  try {
    if (!db) throw new Error('DB not ready');
    await db.read();
    db.data.stories = db.data.stories.filter(story => story.id !== req.params.id);
    await db.write();
    res.json({ success: true });
  } catch (error) {
    console.error('Story delete error:', error);
    res.status(500).json({ error: 'Failed to delete story' });
  }
});

  // Success Stories routes already defined above

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Uploads at http://localhost:${PORT}/uploads`);
  });
})();


