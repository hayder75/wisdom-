"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

interface AnimatedWordsProps {
  text: string;
  className?: string;
  delay?: number;
  blur?: boolean;
}

export function AnimatedWords({ text, className, delay = 0, blur = false }: AnimatedWordsProps) {
  const lines = text.split("\n");
  return (
    <span className={className} aria-label={text}>
      {lines.map((line, lineIndex) => {
        const words = line.split(" ");
        return (
          <Fragment key={lineIndex}>
            {lineIndex > 0 ? <span className="block" aria-hidden="true" /> : null}
            <span className={lineIndex > 0 ? "block" : undefined}>
              {words.map((word, i) => (
                <Fragment key={i}>
                  <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                    <motion.span
                      className="inline-block will-change-transform"
                      initial={{ y: "115%", filter: blur ? "blur(10px)" : "blur(0px)" }}
                      whileInView={{ y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.8,
                        delay: delay + (lineIndex * words.length + i) * 0.06,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {i < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </span>
          </Fragment>
        );
      })}
    </span>
  );
}