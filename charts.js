import { Chart } from "@/components/ui/chart"
// Chart initialization and management
function initializeCharts() {
  // Crops Overview Chart
  const cropsCtx = document.getElementById("cropsOverviewChart").getContext("2d")
  new Chart(cropsCtx, {
    type: "doughnut",
    data: {
      labels: ["Wheat", "Rice", "Cotton"],
      datasets: [
        {
          data: [3, 2, 1],
          backgroundColor: ["#16a34a", "#eab308", "#dc2626"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  })

  // Scheme Chart
  const schemeCtx = document.getElementById("schemeChart").getContext("2d")
  new Chart(schemeCtx, {
    type: "bar",
    data: {
      labels: ["2022", "2023", "2024"],
      datasets: [
        {
          label: "Beneficiaries (in thousands)",
          data: [850, 920, 1050],
          backgroundColor: "#f97316",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })

  // Market Chart
  const marketCtx = document.getElementById("marketChart").getContext("2d")
  new Chart(marketCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Wheat",
          data: [2000, 2050, 2100, 2150, 2120, 2150],
          borderColor: "#16a34a",
          fill: false,
        },
        {
          label: "Rice",
          data: [1800, 1850, 1900, 1940, 1920, 1940],
          borderColor: "#eab308",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  })

  // Initialize prediction charts when needed
  setTimeout(() => {
    initializePredictionCharts()
  }, 100)
}

function initializePredictionCharts() {
  // Individual crop prediction charts
  createPredictionChart("wheatPredictionChart", "Wheat Yield Prediction", [20, 22, 24, 26, 26.8])
  createPredictionChart("ricePredictionChart", "Rice Yield Prediction", [15, 16, 17, 18, 18.5])
  createPredictionChart("cottonPredictionChart", "Cotton Yield Prediction", [8, 9, 10, 11, 12.3])

  // State pie charts
  createStatePieChart("punjabPieChart", [0.8, 0.6, 0.35])
  createStatePieChart("haryanaPieChart", [0.7, 0.5, 0.22])
  createStatePieChart("upPieChart", [1.5, 1.2, 0.32])

  // Multi-crop comparison
  const multiCropCtx = document.getElementById("multiCropChart")
  if (multiCropCtx) {
    new Chart(multiCropCtx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Punjab", "Haryana", "UP", "MP", "Rajasthan"],
        datasets: [
          {
            label: "Wheat (M acres)",
            data: [0.8, 0.7, 1.5, 0.9, 0.5],
            backgroundColor: "#16a34a",
          },
          {
            label: "Rice (M acres)",
            data: [0.6, 0.5, 1.2, 0.7, 0.3],
            backgroundColor: "#eab308",
          },
          {
            label: "Cotton (M acres)",
            data: [0.35, 0.22, 0.32, 0.28, 0.18],
            backgroundColor: "#dc2626",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
      },
    })
  }
}

function createPredictionChart(canvasId, label, data) {
  const canvas = document.getElementById(canvasId)
  if (canvas) {
    const ctx = canvas.getContext("2d")
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Predicted"],
        datasets: [
          {
            label: label,
            data: data,
            borderColor: "#16a34a",
            backgroundColor: "rgba(22, 163, 74, 0.1)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }
}

function createStatePieChart(canvasId, data) {
  const canvas = document.getElementById(canvasId)
  if (canvas) {
    const ctx = canvas.getContext("2d")
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Wheat", "Rice", "Cotton"],
        datasets: [
          {
            data: data,
            backgroundColor: ["#16a34a", "#eab308", "#dc2626"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              font: {
                size: 10,
              },
            },
          },
        },
      },
    })
  }
}
