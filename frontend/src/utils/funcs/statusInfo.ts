import { blue, green, orange, red } from "@mui/material/colors";

export const generateStatusInfo = (status: string) => {
  switch (status) {
    case "pending": {
      return {
        text: "در انتظار تایید",
        mainColor: orange[700],
        lightColor: orange[50],
      };
    }
    case "approved": {
      return {
        text: "تایید شده",
        mainColor: green[700],
        lightColor: green[50],
      };
    }
    case "rejected": {
      return {
        text: "رد شده",
        mainColor: red[700],
        lightColor: red[50],
      };
    }
    case "creating": {
      return {
        text: "در انتظار بارگزاری مدارک",
        mainColor: blue[700],
        lightColor: blue[50],
      };
    }
    case "canceled": {
      return {
        text: "لغو شده",
        mainColor: red[700],
        lightColor: red[50],
      };
    }
  }
};
