# Student Result Management System

A modern **Student Result Management System** built with **React**, **TailwindCSS**, **Vite**, and **JSON Server**. This system allows managing students, sections, and exam results with a responsive UI and CRUD operations for all entities.

---

## 🚀 Features

- Manage **Students**: Add, edit, delete students.
- Manage **Sections**: Add, edit, delete sections.
- Manage **Results**: Add, edit, delete student results with automatic grade calculation.
- Filter results by student and subject.
- Fully responsive UI using **TailwindCSS**.
- Modal-based forms with input validation.
- Notifications for success/error operations.
- Centralized API calls to **JSON Server**.
- Clean architecture with reusable components (`Button`, `Input`, `Select`, `Modal`, `Notification`, `Tabs`).

---

## 🛠 Tech Stack

- **Frontend**:

  - React 19
  - TailwindCSS 4
  - Vite 7
  - React Router DOM (for potential routing)

- **Backend / Mock API**:

  - JSON Server

- **Code Quality**:

  - ESLint
  - Preconfigured linting for React and hooks

- **Utilities**:

  - JavaScript ES6+
  - Modular architecture for components, screens, API, and utils

---

## 📂 Project Structure

```structure
├── src
│   ├── api
│   │   └── api.js           # All API calls & endpoints
│   ├── components
│   │   ├── Button.jsx
│   │   ├── Header.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Notification.jsx
│   │   ├── Select.jsx
│   │   └── Tabs.jsx
│   ├── screens
│   │   ├── ResultsTab.jsx
│   │   ├── SectionsTab.jsx
│   │   └── StudentsTab.jsx
│   ├── utils
│   │   └── grade.js         # Grade calculation utilities
│   ├── App.jsx
│   ├── index.css            # TailwindCSS entry
│   └── main.jsx
├── .gitignore
├── README.md
├── db.json                  # JSON Server database
├── eslint.config.js
├── gla.png                   # Example image
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

### The project follows a modular folder structure:

- api/: All API calls and endpoints (students, sections, results).

- components/: Reusable UI components (Button, Input, Modal, Notification, Select, Tabs, Header).

- screens/: Individual screens for Students, Sections, and Results management.

- utils/: Utility functions, e.g., grade calculation.

- App.jsx: Main component controlling tab navigation.

- index.css: TailwindCSS entry point.

- main.jsx: Application entry point.

- db.json: JSON Server database for mock API.

Other supporting files include index.html, vite.config.js, images, and configuration files.

---

## ⚡ Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/mayankkmauryaa/Student-Result-Management.git
cd student-result-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development

Run JSON Server and Vite together using a single command :

```bash
npm run dev
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **JSON Server API:** [http://localhost:4000](http://localhost:4000)

### 4. Available scripts

| Command                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `npm run dev:frontend` | Start Vite development server                |
| `npm run dev:server`   | Start JSON Server API                        |
| `npm run dev`          | Start both Vite and JSON Server concurrently |
| `npm run build`        | Build production bundle                      |
| `npm run preview`      | Preview production build                     |
| `npm run lint`         | Run ESLint                                   |

---

## 📌 JSON Server API Endpoints

**Base URL:** `http://localhost:4000`

### Students

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/students`     | Get all students   |
| POST   | `/students`     | Create new student |
| PUT    | `/students/:id` | Update student     |
| DELETE | `/students/:id` | Delete student     |

### Sections

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/sections`     | Get all sections   |
| POST   | `/sections`     | Create new section |
| PUT    | `/sections/:id` | Update section     |
| DELETE | `/sections/:id` | Delete section     |

### Results

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | `/results`     | Get all results   |
| POST   | `/results`     | Create new result |
| PUT    | `/results/:id` | Update result     |
| DELETE | `/results/:id` | Delete result     |

---

## 🎨 Styling

- **TailwindCSS** is used for styling.
- Components are reusable and fully responsive.
- Inputs, buttons, selects, modals, notifications, and tabs all styled with Tailwind utilities.
- Background images and card effects included for modern UI.

---

## 📈 Grade Utility

The system calculates grades automatically based on marks and assigns color-coded badges for quick visualization. This logic is implemented in `src/utils/grade.js` .

---

## 👨‍💻 Author

**Mayank Maurya**

- [Portfolio](https://mayankmaurya.netlify.app/)
- [GitHub](https://github.com/mayankkmauryaa/Student-Result-Management)
- [LinkedIn](https://www.linkedin.com/in/mayankmaurya05/)

---

## 📄 License

This project is **MIT licensed**.

---
"# Mini-Project-on-React-Js" 
