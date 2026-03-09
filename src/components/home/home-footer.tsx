import Link from "next/link";

const NAV_LINKS = [
  { label: "About Us", href: "/#about" },
  { label: "Locations", href: "#" },
  { label: "Careers", href: "/resource/careers" },
  { label: "Media Center", href: "#" },
  { label: "Medical Records", href: "/resource/patient-resources" },
  { label: "Contact Us", href: "#" },
];

export function HomeFooter() {
  return (
    <footer className="w-full">
      {/* Upper footer – light grey, multi-column */}
      <div className="bg-slate-100 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Column 1: Navigation */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
                Middletown Medical
              </h3>
              <ul className="space-y-2">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-slate-600 hover:text-primary text-[15px] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Contact */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
                Contact Us
              </h3>
              <p className="text-slate-600 text-[15px] font-medium mb-2">
                Need Help?
              </p>
              <p className="text-slate-600 text-[15px] mb-1">
                Main Line — (845) 342-4774
              </p>
              <p className="text-slate-600 text-[15px]">
                Billing Customer Service — (845) 342-4774
              </p>
            </div>

            {/* Column 3: Stay Connected */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
                Stay Connected
              </h3>
              <p className="text-slate-600 text-[15px] mb-4">
                Sign up for Middletown Medical e-Newsletters
              </p>
              <Link
                href="#"
                className="inline-flex items-center rounded-lg border-2 border-primary bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Subscribe Now!
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lower bar – dark blue, copyright & links */}
      <div className="bg-primary py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-2 text-center text-sm text-white/90 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4">
            <span>© {new Date().getFullYear()} by Middletown Medical</span>
            <span className="hidden sm:inline">|</span>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link href="#" className="hover:text-white transition-colors">
              Compliance Hotline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
