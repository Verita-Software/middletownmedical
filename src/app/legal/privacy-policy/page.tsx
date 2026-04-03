import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_NAME,
  SITE_URL,
  MAIN_PHONE,
  MAIN_PHONE_DISPLAY,
} from "@/lib/seo-constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME} websites and digital services.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:py-16 text-slate-800">
      <h1 className="text-3xl md:text-4xl font-bold text-[#002147] mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-slate-500 mb-10">
        Last updated: April 2026 · Applies to {SITE_URL} and related online
        services operated by {SITE_NAME}
      </p>

      <div className="space-y-10 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Privacy of your health care information
          </h2>
          <p>
            Welcome. You are using an online service (for example, this website
            or a mobile application) that is owned or operated by{" "}
            <strong>{SITE_NAME}</strong> (“we,” “us,” or “our”). {SITE_NAME}{" "}
            provides health care and related services in the Hudson Valley and
            surrounding communities. This Privacy Policy governs your use of any
            online location that links to this Privacy Policy, including
            interactive features, widgets, plug-ins, applications, content,
            downloads, and other digital services we make available (collectively,
            the “Service”), regardless of how you access the Service.
          </p>
          <p className="mt-3">
            Please read this policy and our cookie practices carefully. By
            accessing the Service, you agree to accept this Privacy Policy and
            related notices, subject to applicable law. We may update this
            policy from time to time by posting a revised version on the
            Service; your continued use after changes means you accept the
            revised policy.
          </p>
          <p className="mt-3">
            If we provide different or additional privacy terms at the point of
            collection (for example, on a specific form), those terms govern
            that collection and use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            This policy does not govern protected health information (PHI)
          </h2>
          <p>
            <strong>
              This Privacy Policy does not apply to your Protected Health
              Information (PHI)
            </strong>{" "}
            as defined under the Health Insurance Portability and Accountability
            Act (HIPAA). We may receive PHI when you schedule an appointment,
            use our patient portal (such as MyChart), use online bill pay, or
            receive treatment. PHI is handled in accordance with our{" "}
            <strong>Notice of Privacy Practices</strong>, which is available from
            our offices and upon request.             If you have questions about how we use
            or disclose PHI, please review that notice or contact us using the
            information below. For a summary of patient rights, you may also
            review our{" "}
            <Link
              href="/resource/patient-bill-of-rights"
              className="text-[#49A3DA] font-semibold hover:underline"
            >
              Patient Bill of Rights
            </Link>
            . We may link usage information or personal
            information to your PHI; when we do, we will treat the combined
            information as PHI going forward where required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Information we collect
          </h2>
          <p>
            Our web servers may automatically collect information such as your
            domain name, IP address, browser type, pages you visit, time spent
            on the Service, and similar technical data. We do not use this
            automatic data to identify you personally unless you voluntarily
            provide identifying information through registration or interactive
            features. Information collected automatically is generally not part
            of any designated record set under HIPAA.
          </p>
          <p className="mt-3">
            If you use interactive features or partner tools linked from our
            Service, you may be asked to opt in to certain data collection as
            described at the point of collection. If you choose not to provide
            required information, some features may be unavailable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            How we use information
          </h2>
          <p>
            We use information you provide to deliver the services, products, or
            information you request, to operate and improve the Service, and as
            permitted by law. We do not sell your personal information. We do not
            rent or license your email address or other personal identifiers to
            third parties for their own marketing unless you expressly agree or
            as required to fulfill your request.
          </p>
          <p className="mt-3">
            Like many organizations, we use cookies and similar technologies to
            facilitate your experience, remember preferences, measure traffic,
            and improve content. Aggregate or de-identified information may be
            used to improve the Service and may be shared with vendors who assist
            us. Third-party tools may set their own cookies or collect data
            subject to their policies; we encourage you to read their privacy
            statements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Third-party analytics and advertising
          </h2>
          <p>
            We may use third-party vendors for hosting, analytics, security, or
            related services. Those vendors may collect or process information
            about your device or use of the Service under their own terms. We are
            not responsible for third-party technologies or activities beyond
            what we control. Common categories of vendors include web analytics
            and advertising measurement partners; where we use them, their
            policies describe opt-out and data practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Cookie statement
          </h2>
          <p>
            When you visit the Service, we may place session or persistent
            cookies on your device to customize your experience, remember
            settings, and understand how the Service is used. Session cookies
            typically expire when you close your browser. You may refuse or
            delete cookies through your browser settings; doing so may limit
            some functionality.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 font-semibold text-[#002147]">
                    Type of cookie
                  </th>
                  <th className="p-3 font-semibold text-[#002147]">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium">Essential</td>
                  <td className="p-3">
                    Required for core features you request, such as security,
                    load balancing, and session management.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Functionality</td>
                  <td className="p-3">
                    Remember choices you make (for example, language or
                    accessibility preferences) so you do not have to re-enter
                    them.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Analytics &amp; performance</td>
                  <td className="p-3">
                    Help us understand aggregate traffic, navigation, and
                    performance so we can improve the Service. Data is typically
                    aggregated or pseudonymous.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Advertising &amp; social</td>
                  <td className="p-3">
                    May be used where we work with partners to measure campaigns
                    or enable social sharing, subject to partner policies and
                    your choices.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            We may use pixel tags (web beacons) to understand how pages and
            emails are used. Some browsers send “Do Not Track” signals; the
            Service may not respond differently to all such signals today.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Sites we link to
          </h2>
          <p>
            The Service may link to third-party websites, tools, or sponsors for
            your convenience. We are not responsible for the privacy practices
            or content of those sites. Please review their policies before
            providing information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Promotions and legal disclosures
          </h2>
          <p>
            If we offer sweepstakes, contests, or similar promotions, official
            rules may require collection or disclosure of information as
            described in those rules. We may also disclose information when we
            believe in good faith that disclosure is necessary to protect
            rights, safety, or property, or to comply with law, regulation, or
            legal process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Information for parents about children
          </h2>
          <p>
            The Service is not directed to children under 13 to collect personal
            information without appropriate consent. If you believe a child
            under 13 has provided personal information through the Service
            without parental consent, please contact us at{" "}
            <a href={`tel:${MAIN_PHONE}`} className="text-[#49A3DA] font-semibold">
              {MAIN_PHONE_DISPLAY}
            </a>{" "}
            and we will take reasonable steps to delete such information as
            required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Changes to this policy
          </h2>
          <p>
            We may revise this Privacy Policy periodically. The “Last updated”
            date at the top reflects the latest revision. Material changes may be
            highlighted on the Service or communicated where appropriate.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Electronic communications disclaimer
          </h2>
          <p className="text-sm text-slate-600">
            No guarantee of confidentiality or privacy is made for information
            transmitted over the internet. {SITE_NAME} is not liable for the
            privacy of information, email addresses, or other content transmitted
            through networks beyond our reasonable control, except as required by
            applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">Contact us</h2>
          <p>
            Questions about this Privacy Policy or unwanted email from this
            Service may be directed to:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>
              Phone:{" "}
              <a href={`tel:${MAIN_PHONE}`} className="text-[#49A3DA] font-semibold">
                {MAIN_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              Website:{" "}
              <a href={SITE_URL} className="text-[#49A3DA] font-semibold">
                {SITE_URL.replace(/^https?:\/\//, "")}
              </a>
            </li>
          </ul>
        </section>
      </div>

      <p className="mt-12 pt-8 border-t border-slate-200">
        <Link href="/" className="text-[#49A3DA] font-semibold hover:underline">
          ← Back to home
        </Link>
        {" · "}
        <Link
          href="/legal/terms-of-use"
          className="text-[#49A3DA] font-semibold hover:underline"
        >
          Terms of Use
        </Link>
      </p>
    </div>
  );
}
