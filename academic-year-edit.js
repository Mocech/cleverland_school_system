// Academic Year Edit JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Form submission
  document.getElementById("editAcademicYearForm")?.addEventListener("submit", (e) => {
    e.preventDefault()

    // Show success message
    alert("Academic Year updated successfully!")

    // Redirect back to academic years page
    window.location.href = "academic-year.html"
  })

  // Validate date range
  function validateDateRange() {
    const startDate = document.getElementById("editYearStartDate").value
    const endDate = document.getElementById("editYearEndDate").value

    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      if (end <= start) {
        alert("End date must be after start date")
        return false
      }
    }
    return true
  }

  // Add event listeners for date validation
  document.getElementById("editYearStartDate")?.addEventListener("change", validateDateRange)
  document.getElementById("editYearEndDate")?.addEventListener("change", validateDateRange)
})
