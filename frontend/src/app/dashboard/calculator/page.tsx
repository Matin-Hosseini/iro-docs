import CalculatorForm from "@/components/CalculatorForm";
import SectionContainer from "../components/SectionContainer";
import WithPermission from "@/HOCs/WithPermission";
import { redirect } from "next/navigation";
import { getMe } from "@/utils/funcs/me";

export default async function Home() {
  const { isSuccess, userInfo } = await getMe();

  if (!isSuccess) return redirect("/");

  return (
    <main>
      <WithPermission permissions={[""]}>
        <SectionContainer>
          <CalculatorForm />
        </SectionContainer>
      </WithPermission>
    </main>
  );
}
