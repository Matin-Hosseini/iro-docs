import MuiProvider from "./Mui";
import HolyLoader from "holy-loader";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MuiProvider>
      {children}
      <HolyLoader />
      <Toaster richColors dir="rtl" className="font-dana" />
    </MuiProvider>
  );
}
