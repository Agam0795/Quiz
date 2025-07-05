"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Quiz } from "@/lib/types";
import { Copy } from "lucide-react";

interface ShareQuizDialogProps {
  quiz: Quiz | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareQuizDialog({ quiz, open, onOpenChange }: ShareQuizDialogProps) {
  const { toast } = useToast();
  const [quizUrl, setQuizUrl] = useState("");

  useEffect(() => {
    if (quiz && typeof window !== 'undefined') {
      const url = `${window.location.origin}/quiz/${quiz.id}`;
      setQuizUrl(url);
    }
  }, [quiz]);


  const handleCopy = () => {
    navigator.clipboard.writeText(quizUrl);
    toast({
      title: "Copied to clipboard!",
      description: "The quiz link has been copied.",
    });
  };

  if (!quiz) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Share Quiz</DialogTitle>
          <DialogDescription>
            Anyone with this link can view and take this quiz.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={quizUrl}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
