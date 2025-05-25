"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathName = usePathname();

  return (
    <Link
      className={`p-2 rounded-md  block hover:text-blue-600 ${
        href === pathName ? "text-blue-700 bg-blue-50" : "text-gray-500"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
