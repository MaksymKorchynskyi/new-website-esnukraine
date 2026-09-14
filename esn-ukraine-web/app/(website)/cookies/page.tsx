import type { Metadata } from 'next';
import Link from 'next/link';
import PolicyPageLayout from '@/components/ui/PolicyPageLayout';
import CookieSettingsButton from './CookieSettingsButton';

export const metadata: Metadata = {
  title: 'Cookie Policy — ESN Ukraine',
  description:
    'Learn about the cookies used on the ESN Ukraine website, how we use them, and how you can manage your preferences.',
};

const TABLE_OF_CONTENTS = [
  { id: 'what-are-cookies', label: 'What Are Cookies' },
  { id: 'how-we-use', label: 'How We Use Cookies' },
  { id: 'cookies-we-use', label: 'Cookies We Use' },
  { id: 'essential-cookies', label: 'Essential Cookies' },
  { id: 'analytics-cookies', label: 'Analytics Cookies' },
  { id: 'how-to-control', label: 'How to Control Cookies' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

export default function CookiePolicyPage() {
  return (
    <PolicyPageLayout
      title="Cookie Policy"
      lastUpdated="September 14, 2026"
      tableOfContents={TABLE_OF_CONTENTS}
    >
      {/* 1. What Are Cookies */}
      <section>
        <h2 id="what-are-cookies">What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your device (computer, tablet, or
          smartphone) when you visit a website. They are widely used to make websites work
          more efficiently, provide a better user experience, and give website owners useful
          information about how their site is being used.
        </p>
        <p>
          Cookies can be &quot;first-party&quot; (set by the website you are visiting) or
          &quot;third-party&quot; (set by a different domain). They can also be
          &quot;session&quot; cookies (deleted when you close your browser) or
          &quot;persistent&quot; cookies (remain on your device for a set period).
        </p>
      </section>

      {/* 2. How We Use Cookies */}
      <section>
        <h2 id="how-we-use">How We Use Cookies</h2>
        <p>
          ESN Ukraine uses cookies for two main purposes:
        </p>
        <ul>
          <li>
            <strong>Essential functionality:</strong> to ensure our website works properly,
            including remembering your cookie preferences and enabling security features
          </li>
          <li>
            <strong>Analytics:</strong> to understand how visitors interact with our
            website, which pages are most popular, and how we can improve the experience
            (only with your consent)
          </li>
        </ul>
        <p>
          We do <strong>not</strong> use cookies for advertising, marketing, or tracking
          across other websites.
        </p>
      </section>

      {/* 3. Cookies We Use */}
      <section>
        <h2 id="cookies-we-use">Cookies We Use</h2>
        <p>
          Below is a complete list of cookies used on our website:
        </p>

        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-esn-dark bg-gray-50 rounded-tl-lg">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-bold text-esn-dark bg-gray-50">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-bold text-esn-dark bg-gray-50">
                  Purpose
                </th>
                <th className="text-left py-3 px-4 font-bold text-esn-dark bg-gray-50">
                  Duration
                </th>
                <th className="text-left py-3 px-4 font-bold text-esn-dark bg-gray-50 rounded-tr-lg">
                  Provider
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-mono text-xs">esn_consent_given</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-esn-dark/10 text-esn-dark">
                    Essential
                  </span>
                </td>
                <td className="py-3 px-4">Records that cookie consent was given</td>
                <td className="py-3 px-4">1 year</td>
                <td className="py-3 px-4">First-party</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-mono text-xs">esn-cookie-consent</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-esn-dark/10 text-esn-dark">
                    Essential
                  </span>
                </td>
                <td className="py-3 px-4">Stores your cookie category preferences</td>
                <td className="py-3 px-4">Persistent</td>
                <td className="py-3 px-4">First-party (localStorage)</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-mono text-xs">__vercel_live_token</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-esn-dark/10 text-esn-dark">
                    Essential
                  </span>
                </td>
                <td className="py-3 px-4">Vercel preview mode authentication</td>
                <td className="py-3 px-4">Session</td>
                <td className="py-3 px-4">Vercel</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-mono text-xs">va_*</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-esn-cyan/10 text-esn-cyan">
                    Analytics
                  </span>
                </td>
                <td className="py-3 px-4">
                  Vercel Analytics — page views and performance metrics
                </td>
                <td className="py-3 px-4">Session</td>
                <td className="py-3 px-4">Vercel</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">ph_*</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-esn-cyan/10 text-esn-cyan">
                    Analytics
                  </span>
                </td>
                <td className="py-3 px-4">
                  PostHog — anonymized usage analytics
                </td>
                <td className="py-3 px-4">1 year</td>
                <td className="py-3 px-4">PostHog</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Essential Cookies */}
      <section>
        <h2 id="essential-cookies">Essential Cookies</h2>
        <p>
          Essential cookies are necessary for the basic functionality of our website. They
          enable core features such as page navigation, security, and remembering your
          cookie preferences. These cookies do not collect any personally identifiable
          information and cannot be disabled.
        </p>
        <p>
          Without these cookies, the website would not function properly.
        </p>
      </section>

      {/* 5. Analytics Cookies */}
      <section>
        <h2 id="analytics-cookies">Analytics Cookies</h2>
        <p>
          Analytics cookies help us understand how visitors interact with our website. They
          collect information such as which pages are visited most often, how visitors
          navigate between pages, and general performance metrics.
        </p>
        <p>
          All analytics data is <strong>anonymized</strong> and <strong>aggregated</strong>.
          We use this information solely to improve our website and the experience we
          provide to our visitors. We never use analytics data to identify individual users,
          and we never sell this data to third parties.
        </p>
        <p>
          Analytics cookies are only activated when you give your explicit consent through
          our cookie banner. You can change your preferences at any time.
        </p>
      </section>

      {/* 6. How to Control Cookies */}
      <section>
        <h2 id="how-to-control">How to Control Cookies</h2>
        <p>You can manage your cookie preferences in two ways:</p>

        <h3>Through Our Website</h3>
        <p>
          Click the button below or use the &quot;Cookie Settings&quot; link in our website
          footer to open the cookie preferences panel, where you can enable or disable
          analytics cookies at any time.
        </p>

        {/* Interactive button to open cookie settings */}
        <div className="not-prose my-6">
          <CookieSettingsButton />
        </div>

        <h3>Through Your Browser</h3>
        <p>
          Most web browsers allow you to control cookies through their settings. You can
          usually find cookie controls in your browser&apos;s &quot;Settings&quot;,
          &quot;Preferences&quot;, or &quot;Privacy&quot; section. Here are links to cookie
          management instructions for popular browsers:
        </p>
        <ul>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/en-us/105082"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>
        <p>
          Please note that disabling essential cookies through your browser may affect the
          functionality of our website.
        </p>
      </section>

      {/* 7. Changes */}
      <section>
        <h2 id="changes">Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in the
          cookies we use or for legal and regulatory reasons. When we make changes, we will
          update the &quot;Last updated&quot; date at the top of this page.
        </p>
      </section>

      {/* 8. Contact */}
      <section>
        <h2 id="contact">Contact Us</h2>
        <p>
          If you have any questions about this Cookie Policy or how we use cookies, please
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
            <strong className="text-esn-dark">Website:</strong>{' '}
            <Link href="/" className="text-esn-cyan hover:underline">
              esnukraine.org
            </Link>
          </p>
        </div>
      </section>
    </PolicyPageLayout>
  );
}
