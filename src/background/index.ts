import { isDev } from "scripts/utils";
import browser from "webextension-polyfill";

if (isDev) {
  const ws = new WebSocket("ws://localhost:8989");

  ws.onmessage = (event) => {
    console.log(event);
    const message = JSON.parse(event.data);

    if (message.type === "reload") {
      browser.runtime.reload();
    }
  };

  ws.onerror = (err) => {
    console.error(err);
  };
}

browser.runtime.onMessage.addListener(async (message) => {
  if (message.type === "hello") {
    browser.tabs.create({ url: "https://www.github.com" });
  }

  if (message.type === "reload") {
    browser.runtime.reload();
  }

  if (message.type === "tabs") {
    const tabs = await browser.tabs.query({});

    return tabs;
  }
});
