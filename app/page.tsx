import { DashboardLayout } from "@/components/dashboard-layout";
import { Header } from "@/components/header";
import { MainContent } from "@/components/main-content";
import { RightSidebar } from "@/components/sidebar-right";

export default function Home() {
  return (
    <DashboardLayout
      header={<Header />}
      main={<MainContent />}
      sidebar={<RightSidebar />}
    />
  );
}
