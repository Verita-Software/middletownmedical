/**
 * Wave divider between hero and content sections (Duly-style).
 */

export function WaveDivider() {
  return (
    <div className="w-full overflow-hidden" aria-hidden>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
          fill="#0f2c59"
        />
        <path
          d="M0 90L48 82.5C96 75 192 60 288 52.5C384 45 480 45 576 52.5C672 60 768 75 864 82.5C960 90 1056 90 1152 82.5C1248 75 1344 60 1392 52.5L1440 45V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
          fill="#0ea5e9"
          fillOpacity="0.4"
        />
      </svg>
    </div>
  );
}
