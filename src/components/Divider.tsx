import clsx from "clsx";

export default function Divider({ className }: { className?: string }) {
  return <div className={clsx(className, "w-px bg-slate-200")} />;
}
