require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/aiSuggestTasks", async (req, res) => {
  console.log("📩 Received body:", req.body);

  const { prompt, tasks = [], currentEnergy, availableTime } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "No intention provided" });
  }

  const system = `
You are a helpful assistant that breaks down intentions into a list of concrete subtasks.
- Output only a bullet list of tasks (short phrases).
- Do not include explanations, reasoning, or priority unless explicitly asked.
- Example:
  Input: "Go to Singapore"
  Output:
  - Book flight tickets
  - Reserve a hotel
  - Check travel apps for deals
  - Make a list of places to visit
`;

  const user = `User intention: ${prompt}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.3,
      max_tokens: 400,
    });

    const raw = completion?.choices?.[0]?.message?.content ?? "";

    // Split AI response into lines, strip dashes and empties
    const suggestions = raw
      .split("\n")
      .map(line => line.replace(/^[-•]\s*/, "").trim())
      .filter(line => line.length > 0);

    return res.json({ suggestions });
  } catch (err) {
    console.error("❌ OpenAI error:", err);
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ AI proxy listening on port ${PORT}`));