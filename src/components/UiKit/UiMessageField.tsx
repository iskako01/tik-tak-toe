import clsx from "clsx";

interface UiMessageFieldProps {
  errorText?: string;
  helperText?: string;
}

export default function UiMessageField({
  errorText = "",
  helperText = "",
}: UiMessageFieldProps) {
  if (!errorText && !helperText) return null;

  const textClassName = clsx(
    "mt-1 text-sm",
    errorText ? "text-orange-600" : "text-slate-400"
  );

  return <p className={textClassName}>{errorText || helperText}</p>;
}
