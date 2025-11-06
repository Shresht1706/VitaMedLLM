/*
 * VitaMedLLM Backend
 * ------------------
 * A simple Node.js/Express server that:
 * 1. Receives a prompt and chat history from your React app.
 * 2. Adds your Gemini API key (from environment variables).
 * 3. Injects a "persona" instruction for your AI.
 * 4. Calls the Gemini API and returns the model's response.
 */

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// --- Security ---
// Gemini API Key (set in Render or your .env file)
const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`;

// Allowed origins (CORS policy)
const allowedOrigins = [
  'https://vitamedllm.web.app',
  'https://vitamedllm.firebaseapp.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// --- API Endpoints ---
app.get("/", (req, res) => {
  res.send({ status: "VitaMedLLM Backend is online" });
});

app.post("/generate", async (req, res) => {
  if (!API_KEY) {
    console.error("Server is missing API key.");
    return res.status(500).send({ error: "Server is not configured." });
  }

  const { history, prompt } = req.body;
  if (!prompt) return res.status(400).send({ error: "No prompt provided." });

  console.log(`Forwarding prompt to Gemini API: ${prompt.substring(0, 30)}...`);

  try {
    // 1. Map frontend chat history to Gemini's format
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // 2. Add the latest user prompt
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    // 3. Add system instruction (AI persona)
    const systemInstruction = {
      parts: [{
        text: "You are 'Vita Med', a specialized medical AI assistant. " +
              "Your knowledge is based on the 'wiki_medical_terms' dataset. " +
              "You are professional, empathetic, and clear. " +
              "Provide accurate medical information and definitions only. " +
              "Do NOT give diagnoses, treatment plans, or medical advice. " +
              "Always end responses by advising the user to consult a qualified healthcare professional."
      }]
    };

    const payload = {
      contents,
      systemInstruction
    };
    
    // Call Gemini API
    const geminiResponse = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      throw new Error(`Gemini API responded with ${geminiResponse.status}: ${errorText}`);
    }

    const data = await geminiResponse.json();
    const modelResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!modelResponse) {
      console.error("Invalid response from Gemini API:", JSON.stringify(data, null, 2));
      throw new Error("Invalid response format from Gemini API.");
    }

    res.send({ text: modelResponse });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).send({ error: error.message });
  }
});

// --- Start Server ---
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}`);
});
