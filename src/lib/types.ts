export interface QuizOption {
  text: string;
}

export interface QuizQuestion {
  questionText: string;
  options: QuizOption[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  authorId: string;
  timeLimit?: number;
  createdAt: Date;
}
