"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
} from "recharts"
import { TrendingUp, MapPin, Brain, Target, AlertCircle } from "lucide-react"

// Mock data for individual crop predictions
const wheatPredictionData = [
  { month: "Jan", predicted: 2.5, actual: 2.3, confidence: 85, weather: 28, soil: 72, management: 90 },
  { month: "Feb", predicted: 2.8, actual: 2.6, confidence: 88, weather: 32, soil: 75, management: 92 },
  { month: "Mar", predicted: 3.2, actual: 3.1, confidence: 92, weather: 35, soil: 78, management: 88 },
  { month: "Apr", predicted: 3.5, actual: 0, confidence: 89, weather: 38, soil: 80, management: 85 },
  { month: "May", predicted: 3.8, actual: 0, confidence: 87, weather: 42, soil: 82, management: 90 },
  { month: "Jun", predicted: 4.0, actual: 0, confidence: 85, weather: 45, soil: 85, management: 88 },
]

const ricePredictionData = [
  { month: "Feb", predicted: 2.2, actual: 2.0, confidence: 82, weather: 30, soil: 68, management: 85 },
  { month: "Mar", predicted: 2.5, actual: 2.3, confidence: 85, weather: 33, soil: 70, management: 88 },
  { month: "Apr", predicted: 2.8, actual: 2.7, confidence: 88, weather: 36, soil: 72, management: 90 },
  { month: "May", predicted: 3.1, actual: 0, confidence: 86, weather: 39, soil: 75, management: 87 },
  { month: "Jun", predicted: 3.4, actual: 0, confidence: 84, weather: 42, soil: 78, management: 85 },
  { month: "Jul", predicted: 3.6, actual: 0, confidence: 82, weather: 45, soil: 80, management: 88 },
]

const cottonPredictionData = [
  { month: "Mar", predicted: 1.2, actual: 1.1, confidence: 78, weather: 25, soil: 65, management: 82 },
  { month: "Apr", predicted: 1.4, actual: 1.3, confidence: 80, weather: 28, soil: 68, management: 85 },
  { month: "May", predicted: 1.6, actual: 1.5, confidence: 83, weather: 32, soil: 70, management: 88 },
  { month: "Jun", predicted: 1.8, actual: 0, confidence: 81, weather: 35, soil: 72, management: 86 },
  { month: "Jul", predicted: 2.0, actual: 0, confidence: 79, weather: 38, soil: 75, management: 84 },
  { month: "Aug", predicted: 2.2, actual: 0, confidence: 77, weather: 40, soil: 78, management: 87 },
]

const factorAnalysisData = [
  { factor: "Weather", impact: 35, color: "#3b82f6" },
  { factor: "Soil Quality", impact: 28, color: "#16a34a" },
  { factor: "Management", impact: 25, color: "#f59e0b" },
  { factor: "Seeds", impact: 12, color: "#8b5cf6" },
]

const stateComparisonData = [
  {
    state: "Punjab",
    wheat: 4.2,
    rice: 3.8,
    cotton: 2.1,
    predicted: 4.5,
    actual: 4.2,
    wheatFarmers: 125000,
    riceFarmers: 89000,
    cottonFarmers: 45000,
  },
  {
    state: "Haryana",
    wheat: 3.9,
    rice: 3.5,
    cotton: 1.8,
    predicted: 4.1,
    actual: 3.9,
    wheatFarmers: 98000,
    riceFarmers: 67000,
    cottonFarmers: 34000,
  },
  {
    state: "UP",
    wheat: 3.2,
    rice: 2.9,
    cotton: 1.5,
    predicted: 3.4,
    actual: 3.2,
    wheatFarmers: 245000,
    riceFarmers: 189000,
    cottonFarmers: 78000,
  },
  {
    state: "MP",
    wheat: 2.8,
    rice: 2.5,
    cotton: 1.3,
    predicted: 3.0,
    actual: 2.8,
    wheatFarmers: 156000,
    riceFarmers: 123000,
    cottonFarmers: 67000,
  },
  {
    state: "Rajasthan",
    wheat: 2.5,
    rice: 2.2,
    cotton: 1.1,
    predicted: 2.7,
    actual: 2.5,
    wheatFarmers: 89000,
    riceFarmers: 45000,
    cottonFarmers: 56000,
  },
]

