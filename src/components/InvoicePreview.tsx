
import { motion } from "framer-motion";
import { type InvoiceData } from "./InvoiceForm";
import { Button } from "@/components/ui/button";
import { Download, FileText, Printer } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { generatePDF } from "@/utils/generatePDF";
import { toast } from "sonner";

type InvoicePreviewProps = {
  invoiceData: InvoiceData;
  onBack: () => void;
};

const InvoicePreview = ({ invoiceData, onBack }: InvoicePreviewProps) => {
  const handleDownload = async () => {
    try {
      await generatePDF(invoiceData);
    } catch (error) {
      console.error("Error in handleDownload:", error);
      toast.error("Failed to download invoice. Please try again.");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const invoiceDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Generate invoice number (just for display purposes)
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

  return (
    <motion.div
      className="w-full max-w-3xl bg-white rounded-xl border shadow-sm overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-primary p-6 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FileText size={24} />
            <h2 className="text-xl font-medium">Invoice</h2>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Invoice Number</p>
            <p className="font-medium">{invoiceNumber}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between mb-8">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Billed To</h3>
            <p className="font-medium">{invoiceData.clientName}</p>
          </div>
          <div className="text-right">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Issue Date</h3>
            <p>{invoiceDate}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Service Details</h3>
          <div className="bg-secondary rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium">{invoiceData.serviceType}</h4>
                {invoiceData.description && (
                  <p className="text-sm text-muted-foreground mt-1">{invoiceData.description}</p>
                )}
                <p className="text-sm mt-1">Duration: {invoiceData.duration}</p>
              </div>
              <div className="text-right font-medium">
                {formatCurrency(invoiceData.price)}
              </div>
            </div>
          </div>
        </div>

        {invoiceData.advancePayment > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Advance Payment Required</h3>
            <div className="bg-secondary rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">Advance Payment</h4>
                </div>
                <div className="text-right font-medium">
                  {formatCurrency(invoiceData.advancePayment)}
                </div>
              </div>
            </div>
          </div>
        )}

        <Separator className="my-6" />
        
        <div className="flex justify-between items-center font-medium text-lg">
          <span>Total Amount</span>
          <span>{formatCurrency(invoiceData.price)}</span>
        </div>

        <div className="mt-10 flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back to Form
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1 gap-2"
          >
            <Download size={16} />
            Download PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="flex-1 gap-2"
          >
            <Printer size={16} />
            Print
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoicePreview;
