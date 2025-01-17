import React from "react";

interface MUXProps {
  inputs: number[];
  selector: number;
  label: string;
}

export const MUX: React.FC<MUXProps> = ({ inputs, selector, label }) => {
  const selectedValue = inputs[selector] ?? 0;

  return (
    <div className="relative w-24 h-32">
      <div className="absolute inset-0 bg-white border border-cpu-border transform rotate-45 flex flex-col items-center justify-center">
        <div className="text-xs font-bold -rotate-45 mb-2">{label}</div>
        <div className="font-mono -rotate-45">{selectedValue}</div>
        <div className="text-xs -rotate-45 mt-1">Sel: {selector}</div>
      </div>
    </div>
  );
};