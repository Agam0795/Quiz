import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CreateQuizForm } from "@/components/create-quiz/create-quiz-form";

export default function CreateQuizPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline">Create a New Quiz</h1>
            <p className="text-muted-foreground mt-2">Fill out the details below to build your quiz.</p>
          </div>
          <CreateQuizForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
