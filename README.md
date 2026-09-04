# FixLanka — Local Service Finder & Request System

FixLanka is a web application designed specifically for Sri Lanka, connecting local households and businesses with verified nearby service providers (electricians, plumbers, mechanics, AC technicians, and more).

---

## 1. Problem Statement
In Sri Lanka, finding reliable and available local service providers is often fragmented. People traditionally rely on word-of-mouth recommendations, local noticeboards, or informal WhatsApp groups. This makes finding urgent assistance during power failures, plumbing leaks, or vehicle breakdowns stressful, inefficient, and slow.

## 2. Sri Lankan Context & Solution
FixLanka addresses local geographic and service challenges by organizing service providers across Sri Lankan cities and towns (e.g., Kandy, Colombo, Peradeniya, Katugastota, Kundasale, Matale, Kurunegala, Gampola). Users can search by specific trades, filter by location and immediate availability, review experience level and ratings, get a rule-based **Smart Match** score, and submit instant service requests with transparent tracking IDs (`FL-XXXX`).

## 3. Target Users
- **Sri Lankan Households & Individuals**: Needing quick repairs, plumbing, electrical, or mechanic work.
- **Local Tradespeople & Service Providers**: Seeking digital visibility without complex sign-up hurdles.

## 4. Key Features
- 🔎 **Provider Search & Multi-Filter**: Search by trade, location, availability status, and minimum rating.
- 🎯 **Transparent Smart Match Engine**: Rule-based recommendation algorithm evaluating trade fit (40%), location proximity (30%), availability (20%), and rating (10%).
- 📝 **Service Request System**: Submit problem descriptions, preferred dates, and urgency levels with instant Sri Lankan phone validation.
- 🆔 **Human-Readable Tracking**: Auto-generated tracking IDs (e.g., `FL-1001`) for user reference.
- 📊 **My Requests Dashboard**: Real-time request monitoring with status indicators (Pending, Accepted, In Progress, Completed, Cancelled).
- ⚡ **Demo Status Toggle**: Interactive request status updates for easy 2-minute hackathon presentations.

---

## 5. System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    FixLanka Web Client                      │
│            (React + Vite + React Router + Vanilla CSS)      │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST API calls (fetch)
┌──────────────────────────────▼──────────────────────────────┐
│                    FixLanka REST API                        │
│                (Node.js + Express Server)                   │
└──────────────────────────────┬──────────────────────────────┘
                               │ Mongoose ODM
┌──────────────────────────────▼──────────────────────────────┐
│                    MongoDB Atlas / Database                 │
│               Database: fixlanka                            │
│               Collections: providers, servicerequests       │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Technology Stack
- **Frontend**: React 18, Vite, JavaScript (ES6+), React Router v6, Lucide Icons, Custom CSS Design System.
- **Backend**: Node.js, Express.js, Cors, Dotenv.
- **Database**: MongoDB Atlas / Mongoose.
- **Deployment**: Vercel (Frontend), Railway (Backend).

---

## 7. Project Structure
```
fixlanka/
├── frontend/             # React + Vite Client Application
│   ├── public/
│   ├── src/
│   │   ├── components/   # Reusable UI Components
│   │   ├── pages/        # Route Pages (Home, FindServices, ProviderProfile, etc.)
│   │   ├── services/     # Centralized API functions
│   │   ├── utils/        # Validation & Smart Match logic
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── backend/              # Node.js + Express Server
│   ├── src/
│   │   ├── config/       # MongoDB Connection
│   │   ├── controllers/  # API Controllers
│   │   ├── middleware/   # Global Error Handler
│   │   ├── models/       # Mongoose Schemas (Provider, ServiceRequest)
│   │   ├── routes/       # Express Endpoints
│   │   └── server.js
│   ├── seed/             # Sri Lanka Provider Seed Data Script
│   ├── package.json
│   └── .env
├── README.md             # Project Documentation
├── AI-PROMPT-LOG.md      # AI Prompt & Assistance Log
└── .gitignore            # Git exclusion rules
```

---

## 8. Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/fixlanka
FRONTEND_URL=http://localhost:5173
```
*For production, set `MONGODB_URI` to your MongoDB Atlas connection string.*

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```
*For production, set `VITE_API_URL` to your deployed Railway backend URL (e.g., `https://your-backend.up.railway.app/api`).*

---

## 9. Quick Setup & Run Instructions

### Step 1: Clone & Setup Backend
```bash
cd backend
npm install
# Configure backend/.env file
```

### Step 2: Seed Sample Data
Populate MongoDB with Sri Lankan sample providers:
```bash
npm run seed
```

### Step 3: Run Backend Server
```bash
npm run dev
# Backend server runs on http://localhost:5000
```

### Step 4: Setup & Run Frontend
In a separate terminal window:
```bash
cd frontend
npm install
npm run dev
# Frontend app runs on http://localhost:5173
```

---

## 10. API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/providers` | Query providers (`service`, `location`, `availability`, `rating`, `search`) |
| `GET` | `/api/providers/:id` | Fetch single provider details |
| `POST` | `/api/providers` | Create new provider |
| `PUT` | `/api/providers/:id` | Update provider details |
| `DELETE` | `/api/providers/:id` | Delete provider |
| `GET` | `/api/requests` | Fetch all service requests |
| `GET` | `/api/requests/:id` | Fetch service request by ID |
| `POST` | `/api/requests` | Create service request (auto-generates `FL-XXXX`) |
| `PUT` | `/api/requests/:id` | Update service request details |
| `PATCH` | `/api/requests/:id/status` | Update request status (Pending, Accepted, In Progress, Completed, Cancelled) |
| `DELETE` | `/api/requests/:id` | Cancel/Delete service request |

---

## 11. Team Members & Git Contribution Matrix

| Team Member Name | Student ID | Primary Component Ownership | Key Commits |
|---|---|---|---|
| Member 1 (Placeholder) | [STUDENT_ID_1] | Service Discovery & Frontend UI | `feat: build responsive navigation`, `feat: implement provider cards & search filters` |
| Member 2 (Placeholder) | [STUDENT_ID_2] | Provider Management & Backend API | `feat: configure MongoDB connection`, `feat: implement provider CRUD & seed data` |
| Member 3 (Placeholder) | [STUDENT_ID_3] | Service Request & Tracking System | `feat: implement service request form`, `feat: add phone validation & status tracking` |
| Member 4 (Placeholder) | [STUDENT_ID_4] | Integration, Smart Match & Quality | `feat: integrate frontend API layer`, `feat: implement smart match algorithm & error handling` |

---

## 12. AI Assistance & Prompt Log
This application was structured with assistance from AI coding tools. Refer to [`AI-PROMPT-LOG.md`](file:///c:/Users/hesha/OneDrive/Desktop/Group%2007/fixlanka/AI-PROMPT-LOG.md) for full prompt history, tool usage, and human verification notes.

---

## 13. Known Limitations & Future Roadmap
- **No Authentication**: Built intentionally without login/JWT to satisfy hackathon speed and simplicity goals.
- **Demo Status Controls**: Status updates are open on the tracking UI for quick presentation demonstration.
- **Future Improvements**: Add SMS/WhatsApp notifications via Twilio, interactive Google Maps location pins, customer reviews/ratings submission, and provider dashboard login.
