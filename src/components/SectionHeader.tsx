import { Reveal } from "@/components/Reveal";

interface SectionHeaderProps {
  label: string;
  heading: string;
  description?: string;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  heading,
  description,
  dark = false,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? `text-center ${className}` : className}>
      <Reveal>
        <p
          className={`label ${
            align === "center" ? "justify-center" : ""
          } ${dark ? "text-lime" : "text-lime-deep"}`}
        >
          {label}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`font-display mt-6 max-w-[20ch] text-balance whitespace-pre-line text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.95] tracking-tight-2 font-medium ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "text-ivory" : "text-forest"}`}
        >
          {heading}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p
            className={`mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed ${
              align === "center" ? "mx-auto" : ""
            } ${dark ? "text-ivory/70" : "text-stone"}`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}