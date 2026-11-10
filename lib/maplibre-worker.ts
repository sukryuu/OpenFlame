import { setWorkerUrl } from "maplibre-gl";

const workerUrl = new URL(
  "maplibre-gl/dist/maplibre-gl-worker.mjs",
  import.meta.url,
).toString();

setWorkerUrl(workerUrl);
