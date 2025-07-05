'use server';
/**
 * @fileOverview Provides AI-powered question suggestions for quiz creation.
 *
 * - suggestQuizQuestions - A function that generates quiz questions based on a given topic.
 * - SuggestQuizQuestionsInput - The input type for the suggestQuizQuestions function.
 * - SuggestQuizQuestionsOutput - The return type for the suggestQuizQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestQuizQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic or category for which to generate quiz questions.'),
});
export type SuggestQuizQuestionsInput = z.infer<typeof SuggestQuizQuestionsInputSchema>;

const GeneratedQuestionSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).length(4).describe('An array of 4 possible answers/options for the question.'),
  correctAnswerIndex: z.number().min(0).max(3).describe('The 0-based index of the correct answer in the options array.')
});


const SuggestQuizQuestionsOutputSchema = z.object({
  questions: z
    .array(GeneratedQuestionSchema)
    .describe('An array of 5 suggested quiz questions, each with 4 options and a correct answer.'),
  reasoning: z
    .string()
    .describe(
      'A brief reasoning for why these questions are good for the topic.'
    ),
});
export type SuggestQuizQuestionsOutput = z.infer<typeof SuggestQuizQuestionsOutputSchema>;

export async function suggestQuizQuestions(input: SuggestQuizQuestionsInput): Promise<SuggestQuizQuestionsOutput> {
  return suggestQuizQuestionsFlow(input);
}

const questionSuggestionPrompt = ai.definePrompt({
  name: 'questionSuggestionPrompt',
  input: {schema: SuggestQuizQuestionsInputSchema},
  output: {schema: SuggestQuizQuestionsOutputSchema},
  prompt: `You are an AI assistant designed to help quiz creators generate engaging and relevant quiz questions.

  Based on the provided topic, generate a list of 5 complete multiple-choice quiz questions. Each question must have exactly 4 options. You must also specify the correct answer for each question.

  Also provide a brief reasoning for why this set of questions is a good starting point for a quiz on this topic.

  Topic: {{{topic}}}`,
});

const suggestQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'suggestQuizQuestionsFlow',
    inputSchema: SuggestQuizQuestionsInputSchema,
    outputSchema: SuggestQuizQuestionsOutputSchema,
  },
  async input => {
    const {output} = await questionSuggestionPrompt(input);
    return output!;
  }
);
