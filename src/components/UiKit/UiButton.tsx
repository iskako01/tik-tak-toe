import clsx from "clsx";

interface UiButtonPropsInterface {
  className?: string;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  children: string;
  handleClick: () => void;
}

export default function UiButton({
  variant = "primary",
  size = "md",
  className,
  children,
  handleClick,
}: UiButtonPropsInterface) {
  const buttonClassName = clsx(
    "transition-colors py-2",
    className,
    {
      primary: "bg-teal-600 hover:bg-teal-500 text-white",
      outline:
        "bg-white text-teal-600 hover:bg-teal-600 hover:text-white border-teal-600 border",
    }[variant],
    {
      md: "px-5 rounded-md text-sm",
      lg: "px-12 rounded-lg text-2xl",
    }[size]
  );

  return (
    <button className={buttonClassName} onClick={handleClick}>
      {children}
    </button>
  );
}
