"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, List, AlertTriangle } from "lucide-react"
import { CropRegistrationForm } from "@/components/crop-registration-form"
import { RegisteredCropsTable } from "@/components/registered-crops-table"
import { AISuggestions } from "@/components/ai-suggestions"

export function MyCropData() {
  const [activeView, setActiveView] = useState("overview")

  const renderContent = () => {
    switch (activeView) {
      case "registration":
        return <CropRegistrationForm onBack={() => setActiveView("overview")} />
      case "crops":
        return <RegisteredCropsTable onBack={() => setActiveView("overview")} />
      case "suggestions":
        return <AISuggestions onBack={() => setActiveView("overview")} />
      default:
        return (
          <div className="space-y-6">
            {/* Top Navigation Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 h-12 bg-transparent"
                onClick={() => setActiveView("registration")}
              >
                <Plus className="h-4 w-4" />
                Crop Registration
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 h-12 bg-transparent"
                onClick={() => setActiveView("crops")}
              >
                <List className="h-4 w-4" />
                Registered Crops
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 h-12 bg-transparent"
                onClick={() => setActiveView("suggestions")}
              >
                <AlertTriangle className="h-4 w-4" />
                Suggestions
              </Button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Active Crops</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                  <p className="text-sm text-muted-foreground">Currently registered and tracking</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Total Land Area</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">12.5</div>
                  <p className="text-sm text-muted-foreground">Hectares under cultivation</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Fertilizer applied to Wheat - Field A</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Daily yield recorded for Rice - Field B</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-800">My Crop Data</h1>
      </div>

      {renderContent()}
    </div>
  )
}
