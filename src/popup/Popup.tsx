import { Button } from "@nextui-org/react";
import type { FC } from "react";
import browser from "webextension-polyfill";

export const Popup: FC = () => {
  const onPress = async () => {
    // Send message to background
    await browser.runtime.sendMessage({
      type: "hello",
    });
  };
  return (
    <div>
      <Button onPress={onPress} color="primary">
        Popup
      </Button>
    </div>
  );
};
