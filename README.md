# 🎯 GolfD — Smart Draw & Winner System

A full-stack web application where users submit scores, participate in monthly draws, and win prizes — with an admin-controlled verification and payout system.

---

## ✨ Why I Built This

I wanted to build something more than a basic CRUD app — something that feels like a real product.

This project simulates a **lottery-style system** with:
- user participation
- automated winner selection
- admin verification workflow
- subscription-based access

---

## 🧠 Core Features

### 👤 User Side
- Register & Login (JWT authentication)
- Submit scores
- Participate in draws
- View winners
- Upload proof (only for their own wins)
- Subscription (monthly / yearly)

---

### 🏆 Draw System
- Random number generation
- Winner matching logic
- Prize distribution
- Jackpot rollover system

---

### 🛠 Admin Panel
- View analytics (users, scores, winners)
- Approve / Reject winners
- Manage draws
- Monitor prize distribution

---

### 💳 Payments
- Stripe Checkout integration
- Demo subscription activation
- (Webhook support can be extended)

---

## 🔐 Role-Based Access

| Role | Access |
|------|--------|
| USER | Scores, Winners, Subscription |
| ADMIN | Full control (verification + analytics) |

---

## 🧰 Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Recharts (analytics)

### Backend
- Node.js + Express
- PostgreSQL (Supabase)
- Prisma ORM

### Auth & Payments
- JWT Authentication
- Stripe API

---

## 📊 System Flow

1. User submits score  
2. Admin or system generates draw  
3. Winners are calculated  
4. Winners upload proof  
5. Admin verifies → APPROVED / REJECTED  
6. Prize is distributed  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo  
### Backend Setup 
cd backend
npm install

Create .env:

DATABASE_URL=
JWT_SECRET=
STRIPE_SECRET_KEY=

Run:

npx prisma migrate dev
npm run dev


### frontend setup
cd frontend
npm install
npm run dev
🧪 Test Credentials
Admin:
email: madhubala@gmail.com
password: Admin@23

User:
email: parth@gmail.com
password: 12345678
```bash
git clone https://github.com/your-username/golfd.git
cd golfd
