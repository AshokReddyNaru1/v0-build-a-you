// Import Lucide icons library
import lucide from "lucide"

// Initialize Lucide icons
lucide.createIcons()

// Global variables
let currentTab = "social"
let voiceEnabled = true

// Function declarations
function initializeCharts() {
  // Placeholder for chart initialization logic
  console.log("Charts initialized")
}

function loadComponents() {
  // Placeholder for component loading logic
  console.log("Components loaded")
}

// Login functionality
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault()
  document.getElementById("loginPage").classList.add("hidden")
  document.getElementById("homePage").classList.remove("hidden")
  initializeCharts()
  loadComponents()
})

// Tab switching functionality
function switchTab(tab) {
  // Hide all content
  document.getElementById("socialContent").classList.add("hidden")
  document.getElementById("cropDataContent").classList.add("hidden")
  document.getElementById("predictionContent").classList.add("hidden")

  // Show selected content
  if (tab === "social") {
    document.getElementById("socialContent").classList.remove("hidden")
  } else if (tab === "crop-data") {
    document.getElementById("cropDataContent").classList.remove("hidden")
  } else if (tab === "prediction") {
    document.getElementById("predictionContent").classList.remove("hidden")
  }

  // Update navigation buttons
  const buttons = document.querySelectorAll(".fixed button")
  buttons.forEach((btn) => {
    btn.classList.remove("text-green-600")
    btn.classList.add("text-gray-600")
  })

  currentTab = tab
}

// Feed filtering functionality
function filterFeed(type) {
  const cards = document.querySelectorAll(".feed-card")
  const buttons = document.querySelectorAll("#socialContent .flex button")

  buttons.forEach((btn) => {
    btn.classList.remove("active-tab", "bg-green-600", "text-white")
    btn.classList.add("bg-gray-200", "text-gray-700")
  })

  // Assuming event is defined in the context where filterFeed is called
  const targetButton = event.target
  targetButton.classList.add("active-tab", "bg-green-600", "text-white")
  targetButton.classList.remove("bg-gray-200", "text-gray-700")

  cards.forEach((card) => {
    if (type === "all") {
      card.style.display = "block"
    } else {
      if (card.classList.contains(type + "-card")) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    }
  })
}

// Crop data section switching
function showCropSection(section) {
  document.getElementById("registrationSection").classList.add("hidden")
  document.getElementById("registeredSection").classList.add("hidden")
  document.getElementById("suggestionsSection").classList.add("hidden")

  if (section === "registration") {
    document.getElementById("registrationSection").classList.remove("hidden")
  } else if (section === "registered") {
    document.getElementById("registeredSection").classList.remove("hidden")
  } else if (section === "suggestions") {
    document.getElementById("suggestionsSection").classList.remove("hidden")
  }
}

// Voice functionality
function speakSuggestion(button) {
  if (!voiceEnabled) return

  const suggestionText = button.parentElement.querySelector("p").textContent
  const language = document.getElementById("languageSelect").value

  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(suggestionText)
    utterance.lang = language === "hi" ? "hi-IN" : "en-US"
    speechSynthesis.speak(utterance)
  }
}

// Voice toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const voiceToggle = document.getElementById("voiceToggle")
  if (voiceToggle) {
    voiceToggle.addEventListener("click", function () {
      voiceEnabled = !voiceEnabled
      this.textContent = voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off"
      this.classList.toggle("bg-blue-100")
      this.classList.toggle("bg-gray-100")
    })
  }
})

// Form submission handlers
document.addEventListener("DOMContentLoaded", () => {
  const cropForm = document.getElementById("cropRegistrationForm")
  if (cropForm) {
    cropForm.addEventListener("submit", function (e) {
      e.preventDefault()
      alert("Crop registered successfully!")
      this.reset()
    })
  }
})
