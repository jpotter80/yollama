// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_generate from "./routes/api/generate.ts";
import * as $api_models from "./routes/api/models.ts";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $OllamaInteraction from "./islands/OllamaInteraction.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/generate.ts": $api_generate,
    "./routes/api/models.ts": $api_models,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
    "./islands/OllamaInteraction.tsx": $OllamaInteraction,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
