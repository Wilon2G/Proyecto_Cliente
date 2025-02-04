import classNames from 'classnames';
import { useState } from 'react';
import { ButtonAction } from './Buttons';

function PrivacyPolices() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="dropdown h-fit">
      <ButtonAction
        textBtn="Review our privacy policies"
        onClick={toggleDropdown}
        className="text-2xl font-semibold mt-1 mb-1 transition-colors text-color"
      />

      <div
        className={classNames(
          `dropdown-content p-6 rounded-lg shadow-lg 
                  duration-300 ease-in-out overflow-scroll overflow-x-hidden text-left
                    ${isOpen ? ' opacity-100 h-96' : 'scale-y-0 h-0'}`,
          'bg-primary text-color',
        )}
      >
        <p className="mb-4">
          At RetroFrog, we take the privacy of our users very seriously. This
          privacy policy aims to inform you about how we collect, use, protect,
          and share your personal information when using our services. By
          accessing our website or making purchases in our store, you agree to
          the terms of this policy.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          1. Information We Collect
        </h3>
        <p>
          We collect personal information from our users in various ways,
          including when they visit our website, make purchases, or interact
          with our services. The types of information we collect include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Personally Identifiable Information:</strong> name, email
            address, shipping address, phone number, etc.
          </li>
          <li>
            <strong>Payment Information:</strong> credit card details, PayPal or
            other payment methods used.
          </li>
          <li>
            <strong>Browsing Data:</strong> IP address, browser type, pages
            visited, time spent on our site, etc.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> we use cookies
            and similar technologies to enhance user experience, personalize
            content, and analyze site traffic.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">2. Use of Information</h3>
        <p>We use the information collected for the following purposes:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Process and complete your video game orders and other products.
          </li>
          <li>
            Send order confirmations, notifications, and updates regarding your
            account or purchases.
          </li>
          <li>Improve our website and personalize the shopping experience.</li>
          <li>Respond to questions, comments, or customer support requests.</li>
          <li>
            Send newsletters, promotions, and updates about RetroFrog (if you
            have allowed it).
          </li>
          <li>
            Conduct statistical analysis of site usage and user preferences to
            improve our services.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          3. Sharing Information with Third Parties
        </h3>
        <p>
          We do not share your personal information with third parties except in
          the following cases:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Service Providers:</strong> we share your information with
            payment service providers, shipping services, and other partners who
            help us run our business, provided that these providers commit to
            protecting your information.
          </li>
          <li>
            <strong>Legal Compliance:</strong> we may disclose your information
            if required by law or in response to a valid request from a
            government or judicial authority.
          </li>
          <li>
            <strong>Business Transfers:</strong> in the event of a merger,
            acquisition, or sale of RetroFrog, your personal information may be
            transferred as part of the transaction, but always under the agreed
            privacy terms.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">4. Information Security</h3>
        <p>
          RetroFrog implements physical, electronic, and administrative security
          measures to protect your personal information from unauthorized
          access, alteration, disclosure, or destruction. However, no data
          transmission system over the internet or electronic storage is 100%
          secure, so we cannot guarantee absolute security.
        </p>

        <h3 className="text-xl font-semibold mb-2">5. Your Rights</h3>
        <p>
          You have the right to access, correct, or delete the personal
          information we hold about you. You may also request that we stop
          sending you marketing communications at any time. To exercise these
          rights, please contact us through the information provided at the end
          of this policy.
        </p>

        <h3 className="text-xl font-semibold mb-2">6. Use of Cookies</h3>
        <p>
          Cookies are small files stored on your device when you visit our
          website. We use cookies to improve user experience, perform analysis,
          and personalize content. You can configure your browser to reject
          cookies, but some features of the site may not be available if you do
          so.
        </p>

        <h3 className="text-xl font-semibold mb-2">7. Links to Other Sites</h3>
        <p>
          This website may contain links to third-party sites. We are not
          responsible for the privacy practices or content of these sites. We
          recommend that you review the privacy policies of third-party sites
          before providing them with any personal information.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          8. Changes to the Privacy Policy
        </h3>
        <p>
          RetroFrog reserves the right to update this privacy policy at any
          time. Any changes will be posted on this page with the date of the
          last update. We recommend that you periodically review this policy to
          stay informed about how we protect your information.
        </p>

        <h3 className="text-xl font-semibold mb-2">9. Contact</h3>
        <p>
          If you have any questions about this privacy policy or how we handle
          your personal information, please feel free to contact us:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Email:{' '}
            <a
              href="mailto:support@retrofrog.com"
              className="text-blue-400 hover:text-blue-600"
            >
              support@retrofrog.com
            </a>
          </li>
          <li>Phone: 123-456-789</li>
          <li>Address: Retro Street 123, City, Madrid</li>
        </ul>

        <p>
          Last updated on: <strong>December 8, 2024</strong>
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolices;
