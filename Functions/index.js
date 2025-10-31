const functions = require("firebase-functions");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const fetch = require("node-fetch");

initializeApp();

exports.getLlmResponse = onCall(async (request) => {
    // 1. Check auth
    if (!request.auth) {
        throw new HttpsError(
            "unauthenticated",
            "You must be logged in to call this function."
        );
    }

    // 2. Get prompt
    const prompt = request.data.prompt;
    if (!prompt || typeof prompt !== "string" || prompt.length === 0) {
        throw new HttpsError(
            "invalid-argument",
            "The function must be called with a 'prompt' string."
        );
    }

    const userId = request.auth.uid;
    console.log(`Received prompt from user ${userId}: ${prompt}`);

    // 3. --- MOCKED RESPONSE (for testing) ---
    // We will use this block to test our React app connection.
    console.warn("Using MOCKED model response!");
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { 
        text: `This is a MOCKED response from the function for your prompt: "${prompt}"` 
    };
    // --- END MOCKED RESPONSE ---


    // 4. --- REAL MODEL CALL (to Cloud Run) ---
    // This part is still commented out. We'll use it in the next step.
    /*
    try {
        const MODEL_SERVICE_URL = "https://YOUR-MODEL-SERVICE-URL.a.run.app/generate";
        console.log(`Forwarding prompt to model at: ${MODEL_SERVICE_URL}`);

        const response = await fetch(MODEL_SERVICE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Model service responded with ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const modelResponse = data.response; // Adjust this to match your Python API

        if (!modelResponse) {
             throw new Error("Invalid response format from model service.");
        }
        return { text: modelResponse };

    } catch (error) {
        console.error("Error calling model service:", error);
        throw new HttpsError("internal", `There was an error contacting the model. ${error.message}`);
    }
    */
});