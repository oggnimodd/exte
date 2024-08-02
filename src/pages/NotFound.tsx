import { Button } from "@nextui-org/react";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full flex-1 justify-center flex-col items-center gap-y-3">
      <AlertTriangle className="text-red-500" size={80} />
      <p className="font-bold">Page not found</p>
      <Button to="/" as={Link} color="primary">
        Back To Home
      </Button>
    </div>
  );
};

export default NotFound;
