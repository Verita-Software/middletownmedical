"use client";

import { useState, useRef, useEffect, KeyboardEvent, useId } from "react";
import { Shield, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type InsuranceOption = { value: string; label: string };

export const INSURANCE_OPTIONS: readonly InsuranceOption[] = [
  { value: "medicare", label: "Medicare" },
  { value: "medicaid", label: "Medicaid" },
  { value: "private", label: "Private Insurance" },
  { value: "self", label: "Self-Pay" },
];

interface InsuranceSelectProps {
  className?: string;
  /** For <label htmlFor> association. */
  id?: string;
  /** Option list; defaults to home-page search options. */
  options?: readonly InsuranceOption[];
  /** `"hero"` = underline trigger (home booking search). `"form"` = rounded field like registration inputs. */
  variant?: "hero" | "form";
  /** Shown when no value is selected. */
  placeholder?: string;
  /** For assistive tech when selection is required (e.g. home search). */
  ariaRequired?: boolean;
  /** Controlled value (option.value e.g. "medicare"). Omit for uncontrolled. */
  value?: string;
  /** Fires on selection in both controlled and uncontrolled mode. */
  onValueChange?: (value: string, label: string) => void;
  /** Alias kept for backward compatibility. */
  onChange?: (value: string, label: string) => void;
}

export function InsuranceSelect({
  className,
  id,
  options = INSURANCE_OPTIONS,
  variant = "hero",
  placeholder = "Insurance *",
  ariaRequired = false,
  value,
  onValueChange,
  onChange,
}: Readonly<InsuranceSelectProps>) {
  const listboxId = useId();
  const isControlled = value !== undefined;

  const findOption = (v: string) => options.find((o) => o.value === v) ?? null;

  const [internalSelected, setInternalSelected] =
    useState<InsuranceOption | null>(() => (value ? findOption(value) : null));

  const selected = isControlled
    ? value
      ? findOption(value)
      : null
    : internalSelected;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isControlled) return;
    setInternalSelected(value ? findOption(value) : null);
  }, [isControlled, value, options]);

  useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(0, options.length - 1)));
  }, [options.length, open]);

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

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLLIElement>(
      `[data-index="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function handleSelect(opt: InsuranceOption) {
    if (!isControlled) setInternalSelected(opt);
    setOpen(false);
    onValueChange?.(opt.value, opt.label);
    onChange?.(opt.value, opt.label);
  }

  function selectedIndex(): number {
    const idx = options.findIndex((o) => o.value === selected?.value);
    return idx >= 0 ? idx : 0;
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) {
          const opt = options[activeIndex];
          if (opt) handleSelect(opt);
        } else {
          setOpen(true);
          setActiveIndex(selectedIndex());
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setActiveIndex(selectedIndex());
        } else {
          setActiveIndex((i) => Math.min(i + 1, options.length - 1));
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
      default:
        break;
    }
  }

  const isPlaceholder = !selected;

  const isForm = variant === "form";

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className={cn(
          isForm
            ? cn(
                "rounded-lg transition-colors",
                open
                  ? "border-[#002147] ring-2 ring-[#002147]/20"
                  : "border border-slate-300",
              )
            : cn(
                "border-b-2 pb-0 transition-colors",
                open ? "border-[#002147]" : "border-slate-300",
              ),
        )}
      >
        <button
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-required={ariaRequired}
          className={cn(
            "relative flex w-full cursor-pointer items-center bg-slate-100 text-left text-[15px] focus:outline-none",
            isForm ? "rounded-lg py-2.5 pl-12 pr-4" : "py-4 pl-12 pr-4",
          )}
          onClick={() => {
            setOpen((prev) => !prev);
            setActiveIndex(selectedIndex());
          }}
          onKeyDown={handleKeyDown}
        >
          <Shield
            className="pointer-events-none absolute left-4 h-5 w-5 text-slate-800"
            strokeWidth={2.5}
            aria-hidden
          />
          <span
            className={cn(
              "flex-1",
              isPlaceholder
                ? "font-normal text-slate-500"
                : "font-semibold text-slate-900",
            )}
          >
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-slate-700 transition-transform duration-200",
              open && "rotate-180",
            )}
            strokeWidth={2}
            aria-hidden
          />
        </button>
      </div>

      {open && (
        <div
          className={cn(
            "absolute top-full right-0 left-0 z-50 mt-1.5 overflow-hidden border bg-white px-2 shadow-[0_8px_30px_rgba(0,0,0,0.14)]",
            isForm
              ? "rounded-md border-slate-300"
              : "rounded-sm border-primary",
          )}
        >
          <div className="px-4 pt-3 pb-1.5 text-[11px] font-bold tracking-widest text-slate-400 uppercase select-none">
            Insurance
          </div>
          <ul ref={listRef} id={listboxId} role="listbox" className="py-1">
            {options.map((opt, index) => (
              <li
                key={opt.value}
                id={`${listboxId}-item-${index}`}
                data-index={index}
                role="option"
                aria-selected={selected?.value === opt.value}
                className={cn(
                  "flex min-h-[44px] cursor-pointer items-center px-4 text-[15px] text-slate-800 transition-colors select-none",
                  index === activeIndex
                    ? "bg-sky-50 font-semibold text-[#002147]"
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
