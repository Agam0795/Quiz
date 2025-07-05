
"use client";

import { useState } from "react";
import Link from "next/link";
import { Quiz } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Edit, Trash2, Eye } from "lucide-react";
import { ShareQuizDialog } from "./share-quiz-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface QuizListProps {
  quizzes: Quiz[];
  onDelete: (quizId: string) => void;
}

export function QuizList({ quizzes, onDelete }: QuizListProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const openShareDialog = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };

  const closeShareDialog = () => {
    setSelectedQuiz(null);
  };

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <h2 className="text-2xl font-semibold font-headline">No Quizzes Yet!</h2>
        <p className="text-muted-foreground mt-2">
          Click "Create Quiz" or "Import" to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="font-headline">{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {quiz.questions.length} questions
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/quiz/${quiz.id}`}><Eye className="mr-2 h-4 w-4" /> View</Link>
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openShareDialog(quiz)}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Link href={`/create-quiz?edit=${quiz.id}`}>
                        <Edit className="h-4 w-4" />
                    </Link>
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your quiz.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(quiz.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedQuiz && (
        <ShareQuizDialog
          quiz={selectedQuiz}
          open={!!selectedQuiz}
          onOpenChange={closeShareDialog}
        />
      )}
    </>
  );
}
