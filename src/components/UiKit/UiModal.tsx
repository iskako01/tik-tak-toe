import Icon from "@components/Icon";
import clsx from "clsx";
import { MouseEvent, ReactNode } from "react";

interface UiModalPropsInterface {
  width?: "md" | "full";
  className?: string;
  title?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}

interface UiModalChildrenPropsInterface {
  className?: string;
  children?: ReactNode;
}

export default function UiModal({
  width = "md",
  isOpen = false,
  className,
  children,
  onClose,
}: UiModalPropsInterface) {
  if (!isOpen) {
    return null;
  }

  const modalContentClassName = clsx(
    "w-full shadow-md bg-white min-h-80 mx-auto p-6 relative rounded-lg flex flex-col",
    className,
    {
      md: "max-w-[640px]",
      full: "max-w-full",
    }[width]
  );

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur z-40 p-5"
      onClick={(event: MouseEvent<HTMLDivElement>) => handleClick(event)}
    >
      <div className={modalContentClassName}>
        <button
          className="absolute rounded top-0 left-[calc(100%+12px)] w-8 h-8 items-center flex justify-center bg-white/10 hover:bg-white/20"
          onClick={onClose}
        >
          <Icon iconName="close" className="text-white" />
        </button>

        {children}
      </div>
    </div>
  );
}

UiModal.Header = function UiModalHeader({
  children,
  className,
}: UiModalChildrenPropsInterface) {
  return (
    <div className={clsx("text-2xl px-6 pt-6 pb-4", className)}>{children}</div>
  );
};

UiModal.Body = function UiModalBody({
  children,
  className,
}: UiModalChildrenPropsInterface) {
  return <div className={clsx("px-6", className)}>{children}</div>;
};

UiModal.Footer = function UiModalFooter({
  children,
  className,
}: UiModalChildrenPropsInterface) {
  return (
    <div className={clsx("mt-auto p-6 flex gap-4 justify-end", className)}>
      {children}
    </div>
  );
};
