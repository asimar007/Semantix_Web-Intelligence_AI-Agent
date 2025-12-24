import Link from "next/link";
import { Logo } from "./navbar/logo";
import ThemeToggle from "./theme-toggle";

export function SimpleHeader() {
  return (
    <nav className="fixed z-10 top-6 inset-x-4 h-14 sm:h-16 bg-background/50 backdrop-blur-sm border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Link href="/">
          <Logo />
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
