# Meta Lead Tracker

**Meta Lead Tracker** is a full-stack application that fetches **Facebook Lead Ads** data using the **Meta Graph API**, stores it in **MongoDB**, and provides a **React + TypeScript frontend** to view and manage leads. The backend **(Node.js + Express)** handles secure API calls to Meta, data persistence, and serves endpoints for the frontend. 

This project demonstrates integration of third-party APIs, database persistence, and a clean UI for lead management.

---

## 🚀 Features

- Fetch leads directly from **Facebook Graph API**.
- Store leads in **MongoDB** for persistence.
- View all stored leads in a clean **React UI**.
- Manual refresh option to sync new leads from Facebook.
- Organized backend API for fetching and storing leads.

---

## 📂 Project Structure

```bash
Meta-Lead-Tracker/
│
├── Backend/                
│   ├── index.js                     
│   ├── .env        
│   └── package.json
│
├── Frontend/ 
│   ├── public/
│   ├── src/              
│   │   ├── assets/         
│   │   ├── App.tsx         
│   │   ├── Components/
│   │   │   └── LeadList.tsx     
│   │   ├── App.css          
│   │   ├── App.tsx         
│   │   ├── index.css         
│   │   └── main.tsx     
│   ├── .gitignore
│   ├── index.html
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
└── README.md

```

---

## 🛠️ Tech Stack

### Frontend

- React (Vite + TypeScript)
- TailwindCSS (optional for styling)
- Axios (API calls)

### Backend

- Node.js + Express.js
- TypeScript
- Mongoose (MongoDB ODM)
- Database
- MongoDB (Atlas or local instance)

### Integration

- Facebook Graph API

## 🖼️ Screenshots / Demo

Frontend Dashboard

Leads Table

Fetch Latest Leads

---
## 📖 Why this project is useful?

- Helps businesses and marketers track, store, and manage Facebook leads efficiently.

- Eliminates manual effort of exporting CSVs from Facebook Ads Manager.

- Provides a real-time dashboard for lead management.

- Can be extended with filters, search, or CRM integration.

---
## 🚀 Future Improvements

- Authentication & role-based access.

- Filters (date range, ad campaign, etc.).

- Export leads as CSV/Excel.

- CRM integration (HubSpot, Salesforce, etc.).