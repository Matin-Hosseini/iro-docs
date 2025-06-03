import DashboardContent from "./components/DashboardContent";
import DashboardSidebar from "./components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-[300px_1fr] h-dvh bg-gray-200">
      <DashboardSidebar />
      <DashboardContent>{children}</DashboardContent>
    </div>
  );
}
