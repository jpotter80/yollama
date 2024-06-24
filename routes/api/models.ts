import { HandlerContext } from "$fresh/server.ts";
import { load } from "dotenv";

const env = await load();

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  try {
    const response = await fetch(`${env.OLLAMA_API_URL}/api/tags`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching models:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch models" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};