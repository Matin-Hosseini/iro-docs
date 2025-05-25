import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <aside className="hidden lg:block  pl-1.5">
      <div className="bg-gray-400 h-full  p-3">
        <ul className="pt-5">
          <li>
            <Link className="p-2 rounded-md bg-blue-100 block" href={"/loan"}>
              درخواست تسهیلات
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
