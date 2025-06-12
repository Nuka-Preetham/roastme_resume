export default async function handler(req, res) {
  const { prompt } = req.body;

  const completion = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a sarcastic career coach who roasts resumes with humor." },
        { role: "user", content: prompt }
      ],
      temperature: 0.9,
    }),
  });

  const data = await completion.json();
  res.status(200).json({ roast: data.choices[0].message.content });
}
