import type { Metadata } from 'next';
import Link from 'next/link';
import PolicyPageLayout from '@/components/ui/PolicyPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy — ESN Ukraine',
  description:
    'Learn how Erasmus Student Network Ukraine collects, uses, and protects your personal data in compliance with GDPR.',
};

const TABLE_OF_CONTENTS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'data-controller', label: 'Data Controller' },
  { id: 'data-we-collect', label: 'What Data We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Data' },
  { id: 'legal-basis', label: 'Legal Basis' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'third-party', label: 'Third-Party Services' },
  { id: 'data-sharing', label: 'Data Sharing' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'children', label: "Children's Privacy" },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageLayout
      title="Privacy Policy"
      lastUpdated="September 14, 2026"
      tableOfContents={TABLE_OF_CONTENTS}
    >
      {/* 1. Introduction */}
      <section>
        <h2 id="introduction">Introduction</h2>
        <p>
          Erasmus Student Network Ukraine (&quot;ESN Ukraine&quot;, &quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy and
          ensuring the security of your personal data. This Privacy Policy explains how we
          collect, use, and safeguard information when you visit our website{' '}
          <Link href="/">esnukraine.org</Link>.
        </p>
        <p>
          By using our website, you acknowledge that you have read and understood this
          Privacy Policy. We encourage you to review it periodically for any updates.
        </p>
      </section>

      {/* 2. Data Controller */}
      <section>
        <h2 id="data-controller">Data Controller</h2>
        <p>
          The data controller responsible for your personal data is:
        </p>
        <div className="not-prose bg-gray-50 rounded-xl border border-gray-200 p-5 my-4">
          <p className="font-bold text-esn-dark mb-1">
            Erasmus Student Network Ukraine
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            58 Volodymyrska str., r. 45a
            <br />
            01601 Kyiv, Ukraine
            <br />
            Email:{' '}
            <a
              href="mailto:ukraine-nr@esn.org"
              className="text-esn-cyan hover:underline"
            >
              ukraine-nr@esn.org
            </a>
          </p>
        </div>
      </section>

      {/* 3. What Data We Collect */}
      <section>
        <h2 id="data-we-collect">What Data We Collect</h2>
        <p>We may collect the following types of information:</p>

        <h3>Technical Data (Collected Automatically)</h3>
        <ul>
          <li>IP address (anonymized where possible)</li>
          <li>Browser type and version</li>
          <li>Device type and operating system</li>
          <li>Pages visited, time spent on pages, and navigation patterns</li>
          <li>Referring website URL</li>
        </ul>

        <h3>Information You Provide</h3>
        <ul>
          <li>
            <strong>Newsletter subscription:</strong> your email address, provided when
            you subscribe to our newsletter
          </li>
          <li>
            <strong>Contact forms:</strong> your name and email address when you reach out
            to us via our contact page
          </li>
        </ul>

        <h3>Cookie Preferences</h3>
        <p>
          We store your cookie consent preferences locally on your device. See our{' '}
          <Link href="/cookies">Cookie Policy</Link> for full details.
        </p>
      </section>

      {/* 4. How We Use Your Data */}
      <section>
        <h2 id="how-we-use">How We Use Your Data</h2>
        <p>We use the data we collect for the following purposes:</p>
        <ul>
          <li>
            <strong>Website functionality and security:</strong> ensuring our website
            operates correctly and securely
          </li>
          <li>
            <strong>Analytics:</strong> understanding how visitors use our website so we
            can improve the user experience (all data is anonymized)
          </li>
          <li>
            <strong>Newsletter:</strong> sending you updates about ESN Ukraine activities,
            events, and opportunities (only with your explicit consent)
          </li>
          <li>
            <strong>Communication:</strong> responding to your inquiries submitted via our
            contact forms
          </li>
        </ul>
      </section>

      {/* 5. Legal Basis */}
      <section>
        <h2 id="legal-basis">Legal Basis for Processing</h2>
        <p>
          We process your personal data based on the following legal grounds under the
          General Data Protection Regulation (GDPR):
        </p>
        <ul>
          <li>
            <strong>Consent:</strong> when you subscribe to our newsletter, submit a
            contact form, or accept analytics cookies
          </li>
          <li>
            <strong>Legitimate interest:</strong> for website security, fraud prevention,
            and basic analytics to improve our services
          </li>
        </ul>
        <p>
          You may withdraw your consent at any time by unsubscribing from our newsletter
          or changing your cookie preferences via the &quot;Cookie Settings&quot; option in
          the website footer.
        </p>
      </section>

      {/* 6. Cookies */}
      <section>
        <h2 id="cookies">Cookies</h2>
        <p>
          Our website uses cookies — small text files stored on your device — to ensure
          proper functionality and, with your consent, to collect anonymized analytics
          data.
        </p>
        <p>
          We use two categories of cookies: <strong>Strictly Necessary</strong> (required
          for the website to function) and <strong>Analytics</strong> (to understand how
          visitors use our site).
        </p>
        <p>
          For a complete list of cookies we use and how to manage them, please visit our{' '}
          <Link href="/cookies">Cookie Policy</Link>.
        </p>
      </section>

      {/* 7. Third-Party Services */}
      <section>
        <h2 id="third-party">Third-Party Services</h2>
        <p>
          We use the following trusted third-party services to operate our website. Each
          provider has its own privacy policy governing their use of data:
        </p>

        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-esn-dark bg-gray-50 rounded-tl-lg">
                  Service
                </th>
                <th className="text-left py-3 px-4 font-bold text-esn-dark bg-gray-50">
                  Purpose
                </th>
                <th className="text-left py-3 px-4 font-bold text-esn-dark bg-gray-50 rounded-tr-lg">
                  Data Processed
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Vercel</td>
                <td className="py-3 px-4">Hosting, edge network, analytics</td>
                <td className="py-3 px-4">IP address, page views, performance metrics</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Sanity CMS</td>
                <td className="py-3 px-4">Content management</td>
                <td className="py-3 px-4">No user data collected</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Resend</td>
                <td className="py-3 px-4">Newsletter delivery</td>
                <td className="py-3 px-4">Email address</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">PostHog</td>
                <td className="py-3 px-4">Product analytics</td>
                <td className="py-3 px-4">
                  Anonymized usage data, page views
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Data Sharing */}
      <section>
        <h2 id="data-sharing">Data Sharing</h2>
        <p>
          We do <strong>not</strong> sell, rent, or trade your personal data to any third
          parties. We only share data with the service providers listed above, strictly for
          the purposes described in this policy.
        </p>
        <p>
          We may disclose your data if required by law or if we believe in good faith that
          such action is necessary to comply with legal obligations.
        </p>
      </section>

      {/* 9. Data Retention */}
      <section>
        <h2 id="data-retention">Data Retention</h2>
        <p>We retain your data for the following periods:</p>
        <ul>
          <li>
            <strong>Newsletter contacts:</strong> until you unsubscribe
          </li>
          <li>
            <strong>Analytics data:</strong> up to 26 months
          </li>
          <li>
            <strong>Cookie consent preferences:</strong> 12 months
          </li>
          <li>
            <strong>Contact form submissions:</strong> up to 12 months after resolution
          </li>
        </ul>
        <p>
          After these periods, your data is automatically deleted or anonymized.
        </p>
      </section>

      {/* 10. Your Rights */}
      <section>
        <h2 id="your-rights">Your Rights</h2>
        <p>
          Under the General Data Protection Regulation (GDPR), you have the following
          rights regarding your personal data:
        </p>
        <ul>
          <li>
            <strong>Right of access:</strong> request a copy of the personal data we hold
            about you
          </li>
          <li>
            <strong>Right to rectification:</strong> request correction of inaccurate or
            incomplete data
          </li>
          <li>
            <strong>Right to erasure:</strong> request deletion of your personal data
            (&quot;right to be forgotten&quot;)
          </li>
          <li>
            <strong>Right to restriction:</strong> request that we limit the processing of
            your data
          </li>
          <li>
            <strong>Right to data portability:</strong> receive your data in a structured,
            commonly used format
          </li>
          <li>
            <strong>Right to object:</strong> object to the processing of your data for
            specific purposes
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{' '}
          <a href="mailto:ukraine-nr@esn.org">ukraine-nr@esn.org</a>. We will respond to
          your request within 30 days.
        </p>
      </section>

      {/* 11. Children's Privacy */}
      <section>
        <h2 id="children">Children&apos;s Privacy</h2>
        <p>
          Our website is not directed at children under the age of 16. We do not knowingly
          collect personal data from children. If you believe that we have inadvertently
          collected data from a child, please contact us immediately and we will take steps
          to delete the information.
        </p>
      </section>

      {/* 12. Changes */}
      <section>
        <h2 id="changes">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our
          practices or for legal and regulatory reasons. When we make significant changes,
          we will update the &quot;Last updated&quot; date at the top of this page.
        </p>
        <p>
          We encourage you to review this page periodically to stay informed about how we
          protect your data.
        </p>
      </section>

      {/* 13. Contact */}
      <section>
        <h2 id="contact">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our data practices, please
          contact us:
        </p>
        <div className="not-prose bg-gray-50 rounded-xl border border-gray-200 p-5 my-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong className="text-esn-dark">Email:</strong>{' '}
            <a
              href="mailto:ukraine-nr@esn.org"
              className="text-esn-cyan hover:underline"
            >
              ukraine-nr@esn.org
            </a>
            <br />
            <strong className="text-esn-dark">Address:</strong> 58 Volodymyrska str., r.
            45a, 01601 Kyiv, Ukraine
          </p>
        </div>
      </section>
    </PolicyPageLayout>
  );
}
