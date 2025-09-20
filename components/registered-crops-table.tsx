"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Camera, Edit, MapPin, Calendar, Sprout } from "lucide-react"

interface RegisteredCropsTableProps {
  onBack: () => void
}

const mockCrops = [
  {
    id: 1,
    name: "Wheat - Field A",
    farmerName: "Rajesh Kumar",
    state: "Punjab",
    landArea: "2.5",
    soilFertility: "High",
    season: "Rabi (Winter)",
    cropType: "Wheat",
    plantingDate: "2024-01-15",
    harvestDate: "2024-05-15",
    currentDay: 45,
    soilPhoto: "/soil-sample.jpg",
    dailyEntries: [
      {
        day: 1,
        fertilizer: "NPK",
        fertilizerQty: "50kg",
        pesticide: "",
        pesticideQty: "",
        work: "Soil preparation",
        yield: 0,
      },
      { day: 2, fertilizer: "", fertilizerQty: "", pesticide: "", pesticideQty: "", work: "Seeding", yield: 0 },
      {
        day: 45,
        fertilizer: "Urea",
        fertilizerQty: "25kg",
        pesticide: "Insecticide",
        pesticideQty: "2L",
        work: "Weeding",
        yield: 0,
      },
    ],
  },
  {
    id: 2,
    name: "Rice - Field B",
    farmerName: "Suresh Patel",
    state: "Haryana",
    landArea: "3.2",
    soilFertility: "Medium",
    season: "Kharif (Monsoon)",
    cropType: "Rice",
    plantingDate: "2024-02-01",
    harvestDate: "2024-06-01",
    currentDay: 28,
    soilPhoto: "/rice-field-soil.jpg",
    dailyEntries: [
      {
        day: 1,
        fertilizer: "DAP",
        fertilizerQty: "40kg",
        pesticide: "",
        pesticideQty: "",
        work: "Transplanting",
        yield: 0,
      },
      {
        day: 28,
        fertilizer: "",
        fertilizerQty: "",
        pesticide: "Fungicide",
        pesticideQty: "1.5L",
        work: "Water management",
        yield: 0,
      },
    ],
  },
  {
    id: 3,
    name: "Cotton - Field C",
    farmerName: "Amit Singh",
    state: "Madhya Pradesh",
    landArea: "1.8",
    soilFertility: "Medium",
    season: "Kharif (Monsoon)",
    cropType: "Cotton",
    plantingDate: "2024-01-20",
    harvestDate: "2024-07-20",
    currentDay: 60,
    soilPhoto: "/cotton-field-soil.jpg",
    dailyEntries: [
      {
        day: 1,
        fertilizer: "Complex",
        fertilizerQty: "30kg",
        pesticide: "",
        pesticideQty: "",
        work: "Sowing",
        yield: 0,
      },
      {
        day: 30,
        fertilizer: "Urea",
        fertilizerQty: "20kg",
        pesticide: "Bollworm spray",
        pesticideQty: "1L",
        work: "Pest control",
        yield: 0,
      },
      {
        day: 60,
        fertilizer: "",
        fertilizerQty: "",
        pesticide: "",
        pesticideQty: "",
        work: "Flowering stage monitoring",
        yield: 0,
      },
    ],
  },
]