// Mock registered crops data from the crop registration system
const registeredCrops = [
  {
    id: 1,
    name: "Wheat - Field A",
    type: "wheat",
    plantingDate: "2024-01-15",
    harvestDate: "2024-05-15",
    currentDay: 45,
    landArea: 5.2,
    location: "Punjab",
    soilType: "Loamy",
  },
  {
    id: 2,
    name: "Rice - Field B",
    type: "rice",
    plantingDate: "2024-02-01",
    harvestDate: "2024-06-01",
    currentDay: 28,
    landArea: 4.8,
    location: "Punjab",
    soilType: "Clay",
  },
  {
    id: 3,
    name: "Cotton - Field C",
    type: "cotton",
    plantingDate: "2024-03-01",
    harvestDate: "2024-08-01",
    currentDay: 10,
    landArea: 2.5,
    location: "Punjab",
    soilType: "Sandy Loam",
  },
]

const districtData = [
  { district: "Ludhiana", area: 2450, yield: 4.2, prediction: 4.5, accuracy: 94 },
  { district: "Amritsar", area: 1890, yield: 3.9, prediction: 4.1, accuracy: 92 },
  { district: "Patiala", area: 1650, yield: 3.8, prediction: 4.0, accuracy: 95 },
  { district: "Jalandhar", area: 1200, yield: 3.6, prediction: 3.8, accuracy: 91 },
]

const getCropData = (crop: string) => {
  switch (crop) {
    case "wheat":
      return wheatPredictionData
    case "rice":
      return ricePredictionData
    case "cotton":
      return cottonPredictionData
    default:
      return wheatPredictionData
  }
}

const getRegisteredCropPrediction = (cropId: number, cropType: string) => {
  const baseData = getCropData(cropType)
  // Personalize predictions based on crop-specific factors
  return baseData.map((data, index) => ({
    ...data,
    // Adjust predictions based on specific crop conditions
    predicted: data.predicted * (cropId === 1 ? 1.1 : cropId === 2 ? 0.95 : 0.85),
    confidence: data.confidence * (cropId === 1 ? 1.02 : cropId === 2 ? 0.98 : 0.92),
  }))
}

