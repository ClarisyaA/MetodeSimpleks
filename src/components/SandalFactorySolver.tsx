
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, TrendingUp, Factory } from "lucide-react";
import { toast } from "sonner";

interface SolutionStep {
  step: number;
  description: string;
  tableau: number[][];
  basicVariables: string[];
  solution?: {
    x1: number;
    x2: number;
    profit: number;
  };
}

const SandalFactorySolver = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [solution, setSolution] = useState<SolutionStep[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  // Default values from the paper
  const [profitX1, setProfitX1] = useState(12000); // Profit per unit of rope sandal
  const [profitX2, setProfitX2] = useState(10000); // Profit per unit of rubber sandal
  const [sponsX1, setSponsX1] = useState(908); // Spons needed for rope sandal
  const [sponsX2, setSponsX2] = useState(910); // Spons needed for rubber sandal
  const [sponsLimit, setSponsLimit] = useState(2000000); // Total spons available
  const [glueX1, setGlueX1] = useState(67); // Glue needed for rope sandal
  const [glueX2, setGlueX2] = useState(80); // Glue needed for rubber sandal
  const [glueLimit, setGlueLimit] = useState(150000); // Total glue available

  const solveSandalProblem = () => {
    setIsCalculating(true);
    
    try {
      // Step 1: Set up the initial tableau
      // Maximize Z = 12000x1 + 10000x2
      // Subject to: 908x1 + 910x2 <= 2000000
      //            67x1 + 80x2 <= 150000
      //            x1, x2 >= 0

      const steps: SolutionStep[] = [];
      
      // Initial tableau setup
      let tableau = [
        [sponsX1, sponsX2, 1, 0, 0, sponsLimit],  // Spons constraint
        [glueX1, glueX2, 0, 1, 0, glueLimit],     // Glue constraint
        [-profitX1, -profitX2, 0, 0, 1, 0]       // Objective function
      ];
      
      let basicVars = ['s1', 's2', 'Z'];
      let stepCount = 1;

      steps.push({
        step: stepCount++,
        description: "Tableau awal - Mengubah masalah ke bentuk standar dengan menambahkan slack variables",
        tableau: tableau.map(row => [...row]),
        basicVariables: [...basicVars]
      });

      // Simplex iterations
      let optimal = false;
      let iterations = 0;
      const maxIterations = 10;

      while (!optimal && iterations < maxIterations) {
        // Find pivot column (most negative in objective row)
        let pivotCol = -1;
        let mostNegative = 0;
        for (let j = 0; j < tableau[0].length - 1; j++) {
          if (tableau[tableau.length - 1][j] < mostNegative) {
            mostNegative = tableau[tableau.length - 1][j];
            pivotCol = j;
          }
        }

        if (pivotCol === -1) {
          optimal = true;
          break;
        }

        // Find pivot row (minimum ratio test)
        let pivotRow = -1;
        let minRatio = Infinity;
        for (let i = 0; i < tableau.length - 1; i++) {
          if (tableau[i][pivotCol] > 0) {
            const ratio = tableau[i][tableau[i].length - 1] / tableau[i][pivotCol];
            if (ratio < minRatio) {
              minRatio = ratio;
              pivotRow = i;
            }
          }
        }

        if (pivotRow === -1) {
          throw new Error("Solusi tidak terbatas");
        }

        const pivotElement = tableau[pivotRow][pivotCol];
        
        steps.push({
          step: stepCount++,
          description: `Iterasi ${iterations + 1}: Pivot element = ${pivotElement.toFixed(2)} pada baris ${pivotRow + 1}, kolom ${pivotCol + 1}`,
          tableau: tableau.map(row => [...row]),
          basicVariables: [...basicVars]
        });

        // Perform pivot operation
        // Normalize pivot row
        for (let j = 0; j < tableau[pivotRow].length; j++) {
          tableau[pivotRow][j] /= pivotElement;
        }

        // Eliminate column
        for (let i = 0; i < tableau.length; i++) {
          if (i !== pivotRow) {
            const factor = tableau[i][pivotCol];
            for (let j = 0; j < tableau[i].length; j++) {
              tableau[i][j] -= factor * tableau[pivotRow][j];
            }
          }
        }

        // Update basic variables
        if (pivotCol === 0) basicVars[pivotRow] = 'x1';
        else if (pivotCol === 1) basicVars[pivotRow] = 'x2';
        else basicVars[pivotRow] = `s${pivotCol - 1}`;

        iterations++;
      }

      // Final solution
      const x1 = basicVars.indexOf('x1') !== -1 ? tableau[basicVars.indexOf('x1')][tableau[0].length - 1] : 0;
      const x2 = basicVars.indexOf('x2') !== -1 ? tableau[basicVars.indexOf('x2')][tableau[0].length - 1] : 0;
      const profit = tableau[tableau.length - 1][tableau[0].length - 1];

      steps.push({
        step: stepCount,
        description: "Solusi optimal tercapai",
        tableau: tableau.map(row => [...row]),
        basicVariables: [...basicVars],
        solution: {
          x1: Math.round(x1),
          x2: Math.round(x2),
          profit: Math.round(profit)
        }
      });

      setSolution(steps);
      setShowSolution(true);
      toast.success("Perhitungan berhasil diselesaikan!");

    } catch (error) {
      toast.error("Terjadi kesalahan dalam perhitungan");
      console.error(error);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetForm = () => {
    setShowSolution(false);
    setSolution([]);
    // Reset to default values from the paper
    setProfitX1(12000);
    setProfitX2(10000);
    setSponsX1(908);
    setSponsX2(910);
    setSponsLimit(2000000);
    setGlueX1(67);
    setGlueX2(80);
    setGlueLimit(150000);
  };

  return (
    <div className="space-y-6">
      {/* Problem Description */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Factory className="h-6 w-6 text-blue-600" />
            <span>Masalah Pabrik Sendal X - Ciputat, Tangerang Selatan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Parameter Keuntungan (Rupiah)</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="profitX1">Keuntungan Sendal Tali Bahan (X₁)</Label>
                  <Input
                    id="profitX1"
                    type="number"
                    value={profitX1}
                    onChange={(e) => setProfitX1(Number(e.target.value))}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label htmlFor="profitX2">Keuntungan Sendal Tali Karet (X₂)</Label>
                  <Input
                    id="profitX2"
                    type="number"
                    value={profitX2}
                    onChange={(e) => setProfitX2(Number(e.target.value))}
                    className="bg-white/80"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Kendala Bahan Baku</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="sponsX1">Spons untuk X₁ (Cm²)</Label>
                    <Input
                      id="sponsX1"
                      type="number"
                      value={sponsX1}
                      onChange={(e) => setSponsX1(Number(e.target.value))}
                      className="bg-white/80"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sponsX2">Spons untuk X₂ (Cm²)</Label>
                    <Input
                      id="sponsX2"
                      type="number"
                      value={sponsX2}
                      onChange={(e) => setSponsX2(Number(e.target.value))}
                      className="bg-white/80"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="sponsLimit">Total Spons Tersedia (Cm²)</Label>
                  <Input
                    id="sponsLimit"
                    type="number"
                    value={sponsLimit}
                    onChange={(e) => setSponsLimit(Number(e.target.value))}
                    className="bg-white/80"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="glueX1">Lem untuk X₁ (gram)</Label>
                    <Input
                      id="glueX1"
                      type="number"
                      value={glueX1}
                      onChange={(e) => setGlueX1(Number(e.target.value))}
                      className="bg-white/80"
                    />
                  </div>
                  <div>
                    <Label htmlFor="glueX2">Lem untuk X₂ (gram)</Label>
                    <Input
                      id="glueX2"
                      type="number"
                      value={glueX2}
                      onChange={(e) => setGlueX2(Number(e.target.value))}
                      className="bg-white/80"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="glueLimit">Total Lem Tersedia (gram)</Label>
                  <Input
                    id="glueLimit"
                    type="number"
                    value={glueLimit}
                    onChange={(e) => setGlueLimit(Number(e.target.value))}
                    className="bg-white/80"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button 
              onClick={solveSandalProblem} 
              disabled={isCalculating}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Calculator className="h-4 w-4 mr-2" />
              {isCalculating ? "Menghitung..." : "Selesaikan Masalah"}
            </Button>
            <Button 
              variant="outline" 
              onClick={resetForm}
              className="border-gray-300 hover:bg-gray-50"
            >
              Reset ke Nilai Default
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Solution Display */}
      {showSolution && solution.length > 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <span>Solusi Metode Simpleks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Final Solution Summary */}
            {solution[solution.length - 1].solution && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-semibold text-green-800 mb-2">Solusi Optimal:</div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Sendal Tali Bahan (X₁):</strong> {solution[solution.length - 1].solution!.x1.toLocaleString()} unit
                    </div>
                    <div>
                      <strong>Sendal Tali Karet (X₂):</strong> {solution[solution.length - 1].solution!.x2.toLocaleString()} unit
                    </div>
                    <div>
                      <strong>Keuntungan Maksimal:</strong> Rp {solution[solution.length - 1].solution!.profit.toLocaleString()}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Step-by-step solution */}
            <div className="space-y-6">
              {solution.map((step, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white/50">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Langkah {step.step}: {step.description}
                  </h4>
                  
                  {/* Tableau */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-2">Variabel Basis</th>
                          <th className="border border-gray-300 p-2">x₁</th>
                          <th className="border border-gray-300 p-2">x₂</th>
                          <th className="border border-gray-300 p-2">s₁</th>
                          <th className="border border-gray-300 p-2">s₂</th>
                          <th className="border border-gray-300 p-2">Z</th>
                          <th className="border border-gray-300 p-2">RHS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {step.tableau.map((row, rowIndex) => (
                          <tr key={rowIndex} className={rowIndex === step.tableau.length - 1 ? "bg-blue-50" : ""}>
                            <td className="border border-gray-300 p-2 font-medium">
                              {rowIndex < step.basicVariables.length ? step.basicVariables[rowIndex] : ''}
                            </td>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="border border-gray-300 p-2 text-center">
                                {Math.abs(cell) < 0.001 ? '0' : cell.toFixed(2)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SandalFactorySolver;
