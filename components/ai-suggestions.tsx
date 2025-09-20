"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Droplets,
  Sprout,
  AlertTriangle,
  Thermometer,
  Cloud,
  Volume2,
  VolumeX,
  Languages,
} from "lucide-react"
import { useState } from "react"

interface AISuggestionsProps {
  onBack: () => void
}

export function AISuggestions({ onBack }: AISuggestionsProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [playingAudio, setPlayingAudio] = useState<number | null>(null)
  const [audioEnabled, setAudioEnabled] = useState(true)

  const languages = [
    { value: "english", label: "English", code: "en" },
    { value: "hindi", label: "हिंदी", code: "hi" },
    { value: "punjabi", label: "ਪੰਜਾਬੀ", code: "pa" },
    { value: "marathi", label: "मराठी", code: "mr" },
    { value: "gujarati", label: "ગુજરાતી", code: "gu" },
    { value: "tamil", label: "தமிழ்", code: "ta" },
    { value: "telugu", label: "తెలుగు", code: "te" },
    { value: "kannada", label: "ಕನ್ನಡ", code: "kn" },
  ]

  const getLocalizedContent = (suggestion: any) => {
    const content = {
      english: {
        title: suggestion.title,
        description: suggestion.description,
        details: suggestion.details,
        action: suggestion.action,
      },
      hindi: {
        title:
          suggestion.type === "water"
            ? "कल पानी की जरूरत"
            : suggestion.type === "fertilizer"
              ? "3 दिन में खाद"
              : suggestion.type === "weather"
                ? "बारिश की चेतावनी - कीटनाशक न डालें"
                : suggestion.type === "temperature"
                  ? "तापमान तनाव चेतावनी"
                  : "अनुकूल परिस्थितियां आगे",
        description:
          suggestion.type === "water"
            ? "मिट्टी की नमी और मौसम पूर्वानुमान के आधार पर"
            : suggestion.type === "fertilizer"
              ? "नाइट्रोजन लगाने का सबसे अच्छा समय"
              : "भारी बारिश अगले 48 घंटों में अपेक्षित",
        details:
          suggestion.type === "water"
            ? "मिट्टी की नमी 35% है। धूप के मौसम की उम्मीद के साथ, सिंचाई की सिफारिश की जाती है।"
            : suggestion.type === "fertilizer"
              ? "गेहूं की फसल कल्ले निकलने के चरण में है। नाइट्रोजन का प्रयोग वृद्धि बढ़ाएगा।"
              : "मौसम विभाग के डेटा से भारी बारिश की 80% संभावना है।",
        action:
          suggestion.type === "water"
            ? "सुबह जल्दी सिंचाई करें"
            : suggestion.type === "fertilizer"
              ? "25 किलो यूरिया प्रति हेक्टेयर डालें"
              : "कीटनाशक छिड़काव स्थगित करें",
      },
      punjabi: {
        title:
          suggestion.type === "water"
            ? "ਕੱਲ੍ਹ ਪਾਣੀ ਦੀ ਲੋੜ"
            : suggestion.type === "fertilizer"
              ? "3 ਦਿਨਾਂ ਵਿੱਚ ਖਾਦ"
              : suggestion.type === "weather"
                ? "ਬਰਸਾਤ ਦੀ ਚੇਤਾਵਨੀ - ਕੀੜੇ-ਮਾਰ ਨਾ ਪਾਓ"
                : suggestion.type === "temperature"
                  ? "ਤਾਪਮਾਨ ਤਣਾਅ ਚੇਤਾਵਨੀ"
                  : "ਅਨੁਕੂਲ ਹਾਲਾਤ ਅੱਗੇ",
        description:
          suggestion.type === "water"
            ? "ਮਿੱਟੀ ਦੀ ਨਮੀ ਅਤੇ ਮੌਸਮ ਪੂਰਵ-ਅਨੁਮਾਨ ਦੇ ਆਧਾਰ 'ਤੇ"
            : suggestion.type === "fertilizer"
              ? "ਨਾਈਟ੍ਰੋਜਨ ਲਗਾਉਣ ਦਾ ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ"
              : "ਅਗਲੇ 48 ਘੰਟਿਆਂ ਵਿੱਚ ਭਾਰੀ ਬਰਸਾਤ ਦੀ ਉਮੀਦ",
        details:
          suggestion.type === "water"
            ? "ਮਿੱਟੀ ਦੀ ਨਮੀ 35% ਹੈ। ਧੁੱਪ ਵਾਲੇ ਮੌਸਮ ਦੀ ਉਮੀਦ ਨਾਲ, ਸਿੰਚਾਈ ਦੀ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।"
            : suggestion.type === "fertilizer"
              ? "ਕਣਕ ਦੀ ਫਸਲ ਕਲੇ ਨਿਕਲਣ ਦੇ ਪੜਾਅ ਵਿੱਚ ਹੈ। ਨਾਈਟ੍ਰੋਜਨ ਦਾ ਪ੍ਰਯੋਗ ਵਾਧਾ ਵਧਾਏਗਾ।"
              : "ਮੌਸਮ ਵਿਭਾਗ ਦੇ ਡੇਟਾ ਤੋਂ ਭਾਰੀ ਬਰਸਾਤ ਦੀ 80% ਸੰਭਾਵਨਾ ਹੈ।",
        action:
          suggestion.type === "water"
            ? "ਸਵੇਰੇ ਜਲਦੀ ਸਿੰਚਾਈ ਕਰੋ"
            : suggestion.type === "fertilizer"
              ? "25 ਕਿਲੋ ਯੂਰੀਆ ਪ੍ਰਤੀ ਹੈਕਟੇਅਰ ਪਾਓ"
              : "ਕੀੜੇ-ਮਾਰ ਛਿੜਕਾਅ ਮੁਲਤਵੀ ਕਰੋ",
      },
    }
    return content[selectedLanguage as keyof typeof content] || content.english
  }

  const playVoiceMessage = (suggestionId: number, text: string) => {
    if (!audioEnabled) return

    setPlayingAudio(suggestionId)

    // Use Web Speech API for text-to-speech
    const utterance = new SpeechSynthesisUtterance(text)
    const selectedLang = languages.find((lang) => lang.value === selectedLanguage)
    utterance.lang = selectedLang?.code || "en"
    utterance.rate = 0.8
    utterance.pitch = 1

    utterance.onend = () => {
      setPlayingAudio(null)
    }

    speechSynthesis.speak(utterance)
  }

  const stopAudio = () => {
    speechSynthesis.cancel()
    setPlayingAudio(null)
  }

  const suggestions = [
    {
      id: 1,
      type: "water",
      priority: "high",
      icon: Droplets,
      title: "Water needed tomorrow",
      description: "Based on soil moisture and weather forecast",
      details: "Soil moisture is at 35%. With sunny weather expected, irrigation recommended for optimal growth.",
      action: "Schedule irrigation for early morning",
      color: "blue",
    },
    {
      id: 2,
      type: "fertilizer",
      priority: "medium",
      icon: Sprout,
      title: "Fertilizer in 3 days",
      description: "Optimal time for nitrogen application",
      details: "Wheat crop is entering tillering stage. Nitrogen application will boost growth and yield potential.",
      action: "Apply 25kg Urea per hectare",
      color: "green",
    },
    {
      id: 3,
      type: "weather",
      priority: "high",
      icon: AlertTriangle,
      title: "Rain alert – avoid pesticides",
      description: "Heavy rain expected in next 48 hours",
      details: "Meteorological data shows 80% chance of heavy rainfall. Pesticide application should be postponed.",
      action: "Reschedule pesticide application",
      color: "orange",
    },
    {
      id: 4,
      type: "temperature",
      priority: "low",
      icon: Thermometer,
      title: "Temperature stress warning",
      description: "High temperatures may affect crop growth",
      details: "Temperatures above 35°C expected for next 3 days. Consider additional irrigation and shade management.",
      action: "Monitor crop stress indicators",
      color: "red",
    },
    {
      id: 5,
      type: "climate",
      priority: "medium",
      icon: Cloud,
      title: "Favorable conditions ahead",
      description: "Perfect weather for field operations",
      details:
        "Next week shows ideal conditions with moderate temperatures and low humidity. Good time for field work.",
      action: "Plan field activities",
      color: "green",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getIconColor = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-500"
      case "green":
        return "text-green-500"
      case "orange":
        return "text-orange-500"
      case "red":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">AI Suggestions</h2>
      </div>

      <div className="flex items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-3">
          <Languages className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Language:</span>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Voice Messages:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={audioEnabled ? "text-green-600" : "text-muted-foreground"}
          >
            {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <p className="text-sm text-muted-foreground">Medium Priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">1</div>
            <p className="text-sm text-muted-foreground">Low Priority</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => {
          const Icon = suggestion.icon
          const localizedContent = getLocalizedContent(suggestion)
          const isPlaying = playingAudio === suggestion.id

          return (
            <Card key={suggestion.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${getIconColor(suggestion.color)}`} />
                    <div>
                      <CardTitle className="text-lg">{localizedContent.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{localizedContent.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        isPlaying
                          ? stopAudio()
                          : playVoiceMessage(
                              suggestion.id,
                              `${localizedContent.title}. ${localizedContent.details}. ${localizedContent.action}`,
                            )
                      }
                      disabled={!audioEnabled}
                      className={isPlaying ? "text-green-600" : ""}
                    >
                      {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Badge variant="secondary" className={getPriorityColor(suggestion.priority)}>
                      {suggestion.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">{localizedContent.details}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-green-700">
                      {selectedLanguage === "hindi" ? "सुझाव" : selectedLanguage === "punjabi" ? "ਸਲਾਹ" : "Recommended"}:{" "}
                      {localizedContent.action}
                    </p>
                    <Button size="sm" variant="outline">
                      {selectedLanguage === "hindi"
                        ? "पूरा हुआ"
                        : selectedLanguage === "punjabi"
                          ? "ਪੂਰਾ ਹੋਇਆ"
                          : "Mark as Done"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedLanguage === "hindi"
              ? "मौसम आधारित पूर्वानुमान"
              : selectedLanguage === "punjabi"
                ? "ਮੌਸਮ ਆਧਾਰਿਤ ਪੂਰਵ-ਅਨੁਮਾਨ"
                : "Weather-Based Forecast"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Thermometer className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">
                  {selectedLanguage === "hindi"
                    ? "तापमान रुझान"
                    : selectedLanguage === "punjabi"
                      ? "ਤਾਪਮਾਨ ਰੁਝਾਨ"
                      : "Temperature Trend"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedLanguage === "hindi"
                    ? "अगले 7 दिनों के लिए मध्यम तापमान (22-28°C) की उम्मीद"
                    : selectedLanguage === "punjabi"
                      ? "ਅਗਲੇ 7 ਦਿਨਾਂ ਲਈ ਮੱਧਮ ਤਾਪਮਾਨ (22-28°C) ਦੀ ਉਮੀਦ"
                      : "Moderate temperatures (22-28°C) expected for next 7 days"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Cloud className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">
                  {selectedLanguage === "hindi"
                    ? "जलवायु पूर्वानुमान"
                    : selectedLanguage === "punjabi"
                      ? "ਜਲਵਾਯੂ ਪੂਰਵ-ਅਨੁਮਾਨ"
                      : "Climate Forecast"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedLanguage === "hindi"
                    ? "पर्याप्त नमी के साथ अनुकूल बढ़ने की स्थिति"
                    : selectedLanguage === "punjabi"
                      ? "ਲੋੜੀਂਦੀ ਨਮੀ ਦੇ ਨਾਲ ਅਨੁਕੂਲ ਵਧਣ ਦੀਆਂ ਸਥਿਤੀਆਂ"
                      : "Favorable growing conditions with adequate moisture"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
