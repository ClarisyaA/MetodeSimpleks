
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, Factory, Calculator, TrendingUp, Info } from "lucide-react";

const ProblemExplainer = () => {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span>Penjelasan Masalah Linear Programming</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Linear Programming adalah teknik matematis untuk mencari solusi optimal dari masalah 
              yang memiliki fungsi tujuan linear dengan kendala-kendala yang juga linear. 
              Aplikasi ini dirancang khusus untuk menyelesaikan masalah optimalisasi keuntungan 
              pada Pabrik Sendal X di Ciputat, Tangerang Selatan.
            </p>
            
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Metode Simpleks</strong> adalah algoritma yang paling umum digunakan untuk 
                menyelesaikan masalah linear programming. Metode ini bekerja dengan cara bergerak 
                dari satu titik sudut feasible region ke titik sudut lainnya hingga mencapai solusi optimal.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Sandal Factory Problem */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Factory className="h-6 w-6 text-green-600" />
            <span>Studi Kasus: Pabrik Sendal X</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Deskripsi Masalah:</h4>
            <p className="text-gray-700">
              Pabrik Sendal X di Ciputat, Tangerang Selatan memproduksi dua jenis sandal:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">Sendal Tali Bahan (X₁)</h5>
                <ul className="text-sm space-y-1">
                  <li>• Keuntungan: Rp 12.000 per unit</li>
                  <li>• Kebutuhan Spons: 908 Cm² per unit</li>
                  <li>• Kebutuhan Lem: 67 gram per unit</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">Sendal Tali Karet (X₂)</h5>
                <ul className="text-sm space-y-1">
                  <li>• Keuntungan: Rp 10.000 per unit</li>
                  <li>• Kebutuhan Spons: 910 Cm² per unit</li>
                  <li>• Kebutuhan Lem: 80 gram per unit</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold mb-2">Keterbatasan Sumber Daya:</h5>
              <ul className="text-sm space-y-1">
                <li>• Total Spons tersedia: 2.000.000 Cm²</li>
                <li>• Total Lem tersedia: 150.000 gram</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mathematical Formulation */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-purple-600" />
            <span>Formulasi Matematika</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Fungsi Tujuan:</h4>
              <div className="bg-gray-100 p-3 rounded font-mono">
                Maksimumkan Z = 12.000X₁ + 10.000X₂
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Dimana Z adalah total keuntungan yang ingin dimaksimalkan
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Kendala-kendala:</h4>
              <div className="space-y-2">
                <div className="bg-gray-100 p-3 rounded font-mono">
                  908X₁ + 910X₂ ≤ 2.000.000 (Kendala Spons)
                </div>
                <div className="bg-gray-100 p-3 rounded font-mono">
                  67X₁ + 80X₂ ≤ 150.000 (Kendala Lem)
                </div>
                <div className="bg-gray-100 p-3 rounded font-mono">
                  X₁, X₂ ≥ 0 (Kendala Non-negatif)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solution Interpretation */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-orange-600" />
            <span>Interpretasi Solusi</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              Berdasarkan analisis menggunakan metode simpleks, solusi optimal memberikan:
            </p>
            
            <Alert className="bg-green-50 border-green-200">
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <div className="font-semibold text-green-800 mb-2">Hasil Optimal (dari paper):</div>
                <ul className="space-y-1 text-sm">
                  <li>• Sendal Tali Bahan (X₁): 2.203 unit</li>
                  <li>• Sendal Tali Karet (X₂): 0 unit</li>
                  <li>• Keuntungan Maksimal: Rp 26.436.000</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div>
              <h4 className="font-semibold mb-2">Rekomendasi Bisnis:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Perusahaan sebaiknya fokus memproduksi sendal tali bahan sebanyak 2.203 unit per bulan
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Produksi sendal tali karet tidak direkomendasikan dalam kondisi sumber daya saat ini
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Keuntungan optimal yang dapat dicapai adalah Rp 26.436.000 per bulan
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Analisis sensitivitas dapat dilakukan untuk melihat dampak perubahan harga bahan baku
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Method Steps */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle>Langkah-langkah Metode Simpleks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h5 className="font-semibold">Formulasi Masalah</h5>
                <p className="text-sm text-gray-600">Mengubah masalah ke bentuk standar dengan menambahkan slack variables</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h5 className="font-semibold">Penyusunan Tableau Awal</h5>
                <p className="text-sm text-gray-600">Membuat tabel simplex dengan variabel basis dan non-basis</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h5 className="font-semibold">Uji Optimalitas</h5>
                <p className="text-sm text-gray-600">Memeriksa apakah solusi saat ini sudah optimal</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <h5 className="font-semibold">Operasi Pivot</h5>
                <p className="text-sm text-gray-600">Melakukan operasi baris untuk mendapatkan tableau baru</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</div>
              <div>
                <h5 className="font-semibold">Iterasi</h5>
                <p className="text-sm text-gray-600">Mengulangi langkah 3-4 hingga mencapai solusi optimal</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProblemExplainer;
