"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SocialMediaFeed } from "@/components/social-media-feed"
import { MyCropData } from "@/components/my-crop-data"
import { PredictionDashboard } from "@/components/prediction-dashboard"

export function HomePage() {
  const [activeTab, setActiveTab] = useState("social")

  const renderContent = () => {
    switch (activeTab) {
      case "crop-data":
        return <MyCropData />
      case "social":
        return <SocialMediaFeed />
      case "prediction":
        return <PredictionDashboard />
      default:
        return <SocialMediaFeed />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6">{renderContent()}</div>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
