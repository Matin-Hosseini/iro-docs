import RequestedProduct from "./components/RequestdProduct";
import SectionContainer from "@/app/dashboard/components/SectionContainer";

export default async function LoanProductRequestPage() {
  return (
    <div>
      <SectionContainer>
        <RequestedProduct />
      </SectionContainer>
    </div>
  );
}
