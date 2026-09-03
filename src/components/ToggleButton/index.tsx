import { MouseEventHandler } from "react";

interface ToggleEvent {
  open: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  controls: string;
  label: string;
}

export const ToggleButton = ({
  open,
  onClick,
  controls,
  label,
}: ToggleEvent) => {
  return (
    <button
      type="button"
      aria-controls={controls}
      aria-label={label}
      aria-expanded={open}
      onClick={onClick}
      className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-gray-200 p-2 hover: bg-gray-50 focus: outline-none"
    >
      <span
      className={`h-0.5 w-6 bg-gray-600 transition-all duration-300 ease-in-out ${
        open ? "translate-y-[4px] rotate-45" : ""}`}
      ></span>
        <span
        className={`h-0.5 w-6 bg-gray-600 transition-all duration-300 ease-in-out ${
          open ? "-translate-y-[4px] -rotate-45" : ""}`}
        >
        </span>
    </button>
  );
};
