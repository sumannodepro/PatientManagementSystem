import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GeneratePDF = () => {
  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "in", format: "a4" });

    // Title at the top
    doc.setFontSize(14);
    doc.text("Patient Visit Report", doc.internal.pageSize.width / 2, 0.5, { align: "center" });

    // Define table headers
    const columns = ["Patient Name", "Patient ID", "DOB", "Age", "Details", "Next Visit"];

    // Sample data
    const data = [
      ["John Doe", "P12345", "1990-05-15", "34", "Routine check-up and evaluation.", "2025-04-10"],
      ["Jane Smith", "P67890", "1985-08-22", "39", "Dental cleaning and whitening.", "2025-04-15"],
    ];

    // Generate the table
    autoTable(doc, {
      startY: 1,
      head: [columns],
      body: data,
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 3 }, // Smaller font to fit more content
      tableWidth: "wrap", // Ensures it fits within the page width
      margin: { top: 0 }, // No extra margins
      didDrawPage: function (data) {
        doc.text("Patient Visit Report", doc.internal.pageSize.width / 2, 0.5, { align: "center" });
      },
    });

    // Save PDF
    doc.save("Patient_Report.pdf");
  };

  return <button onClick={generatePDF}>Generate PDF</button>;
};

export default GeneratePDF;
