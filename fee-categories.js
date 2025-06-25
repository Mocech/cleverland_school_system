// Fee Categories Management

class FeeCategoriesManager {
  constructor() {
    this.formsetCount = 0
    this.categories = []
    this.init()
  }

  init() {
    this.loadExistingCategories()
    this.setupEventListeners()
    this.addInitialFormset()
    this.updateStats()
  }

  setupEventListeners() {
    // Add formset button
    document.getElementById("addFormsetBtn").addEventListener("click", () => {
      this.addFormset()
    })

    // Clear form button
    document.getElementById("clearFormBtn").addEventListener("click", () => {
      this.clearAllFormsets()
    })

    // Toggle form visibility
    document.getElementById("toggleFormBtn").addEventListener("click", () => {
      this.toggleFormVisibility()
    })

    // Form submission
    document.getElementById("categoryFormset").addEventListener("submit", (e) => {
      e.preventDefault()
      this.saveCategories()
    })

    // Search functionality
    document.getElementById("searchCategories").addEventListener("input", (e) => {
      this.searchCategories(e.target.value)
    })
  }

  addFormset() {
    this.formsetCount++
    const formsetContainer = document.getElementById("categoryFormsets")

    const formsetHTML = `
      <div class="formset-item" id="formset-${this.formsetCount}" style="
        background: rgba(102, 126, 234, 0.02);
        border: 2px solid rgba(102, 126, 234, 0.1);
        border-radius: var(--border-radius);
        padding: 2rem;
        margin-bottom: 1.5rem;
        position: relative;
        animation: fadeInUp 0.4s ease;
      ">
        <button type="button" class="remove-formset" onclick="feeCategoriesManager.removeFormset(${this.formsetCount})" style="
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--danger-gradient);
          color: white;
          border: none;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        ">
          <i class="fas fa-times"></i>
        </button>
        
        <h4 style="margin-bottom: 1.5rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.75rem;">
          <i class="fas fa-tag"></i>
          Category ${this.formsetCount}
        </h4>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-tag"></i>
              Category Name *
            </label>
            <input type="text" class="form-control" name="categoryName" required placeholder="e.g., Tuition Fee">
          </div>
          
          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-list"></i>
              Category Type *
            </label>
            <select class="form-control" name="categoryType" required>
              <option value="">Select Type</option>
              <option value="School">School (Compulsory)</option>
              <option value="Optional">Optional</option>
            </select>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-align-left"></i>
              Description
            </label>
            <textarea class="form-control" name="description" rows="3" placeholder="Brief description of this fee category"></textarea>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">
              <i class="fas fa-toggle-on"></i>
              Status
            </label>
            <select class="form-control" name="status">
              <option value="Active" selected>Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
    `

    formsetContainer.insertAdjacentHTML("beforeend", formsetHTML)
  }

  addInitialFormset() {
    this.addFormset()
  }

  removeFormset(id) {
    const formset = document.getElementById(`formset-${id}`)
    if (formset) {
      formset.style.animation = "fadeOutUp 0.4s ease"
      setTimeout(() => {
        formset.remove()

        // If no formsets remain, add one
        if (document.querySelectorAll(".formset-item").length === 0) {
          this.addFormset()
        }
      }, 400)
    }
  }

  clearAllFormsets() {
    if (confirm("Are you sure you want to clear all category forms?")) {
      document.getElementById("categoryFormsets").innerHTML = ""
      this.formsetCount = 0
      this.addInitialFormset()
    }
  }

  toggleFormVisibility() {
    const container = document.getElementById("categoryFormContainer")
    const button = document.getElementById("toggleFormBtn")

    if (container.style.display === "none") {
      container.style.display = "block"
      button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Form'
    } else {
      container.style.display = "none"
      button.innerHTML = '<i class="fas fa-eye"></i> Show Form'
    }
  }

  saveCategories() {
    const formsets = document.querySelectorAll(".formset-item")
    const newCategories = []
    let isValid = true

    formsets.forEach((formset, index) => {
      const categoryName = formset.querySelector('[name="categoryName"]').value.trim()
      const categoryType = formset.querySelector('[name="categoryType"]').value
      const description = formset.querySelector('[name="description"]').value.trim()
      const status = formset.querySelector('[name="status"]').value

      if (!categoryName || !categoryType) {
        window.modernSchoolSystem.showNotification(`Please fill all required fields in Category ${index + 1}`, "error")
        isValid = false
        return
      }

      // Check for duplicate names
      if (
        this.categories.some((cat) => cat.name.toLowerCase() === categoryName.toLowerCase()) ||
        newCategories.some((cat) => cat.name.toLowerCase() === categoryName.toLowerCase())
      ) {
        window.modernSchoolSystem.showNotification(`Category "${categoryName}" already exists`, "error")
        isValid = false
        return
      }

      newCategories.push({
        id: Date.now() + index,
        name: categoryName,
        type: categoryType,
        description: description || "No description provided",
        status: status,
        createdDate: new Date().toISOString(),
      })
    })

    if (!isValid) return

    // Save to existing categories
    this.categories.push(...newCategories)
    this.saveToLocalStorage()
    this.renderCategoriesTable()
    this.updateStats()

    // Clear form
    this.clearAllFormsets()

    window.modernSchoolSystem.showNotification(
      `${newCategories.length} fee ${newCategories.length === 1 ? "category" : "categories"} added successfully!`,
      "success",
    )
  }

