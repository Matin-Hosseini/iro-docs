import MuiProvider from "./mui";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <MuiProvider>{children}</MuiProvider>;
}