export function RegisteredCropsTable({ onBack }: RegisteredCropsTableProps) {
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null)
  const [newEntry, setNewEntry] = useState({
    day: "",
    fertilizer: "",
    fertilizerQty: "",
    pesticide: "",
    pesticideQty: "",
    work: "",
    yield: "",
  })

  const handleAddEntry = (cropId: number) => {
    console.log("Adding entry for crop:", cropId, newEntry)
    // Reset form
    setNewEntry({
      day: "",
      fertilizer: "",
      fertilizerQty: "",
      pesticide: "",
      pesticideQty: "",
      work: "",
      yield: "",
    })
  }

  if (selectedCrop) {
    const crop = mockCrops.find((c) => c.id === selectedCrop)
    if (!crop) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setSelectedCrop(null)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">{crop.name}</h2>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Day {crop.currentDay}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5" />
              Crop Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Farmer Name</p>
                  <p className="text-lg font-semibold">{crop.farmerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Crop Type</p>
                  <Badge variant="outline" className="text-sm">
                    {crop.cropType}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Location
                  </p>
                  <p className="text-lg">{crop.state}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Land Area</p>
                  <p className="text-lg">{crop.landArea} Hectares</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Season</p>
                  <p className="text-lg">{crop.season}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Soil Fertility</p>
                  <Badge
                    variant="outline"
                    className={`text-sm ${
                      crop.soilFertility === "High"
                        ? "bg-green-100 text-green-800"
                        : crop.soilFertility === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {crop.soilFertility}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-2">
                  <Calendar className="h-4 w-4" />
                  Important Dates
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Planting Date:</span>
                    <span className="font-medium">{new Date(crop.plantingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Harvest:</span>
                    <span className="font-medium">{new Date(crop.harvestDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Soil Photo</p>
                <img
                  src={crop.soilPhoto || "/placeholder.svg"}
                  alt="Soil sample"
                  className="w-24 h-24 rounded-lg object-cover border"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{crop.currentDay}</div>
              <p className="text-sm text-muted-foreground">Days since planting</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {Math.max(
                  0,
                  Math.ceil((new Date(crop.harvestDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
                )}
              </div>
              <p className="text-sm text-muted-foreground">Days to harvest</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">{crop.dailyEntries.length}</div>
              <p className="text-sm text-muted-foreground">Total entries</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="entries" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="entries">Daily Entries</TabsTrigger>
            <TabsTrigger value="add">Add Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="entries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {crop.dailyEntries.map((entry, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="outline">Day {entry.day}</Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Fertilizer Used:</p>
                          <p>
                            {entry.fertilizer || "None"} {entry.fertilizerQty && `(${entry.fertilizerQty})`}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Pesticide Used:</p>
                          <p>
                            {entry.pesticide || "None"} {entry.pesticideQty && `(${entry.pesticideQty})`}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="font-medium">Work Done:</p>
                          <p>{entry.work}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Daily Entry</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="day">Day</Label>
                      <Input
                        id="day"
                        type="number"
                        value={newEntry.day}
                        onChange={(e) => setNewEntry((prev) => ({ ...prev, day: e.target.value }))}
                        placeholder="Enter day number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yield">Yield (kg)</Label>
                      <Input
                        id="yield"
                        type="number"
                        step="0.1"
                        value={newEntry.yield}
                        onChange={(e) => setNewEntry((prev) => ({ ...prev, yield: e.target.value }))}
                        placeholder="Enter yield if any"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fertilizer">Fertilizer Name</Label>
                      <Input
                        id="fertilizer"
                        value={newEntry.fertilizer}
                        onChange={(e) => setNewEntry((prev) => ({ ...prev, fertilizer: e.target.value }))}
                        placeholder="e.g., NPK, Urea"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fertilizerQty">Fertilizer Quantity</Label>
                      <Input
                        id="fertilizerQty"
                        value={newEntry.fertilizerQty}
                        onChange={(e) => setNewEntry((prev) => ({ ...prev, fertilizerQty: e.target.value }))}
                        placeholder="e.g., 50kg, 2L"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pesticide">Pesticide Name</Label>
                      <Input
                        id="pesticide"
                        value={newEntry.pesticide}
                        onChange={(e) => setNewEntry((prev) => ({ ...prev, pesticide: e.target.value }))}
                        placeholder="e.g., Insecticide, Fungicide"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pesticideQty">Pesticide Quantity</Label>
                      <Input
                        id="pesticideQty"
                        value={newEntry.pesticideQty}
                        onChange={(e) => setNewEntry((prev) => ({ ...prev, pesticideQty: e.target.value }))}
                        placeholder="e.g., 1L, 500ml"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="work">Work Done</Label>
                    <Input
                      id="work"
                      value={newEntry.work}
                      onChange={(e) => setNewEntry((prev) => ({ ...prev, work: e.target.value }))}
                      placeholder="e.g., Soil plugging, Weeding, Irrigation"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Photos (Optional)</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Fertilizer Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Pesticide Photo
                      </Button>
                    </div>
                  </div>

                  <Button onClick={() => handleAddEntry(crop.id)} className="w-full bg-green-600 hover:bg-green-700">
                    Add Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Registered Crops</h2>
      </div>

      <div className="grid gap-4">
        {mockCrops.map((crop) => (
          <Card key={crop.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{crop.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                    <div>
                      <p>
                        <span className="font-medium">Farmer:</span> {crop.farmerName}
                      </p>
                      <p>
                        <span className="font-medium">State:</span> {crop.state}
                      </p>
                      <p>
                        <span className="font-medium">Land Area:</span> {crop.landArea} hectares
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">Season:</span> {crop.season}
                      </p>
                      <p>
                        <span className="font-medium">Soil Fertility:</span> {crop.soilFertility}
                      </p>
                      <p>
                        <span className="font-medium">Current Day:</span> {crop.currentDay}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline">{crop.cropType}</Badge>
                    <Badge
                      variant="outline"
                      className={`${
                        crop.soilFertility === "High"
                          ? "bg-green-100 text-green-800"
                          : crop.soilFertility === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {crop.soilFertility} Fertility
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <p>Planted: {new Date(crop.plantingDate).toLocaleDateString()}</p>
                      <p>Harvest: {new Date(crop.harvestDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p>Entries: {crop.dailyEntries.length}</p>
                      <p>
                        Days to harvest:{" "}
                        {Math.max(
                          0,
                          Math.ceil(
                            (new Date(crop.harvestDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                          ),
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Day {crop.currentDay}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => setSelectedCrop(crop.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