export function PredictionDashboard() {
  const [selectedCrop, setSelectedCrop] = useState("wheat")
  const [selectedView, setSelectedView] = useState("my-crops")
  const [selectedRegisteredCrop, setSelectedRegisteredCrop] = useState<number | null>(null)

  const getCurrentPrediction = () => {
    const data = getCropData(selectedCrop)
    const latest = data[data.length - 1]
    return {
      yield: latest.predicted,
      confidence: latest.confidence,
      trend: latest.predicted > data[data.length - 2].predicted ? "up" : "down",
    }
  }

  const prediction = getCurrentPrediction()

  const getCropFarmers = (crop: string) => {
    const farmerKey = `${crop}Farmers` as keyof (typeof stateComparisonData)[0]
    return stateComparisonData.map((state) => ({
      state: state.state,
      farmers: state[farmerKey] as number,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-800">Prediction Dashboard</h1>
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span className="text-sm font-medium">AI-Powered</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{prediction.yield.toFixed(1)}</div>
                <p className="text-sm text-muted-foreground">Predicted Yield (t/ha)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">{prediction.confidence}%</div>
                <p className="text-sm text-muted-foreground">Confidence Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{prediction.trend === "up" ? "↗" : "↘"} 12%</div>
                <p className="text-sm text-muted-foreground">Trend vs Last Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">3</div>
                <p className="text-sm text-muted-foreground">Risk Factors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedView} onValueChange={setSelectedView} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-crops" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            My Crop Predictions
          </TabsTrigger>
          <TabsTrigger value="state-data" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            State Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-crops" className="space-y-6 mt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800">Individual Crop Predictions</h3>
            <p className="text-sm text-muted-foreground">
              View personalized yield predictions for each of your registered crops
            </p>
          </div>

          <div className="space-y-6">
            {registeredCrops.map((crop) => {
              const cropPredictionData = getRegisteredCropPrediction(crop.id, crop.type)
              const latestPrediction = cropPredictionData[cropPredictionData.length - 1]
              const previousPrediction = cropPredictionData[cropPredictionData.length - 2]
              const trend = latestPrediction.predicted > previousPrediction.predicted ? "up" : "down"

              return (
                <Card key={crop.id} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          {crop.name}
                        </CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Area: {crop.landArea} ha</span>
                          <span>Day {crop.currentDay}</span>
                          <span>{crop.location}</span>
                          <span>{crop.soilType} soil</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {latestPrediction.predicted.toFixed(1)} t/ha
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {latestPrediction.confidence.toFixed(0)}% confidence
                        </div>
                        <Badge
                          variant="secondary"
                          className={trend === "up" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                        >
                          {trend === "up" ? "↗" : "↘"} Trending {trend}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={cropPredictionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="confidence"
                            stroke="#8b5cf6"
                            fill="#8b5cf6"
                            fillOpacity={0.1}
                            name="Confidence %"
                          />
                          <Line
                            type="monotone"
                            dataKey="predicted"
                            stroke="#16a34a"
                            strokeWidth={3}
                            name="Predicted Yield (t/ha)"
                          />
                          <Line
                            type="monotone"
                            dataKey="actual"
                            stroke="#dc2626"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Actual Yield (t/ha)"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-semibold text-green-700">
                          {(latestPrediction.predicted * crop.landArea).toFixed(1)} tons
                        </div>
                        <div className="text-sm text-muted-foreground">Expected total yield</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-semibold text-blue-700">
                          {Math.max(
                            0,
                            Math.ceil(
                              (new Date(crop.harvestDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                            ),
                          )}{" "}
                          days
                        </div>
                        <div className="text-sm text-muted-foreground">Until harvest</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg font-semibold text-purple-700">
                          {crop.type === "wheat" ? "High" : crop.type === "rice" ? "Medium" : "Low"}
                        </div>
                        <div className="text-sm text-muted-foreground">Market demand</div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">AI Recommendations for {crop.name}:</h4>
                      <div className="space-y-1 text-sm">
                        {crop.type === "wheat" && (
                          <>
                            <p>• Apply nitrogen fertilizer in the next 5-7 days for optimal grain filling</p>
                            <p>• Monitor for rust diseases due to current weather conditions</p>
                            <p>• Consider early harvest if weather forecast shows heavy rains</p>
                          </>
                        )}
                        {crop.type === "rice" && (
                          <>
                            <p>• Maintain water level at 2-3 cm for optimal tillering</p>
                            <p>• Apply potassium fertilizer to improve grain quality</p>
                            <p>• Watch for brown planthopper activity in current conditions</p>
                          </>
                        )}
                        {crop.type === "cotton" && (
                          <>
                            <p>• Early stage - focus on root development with phosphorus</p>
                            <p>• Monitor soil moisture levels closely during establishment</p>
                            <p>• Prepare for bollworm management in coming weeks</p>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                All Crops Summary Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={registeredCrops.map((crop) => {
                      const prediction = getRegisteredCropPrediction(crop.id, crop.type)
                      const latest = prediction[prediction.length - 1]
                      return {
                        name: crop.name,
                        predicted: latest.predicted,
                        totalYield: latest.predicted * crop.landArea,
                        confidence: latest.confidence,
                        area: crop.landArea,
                      }
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="predicted" fill="#16a34a" name="Predicted Yield (t/ha)" />
                    <Bar dataKey="totalYield" fill="#3b82f6" name="Total Expected Yield (tons)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {registeredCrops
                      .reduce((sum, crop) => {
                        const prediction = getRegisteredCropPrediction(crop.id, crop.type)
                        const latest = prediction[prediction.length - 1]
                        return sum + latest.predicted * crop.landArea
                      }, 0)
                      .toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Expected Yield (tons)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {registeredCrops.reduce((sum, crop) => sum + crop.landArea, 0).toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Land Area (ha)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {(
                      registeredCrops.reduce((sum, crop) => {
                        const prediction = getRegisteredCropPrediction(crop.id, crop.type)
                        const latest = prediction[prediction.length - 1]
                        return sum + latest.confidence
                      }, 0) / registeredCrops.length
                    ).toFixed(0)}
                    %
                  </div>
                  <div className="text-sm text-muted-foreground">Average Confidence</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="state-data" className="space-y-6 mt-6">
          {/* Crop Distribution by State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Crop Distribution by State
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {stateComparisonData.map((state, index) => {
                  const cropDistribution = [
                    { name: "Wheat", value: state.wheatFarmers, fill: "#f59e0b" },
                    { name: "Rice", value: state.riceFarmers, fill: "#16a34a" },
                    { name: "Cotton", value: state.cottonFarmers, fill: "#3b82f6" },
                  ]
                  const totalFarmers = state.wheatFarmers + state.riceFarmers + state.cottonFarmers

                  return (
                    <div key={index} className="text-center">
                      <h4 className="font-medium mb-3">{state.state}</h4>
                      <div className="h-40 mb-3">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={cropDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={25}
                              outerRadius={60}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {cropDistribution.map((entry, idx) => (
                                <Cell key={`cell-${idx}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [value.toLocaleString(), "Farmers"]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-amber-500 rounded"></div>
                            <span>Wheat</span>
                          </div>
                          <span className="font-medium">{((state.wheatFarmers / totalFarmers) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-600 rounded"></div>
                            <span>Rice</span>
                          </div>
                          <span className="font-medium">{((state.riceFarmers / totalFarmers) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-600 rounded"></div>
                            <span>Cotton</span>
                          </div>
                          <span className="font-medium">
                            {((state.cottonFarmers / totalFarmers) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="pt-1 border-t border-gray-200 mt-2">
                          <span className="font-semibold text-gray-700">{totalFarmers.toLocaleString()} Total</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* State Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                State-wise Yield Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="predicted" fill="#16a34a" name="Predicted Yield (t/ha)" />
                    <Bar dataKey="actual" fill="#3b82f6" name="Actual Yield (t/ha)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">
                  Number of Farmers Cultivating {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} by State
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {getCropFarmers(selectedCrop).map((state, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-lg text-green-700">{state.farmers.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{state.state}</div>
                      <div className="text-xs text-muted-foreground mt-1">farmers</div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <div className="text-2xl font-bold text-green-600">
                    {getCropFarmers(selectedCrop)
                      .reduce((sum, state) => sum + state.farmers, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} Farmers Across All States
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Crop Yield Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                All Crops Yield Comparison by State
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="wheat" fill="#f59e0b" name="Wheat Yield (t/ha)" />
                    <Bar dataKey="rice" fill="#16a34a" name="Rice Yield (t/ha)" />
                    <Bar dataKey="cotton" fill="#3b82f6" name="Cotton Yield (t/ha)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded"></div>
                  <span>Wheat Yield</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span>Rice Yield</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span>Cotton Yield</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Crop Farmer Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Farmer Distribution by Crop & State
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value.toLocaleString(), "Farmers"]} />
                    <Bar dataKey="wheatFarmers" fill="#f59e0b" name="Wheat Farmers" />
                    <Bar dataKey="riceFarmers" fill="#16a34a" name="Rice Farmers" />
                    <Bar dataKey="cottonFarmers" fill="#3b82f6" name="Cotton Farmers" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded"></div>
                  <span>Wheat Farmers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span>Rice Farmers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span>Cotton Farmers</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Crop Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Crop & Farmer Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Wheat Statistics */}
                <div>
                  <h4 className="font-medium text-amber-700 mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded"></div>
                    Wheat Cultivation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {stateComparisonData.map((state, index) => (
                      <div key={index} className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <div className="font-semibold text-lg text-amber-700">
                          {state.wheatFarmers.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">{state.state}</div>
                        <div className="text-xs text-amber-600 mt-1">{state.wheat} t/ha avg yield</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-3">
                    <span className="text-xl font-bold text-amber-600">
                      {stateComparisonData.reduce((sum, state) => sum + state.wheatFarmers, 0).toLocaleString()} Total
                      Wheat Farmers
                    </span>
                  </div>
                </div>

                {/* Rice Statistics */}
                <div>
                  <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded"></div>
                    Rice Cultivation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {stateComparisonData.map((state, index) => (
                      <div key={index} className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="font-semibold text-lg text-green-700">{state.riceFarmers.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{state.state}</div>
                        <div className="text-xs text-green-600 mt-1">{state.rice} t/ha avg yield</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-3">
                    <span className="text-xl font-bold text-green-600">
                      {stateComparisonData.reduce((sum, state) => sum + state.riceFarmers, 0).toLocaleString()} Total
                      Rice Farmers
                    </span>
                  </div>
                </div>

                {/* Cotton Statistics */}
                <div>
                  <h4 className="font-medium text-blue-700 mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                    Cotton Cultivation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {stateComparisonData.map((state, index) => (
                      <div key={index} className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="font-semibold text-lg text-blue-700">
                          {state.cottonFarmers.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">{state.state}</div>
                        <div className="text-xs text-blue-600 mt-1">{state.cotton} t/ha avg yield</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-3">
                    <span className="text-xl font-bold text-blue-600">
                      {stateComparisonData.reduce((sum, state) => sum + state.cottonFarmers, 0).toLocaleString()} Total
                      Cotton Farmers
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* District Level Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>District-wise Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {districtData.map((district, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{district.district}</h4>
                      <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Area: {district.area.toLocaleString()} ha</span>
                        <span>Yield: {district.yield} t/ha</span>
                        <span>Predicted: {district.prediction} t/ha</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="secondary"
                        className={
                          district.accuracy >= 95
                            ? "bg-green-100 text-green-800"
                            : district.accuracy >= 90
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {district.accuracy}% Accuracy
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actual vs Predicted Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Actual vs Predicted Yield Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={stateComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="actual" fill="#3b82f6" name="Actual Yield" />
                    <Line type="monotone" dataKey="predicted" stroke="#16a34a" strokeWidth={3} name="Predicted Yield" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Model shows 92.8% accuracy across all states with consistent performance
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
