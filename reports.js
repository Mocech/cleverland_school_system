import { Chart } from "@/components/ui/chart"
// Modern Reports functionality

class ModernReports {
  constructor() {
    this.charts = {}
    this.reportData = {}
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.loadReportData()
    this.initializeCharts()
    this.generateReports()
  }

  setupEventListeners() {
    document.getElementById("generateReportsBtn").addEventListener("click", () => {
      this.generateReports()
    })

    // Filter change listeners
    document.getElementById("reportYear").addEventListener("change", () => {
      this.generateReports()
    })

    document.getElementById("reportTerm").addEventListener("change", () => {
      this.generateReports()
    })

    document.getElementById("reportGrade").addEventListener("change", () => {
      this.generateReports()
    })
  }

  loadReportData() {
    // In a real application, this would fetch from an API
    this.reportData = {
      totalCollected: 2800000,
      totalOutstanding: 650000,
      collectionRate: 81.2,
      studentsWithBalances: 234,
      monthlyCollections: [
        { month: "Jan", amount: 850000 },
        { month: "Feb", amount: 920000 },
        { month: "Mar", amount: 1030000 },
        { month: "Apr", amount: 780000 },
        { month: "May", amount: 890000 },
        { month: "Jun", amount: 950000 },
      ],
      categoryBreakdown: [
        { category: "Tuition", amount: 1500000, percentage: 53.6 },
        { category: "Library", amount: 280000, percentage: 10.0 },
        { category: "Laboratory", amount: 350000, percentage: 12.5 },
        { category: "Sports", amount: 200000, percentage: 7.1 },
        { category: "Transport", amount: 300000, percentage: 10.7 },
        { category: "Lunch", amount: 170000, percentage: 6.1 },
      ],
      paymentMethods: [
        { method: "M-Pesa", amount: 1260000, percentage: 45 },
        { method: "Cash", amount: 980000, percentage: 35 },
        { method: "Bank Transfer", amount: 560000, percentage: 20 },
      ],
      gradeReports: [
        {
          grade: "Grade 1",
          students: 52,
          expected: 390000,
          collected: 335000,
          outstanding: 55000,
          rate: 85.9,
          avgPerStudent: 6442,
        },
        {
          grade: "Grade 2",
          students: 48,
          expected: 360000,
          collected: 308000,
          outstanding: 52000,
          rate: 85.6,
          avgPerStudent: 6417,
        },
        {
          grade: "Grade 3",
          students: 55,
          expected: 412500,
          collected: 352000,
          outstanding: 60500,
          rate: 85.3,
          avgPerStudent: 6400,
        },
        {
          grade: "Grade 4",
          students: 51,
          expected: 382500,
          collected: 315000,
          outstanding: 67500,
          rate: 82.4,
          avgPerStudent: 6176,
        },
        {
          grade: "Grade 5",
          students: 49,
          expected: 367500,
          collected: 300000,
          outstanding: 67500,
          rate: 81.6,
          avgPerStudent: 6122,
        },
        {
          grade: "Grade 6",
          students: 46,
          expected: 345000,
          collected: 262500,
          outstanding: 82500,
          rate: 76.1,
          avgPerStudent: 5707,
        },
        {
          grade: "Grade 7",
          students: 44,
          expected: 330000,
          collected: 255000,
          outstanding: 75000,
          rate: 77.3,
          avgPerStudent: 5795,
        },
        {
          grade: "Grade 8",
          students: 42,
          expected: 315000,
          collected: 232500,
          outstanding: 82500,
          rate: 73.8,
          avgPerStudent: 5536,
        },
      ],
      recentPayments: [
        {
          date: "2024-01-25",
          student: "John Doe",
          admission: "CV001",
          amount: 15000,
          method: "M-Pesa",
          receipt: "RCP240125001",
        },
        {
          date: "2024-01-25",
          student: "Mary Smith",
          admission: "CV002",
          amount: 12000,
          method: "Cash",
          receipt: "RCP240125002",
        },
        {
          date: "2024-01-24",
          student: "Peter Johnson",
          admission: "CV003",
          amount: 18000,
          method: "Bank Transfer",
          receipt: "RCP240124001",
        },
        {
          date: "2024-01-24",
          student: "Sarah Wilson",
          admission: "CV004",
          amount: 14500,
          method: "M-Pesa",
          receipt: "RCP240124002",
        },
        {
          date: "2024-01-23",
          student: "David Brown",
          admission: "CV005",
          amount: 16000,
          method: "Cash",
          receipt: "RCP240123001",
        },
      ],
    }
  }

  initializeCharts() {
    this.initCollectionTrendsChart()
    this.initCategoriesChart()
    this.initPaymentMethodsChart()
  }

