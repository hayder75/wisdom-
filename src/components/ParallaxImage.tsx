"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function ParallaxImage({
  children,
  className,
  intensity = 7,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensity}%`, `${intensity}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y }} className="absolute inset-[-10%] will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}