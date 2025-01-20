import React from "react";

interface Instruction {
  address: number;
  instruction: string;
}

interface RAMProps {
  instructions: Instruction[];
  currentAddress: number;
}

export const RAM: React.FC<RAMProps> = ({ instructions, currentAddress }) => {
  return (
    <div className="w-64 bg-card border border-cpu-border rounded-lg p-2 text-cpu-text">
      <div className="text-lg font-bold mb-2 text-center">RAM</div>
      <div className="space-y-1">
        {instructions.map((inst) => (
          <div
            key={inst.address}
            className={`flex gap-4 p-1 rounded ${
              inst.address === currentAddress ? "bg-accent/50" : ""
            }`}
          >
            <div className="w-12 text-right font-mono">{inst.address}</div>
            <div className="font-mono">{inst.instruction}</div>
          </div>
        ))}
      </div>
    </div>
  );
};