  initCollectionTrendsChart() {
    const ctx = document.getElementById("collectionTrendsChart").getContext("2d")

    this.charts.collectionTrends = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.reportData.monthlyCollections.map((item) => item.month),
        datasets: [
          {
            label: "Collections (KSh)",
            data: this.reportData.monthlyCollections.map((item) => item.amount),
            borderColor: "#667eea",
            backgroundColor: "rgba(102, 126, 234, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#667eea",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => "KSh " + value / 1000 + "K",
            },
          },
        },
      },
    })
  }

  initCategoriesChart() {
    const ctx = document.getElementById("categoriesChart").getContext("2d")

    this.charts.categories = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: this.reportData.categoryBreakdown.map((item) => item.category),
        datasets: [
          {
            data: this.reportData.categoryBreakdown.map((item) => item.amount),
            backgroundColor: ["#667eea", "#4facfe", "#43e97b", "#fa709a", "#fee140", "#38f9d7"],
            borderWidth: 0,
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
              padding: 20,
              usePointStyle: true,
            },
          },
        },
      },
    })
  }

  initPaymentMethodsChart() {
    const ctx = document.getElementById("paymentMethodsChart").getContext("2d")

    this.charts.paymentMethods = new Chart(ctx, {
      type: "pie",
      data: {
        labels: this.reportData.paymentMethods.map((item) => item.method),
        datasets: [
          {
            data: this.reportData.paymentMethods.map((item) => item.percentage),
            backgroundColor: ["#667eea", "#4facfe", "#43e97b"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    })
  }

  generateReports() {
    this.updateFinancialOverview()
    this.updateGradeReport()
    this.updateRecentPayments()
    this.updateCharts()

    window.modernSchoolSystem.showNotification("Reports generated successfully", "success")
  }

  updateFinancialOverview() {
    // Animate the numbers
    window.modernSchoolSystem.animateNumber(
      document.getElementById("totalCollected"),
      0,
      this.reportData.totalCollected,
      2000,
      true,
    )

    window.modernSchoolSystem.animateNumber(
      document.getElementById("totalOutstanding"),
      0,
      this.reportData.totalOutstanding,
      2000,
      true,
    )

    window.modernSchoolSystem.animateNumber(
      document.getElementById("collectionRate"),
      0,
      this.reportData.collectionRate,
      1500,
      false,
      "%",
    )

    window.modernSchoolSystem.animateNumber(
      document.getElementById("studentsWithBalances"),
      0,
      this.reportData.studentsWithBalances,
      1500,
    )
  }

  updateGradeReport() {
    const tableBody = document.getElementById("gradeReportTable")
    if (!tableBody) return

    tableBody.innerHTML = this.reportData.gradeReports
      .map(
        (grade, index) => `
        <tr style="animation: fadeInUp 0.6s ease ${index * 0.1}s both;">
          <td><strong>${grade.grade}</strong></td>
          <td>${grade.students}</td>
          <td>KSh ${grade.expected.toLocaleString()}</td>
          <td style="color: var(--success-color); font-weight: 600;">KSh ${grade.collected.toLocaleString()}</td>
          <td style="color: var(--danger-color); font-weight: 600;">KSh ${grade.outstanding.toLocaleString()}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="flex: 1; background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
                <div style="width: ${grade.rate}%; height: 100%; background: ${grade.rate >= 85 ? "var(--success-color)" : grade.rate >= 75 ? "var(--warning-color)" : "var(--danger-color)"}; transition: width 1s ease;"></div>
              </div>
              <span style="font-size: 0.9rem; font-weight: 600; color: ${grade.rate >= 85 ? "var(--success-color)" : grade.rate >= 75 ? "var(--warning-color)" : "var(--danger-color)"};">${grade.rate}%</span>
            </div>
          </td>
          <td>KSh ${grade.avgPerStudent.toLocaleString()}</td>
        </tr>
      `,
      )
      .join("")
  }

  updateRecentPayments() {
    const tableBody = document.getElementById("recentPaymentsTable")
    if (!tableBody) return

    tableBody.innerHTML = this.reportData.recentPayments
      .map(
        (payment, index) => `
        <tr style="animation: fadeInUp 0.6s ease ${index * 0.1}s both;">
          <td>${window.modernSchoolSystem.formatDate(payment.date)}</td>
          <td>
            <div>
              <strong>${payment.student}</strong>
              <br>
              <small style="color: var(--text-secondary);">${payment.admission}</small>
            </div>
          </td>
          <td style="color: var(--success-color); font-weight: 600;">KSh ${payment.amount.toLocaleString()}</td>
          <td>
            <span class="badge ${payment.method === "M-Pesa" ? "badge-primary" : payment.method === "Cash" ? "badge-success" : "badge-warning"}">
              ${payment.method}
            </span>
          </td>
          <td>
            <code style="background: rgba(102, 126, 234, 0.1); padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">
              ${payment.receipt}
            </code>
          </td>
        </tr>
      `,
      )
      .join("")
  }

  updateCharts() {
    // Update chart data based on current filters
    if (this.charts.collectionTrends) {
      this.charts.collectionTrends.update()
    }
    if (this.charts.categories) {
      this.charts.categories.update()
    }
    if (this.charts.paymentMethods) {
      this.charts.paymentMethods.update()
    }
  }

  exportReport(type) {
    // In a real application, this would generate and download reports
    window.modernSchoolSystem.showNotification(`Exporting ${type} report...`, "info")

    setTimeout(() => {
      window.modernSchoolSystem.showNotification(`${type} report exported successfully`, "success")
    }, 2000)
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.modernReports = new ModernReports()
})
