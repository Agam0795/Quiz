'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit, Loader2, Terminal } from "lucide-react";
import { signInWithGoogle, signInWithEmail, getErrorMessage, shouldShowErrorToUser } from "@/lib/auth";
import { handleAuthError } from "@/lib/auth-error-handler";
import { useToast } from "@/hooks/use-toast";
import { FirebaseError } from "firebase/app";
import { firebaseConfigValid } from "@/lib/firebase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    if (!firebaseConfigValid) return;
    setIsGoogleLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        toast({
          title: "Success!",
          description: "You've successfully signed in.",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      
      // Handle specific error cases
      if (error instanceof Error) {
        if (error.message === 'redirect_initiated') {
          // Redirect was initiated, don't show error
          console.log('Redirect initiated, waiting for result...');
          return;
        }
      }
      
      // Use the enhanced error handling utility
      handleAuthError(error, (message) => {
        toast({
          variant: message.variant || "destructive",
          title: message.title,
          description: message.description,
        });
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseConfigValid || !email || !password) return;
    setIsEmailLoading(true);
    try {
      const user = await signInWithEmail(email, password);
      if (user) {
        toast({
          title: "Success!",
          description: "You've successfully signed in.",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Email Sign-In Error:", error);
      
      // Use the enhanced error handling utility
      handleAuthError(error, (message) => {
        toast({
          variant: message.variant || "destructive",
          title: message.title,
          description: message.description,
        });
      });
    } finally {
      setIsEmailLoading(false);
    }
  };


  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
            <BrainCircuit className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-headline text-center">Sign In to QuizWiz</CardTitle>
        <CardDescription className="text-center">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!firebaseConfigValid && (
           <Alert variant="destructive" className="mb-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Configuration Error</AlertTitle>
            <AlertDescription>
              Firebase is not configured. Please add your project credentials to the <code>.env</code> file and restart the server.
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleEmailSignIn}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!firebaseConfigValid || isEmailLoading || isGoogleLoading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!firebaseConfigValid || isEmailLoading || isGoogleLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={!firebaseConfigValid || isEmailLoading || isGoogleLoading}>
              {isEmailLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
            <Button variant="outline" type="button" className="w-full" onClick={handleGoogleSignIn} disabled={isGoogleLoading || isEmailLoading || !firebaseConfigValid}>
               {isGoogleLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
