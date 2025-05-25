export default function WithPermission({
  children,
  permissions,
}: {
  children: React.ReactNode;
  permissions: string[];
}) {
  return <>{children}</>;
}
