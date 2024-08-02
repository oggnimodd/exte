import { Button } from "@nextui-org/react";
import { type FC, useState } from "react";
import browser from "webextension-polyfill";

export const Options: FC = () => {
  const [tabs, setTabs] = useState<browser.Tabs.Tab[]>([]);

  const onPress = async () => {
    const tabs = await browser.tabs.query({});

    setTabs(tabs);
  };

  return (
    <div>
      <Button onPress={onPress} color="primary">
        Hello
      </Button>

      {tabs.map((tab) => (
        <div key={tab.id}>{tab.url}</div>
      ))}
    </div>
  );
};
