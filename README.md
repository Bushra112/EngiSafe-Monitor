**EngiSafe Monitor — Full-Stack Safety Management System**

A modern full-stack workplace safety monitoring system built with React, Flask, and MongoDB, enabling organizations to track workers, equipment, and safety incidents—all in one place.

• Real-time dashboard analytics

• CRUD for workers, equipment & incidents

• Severity-based visual reporting (charts)

• Deployed frontend & backend

• AI-powered safety assistant

• Fully documented & production-ready


📦 Live Demo

**Frontend (Vercel)**

https://engi-safe-monitor.vercel.app


📦 **Backend API (Render)**

https://engisafe-monitor.onrender.com


📦 **GitHub Repository**

https://github.com/Bushra112/EngiSafe-Monitor


**Problem Statement**

Industrial environments struggle with:

1) Disorganized safety records

2) Manual data entry & reporting

3) Delayed response to incidents

4) Lack of centralized visibility


EngiSafe Monitor solves this by providing a unified safety tracking platform with analytics, automation, and AI-based guidance.

✨ Key Features

• Add, view & delete workers

• Manage equipment inventory

• Report incidents with severity & timestamps

• Interactive dashboard with statistics

• Pie-chart severity visualization

• MongoDB-powered data storage

• Floating AI chatbot for safety queries

• Responsive, clean UI

• REST API design & modular backend architecture

• Fully deployed — no local setup required


🛠️ Tech Stack

**Frontend:**

React (Vite)

React-Bootstrap

Axios

Chart.js

**Backend**

Python Flask

Flask-REST API

Flask-CORS

Database

MongoDB Atlas (Cloud NoSQL)

AI

Gemini 1.5 Flash — Generative Safety Assistant


**Deployment**

Frontend — Vercel

Backend — Render

Database — MongoDB Atlas


**Local Setup Instructions**

**1. Clone Repo**

git clone https://github.com/Bushra112/EngiSafe-Monitor.git

cd EngiSafe-Monitor


**2. Backend Setup (Flask)**

cd backend

pip install -r requirements.txt


**Create .env file:**

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key


**Run server:**

python app.py


**Backend runs at:**

http://localhost:5000


**3. Frontend Setup (React)**

cd frontend

npm install


**Create .env:**

VITE_API_URL=http://localhost:5000


**Run dev server:**

npm run dev

**Frontend runs at:**

http://localhost:5173



