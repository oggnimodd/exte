import { isDev } from "scripts/utils";
import browser from "webextension-polyfill";

if (isDev) {
  const ws = new WebSocket("ws://localhost:8990");

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === "reload") {
      // The if statement is to avoid 'Extension context invalidated' error
      // One call of this sendMessage is enough to do the HMR
      // But since we are reloading the runtime,
      // some content scripts will send the message when the context is already invalidated
      if (browser.runtime?.id) {
        browser.runtime.sendMessage({ type: "reload" });
      }
      window.location.reload();
    }
  };
}

const getTabs = async () => {
  const tabs = await browser.runtime.sendMessage({ type: "tabs" });

  return tabs;
};

getTabs().then((data: browser.Tabs.Tab[]) => {
  data.forEach((tab) => {
    console.log(tab.url);
  });
});

console.log("hahahihi");
