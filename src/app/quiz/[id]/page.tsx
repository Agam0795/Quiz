import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { QuizPlayer } from "@/components/quiz-taking/quiz-player";
import { notFound } from "next/navigation";
import { getQuizById } from "@/app/actions/quiz.actions";

export default async function TakeQuizPage({ params }: { params: { id: string } }) {
  const quiz = await getQuizById(params.id);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <QuizPlayer quiz={quiz} />
      </main>
      <Footer />
    </div>
  );
}
