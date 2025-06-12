import { getMe } from "@/utils/funcs/me";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { isSuccess, userInfo } = await getMe();

  if (!isSuccess) return redirect("/");

  return (
    <div className=" h-full flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-center text-3xl font-bold mb-10">
          {userInfo.firstName || userInfo.phone} عزیز به پنل کاربری خود خوش
          آمدید
        </h1>
        <div className="flex items-center justify-around flex-wrap gap-4">
          <Link
            className="bg-violet-600 py-6  text-center w-[250px] rounded-md text-white whitespace-nowrap"
            href={"/dashboard/calculator"}
          >
            محاسبه گر اقساط
          </Link>
          <Link
            className="bg-blue-600 py-6  w-[250px] text-center rounded-md text-white  whitespace-nowrap"
            href={"/dashboard/loan/request"}
          >
            درخواست تسهیلات
          </Link>
        </div>
      </div>
    </div>
  );
}
