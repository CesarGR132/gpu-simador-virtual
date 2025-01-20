import React from "react";

interface ControlSignals {
  aluOp: string;
  memRead: boolean;
  memWrite: boolean;
  regWrite: boolean;
  branch: boolean;
}

interface ControlUnitProps {
  instruction: string;
  signals: ControlSignals;
}

export const ControlUnit: React.FC<ControlUnitProps> = ({ instruction, signals }) => {
  return (
    <div className="w-48 bg-card border border-cpu-border rounded-lg p-4 text-cpu-text">
      <div className="text-lg font-bold mb-2 text-center">Control Unit</div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>ALU Op:</span>
          <span className="font-mono">{signals.aluOp}</span>
        </div>
        <div className="flex justify-between">
          <span>Mem Read:</span>
          <span className="font-mono">{signals.memRead ? "1" : "0"}</span>
        </div>
        <div className="flex justify-between">
          <span>Mem Write:</span>
          <span className="font-mono">{signals.memWrite ? "1" : "0"}</span>
        </div>
        <div className="flex justify-between">
          <span>Reg Write:</span>
          <span className="font-mono">{signals.regWrite ? "1" : "0"}</span>
        </div>
        <div className="flex justify-between">
          <span>Branch:</span>
          <span className="font-mono">{signals.branch ? "1" : "0"}</span>
        </div>
      </div>
    </div>
  );
};