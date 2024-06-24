import { Head } from "$fresh/runtime.ts";
import OllamaInteraction from "../islands/OllamaInteraction.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Yollama</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-4xl font-bold">Yollama</h1>
        <p class="my-6">
          Welcome to Yollama, your interface for Ollama models.
        </p>
        <OllamaInteraction />
      </div>
    </>
  );
}