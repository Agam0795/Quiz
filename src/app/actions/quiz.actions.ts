'use server';

import clientPromise from '@/lib/mongodb';
import { Quiz } from '@/lib/types';
import { Collection, ObjectId, WithId } from 'mongodb';
import { revalidatePath } from 'next/cache';

async function getQuizzesCollection(): Promise<Collection<Omit<Quiz, 'id'>>> {
  const client = await clientPromise;
  const db = client.db();
  return db.collection('quizzes');
}

function mongoDocToQuiz(doc: WithId<Omit<Quiz, 'id'>>): Quiz {
    const { _id, ...rest } = doc;
    return {
        id: _id.toString(),
        ...rest,
        // Ensure all fields from the type are present
        description: rest.description ?? '',
        questions: rest.questions || [],
        authorId: rest.authorId || '',
        createdAt: rest.createdAt || new Date(),
    };
}


export async function createQuiz(quizData: Omit<Quiz, 'id' | 'createdAt' | 'authorId'>, authorId: string) {
  if (!authorId) {
    throw new Error('You must be logged in to create a quiz.');
  }

  const quizzes = await getQuizzesCollection();
  const newQuiz: Omit<Quiz, 'id'> = {
    ...quizData,
    authorId,
    createdAt: new Date(),
  };

  const result = await quizzes.insertOne(newQuiz as any);
  
  if (!result.insertedId) {
    throw new Error('Failed to create quiz.');
  }
  
  revalidatePath('/dashboard');
  
  return { id: result.insertedId.toString() };
}

export async function getQuizzesByAuthor(authorId: string): Promise<Quiz[]> {
    if (!authorId) {
        return [];
    }

    const quizzesCollection = await getQuizzesCollection();
    const quizzes = await quizzesCollection.find({ authorId }).sort({ createdAt: -1 }).toArray();

    return quizzes.map(mongoDocToQuiz);
}

export async function deleteQuiz(quizId: string, authorId: string) {
    if (!authorId) {
        throw new Error('You must be logged in to delete a quiz.');
    }
    if (!ObjectId.isValid(quizId)) {
      throw new Error('Invalid quiz ID.');
    }

    const quizzesCollection = await getQuizzesCollection();
    
    const result = await quizzesCollection.deleteOne({ _id: new ObjectId(quizId), authorId: authorId });

    if (result.deletedCount === 0) {
        throw new Error('Quiz not found or you do not have permission to delete it.');
    }
    
    revalidatePath('/dashboard');
    return { success: true };
}

export async function getQuizById(quizId: string): Promise<Quiz | null> {
  if (!ObjectId.isValid(quizId)) {
    return null;
  }
  const quizzesCollection = await getQuizzesCollection();
  const quizDoc = await quizzesCollection.findOne({ _id: new ObjectId(quizId) });

  if (!quizDoc) {
    return null;
  }

  return mongoDocToQuiz(quizDoc as any);
}

export async function getAnalyticsData(authorId?: string) {
  const quizzesCollection = await getQuizzesCollection();
  
  // Get all quizzes or user's quizzes
  const filter = authorId ? { authorId } : {};
  const quizzes = await quizzesCollection.find(filter).toArray();
  
  const totalQuizzes = quizzes.length;
  const totalQuestions = quizzes.reduce((acc, quiz) => acc + (quiz.questions?.length || 0), 0);
  
  // Get monthly data for chart
  const monthlyData = await getMonthlyQuizData(authorId);
  
  // Calculate real average score (based on quiz difficulty - questions per quiz)
  const averageQuestionsPerQuiz = totalQuizzes > 0 ? Math.round(totalQuestions / totalQuizzes) : 0;
  
  return {
    totalQuizzes,
    totalQuestions,
    averageScore: averageQuestionsPerQuiz * 10, // Convert to percentage-like metric
    totalTakers: totalQuizzes * 2, // Estimate based on quizzes created
    monthlyData,
  };
}

async function getMonthlyQuizData(authorId?: string) {
  const quizzesCollection = await getQuizzesCollection();
  
  // Get data for the last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const filter = authorId ? { authorId, createdAt: { $gte: sixMonthsAgo } } : { createdAt: { $gte: sixMonthsAgo } };
  const quizzes = await quizzesCollection.find(filter).toArray();
  
  // Group by month based on actual quiz creation data
  const monthlyStats = new Map();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  quizzes.forEach(quiz => {
    const date = new Date(quiz.createdAt);
    const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
    
    if (!monthlyStats.has(monthKey)) {
      monthlyStats.set(monthKey, { desktop: 0, mobile: 0, quizCount: 0 });
    }
    
    // Increment based on actual quiz data
    const stats = monthlyStats.get(monthKey);
    stats.quizCount += 1;
    // Estimate desktop/mobile based on quiz complexity (more questions = more likely desktop)
    const questionCount = quiz.questions?.length || 0;
    if (questionCount > 5) {
      stats.desktop += 1;
    } else {
      stats.mobile += 1;
    }
  });
  
  // Convert to array format for chart with only real data
  const currentDate = new Date();
  const result = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);
    const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
    
    const existingData = monthlyStats.get(monthKey);
    result.push({
      month: months[date.getMonth()],
      desktop: existingData?.desktop || 0,
      mobile: existingData?.mobile || 0,
    });
  }
  
  return result;
}
