"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import {
  BriefcaseIcon,
  SunIcon,
  MoonIcon,
  Loader2,
  UserPen,
  FolderOpen,
} from "lucide-react";
import {
  UserButton,
  ClerkLoading,
  ClerkLoaded,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { HeaderLogo } from "./header-logo";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

export function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center ">
              <HeaderLogo />
            </Link>
            <nav className="hidden md:flex ml-6 space-x-4">
              <Link
                href="/jobs"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Find Jobs
              </Link>
              <Link
                href="/companies"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Companies
              </Link>
              <Link
                href="/salaries"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Salaries
              </Link>
              <Link
                href="/resources"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Resources
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <SignedIn>
              <ClerkLoaded>
                <UserButton
                  appearance={{
                    baseTheme: theme === "dark" ? dark : undefined,
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="Applications"
                      href="/applications"
                      labelIcon={<FolderOpen size={15} />}
                    />
                    <UserButton.Link
                      label="Profile"
                      href="/profile"
                      labelIcon={<UserPen size={15} />}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </ClerkLoaded>
              <ClerkLoading>
                <Loader2 className="size-8 animate-spin text-slate-100" />
              </ClerkLoading>
            </SignedIn>
            <SignedOut>
              <div className="flex items-center space-x-4">
                <Button asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
