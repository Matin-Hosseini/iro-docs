import CalculatorForm from "@/components/CalculatorForm";
import SectionContainer from "../components/SectionContainer";
import WithPermission from "@/HOCs/WithPermission";

export default function Home() {
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
