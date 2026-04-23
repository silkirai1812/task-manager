import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

// PRIORITY
export const suggestPriorityAI = async (description: string) => {
  try {
    if (!groq) return "medium";

    if (!description || description.trim().length < 5) return "medium";

    const res = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Classify this task priority as low, medium, or high. Only return one word.

Task: ${description}`
        }
      ],
    });

    const output = res.choices[0]?.message?.content?.toLowerCase() || "medium";

    if (output.includes("high")) return "high";
    if (output.includes("medium")) return "medium";
    return "low";

  } catch (error) {
    console.error("Groq priority error:", error);
    return "medium";
  }
};

// SUMMARY
export const generateSummaryAI = async (description: string) => {
  try {
    if (!groq) return "";

    if (!description || description.trim().length < 5) return "";

    const res = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `You are a task management assistant. Summarize the following task description in exactly one short sentence. Always return a sentence, even if the description is brief.

Task description: ${description}

Summary:`
        }
      ],
    });

    return res.choices[0]?.message?.content || "";

  } catch (error) {
    console.error("Groq summary error:", error);
    return "";
  }
};