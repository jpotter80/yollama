# Yollama

Yollama is a web-based user interface for interacting with locally installed Ollama models. It provides an intuitive interface for selecting models, sending prompts, and managing responses.

## Features

- Automatic detection of locally installed Ollama models
- Model selection via dropdown menu
- Text input for prompts
- Display area for model responses
- Copy response functionality
- Regenerate response option

## Tech Stack

- [Deno](https://deno.land/) - A secure runtime for JavaScript and TypeScript
- [Fresh](https://fresh.deno.dev/) - The next-gen web framework for Deno
- [Twind](https://twind.dev/) - The smallest, fastest, most feature complete Tailwind-in-JS solution
- [JSR](https://jsr.io/) - JavaScript Registry for Deno

## Prerequisites

- [Deno](https://deno.land/#installation) v1.44.4 or higher
- [Ollama](https://ollama.ai/) installed and running locally

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/jpotter80/yollama.git
   cd yollama
   ```

2. Create a `.env` file in the project root and add the following:
   ```
   OLLAMA_API_URL=http://localhost:11434
   ```

## Running the Application

1. Start the development server:
   ```
   deno task start
   ```

2. Open your browser and navigate to `http://localhost:8000`

## Usage

1. Select an Ollama model from the dropdown menu
2. Enter your prompt in the text input field
3. Click "Submit" to generate a response
4. Use the copy button to copy the response to your clipboard
5. Use the regenerate button to generate a new response for the same prompt

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

jpotter80 (jpotter80@proton.me)

## Acknowledgments

- [Ollama](https://ollama.com/) for providing the local language model runtime
- [Deno](https://deno.land/) for the secure JavaScript/TypeScript runtime
- [Fresh](https://fresh.deno.dev/) for the web framework
