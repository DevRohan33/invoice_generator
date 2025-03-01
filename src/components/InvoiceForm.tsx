
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export type InvoiceData = {
  clientName: string;
  serviceType: "Job Support" | "Interview Support" | "Project Support";
  description: string;
  duration: string;
  price: number;
  advancePayment: number;
  currency: "USD" | "INR";
};

type InvoiceFormProps = {
  onSubmit: (data: InvoiceData) => void;
};

const InvoiceForm = ({ onSubmit }: InvoiceFormProps) => {
  const [formData, setFormData] = useState<InvoiceData>({
    clientName: "",
    serviceType: "Job Support",
    description: "",
    duration: "One Week",
    price: 0,
    advancePayment: 0,
    currency: "USD",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const numValue = value === "" ? 0 : parseFloat(value);
    setFormData((prev) => ({ ...prev, [name]: numValue }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.clientName.trim()) {
      toast.error("Client name is required");
      return;
    }
    
    if (formData.serviceType === "Job Support" && !formData.description.trim()) {
      toast.error("Job description is required for Job Support");
      return;
    }
    
    if (formData.price <= 0) {
      toast.error("Price must be greater than zero");
      return;
    }

    // All validation passed, submit the form
    onSubmit(formData);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className="w-full max-w-md"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={itemVariants}>
          <Label htmlFor="clientName" className="text-sm font-medium mb-1.5 block">
            Client Name
          </Label>
          <Input
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Enter client name"
            className="w-full"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor="serviceType" className="text-sm font-medium mb-1.5 block">
            Service Type
          </Label>
          <Select
            value={formData.serviceType}
            onValueChange={(value) => handleSelectChange("serviceType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Job Support">Job Support</SelectItem>
              <SelectItem value="Interview Support">Interview Support</SelectItem>
              <SelectItem value="Project Support">Project Support</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {formData.serviceType === "Job Support" && (
          <motion.div variants={itemVariants}>
            <Label htmlFor="description" className="text-sm font-medium mb-1.5 block">
              Job Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              className="w-full resize-none"
              rows={3}
            />
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <Label htmlFor="duration" className="text-sm font-medium mb-1.5 block">
            Duration
          </Label>
          <Select
            value={formData.duration}
            onValueChange={(value) => handleSelectChange("duration", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="One Week">One Week</SelectItem>
              <SelectItem value="Two Weeks">Two Weeks</SelectItem>
              <SelectItem value="One Month">One Month</SelectItem>
              <SelectItem value="Three Months">Three Months</SelectItem>
              <SelectItem value="Six Months">Six Months</SelectItem>
              <SelectItem value="Custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor="currency" className="text-sm font-medium mb-1.5 block">
            Currency
          </Label>
          <Select
            value={formData.currency}
            onValueChange={(value) => handleSelectChange("currency", value as "USD" | "INR")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="INR">INR (₹)</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor="price" className="text-sm font-medium mb-1.5 block">
            Price 
            <span className="ml-1">
              {formData.currency === "USD" ? "($)" : "(₹)"}
            </span>
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price === 0 ? "" : formData.price}
            onChange={handleNumberChange}
            placeholder="Enter price"
            className="w-full"
            min="0"
            step="0.01"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor="advancePayment" className="text-sm font-medium mb-1.5 block">
            Advance Payment 
            <span className="ml-1">
              {formData.currency === "USD" ? "($)" : "(₹)"}
            </span>
          </Label>
          <Input
            id="advancePayment"
            name="advancePayment"
            type="number"
            value={formData.advancePayment === 0 ? "" : formData.advancePayment}
            onChange={handleNumberChange}
            placeholder="Enter advance payment amount"
            className="w-full"
            min="0"
            step="0.01"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button 
            type="submit"
            className="w-full font-medium"
            size="lg"
          >
            Create Invoice
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default InvoiceForm;
