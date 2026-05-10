import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import VoiceFAB from "@/components/voice/VoiceFAB";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[var(--bg-primary)] min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen pb-16 md:pb-0">
        <Header />
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
      <MobileNav />
      <VoiceFAB />
    </div>
  );
}
