interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  inputMode?: "text" | "numeric" | "tel" | "email" | "decimal";
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options?: string[];
  textarea?: boolean;
  rows?: number;
}

const fieldClass =
  "w-full rounded-[2px] border border-ink/15 bg-white px-5 py-4 text-[0.9375rem] text-ink placeholder:text-stone/70 outline-none transition-colors duration-300 focus:border-lime-deep focus:ring-2 focus:ring-lime/40";

export function FormField({
  label,
  name,
  type = "text",
  inputMode,
  required = false,
  placeholder,
  value,
  onChange,
  options,
  textarea = false,
  rows = 4,
}: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="text-[0.8125rem] font-semibold tracking-[0.04em] text-ink">{label}</span>
      {textarea ? (
        <textarea
          required={required}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${fieldClass} resize-none`}
        />
      ) : options ? (
        <select
          required={required}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={fieldClass}
        >
          <option value="">Select…</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          required={required}
          type={type}
          inputMode={inputMode}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={fieldClass}
        />
      )}
    </label>
  );
}