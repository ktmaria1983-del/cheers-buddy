"use client";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#0a0a0f] via-[#111827] to-[#0a0a0f] text-white">
      <section className="max-w-3xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
            Privacy Policy
          </h1>
          <p className="text-gray-300 mt-3">
            Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* CONTAINER */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl space-y-10">

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">1. Who We Are</h2>
            <p className="text-gray-200 leading-relaxed">
              Cheers Buddy (“we”, “us”, “our”) respects your privacy. We operate in the United
              Kingdom and process data in line with UK GDPR and the Data Protection Act 2018.
              This policy explains how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">2. Information We Collect</h2>

            <h3 className="text-lg font-medium text-pink-200 mt-4 mb-1">2.1 Account Information</h3>
            <p className="text-gray-200 leading-relaxed">
              We collect your email address, encrypted password, display name, profile photo
              (optional), and category preferences.
            </p>

            <h3 className="text-lg font-medium text-pink-200 mt-4 mb-1">2.2 User Activity</h3>
            <p className="text-gray-200 leading-relaxed">
              This includes wins you post, cheers you send, categories visited, saved items,
              and interactions with future features such as comments or challenges.
            </p>

            <h3 className="text-lg font-medium text-pink-200 mt-4 mb-1">2.3 Premium & Payments</h3>
            <p className="text-gray-200 leading-relaxed">
              Payments are processed securely through third-party providers (e.g., Stripe).
              We do not store full card information.
            </p>

            <h3 className="text-lg font-medium text-pink-200 mt-4 mb-1">2.4 Automatically Collected Information</h3>
            <p className="text-gray-200 leading-relaxed">
              We may collect IP address, device/browser type, cookies, and analytics data
              to improve functionality and security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">3. How We Use Your Information</h2>
            <p className="text-gray-200 leading-relaxed">
              We use your data to:
            </p>
            <ul className="list-disc ml-6 text-gray-200 leading-relaxed space-y-1">
              <li>create and maintain your account</li>
              <li>display wins, cheers, and profile information</li>
              <li>deliver premium features</li>
              <li>enhance safety and prevent misuse</li>
              <li>improve the service using anonymous analytics</li>
              <li>provide customer support</li>
              <li>comply with legal obligations</li>
            </ul>
            <p className="text-gray-200 mt-4 leading-relaxed">
              We do <strong>not</strong> sell your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">4. Legal Bases for Processing</h2>
            <p className="text-gray-200 leading-relaxed">
              Under GDPR, we process data based on:
            </p>
            <ul className="list-disc ml-6 text-gray-200 leading-relaxed space-y-1">
              <li><strong>Contract</strong> – providing the service you signed up for</li>
              <li><strong>Legitimate interests</strong> – analytics, prevention of misuse</li>
              <li><strong>Consent</strong> – optional marketing or extra permissions</li>
              <li><strong>Legal obligation</strong> – fraud prevention and compliance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">5. Data Retention</h2>
            <p className="text-gray-200 leading-relaxed">
              We keep data only as long as necessary:
            </p>
            <ul className="list-disc ml-6 text-gray-200 leading-relaxed space-y-1">
              <li>Active accounts: data is kept while your account remains active</li>
              <li>Deleted accounts: removed within 30–90 days (backups up to 180 days)</li>
              <li>Wins/cheers: removed when you delete them</li>
              <li>Analytics: stored anonymously</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">6. Sharing Your Information</h2>
            <p className="text-gray-200 leading-relaxed">
              We share minimal data with trusted partners required to operate the service:
            </p>
            <ul className="list-disc ml-6 text-gray-200 leading-relaxed space-y-1">
              <li>Supabase (database & authentication)</li>
              <li>Payment processors (e.g., Stripe)</li>
              <li>Email delivery services</li>
              <li>Analytics tools</li>
            </ul>
            <p className="text-gray-200 mt-4 leading-relaxed">
              All partners follow GDPR-compliant practices.  
              We never sell or trade personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">7. International Transfers</h2>
            <p className="text-gray-200 leading-relaxed">
              Some partners may store data outside the UK/EU.  
              We use approved safeguards such as Standard Contractual Clauses to ensure
              your data remains protected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">8. Your Rights</h2>
            <p className="text-gray-200 leading-relaxed">
              You may request at any time to:
            </p>
            <ul className="list-disc ml-6 text-gray-200 leading-relaxed space-y-1">
              <li>access your data</li>
              <li>correct or update inaccurate information</li>
              <li>delete your account & personal data</li>
              <li>export your data</li>
              <li>withdraw consent for optional processing</li>
              <li>object to certain forms of processing</li>
            </ul>
            <p className="text-gray-200 leading-relaxed mt-4">
              Contact: <span className="text-pink-200">support@cheersbuddy.app</span> (placeholder)
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">9. Children’s Privacy</h2>
            <p className="text-gray-200 leading-relaxed">
              Cheers Buddy is intended for users aged 16 and above.  
              We do not knowingly collect data from children under 16.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">10. Security</h2>
            <p className="text-gray-200 leading-relaxed">
              We use industry-standard measures to protect your information, including:
            </p>
            <ul className="list-disc ml-6 text-gray-200 leading-relaxed space-y-1">
              <li>encrypted connections (HTTPS)</li>
              <li>secure Supabase storage</li>
              <li>access controls</li>
              <li>regular internal audits</li>
            </ul>
            <p className="text-gray-200 mt-4 leading-relaxed">
              While no system is perfectly secure, we take active measures to minimise risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">11. Changes to This Policy</h2>
            <p className="text-gray-200 leading-relaxed">
              We may update this Privacy Policy to reflect improvements or legal requirements.
              Significant changes will be communicated in the app.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}
