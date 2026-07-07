/** Body of the Terms of Service legal document. Rendered by `app/legal/[slug]`,
    which supplies the shared chrome (eyebrow, title, last-updated, template
    callout). Keep the content here; metadata lives in `@/lib/legal`. */
export function TermsBody() {
  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="font-semibold text-2xl tracking-tight">1. Acceptance of these terms</h2>
        <p className="mt-3 text-text-secondary">
          These Terms of Service (the "Terms") govern your access to and use of the Briesa website
          and the Briesa compliance platform (together, the "Service"), provided by Briesa Pty Ltd
          (ABN 68 461 702 776) ("Briesa", "we", "us" or "our"). By creating an account, subscribing
          or otherwise using the Service, you agree to these Terms. If you are entering into these
          Terms on behalf of an organisation, you confirm you are authorised to bind that
          organisation, which is the "Customer".
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">2. The Service</h2>
        <p className="mt-3 text-text-secondary">
          Briesa provides a hosted, subscription-based platform for managing work health and safety,
          governance, risk, compliance and ISO certification activities. We may add, change or
          remove features over time. We will not materially reduce the core functionality of a paid
          tier during a paid term without reasonable notice.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">3. Accounts and security</h2>
        <p className="mt-3 text-text-secondary">
          You are responsible for maintaining the confidentiality of your account credentials and
          for all activity that occurs under your account. You must notify us promptly of any
          unauthorised use. You must provide accurate account and billing information and keep it up
          to date. You are responsible for the conduct of users you invite to your organisation's
          account.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">4. Subscriptions and billing</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-text-secondary">
          <li>
            Subscriptions are priced per organisation according to the tier you select, as set out
            on our pricing page. Field workers, contractors and visitors are unlimited on every
            tier.
          </li>
          <li>
            Fees are billed in advance on a monthly or annual basis and, unless stated otherwise,
            are quoted in Australian dollars and exclusive of GST, which will be added where
            applicable.
          </li>
          <li>
            Subscriptions renew automatically for successive terms unless cancelled before the
            renewal date. You may cancel at any time; cancellation takes effect at the end of the
            current billing term.
          </li>
          <li>
            Except where required by the Australian Consumer Law, fees already paid are
            non-refundable, and downgrading may cause loss of features or capacity.
          </li>
          <li>
            We may change our fees with at least thirty (30) days' notice, with changes taking
            effect at your next renewal.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">5. Acceptable use</h2>
        <p className="mt-3 text-text-secondary">You agree not to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-text-secondary">
          <li>use the Service in breach of any applicable law or regulation;</li>
          <li>
            upload or transmit malicious code, or attempt to gain unauthorised access to the Service
            or its underlying systems;
          </li>
          <li>
            interfere with or disrupt the integrity or performance of the Service, or probe, scan or
            test its vulnerability without our written consent;
          </li>
          <li>
            resell, sublicense or make the Service available to any third party except your
            authorised users; or
          </li>
          <li>
            use the Service to store or transmit content that is unlawful, infringing or harmful.
          </li>
        </ul>
        <p className="mt-3 text-text-secondary">
          We may suspend access where we reasonably believe these Terms have been breached or the
          Service is being used in a way that poses a security or legal risk.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">6. Customer data</h2>
        <p className="mt-3 text-text-secondary">
          As between you and us, you own the data you and your users submit to the Service
          ("Customer Data"). You grant us a licence to host, process and transmit Customer Data
          solely to provide and support the Service. You are responsible for the accuracy and
          legality of Customer Data and for having the right to provide it to us. Our handling of
          personal information is described in our{" "}
          <a href="/legal/privacy" className="text-text underline">
            Privacy Policy
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">7. Intellectual property</h2>
        <p className="mt-3 text-text-secondary">
          The Service, including all software, design, content and trademarks, is owned by Briesa or
          its licensors and is protected by intellectual property laws. Subject to these Terms, we
          grant you a non-exclusive, non-transferable right to access and use the Service during
          your subscription term. We retain all rights not expressly granted. Any feedback you
          provide may be used by us without restriction.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">8. Availability and support</h2>
        <p className="mt-3 text-text-secondary">
          We aim to keep the Service available and reliable, but it is provided on an "as available"
          basis and may occasionally be unavailable for maintenance, updates or factors beyond our
          reasonable control. Any service-level commitments will be set out in a separate written
          agreement where applicable.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">
          9. Disclaimers and Australian Consumer Law
        </h2>
        <p className="mt-3 text-text-secondary">
          The Service supports your compliance program but does not replace professional, legal or
          safety advice, and you remain responsible for your own regulatory obligations. To the
          maximum extent permitted by law, the Service is provided without warranties of any kind.
          Nothing in these Terms excludes, restricts or modifies any guarantee, right or remedy you
          may have under the Australian Consumer Law that cannot lawfully be excluded. Where our
          liability for failing to meet a consumer guarantee can be limited, it is limited to
          re-supplying the relevant service or paying the cost of re-supply.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">10. Limitation of liability</h2>
        <p className="mt-3 text-text-secondary">
          To the maximum extent permitted by law, and subject to the section above, neither party is
          liable for any indirect, incidental, special or consequential loss, or for loss of
          profits, revenue or data. Our total aggregate liability arising out of or in connection
          with the Service is limited to the fees paid by you for the Service in the twelve (12)
          months preceding the event giving rise to the claim.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">11. Term and termination</h2>
        <p className="mt-3 text-text-secondary">
          These Terms apply for as long as you use the Service. Either party may terminate a
          subscription at the end of the then-current term, and we may suspend or terminate access
          immediately where you materially breach these Terms and fail to remedy the breach within a
          reasonable period. On termination, your right to use the Service ceases. We will make
          Customer Data available for export for a reasonable period after termination, after which
          it may be deleted in accordance with our retention practices.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">12. Changes to these terms</h2>
        <p className="mt-3 text-text-secondary">
          We may update these Terms from time to time. We will publish the current version on this
          page and update the "last updated" date. Where changes are material, we will give
          reasonable notice. Your continued use of the Service after changes take effect constitutes
          acceptance of the updated Terms.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">
          13. Governing law and jurisdiction
        </h2>
        <p className="mt-3 text-text-secondary">
          These Terms are governed by the laws of the State of Victoria, Australia, and the
          Commonwealth of Australia where applicable. You and Briesa submit to the non-exclusive
          jurisdiction of the courts of Victoria and the courts able to hear appeals from them.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-2xl tracking-tight">14. Contact us</h2>
        <p className="mt-3 text-text-secondary">
          Questions about these Terms can be sent to{" "}
          <a href="mailto:legal@briesa.com.au" className="text-text underline">
            legal@briesa.com.au
          </a>{" "}
          or via our{" "}
          <a href="/contact" className="text-text underline">
            contact page
          </a>
          .
        </p>
      </section>
    </div>
  );
}
