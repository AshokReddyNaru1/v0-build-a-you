"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Leaf, CloudRain, Droplets, TrendingUp, Calendar, MapPin } from "lucide-react"

interface PredictionData {
  crop: string
  area: number
  expectedYield: number
  confidence: number
  factors: {
    weather: number
    soil: number
    irrigation: number
    fertilizer: number
  }
}

const historicalData = [
  { year: "2020", yield: 4.2, rainfall: 850 },
  { year: "2021", yield: 3.8, rainfall: 720 },
  { year: "2022", yield: 4.6, rainfall: 920 },
  { year: "2023", yield: 4.1, rainfall: 780 },
  { year: "2024", yield: 4.4, rainfall: 860 },
]

const factorData = [
  { factor: "Weather", impact: 85, color: "#8b5cf6" },
  { factor: "Soil Quality", impact: 78, color: "#06d6a0" },
  { factor: "Irrigation", impact: 72, color: "#ffd166" },
  { factor: "Fertilizer", impact: 68, color: "#f72585" },
]

export function CropYieldPredictor() {
  const [formData, setFormData] = useState({
    crop: "",
    area: "",
    soilType: "",
    rainfall: "",
    temperature: "",
    humidity: "",
    fertilizer: "",
    irrigation: "",
    location: "",
  })

  const [prediction, setPrediction] = useState<PredictionData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculatePrediction = async () => {
    setIsLoading(true)

    // Simulate API call with realistic calculation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const area = Number.parseFloat(formData.area) || 0
    const rainfall = Number.parseFloat(formData.rainfall) || 0
    const temperature = Number.parseFloat(formData.temperature) || 0
    const humidity = Number.parseFloat(formData.humidity) || 0

    // Simple yield calculation based on inputs
    let baseYield = 4.0 // tons per hectare

    // Weather factors
    if (rainfall >= 800 && rainfall <= 1000) baseYield += 0.5
    else if (rainfall < 600 || rainfall > 1200) baseYield -= 0.3

    if (temperature >= 20 && temperature <= 28) baseYield += 0.3
    else if (temperature < 15 || temperature > 35) baseYield -= 0.4

    if (humidity >= 60 && humidity <= 80) baseYield += 0.2
    else if (humidity < 40 || humidity > 90) baseYield -= 0.2

    // Soil and management factors
    if (formData.soilType === "loamy") baseYield += 0.4
    else if (formData.soilType === "clay") baseYield += 0.1
    else if (formData.soilType === "sandy") baseYield -= 0.2

    if (formData.fertilizer === "organic") baseYield += 0.3
    else if (formData.fertilizer === "chemical") baseYield += 0.2

    if (formData.irrigation === "drip") baseYield += 0.4
    else if (formData.irrigation === "sprinkler") baseYield += 0.2

    const expectedYield = Math.max(1.0, baseYield)
    const confidence = Math.min(95, Math.max(65, 85 - Math.abs(4.0 - expectedYield) * 10))

    setPrediction({
      crop: formData.crop,
      area,
      expectedYield: expectedYield * area,
      confidence,
      factors: {
        weather: Math.min(100, Math.max(50, 85 - Math.abs(rainfall - 900) / 20)),
        soil: formData.soilType === "loamy" ? 90 : formData.soilType === "clay" ? 75 : 65,
        irrigation: formData.irrigation === "drip" ? 95 : formData.irrigation === "sprinkler" ? 80 : 60,
        fertilizer: formData.fertilizer === "organic" ? 85 : formData.fertilizer === "chemical" ? 80 : 70,
      },
    })

    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-balance">AgriPredict</h1>
        </div>
        <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
          Advanced crop yield prediction using machine learning and agricultural data analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Farm Details
              </CardTitle>
              <CardDescription>Enter your farm and crop information for accurate predictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="crop">Crop Type</Label>
                <Select value={formData.crop} onValueChange={(value) => handleInputChange("crop", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="corn">Corn</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="soybeans">Soybeans</SelectItem>
                    <SelectItem value="barley">Barley</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Farm Area (hectares)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="e.g., 50"
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Iowa, USA"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="silty">Silty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-5 w-5" />
                Environmental Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rainfall">Expected Rainfall (mm)</Label>
                <Input
                  id="rainfall"
                  type="number"
                  placeholder="e.g., 850"
                  value={formData.rainfall}
                  onChange={(e) => handleInputChange("rainfall", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature">Average Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="e.g., 24"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange("temperature", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  type="number"
                  placeholder="e.g., 70"
                  value={formData.humidity}
                  onChange={(e) => handleInputChange("humidity", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5" />
                Management Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="irrigation">Irrigation Method</Label>
                <Select value={formData.irrigation} onValueChange={(value) => handleInputChange("irrigation", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select irrigation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drip">Drip Irrigation</SelectItem>
                    <SelectItem value="sprinkler">Sprinkler</SelectItem>
                    <SelectItem value="flood">Flood Irrigation</SelectItem>
                    <SelectItem value="rainfed">Rain-fed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fertilizer">Fertilizer Type</Label>
                <Select value={formData.fertilizer} onValueChange={(value) => handleInputChange("fertilizer", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fertilizer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organic">Organic</SelectItem>
                    <SelectItem value="chemical">Chemical</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={calculatePrediction}
                className="w-full"
                disabled={isLoading || !formData.crop || !formData.area}
              >
                {isLoading ? "Calculating..." : "Predict Yield"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results and Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {prediction && (
            <>
              {/* Prediction Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Yield Prediction Results
                  </CardTitle>
                  <CardDescription>Based on your farm data and environmental conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-primary">{prediction.expectedYield.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">Total Tons Expected</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-success">
                        {(prediction.expectedYield / prediction.area).toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Tons per Hectare</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-3xl font-bold">{prediction.confidence}%</div>
                        <Badge variant={prediction.confidence > 80 ? "default" : "secondary"}>
                          {prediction.confidence > 80 ? "High" : "Medium"} Confidence
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Factor Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Impact Factor Analysis</CardTitle>
                  <CardDescription>How different factors affect your predicted yield</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(prediction.factors).map(([factor, score]) => (
                      <div key={factor} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="capitalize font-medium">{factor}</span>
                          <span className="text-sm font-medium">{score}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Historical Data Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Historical Yield Trends
              </CardTitle>
              <CardDescription>Regional yield performance over the past 5 years</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="year" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="yield"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Factor Impact Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Key Success Factors</CardTitle>
              <CardDescription>Critical factors that influence crop yield in your region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={factorData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" domain={[0, 100]} className="text-muted-foreground" />
                    <YAxis dataKey="factor" type="category" width={100} className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="impact" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
