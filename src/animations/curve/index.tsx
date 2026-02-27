import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { curve, text, translate } from "./anim";
import styles from "./curve.module.css";

interface CurveProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

interface Dimensions {
  width: number | null;
  height: number | null;
}

// Map of routes to names
const routes: Record<string, string> = {
  "/": "Home",
  "/about": "About",
};

// Helper function to return motion props with typed variants
const anim = (variants: any) => ({
  variants,
  initial: "initial",
  animate: "enter",
  exit: "exit",
});

const Curve: React.FC<CurveProps> = ({ children, backgroundColor }) => {
  const location = useLocation();
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: null,
    height: null,
  });

  useEffect(() => {
    function resize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className={styles.curveWrapper} style={{ backgroundColor }}>
      {/* Fallback background while dimensions are not ready */}
      <div
        style={{ opacity: dimensions.width === null ? 1 : 0 }}
        className={styles.curveBackground}
      />

      {/* Route name animation */}
      <motion.p className={styles.routeText} {...anim(text)}>
        {routes[location.pathname] || ""}
      </motion.p>

      {/* Render SVG curve only when dimensions are ready */}
      {dimensions.width !== null && (
        <SVG width={dimensions.width} height={dimensions.height!} />
      )}

      {/* Page content */}
      {children}
    </div>
  );
};

interface SVGProps {
  width: number;
  height: number;
}

const SVG: React.FC<SVGProps> = ({ width, height }) => {
  const initialPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;

  const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 0
  `;

  return (
    <motion.svg
      {...anim(translate)}
      width={width}
      height={height}
      className={styles.curveSvg}>
      <motion.path
        {...anim(curve(initialPath, targetPath))}
        fill="currentColor"
      />
    </motion.svg>
  );
};

export default Curve;
