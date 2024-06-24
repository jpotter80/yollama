import { useState, useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface Model {
  name: string;
}

export default function OllamaInteraction() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState("");
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    fetchModels();
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
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          prompt: input,
        }),
      });
      
      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
  };

  const handleRegenerate = () => {
    handleSubmit(new Event("submit"));
  };

  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <form onSubmit={handleSubmit} class="space-y-4">
        <select
          value={model}
          onChange={(e) => setModel((e.target as HTMLSelectElement).value)}
          class="w-full p-2 border rounded"
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
          class="w-full p-2 border rounded"
        />
        <div class="flex space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Submit"}
          </Button>
          <Button onClick={handleCopy} disabled={!response}>
            Copy
          </Button>
          <Button onClick={handleRegenerate} disabled={!response || isLoading}>
            Regenerate
          </Button>
        </div>
      </form>
      {response && (
        <div class="mt-4">
          <h3 class="font-semibold">Response:</h3>
          <p class="mt-2 whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}