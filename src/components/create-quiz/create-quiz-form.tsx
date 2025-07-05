"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2, Sparkles, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { AiSuggestionDialog } from "./ai-suggestion-dialog";
import { useState } from "react";
import { SuggestQuizQuestionsOutput } from "@/ai/flows/suggest-quiz-questions";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { createQuiz } from "@/app/actions/quiz.actions";


const quizFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().optional(),
  timeLimit: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().positive("Time limit must be a positive number.").optional()
  ),
  questions: z.array(z.object({
    questionText: z.string().min(1, "Question cannot be empty."),
    options: z.array(z.object({
      text: z.string().min(1, "Option cannot be empty.")
    })).min(2, "Must have at least two options."),
    correctAnswerIndex: z.coerce.number().min(0, "Please select a correct answer.")
  })).min(1, "Must have at least one question.")
});

type QuizFormValues = z.infer<typeof quizFormSchema>;
type QuestionSuggestion = SuggestQuizQuestionsOutput['questions'][number];

export function CreateQuizForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: "",
      description: "",
      questions: [
        { questionText: "", options: [{ text: "" }, { text: "" }], correctAnswerIndex: -1 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  async function onSubmit(data: QuizFormValues) {
    setIsSubmitting(true);
    const user = auth.currentUser;
    if (!user) {
        toast({
            variant: "destructive",
            title: "Not Authenticated",
            description: "You must be logged in to create a quiz.",
        });
        setIsSubmitting(false);
        return;
    }
    try {
      await createQuiz(data, user.uid);
      toast({
        title: "Quiz Saved!",
        description: "Your new quiz has been created successfully.",
      });
      router.push('/dashboard');
    } catch (error) {
       console.error(error);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save the quiz. Please try again.",
      });
    } finally {
        setIsSubmitting(false);
    }
  }
  
  const handleAddSuggestedQuestions = (questions: QuestionSuggestion[]) => {
    const currentQuestions = form.getValues('questions');
    const newQuestions = questions.map(q => ({
      questionText: q.questionText,
      options: q.options.map(opt => ({ text: opt })),
      correctAnswerIndex: q.correctAnswerIndex,
    }));

    if (currentQuestions.length === 1 && !currentQuestions[0].questionText) {
      form.setValue('questions', newQuestions, { shouldValidate: true });
    } else {
      form.setValue('questions', [...currentQuestions, ...newQuestions], { shouldValidate: true });
    }
    
    setIsAiDialogOpen(false);
    toast({
      title: "Questions Added",
      description: `${questions.length} question(s) have been added to your quiz.`,
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Ultimate Science Quiz" {...field} disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A brief description of your quiz." {...field} disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="timeLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Limit (in seconds)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 180 for 3 minutes" {...field} disabled={isSubmitting}/>
                    </FormControl>
                     <FormDescription>
                      Leave blank for no time limit.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline">Questions</CardTitle>
                <Button type="button" variant="ghost" onClick={() => setIsAiDialogOpen(true)} disabled={isSubmitting}>
                  <Sparkles className="mr-2 h-4 w-4" /> Suggest with AI
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg relative space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Question {index + 1}</h4>
                    {fields.length > 1 && (
                       <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={isSubmitting}>
                        <Trash2 className="h-4 w-4" />
                       </Button>
                    )}
                  </div>
                  
                  <FormField
                    control={form.control}
                    name={`questions.${index}.questionText`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Text</FormLabel>
                        <FormControl>
                          <Input placeholder="What is the capital of France?" {...field} disabled={isSubmitting}/>
                        </FormControl>
                         <FormMessage />
                      </FormItem>
                    )}
                  />

                  <QuestionOptions nestIndex={index} isSubmitting={isSubmitting} {...{ control: form.control, register: form.register }} />

                  <FormField
                    control={form.control}
                    name={`questions.${index}.correctAnswerIndex`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Mark Correct Answer</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(parseInt(value, 10))}
                            value={field.value?.toString()}
                            className="flex flex-col space-y-1"
                            disabled={isSubmitting}
                          >
                          {(form.watch(`questions.${index}.options`) || []).map((_, optionIndex) => (
                              <FormItem key={optionIndex} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={optionIndex.toString()} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {`Option ${optionIndex + 1}`}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => append({ questionText: "", options: [{ text: "" }, { text: "" }], correctAnswerIndex: -1 })}
                disabled={isSubmitting}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Question
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Quiz
            </Button>
          </div>
        </form>
      </Form>
      <AiSuggestionDialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen} onAddQuestions={handleAddSuggestedQuestions} />
    </>
  );
}

function QuestionOptions({ nestIndex, control, isSubmitting }: { nestIndex: number, control: any, isSubmitting: boolean }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${nestIndex}.options`,
  });

  return (
    <div className="space-y-2">
      <FormLabel>Options</FormLabel>
      {fields.map((item, k) => (
        <div key={item.id} className="flex items-center gap-2">
          <FormField
            control={control}
            name={`questions.${nestIndex}.options.${k}.text`}
            render={({ field }) => (
                <FormControl>
                   <Input {...field} placeholder={`Option ${k + 1}`} disabled={isSubmitting}/>
                </FormControl>
            )}
          />
          {fields.length > 2 && (
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(k)} disabled={isSubmitting}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <FormMessage>
        { (control.getFieldState(`questions.${nestIndex}.options`).error as any)?.message }
      </FormMessage>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="mt-2"
        onClick={() => append({ text: "" })}
        disabled={isSubmitting}
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Add Option
      </Button>
    </div>
  );
}
