import { Button } from "@nextui-org/react";
import { Counter } from "components";
import { useDarkMode } from "hooks";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { toggleTheme, isDark } = useDarkMode();

  return (
    <div className="flex flex-col">
      <div className="self-end flex p-4 gap-3">
        <Link to="/404">Go to 404</Link>
        <Button
          isIconOnly
          onClick={toggleTheme}
          startContent={isDark ? <Sun /> : <Moon />}
        />
      </div>
      <Counter />
    </div>
  );
};

export default Home;
