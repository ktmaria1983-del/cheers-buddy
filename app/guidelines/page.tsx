"use client";

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#0a0a0f] via-[#111827] to-[#0a0a0f] text-white">
      <section className="max-w-3xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
            Community Guidelines
          </h1>
          <p className="text-gray-300 mt-3">
            Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* CONTAINER */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl space-y-10">

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">1. Be Real</h2>
            <p className="text-gray-200 leading-relaxed">
              Cheers Buddy is for genuine people celebrating real progress. No fake profiles,
              impersonation, bots, or misleading identities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">2. Be Kind</h2>
            <p className="text-gray-200 leading-relaxed">
              Cheer to uplift, never to shame. Avoid harshness, sarcasm, or discouraging language.
              Kindness is the core of our community.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">3. Be Respectful</h2>
            <p className="text-gray-200 leading-relaxed">
              Respect different backgrounds, abilities, and experiences. No harassment,
              discrimination, bullying, or hostile behaviour of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">4. Celebrate Small Wins</h2>
            <p className="text-gray-200 leading-relaxed">
              Every step counts. Support tiny progresses the same way you support big achievements.
              No belittling or comparing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">5. Keep It Safe</h2>
            <p className="text-gray-200 leading-relaxed">
              We are a supportive space, not an emergency service. Avoid posting harmful, dangerous,
              or triggering content. Respond with empathy, not medical or legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">6. Protect Privacy</h2>
            <p className="text-gray-200 leading-relaxed">
              Don’t share sensitive personal details (yours or others’). Do not pressure anyone into
              revealing information they’re not comfortable sharing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">7. No Harmful or Explicit Content</h2>
            <p className="text-gray-200 leading-relaxed">
              No hate speech, violence, harassment, explicit material, extremist content, or anything
              that threatens safety or wellbeing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">8. No Spam or Manipulation</h2>
            <p className="text-gray-200 leading-relaxed">
              No promotional spam, automated cheering, or attempts to manipulate visibility. Keep
              engagement authentic.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">9. Use Categories Properly</h2>
            <p className="text-gray-200 leading-relaxed">
              Post wins in the correct categories so everyone finds relevant support. Specialists
              should interact only within appropriate areas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">10. Support, Don’t Diagnose</h2>
            <p className="text-gray-200 leading-relaxed">
              Encourage without giving professional, medical, or legal advice. No guilt-pressuring or
              overstepping boundaries.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">11. Report Problems</h2>
            <p className="text-gray-200 leading-relaxed">
              Help keep the community safe by reporting harmful or rule-breaking content. Reporting
              protects everyone.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">12. Consequences</h2>
            <p className="text-gray-200 leading-relaxed">
              Violations may lead to removal of content, temporary suspension, or permanent account
              restrictions to maintain a safe environment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 text-pink-300">13. A Positive Space</h2>
            <p className="text-gray-200 leading-relaxed">
              Cheers Buddy exists to celebrate progress with real support. Protect the energy. Be part
              of the community that uplifts others.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}
