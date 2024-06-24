import { Head } from "$fresh/runtime.ts";
import OllamaInteraction from "../islands/OllamaInteraction.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Yollama</title>
        <script dangerouslySetInnerHTML={{__html: `
          if (localStorage.getItem('darkMode') === 'true') {
            document.documentElement.classList.add('dark');
          }
        `}} />
      </Head>
      <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div class="p-4 mx-auto max-w-screen-md">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">Yollama</h1>
          <p class="my-6 text-gray-600 dark:text-gray-300">
            Welcome to Yollama, your interface for Ollama models.
          </p>
          <OllamaInteraction />
        </div>
      </div>
    </>
  );
}