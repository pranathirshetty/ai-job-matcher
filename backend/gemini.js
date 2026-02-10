import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  console.error(" GEMINI_API_KEY missing in .env!");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getJobsFromGemini(profile) {
  try {
    const prompt = `
      Recommend 5 jobs for the following profile.
      Name: ${profile.name}
      Skills: ${profile.skills?.join(", ") || "No skills listed"}

      ⚠️ IMPORTANT: Return ONLY valid JSON. No explanations, no code blocks.
      Each job must be a complete JSON object.
      Example format:
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

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        maxOutputTokens: 1200, 
        temperature: 0.0,
      },
    });

    let text = response.text || "";

    text = text.replace(/```json|```/g, "").replace(/\u0000/g, "").trim();

    let jobs = [];
    try {
     
      const match = text.match(/\{[\s\S]*\}/); 
      if (match) {
        const parsed = JSON.parse(match[0]);
        jobs = parsed.jobs || [];
      } else {
        console.warn(" Could not extract JSON, returning empty array");
      }
    } catch (jsonErr) {
      console.error(" JSON parse error:", jsonErr.message);
      console.log("Raw text was:", text);
    }

    return jobs;

  } catch (err) {
    console.error(" Gemini API error:", err.message);
    return [];
  }
}
