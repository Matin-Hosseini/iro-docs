import "./index.css";
import React from "react";

interface ThreeDotsLoadingProps {
  color?: string;
}

const ThreeDotsLoading: React.FC<ThreeDotsLoadingProps> = ({ color }) => {
  return (
    <div
      className="loader"
      style={
        {
          "--_g": `no-repeat radial-gradient(circle closest-side, ${
            color || "#000"
          } 90%, #0000)`,
        } as React.CSSProperties & Record<string, string>
      }
    ></div>
  );
};

export default ThreeDotsLoading;
