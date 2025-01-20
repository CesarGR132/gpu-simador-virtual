import React from "react";

interface RegisterProps {
  name: string;
  value: number | string;
  width?: string;
}

export const Register: React.FC<RegisterProps> = ({ name, value, width = "w-32" }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-sm font-bold text-cpu-text">{name}</div>
      <div className={`${width} h-8 bg-card border border-cpu-border rounded flex items-center justify-center font-mono text-cpu-text`}>
        {value}
      </div>
    </div>
  );
};