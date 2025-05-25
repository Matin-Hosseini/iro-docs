export default function SectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-white p-3 rounded-md">{children}</div>;
}
