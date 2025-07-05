import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import '@/lib/auth-error-handler'; // Initialize global error handling

export const metadata: Metadata = {
  title: 'QuizWiz',
  description: 'Create Interactive Quizzes Effortlessly',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%234F46E5' d='M16 4l12 6-12 6L4 10z'/%3E%3Cpath fill='%236366F1' d='M4 14v8c0 2 5.4 4 12 4s12-2 12-4v-8l-12 6z'/%3E%3Cpath fill='%238B5CF6' d='M26 12v8c0 1.1-.9 2-2 2s-2-.9-2-2v-6l4-2z'/%3E%3C/svg%3E" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
