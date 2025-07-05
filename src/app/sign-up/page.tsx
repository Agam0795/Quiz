'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit, Loader2, Terminal } from "lucide-react";
import { signInWithGoogle, signUpWithEmail, getErrorMessage, shouldShowErrorToUser } from "@/lib/auth";
import { handleAuthError } from "@/lib/auth-error-handler";
import { useToast } from "@/hooks/use-toast";
import { FirebaseError } from "firebase/app";
import { firebaseConfigValid } from "@/lib/firebase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignUp = async () => {
    if (!firebaseConfigValid) return;
    setIsGoogleLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        toast({
          title: "Success!",
          description: "You've successfully signed up.",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Google Sign-Up Error:", error);
      
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

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseConfigValid) return;
    if (!name || !email || !password) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill out all fields.",
      });
      return;
    }
    setIsEmailLoading(true);
    try {
      const user = await signUpWithEmail(name, email, password);
      if (user) {
        toast({
          title: "Success!",
          description: "You've successfully created an account.",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Email Sign-Up Error:", error);
      
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
        <CardTitle className="text-2xl font-headline text-center">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Enter your information to create an account
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
        <form onSubmit={handleEmailSignUp}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Name</Label>
              <Input 
                id="first-name" 
                placeholder="Max" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!firebaseConfigValid || isEmailLoading || isGoogleLoading} 
              />
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!firebaseConfigValid || isEmailLoading || isGoogleLoading} />
            </div>
            <Button type="submit" className="w-full" disabled={!firebaseConfigValid || isEmailLoading || isGoogleLoading}>
               {isEmailLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create an account
            </Button>
            <Button variant="outline" type="button" className="w-full" onClick={handleGoogleSignUp} disabled={isGoogleLoading || isEmailLoading || !firebaseConfigValid}>
              {isGoogleLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign up with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
