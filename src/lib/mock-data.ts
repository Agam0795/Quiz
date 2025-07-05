import type { Quiz } from './types';

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'History of Ancient Rome',
    description: 'Test your knowledge on the rise and fall of the Roman Empire.',
    authorId: 'user1',
    timeLimit: 180,
    createdAt: new Date(),
    questions: [
      {
        questionText: 'Who was the first emperor of Rome?',
        options: [{ text: 'Julius Caesar' }, { text: 'Augustus' }, { text: 'Nero' }, { text: 'Constantine' }],
        correctAnswerIndex: 1,
      },
      {
        questionText: 'In what year did the Western Roman Empire fall?',
        options: [{ text: '476 AD' }, { text: '1453 AD' }, { text: '27 BC' }, { text: '753 BC' }],
        correctAnswerIndex: 0,
      },
      {
        questionText: 'The Punic Wars were fought between Rome and which other power?',
        options: [{ text: 'Greece' }, { text: 'Egypt' }, { text: 'Carthage' }, { text: 'Persia' }],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: '2',
    title: 'World Capitals',
    description: 'How well do you know the capitals of the world?',
    authorId: 'user1',
    createdAt: new Date(),
    questions: [
      {
        questionText: 'What is the capital of Canada?',
        options: [{ text: 'Toronto' }, { text: 'Vancouver' }, { text: 'Ottawa' }, { text: 'Montreal' }],
        correctAnswerIndex: 2,
      },
      {
        questionText: 'What is the capital of Australia?',
        options: [{ text: 'Sydney' }, { text: 'Melbourne' }, { text: 'Canberra' }, { text: 'Perth' }],
        correctAnswerIndex: 2,
      },
    ],
  },
];
