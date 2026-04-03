import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_NAME,
  SITE_URL,
  MAIN_PHONE,
  MAIN_PHONE_DISPLAY,
} from "@/lib/seo-constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for ${SITE_NAME} websites, patient portal, and related digital services.`,
};

export default function TermsOfUsePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:py-16 text-slate-800">
      <h1 className="text-3xl md:text-4xl font-bold text-[#002147] mb-2">
        Terms of Use
      </h1>
      <p className="text-sm text-slate-500 mb-10">
        Last updated: April 2026 · {SITE_URL}
      </p>

      <div className="space-y-10 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Agreement to these terms
          </h2>
          <p>
            Please read these Terms of Use carefully before using this website,
            our patient portal (such as MyChart), or any mobile application we
            offer (collectively, the “Site”). The Site is operated by{" "}
            <strong>{SITE_NAME}</strong> (“{SITE_NAME},” “we,” “us,” or “our”).
            These Terms of Use are a legal agreement between you and{" "}
            {SITE_NAME} regarding your access to and use of the Site and related
            online services (the “Services”).
          </p>
          <p className="mt-3">
            By browsing, downloading, or otherwise accessing or using the Site,
            you represent that you have read, understand, and agree to be bound
            by these Terms of Use, including any updates posted from time to
            time. If you do not agree, do not use the Site. Your continued use
            after changes are posted constitutes acceptance of the revised
            terms.
          </p>
          <p className="mt-3">
            <strong>These Terms may include dispute resolution provisions</strong>{" "}
            that affect how claims related to the Site are resolved. They do{" "}
            <strong>not</strong> apply to disputes arising solely from the
            clinical care you receive as a patient of {SITE_NAME}, even if those
            disputes relate to online tools used to support your care.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Medical disclaimer
          </h2>
          <p>
            <strong>
              In case of a medical emergency, call 911 or go to the nearest
              emergency department.
            </strong>{" "}
            The Site is not designed for emergencies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">Purpose</h2>
          <p>
            Information on the Site is provided for general educational and
            informational purposes. It is{" "}
            <strong>not</strong> personal medical advice, diagnosis, or
            treatment. Health needs vary; consult a qualified health care
            provider before acting on information you find here. We strive for
            accuracy but do not warrant that all content is complete or
            current.
          </p>
          <p className="mt-3">
            To schedule care with {SITE_NAME}, use the options provided on the
            Site or call{" "}
            <a href={`tel:${MAIN_PHONE}`} className="text-[#49A3DA] font-semibold">
              {MAIN_PHONE_DISPLAY}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Prohibited activities
          </h2>
          <p>You agree not to:</p>
          <ul className="mt-2 list-disc pl-6 space-y-2">
            <li>
              Transmit unlawful, threatening, fraudulent, defamatory, obscene,
              harassing, or abusive content.
            </li>
            <li>
              Use the Site for illegal or unethical purposes, spam, or
              unauthorized access to systems, accounts, or data.
            </li>
            <li>
              Copy, scrape, or systematically harvest Site content except as
              allowed by law or with our written permission.
            </li>
            <li>
              Interfere with the Site’s operation, security, or other users’
              access (including denial-of-service attempts or probing).
            </li>
            <li>
              Misrepresent your identity or affiliation, or use another
              person’s account without authorization.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Code of conduct
          </h2>
          <p>
            We welcome constructive feedback. Use respectful, honest
            communication. We may disclose information to authorities when
            required by law or when we reasonably believe disclosure is necessary
            to protect people or property. We may suspend or terminate access
            for violations of these Terms or applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Cookies and use of data
          </h2>
          <p>
            We use cookies and similar technologies as described in our{" "}
            <Link
              href="/legal/privacy-policy"
              className="text-[#49A3DA] font-semibold hover:underline"
            >
              Privacy Policy
            </Link>
            . Blocking or deleting cookies may limit certain features.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            How we use information you provide
          </h2>
          <p>
            If you submit phone numbers, email addresses, or mailing addresses
            through the Site, we use them to respond to requests and provide
            Services, consistent with our Privacy Policy and applicable law.
            {SITE_NAME} does not sell your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">Children</h2>
          <p>
            The Site is intended for users age 13 and older unless a specific
            feature states otherwise. We do not knowingly collect personal
            information from children under 13 without appropriate parental
            consent as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Consent to electronic communications
          </h2>
          <p>
            You agree that we may send you notices or communications by email
            (if provided), text (if you opt in), or posting on the Site, as
            permitted by law. You may opt out of marketing communications using
            the unsubscribe method provided in those messages, where
            applicable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Mobile messaging
          </h2>
          <p>
            If you enroll in text messaging from {SITE_NAME}, message and data
            rates may apply. You may opt out using instructions provided in the
            program or by contacting us at{" "}
            <a href={`tel:${MAIN_PHONE}`} className="text-[#49A3DA] font-semibold">
              {MAIN_PHONE_DISPLAY}
            </a>
            . Carriers are not liable for delayed or undelivered messages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Third-party links and services
          </h2>
          <p>
            The Site may contain links to third-party websites or services for
            convenience. {SITE_NAME} does not control and is not responsible for
            third-party content, products, or privacy practices. Your use of
            third-party sites is at your own risk and subject to their terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Intellectual property
          </h2>
          <p>
            {SITE_NAME} names, logos, and branding on the Site are protected by
            trademark and other laws. You may not use them without prior written
            permission except as allowed by law. Site content is owned by{" "}
            {SITE_NAME} or its licensors and is protected by copyright. Do not
            copy, modify, or distribute content without authorization.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">Disclaimer</h2>
          <p className="text-sm text-slate-700">
            THE SITE AND SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE,”
            WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
            INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE
            UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS. SOME
            JURISDICTIONS DO NOT ALLOW CERTAIN DISCLAIMERS; IN THOSE
            JURISDICTIONS, DISCLAIMERS APPLY TO THE FULLEST EXTENT PERMITTED BY
            LAW.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Limitation of liability
          </h2>
          <p className="text-sm text-slate-700">
            TO THE FULLEST EXTENT PERMITTED BY LAW, {SITE_NAME.toUpperCase()} AND
            ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS WILL NOT
            BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR GOODWILL, ARISING
            FROM YOUR USE OF THE SITE OR SERVICES, EVEN IF ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR CLAIMS ARISING
            OUT OF OR RELATED TO THE SITE OR THESE TERMS SHALL NOT EXCEED THE
            GREATER OF (A) THE AMOUNT YOU PAID US FOR THE SPECIFIC SERVICE GIVING
            RISE TO THE CLAIM IN THE THREE MONTHS BEFORE THE CLAIM, OR (B) ONE
            HUNDRED U.S. DOLLARS (US $100), IF NO FEES APPLIED. SOME
            JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS; IN THOSE
            JURISDICTIONS, LIMITATIONS APPLY TO THE MAXIMUM EXTENT PERMITTED.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">Indemnity</h2>
          <p>
            To the extent permitted by law, you agree to indemnify and hold
            harmless {SITE_NAME} and its affiliates from claims, damages, losses,
            and expenses (including reasonable attorneys’ fees) arising from
            your use of the Site, your violation of these Terms, or your
            violation of third-party rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Dispute resolution
          </h2>
          <p>
            <strong>Informal resolution.</strong> Before filing a claim, you agree
            to contact us at{" "}
            <a href={`tel:${MAIN_PHONE}`} className="text-[#49A3DA] font-semibold">
              {MAIN_PHONE_DISPLAY}
            </a>{" "}
            and attempt to resolve the dispute in good faith.
          </p>
          <p className="mt-3">
            <strong>Arbitration (Site-related disputes only).</strong> Except for
            claims that may be brought in small claims court, claims seeking
            injunctive relief for intellectual property infringement, or claims
            arising from the provision of health care services, any dispute
            arising out of or relating to these Terms or your use of the Site
            shall be resolved by binding arbitration administered by a neutral
            arbitration provider selected by {SITE_NAME}, under rules consistent
            with applicable consumer arbitration fairness principles.{" "}
            <strong>
              You and {SITE_NAME} agree to bring claims only in your or our
              individual capacity, not as a plaintiff or class member in any
              class or representative proceeding.
            </strong>{" "}
            If a court finds this class waiver unenforceable, the arbitration
            provision may not apply to you for that dispute.
          </p>
          <p className="mt-3">
            <strong>Governing law.</strong> These Terms are governed by the laws
            of the State of New York, without regard to conflict-of-law rules,
            except that the Federal Arbitration Act governs arbitration to the
            extent applicable.
          </p>
          <p className="mt-3">
            <strong>Venue.</strong> For disputes not subject to arbitration, you
            agree to the exclusive jurisdiction of the state and federal courts
            located in Orange County, New York, subject to applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            Patient portal (MyChart) terms
          </h2>
          <p>
            {SITE_NAME} may offer a secure patient portal (such as MyChart) for
            selected records, messaging, scheduling, and billing features. The
            portal is provided as a convenience; access may be changed or
            revoked for clinical, security, or operational reasons.
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2">
            <li>
              <strong>Not a substitute for emergency care.</strong> Do not use the
              portal for emergencies—call 911 or seek emergency care.
            </li>
            <li>
              <strong>Responses.</strong> We strive to respond to messages in a
              timely manner; allow reasonable time for non-urgent inquiries.
            </li>
            <li>
              <strong>Account security.</strong> Protect your username and
              password. You are responsible for activity under your credentials.
            </li>
            <li>
              <strong>Email notifications.</strong> Portal notifications may
              be sent to your email; anyone with access to that inbox may see
              that you received a message, even if the message does not include
              detailed clinical information.
            </li>
            <li>
              <strong>Proxy access.</strong> Access for parents, guardians, or
              proxies is subject to our policies and applicable law, including
              limits on certain adolescent records where required.
            </li>
          </ul>
          <p className="mt-3">
            For portal support, contact us at{" "}
            <a href={`tel:${MAIN_PHONE}`} className="text-[#49A3DA] font-semibold">
              {MAIN_PHONE_DISPLAY}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">
            International users
          </h2>
          <p>
            If you access the Site from outside the United States, you
            understand that information may be processed in the United States,
            where privacy laws may differ from those in your country.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">General</h2>
          <p>
            If any provision of these Terms is held invalid, the remainder
            remains in effect. Failure to enforce a provision is not a waiver.
            These Terms constitute the entire agreement between you and{" "}
            {SITE_NAME} regarding the Site, subject to other agreements you may
            have for clinical care or specific programs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#002147] mb-3">Contact</h2>
          <p>
            Questions about these Terms of Use:{" "}
            <a href={`tel:${MAIN_PHONE}`} className="text-[#49A3DA] font-semibold">
              {MAIN_PHONE_DISPLAY}
            </a>
          </p>
        </section>
      </div>

      <p className="mt-12 pt-8 border-t border-slate-200">
        <Link href="/" className="text-[#49A3DA] font-semibold hover:underline">
          ← Back to home
        </Link>
        {" · "}
        <Link
          href="/legal/privacy-policy"
          className="text-[#49A3DA] font-semibold hover:underline"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
