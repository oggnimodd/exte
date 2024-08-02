import { execSync } from "node:child_process";
import { join } from "node:path";
import chokidar from "chokidar";
import fs from "fs-extra";
import { isDev, port, r } from "./utils";

try {
  require("husky").install();
} catch (e) {
  if (e.code !== "MODULE_NOT_FOUND") throw e;
}

/**
 * Stub index.html to use Vite in development
 */
async function stubIndexHtml() {
  const views = ["options", "popup"];

  for (const view of views) {
    await fs.ensureDir(r(`extension/dist/${view}`));
    let data = await fs.readFile(r(`src/${view}/index.html`), "utf-8");
    data = data
      .replace(
        "</head>",
        '<script type="module" src="/dist/refreshPreamble.js"></script></head>',
      )
      .replace('"./main.tsx"', `"http://localhost:${port}/${view}/main.tsx"`)
      .replace(
        '<div id="app"></div>',
        '<div id="app">Vite server did not start</div>',
      );

    await fs.writeFile(r(`extension/dist/${view}/index.html`), data, "utf-8");

    console.log("stubbed:", view);
  }
}

// This enables hot module reloading
async function writeRefreshPreamble() {
  const data = `
    import RefreshRuntime from "http://localhost:${port}/@react-refresh";
    RefreshRuntime.injectIntoGlobalHook(window);
    window.$RefreshReg$ = () => {};
    window.$RefreshSig$ = () => (type) => type;
    window.__vite_plugin_react_preamble_installed__ = true;
  `;

  await fs.ensureDir(r("extension/dist"));
  await fs.writeFile(
    join(r("extension/dist/"), "refreshPreamble.js"),
    data,
    "utf-8",
  );
}

function writeManifest() {
  execSync("bun run ./scripts/manifest.ts", { stdio: "inherit" });
}

writeManifest();

if (isDev) {
  writeRefreshPreamble();
  stubIndexHtml();
  chokidar.watch(r("src/**/*.html")).on("change", () => {
    stubIndexHtml();
  });
  chokidar.watch([r("manifest.ts"), r("package.json")]).on("change", () => {
    writeManifest();
  });
}
