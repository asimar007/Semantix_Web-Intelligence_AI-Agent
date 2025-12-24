import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import ThemeToggle from "../theme-toggle";

const Navbar = () => {
  return (
    <nav className="fixed z-10 top-6 inset-x-4 h-14 sm:h-16 bg-background/50 backdrop-blur-sm border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="github.com/asimar007" target="_blank">
            <Button className="hidden rounded-full sm:inline-flex cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
