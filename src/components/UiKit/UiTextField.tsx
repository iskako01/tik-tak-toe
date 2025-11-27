import UiLabelField from "./UiLabelField";
import UiInputField from "./UiInputField";
import UiMessageField from "./UiMessageField";

interface UiInputPropsInterface {
  className?: string;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  type?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  errorText?: string;
  id: string;
  handleClick: () => void;
}

export default function UiTextField({
  type = "text",
  label = "",
  placeholder = "",
  helperText = "",
  disabled = false,
  required = false,
  errorText = "",
  className,
  id,
}: UiInputPropsInterface) {
  return (
    <div className={className}>
      {label && <UiLabelField htmlFor={id} label={label} required={required} />}
      <UiInputField
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        error={!!errorText}
      />
      <UiMessageField errorText={errorText} helperText={helperText} />
    </div>
  );
}
