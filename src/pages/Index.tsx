import { CPUSimulator } from "@/components/CPUSimulator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">CPU Simulator</h1>
        
        <Tabs defaultValue="simulator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simulator">Simulador</TabsTrigger>
            <TabsTrigger value="documentation">Documentación</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simulator">
            <CPUSimulator />
          </TabsContent>
          
          <TabsContent value="documentation" className="bg-white p-8 rounded-lg">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">Documentación del Simulador de CPU</h2>
              
              <h3 className="text-xl font-semibold mt-6">Componentes Principales</h3>
              
              <h4 className="font-semibold mt-4">Registros</h4>
              <ul>
                <li><strong>PC (Program Counter):</strong> Contador de programa que mantiene la dirección de la siguiente instrucción a ejecutar.</li>
                <li><strong>IR (Instruction Register):</strong> Registro de instrucción que almacena la instrucción actual en ejecución.</li>
                <li><strong>ACC (Accumulator):</strong> Acumulador que almacena resultados temporales y operandos.</li>
                <li><strong>SW (Status Word):</strong> Palabra de estado que indica condiciones como cero (Z) y negativo (N).</li>
              </ul>

              <h4 className="font-semibold mt-4">ALU (Unidad Aritmético Lógica)</h4>
              <p>Realiza operaciones aritméticas y lógicas:</p>
              <ul>
                <li><strong>ADD:</strong> Suma dos números</li>
                <li><strong>SUB:</strong> Resta dos números</li>
                <li><strong>MUL:</strong> Multiplica dos números</li>
                <li><strong>DIV:</strong> División entera de dos números</li>
              </ul>

              <h4 className="font-semibold mt-4">MUX (Multiplexores)</h4>
              <p>Seleccionan entre diferentes fuentes de datos:</p>
              <ul>
                <li><strong>MUX A:</strong> Selecciona el primer operando para la ALU</li>
                <li><strong>MUX B:</strong> Selecciona el segundo operando para la ALU</li>
              </ul>

              <h4 className="font-semibold mt-4">Unidad de Control</h4>
              <p>Coordina todas las operaciones del CPU mediante señales de control:</p>
              <ul>
                <li><strong>ALU Op:</strong> Determina la operación a realizar por la ALU</li>
                <li><strong>Mem Read:</strong> Controla la lectura de memoria</li>
                <li><strong>Mem Write:</strong> Controla la escritura en memoria</li>
                <li><strong>Reg Write:</strong> Controla la escritura en registros</li>
                <li><strong>Branch:</strong> Controla las operaciones de salto</li>
              </ul>

              <h4 className="font-semibold mt-4">RAM (Memoria)</h4>
              <p>Almacena el programa y los datos. Cada instrucción contiene:</p>
              <ul>
                <li><strong>Dirección:</strong> Ubicación en memoria</li>
                <li><strong>Instrucción:</strong> Operación a realizar y valor</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6">Controles del Simulador</h3>
              <ul>
                <li><strong>Play/Pause:</strong> Inicia o pausa la ejecución automática</li>
                <li><strong>Step:</strong> Ejecuta una sola instrucción</li>
                <li><strong>Reset:</strong> Reinicia el simulador</li>
                <li><strong>Velocidad:</strong> Ajusta la velocidad de ejecución automática</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6">Instrucciones de Uso</h3>
              <ol>
                <li>Agregue instrucciones usando el panel de "Agregar Instrucción"</li>
                <li>Use el botón de generación aleatoria para crear un programa de ejemplo</li>
                <li>Controle la ejecución con los botones de control</li>
                <li>Observe el flujo de datos entre componentes durante la ejecución</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;