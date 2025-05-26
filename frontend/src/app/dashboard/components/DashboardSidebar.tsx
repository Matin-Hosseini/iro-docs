import Logout from "./Logout";
import NavLink from "./NavLink";

export default function DashboardSidebar() {
  return (
    <aside className="hidden lg:block  pl-1.5">
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
    </aside>
  );
}
