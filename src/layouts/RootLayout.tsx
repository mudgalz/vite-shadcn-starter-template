import Curve from "@/animations/curve";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen h-full">
      <Header />

      <main className="flex-1 relative flex flex-col">
        {/* <AnimatePresence mode="wait"> */}
        {/* <Curve key={location.pathname}> */}
        {children}
        {/* </Curve> */}
        {/* </AnimatePresence> */}
      </main>

      <Footer />
    </div>
  );
};
