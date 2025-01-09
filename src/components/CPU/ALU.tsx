import React from "react";

export const ALU: React.FC<{ value1: number; value2: number }> = ({ value1, value2 }) => {
  return (
    <div className="relative w-48 h-24">
      <div className="absolute inset-0 bg-white border border-cpu-border transform rotate-6 flex items-center justify-center">
        <div className="text-center font-mono">
          <div>{value1}</div>
          <div>{value2}</div>
        </div>
      </div>
    </div>
  );
};