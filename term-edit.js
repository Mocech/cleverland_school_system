// Term Edit JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Set current date as default
  const today = new Date().toISOString().split("T")[0]
  const paymentDateInput = document.getElementById("paymentDate")
  if (paymentDateInput && !paymentDateInput.value) {
    paymentDateInput.value = today
  }

  // Form submission
  document.getElementById("editTermForm")?.addEventListener("submit", (e) => {
    e.preventDefault()

    // Show success message
    alert("Term updated successfully!")

    // Redirect back to terms page
    window.location.href = "terms.html"
  })

  // Calculate school days when dates change
  function calculateSchoolDays() {
    const startDate = document.getElementById("editStartDate").value
    const endDate = document.getElementById("editEndDate").value

    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      // Estimate school days (excluding weekends and holidays)
      const schoolDays = Math.floor(diffDays * 0.7) // Rough estimate
      document.getElementById("editSchoolDays").value = schoolDays
    }
  }

  // Add event listeners for date changes
  document.getElementById("editStartDate")?.addEventListener("change", calculateSchoolDays)
  document.getElementById("editEndDate")?.addEventListener("change", calculateSchoolDays)
})
