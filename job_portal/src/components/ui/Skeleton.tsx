import React from "react";
import classNames from "classnames";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames("bg-secondary rounded", className)}
      {...props}
      style={{
        animation: "pulse 2s infinite",
        backgroundColor: "#e0e0e0", // equivalent to bg-muted
        borderRadius: ".375rem", // equivalent to rounded-md
        ...props.style,
      }}
    />
  );
}

export { Skeleton };

// Add the following CSS for the pulse animation
const styles = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  .animate-pulse {
    animation: pulse 2s infinite;
  }
`;

// Inject the styles into the head of the document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
