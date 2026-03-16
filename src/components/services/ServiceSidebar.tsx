import Link from "next/link";

export function ServiceSidebar() {
  return (
    <aside className="flex flex-col space-y-8">
      <div className="rounded-4xl rounded-tl-sm bg-[#002147] p-8 text-white xl:rounded-tl-[3rem] xl:rounded-br-[3rem]">
        <h3 className="mb-4 text-2xl font-black">Need Assistance?</h3>
        <div className="mb-6 h-0.5 w-16 bg-[#b5097b]" />
        <p className="mb-6 font-medium text-white/80">
          Our care coordinators are ready to help you schedule your visit and
          answer questions about your care.
        </p>
        <a
          href="tel:+18453424774"
          className="mb-2 block text-3xl font-black text-white transition-colors hover:text-slate-200"
        >
          (845) 342-4774
        </a>
        <p className="mb-8 text-sm text-white/60">Available Mon–Fri, 8am–6pm</p>
        <Link
          href="#request-callback"
          className="block w-full rounded-xl bg-white py-4 text-center font-bold text-[#002147] transition-colors hover:bg-slate-100"
        >
          Request a Callback
        </Link>
      </div>
    </aside>
  );
}

