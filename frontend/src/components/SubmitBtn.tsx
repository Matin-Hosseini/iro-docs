import Button, { ButtonProps } from "@mui/material/Button";
import ThreeDotsLoading from "./loadings/ThreeDots";
import { blue } from "@mui/material/colors";

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
      sx={{
        height: 50,
        "&:disabled": {
          background: blue[700],
        },
      }}
    >
      {isSubmitting ? <ThreeDotsLoading color="#fff" /> : children}
    </Button>
  );
}
