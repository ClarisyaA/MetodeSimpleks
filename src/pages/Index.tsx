
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Factory, LineChart, BookOpen } from "lucide-react";
import SandalFactorySolver from "@/components/SandalFactorySolver";
import GeneralSimplexSolver from "@/components/GeneralSimplexSolver";
import ProblemExplainer from "@/components/ProblemExplainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Linear Programming Solver
                </h1>
                <p className="text-gray-600">Solusi Optimalisasi dengan Metode Simpleks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Introduction Card */}
          <Card className="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
                Sistem Pemecahan Masalah Linear Programming
              </CardTitle>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Aplikasi ini dirancang untuk menyelesaikan permasalahan optimalisasi keuntungan 
                pada Pabrik Sendal X di Ciputat, Tangerang Selatan, serta berbagai masalah 
                linear programming lainnya menggunakan metode simpleks.
              </p>
            </CardHeader>
          </Card>

          {/* Main Tabs */}
          <Tabs defaultValue="sandal-factory" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/70 backdrop-blur-sm">
              <TabsTrigger 
                value="sandal-factory" 
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                <Factory className="h-4 w-4" />
                <span>Pabrik Sendal</span>
              </TabsTrigger>
              <TabsTrigger 
                value="general-solver"
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                <LineChart className="h-4 w-4" />
                <span>Solver Umum</span>
              </TabsTrigger>
              <TabsTrigger 
                value="explanation"
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                <BookOpen className="h-4 w-4" />
                <span>Penjelasan</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sandal-factory">
              <SandalFactorySolver />
            </TabsContent>

            <TabsContent value="general-solver">
              <GeneralSimplexSolver />
            </TabsContent>

            <TabsContent value="explanation">
              <ProblemExplainer />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
