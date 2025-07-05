import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <DashboardClient />
      </main>
      <Footer />
    </div>
  );
}
