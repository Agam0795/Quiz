"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Quiz } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ArrowLeft, ArrowRight, Award, Timer, FileText, Volume2, Loader2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { textToSpeech } from "@/ai/flows/text-to-speech-flow";
import { useToast } from "@/hooks/use-toast";

interface QuizPlayerProps {
  quiz: Quiz;
}

export function QuizPlayer({ quiz }: QuizPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(quiz.questions.length).fill(null)
  );
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | undefined>(quiz.timeLimit);
  const [user, setUser] = useState<User | null>(null);
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleSubmit = useCallback(() => {
    setIsFinished(true);
  }, []);

  useEffect(() => {
    if (!quiz.timeLimit || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === undefined || prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, quiz.timeLimit, handleSubmit]);
  
  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = parseInt(value, 10);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAudioSrc(null);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAudioSrc(null);
    }
  };

  const score = answers.reduce((total, answer, index) => {
    return answer === quiz.questions[index].correctAnswerIndex ? total + 1 : total;
  }, 0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleReadAloud = async () => {
    if (!currentQuestion.questionText) return;
    setIsTtsLoading(true);
    setAudioSrc(null);
    try {
      const result = await textToSpeech(currentQuestion.questionText);
      setAudioSrc(result.audioDataUri);
    } catch (error) {
      console.error("Text-to-speech error:", error);
      toast({
        variant: "destructive",
        title: "Audio Error",
        description: "Failed to generate audio for the question. Please try again.",
      });
    } finally {
      setIsTtsLoading(false);
    }
  };

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [audioSrc]);

  const handleDownloadCertificate = () => {
    const userName = user?.displayName ?? "Anonymous Taker";
    const completionDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const primaryColor = 'hsl(207, 70%, 53%)';
    const accentColor = 'hsl(45, 87%, 50%)';
    const darkForegroundColor = 'hsl(240, 10%, 3.9%)';
    const mutedForegroundColor = 'hsl(240, 3.8%, 46.1%)';

    const certificateSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" style="background-color: #ffffff;">
    <defs>
        <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Poppins:wght@500;700&family=Caveat:wght@700&display=swap');
        </style>
    </defs>
    <rect x="20" y="20" width="760" height="560" fill="none" stroke="${primaryColor}" stroke-width="8" rx="10" />
    <rect x="30" y="30" width="740" height="540" fill="none" stroke="${accentColor}" stroke-width="2" rx="5" />
    
    <text x="400" y="100" text-anchor="middle" style="font-family: 'Poppins', sans-serif; font-size: 32px; font-weight: 700; fill: ${darkForegroundColor};">Certificate of Completion</text>
    
    <text x="400" y="160" text-anchor="middle" style="font-family: 'Inter', sans-serif; font-size: 18px; fill: ${mutedForegroundColor};">This certificate is proudly presented to</text>
    
    <text x="400" y="240" text-anchor="middle" style="font-family: 'Inter', sans-serif; font-size: 48px; font-weight: 700; fill: ${primaryColor};">${userName}</text>
    
    <text x="400" y="300" text-anchor="middle" style="font-family: 'Inter', sans-serif; font-size: 18px; fill: ${mutedForegroundColor};">for successfully completing the quiz</text>
    
    <text x="400" y="350" text-anchor="middle" style="font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 500; fill: ${darkForegroundColor};">"${quiz.title}"</text>
    
    <text x="400" y="420" text-anchor="middle" style="font-family: 'Inter', sans-serif; font-size: 18px; fill: ${mutedForegroundColor};">with a score of</text>
    <text x="400" y="450" text-anchor="middle" style="font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 700; fill: ${darkForegroundColor};">${score} out of ${quiz.questions.length}</text>
    
    <text x="250" y="500" text-anchor="middle" style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 500; fill: ${darkForegroundColor};">${completionDate}</text>
    <line x1="150" y1="520" x2="350" y2="520" stroke="${mutedForegroundColor}" stroke-width="1"/>
    <text x="250" y="540" text-anchor="middle" style="font-family: 'Inter', sans-serif; font-size: 14px; fill: ${mutedForegroundColor};">Date</text>
    
    <text x="550" y="505" text-anchor="middle" style="font-family: 'Caveat', cursive; font-size: 36px; fill: ${darkForegroundColor};">QuizWiz</text>
    <line x1="450" y1="520" x2="650" y2="520" stroke="${mutedForegroundColor}" stroke-width="1"/>
    <text x="550" y="540" text-anchor="middle" style="font-family: 'Inter', sans-serif; font-size: 14px; fill: ${mutedForegroundColor};">Signature</text>
</svg>
    `;
    
    const dataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(certificateSvg)));
    window.open(dataUrl);
  };

  if (isFinished) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="items-center">
            <Award className="h-16 w-16 text-accent mb-4"/>
          <CardTitle className="text-3xl font-bold font-headline">Quiz Completed!</CardTitle>
          <CardDescription>You've finished the quiz. Here are your results.</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-4xl font-bold">You scored {score} out of {quiz.questions.length}</p>
          <div className="space-y-4">
            {quiz.questions.map((q, i) => (
              <div key={`${quiz.id}-q-${i}`} className="p-3 border rounded-md text-left">
                <p className="font-semibold">{i+1}. {q.questionText}</p>
                <p className={`flex items-center mt-2 ${answers[i] === q.correctAnswerIndex ? 'text-green-600' : 'text-red-600'}`}>
                   {answers[i] === q.correctAnswerIndex ? <CheckCircle2 className="h-4 w-4 mr-2"/> : <XCircle className="h-4 w-4 mr-2"/>}
                  Your answer: {answers[i] !== null ? q.options[answers[i] as number].text : 'Not answered'}
                </p>
                {answers[i] !== q.correctAnswerIndex && (
                    <p className="flex items-center mt-1 text-green-600">
                        <CheckCircle2 className="h-4 w-4 mr-2"/>
                        Correct answer: {q.options[q.correctAnswerIndex].text}
                    </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => {
                setIsFinished(false); 
                setAnswers(Array(quiz.questions.length).fill(null)); 
                setCurrentQuestionIndex(0);
                setTimeLeft(quiz.timeLimit);
                setAudioSrc(null);
              }}>
                  Retake Quiz
              </Button>
              <Button variant="outline" asChild>
                  <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
              <Button variant="secondary" onClick={handleDownloadCertificate} disabled={!user}>
                  <FileText className="mr-2 h-4 w-4" /> Download Certificate
              </Button>
            </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center gap-4 mb-4">
          <Progress value={progress} className="w-full" />
          {quiz.timeLimit && timeLeft !== undefined && (
            <div className="flex items-center text-sm font-semibold text-muted-foreground shrink-0">
              <Timer className="h-4 w-4 mr-1.5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
        <CardTitle className="text-2xl font-bold font-headline">{quiz.title}</CardTitle>
        <CardDescription>Question {currentQuestionIndex + 1} of {quiz.questions.length}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">{currentQuestion.questionText}</h2>
          <Button variant="ghost" size="icon" onClick={handleReadAloud} disabled={isTtsLoading}>
              {isTtsLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
              <span className="sr-only">Read question aloud</span>
          </Button>
        </div>
        {audioSrc && <audio ref={audioRef} src={audioSrc} hidden />}
        <RadioGroup
          value={answers[currentQuestionIndex]?.toString()}
          onValueChange={handleAnswerChange}
          className="space-y-2"
        >
          {currentQuestion.options.map((option, index) => {
            const optionId = `${quiz.id}-q-${currentQuestionIndex}-o-${index}`;
            return (
              <Label
                key={optionId}
                htmlFor={optionId}
                className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-accent/20 has-[[data-state=checked]]:bg-accent/40"
              >
                <RadioGroupItem value={index.toString()} id={optionId} className="mr-4" />
                {option.text}
              </Label>
            )
          })}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        {currentQuestionIndex === quiz.questions.length - 1 ? (
          <Button onClick={handleSubmit} disabled={answers[currentQuestionIndex] === null}>
            Submit Quiz
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={answers[currentQuestionIndex] === null}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
