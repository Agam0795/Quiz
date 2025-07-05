"use client";

import Link from "next/link";
import { BrainCircuit, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";

const navLinks = [
  { href: "/create-quiz", label: "Create Quiz" },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/help", label: "Help" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <span className="hidden font-bold sm:inline-block font-headline">
                QuizWiz
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === link.href ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  {link.label}
                </Link>
              ))}
               <Link
                  href="/dashboard"
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  Dashboard
                </Link>
                <Link
                  href="/analysis"
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/analysis" ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  Analysis
                </Link>
            </nav>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link
                href="/"
                className="flex items-center"
              >
                <BrainCircuit className="mr-2 h-6 w-6 text-primary" />
                <span className="font-bold font-headline">QuizWiz</span>
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                   <Link href="/dashboard">Dashboard</Link>
                   <Link href="/analysis">Analysis</Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center space-x-2 md:hidden">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">
                QuizWiz
              </span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
           <UserNav />
        </div>
      </div>
    </header>
  );
}
