import { CPUSimulator } from "@/components/CPUSimulator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center">CPU Simulator</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <Tabs defaultValue="simulator" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simulator">Simulador</TabsTrigger>
            <TabsTrigger value="documentation">Documentación</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simulator">
            <CPUSimulator />
          </TabsContent>
          
          <TabsContent value="documentation" className="bg-card p-8 rounded-lg">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">Documentación del Simulador de CPU</h2>
              
              <h3 className="text-xl font-semibold mt-6">¿Cómo Funciona el Simulador?</h3>
              <p>
                El simulador de CPU es una representación interactiva de los componentes básicos de una unidad central de procesamiento.
                Permite visualizar y entender el funcionamiento interno de una CPU mediante la ejecución de instrucciones simples.
              </p>

              <h4 className="font-semibold mt-4">Ciclo de Ejecución</h4>
              <ol>
                <li>
                  <strong>Búsqueda de Instrucción:</strong> El PC (Contador de Programa) contiene la dirección de la siguiente instrucción a ejecutar.
                  Esta dirección se utiliza para obtener la instrucción de la memoria RAM.
                </li>
                <li>
                  <strong>Decodificación:</strong> La instrucción se carga en el IR (Registro de Instrucción) y la Unidad de Control la decodifica
                  para determinar qué operación realizar.
                </li>
                <li>
                  <strong>Ejecución:</strong> La ALU (Unidad Aritmético Lógica) realiza la operación especificada con los operandos proporcionados.
                  El resultado se almacena en el ACC (Acumulador).
                </li>
              </ol>

              <h4 className="font-semibold mt-4">Componentes Principales</h4>
              
              <h5 className="font-semibold mt-2">Registros</h5>
              <ul>
                <li><strong>PC (Program Counter):</strong> Mantiene la dirección de la siguiente instrucción a ejecutar.</li>
                <li><strong>IR (Instruction Register):</strong> Almacena la instrucción actual en ejecución.</li>
                <li><strong>ACC (Accumulator):</strong> Almacena resultados temporales y operandos.</li>
                <li><strong>SW (Status Word):</strong> Contiene flags que indican condiciones como:
                  <ul>
                    <li>Z (Zero): Se activa cuando el resultado es cero</li>
                    <li>N (Negative): Se activa cuando el resultado es negativo</li>
                  </ul>
                </li>
              </ul>

              <h5 className="font-semibold mt-2">ALU (Unidad Aritmético Lógica)</h5>
              <p>Realiza operaciones matemáticas básicas:</p>
              <ul>
                <li><strong>ADD:</strong> Suma dos números</li>
                <li><strong>SUB:</strong> Resta dos números</li>
                <li><strong>MUL:</strong> Multiplica dos números</li>
                <li><strong>DIV:</strong> Realiza división entera</li>
              </ul>

              <h5 className="font-semibold mt-2">Multiplexores (MUX)</h5>
              <p>
                Los multiplexores son componentes que seleccionan entre diferentes fuentes de datos según las señales de control:
              </p>
              <ul>
                <li><strong>MUX A:</strong> Selecciona el primer operando para la ALU</li>
                <li><strong>MUX B:</strong> Selecciona el segundo operando para la ALU</li>
              </ul>

              <h5 className="font-semibold mt-2">Unidad de Control</h5>
              <p>
                Coordina todas las operaciones del CPU mediante señales de control:
              </p>
              <ul>
                <li><strong>ALU Op:</strong> Determina la operación a realizar por la ALU</li>
                <li><strong>Mem Read:</strong> Controla la lectura de memoria</li>
                <li><strong>Mem Write:</strong> Controla la escritura en memoria</li>
                <li><strong>Reg Write:</strong> Controla la escritura en registros</li>
                <li><strong>Branch:</strong> Controla las operaciones de salto</li>
              </ul>

              <h5 className="font-semibold mt-2">Memoria RAM</h5>
              <p>
                Almacena el programa y los datos. Cada instrucción contiene:
              </p>
              <ul>
                <li><strong>Dirección:</strong> Ubicación en memoria</li>
                <li><strong>Instrucción:</strong> Operación a realizar y valor</li>
              </ul>

              <h4 className="font-semibold mt-4">Uso del Simulador</h4>
              <ol>
                <li>
                  <strong>Agregar Instrucciones:</strong>
                  <ul>
                    <li>Use el panel "Agregar Instrucción" para ingresar nuevas instrucciones</li>
                    <li>Seleccione una operación (ADD, SUB, MUL, DIV)</li>
                    <li>Ingrese un valor numérico</li>
                    <li>Presione "Agregar" para incluir la instrucción en la memoria</li>
                  </ul>
                </li>
                <li>
                  <strong>Controles de Ejecución:</strong>
                  <ul>
                    <li>Play/Pause: Inicia o pausa la ejecución automática</li>
                    <li>Step: Ejecuta una sola instrucción</li>
                    <li>Reset: Reinicia el simulador</li>
                    <li>Control de Velocidad: Ajusta la velocidad de ejecución</li>
                  </ul>
                </li>
                <li>
                  <strong>Observación:</strong>
                  <ul>
                    <li>Observe cómo cambian los valores en los registros</li>
                    <li>Vea las operaciones realizadas por la ALU</li>
                    <li>Monitoree las señales de control</li>
                    <li>Siga el flujo de datos entre componentes</li>
                  </ul>
                </li>
              </ol>

              <h4 className="font-semibold mt-4">Consejos de Uso</h4>
              <ul>
                <li>Comience con programas simples de 2-3 instrucciones</li>
                <li>Use el modo paso a paso para entender cada etapa</li>
                <li>Observe cómo se actualizan los flags después de cada operación</li>
                <li>Experimente con diferentes secuencias de instrucciones</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="github" className="bg-card p-8 rounded-lg">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">Descarga y Ejecución Local</h2>
              
              <h3 className="text-xl font-semibold mt-6">Requisitos Previos</h3>
              <ul>
                <li>Node.js (versión 14 o superior)</li>
                <li>npm (incluido con Node.js)</li>
                <li>Git instalado en tu sistema</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6">Pasos para Instalación</h3>
              <ol>
                <li>
                  <p>Clonar el repositorio:</p>
                  <pre className="bg-muted p-4 rounded-md">
                    <code>git clone [URL_DEL_REPOSITORIO]</code>
                  </pre>
                </li>
                <li>
                  <p>Navegar al directorio del proyecto:</p>
                  <pre className="bg-muted p-4 rounded-md">
                    <code>cd [NOMBRE_DEL_PROYECTO]</code>
                  </pre>
                </li>
                <li>
                  <p>Instalar dependencias:</p>
                  <pre className="bg-muted p-4 rounded-md">
                    <code>npm install</code>
                  </pre>
                </li>
                <li>
                  <p>Iniciar el servidor de desarrollo:</p>
                  <pre className="bg-muted p-4 rounded-md">
                    <code>npm run dev</code>
                  </pre>
                </li>
              </ol>

              <h3 className="text-xl font-semibold mt-6">Notas Importantes</h3>
              <ul>
                <li>El servidor de desarrollo se ejecutará en <code>http://localhost:5173</code> por defecto</li>
                <li>Los cambios en el código se reflejarán automáticamente en el navegador</li>
                <li>Para construir la versión de producción, usa <code>npm run build</code></li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;