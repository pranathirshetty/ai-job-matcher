import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'; // This loads the .env file immediately for this module

console.log("GEMINI KEY:", process.env.GEMINI_API_KEY ? "✅ Key Found" : "❌ Key Undefined");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY missing in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getJobsFromGemini(profile) {
  try {
    // Note: 'gemini-1.5-flash' is faster and cheaper if you want to switch later
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      User name: ${profile.name}
      Skills: ${profile.skills.join(", ")}

      Return a JSON object with a key "jobs" containing an array of 3 job recommendations.
      JSON format only:
      {
        "jobs": [
          {
            "title": "Job Title",
            "company": "Company Name",
            "location": "Location",
            "salary": "Range",
            "matchReason": "Brief reason why it matches"
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Cleaning the response in case Gemini wraps it in ```json blocks
    const cleanText = text.replace(/```json|```/g, "").trim();
    
    return JSON.parse(cleanText).jobs || [];
  } catch (err) {
    console.error("❌ Gemini error:", err.message);
    return [];
  }
}