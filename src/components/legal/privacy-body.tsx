/** Body of the Privacy Policy legal document. Rendered by `app/legal/[slug]`,
    which supplies the shared chrome (eyebrow, title, last-updated, template
    callout). Keep the content here; metadata lives in `@/lib/legal`. */
export function PrivacyBody() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-semibold text-2xl tracking-tight">1. Who we are</h2>
        <p className="mt-3 text-text-secondary">
          This Privacy Policy explains how Briesa Pty Ltd (ABN 68 461 702 776) ("Briesa", "we", "us"
          or "our") handles personal information when you use our website and the Briesa compliance
          platform (the "Service"). We are bound by the Privacy Act 1988 (Cth) and the Australian
          Privacy Principles (APPs) contained in that Act.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">2. Information we collect</h2>
        <p className="mt-3 text-text-secondary">
          We collect personal information that is reasonably necessary to provide and improve the
          Service. The information we collect includes:
        </p>
        <ul className="mt-4 space-y-3 text-text-secondary">
          <li className="border border-border bg-bg-secondary p-4">
            <span className="font-medium text-text">Account information</span> — name, work email
            address, organisation name, role and, where you create a paid subscription, billing
            contact details. Payments are processed by our payment provider; we do not store full
            card numbers.
          </li>
          <li className="border border-border bg-bg-secondary p-4">
            <span className="font-medium text-text">Submissions and operational data</span> —
            content you and your users enter into the Service, such as incident reports, risk
            assessments, compliance records, training results and contractor details. Your
            organisation controls this data; Briesa processes it on your behalf.
          </li>
          <li className="border border-border bg-bg-secondary p-4">
            <span className="font-medium text-text">Usage and device information</span> — log data,
            IP address, browser type, pages visited and feature usage, collected to operate, secure
            and improve the Service.
          </li>
          <li className="border border-border bg-bg-secondary p-4">
            <span className="font-medium text-text">Enquiry information</span> — details you provide
            when you request a demo, subscribe to our newsletter or contact support.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">3. How we use your information</h2>
        <p className="mt-3 text-text-secondary">We use personal information to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-text-secondary">
          <li>provide, maintain and administer the Service and your account;</li>
          <li>process subscriptions, billing and renewals;</li>
          <li>respond to enquiries, demo requests and support tickets;</li>
          <li>send service-related notices and, where you have opted in, product updates;</li>
          <li>monitor, secure, troubleshoot and improve the Service; and</li>
          <li>meet our legal, regulatory and record-keeping obligations under Australian law.</li>
        </ul>
        <p className="mt-3 text-text-secondary">
          We only use your information for a purpose for which it was collected, a directly related
          secondary purpose you would reasonably expect, or as otherwise permitted by law.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">4. Direct marketing</h2>
        <p className="mt-3 text-text-secondary">
          We will only send you marketing communications where you have consented or where permitted
          under the Privacy Act and the Spam Act 2003 (Cth). Every marketing email includes an
          unsubscribe link, and you can opt out at any time by contacting us. We do not sell
          personal information.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">5. Disclosure to third parties</h2>
        <p className="mt-3 text-text-secondary">
          We may disclose personal information to trusted service providers who help us run the
          Service — including cloud hosting, payment processing, email delivery and analytics —
          under contracts that require them to protect your information and use it only for the
          services they provide to us. We may also disclose information where required or authorised
          by law. We do not disclose your information for unrelated purposes without your consent.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">6. Storage and security</h2>
        <p className="mt-3 text-text-secondary">
          We take reasonable steps to protect personal information from misuse, interference and
          loss, and from unauthorised access, modification or disclosure. These steps include
          encryption in transit, access controls, network protections and regular review of our
          security practices. Personal information is hosted with reputable cloud providers and may
          be stored on servers located in Australia or overseas. Where information is held or
          accessed overseas, we take reasonable steps to ensure it is handled consistently with the
          APPs.
        </p>
        <p className="mt-3 text-text-secondary">
          We retain personal information only for as long as it is needed for the purposes described
          in this policy or as required by law, after which we take reasonable steps to destroy or
          de-identify it.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">
          7. The Australian Privacy Principles
        </h2>
        <p className="mt-3 text-text-secondary">
          Our handling of personal information is governed by the thirteen Australian Privacy
          Principles, which cover, among other things: the open and transparent management of
          personal information (APP 1); anonymity and pseudonymity (APP 2); the collection of
          solicited personal information (APPs 3–5); use and disclosure (APP 6); direct marketing
          (APP 7); cross-border disclosure (APP 8); the quality and security of personal information
          (APPs 10–11); and your rights to access and correct your information (APPs 12–13).
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">
          8. Accessing and correcting your information
        </h2>
        <p className="mt-3 text-text-secondary">
          You may request access to the personal information we hold about you, and ask us to
          correct it if it is inaccurate, out of date or incomplete. We will respond within a
          reasonable period. If we decline a request, we will explain why and how you may complain.
          There is no charge to make a request, though we may charge a reasonable cost to provide
          access in some cases.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">9. Cookies</h2>
        <p className="mt-3 text-text-secondary">
          Our website uses cookies and similar technologies to keep you signed in, remember your
          preferences and understand how the site is used. You can control cookies through your
          browser settings, though some features may not work without them.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">10. Complaints</h2>
        <p className="mt-3 text-text-secondary">
          If you believe we have breached the APPs or mishandled your personal information, please
          contact us using the details below. We will investigate and respond within a reasonable
          period. If you are not satisfied with our response, you may lodge a complaint with the
          Office of the Australian Information Commissioner (OAIC) at oaic.gov.au.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">11. Changes to this policy</h2>
        <p className="mt-3 text-text-secondary">
          We may update this Privacy Policy from time to time. The current version will always be
          available on this page, with the "last updated" date revised accordingly. Material changes
          will be communicated through the Service or by email.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">12. Contact us</h2>
        <p className="mt-3 text-text-secondary">
          For privacy questions, requests or complaints, contact our Privacy Officer at{" "}
          <a href="mailto:privacy@briesa.com.au" className="text-text underline">
            privacy@briesa.com.au
          </a>{" "}
          or through our{" "}
          <a href="/contact" className="text-text underline">
            contact page
          </a>
          .
        </p>
      </section>
    </div>
  );
}
