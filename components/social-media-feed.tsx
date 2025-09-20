"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import {
  Cloud,
  DollarSign,
  FileText,
  Lightbulb,
  Sun,
  CloudRain,
  Heart,
  MessageCircle,
  Share2,
  Send,
  User,
  TrendingUp,
  MapPin,
} from "lucide-react"

const cropsOverviewData = [
  { crop: "Wheat", area: 4.5, status: "Growing" },
  { crop: "Rice", area: 3.2, status: "Planted" },
  { crop: "Cotton", area: 2.8, status: "Harvested" },
]

const marketTrendData = [
  { day: "Mon", wheat: 2100, rice: 1850, cotton: 5100 },
  { day: "Tue", wheat: 2120, rice: 1870, cotton: 5150 },
  { day: "Wed", wheat: 2140, rice: 1880, cotton: 5180 },
  { day: "Thu", wheat: 2150, rice: 1890, cotton: 5200 },
  { day: "Fri", wheat: 2150, rice: 1890, cotton: 5200 },
]

const govtSchemeData = [
  { scheme: "PM-KISAN", beneficiaries: 11.2, funds: 22400 },
  { scheme: "Crop Insurance", beneficiaries: 8.5, funds: 15600 },
  { scheme: "Soil Health", beneficiaries: 6.8, funds: 8900 },
]

export function SocialMediaFeed() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [chatMessage, setChatMessage] = useState("")
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-800">Social Feed</h1>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-green-600" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            My Registered Crops Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropsOverviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="area" fill="#16a34a" name="Area (hectares)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {cropsOverviewData.map((crop, index) => (
              <div key={index} className="text-center">
                <p className="font-medium">{crop.crop}</p>
                <p className="text-muted-foreground">{crop.area} ha</p>
                <Badge variant="secondary" className="text-xs">
                  {crop.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            All
          </TabsTrigger>
          <TabsTrigger value="weather" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            Weather
          </TabsTrigger>
          <TabsTrigger value="market" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Market
          </TabsTrigger>
          <TabsTrigger value="schemes" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Schemes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {/* Weather Alert Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-lg">Weather Alert</CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Safe
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Today: Sunny, 28°C</p>
              <p className="text-sm mb-3">Perfect weather for field work. Good time for pesticide application.</p>
              <div className="flex items-center gap-4 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(1)}
                  className={likedPosts.includes(1) ? "text-red-500" : ""}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  {likedPosts.includes(1) ? "24" : "23"}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />5
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Government Scheme Card with Chart */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">PM-KISAN Update</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">New installment of ₹2,000 credited to eligible farmers</p>
              <div className="h-32 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={govtSchemeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="scheme" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="beneficiaries" fill="#3b82f6" name="Beneficiaries (Cr)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg mb-3">
                <p className="text-xs text-blue-700">Beneficiaries: 11.2 Cr farmers</p>
                <p className="text-xs text-blue-700">Total Fund: ₹22,400 Cr</p>
              </div>
              <div className="flex items-center gap-4 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(2)}
                  className={likedPosts.includes(2) ? "text-red-500" : ""}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  {likedPosts.includes(2) ? "46" : "45"}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  12
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Market Prices Card with Trend Chart */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <CardTitle className="text-lg">Market Prices - Weekly Trend</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="wheat" stroke="#16a34a" name="Wheat (₹/quintal)" />
                    <Line type="monotone" dataKey="rice" stroke="#3b82f6" name="Rice (₹/quintal)" />
                    <Line type="monotone" dataKey="cotton" stroke="#f59e0b" name="Cotton (₹/quintal)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Wheat</span>
                  <span className="text-sm font-medium text-green-600">₹2,150/quintal ↑</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rice</span>
                  <span className="text-sm font-medium text-red-600">₹1,890/quintal ↓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cotton</span>
                  <span className="text-sm font-medium text-green-600">₹5,200/quintal ↑</span>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(3)}
                  className={likedPosts.includes(3) ? "text-red-500" : ""}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  {likedPosts.includes(3) ? "32" : "31"}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />8
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced User Post Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-700">RK</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Raj Kumar</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>2 hours ago</span>
                    <MapPin className="h-3 w-3" />
                    <span>Punjab, India</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">
                Great harvest this season! My wheat yield increased by 15% using organic fertilizers. Here's what worked
                for me: NPK application at tillering stage and proper water management.
              </p>
              <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center mb-3">
                <span className="text-sm text-muted-foreground">Harvest Photo</span>
              </div>
              <div className="flex items-center gap-4 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(4)}
                  className={likedPosts.includes(4) ? "text-red-500" : ""}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  {likedPosts.includes(4) ? "67" : "66"}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  23
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Rain Alert Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">Rain Alert</CardTitle>
                <Badge variant="destructive" className="bg-orange-100 text-orange-800">
                  Moderate
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">Heavy rain expected tomorrow. Avoid pesticide spraying for next 2 days.</p>
              <div className="bg-orange-50 p-3 rounded-lg mb-3">
                <p className="text-xs text-orange-700">Rainfall: 25-40mm expected</p>
                <p className="text-xs text-orange-700">Wind Speed: 15-20 km/h</p>
                <p className="text-xs text-orange-700">Duration: 6-8 hours</p>
              </div>
              <div className="flex items-center gap-4 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(5)}
                  className={likedPosts.includes(5) ? "text-red-500" : ""}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  {likedPosts.includes(5) ? "19" : "18"}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />7
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Today</p>
                  <p className="text-xs text-muted-foreground">28°C, Sunny</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <CloudRain className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Tomorrow</p>
                  <p className="text-xs text-muted-foreground">24°C, Rainy</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Cloud className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Day 3</p>
                  <p className="text-xs text-muted-foreground">26°C, Cloudy</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Day 4</p>
                  <p className="text-xs text-muted-foreground">30°C, Sunny</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>District-wise Market Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">Ludhiana Mandi</p>
                    <p className="text-sm text-muted-foreground">Wheat: ₹2,180/quintal</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+2.3%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Amritsar Mandi</p>
                    <p className="text-sm text-muted-foreground">Rice: ₹1,920/quintal</p>
                  </div>
                  <Badge className="bg-red-100 text-red-800">-1.5%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schemes" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Government Schemes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Pradhan Mantri Fasal Bima Yojana</h4>
                  <p className="text-sm text-muted-foreground mb-2">Crop insurance scheme for farmers</p>
                  <Button size="sm" variant="outline">
                    Apply Now
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Soil Health Card Scheme</h4>
                  <p className="text-sm text-muted-foreground mb-2">Get your soil tested for free</p>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Community Chat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4 max-h-32 overflow-y-auto">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-blue-700">SK</span>
              </div>
              <div className="flex-1">
                <p className="text-sm">Anyone tried organic pesticides this season?</p>
                <p className="text-xs text-muted-foreground">5 min ago</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-green-700">MK</span>
              </div>
              <div className="flex-1">
                <p className="text-sm">Yes! Neem oil worked great for my cotton crop.</p>
                <p className="text-xs text-muted-foreground">3 min ago</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1"
            />
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