  loadExistingCategories() {
    // Load from localStorage or use sample data
    this.categories = window.modernSchoolSystem.getFromLocalStorage("feeCategories") || [
      {
        id: 1,
        name: "Tuition Fee",
        type: "School",
        description: "Main academic fee for instruction",
        status: "Active",
        createdDate: "2024-01-15T00:00:00.000Z",
      },
      {
        id: 2,
        name: "Library Fee",
        type: "School",
        description: "Fee for library services and books",
        status: "Active",
        createdDate: "2024-01-15T00:00:00.000Z",
      },
      {
        id: 3,
        name: "Laboratory Fee",
        type: "School",
        description: "Fee for science laboratory usage",
        status: "Active",
        createdDate: "2024-01-15T00:00:00.000Z",
      },
      {
        id: 4,
        name: "Sports Fee",
        type: "School",
        description: "Fee for sports activities and equipment",
        status: "Active",
        createdDate: "2024-01-15T00:00:00.000Z",
      },
      {
        id: 5,
        name: "Examination Fee",
        type: "School",
        description: "Fee for examinations and assessments",
        status: "Active",
        createdDate: "2024-01-15T00:00:00.000Z",
      },
      {
        id: 6,
        name: "Transport Fee",
        type: "Optional",
        description: "School bus transportation fee",
        status: "Active",
        createdDate: "2024-01-15T00:00:00.000Z",
      },
      {
        id: 7,
        name: "Lunch Fee",
        type: "Optional",
        description: "School meals and nutrition program",
        status: "Active",
        createdDate: "2024-01-15T00:00:00.000Z",
      },
      {
        id: 8,
        name: "Uniform Fee",
        type: "Optional",
        description: "School uniform and accessories",
        status: "Active",
        createdDate: "2024-01-15T00:00:00.000Z",
      },
    ]

    this.renderCategoriesTable()
  }

  renderCategoriesTable() {
    const tableBody = document.getElementById("categoriesTable")
    if (!tableBody) return

    tableBody.innerHTML = this.categories
      .map(
        (category, index) => `
        <tr style="animation: fadeInUp 0.6s ease ${index * 0.05}s both;">
          <td>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="
                width: 40px;
                height: 40px;
                background: ${category.type === "School" ? "var(--warning-gradient)" : "var(--success-gradient)"};
                border-radius: var(--border-radius-sm);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
              ">
                <i class="fas fa-tag"></i>
              </div>
              <div>
                <strong>${category.name}</strong>
              </div>
            </div>
          </td>
          <td>
            <span class="badge ${category.type === "School" ? "badge-warning" : "badge-success"}">
              ${category.type === "School" ? "Compulsory" : "Optional"}
            </span>
          </td>
          <td>
            <span style="color: var(--text-secondary);">${category.description}</span>
          </td>
          <td>
            <span class="badge ${category.status === "Active" ? "badge-success" : "badge-danger"}">
              ${category.status}
            </span>
          </td>
          <td>${window.modernSchoolSystem.formatDate(category.createdDate)}</td>
          <td>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-primary btn-sm" onclick="feeCategoriesManager.editCategory(${category.id})">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="feeCategoriesManager.deleteCategory(${category.id})" data-confirm="Are you sure you want to delete this category?">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `,
      )
      .join("")
  }

  updateStats() {
    const totalCategories = this.categories.length
    const compulsoryCategories = this.categories.filter((cat) => cat.type === "School").length
    const optionalCategories = this.categories.filter((cat) => cat.type === "Optional").length
    const inactiveCategories = this.categories.filter((cat) => cat.status === "Inactive").length

    document.getElementById("totalCategories").textContent = totalCategories
    document.getElementById("compulsoryCategories").textContent = compulsoryCategories
    document.getElementById("optionalCategories").textContent = optionalCategories
    document.getElementById("inactiveCategories").textContent = inactiveCategories
  }

  searchCategories(query) {
    const rows = document.querySelectorAll("#categoriesTable tr")
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase()
      const matches = text.includes(query.toLowerCase())
      row.style.display = matches ? "" : "none"
    })
  }

  editCategory(id) {
    const category = this.categories.find((cat) => cat.id === id)
    if (!category) return

    // For now, show an alert. In a real app, this would open an edit modal
    window.modernSchoolSystem.showNotification(`Edit functionality for "${category.name}" will be implemented`, "info")
  }

  deleteCategory(id) {
    if (confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      this.categories = this.categories.filter((cat) => cat.id !== id)
      this.saveToLocalStorage()
      this.renderCategoriesTable()
      this.updateStats()
      window.modernSchoolSystem.showNotification("Category deleted successfully", "success")
    }
  }

  saveToLocalStorage() {
    window.modernSchoolSystem.saveToLocalStorage("feeCategories", this.categories)
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.feeCategoriesManager = new FeeCategoriesManager()
})

// Add CSS for animations
const style = document.createElement("style")
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeOutUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-30px);
    }
  }
  
  .remove-formset:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-medium);
  }
`
document.head.appendChild(style)
