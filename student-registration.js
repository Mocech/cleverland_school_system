// Modern Student Registration functionality

class ModernStudentRegistration {
  constructor() {
    this.isExistingStudent = false
    this.formData = {}
    this.init()
  }

  init() {
    this.setupRegistrationTypeToggle()
    this.setupFormSubmission()
    this.setupFormValidation()
    this.loadFormData()
    this.setupAutoSave()
  }

  setupRegistrationTypeToggle() {
    const newStudentBtn = document.getElementById("newStudentBtn")
    const existingStudentBtn = document.getElementById("existingStudentBtn")
    const admissionNumberRow = document.getElementById("admissionNumberRow")
    const registrationTypeInfo = document.getElementById("registrationTypeInfo")
    const formTitle = document.getElementById("formTitle")
    const admissionNumberField = document.getElementById("admissionNumber")

    newStudentBtn.addEventListener("click", () => {
      this.isExistingStudent = false
      this.updateRegistrationType(
        newStudentBtn,
        existingStudentBtn,
        admissionNumberRow,
        formTitle,
        admissionNumberField,
        registrationTypeInfo,
      )
    })

    existingStudentBtn.addEventListener("click", () => {
      this.isExistingStudent = true
      this.updateRegistrationType(
        existingStudentBtn,
        newStudentBtn,
        admissionNumberRow,
        formTitle,
        admissionNumberField,
        registrationTypeInfo,
      )
    })
  }

  updateRegistrationType(
    activeBtn,
    inactiveBtn,
    admissionNumberRow,
    formTitle,
    admissionNumberField,
    registrationTypeInfo,
  ) {
    // Update button states with animation
    activeBtn.className = "btn btn-primary"
    inactiveBtn.className = "btn btn-outline"

    // Create ripple effect
    window.modernSchoolSystem.createRippleEffect(activeBtn)

    if (this.isExistingStudent) {
      admissionNumberRow.style.display = "block"
      admissionNumberRow.style.animation = "fadeInUp 0.4s ease"
      formTitle.textContent = "Existing Student Registration"
      admissionNumberField.required = true

      registrationTypeInfo.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
          <i class="fas fa-user-edit" style="color: var(--primary-color); font-size: 1.5rem;"></i>
          <div>
            <strong>Existing Student:</strong> For students who were already in the school before the system. 
            Please enter their admission number manually. The system will auto-generate future admission numbers based on this.
          </div>
        </div>
      `
    } else {
      admissionNumberRow.style.display = "none"
      formTitle.textContent = "New Student Registration"
      admissionNumberField.required = false

      registrationTypeInfo.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
          <i class="fas fa-info-circle" style="color: var(--primary-color); font-size: 1.5rem;"></i>
          <div>
            <strong>New Student:</strong> For students joining the school for the first time. 
            Admission number will be auto-generated based on the last existing student's number.
          </div>
        </div>
      `
    }
  }

