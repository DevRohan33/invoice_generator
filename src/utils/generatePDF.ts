
import { type InvoiceData } from "@/components/InvoiceForm";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

// Extend the jsPDF type definition to include autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generatePDF = async (invoiceData: InvoiceData) => {
  try {
    const doc = new jsPDF();
    
    const currencySymbol = invoiceData.currency === "USD" ? "$" : "₹";

    // Format currency
    const formatCurrency = (amount: number) => {
      return `${currencySymbol}${amount.toFixed(2)}`;
    };
    
    // Add logo/header
    doc.setFillColor(155, 135, 245); // Primary color (#9b87f5)
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("INVOICE", 20, 25);
    
    // Add invoice details
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Invoice Number:", 150, 20);
    doc.setFont("helvetica", "normal");
    doc.text(invoiceNumber, 150, 25);
    
    doc.setFont("helvetica", "bold");
    doc.text("Date:", 150, 33);
    doc.setFont("helvetica", "normal");
    const currentDate = new Date().toLocaleDateString();
    doc.text(currentDate, 160, 33);
    
    // Reset text color for the rest of the document
    doc.setTextColor(0, 0, 0);
    
    // Client info section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Billed To:", 20, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(invoiceData.clientName, 20, 67);
    
    // Service details section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Service Details", 20, 85);
    
    // Service table
    autoTable(doc,{
      startY: 90,
      head: [["Service Type", "Description", "Duration", "Amount"]],
      body: [
        [
          invoiceData.serviceType,
          invoiceData.description || "-",
          invoiceData.duration,
          formatCurrency(invoiceData.price),
        ],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      styles: {
        cellPadding: 6,
      },
    });
    
    let currentY = (doc as any).lastAutoTable.finalY + 20;
    
    // Advance payment section if applicable
    if (invoiceData.advancePayment > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Advance Payment Required", 20, currentY);
      currentY += 5;
      
      autoTable(doc,{
        startY: currentY,
        head: [["Description", "Amount"]],
        body: [
          [
            "Advance Payment",
            formatCurrency(invoiceData.advancePayment),
          ],
        ],
        theme: "grid",
        headStyles: {
          fillColor: [240, 240, 240],
          textColor: [0, 0, 0],
          fontStyle: "bold",
        },
      });
      
      currentY = (doc as any).lastAutoTable.finalY + 20;
    }
    
    // Total section
    doc.setDrawColor(200, 200, 200);
    doc.line(20, currentY, 190, currentY);
    currentY += 10;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Total Amount:", 130, currentY);
    doc.setFontSize(12);
    doc.text(formatCurrency(invoiceData.price), 180, currentY, { align: "right" });
    
    // Currency information
    currentY += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(`Currency: ${invoiceData.currency}`, 130, currentY);
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(
        "Infiw3b Invoice Generator",
        105,
        285,
        { align: "center" }
      );
    }
    
    // Save the PDF directly with a more specific filename
    const filename = `Infiw3b_Invoice_${invoiceNumber}_${invoiceData.clientName.replace(/\s+/g, '_')}.pdf`;
    doc.save(filename);
    toast.success("Invoice downloaded successfully!");
    
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("Failed to generate PDF. Please try again.");
  }
};
