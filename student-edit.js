// Student Edit Management

class StudentEditManager {
  constructor() {
    this.originalData = {}
    this.hasChanges = false
    this.init()
  }

  init() {
    this.loadStudentData()
    this.setupEventListeners()
    this.trackChanges()
  }

  setupEventListeners() {
    // Form submission
    document.getElementById("studentEditForm").addEventListener("submit", (e) => {
      e.preventDefault()
      this.saveChanges()
    })

    // Reset form
    document.getElementById("resetFormBtn").addEventListener("click", () => {
      this.resetForm()
    })

    // Track form changes
    const formInputs = document.querySelectorAll(
      "#studentEditForm input, #studentEditForm select, #studentEditForm textarea",
    )
    formInputs.forEach((input) => {
      input.addEventListener("change", () => {
        this.hasChanges = true
        this.updateSaveButton()
      })
    })

    // Prevent accidental navigation
    window.addEventListener("beforeunload", (e) => {
      if (this.hasChanges) {
        e.preventDefault()
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?"
      }
    })
  }

  loadStudentData() {
    // In a real app, this would load from the database
    // For now, we'll use the existing form values as original data
    const form = document.getElementById("studentEditForm")
    const formData = new FormData(form)

    this.originalData = {}
    for (const [key, value] of formData.entries()) {
      this.originalData[key] = value
    }
  }

  trackChanges() {
    const form = document.getElementById("studentEditForm")
    const inputs = form.querySelectorAll("input, select, textarea")

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.checkForChanges()
      })
    })
  }

  checkForChanges() {
    const form = document.getElementById("studentEditForm")
    const formData = new FormData(form)
    let hasChanges = false

    for (const [key, value] of formData.entries()) {
      if (this.originalData[key] !== value) {
        hasChanges = true
        break
      }
    }

    this.hasChanges = hasChanges
    this.updateSaveButton()
  }

  updateSaveButton() {
    const saveBtn = document.querySelector('button[type="submit"]')
    if (this.hasChanges) {
      saveBtn.classList.add("btn-warning")
      saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes*'
    } else {
      saveBtn.classList.remove("btn-warning")
      saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes'
    }
  }

  saveChanges() {
    const form = document.getElementById("studentEditForm")
    const formData = new FormData(form)

    // Validate required fields
    if (!this.validateForm(formData)) {
      return
    }

    // Simulate saving to database
    setTimeout(() => {
      // Update original data
      this.originalData = {}
      for (const [key, value] of formData.entries()) {
        this.originalData[key] = value
      }

      this.hasChanges = false
      this.updateSaveButton()

      // Show success modal
      this.showSuccessModal()

      window.modernSchoolSystem.showNotification("Student profile updated successfully!", "success")
    }, 1000)
  }

  resetForm() {
    if (confirm("Are you sure you want to reset all changes? This will restore the original values.")) {
      const form = document.getElementById("studentEditForm")

      // Reset to original values
      Object.keys(this.originalData).forEach((key) => {
        const input = form.querySelector(`[name="${key}"]`)
        if (input) {
          input.value = this.originalData[key]
        }
      })

      this.hasChanges = false
      this.updateSaveButton()

      window.modernSchoolSystem.showNotification("Form reset to original values", "info")
    }
  }

  validateForm(formData) {
    const requiredFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "currentGrade",
      "academicYear",
      "guardianName",
      "relationship",
      "guardianPhone",
    ]

    for (const field of requiredFields) {
      if (!formData.get(field) || formData.get(field).trim() === "") {
        window.modernSchoolSystem.showNotification(
          `Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
          "error",
        )
        return false
      }
    }

    // Validate phone number
    const phone = formData.get("guardianPhone")
    if (phone && !/^07\d{8}$/.test(phone)) {
      window.modernSchoolSystem.showNotification("Please enter a valid phone number (07XXXXXXXX)", "error")
      return false
    }

    // Validate email if provided
    const email = formData.get("guardianEmail")
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      window.modernSchoolSystem.showNotification("Please enter a valid email address", "error")
      return false
    }

    return true
  }

  showSuccessModal() {
    document.getElementById("successModal").style.display = "flex"
  }
}

// Modal functions
function continueEditing() {
  document.getElementById("successModal").style.display = "none"
}

function viewProfile() {
  window.location.href = "student-profile.html"
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.studentEditManager = new StudentEditManager()
})
