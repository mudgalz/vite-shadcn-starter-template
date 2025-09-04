import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-accent py-2 flex justify-between px-10">
      <h1 className="text-2xl font-semibold">Starter</h1>
      <nav className="flex gap-2">
        <Link to={"/"} tabIndex={-1}>
          <Button variant={"ghost"}>Home</Button>
        </Link>
        <Link to={"/about"} tabIndex={-1}>
          <Button variant={"ghost"}>About</Button>
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
