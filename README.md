# SNP Electrical Backend API

Node.js/Express backend for SNP Electrical maintenance management system.

## Features

- **RESTful API** for job, customer, technician, and equipment management
- **Firebase Integration** for cloud database
- **PDF Report Generation** with Puppeteer
- **Email System** for sending service reports
- **Authentication** with JWT tokens
- **File Upload** for job photos
- **Real-time Data** with Firebase Firestore

## Technology Stack

- **Node.js** with Express
- **Firebase Admin SDK** for database operations
- **JWT** for authentication
- **Puppeteer** for PDF generation
- **Nodemailer** for email sending
- **Multer** for file uploads

## Environment Variables

Create a `.env` file with the following variables:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000
NODE_ENV=production

# JWT Secret (generate a secure random string)
JWT_SECRET=your-jwt-secret-key
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/login` - User authentication
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create customer
- `GET /api/technicians` - Get all technicians
- `POST /api/technicians` - Create technician
- `GET /api/equipment` - Get all equipment
- `POST /api/equipment` - Create equipment
- `GET /api/reports` - Get service reports
- `POST /api/reports` - Create service report
- `GET /api/pdf/job/:id` - Generate PDF report

## Deployment

This backend is designed to be deployed on Render as a Web Service.

### Render Configuration:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: Node.js
- **Plan**: Free tier available

### Required Environment Variables for Production:
- `FIREBASE_PROJECT_ID`
- `EMAIL_USER`
- `EMAIL_PASS`
- `JWT_SECRET`
- `NODE_ENV=production`