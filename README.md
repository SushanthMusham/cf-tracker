Awesome—here’s a **clean, professional, production-ready README** for your CF Tracker project.
You can paste directly into `README.md` and tweak the project name / links.

---

# 🚀 CF Tracker – Codeforces Performance Dashboard

A full-stack web application that lets users track their **Codeforces performance, rating history, problem-solving analytics, and contest trends** through a clean dashboard with beautiful charts.

Live Demo → **https://<your-vercel-domain>**
Backend API → **https://<your-render-backend-url>**

---

## ✨ Features

* 🔐 **Secure Authentication**

  * JWT-based login
  * Protected dashboard routes
  * Persistent sessions

* 📊 **User Performance Dashboard**

  * Display Codeforces handle
  * Current Rating
  * Max Rating
  * Total Unique Problems Solved

* 📈 **Interactive Visual Analytics**

  * Rating progression line chart
  * Rating-wise solved bar chart
  * Tag-wise solved distribution pie chart

* ⚙️ **Smart Processing**

  * Fetches live Codeforces data
  * Removes duplicate solved problems
  * Categorizes problems by rating & tags
  * Caches processed stats for performance

* 🎨 **Modern UI**

  * Built with Tailwind CSS
  * Fully responsive
  * Dark / Light mode toggle

* ☁️ **Production Ready**

  * Backend deployed on Render
  * Frontend deployed on Vercel

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Recharts
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Axios

### Deployment

* Render (Backend)
* Vercel (Frontend)

---

## 🧩 Architecture Overview

```
User → Frontend (React)
     → Backend API (Express)
     → Codeforces API
     → MongoDB (Cache + Users)
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/cf-tracker.git
cd cf-tracker
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run server

```bash
node server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Create `.env`

```
VITE_API_URL=https://your-render-backend-url/api
```

Run frontend

```bash
npm run dev
```

---

## 🌍 Deployment

### Backend (Render)

1. Upload project or connect GitHub
2. Set **Build Command** → `npm install`
3. Set **Start Command** → `node server.js`
4. Add environment variables
5. Deploy 🎉

---

### Frontend (Vercel)

1. Import repository
2. Add Environment Variable

```
VITE_API_URL=https://your-render-backend-url/api
```

3. Deploy 🎉

---

## 📸 Screenshots (Optional)

*Add screenshots like these*

```
Dashboard View
<img width="1440" height="900" alt="Screenshot 2025-12-19 at 7 00 39 PM" src="https://github.com/user-attachments/assets/16f3ad8e-a17a-4d11-a9c6-677db796cb6e" />

Rating Graph
<img width="1440" height="900" alt="Screenshot 2025-12-19 at 7 00 47 PM" src="https://github.com/user-attachments/assets/a0f5971a-6b07-4734-b83a-008ac832c54b" />

Problem Stats
<img width="1440" height="900" alt="Screenshot 2025-12-19 at 7 01 14 PM" src="https://github.com/user-attachments/assets/fe7f70d7-2f13-47e7-9808-e75e8307e446" />

```

---

## 🔮 Future Enhancements 

* Contest reminders
* Daily streak tracking
* Compare two users
* Leaderboard
* Google OAuth
* Email verification

---

## 🙌 Credits

Built by **Sushanth Musham**
Data Powered by **Codeforces API**

---

