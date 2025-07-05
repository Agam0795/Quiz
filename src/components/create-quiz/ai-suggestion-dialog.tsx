"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { suggestQuizQuestions, SuggestQuizQuestionsOutput } from "@/ai/flows/suggest-quiz-questions";
import { Loader2, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const suggestionSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters long."),
});

type SuggestionFormValues = z.infer<typeof suggestionSchema>;
type QuestionSuggestion = SuggestQuizQuestionsOutput['questions'][number];


interface AiSuggestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddQuestions: (questions: QuestionSuggestion[]) => void;
}

export function AiSuggestionDialog({ open, onOpenChange, onAddQuestions }: AiSuggestionDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<QuestionSuggestion[]>([]);

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: { topic: "" },
  });

  const onSubmit = async (data: SuggestionFormValues) => {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await suggestQuizQuestions({ topic: data.topic });
      setSuggestions(result.questions);
    } catch (error) {
      console.error("AI suggestion error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get suggestions. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    if (suggestions.length > 0) {
      onAddQuestions(suggestions);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-accent" />
            AI Question Generator
          </DialogTitle>
          <DialogDescription>
            Enter a topic, and we'll generate some questions, options, and answers for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Solar System" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Questions
            </Button>
          </form>
        </Form>
        {suggestions.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold">Suggested Questions:</h4>
            <ScrollArea className="h-40 w-full rounded-md border p-4">
              <ul className="space-y-2">
                {suggestions.map((q, i) => (
                  <li key={i} className="text-sm">{q.questionText}</li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="button" onClick={handleAddClick} disabled={suggestions.length === 0}>
            Add to Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
