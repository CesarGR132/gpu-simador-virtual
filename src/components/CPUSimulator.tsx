import React, { useState, useEffect } from "react";
import { Register } from "./CPU/Register";
import { ALU } from "./CPU/ALU";
import { RAM } from "./CPU/RAM";
import { Controls } from "./CPU/Controls";
import { toast } from "sonner";

const initialInstructions = [
  { address: 0, instruction: "NOP" },
  { address: 2, instruction: "ADD 4" },
  { address: 4, instruction: "SUB 2" },
  { address: 6, instruction: "MUL 3" },
  { address: 8, instruction: "DIV 2" },
];

export const CPUSimulator: React.FC = () => {
  const [pc, setPC] = useState(0);
  const [ir, setIR] = useState("NOP");
  const [acc, setACC] = useState(0);
  const [sw, setSW] = useState({ Z: false, N: false });
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [aluValues, setALUValues] = useState({ value1: 0, value2: 0 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(executeStep, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isRunning, speed, pc]);

  const executeStep = () => {
    const instruction = initialInstructions.find((i) => i.address === pc);
    if (!instruction) {
      setIsRunning(false);
      toast.error("End of program reached");
      return;
    }

    setIR(instruction.instruction);
    const [op, value] = instruction.instruction.split(" ");
    const numValue = parseInt(value || "0");

    switch (op) {
      case "ADD":
        setALUValues({ value1: acc, value2: numValue });
        setACC(acc + numValue);
        break;
      case "SUB":
        setALUValues({ value1: acc, value2: numValue });
        setACC(acc - numValue);
        break;
      case "MUL":
        setALUValues({ value1: acc, value2: numValue });
        setACC(acc * numValue);
        break;
      case "DIV":
        if (numValue === 0) {
          toast.error("Division by zero!");
          setIsRunning(false);
          return;
        }
        setALUValues({ value1: acc, value2: numValue });
        setACC(Math.floor(acc / numValue));
        break;
    }

    setPC(pc + 2);
  };

  const handleReset = () => {
    setPC(0);
    setIR("NOP");
    setACC(0);
    setSW({ Z: false, N: false });
    setIsRunning(false);
    setALUValues({ value1: 0, value2: 0 });
    toast.success("CPU Reset");
  };

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-8">
        <div className="bg-cpu-bg p-8 rounded-lg border border-cpu-border">
          <div className="flex justify-between items-start">
            <div className="space-y-8">
              <Register name="IR" value={ir} />
              <Register name="PC" value={pc} />
              <Register name="ACC" value={acc} />
              <div className="flex gap-2">
                <div className="text-sm font-bold">SW:</div>
                <div className="font-mono">
                  Z:{sw.Z ? "1" : "0"} N:{sw.N ? "1" : "0"}
                </div>
              </div>
            </div>
            <ALU {...aluValues} />
            <RAM instructions={initialInstructions} currentAddress={pc} />
          </div>
        </div>
        <Controls
          isRunning={isRunning}
          speed={speed}
          onPlayPause={() => setIsRunning(!isRunning)}
          onStep={executeStep}
          onReset={handleReset}
          onSpeedChange={(value) => setSpeed(value[0])}
        />
      </div>
    </div>
  );
};