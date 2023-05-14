import { openai } from "../../open-ai";

export const POST = async (req) => {
  const body = await req.json();
  try {
    const { prompt } = body;
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      stream: false,
      n: 1,
    });
    return new Response(res.data.choices[0].message.content);
  } catch (error) {
    return new Response("Request cannot be processed!", {
      status: 400,
    });
  }
};
