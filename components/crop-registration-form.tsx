"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Camera } from "lucide-react"

interface CropRegistrationFormProps {
  onBack: () => void
}

export function CropRegistrationForm({ onBack }: CropRegistrationFormProps) {
  const [formData, setFormData] = useState({
    farmerName: "",
    state: "",
    landArea: "",
    soilFertility: "",
    season: "",
    cropType: "",
    plantingDate: "",
    harvestDate: "",
    soilPhoto: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    onBack()
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, soilPhoto: file }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Crop Registration</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Register New Crop</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmerName">Farmer Name</Label>
                <Input
                  id="farmerName"
                  value={formData.farmerName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, farmerName: e.target.value }))}
                  placeholder="Enter farmer name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="punjab">Punjab</SelectItem>
                    <SelectItem value="haryana">Haryana</SelectItem>
                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="madhya-pradesh">Madhya Pradesh</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="landArea">Land Area (Hectares)</Label>
                <Input
                  id="landArea"
                  type="number"
                  step="0.1"
                  value={formData.landArea}
                  onChange={(e) => setFormData((prev) => ({ ...prev, landArea: e.target.value }))}
                  placeholder="Enter land area"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilFertility">Soil Fertility</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, soilFertility: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil fertility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="season">Season</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, season: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                    <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                    <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, cropType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="barley">Barley</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="plantingDate">Planting Date</Label>
                <Input
                  id="plantingDate"
                  type="date"
                  value={formData.plantingDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, plantingDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="harvestDate">Expected Harvest Date</Label>
                <Input
                  id="harvestDate"
                  type="date"
                  value={formData.harvestDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, harvestDate: e.target.value }))}
                />
              </div>
            </div>

            {/* Soil Photo Upload */}
            <div className="space-y-2">
              <Label>Soil Photo (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="soil-photo" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">Upload soil photo</span>
                      <input
                        id="soil-photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  {formData.soilPhoto && (
                    <p className="mt-2 text-sm text-green-600">File selected: {formData.soilPhoto.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Register Crop
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
