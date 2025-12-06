"use client";

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#0a0a0f] via-[#111827] to-[#0a0a0f] text-white">
      <section className="max-w-3xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Terms of Service
          </h1>
          <p className="text-gray-300 mt-3">
            Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* CONTAINER */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl space-y-10">

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">1. Acceptance of Terms</h2>
            <p className="text-gray-200 leading-relaxed">
              By accessing or using Cheers Buddy, you agree to these Terms of Service.
              If you do not agree, please do not use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">2. Eligibility</h2>
            <p className="text-gray-200 leading-relaxed">
              You must be at least 16 years old to use the service. You agree to
              provide accurate information and not impersonate others.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">3. User Responsibilities</h2>
            <p className="text-gray-200 leading-relaxed">
              Users must treat others with respect, avoid harassment or harmful content,
              and use the platform in a lawful manner. You may not post abusive,
              hateful, explicit, or misleading content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">4. User Content</h2>
            <p className="text-gray-200 leading-relaxed">
              You retain ownership of content you post on Cheers Buddy but grant us a
              license to display, store, and process it for the purpose of running the service.
              You are responsible for ensuring your content does not violate others’ rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">5. Premium Features</h2>
            <p className="text-gray-200 leading-relaxed">
              Some features may require a paid subscription. Subscriptions renew
              automatically unless cancelled. Refunds follow UK consumer law and our policies.
              We may modify or discontinue premium features at any time with notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">6. Prohibited Behaviour</h2>
            <p className="text-gray-200 leading-relaxed">
              You may not impersonate others, send spam, scrape data, post hateful content,
              upload malware, or attempt to disrupt or manipulate the service.
              Violations may result in suspension or termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">7. Safety & Wellbeing</h2>
            <p className="text-gray-200 leading-relaxed">
              Cheers Buddy is a supportive platform but is not a substitute for professional
              help. We may take action if content suggests harm, including contacting
              appropriate authorities when legally required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">8. Account Termination</h2>
            <p className="text-gray-200 leading-relaxed">
              We may suspend or terminate accounts that violate these Terms. You may delete
              your account at any time. Data removal will follow our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">9. Disclaimers</h2>
            <p className="text-gray-200 leading-relaxed">
              The service is provided “as is” without warranties. We do not guarantee
              uninterrupted operation or accuracy of user-generated content.
              We are not liable for decisions made based on platform interactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">10. Limitation of Liability</h2>
            <p className="text-gray-200 leading-relaxed">
              To the fullest extent permitted by law, Cheers Buddy is not liable for damages
              arising from service use, including lost profits, data loss, emotional distress,
              or interruptions. User content is the responsibility of its creators.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">11. Governing Law</h2>
            <p className="text-gray-200 leading-relaxed">
              These Terms are governed by the laws of the United Kingdom. Any disputes will
              be resolved in UK courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-purple-300">12. Changes to Terms</h2>
            <p className="text-gray-200 leading-relaxed">
              We may update these Terms from time to time. Continued use of the service
              after updates constitutes acceptance of the new terms.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}
