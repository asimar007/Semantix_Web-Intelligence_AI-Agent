import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="dark:border-t mt-40 dark bg-background text-foreground">
      <div className="max-w-screen-xl mx-auto">
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground text-center sm:text-start">
            <Link href="/" target="_blank">
              Built with ❤️ by Asim
            </Link>
          </span>

          <div className="flex items-center gap-5 text-muted-foreground">
            <Link href="https://x.com/asim_ar007" target="_blank">
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/asimar007/Semantix_Web-Intelligence_AI-Agent"
              target="_blank"
            >
              <GithubIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
