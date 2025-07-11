import fs from "node:fs/promises";
import express from "express";
import { Transform } from "node:stream";
import { createRequire } from "node:module";
import React from "react";

const require = createRequire(import.meta.url);
global.require = require;

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";
const ABORT_DELAY = 10000;

const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";

const app = express();

/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

app.get("/client", async (req, res) => {
  let template;
  if (!isProduction) {
    template = await fs.readFile("./index.html", "utf-8");
    template = await vite.transformIndexHtml(req.url, template);
  } else {
    template = templateHtml;
  }

  res.status(200).set({ "Content-Type": "text/html" }).end(template);
});

app.get("/server", async (req, res) => {
  let template, render;

  if (!isProduction) {
    template = await fs.readFile("./index.html", "utf-8");
    template = template.replace(
      /<script\s+type="module"\s+src="\/src\/entry-client\.tsx"><\/script>/,
      ""
    );
    template = await vite.transformIndexHtml(req.url, template);
    render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
  } else {
    template = templateHtml;
    render = (await import("./dist/server/entry-server.js")).render;
  }

  let didError = false;

  const initialData = "Server data";
  const serverComponents = {
    button: React.createElement("button", null, "Server Button"),
    button2: React.createElement("button", null, "Server Button 2"),
  };
  const remoteComponents = {
    remoteButton: null,
  };

  const { pipe, abort } = render(req.url, {
    initialData,
    serverComponents,
    remoteComponents,
    onShellReady() {
      res.status(didError ? 500 : 200);
      res.set({ "Content-Type": "text/html" });

      const [htmlStart, htmlEnd] = template.split("<!--app-html-->");
      res.write(htmlStart);

      const stream = new Transform({
        transform(chunk, encoding, callback) {
          res.write(chunk, encoding);
          callback();
        },
      });

      stream.on("finish", () => {
        res.end(htmlEnd);
      });

      pipe(stream);
    },
    onShellError() {
      res.status(500).set({ "Content-Type": "text/html" }).end("SSR Error");
    },
    onError(err) {
      didError = true;
      console.error("SSR render error:", err);
    },
  });

  setTimeout(() => abort(), ABORT_DELAY);
});

app.get("*all", (req, res) => {
  res.status(500);
  res.set({ "Content-Type": "text/html" });
  res.send("<h1>undefined url link</h1>");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
