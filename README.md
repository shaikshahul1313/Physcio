# AI Posture Analyzer - Advanced Web App

## Features
- Real-time camera posture analysis (MediaPipe Pose)
- Booking form with email notifications
- Admin panel for success stories (CRUD, images)
- Modern dark theme UI, responsive, animations

## Setup Frontend
```bash
npm install
npm run dev  # http://localhost:5173
```

## Setup Backend
```bash
cd server
npm install
cp .env.example .env  # Edit EMAIL_USER/EMAIL_PASS (Gmail app password)
node server.js  # http://localhost:5000
```

## Admin Login
- URL: http://localhost:5173/admin
- Username: Admin@123
- Password: ShaikshaheedAdmin@123

## Test Posture
- Allow camera
- Good lighting
- Full body visible

## Email
- Gmail app password: Google Account > Security > App passwords

Enjoy your advanced posture analyzer!
