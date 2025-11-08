````markdown
# VitaMedLLM

This repository contains the code for **VitaMedLLM**, a medical AI assistant web application.

## Project Overview

VitaMedLLM is a chat application designed to provide medical information. It features a React-based frontend for the user interface and a Node.js backend to securely interact with the Google Gemini large language model. User authentication is handled by Firebase.

## Architecture

The project is split into two main parts: a frontend application and a backend server.

1.  **Frontend (`/Frontend`)**
    * **Framework:** Built with **React** and **Vite**.
    * **Language:** **TypeScript**.
    * **UI:** Styled using **Tailwind CSS** and components from **shadcn/ui**.
    * **Authentication:** Uses **Firebase Authentication** with Google Sign-In. It's configured to connect to the Firebase Auth Emulator when running locally.
    * **State Management:** React's `useState` and `useEffect` hooks in `App.tsx` manage the application's state, including user auth, conversations, and theme.
    * **Deployment:** Hosted on **Firebase Hosting**.

2.  **Backend (`/render-backend`)**
    * **Framework:** A simple **Node.js** / **Express** server.
    * **Purpose:** Acts as a secure proxy to the Google Gemini API. It receives prompts from the frontend, injects the `GEMINI_API_KEY` (from environment variables), adds a system instruction for the AI's persona, and forwards the request to the Gemini API.
    * **Deployment:** Hosted on **Render**.

---

## How It Works

1.  **Authentication:** The user first sees a `LoginPage` and must log in using Google. Firebase Authentication handles this process.
2.  **Chat Interface:** Once logged in, the `ChatInterface` is displayed, which consists of a `Sidebar` and a `ChatView`.
3.  **Sending a Message:** The user types a message in the `ChatInput` component.
4.  **Backend Request:** The `App.tsx` component sends the user's prompt and conversation history to the Render backend service at `https://vitamedllm.onrender.com/generate`.
5.  **Gemini API Call:** The Express backend receives the request, adds the secret API key and a system prompt ("You are 'Vita Med', a specialized medical AI assistant..."), and calls the Google Gemini API.
6.  **Displaying Response:** The backend returns the AI's text-only response, which is then displayed in the `ChatView` as a new message.

---

## Key Technologies

* **Frontend:** React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Lucide Icons
* **Backend:** Node.js, Express.js
* **AI:** Google Gemini API
* **Platform:** Firebase (Authentication, Hosting, Emulators), Render (Backend Hosting)

---

## How to Run

### 1. Frontend

Navigate to the `/Frontend` directory:

```bash
cd Frontend
````

Install dependencies:

```bash
npm i
```

Run the development server (usually on `http://localhost:3000`):

```bash
npm run dev
```

### 2\. Backend

Navigate to the `/render-backend` directory:

```bash
cd render-backend
```

Install dependencies:

```bash
npm i
```

Create a `.env` file and add your Gemini API key:

```
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

Run the backend server (usually on `http://localhost:8080`):

```bash
npm start
```

### 3\. Firebase Emulators

The project is configured to use the Firebase Auth emulator for local development.

Start the emulators:

```bash
# From the root directory
firebase emulators:start --only auth
```

The frontend application (`firebaseConfig.ts`) will automatically detect it's running on `localhost` and connect to the Auth emulator instead of production Firebase.

```
```