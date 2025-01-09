import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";

interface ControlsProps {
  isRunning: boolean;
  speed: number;
  onPlayPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (value: number[]) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  speed,
  onPlayPause,
  onStep,
  onReset,
  onSpeedChange,
}) => {
  return (
    <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
      <Button variant="outline" size="icon" onClick={onPlayPause}>
        {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <Button variant="outline" size="icon" onClick={onStep}>
        <SkipForward className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onReset}>
        <RotateCcw className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        <span className="text-sm">Speed:</span>
        <Slider
          className="w-32"
          value={[speed]}
          onValueChange={onSpeedChange}
          min={1}
          max={10}
          step={1}
        />
      </div>
    </div>
  );
};