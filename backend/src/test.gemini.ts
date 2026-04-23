import dotenv from "dotenv";
dotenv.config();

async function test() {
  try {
    const res = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: "Say hello" }]
            }
          ]
        })
      }
    );

    const data = await res.json();

    console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("RESULT:", text);
  } catch (error) {
    console.error("ERROR:", error);
  }
}

test();