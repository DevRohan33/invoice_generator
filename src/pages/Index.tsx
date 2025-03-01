
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InvoiceForm, { InvoiceData } from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import { FileText } from "lucide-react";

const Index = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [step, setStep] = useState<"form" | "preview">("form");

  const handleFormSubmit = (data: InvoiceData) => {
    setInvoiceData(data);
    setStep("preview");
  };

  const handleBack = () => {
    setStep("form");
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <AnimatePresence mode="wait">
          {step === "form" ? (
            <motion.div
              key="form"
              className="w-full max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-center mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Infure Invoice Generator
                </h1>
                <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                  Create professional invoices for your services in seconds. Simple, fast, and elegant.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="space-y-2"
                >
                  <div className="bg-white p-8 rounded-xl shadow-sm border">
                    <h2 className="text-xl font-medium mb-5">Create Your Invoice</h2>
                    <InvoiceForm onSubmit={handleFormSubmit} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Key Features</h3>
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-white rounded-lg border shadow-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      >
                        <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                          <feature.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full px-4"
            >
              {invoiceData && (
                <InvoicePreview 
                  invoiceData={invoiceData} 
                  onBack={handleBack} 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

// Mock data for features section
import { Download, FileText as FileTextIcon, User, DollarSign, Clock, CheckCircle } from "lucide-react";

const features = [
  {
    icon: User,
    title: "Client Management",
    description: "Easily input and manage client details for your invoices.",
  },
  {
    icon: FileTextIcon,
    title: "Service Selection",
    description: "Choose from Job Support, Interview Support, or Project Support.",
  },
  {
    icon: Clock,
    title: "Flexible Duration",
    description: "Set custom time periods from one week to several months.",
  },
  {
    icon: DollarSign,
    title: "Advance Payment",
    description: "Clearly specify advance payment requirements for your services.",
  },
  {
    icon: CheckCircle,
    title: "Professional Format",
    description: "Generate clean, professional invoices that impress clients.",
  },
  {
    icon: Download,
    title: "Instant Download",
    description: "Download your invoice as PDF with a single click.",
  },
];

export default Index;
