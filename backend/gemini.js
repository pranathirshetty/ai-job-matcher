import 'dotenv/config'; // Must be line 1
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Verify Key Exists
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY is missing in your .env file!");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 2. Ensure "export" is present here!
export async function getJobsFromGemini(profile) {
  try {
    // Using the 2026 stable alias
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `
      Recommend 3 jobs for:
      Name: ${profile.name}
      Skills: ${profile.skills?.join(", ") || "No skills listed"}

      Return ONLY a JSON object in this format:
      {
        "jobs": [
          {
            "title": "Job Title",
            "company": "Company Name",
            "location": "Remote",
            "salary": "Range",
            "matchReason": "Why it matches"
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean Markdown formatting if Gemini adds it
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson).jobs || [];

  } catch (err) {
    console.error("❌ Gemini API Error:", err.message);
    return []; // Return empty list so the app doesn't crash
  }
}