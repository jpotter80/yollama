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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            for (const line of lines) {
              if (line.trim() !== '') {
                try {
                  const parsedLine = JSON.parse(line);
                  if (parsedLine.response) {
                    controller.enqueue(new TextEncoder().encode(parsedLine.response));
                  }
                } catch (e) {
                  console.error("Error parsing JSON:", e);
                }
              }
            }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error generating response:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};