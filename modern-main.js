// Modern School Management System JavaScript

class ModernSchoolSystem {
  constructor() {
    this.init()
    this.setupEventListeners()
    this.loadAnimations()
  }

  init() {
    this.setupSidebarToggle()
    this.setActiveNavigation()
    this.loadInitialData()
    this.setupNotifications()
  }

  setupSidebarToggle() {
    const sidebarToggle = document.getElementById("sidebarToggle")
    const sidebar = document.getElementById("sidebar")
    const mainContent = document.getElementById("mainContent")

    if (sidebarToggle && sidebar && mainContent) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed")
        mainContent.classList.toggle("expanded")

        // Store sidebar state with animation
        localStorage.setItem("sidebarCollapsed", sidebar.classList.contains("collapsed"))
        
        // Add ripple effect
        this.createRippleEffect(sidebarToggle)
      })

      // Restore sidebar state
      const sidebarCollapsed = localStorage.getItem("sidebarCollapsed") === "true"
      if (sidebarCollapsed) {
        sidebar.classList.add("collapsed")
        mainContent.classList.add("expanded")
      }
    }

    this.setupMobileSidebar()
  }

  setupMobileSidebar() {
    const sidebar = document.getElementById("sidebar")
    const sidebarToggle = document.getElementById("sidebarToggle")

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
          sidebar.classList.remove("open")
        }
      }
    })

    // Toggle sidebar on mobile with animation
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.toggle("open")
        }
      })
    }
  }

  setActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html"
    const navLinks = document.querySelectorAll(".nav-link")

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active")
      }
    })
  }

  setupEventListeners() {
    this.setupFormValidation()
    this.setupSearch()
    this.setupModals()
    this.setupCardHovers()
  }

  setupFormValidation() {
    const forms = document.querySelectorAll("form")
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault()
        }
      })

      // Real-time validation
      const inputs = form.querySelectorAll("input, select, textarea")
      inputs.forEach((input) => {
        input.addEventListener("blur", () => {
          this.validateField(input)
        })
      })
    })
  }

  validateForm(form) {
    let isValid = true
    const requiredFields = form.querySelectorAll("[required]")

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false
      }
    })

    return isValid
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

    // Email validation
    if (field.type === "email" && value && !this.isValidEmail(value)) {
      isValid = false
      message = "Please enter a valid email address"
    }

    // Phone validation for Kenyan numbers
    if (field.type === "tel" && value && !this.isValidKenyanPhone(value)) {
      isValid = false
      message = "Please enter a valid Kenyan phone number (e.g., 0712345678)"
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

  setupSearch() {
    const searchInputs = document.querySelectorAll("[data-search]")
    searchInputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        this.performSearch(e.target.value, e.target.dataset.search)
      })
    })
  }

  performSearch(query, target) {
    const targetElement = document.getElementById(target)
    if (!targetElement) return

    const rows = targetElement.querySelectorAll("tbody tr")
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase()
      const matches = text.includes(query.toLowerCase())
      row.style.display = matches ? "" : "none"
      
      if (matches && query) {
        row.style.animation = "fadeInUp 0.3s ease"
      }
    })
  }

  setupModals() {
    // Modal functionality will be added as needed
    this.setupConfirmationModals()
  }

  setupConfirmationModals() {
    const confirmButtons = document.querySelectorAll("[data-confirm]")
    confirmButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const message = button.dataset.confirm
        if (!confirm(message)) {
          e.preventDefault()
        }
      })
    })
  }

  setupCardHovers() {
    const cards = document.querySelectorAll(".card, .stat-card, .action-card")
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)"
      })
      
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)"
      })
    })
  }

  loadInitialData() {
    this.loadDashboardData()
    this.loadUserData()
  }

  loadDashboardData() {
    // Enhanced sample data with more realistic values
    const sampleData = {
      totalStudents: 1247,
      totalPaid: 2800000,
      totalUnpaid: 650000,
      activeClasses: 24,
      currentYear: "2024",
      currentTerm: "Term 1",
      collectionRate: 81.2,
      newStudentsThisTerm: 45,
      graduatedLastYear: 156
    }

    this.updateDashboardStats(sampleData)
    this.loadClassOverview()
  }

  updateDashboardStats(data) {
    const elements = {
      totalStudents: document.getElementById("totalStudents"),
      totalPaid: document.getElementById("totalPaid"),
      totalUnpaid: document.getElementById("totalUnpaid"),
      activeClasses: document.getElementById("activeClasses"),
      currentYear: document.getElementById("currentYear"),
      currentTerm: document.getElementById("currentTerm"),
    }

    // Animate number changes
    if (elements.totalStudents) this.animateNumber(elements.totalStudents, 0, data.totalStudents, 2000)
    if (elements.totalPaid) this.animateNumber(elements.totalPaid, 0, data.totalPaid, 2500, true)
    if (elements.totalUnpaid) this.animateNumber(elements.totalUnpaid, 0, data.totalUnpaid, 2000, true)
    if (elements.activeClasses) this.animateNumber(elements.activeClasses, 0, data.activeClasses, 1500)
    
    if (elements.currentYear) elements.currentYear.textContent = `Academic Year ${data.currentYear}`
    if (elements.currentTerm) elements.currentTerm.textContent = data.currentTerm
  }

  animateNumber(element, start, end, duration, isCurrency = false) {
    const startTime = performance.now()
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const current = Math.floor(start + (end - start) * this.easeOutCubic(progress))
      
      if (isCurrency) {
        element.textContent = `KSh ${current.toLocaleString()}`
      } else {
        element.textContent = current.toLocaleString()
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3)
  }

  loadClassOverview() {
    const classData = [
      { grade: "Grade 1", enrolled: 52, fullyPaid: 45, partialPaid: 5, outstanding: 2, rate: 86.5 },
      { grade: "Grade 2", enrolled: 48, fullyPaid: 41, partialPaid: 4, outstanding: 3, rate: 85.4 },
      { grade: "Grade 3", enrolled: 55, fullyPaid: 47, partialPaid: 6, outstanding: 2, rate: 85.5 },
      { grade: "Grade 4", enrolled: 51, fullyPaid: 42, partialPaid: 7, outstanding: 2, rate: 82.4 },
      { grade: "Grade 5", enrolled: 49, fullyPaid: 40, partialPaid: 6, outstanding: 3, rate: 81.6 },
      { grade: "Grade 6", enrolled: 46, fullyPaid: 35, partialPaid: 8, outstanding: 3, rate: 76.1 },
      { grade: "Grade 7", enrolled: 44, fullyPaid: 34, partialPaid: 7, outstanding: 3, rate: 77.3 },
      { grade: "Grade 8", enrolled: 42, fullyPaid: 31, partialPaid: 8, outstanding: 3, rate: 73.8 },
    ]

    this.renderClassOverview(classData)
  }

  renderClassOverview(data) {
    const tableBody = document.getElementById("classOverviewTable")
    if (!tableBody) return

    tableBody.innerHTML = data
      .map(
        (row, index) => `
          <tr style="animation: fadeInUp 0.6s ease ${index * 0.1}s both;">
            <td><strong>${row.grade}</strong></td>
            <td>${row.enrolled}</td>
            <td><span class="badge badge-success">${row.fullyPaid}</span></td>
            <td><span class="badge badge-warning">${row.partialPaid}</span></td>
            <td><span class="badge badge-danger">${row.outstanding}</span></td>
            <td>
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="flex: 1; background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
                  <div style="width: ${row.rate}%; height: 100%; background: ${row.rate >= 85 ? 'var(--success-color)' : row.rate >= 75 ? 'var(--warning-color)' : 'var(--danger-color)'}; transition: width 1s ease;"></div>
                </div>
                <span style="font-size: 0.9rem; font-weight: 600; color: ${row.rate >= 85 ? 'var(--success-color)' : row.rate >= 75 ? 'var(--warning-color)' : 'var(--danger-color)'};">${row.rate}%</span>
              </div>
            </td>
            <td>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-primary btn-sm">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-outline btn-sm">
                  <i class="fas fa-edit"></i>
                </button>
              </div>
            </td>
          </tr>
        `
      )
      .join("")
  }

  loadUserData() {
    // Load user preferences and settings
    const userData = this.getFromLocalStorage("userData") || {
      name: "Admin User",
      role: "System Administrator",
      avatar: "AD",
      preferences: {
        theme: "light",
        notifications: true
      }
    }

    this.updateUserInterface(userData)
  }

  updateUserInterface(userData) {
    const userElements = document.querySelectorAll(".user-avatar")
    const userNames = document.querySelectorAll(".user-info h4")
    const userRoles = document.querySelectorAll(".user-info p")

    userElements.forEach(el => el.textContent = userData.avatar)
    userNames.forEach(el => el.textContent = userData.name)
    userRoles.forEach(el => el.textContent = userData.role)
  }

  loadAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(".card, .stat-card, .action-card")
    animatedElements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "all 0.6s ease"
      observer.observe(el)
    })
  }

  createRippleEffect(element) {
    const ripple = document.createElement("span")
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      width: ${size}px;
      height: ${size}px;
      left: ${rect.width / 2 - size / 2}px;
      top: ${rect.height / 2 - size / 2}px;
    `
    
    element.style.position = "relative"
    element.style.overflow = "hidden"
    element.appendChild(ripple)
    
    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  setupNotifications() {
    // Setup notification system
    this.createNotificationContainer()
  }

  createNotificationContainer() {
    if (!document.getElementById("notificationContainer")) {
      const container = document.createElement("div")
      container.id = "notificationContainer"
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `
      document.body.appendChild(container)
    }
  }

  showNotification(message, type = "info", duration = 5000) {
    const container = document.getElementById("notificationContainer")
    const notification = document.createElement("div")
    
    const icons = {
      success: "fas fa-check-circle",
      error: "fas fa-exclamation-circle",
      warning: "fas fa-exclamation-triangle",
      info: "fas fa-info-circle"
    }
    
    const colors = {
      success: "var(--success-gradient)",
      error: "var(--danger-gradient)",
      warning: "var(--warning-gradient)",
      info: "var(--primary-gradient)"
    }
    
    notification.style.cssText = `
      background: ${colors[type] || colors.info};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-heavy);
      display: flex;
      align-items: center;
      gap: 1rem;
      min-width: 300px;
      animation: slideInRight 0.4s ease;
      cursor: pointer;
    `
    
    notification.innerHTML = `
      <i class="${icons[type] || icons.info}"></i>
      <span>${message}</span>
      <i class="fas fa-times" style="margin-left: auto; opacity: 0.7;"></i>
    `
    
    notification.addEventListener("click", () => {
      notification.style.animation = "slideOutRight 0.4s ease"
      setTimeout(() => notification.remove(), 400)
    })
    
    container.appendChild(notification)
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOutRight 0.4s ease"
        setTimeout(() => notification.remove(), 400)
      }
    }, duration)
  }

  // Utility functions
  formatCurrency(amount) {
    return `KSh ${amount.toLocaleString()}`
  }

  formatDate(date) {
    return new Date(date).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  getFromLocalStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }
}

// Initialize the modern system when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.modernSchoolSystem = new ModernSchoolSystem()
})

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)
