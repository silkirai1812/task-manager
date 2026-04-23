import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY as string
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});
export const suggestPriorityAI = async (description: string) => {
  const prompt = `
  Classify the task priority as low, medium, or high.
  Only return one word.

  Task: ${description}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim().toLowerCase();
};

export const generateSummaryAI = async (description: string) => {
  const prompt = `
  Summarize this task in one short sentence (max 8 words).

  Task: ${description}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
};