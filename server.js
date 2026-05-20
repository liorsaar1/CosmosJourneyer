import path from "path";
import { fileURLToPath } from "url";

import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Required by Babylon.js Havok physics (SharedArrayBuffer multi-threaded mode).
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

app.use(
    express.static(path.join(__dirname, "dist"), {
        index: "index.html",
        maxAge: "1y",
        etag: true,
    }),
);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log(`CosmosJourneyer serving on port ${PORT}`));
