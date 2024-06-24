import { useState, useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { useSignal } from "@preact/signals";

interface Model {
  name: string;
}

export default function OllamaInteraction() {
  const [input, setInput] = useState("");
  const response = useSignal("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState("");
  const [models, setModels] = useState<Model[]>([]);
  const isDarkMode = useSignal(localStorage.getItem("darkMode") === "true");
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    fetchModels();
    updateDarkMode();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch("/api/models");
      const data = await response.json();
      setModels(data.models);
      if (data.models.length > 0) {
        setModel(data.models[0].name);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    response.value = "";
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          prompt: input,
        }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        response.value += decoder.decode(value);
      }
    } catch (error) {
      console.error("Error:", error);
      response.value = "An error occurred while processing your request.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (e: Event) => {
    e.preventDefault(); // Prevent form submission
    navigator.clipboard.writeText(response.value)
      .then(() => {
        console.log('Text copied to clipboard');
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(""), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        setCopyStatus("Failed to copy");
        setTimeout(() => setCopyStatus(""), 2000);
      });
  };

  const handleRegenerate = () => {
    handleSubmit(new Event("submit"));
  };

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem("darkMode", isDarkMode.value.toString());
    updateDarkMode();
  };

  const updateDarkMode = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <div class="flex justify-end mb-4">
        <Button onClick={toggleDarkMode}>
          {isDarkMode.value ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
      <form onSubmit={handleSubmit} class="space-y-4">
        <select
          value={model}
          onChange={(e) => setModel((e.target as HTMLSelectElement).value)}
          class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
        >
          {models.map((m) => (
            <option key={m.name} value={m.name}>{m.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput((e.target as HTMLInputElement).value)}
          placeholder="Enter your prompt here"
          class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
        />
        <div class="flex space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Submit"}
          </Button>
          <Button onClick={(e) => handleCopy(e)} disabled={!response.value}>
            {copyStatus || "Copy"}
          </Button>
          <Button onClick={handleRegenerate} disabled={!response.value || isLoading}>
            Regenerate
          </Button>
        </div>
      </form>
      {response.value && (
        <div class="mt-4">
          <h3 class="font-semibold dark:text-white">Response:</h3>
          <p class="mt-2 whitespace-pre-wrap dark:text-white">{response.value}</p>
        </div>
      )}
    </div>
  );
}