# Client Table Multi-Sort

This project is an assignment-style demo for building a **Client List Table UI** with **multi-sort functionality** using React, TypeScript, and Tailwind CSS.

## 🚀 Features
- Client table with mock data (name, email, type, createdAt, updatedAt, status).
- Sort panel to:
  - Add/remove multiple sort criteria.
  - Toggle ascending/descending order per criterion.
  - Drag & drop to reorder priority of sort rules.
- Table updates in real-time with applied multi-sort logic.
- Sort state persists in **localStorage**.
- Clean UI styled with Tailwind.

## 🛠️ Tech Stack
- React + Vite
- TypeScript
- Tailwind CSS
- HTML5 Drag & Drop API

## 📂 Project Structure
```
client-table-multisort/
├── src/
│   ├── components/
│   │   └── ClientTableMultiSort.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## ⚡ Getting Started

### 1. Install dependencies
```sh
npm install
```

### 2. Run development server
```sh
npm run dev
```

Open `http://localhost:5173` in your browser.

## ✅ Evaluation Criteria
- Code quality & reusability
- Component structure & state handling
- Sorting logic and interaction UX
- Attention to detail in replicating the UI
- Optional touches: animation, persistence

---
This project was generated as part of a **Full Stack Web Developer Assignment**.
