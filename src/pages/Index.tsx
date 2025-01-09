import { CPUSimulator } from "@/components/CPUSimulator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">CPU Simulator</h1>
        <CPUSimulator />
      </div>
    </div>
  );
};

export default Index;