  setupFormSubmission() {
    const form = document.getElementById("studentRegistrationForm")
    const saveAsDraftBtn = document.getElementById("saveAsDraftBtn")

    form.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleFormSubmission(form, false)
    })

    saveAsDraftBtn.addEventListener("click", () => {
      this.handleFormSubmission(form, true)
    })
  }

  setupFormValidation() {
    const form = document.getElementById("studentRegistrationForm")
    const inputs = form.querySelectorAll("input, select, textarea")

    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input)
      })

      input.addEventListener("input", () => {
        this.clearFieldError(input)
        this.autoSaveFormData()
      })
    })
  }

  validateField(field) {
    const value = field.value.trim()
    let isValid = true
    let message = ""

    // Clear previous errors
    this.clearFieldError(field)

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      isValid = false
      message = "This field is required"
    }

    // Specific field validations
    if (field.type === "email" && value && !this.isValidEmail(value)) {
      isValid = false
      message = "Please enter a valid email address"
    }

    if (field.type === "tel" && value && !this.isValidKenyanPhone(value)) {
      isValid = false
      message = "Please enter a valid Kenyan phone number (e.g., 0712345678)"
    }

    if (field.name === "admissionNumber" && this.isExistingStudent && value) {
      if (this.admissionNumberExists(value)) {
        isValid = false
        message = "This admission number already exists"
      }
    }

    if (field.type === "date" && value) {
      const date = new Date(value)
      const today = new Date()
      if (field.name === "dateOfBirth" && date > today) {
        isValid = false
        message = "Date of birth cannot be in the future"
      }
    }

    if (!isValid) {
      this.showFieldError(field, message)
    }

    return isValid
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  isValidKenyanPhone(phone) {
    const phoneRegex = /^0[7-9]\d{8}$/
    return phoneRegex.test(phone)
  }

  showFieldError(field, message) {
    this.clearFieldError(field)

    const errorDiv = document.createElement("div")
    errorDiv.className = "field-error"
    errorDiv.style.cssText = `
      color: var(--danger-color);
      font-size: 0.85rem;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      animation: fadeInUp 0.3s ease;
    `
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`

    field.style.borderColor = "var(--danger-color)"
    field.style.boxShadow = "0 0 0 3px rgba(250, 112, 154, 0.1)"
    field.parentNode.appendChild(errorDiv)
  }

  clearFieldError(field) {
    const existingError = field.parentNode.querySelector(".field-error")
    if (existingError) {
      existingError.remove()
    }
    field.style.borderColor = ""
    field.style.boxShadow = ""
  }

  handleFormSubmission(form, isDraft = false) {
    const formData = new FormData(form)
    const studentData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      academicYear: formData.get("academicYear"),
      term: formData.get("term"),
      grade: formData.get("grade"),
      previousSchool: formData.get("previousSchool"),
      guardianName: formData.get("guardianName"),
      guardianPhone: formData.get("guardianPhone"),
      guardianEmail: formData.get("guardianEmail"),
      relationship: formData.get("relationship"),
      guardianAddress: formData.get("guardianAddress"),
      isExisting: this.isExistingStudent,
      admissionNumber: this.isExistingStudent ? formData.get("admissionNumber") : null,
      isDraft: isDraft,
    }

    // Validate the form if not saving as draft
    if (!isDraft && !this.validateStudentData(studentData)) {
      return
    }

    // Generate admission number for new students
    if (!this.isExistingStudent && !isDraft) {
      studentData.admissionNumber = this.generateAdmissionNumber()
    }

    // Save student data
    this.saveStudent(studentData, isDraft)
  }

  validateStudentData(data) {
    // Additional validation beyond HTML5 validation
    let isValid = true

    // Validate phone number format
    if (!this.isValidKenyanPhone(data.guardianPhone)) {
      window.modernSchoolSystem.showNotification("Please enter a valid Kenyan phone number (e.g., 0712345678)", "error")
      isValid = false
    }

    // Validate admission number for existing students
    if (this.isExistingStudent && !data.admissionNumber) {
      window.modernSchoolSystem.showNotification("Admission number is required for existing students", "error")
      isValid = false
    }

    // Check if admission number already exists
    if (data.admissionNumber && this.admissionNumberExists(data.admissionNumber)) {
      window.modernSchoolSystem.showNotification("This admission number already exists", "error")
      isValid = false
    }

    // Validate age (should be between 5-18 for primary school)
    if (data.dateOfBirth) {
      const age = this.calculateAge(data.dateOfBirth)
      if (age < 5 || age > 18) {
        window.modernSchoolSystem.showNotification(
          "Student age should be between 5-18 years for primary school",
          "warning",
        )
      }
    }

    return isValid
  }

  calculateAge(dateOfBirth) {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  generateAdmissionNumber() {
    // Get the last admission number from existing students
    const students = window.modernSchoolSystem.getFromLocalStorage("students") || []
    const existingStudents = students.filter((s) => s.isExisting || s.admissionNumber)

    if (existingStudents.length === 0) {
      // No existing students, start from CV001
      return "CV001"
    }

    // Find the highest admission number
    const lastAdmissionNumber = existingStudents
      .map((s) => s.admissionNumber)
      .filter((num) => num && num.startsWith("CV"))
      .map((num) => Number.parseInt(num.substring(2)))
      .reduce((max, current) => Math.max(max, current), 0)

    const nextNumber = lastAdmissionNumber + 1
    return `CV${nextNumber.toString().padStart(3, "0")}`
  }

  admissionNumberExists(admissionNumber) {
    const students = window.modernSchoolSystem.getFromLocalStorage("students") || []
    return students.some((s) => s.admissionNumber === admissionNumber)
  }

  saveStudent(studentData, isDraft = false) {
    // Get existing students
    const students = window.modernSchoolSystem.getFromLocalStorage("students") || []

    // Add new student
    const newStudent = {
      ...studentData,
      id: Date.now(), // Simple ID generation
      registrationDate: new Date().toISOString(),
      status: isDraft ? "Draft" : "Active",
      yearJoined: studentData.academicYear,
    }

    students.push(newStudent)

    // Save to localStorage
    window.modernSchoolSystem.saveToLocalStorage("students", students)

    // Clear auto-saved data
    this.clearAutoSavedData()

    if (isDraft) {
      window.modernSchoolSystem.showNotification(
        `Student data saved as draft for ${studentData.firstName} ${studentData.lastName}`,
        "info",
      )
    } else {
      // Show success message
      window.modernSchoolSystem.showNotification(
        `Student ${studentData.firstName} ${studentData.lastName} registered successfully with admission number ${newStudent.admissionNumber}`,
        "success",
      )

      // Reset form
      document.getElementById("studentRegistrationForm").reset()

      // Optionally redirect to student profile or list
      setTimeout(() => {
        if (confirm("Would you like to register another student?")) {
          // Stay on the page
          window.location.reload()
        } else {
          window.location.href = "student-search.html"
        }
      }, 2000)
    }
  }

  loadFormData() {
    // Load academic years and terms from system data
    this.loadAcademicYears()
    this.loadTerms()
    this.loadAutoSavedData()
  }

  loadAcademicYears() {
    // In a real app, this would come from the API
    const academicYears = ["2024", "2025"]
    const select = document.getElementById("academicYear")

    // Set current year as default
    select.value = new Date().getFullYear().toString()
  }

  loadTerms() {
    // Terms are static for now
    const termSelect = document.getElementById("term")
    termSelect.value = "Term 1" // Default to Term 1
  }

  setupAutoSave() {
    // Auto-save form data every 30 seconds
    setInterval(() => {
      this.autoSaveFormData()
    }, 30000)

    // Save on page unload
    window.addEventListener("beforeunload", () => {
      this.autoSaveFormData()
    })
  }

  autoSaveFormData() {
    const form = document.getElementById("studentRegistrationForm")
    const formData = new FormData(form)
    const data = {}

    for (const [key, value] of formData.entries()) {
      if (value.trim()) {
        data[key] = value
      }
    }

    if (Object.keys(data).length > 0) {
      window.modernSchoolSystem.saveToLocalStorage("studentRegistrationDraft", {
        ...data,
        isExisting: this.isExistingStudent,
        timestamp: new Date().toISOString(),
      })
    }
  }

  loadAutoSavedData() {
    const savedData = window.modernSchoolSystem.getFromLocalStorage("studentRegistrationDraft")
    if (savedData && savedData.timestamp) {
      const savedTime = new Date(savedData.timestamp)
      const now = new Date()
      const hoursDiff = (now - savedTime) / (1000 * 60 * 60)

      // Only load if saved within last 24 hours
      if (hoursDiff < 24) {
        if (confirm("Found auto-saved form data. Would you like to restore it?")) {
          this.restoreFormData(savedData)
        }
      }
    }
  }

  restoreFormData(data) {
    const form = document.getElementById("studentRegistrationForm")

    // Restore registration type
    if (data.isExisting) {
      document.getElementById("existingStudentBtn").click()
    }

    // Restore form fields
    Object.keys(data).forEach((key) => {
      if (key !== "isExisting" && key !== "timestamp") {
        const field = form.querySelector(`[name="${key}"]`)
        if (field) {
          field.value = data[key]
        }
      }
    })

    window.modernSchoolSystem.showNotification("Form data restored from auto-save", "info")
  }

  clearAutoSavedData() {
    localStorage.removeItem("studentRegistrationDraft")
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.modernStudentRegistration = new ModernStudentRegistration()
})
