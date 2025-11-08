# VitaMedLLM

This repository contains the code for **VitaMedLLM**, a medical AI assistant web application.

## 🩺 Project Overview

VitaMedLLM is a chat application designed to provide accurate and helpful medical information.  
It features a **React-based frontend** for the user interface and a **Node.js backend** that securely interacts with the **Google Gemini** large language model.  
User authentication is handled using **Firebase**.

---

## 🧩 Architecture

The project consists of two main parts: a **frontend application** and a **backend server**.

### 1. Frontend (`/Frontend`)
- **Framework:** React + Vite  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS + shadcn/ui components  
- **Authentication:** Firebase Authentication (Google Sign-In)  
  - Automatically connects to the **Firebase Auth Emulator** when running locally  
- **State Management:** Uses React’s `useState` and `useEffect` hooks in `App.tsx` to manage user authentication, chat sessions, and theme  
- **Deployment:** Hosted on **Firebase Hosting**

### 2. Backend (`/render-backend`)
- **Framework:** Node.js + Express  
- **Purpose:** Acts as a secure proxy to the **Google Gemini API**  
  - Receives prompts from the frontend  
  - Injects the `GEMINI_API_KEY` (from environment variables)  
  - Adds a system prompt for the AI persona  
  - Forwards the request to the Gemini API and returns the response  
- **Deployment:** Hosted on **Render**

---

## ⚙️ How It Works

1. **Authentication:**  
   The user logs in using Google on the `LoginPage`. Firebase Authentication handles the login.

2. **Chat Interface:**  
   Once authenticated, the `ChatInterface` (composed of `Sidebar` and `ChatView`) is shown.

3. **User Message:**  
   The user sends a message via the `ChatInput` component.

4. **Backend Request:**  
   The `App.tsx` component sends the message and conversation history to the backend endpoint:  
   ```
   https://vitamedllm.onrender.com/generate
   ```

5. **Gemini API Call:**  
   The Express backend adds the system prompt  
   (“You are 'Vita Med', a specialized medical AI assistant…”)  
   and sends the request to the **Google Gemini API**.

6. **Response Display:**  
   The backend returns the AI’s text-only response, which appears in the `ChatView`.

---

## 🧠 Key Technologies

| Category | Tools |
|-----------|--------|
| **Frontend** | React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **AI** | Google Gemini API |
| **Platform** | Firebase (Auth, Hosting, Emulators), Render (Backend Hosting) |

---

## 🚀 Running the Project

### 1. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs by default at **http://localhost:3000**.

---

### 2. Backend Setup

```bash
cd render-backend
npm install
```

Create a `.env` file and add your Gemini API key:

```env
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

Run the backend server:

```bash
npm start
```

Backend runs by default at **http://localhost:8080**.

---

### 3. Firebase Emulators (Optional for Local Testing)

If you’re using Firebase locally:

```bash
# From the project root
firebase emulators:start --only auth
```

The `firebaseConfig.ts` file automatically detects if you’re on `localhost`  
and connects to the **Firebase Auth Emulator** instead of the live Firebase service.

---

## 📦 Deployment

- **Frontend:** Deploy to **Firebase Hosting**  
- **Backend:** Deploy to **Render** (ensure your environment variable `GEMINI_API_KEY` is configured)  

---

## 👨‍⚕️ About VitaMedLLM

VitaMedLLM is designed as a **secure, user-friendly medical AI chat system**, combining:
- Trusted authentication via Google  
- A modern, responsive UI  
- A backend that protects sensitive API keys  
- Integration with Google Gemini for natural language medical responses  

---

**Author:** VitaMedLLM Team  
**License:** MIT  
