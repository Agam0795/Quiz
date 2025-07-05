import Link from "next/link";
import { GraduationCap, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg font-headline">QuizWiz</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creating engaging quizzes made simple. Empower learning through interactive experiences.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="font-semibold text-sm">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/create-quiz" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Create Quiz
              </Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Analytics
              </Link>
            </nav>
          </div>
          
          {/* Resources */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="font-semibold text-sm">Resources</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
            </nav>
          </div>
          
          {/* Legal */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="font-semibold text-sm">Legal</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} QuizWiz. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for educators worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
