import MobileHeader from "./MobileHeader";

export default function DashboardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-y-auto p-3 pr-1.5">
      <div className="h-full rounded-lg p-2">
        <MobileHeader />
        {children}
      </div>
    </div>
  );
}
