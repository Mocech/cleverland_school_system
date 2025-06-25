// Academic Year Management JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Sample academic years data
  const sampleAcademicYears = [
    {
      year: "2024",
      duration: "Jan 15, 2024 - Nov 30, 2024",
      terms: 3,
      students: 1247,
      status: "Active",
      progress: 45,
    },
    {
      year: "2023",
      duration: "Jan 16, 2023 - Nov 30, 2023",
      terms: 3,
      students: 1156,
      status: "Completed",
      progress: 100,
    },
    {
      year: "2025",
      duration: "Jan 13, 2025 - Nov 28, 2025",
      terms: 3,
      students: 0,
      status: "Draft",
      progress: 0,
    },
  ]

  // Populate academic years table
  function populateAcademicYearsTable() {
    const tableBody = document.getElementById("academicYearsTable")
    if (tableBody) {
      tableBody.innerHTML = sampleAcademicYears
        .map(
          (year) => `
                <tr>
                    <td><strong>Academic Year ${year.year}</strong></td>
                    <td>${year.duration}</td>
                    <td>${year.terms} terms</td>
                    <td>${year.students.toLocaleString()}</td>
                    <td><span class="badge badge-${year.status === "Active" ? "success" : year.status === "Completed" ? "primary" : "secondary"}">${year.status}</span></td>
                    <td>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${year.progress}%"></div>
                        </div>
                        <small>${year.progress}%</small>
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `,
        )
        .join("")
    }
  }

  // Show/hide add academic year form
  document.getElementById("addAcademicYearBtn")?.addEventListener("click", () => {
    document.getElementById("addYearCard").style.display = "block"
  })

  document.getElementById("hideFormBtn")?.addEventListener("click", () => {
    document.getElementById("addYearCard").style.display = "none"
  })

  // Initialize
  populateAcademicYearsTable()
})
