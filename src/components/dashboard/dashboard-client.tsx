
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload, Download, Loader2 } from "lucide-react";
import { QuizList } from "./quiz-list";
import { useToast } from "@/hooks/use-toast";
import { Quiz } from "@/lib/types";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getQuizzesByAuthor, deleteQuiz } from "@/app/actions/quiz.actions";
import { Skeleton } from "@/components/ui/skeleton";


export function DashboardClient() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);
          if (currentUser) {
              setIsLoading(true);
              try {
                  const userQuizzes = await getQuizzesByAuthor(currentUser.uid);
                  setQuizzes(userQuizzes);
              } catch (error) {
                  console.error(error);
                  toast({ variant: "destructive", title: "Error", description: "Could not fetch your quizzes." });
              } finally {
                  setIsLoading(false);
              }
          } else {
              setQuizzes([]);
              setIsLoading(false);
          }
      });
      return () => unsubscribe();
  }, [toast]);


  const handleDelete = async (quizId: string) => {
    if (!user) {
        toast({ variant: "destructive", title: "Not Authenticated" });
        return;
    }

    const originalQuizzes = quizzes;
    setQuizzes(quizzes.filter(q => q.id !== quizId));

    try {
        await deleteQuiz(quizId, user.uid);
        toast({
          title: "Quiz Deleted",
          description: "The quiz has been successfully deleted.",
        })
    } catch(error) {
        setQuizzes(originalQuizzes);
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error deleting quiz",
          description: "Could not delete the quiz. Please try again.",
        });
    }
  };

  const handleExport = () => {
    if (quizzes.length === 0) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "There are no quizzes to export.",
      });
      return;
    }
    const jsonString = JSON.stringify(quizzes, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quizzes-export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
        title: "Export Successful",
        description: "Your quizzes have been exported to quizzes-export.json.",
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error("File could not be read");
        const importedQuizzes = JSON.parse(text) as Quiz[];
        
        if (!Array.isArray(importedQuizzes) || importedQuizzes.some(q => !q.id || !q.title || !q.questions)) {
            throw new Error("Invalid quiz file format. Please ensure it's an array of quizzes.");
        }
        
        // This should be adapted to save imported quizzes to the database
        // For now, it just adds to local state.
        setQuizzes(prevQuizzes => [...prevQuizzes, ...importedQuizzes]);
        toast({
            title: "Import Successful",
            description: `${importedQuizzes.length} quizzes have been imported. Note: Imported quizzes are not saved to your account.`,
        });
      } catch (error) {
        console.error("Import error:", error);
        toast({
            variant: "destructive",
            title: "Import Failed",
            description: error instanceof Error ? error.message : "An unknown error occurred.",
        });
      } finally {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
      }
    };
    reader.readAsText(file);
  };


  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold font-headline">My Quizzes</h1>
          <p className="text-muted-foreground mt-2">Manage, share, and view your quizzes.</p>
        </div>
        <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleImportClick}>
                <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" /> Export All
            </Button>
            <Button asChild>
                <Link href="/create-quiz">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Quiz
                </Link>
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
            />
        </div>
      </div>
       {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
      ) : (
        <QuizList quizzes={quizzes} onDelete={handleDelete} />
      )}
    </>
  );
}
