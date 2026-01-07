# 🚀 AI Career Coach & Job Finder

## *Your Personal AI Guide to Education & Employment in Kenya*

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue)
![Focus](https://img.shields.io/badge/Region-Kenya-red)

## 📖 Overview

The **AI Career Coach** is a full-stack web application designed to bridge the gap between education and employment for Kenyan students. It uses **Google Gemini AI** to provide personalized career advice and connects users to real-time job listings via the **JSearch API**.

Whether you are a student looking for the right university course or a graduate hunting for a job, this app acts as your intelligent companion.

## 🔗 Live Demo

* **Frontend:** [Paste your Vercel Link Here]
* **Backend API:** [Paste your Render Link Here]

---

## ✨ Key Features

### 🤖 1. AI Pathfinder (Powered by Gemini)

* An intelligent chatbot that analyzes user interests.
* Recommends specific courses and universities in Kenya.
* Provides tailored career advice based on market trends.

### 🏛️ 2. Kenyan Education Database

* A comprehensive, searchable database of **Counties, Institutions, and Courses**.
* Filter by location (e.g., Nairobi, Embu) and institution type (University, TVET).

### 💼 3. Live Job Dashboard

* **Real-time Job Search:** Fetches live listings from JSearch (LinkedIn, Indeed, etc.).
* **Glassmorphism UI:** Features a modern, futuristic interface with glass cards and glowing backgrounds.
* **Smart Fallbacks:** Directs users to top Kenyan job sites (BrighterMonday, Fuzu) if no specific jobs are found.

### 📱 4. Fully Responsive

* Optimized for both Desktop and Mobile devices using CSS Grid and Flexbox.

---

## 🛠️ Tech Stack

### **Frontend**

* **React (Vite):** For a blazing fast user interface.
* **TypeScript:** For type-safe, robust code.
* **CSS3:** Custom Glassmorphism design and animations.
* **Axios:** For API communication.

### **Backend**

* **Node.js & Express:** Scalable server architecture.
* **Google Gemini AI:** Generative AI integration.
* **RapidAPI (JSearch):** External job data aggregation.

### **Deployment**

* **Frontend:** Vercel
* **Backend:** Render

---

## 🚀 Local Installation Guide

Follow these steps to run the project on your local machine.

### Prerequisites

* Node.js (v18 or higher)
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/Rodgers-Abraham/AI-Career-Coach-App.git
cd AI-Career-Coach-App
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add your keys:

```env
PORT=3000
GEMINI_API_KEY=your_google_gemini_key
RAPID_API_KEY=your_jsearch_key
```

Run the server:

```bash
npm run dev
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app should now be running at `http://localhost:5173`.

---

## 👨‍💻 Author

**Rodgers Abraham**

* **University:** University of Embu
* **Course:** BSc. Information Technology
* **Focus:** Full-Stack Development & AI Integration

---

*Built with ❤️ in Kenya.*