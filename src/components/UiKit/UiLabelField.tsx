import clsx from "clsx";

interface UiLabelFieldProps {
  htmlFor: string;
  label: string;
  required?: boolean;
}

export default function UiLabelField({
  htmlFor,
  label,
  required = false,
}: UiLabelFieldProps) {
  const labelClassName = clsx(
    "mb-1 block text-sm font-medium text-slate-900 after:ml-0.5",
    required && "after:text-orange-600 after:content-['*']"
  );

  return (
    <label htmlFor={htmlFor} className={labelClassName}>
      {label}
    </label>
  );
}
