"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Shield, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const INSURANCE_OPTIONS = [
  { value: "medicare", label: "Medicare" },
  { value: "medicaid", label: "Medicaid" },
  { value: "private", label: "Private Insurance" },
  { value: "self", label: "Self-Pay" },
];

interface InsuranceSelectProps {
  className?: string;
  /** Controlled value (option.value e.g. "medicare"). Omit for uncontrolled. */
  value?: string;
  /** Fires on selection in both controlled and uncontrolled mode. */
  onValueChange?: (value: string, label: string) => void;
  /** Alias kept for backward compatibility. */
  onChange?: (value: string, label: string) => void;
}

export function InsuranceSelect({
  className,
  value,
  onValueChange,
  onChange,
}: InsuranceSelectProps) {
  const isControlled = value !== undefined;

  const findOption = (v: string) =>
    INSURANCE_OPTIONS.find((o) => o.value === v) ?? null;

  const [internalSelected, setInternalSelected] = useState<{
    value: string;
    label: string;
  } | null>(() => (value ? findOption(value) : null));

  const selected = isControlled
    ? value
      ? findOption(value)
      : null
    : internalSelected;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Sync external value into internal state when uncontrolled
  useEffect(() => {
    if (!isControlled) return;
    setInternalSelected(value ? findOption(value) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isControlled, value]);

  // Close on outside click
  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLLIElement>(
      `[data-index="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function handleSelect(opt: (typeof INSURANCE_OPTIONS)[number]) {
    if (!isControlled) setInternalSelected(opt);
    setOpen(false);
    onValueChange?.(opt.value, opt.label);
    onChange?.(opt.value, opt.label);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) {
          handleSelect(INSURANCE_OPTIONS[activeIndex]);
        } else {
          setOpen(true);
          setActiveIndex(
            INSURANCE_OPTIONS.findIndex((o) => o.value === selected?.value) ||
              0,
          );
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) {
          setOpen(true);
        } else {
          setActiveIndex((i) => Math.min(i + 1, INSURANCE_OPTIONS.length - 1));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  }

  const isPlaceholder = !selected;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className={cn(
          "border-b-2 transition-colors pb-0",
          open ? "border-[#002147]" : "border-slate-300",
        )}
      >
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls="insurance-listbox"
          className="w-full flex items-center pl-12 pr-4 py-4 bg-slate-100 text-[15px] focus:outline-none cursor-pointer text-left"
          onClick={() => {
            setOpen((prev) => !prev);
            setActiveIndex(
              INSURANCE_OPTIONS.findIndex((o) => o.value === selected?.value) ||
                0,
            );
          }}
          onKeyDown={handleKeyDown}
        >
          <Shield
            className="absolute left-4 h-5 w-5 text-slate-800"
            strokeWidth={2.5}
          />
          <span
            className={cn(
              "flex-1",
              isPlaceholder
                ? "text-slate-500 font-normal"
                : "text-slate-900 font-semibold",
            )}
          >
            {selected ? selected.label : "Insurance *"}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-slate-700 transition-transform duration-200",
              open && "rotate-180",
            )}
            strokeWidth={2}
          />
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.14)] border border-primary overflow-hidden px-2">
          <div className="px-4 pt-3 pb-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">
            Insurance
          </div>
          <ul
            ref={listRef}
            id="insurance-listbox"
            role="listbox"
            className="py-1"
          >
            {INSURANCE_OPTIONS.map((opt, index) => (
              <li
                key={opt.value}
                id={`insurance-item-${index}`}
                data-index={index}
                role="option"
                aria-selected={selected?.value === opt.value}
                className={cn(
                  "px-4 min-h-[44px] flex items-center text-[15px] text-slate-800 cursor-pointer transition-colors select-none",
                  index === activeIndex
                    ? "bg-sky-50 text-[#002147] font-semibold"
                    : "hover:bg-slate-50",
                  selected?.value === opt.value &&
                    index !== activeIndex &&
                    "text-[#002147]",
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(opt);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
