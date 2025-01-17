import React, { useState, useEffect } from "react";
import { Register } from "./CPU/Register";
import { ALU } from "./CPU/ALU";
import { RAM } from "./CPU/RAM";
import { Controls } from "./CPU/Controls";
import { ControlUnit } from "./CPU/ControlUnit";
import { MUX } from "./CPU/MUX";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Instruction {
  address: number;
  instruction: string;
}

export const CPUSimulator: React.FC = () => {
  const [pc, setPC] = useState(0);
  const [ir, setIR] = useState("NOP");
  const [acc, setACC] = useState(0);
  const [sw, setSW] = useState({ Z: false, N: false });
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [aluValues, setALUValues] = useState({ 
    value1: 0, 
    value2: 0, 
    operation: "ADD",
    result: 0,
    zero: false 
  });
  const [controlSignals, setControlSignals] = useState({
    aluOp: "ADD",
    memRead: false,
    memWrite: false,
    regWrite: false,
    branch: false
  });
  const [instructions, setInstructions] = useState<Instruction[]>([
    { address: 0, instruction: "NOP" },
  ]);
  const [newInstruction, setNewInstruction] = useState("");
  const [newValue, setNewValue] = useState("");
  const [muxAInput, setMuxAInput] = useState([0, 0]);
  const [muxBInput, setMuxBInput] = useState([0, 0]);
  const [muxSelector, setMuxSelector] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(executeStep, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isRunning, speed, pc]);

  const updateControlSignals = (instruction: string) => {
    const [op] = instruction.split(" ");
    const signals = {
      aluOp: op,
      memRead: op === "LOAD",
      memWrite: op === "STORE",
      regWrite: ["ADD", "SUB", "MUL", "DIV", "LOAD"].includes(op),
      branch: op === "BRANCH"
    };
    setControlSignals(signals);
    return signals;
  };

  const executeStep = () => {
    const instruction = instructions.find((i) => i.address === pc);
    if (!instruction) {
      setIsRunning(false);
      toast.error("Fin del programa alcanzado");
      return;
    }

    setIR(instruction.instruction);
    const [op, value] = instruction.instruction.split(" ");
    const numValue = parseInt(value || "0");

    // Update control signals
    const signals = updateControlSignals(instruction.instruction);
    
    // Update MUX inputs
    setMuxAInput([acc, numValue]);
    setMuxBInput([numValue, acc]);
    setMuxSelector(signals.memRead ? 1 : 0);

    // Update ALU values
    const value1 = muxAInput[muxSelector];
    const value2 = muxBInput[muxSelector];
    let result = 0;

    switch (op) {
      case "ADD":
        result = value1 + value2;
        break;
      case "SUB":
        result = value1 - value2;
        break;
      case "MUL":
        result = value1 * value2;
        break;
      case "DIV":
        if (value2 === 0) {
          toast.error("¡División por cero!");
          setIsRunning(false);
          return;
        }
        result = Math.floor(value1 / value2);
        break;
    }

    setALUValues({
      value1,
      value2,
      operation: op,
      result,
      zero: result === 0
    });
    setACC(result);
    setSW({ Z: result === 0, N: result < 0 });
    setPC(pc + 2);
  };

  const handleReset = () => {
    setPC(0);
    setIR("NOP");
    setACC(0);
    setSW({ Z: false, N: false });
    setIsRunning(false);
    setALUValues({ 
      value1: 0, 
      value2: 0, 
      operation: "ADD",
      result: 0,
      zero: false 
    });
    setControlSignals({
      aluOp: "ADD",
      memRead: false,
      memWrite: false,
      regWrite: false,
      branch: false
    });
    setInstructions([{ address: 0, instruction: "NOP" }]);
    setMuxAInput([0, 0]);
    setMuxBInput([0, 0]);
    setMuxSelector(0);
    toast.success("CPU Reiniciada");
  };

  const addInstruction = () => {
    if (!newInstruction || !newValue) {
      toast.error("Por favor ingresa una instrucción y un valor");
      return;
    }

    const numValue = parseInt(newValue);
    if (isNaN(numValue)) {
      toast.error("El valor debe ser un número");
      return;
    }

    const newAddress = instructions.length * 2;
    setInstructions([
      ...instructions,
      { address: newAddress, instruction: `${newInstruction} ${numValue}` },
    ]);
    setNewInstruction("");
    setNewValue("");
    toast.success("Instrucción agregada");
  };

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-8">
        <div className="bg-cpu-bg p-8 rounded-lg border border-cpu-border">
          <div className="flex flex-col gap-8">
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
              
              <div className="flex gap-8 items-center">
                <MUX inputs={muxAInput} selector={muxSelector} label="MUX A" />
                <ALU {...aluValues} />
                <MUX inputs={muxBInput} selector={muxSelector} label="MUX B" />
              </div>
              
              <RAM instructions={instructions} currentAddress={pc} />
            </div>
            
            <div className="flex justify-center">
              <ControlUnit instruction={ir} signals={controlSignals} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
          <h3 className="text-lg font-bold">Agregar Instrucción</h3>
          <div className="flex gap-4">
            <select
              className="border rounded p-2"
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
            >
              <option value="">Seleccionar operación</option>
              <option value="ADD">ADD</option>
              <option value="SUB">SUB</option>
              <option value="MUL">MUL</option>
              <option value="DIV">DIV</option>
            </select>
            <Input
              type="number"
              placeholder="Valor"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-32"
            />
            <Button onClick={addInstruction}>Agregar</Button>
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