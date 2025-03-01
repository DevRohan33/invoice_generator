
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const Header = () => {
  return (
    <motion.header 
      className="flex items-center justify-between py-6 px-8 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center bg-primary w-10 h-10 rounded-lg">
          <FileText className="text-white w-5 h-5" />
        </div>
        <span className="font-medium text-xl">Infure</span>
      </div>
    </motion.header>
  );
};

export default Header;
