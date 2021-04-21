import React from "react";

export default function Container({ children, className = "" }) {
  return (
    <div className={`w-full px-6 lg:max-w-5xl lg:mx-auto lg: ${className}`}>
      {children}
    </div>
  );
}
