// Terms Management JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Sample terms data
  const sampleTerms = [
    {
      term: "Term 1",
      academicYear: "2024",
      duration: "Jan 15 - Apr 12, 2024",
      schoolDays: 65,
      status: "Active",
      progress: 45,
    },
    {
      term: "Term 2",
      academicYear: "2024",
      duration: "May 6 - Aug 9, 2024",
      schoolDays: 68,
      status: "Upcoming",
      progress: 0,
    },
    {
      term: "Term 3",
      academicYear: "2024",
      duration: "Sep 2 - Nov 29, 2024",
      schoolDays: 62,
      status: "Upcoming",
      progress: 0,
    },
  ]

  // Populate terms table
  function populateTermsTable() {
    const tableBody = document.getElementById("termsTable")
    if (tableBody) {
      tableBody.innerHTML = sampleTerms
        .map(
          (term) => `
                <tr>
                    <td><strong>${term.term}</strong></td>
                    <td>${term.academicYear}</td>
                    <td>${term.duration}</td>
                    <td>${term.schoolDays} days</td>
                    <td><span class="badge badge-${term.status === "Active" ? "success" : term.status === "Upcoming" ? "warning" : "secondary"}">${term.status}</span></td>
                    <td>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${term.progress}%"></div>
                        </div>
                        <small>${term.progress}%</small>
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

  // Show/hide add term form
  document.getElementById("addTermBtn")?.addEventListener("click", () => {
    document.getElementById("addTermCard").style.display = "block"
  })

  document.getElementById("hideTermFormBtn")?.addEventListener("click", () => {
    document.getElementById("addTermCard").style.display = "none"
  })

  // Initialize
  populateTermsTable()
})
