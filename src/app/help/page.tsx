import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I create a new quiz?",
    answer: "To create a new quiz, simply navigate to the 'Create Quiz' page from the header or your dashboard. Fill in the title, an optional description, and start adding your questions and answer options.",
  },
  {
    question: "Can I use AI to help me write questions?",
    answer: "Yes! On the 'Create Quiz' page, click the 'Suggest with AI' button. Enter a topic, and our AI will generate a list of relevant question ideas for you to add to your quiz.",
  },
  {
    question: "How do I share my quiz with others?",
    answer: "From your dashboard, find the quiz you want to share and click the share icon. A dialog will appear with a unique link to your quiz. Anyone with this link can take your quiz.",
  },
  {
    question: "Can I edit a quiz after creating it?",
    answer: "Absolutely. On your dashboard, click the edit icon on any of your quizzes. This will take you back to the quiz editor where you can make changes and save them.",
  },
  {
    question: "Where can I see the results of my quizzes?",
    answer: "Quiz result tracking and detailed analysis are part of our upcoming 'Analysis' feature. Stay tuned for updates!",
  },
];


export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Help & Support</h1>
            <p className="text-muted-foreground mt-2">
              Find answers to common questions below.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
