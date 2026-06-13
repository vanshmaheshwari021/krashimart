# KarshiMart

KarshiMart is a full-stack B2B/B2C agricultural e-commerce platform built on the MERN stack (MongoDB, Express, React, Node.js). It supports dual-mode operation: Retail Mode for direct consumer sales, and Wholesale Mode for B2B bulk inquiries.

## Features
- **Dual Modes:** Toggle between Retail (B2C direct purchase) and Wholesale (B2B enquiry) modes.
- **Admin Dashboard:** Full CMS to manage website name, dynamic hero sections, promotional banners, products, categories, orders, and customer enquiries.
- **Security:** Helmet, Mongo Sanitize, XSS Clean, and Rate Limiting integrated.
- **Dynamic Content:** Browse by Category marquee, dynamic banners, and editable policies.
- **Passwordless Auth:** Secure OTP/link-based or simplified auth flow for customers, and password-based auth for admins.

## Folder Structure
```text
ip4/
├── apps/
│   ├── backend/          # Node.js + Express API
│   │   ├── src/
│   │   │   ├── controllers/  # API logic
│   │   │   ├── models/       # Mongoose schemas
│   │   │   ├── routes/       # API endpoints
│   │   │   └── config/       # DB & Env configuration
│   │   ├── server.js         # Entry point
│   │   └── .env              # Backend environment variables
│   └── frontend/         # React + Vite App
│       ├── src/
│       │   ├── components/   # Reusable UI components
│       │   ├── pages/        # Main pages & Admin views
│       │   ├── context/      # Global state (Auth, Store)
│       │   └── config/       # API config
│       └── package.json
├── package.json          # Root package.json (if using workspaces)
└── README.md             # This file
```

## Environment Variables
Create a `.env` file in `apps/backend/` with the following:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.../karshimart
JWT_SECRET=supersecretkarshimartkey2026
FRONTEND_URL=http://localhost:5173
```

In `apps/frontend/src/config/api.js`, the frontend automatically connects to the backend:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

## Setup & Run Locally

1. **Install Dependencies**
   ```bash
   cd apps/backend && npm install
   cd ../frontend && npm install
   ```

2. **Seed the Database** (Initial Demo Data)
   ```bash
   cd apps/backend
   node src/seed.js
   ```
   *This seeds 10 products, 4 categories, 3 CMS pages, 3 enquiries, and 3 test orders.*

3. **Start the Development Servers**
   - **Backend:** `cd apps/backend && npm run dev`
   - **Frontend:** `cd apps/frontend && npm run dev`

## Admin Access
- **Admin Email/Username:** `admin`
- **Password:** `password`
- **Admin URL:** `/admin`

## Deployment Checklist Fulfillment
- **GitHub Repo:** https://github.com/vanshmaheshwari021/krashimart.git
- **Live Frontend URL:** https://frontend-blue-five-52.vercel.app
- **Live Backend API:** https://backend-delta-blush-10.vercel.app
- **Admin Credentials:** `admin` / `password`
- **Database:** MongoDB Atlas is configured and running.
- **Seed Data:** Pre-seeded via `seed.js`.
