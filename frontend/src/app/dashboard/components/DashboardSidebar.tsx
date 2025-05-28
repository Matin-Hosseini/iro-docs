import { getMe } from "@/utils/funcs/me";
import Logout from "./Logout";
import NavLink from "./NavLink";
import { redirect } from "next/navigation";

export const DashboardSideBarContent = () => {
  return (
    <div className="bg-white h-full  p-3 flex flex-col  justify-between">
      <div>
        <ul className="pt-5">
          <li className="mb-3">
            <NavLink href="/dashboard">پنل کاربری</NavLink>
          </li>
          <li className="mb-3">
            <NavLink href="/dashboard/calculator">محاسبه گر اقساط</NavLink>
          </li>
          <li>
            <NavLink href="/dashboard/loan-request">درخواست تسهیلات</NavLink>
          </li>
        </ul>
      </div>
      <div>
        <Logout />
      </div>
    </div>
  );
};

export default async function DashboardSidebar() {
  const { isSuccess, userInfo, permissions } = await getMe();

  if (!isSuccess) return redirect("/");

  return (
    <aside className="hidden lg:block  pl-1.5">
      <DashboardSideBarContent />
    </aside>
  );
}
