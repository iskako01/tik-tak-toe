import clsx from "clsx";

interface UiInputFieldProps {
  id: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
}

export default function UiInputField({
  id,
  type = "text",
  placeholder = "",
  disabled = false,
  error = false,
}: UiInputFieldProps) {
  const inputClassName = clsx(
    `px-2 py-2 block w-full outline-0 rounded-md 
     shadow-sm focus:ring focus:ring-opacity-50 
     disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`,
    error
      ? "focus:border-orange-600 focus:ring-orange-600/20 border-orange-600"
      : "focus:border-teal-600 focus:ring-teal-600/20 border-slate-200"
  );

  return (
    <input
      type={type}
      id={id}
      className={inputClassName}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
