"use client";

import React, { useState } from "react";
import { Bell, X } from "lucide-react";

export function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#0f2c59] text-white py-3.5 px-4 text-sm">
      <div className="container mx-auto flex items-center justify-center relative max-w-7xl">
        <div className="flex items-center gap-2 text-center text-[16px] font-medium tracking-wide">
          <Bell className="w-4 h-4" />
          <span>
            Some BCBSIL patients received letters from BCBSIL incorrectly
            stating their provider is out of network. This was a BCBSIL error. -
            <a href="#" className="font-bold hover:underline ml-1">
              View More
            </a>
          </span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute cursor-pointer right-0 p-1 hover:bg-white/10 rounded-sm"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
