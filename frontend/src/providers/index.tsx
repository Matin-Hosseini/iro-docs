import MuiProvider from "./Mui";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <MuiProvider>{children}</MuiProvider>;
}
