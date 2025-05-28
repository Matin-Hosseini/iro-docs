export default function SectionContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white p-3 rounded-md ${className}`}>{children}</div>
  );
}
