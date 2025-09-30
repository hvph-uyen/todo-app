# To-Do App – Preliminary Assignment Submission

## 🚀 Project Setup & Usage
**How to install and run your project:**  
1. Clone the repository.
2. Run installation:
  - `npm install react react-dom vite`
  - `npm install express cors dotenv openai`
  - `npm install`
  - `npm install react-responsive`
3. `cd` to the server folder directory and run `node server.js`
4. Run `npm run dev` or `npm start` to start.
4. Open your browser and navigate to http://localhost:5173/ (default Vite port) to view the app.

### For the AI Integration
1. Create a `.env` file in the root of the project (or in `src/server` if that's where your app loads it).
2. Add your OpenAI API key to the `.env` file like this:
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (your openai api key)

## 🔗 Deployed Web URL or APK file
https://68c7ef38e0408237b4335f80--taskflow-todo-app-naver-hackathon.netlify.app 

## 🎥 Demo
[Video link here]

## 💻 Project Introduction

### a. Overview
This project is a **smart Todo List app** designed to help users organize their tasks more efficiently.  
It not only supports basic CRUD operations but also provides features like filtering, searching, repeat scheduling, reminders, and **AI-powered task suggestions** to suggest tasks to achieve something users want to do.  

The goal is to create a **productivity tool** that adapts to the user’s current state, making it easier to choose what to work on next and work more effectively.

---

### b. Key Features & Function Manual
- **Task Management (CRUD)**  
  - Add, edit, mark complete, and delete tasks.  
  - Supports bulk deletion of repeated tasks.  
  - Handles up to 50+ tasks smoothly.  

- **Filtering & Searching**  
  - Filter tasks by `All / Upcoming / Finished`.  
  - Search tasks by name or keyword.  

- **Task Input Options**  
  - Priority (Low / Medium / High).  
  - Energy required (1–10 scale).  
  - Date and time.  
  - Repeat mode (daily, weekly, etc.).  
  - Reminders for important tasks.  

- **Task Display**  
  - Tasks are shown on their due date.  
  - **Color-coded** to show upcoming or overdue tasks at a glance.
  - Mobile layout for phone usage.

- **AI Task Suggestion 🤖**  
  - User enters **current energy level** and **available time**.  
  - The app recommends the most suitable task to do next.  

---

### c. Unique Features (What’s special about this app?) 
- Goes beyond a simple todo list by using **AI recommendations**.  
- **Energy-aware & time-aware task selection** helps prevent burnout.  
- Bulk management of repeated tasks (delete all occurrences in one step).  
- Color-coded due dates make it **visually clear** what’s urgent.  
- Designed to be **lightweight and fast** (React + Vite).  

---

### d. Technology Stack and Implementation Methods
- **Frontend**: React + Vite  
  - React for UI components and state management.  
  - Tailwind CSS for clean, responsive design.  
  - `react-responsive` for mobile-friendly layouts.  

- **Backend**: Node.js + Express  
  - REST API for task suggestions.  
  - Connected with OpenAI API for AI-powered task generation.  
  - Uses CORS and dotenv for secure configuration.  

- **AI Integration**: OpenAI API  
  - Used to analyze prompt, current energy, and available time.  
  - Generates smart task suggestions.  

---

### e. Service Architecture & Database structure (when used)
- **Architecture**:  
  - Frontend (React + Vite) communicates with  
  - Backend API (Node.js + Express) which calls  
  - AI Service (OpenAI API).  

- **Database**:  
  - Currently, tasks are stored locally (in-memory / frontend state).  
  - Can be extended to use a persistent database (e.g., MongoDB, PostgreSQL).
