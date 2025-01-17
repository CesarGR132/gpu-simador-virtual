import React from "react";

interface ALUProps {
  value1: number;
  value2: number;
  operation: string;
  result: number;
  zero: boolean;
}

export const ALU: React.FC<ALUProps> = ({ value1, value2, operation, result, zero }) => {
  return (
    <div className="relative w-48 h-40">
      <div className="absolute inset-0 bg-white border border-cpu-border transform rotate-6 flex flex-col items-center justify-center">
        <div className="text-lg font-bold mb-2">ALU</div>
        <div className="text-center font-mono space-y-1">
          <div>A: {value1}</div>
          <div>B: {value2}</div>
          <div className="text-sm">Op: {operation}</div>
          <div className="border-t pt-1">Result: {result}</div>
          <div className="text-xs">Zero: {zero ? "1" : "0"}</div>
        </div>
      </div>
    </div>
  );
};