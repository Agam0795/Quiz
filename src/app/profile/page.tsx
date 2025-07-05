'use client';

import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockQuizzes } from '@/lib/mock-data';
import { QuizList } from '@/components/dashboard/quiz-list';
import { redirect } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { firebaseConfigValid } from '@/lib/firebase';

export default function ProfilePage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!firebaseConfigValid) {
        setIsLoading(false);
        redirect('/sign-in');
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        redirect('/sign-in');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  if (isLoading) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto py-12 px-4">
                 <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                    <Skeleton className="h-32 w-32 rounded-full" />
                    <div className="space-y-2 text-center md:text-left pt-4">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-6 w-64" />
                        <div className="flex gap-2 pt-2 justify-center md:justify-start">
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                    </div>
                </div>
                <Skeleton className="h-10 w-40 mb-8" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </main>
            <Footer />
        </div>
    );
  }

  if (!user) {
    // This case is handled by the redirect, but as a fallback
    return null;
  }
  
  // In a real app, user quizzes would be fetched from a database
  const userQuizzes = mockQuizzes.filter(quiz => quiz.authorId === 'user1'); // Using mock 'user1' for demo

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} className="border-4 border-primary rounded-full" />
            <AvatarFallback className="text-5xl">{user.displayName?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-center md:text-left pt-4">
            <h1 className="text-4xl font-bold font-headline">{user.displayName}</h1>
            <p className="text-lg text-muted-foreground">{user.email}</p>
            <div className="flex gap-2 pt-2 justify-center md:justify-start">
              <Badge variant="secondary">Quiz Creator</Badge>
              {user.metadata.creationTime && (
                 <Badge variant="outline">Joined {new Date(user.metadata.creationTime).toLocaleDateString()}</Badge>
              )}
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold font-headline mb-8">My Quizzes</h2>
        <QuizList quizzes={userQuizzes} />

      </main>
      <Footer />
    </div>
  );
}
