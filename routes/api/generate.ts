import { HandlerContext } from "$fresh/server.ts";
import { load } from "dotenv";

const env = await load();

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
  const { model, prompt } = await req.json();

  try {
    const response = await fetch(`${env.OLLAMA_API_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt }),
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating response:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};