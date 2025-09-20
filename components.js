// Dynamic component loading
function loadComponents() {
  loadCropDataComponents()
  loadPredictionComponents()
}

function loadCropDataComponents() {
  const cropDataContent = document.getElementById("cropDataContent")
  cropDataContent.innerHTML = `
        <div class="flex space-x-2 mb-6">
            <button class="px-4 py-2 bg-green-600 text-white rounded-md active-tab" onclick="showCropSection('registration')">Crop Registration</button>
            <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md" onclick="showCropSection('registered')">Registered Crops</button>
            <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md" onclick="showCropSection('suggestions')">AI Suggestions</button>
        </div>

        <!-- Crop Registration Form -->
        <div id="registrationSection" class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-xl font-semibold mb-4 text-green-800">Register New Crop</h2>
            <form id="cropRegistrationForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Farmer Name</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter farmer name">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">State</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>Select State</option>
                        <option>Punjab</option>
                        <option>Haryana</option>
                        <option>Uttar Pradesh</option>
                        <option>Madhya Pradesh</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Land Area (acres)</label>
                    <input type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter land area">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Soil Fertility</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>Select Fertility</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Season</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>Select Season</option>
                        <option>Kharif</option>
                        <option>Rabi</option>
                        <option>Zaid</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Crop Type</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>Select Crop</option>
                        <option>Wheat</option>
                        <option>Rice</option>
                        <option>Cotton</option>
                        <option>Sugarcane</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Planting Date</label>
                    <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Expected Harvest Date</label>
                    <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium mb-2">Soil Photo</label>
                    <input type="file" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>
                <div class="md:col-span-2">
                    <button type="submit" class="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 font-medium">
                        Register Crop
                    </button>
                </div>
            </form>
        </div>

        <!-- Registered Crops Table -->
        <div id="registeredSection" class="hidden bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-xl font-semibold mb-4 text-green-800">Registered Crops</h2>
            <div class="space-y-4">
                <!-- Crop Card 1 -->
                <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="font-semibold text-lg">Wheat - Field A</h3>
                            <p class="text-gray-600">Farmer: Rajesh Kumar | State: Punjab</p>
                        </div>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">High Fertility</span>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <p class="text-sm text-gray-500">Land Area</p>
                            <p class="font-medium">5.2 acres</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Season</p>
                            <p class="font-medium">Rabi</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Planted</p>
                            <p class="font-medium">Nov 15, 2024</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Harvest</p>
                            <p class="font-medium">Apr 20, 2025</p>
                        </div>
                    </div>
                    <div class="border-t pt-4">
                        <h4 class="font-medium mb-2">Daily Tracking</h4>
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b">
                                        <th class="text-left py-2">Date</th>
                                        <th class="text-left py-2">Fertilizer</th>
                                        <th class="text-left py-2">Pesticide</th>
                                        <th class="text-left py-2">Work Done</th>
                                        <th class="text-left py-2">Yield</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-b">
                                        <td class="py-2">Dec 1, 2024</td>
                                        <td class="py-2">Urea - 50kg</td>
                                        <td class="py-2">-</td>
                                        <td class="py-2">Irrigation</td>
                                        <td class="py-2">-</td>
                                    </tr>
                                    <tr class="border-b">
                                        <td class="py-2">Dec 15, 2024</td>
                                        <td class="py-2">-</td>
                                        <td class="py-2">Fungicide - 2L</td>
                                        <td class="py-2">Weeding</td>
                                        <td class="py-2">-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Crop Card 2 -->
                <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="font-semibold text-lg">Rice - Field B</h3>
                            <p class="text-gray-600">Farmer: Priya Sharma | State: Haryana</p>
                        </div>
                        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Medium Fertility</span>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <p class="text-sm text-gray-500">Land Area</p>
                            <p class="font-medium">3.8 acres</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Season</p>
                            <p class="font-medium">Kharif</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Planted</p>
                            <p class="font-medium">Jun 20, 2024</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Harvest</p>
                            <p class="font-medium">Oct 15, 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- AI Suggestions -->
        <div id="suggestionsSection" class="hidden bg-white rounded-lg shadow-sm border p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-green-800">AI Suggestions</h2>
                <div class="flex items-center space-x-2">
                    <select id="languageSelect" class="px-3 py-1 border border-gray-300 rounded-md text-sm">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="pa">Punjabi</option>
                        <option value="mr">Marathi</option>
                    </select>
                    <button id="voiceToggle" class="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                        🔊 Voice On
                    </button>
                </div>
            </div>
            <div class="space-y-4">
                <div class="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="font-semibold text-red-800">High Priority</h3>
                            <p class="text-red-700 mt-1">Water needed tomorrow for Wheat - Field A. Soil moisture is below optimal level.</p>
                            <p class="text-sm text-red-600 mt-2">Action: Schedule irrigation for early morning</p>
                        </div>
                        <button class="ml-2 p-2 text-red-600 hover:bg-red-100 rounded" onclick="speakSuggestion(this)">
                            <i data-lucide="volume-2" class="h-4 w-4"></i>
                        </button>
                    </div>
                </div>
                
                <div class="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="font-semibold text-yellow-800">Medium Priority</h3>
                            <p class="text-yellow-700 mt-1">Apply fertilizer in 3 days for Rice - Field B. Growth stage requires nitrogen boost.</p>
                            <p class="text-sm text-yellow-600 mt-2">Action: Prepare Urea 46% - 40kg per acre</p>
                        </div>
                        <button class="ml-2 p-2 text-yellow-600 hover:bg-yellow-100 rounded" onclick="speakSuggestion(this)">
                            <i data-lucide="volume-2" class="h-4 w-4"></i>
                        </button>
                    </div>
                </div>
                
                <div class="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="font-semibold text-blue-800">Weather Alert</h3>
                            <p class="text-blue-700 mt-1">Rain expected in 2 days. Avoid pesticide application for all crops.</p>
                            <p class="text-sm text-blue-600 mt-2">Action: Postpone scheduled spraying activities</p>
                        </div>
                        <button class="ml-2 p-2 text-blue-600 hover:bg-blue-100 rounded" onclick="speakSuggestion(this)">
                            <i data-lucide="volume-2" class="h-4 w-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}

function loadPredictionComponents() {
  const predictionContent = document.getElementById("predictionContent")
  predictionContent.innerHTML = `
        <h1 class="text-2xl font-bold text-green-800 mb-6">Crop Yield Prediction Dashboard</h1>
        
        <!-- My Registered Crops Predictions -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-xl font-semibold mb-4 text-green-800">My Registered Crops Predictions</h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Wheat Prediction -->
                <div class="border border-gray-200 rounded-lg p-4">
                    <h3 class="font-semibold text-lg mb-2">Wheat - Field A</h3>
                    <div class="chart-container mb-4">
                        <canvas id="wheatPredictionChart"></canvas>
                    </div>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Expected Yield:</span>
                            <span class="font-medium">26.8 quintals</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Confidence:</span>
                            <span class="font-medium text-green-600">94%</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Days to Harvest:</span>
                            <span class="font-medium">45 days</span>
                        </div>
                    </div>
                </div>

                <!-- Rice Prediction -->
                <div class="border border-gray-200 rounded-lg p-4">
                    <h3 class="font-semibold text-lg mb-2">Rice - Field B</h3>
                    <div class="chart-container mb-4">
                        <canvas id="ricePredictionChart"></canvas>
                    </div>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Expected Yield:</span>
                            <span class="font-medium">18.5 quintals</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Confidence:</span>
                            <span class="font-medium text-green-600">91%</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Days to Harvest:</span>
                            <span class="font-medium">Harvested</span>
                        </div>
                    </div>
                </div>

                <!-- Cotton Prediction -->
                <div class="border border-gray-200 rounded-lg p-4">
                    <h3 class="font-semibold text-lg mb-2">Cotton - Field C</h3>
                    <div class="chart-container mb-4">
                        <canvas id="cottonPredictionChart"></canvas>
                    </div>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Expected Yield:</span>
                            <span class="font-medium">12.3 quintals</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Confidence:</span>
                            <span class="font-medium text-green-600">89%</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Days to Harvest:</span>
                            <span class="font-medium">78 days</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- State Analysis -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-xl font-semibold mb-4 text-green-800">State Analysis - Acre Distribution</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <!-- Punjab -->
                <div class="text-center">
                    <h3 class="font-semibold mb-2">Punjab</h3>
                    <div class="pie-chart-container mb-2">
                        <canvas id="punjabPieChart"></canvas>
                    </div>
                    <p class="text-sm text-gray-600">Total: 1.75M acres</p>
                </div>

                <!-- Haryana -->
                <div class="text-center">
                    <h3 class="font-semibold mb-2">Haryana</h3>
                    <div class="pie-chart-container mb-2">
                        <canvas id="haryanaPieChart"></canvas>
                    </div>
                    <p class="text-sm text-gray-600">Total: 1.42M acres</p>
                </div>

                <!-- Uttar Pradesh -->
                <div class="text-center">
                    <h3 class="font-semibold mb-2">Uttar Pradesh</h3>
                    <div class="pie-chart-container mb-2">
                        <canvas id="upPieChart"></canvas>
                    </div>
                    <p class="text-sm text-gray-600">Total: 3.02M acres</p>
                </div>
            </div>
        </div>

        <!-- Multi-Crop Comparison -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-xl font-semibold mb-4 text-green-800">Multi-Crop Yield Comparison</h2>
            <div class="chart-container">
                <canvas id="multiCropChart"></canvas>
            </div>
        </div>
    `
}

// Declare the variables before using them
const lucide = {
  createIcons: () => {
    // Placeholder for icon creation logic
  },
}

function initializePredictionCharts() {
  // Placeholder for prediction chart initialization logic
}

// Ensure that the merged code maintains consistent formatting, indentation, and style with the rest of the code block
