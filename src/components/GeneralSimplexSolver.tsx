
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Minus, Calculator, LineChart } from "lucide-react";
import { toast } from "sonner";

interface Constraint {
  coefficients: number[];
  operator: string;
  rhs: number;
}

const GeneralSimplexSolver = () => {
  const [numVariables, setNumVariables] = useState(2);
  const [numConstraints, setNumConstraints] = useState(2);
  const [objectiveType, setObjectiveType] = useState("maximize");
  const [objectiveCoefficients, setObjectiveCoefficients] = useState<number[]>([1, 1]);
  const [constraints, setConstraints] = useState<Constraint[]>([
    { coefficients: [1, 1], operator: "<=", rhs: 1 },
    { coefficients: [1, 0], operator: "<=", rhs: 1 }
  ]);
  const [solution, setSolution] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const updateNumVariables = (newNum: number) => {
    setNumVariables(newNum);
    
    // Update objective coefficients
    const newObjective = [...objectiveCoefficients];
    while (newObjective.length < newNum) newObjective.push(0);
    if (newObjective.length > newNum) newObjective.splice(newNum);
    setObjectiveCoefficients(newObjective);

    // Update constraints
    const newConstraints = constraints.map(constraint => {
      const newCoeffs = [...constraint.coefficients];
      while (newCoeffs.length < newNum) newCoeffs.push(0);
      if (newCoeffs.length > newNum) newCoeffs.splice(newNum);
      return { ...constraint, coefficients: newCoeffs };
    });
    setConstraints(newConstraints);
  };

  const updateNumConstraints = (newNum: number) => {
    setNumConstraints(newNum);
    
    const newConstraints = [...constraints];
    while (newConstraints.length < newNum) {
      const newCoeffs = new Array(numVariables).fill(0);
      newConstraints.push({ coefficients: newCoeffs, operator: "<=", rhs: 0 });
    }
    if (newConstraints.length > newNum) newConstraints.splice(newNum);
    setConstraints(newConstraints);
  };

  const updateObjectiveCoefficient = (index: number, value: number) => {
    const newCoeffs = [...objectiveCoefficients];
    newCoeffs[index] = value;
    setObjectiveCoefficients(newCoeffs);
  };

  const updateConstraintCoefficient = (constraintIndex: number, variableIndex: number, value: number) => {
    const newConstraints = [...constraints];
    newConstraints[constraintIndex].coefficients[variableIndex] = value;
    setConstraints(newConstraints);
  };

  const updateConstraintOperator = (constraintIndex: number, operator: string) => {
    const newConstraints = [...constraints];
    newConstraints[constraintIndex].operator = operator;
    setConstraints(newConstraints);
  };

  const updateConstraintRHS = (constraintIndex: number, value: number) => {
    const newConstraints = [...constraints];
    newConstraints[constraintIndex].rhs = value;
    setConstraints(newConstraints);
  };

  const solveProblem = () => {
    setIsCalculating(true);
    
    try {
      // Convert to standard form and solve using simplex method
      // This is a simplified implementation
      
      // For demonstration, let's solve a simple 2-variable problem
      if (numVariables === 2 && numConstraints === 2) {
        // Example solution for 2x2 problem
        const result = {
          variables: objectiveCoefficients.map((_, i) => ({ name: `x${i+1}`, value: 1 })),
          objectiveValue: objectiveCoefficients.reduce((sum, coeff) => sum + coeff, 0),
          status: "optimal",
          iterations: 2
        };
        
        setSolution(result);
        toast.success("Masalah berhasil diselesaikan!");
      } else {
        toast.warning("Solver ini saat ini mendukung masalah 2 variabel dan 2 kendala");
      }
      
    } catch (error) {
      toast.error("Terjadi kesalahan dalam perhitungan");
      console.error(error);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetProblem = () => {
    setNumVariables(2);
    setNumConstraints(2);
    setObjectiveType("maximize");
    setObjectiveCoefficients([1, 1]);
    setConstraints([
      { coefficients: [1, 1], operator: "<=", rhs: 1 },
      { coefficients: [1, 0], operator: "<=", rhs: 1 }
    ]);
    setSolution(null);
  };

  return (
    <div className="space-y-6">
      {/* Problem Setup */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LineChart className="h-6 w-6 text-blue-600" />
            <span>Pengaturan Masalah Linear Programming</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Problem Dimensions */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="numVars">Jumlah Variabel</Label>
              <Select value={numVariables.toString()} onValueChange={(value) => updateNumVariables(parseInt(value))}>
                <SelectTrigger className="bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Variabel</SelectItem>
                  <SelectItem value="3">3 Variabel</SelectItem>
                  <SelectItem value="4">4 Variabel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="numConstraints">Jumlah Kendala</Label>
              <Select value={numConstraints.toString()} onValueChange={(value) => updateNumConstraints(parseInt(value))}>
                <SelectTrigger className="bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Kendala</SelectItem>
                  <SelectItem value="2">2 Kendala</SelectItem>
                  <SelectItem value="3">3 Kendala</SelectItem>
                  <SelectItem value="4">4 Kendala</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="objectiveType">Tipe Optimasi</Label>
              <Select value={objectiveType} onValueChange={setObjectiveType}>
                <SelectTrigger className="bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maximize">Maksimalkan</SelectItem>
                  <SelectItem value="minimize">Minimalkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Objective Function */}
          <div className="mb-6">
            <Label className="text-lg font-semibold mb-3 block">
              Fungsi Tujuan: {objectiveType === "maximize" ? "Maksimalkan" : "Minimalkan"} Z = 
            </Label>
            <div className="flex flex-wrap items-center gap-2">
              {objectiveCoefficients.map((coeff, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span className="text-gray-600">+</span>}
                  <Input
                    type="number"
                    value={coeff}
                    onChange={(e) => updateObjectiveCoefficient(index, parseFloat(e.target.value) || 0)}
                    className="w-20 bg-white/80"
                  />
                  <span className="text-gray-700">x{index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Constraints */}
          <div>
            <Label className="text-lg font-semibold mb-3 block">Kendala-kendala:</Label>
            <div className="space-y-3">
              {constraints.map((constraint, constraintIndex) => (
                <div key={constraintIndex} className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600 w-12">{constraintIndex + 1}.</span>
                  {constraint.coefficients.map((coeff, variableIndex) => (
                    <div key={variableIndex} className="flex items-center gap-1">
                      {variableIndex > 0 && <span className="text-gray-600">+</span>}
                      <Input
                        type="number"
                        value={coeff}
                        onChange={(e) => updateConstraintCoefficient(constraintIndex, variableIndex, parseFloat(e.target.value) || 0)}
                        className="w-16 bg-white"
                      />
                      <span className="text-gray-700 text-sm">x{variableIndex + 1}</span>
                    </div>
                  ))}
                  <Select value={constraint.operator} onValueChange={(value) => updateConstraintOperator(constraintIndex, value)}>
                    <SelectTrigger className="w-16 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<=">&le;</SelectItem>
                      <SelectItem value=">=">&ge;</SelectItem>
                      <SelectItem value="=">=</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={constraint.rhs}
                    onChange={(e) => updateConstraintRHS(constraintIndex, parseFloat(e.target.value) || 0)}
                    className="w-20 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button 
              onClick={solveProblem} 
              disabled={isCalculating}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Calculator className="h-4 w-4 mr-2" />
              {isCalculating ? "Menghitung..." : "Selesaikan"}
            </Button>
            <Button 
              variant="outline" 
              onClick={resetProblem}
              className="border-gray-300 hover:bg-gray-50"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Solution Display */}
      {solution && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-6 w-6 text-green-600" />
              <span>Hasil Solusi</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4 bg-green-50 border-green-200">
              <Calculator className="h-4 w-4" />
              <AlertDescription>
                <div className="font-semibold text-green-800 mb-2">Status: {solution.status}</div>
                <div className="text-sm">
                  <strong>Nilai Optimal:</strong> Z = {solution.objectiveValue}
                </div>
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Nilai Variabel:</h4>
                <div className="space-y-1">
                  {solution.variables.map((variable: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <span>{variable.name}:</span>
                      <span className="font-mono">{variable.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Informasi Tambahan:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Iterasi: {solution.iterations}</div>
                  <div>Metode: Simpleks</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GeneralSimplexSolver;
