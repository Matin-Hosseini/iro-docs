import Button, { ButtonProps } from "@mui/material/Button";
import ThreeDotsLoading from "./loadings/ThreeDots";

interface SubmitBtnProps extends ButtonProps {
  isSubmitting?: boolean;
  backGround?: string;
}

export default function SubmitBtn({
  children,
  isSubmitting = false,
  backGround,
  className,
  type,
  variant = "contained",
  fullWidth = true,
  disabled,
  ...props
}: SubmitBtnProps) {
  return (
    <Button
      {...props}
      type={type || "submit"}
      disabled={isSubmitting || disabled}
      variant={variant}
      fullWidth={fullWidth}
      className={`h-12 flex items-center justify-center ${
        backGround || "bg-gray-500 disabled:text-gray-200 disabled:opacity-70"
      } ${className || ""}`}
    >
      {isSubmitting ? <ThreeDotsLoading color="#fff" /> : children}
    </Button>
  );
}
