import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "AI-Powered Question Suggestions",
    description: "Stuck on what to ask? Get intelligent question suggestions based on your quiz topic.",
  },
  {
    title: "Easy Quiz Creation",
    description: "An intuitive form builder that makes creating quizzes a breeze. Add questions, options, and correct answers effortlessly.",
  },
  {
    title: "Share with a Link",
    description: "Easily share your quizzes with a unique link. No complex setup required.",
  },
  {
    title: "Interactive Quiz Player",
    description: "An engaging and user-friendly interface for quiz takers with instant feedback and results.",
  },
  {
    title: "Dashboard Analytics",
    description: "Manage all your quizzes in one place and view basic analytics on quiz performance.",
  },
  {
    title: "Responsive Design",
    description: "Create and take quizzes on any device, whether it's a desktop, tablet, or smartphone.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline">Features of QuizWiz</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Discover the powerful tools and features that make QuizWiz the ultimate platform for creating and sharing quizzes.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
