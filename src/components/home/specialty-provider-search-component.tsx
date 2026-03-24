"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  KeyboardEvent,
} from "react";
import { Search } from "lucide-react";
import { MOCK_PROVIDERS, specialties } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type ResultItem = {
  type: "specialty" | "provider";
  label: string;
};

interface DropdownSection {
  sectionLabel: string;
  items: ResultItem[];
}

interface SpecialtyProviderSearchProps {
  className?: string;
  /** Controlled value. When provided the component delegates state upward. */
  value?: string;
  /** Fires on every keystroke AND on dropdown selection when in controlled mode. */
  onValueChange?: (val: string) => void;
  /** Fires only when the user picks an item from the dropdown. */
  onSelect?: (value: string, type: "specialty" | "provider") => void;
}

export function SpecialtyProviderSearch({
  className,
  value,
  onValueChange,
  onSelect,
}: SpecialtyProviderSearchProps) {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(value ?? "");
  const inputValue = isControlled ? value! : internalValue;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Sync external value changes into internal state when uncontrolled
  useEffect(() => {
    if (!isControlled) return;
    setInternalValue(value!);
  }, [isControlled, value]);

  const updateValue = useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange],
  );

  // Build deduplicated provider names once at mount
  const providerNames = useMemo(
    () => [...new Set(MOCK_PROVIDERS.map((p) => p.Name).filter(Boolean))],
    [],
  );

  // Derive section label + items based on current input
  const { sectionLabel, items }: DropdownSection = useMemo(() => {
    const query = inputValue.trim().toLowerCase();

    if (!query) {
      return {
        sectionLabel: "Popular",
        items: specialties.map(
          (s): ResultItem => ({ type: "specialty", label: s }),
        ),
      };
    }

    // Priority 1 — specialties
    const matchedSpecialties = specialties.filter((s) =>
      s.toLowerCase().includes(query),
    );
    if (matchedSpecialties.length > 0) {
      return {
        sectionLabel: "Specialties",
        items: matchedSpecialties.map(
          (s): ResultItem => ({ type: "specialty", label: s }),
        ),
      };
    }

    // Priority 2 — providers
    const matchedProviders = providerNames.filter((name) =>
      name.toLowerCase().includes(query),
    );
    if (matchedProviders.length > 0) {
      return {
        sectionLabel: "Providers",
        items: matchedProviders.map(
          (n): ResultItem => ({ type: "provider", label: n }),
        ),
      };
    }

    return { sectionLabel: "", items: [] };
  }, [inputValue, providerNames]);

  // Reset highlight when list changes
  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLLIElement>(
      `[data-index="${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // Close on outside click
  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const handleSelect = useCallback(
    (item: ResultItem) => {
      updateValue(item.label);
      setDropdownOpen(false);
      onSelect?.(item.label, item.type);
    },
    [updateValue, onSelect],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen) {
      if (e.key === "ArrowDown") setDropdownOpen(true);
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, items.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (items[activeIndex]) handleSelect(items[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
        setDropdownOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const showDropdown = dropdownOpen && items.length > 0;
  const noResults =
    dropdownOpen && inputValue.trim().length > 0 && items.length === 0;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative border-b-2 border-slate-300 focus-within:border-[#002147] transition-colors pb-0">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-800"
          strokeWidth={2.5}
        />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls="sps-listbox"
          aria-activedescendant={
            showDropdown ? `sps-item-${activeIndex}` : undefined
          }
          autoComplete="off"
          spellCheck={false}
          value={inputValue}
          placeholder="Specialty, Provider, or Symptom"
          className="w-full pl-12 pr-4 py-4 bg-slate-100 text-[15px] font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:outline-none"
          onFocus={() => setDropdownOpen(true)}
          onChange={(e) => {
            updateValue(e.target.value);
            setDropdownOpen(true);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      {(showDropdown || noResults) && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.14)] border border-primary overflow-hidden px-2">
          {sectionLabel && (
            <div className="px-4 pt-3 pb-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 select-none">
              {sectionLabel}
            </div>
          )}

          {showDropdown && (
            <ul
              ref={listRef}
              id="sps-listbox"
              role="listbox"
              className="max-h-64 overflow-y-auto py-1"
            >
              {items.map((item, index) => (
                <li
                  key={`${item.type}-${item.label}`}
                  id={`sps-item-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={cn(
                    "px-4 min-h-[44px] flex items-center text-[15px] text-slate-800 cursor-pointer transition-colors select-none",
                    index === activeIndex
                      ? "bg-sky-50 text-[#002147] font-semibold"
                      : "hover:bg-slate-50",
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(item);
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}

          {noResults && (
            <p className="px-4 py-4 text-sm text-slate-500 select-none">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
