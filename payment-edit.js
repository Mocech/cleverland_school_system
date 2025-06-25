// Payment Edit JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Sample payment data
  const samplePayments = [
    {
      receiptNo: "RCP240101001",
      student: "John Doe (CV001)",
      amount: "KSh 15,000",
      method: "Cash",
      date: "2024-01-15",
      status: "Completed",
    },
    {
      receiptNo: "RCP240101002",
      student: "Jane Smith (CV002)",
      amount: "KSh 12,500",
      method: "M-Pesa",
      date: "2024-01-16",
      status: "Completed",
    },
    {
      receiptNo: "RCP240101003",
      student: "Mike Johnson (CV003)",
      amount: "KSh 8,000",
      method: "Bank Transfer",
      date: "2024-01-17",
      status: "Pending",
    },
  ]

  // Populate recent payments table
  function populateRecentPayments() {
    const tableBody = document.getElementById("recentPaymentsTable")
    if (tableBody) {
      tableBody.innerHTML = samplePayments
        .map(
          (payment) => `
                <tr>
                    <td>${payment.receiptNo}</td>
                    <td>${payment.student}</td>
                    <td>${payment.amount}</td>
                    <td>${payment.method}</td>
                    <td>${payment.date}</td>
                    <td><span class="badge badge-${payment.status === "Completed" ? "success" : "warning"}">${payment.status}</span></td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-payment-btn" data-receipt="${payment.receiptNo}">
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

  // Search payment functionality
  document.getElementById("searchPaymentBtn")?.addEventListener("click", () => {
    const receiptSearch = document.getElementById("receiptSearch").value
    const admissionSearch = document.getElementById("admissionSearch").value

    if (receiptSearch || admissionSearch) {
      document.getElementById("paymentDetailsCard").style.display = "block"
    }
  })

  // Initialize
  populateRecentPayments()
})
