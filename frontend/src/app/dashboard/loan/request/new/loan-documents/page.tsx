import SectionContainer from "@/app/dashboard/components/SectionContainer";
import LoanDocumentUpload from "./components/laonDocumentsUpload";

export default async function LoanRequestdocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ req_id: string }>;
}) {
  const searchParameters = await searchParams;

  return (
    <div>
      <SectionContainer>
        <LoanDocumentUpload req_id={searchParameters.req_id} />
      </SectionContainer>
    </div>
  );
}
