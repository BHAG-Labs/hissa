// Legal pages for Hissa.
//
// Working draft. Have an Indian lawyer review before public launch.
// Applicable: DPDP Act 2023, IT Rules 2021, Income-tax Act 1961
// (because Hissa surfaces ESOP / capital-gains tax estimates).

import { useParams } from 'react-router';

const PRODUCT = {
  name: 'Hissa',
  url: 'https://hissa.bhaglabs.com',
  contact: 'hissa@bhaglabs.com',
  description: 'a suite of free educational calculators for Indian startup equity, ESOP, and dilution scenarios',
};

const ENTITY = {
  name: 'BHAG Labs',
  legal: 'BHAG Labs (sole proprietorship of Kartikeya Sharma, pre-incorporation)',
  address: 'Delhi NCT, India',
  jurisdiction: 'Delhi, India',
};

const CONTACTS = {
  privacy: 'privacy@bhaglabs.com',
  grievance: 'grievance@bhaglabs.com',
  legal: 'legal@bhaglabs.com',
  security: 'security@bhaglabs.com',
};

const GRIEVANCE_OFFICER = {
  name: 'Kartikeya Sharma',
  designation: 'Founder',
  email: CONTACTS.grievance,
  hours: 'Mon–Fri 10:00–18:00 IST',
};

const LAST_UPDATED = '1 May 2026';

function Page({ title, kicker, children }) {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="mb-8 pb-6 border-b border-charcoal/10">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ochre mb-2">{kicker}</p>
        <h1 className="font-heading font-bold text-3xl md:text-5xl text-charcoal leading-tight">{title}</h1>
        <p className="text-xs text-charcoal/50 mt-3">Last updated: {LAST_UPDATED}</p>
      </div>
      <div className="prose prose-sm md:prose-base max-w-none text-charcoal/80 leading-relaxed space-y-5
                      [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-charcoal [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:mt-10 [&_h2]:mb-3
                      [&_a]:text-terracotta [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-80
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:marker:text-ochre">
        {children}
      </div>
    </article>
  );
}

function Privacy() {
  return (
    <Page kicker="Privacy" title="Privacy Policy">
      <p>This policy explains what personal data {PRODUCT.name} collects, why, and your rights under India's Digital Personal Data Protection Act, 2023.</p>

      <h2>Who is the data fiduciary</h2>
      <p>{ENTITY.legal}, operating as {ENTITY.name} ({PRODUCT.name}). Privacy contact: <a href={`mailto:${CONTACTS.privacy}`}>{CONTACTS.privacy}</a>.</p>

      <h2>What we collect</h2>
      <p>{PRODUCT.name} calculators run entirely in your browser. We do not require sign-in to use them. We collect:</p>
      <ul>
        <li><strong>Aggregate, non-identifying usage stats</strong> — which calculator you opened, errors encountered, page-load timing.</li>
        <li><strong>Communications</strong> — only when you write to us (email content, your address).</li>
        <li><strong>Optional saved scenarios</strong> — only if you explicitly choose to save (a future feature). At that point we ask for an email and store the scenarios linked to it.</li>
      </ul>
      <p><strong>What we do NOT collect:</strong> your salary, your strike price, your ESOP grants — none of the numbers you type into the calculators ever leave your browser. The calculations are local-only.</p>

      <h2>How we use it</h2>
      <ul>
        <li>To improve the calculators and fix bugs.</li>
        <li>To respond to messages.</li>
        <li>To comply with law.</li>
      </ul>

      <h2>Sub-processors</h2>
      <p>The site is hosted on Netlify (CDN). Aggregate analytics: a privacy-respecting tool (no third-party cookies, no fingerprinting) once added.</p>

      <h2>Your rights under the DPDP Act</h2>
      <ul>
        <li>Right to access, correct, erase, and withdraw consent for any data we hold.</li>
        <li>Right to grievance redressal — see <a href="/grievance">Grievance page</a>.</li>
      </ul>
      <p>Email <a href={`mailto:${CONTACTS.privacy}`}>{CONTACTS.privacy}</a>. We respond within 72 hours for erasure / consent-withdrawal, 7 days for others.</p>

      <h2>Security</h2>
      <p>Vulnerability reports: <a href={`mailto:${CONTACTS.security}`}>{CONTACTS.security}</a>.</p>

      <h2>Updates</h2>
      <p>Material changes will be highlighted on the site for 30 days.</p>

      <h2>Contact</h2>
      <p>Privacy: <a href={`mailto:${CONTACTS.privacy}`}>{CONTACTS.privacy}</a> · Grievance: <a href="/grievance">Grievance page</a>.</p>
    </Page>
  );
}

function Terms() {
  return (
    <Page kicker="Legal" title="Terms of Service">
      <div className="border-2 border-terracotta/40 bg-terracotta/5 p-5 md:p-6 not-prose mb-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta font-semibold mb-2">Critical disclaimer</p>
        <p className="text-sm text-charcoal/85 leading-relaxed">
          {PRODUCT.name} calculators are educational tools. They do <strong>not</strong> constitute financial,
          investment, tax, or legal advice. Tax rates, exemption limits, and treatment of ESOPs change with each
          Union Budget. Verify every output with a qualified Chartered Accountant or SEBI-registered investment
          adviser before you rely on it for a decision involving real money or a real cap table.
        </p>
      </div>

      <p>These terms govern your use of {PRODUCT.name} (<a href={PRODUCT.url}>{PRODUCT.url}</a>). By using the service you agree to these terms.</p>

      <h2>1. The service</h2>
      <p>{PRODUCT.name} is {PRODUCT.description}, operated by {ENTITY.legal}. Use is free; no account is required to run the calculators.</p>

      <h2>2. Acceptable use</h2>
      <ul>
        <li>Do not republish the calculators commercially without permission.</li>
        <li>Do not scrape the site at scale.</li>
        <li>Do not misrepresent {PRODUCT.name} outputs as professional advice from a CA or adviser.</li>
      </ul>

      <h2>3. Our IP</h2>
      <p>The {PRODUCT.name} platform, brand, formulas as expressed in code, and design are owned by {ENTITY.name}. Underlying tax provisions and equity-math conventions are public knowledge and not owned by anyone.</p>

      <h2>4. Disclaimers (in addition to the box above)</h2>
      <ul>
        <li>Tax calculations use the rates and exemption limits in force on the "Last updated" date shown on each calculator. Subsequent changes may invalidate the result.</li>
        <li>FMV / 409A-equivalent valuations require professional appraisal; {PRODUCT.name} estimates are NOT a substitute.</li>
        <li>Outputs are estimates with rounding. Do not use them in legal documents.</li>
        <li>The service is provided "as is" without warranties.</li>
      </ul>

      <h2>5. Limitation of liability</h2>
      <p>To the fullest extent permitted by law, {ENTITY.name}'s total liability arising from your use of {PRODUCT.name} is limited to ₹1,000. We are not liable for indirect, consequential, tax-penalty, or financial-loss damages of any kind arising from reliance on the calculators.</p>

      <h2>6. Termination</h2>
      <p>We may modify or discontinue any calculator at any time without notice.</p>

      <h2>7. Governing law</h2>
      <p>Governed by the laws of India. Exclusive jurisdiction: courts at {ENTITY.jurisdiction}.</p>

      <h2>8. Changes</h2>
      <p>Material changes will be highlighted on the site for 30 days.</p>

      <h2>9. Contact</h2>
      <p>Legal: <a href={`mailto:${CONTACTS.legal}`}>{CONTACTS.legal}</a> · General: <a href={`mailto:${PRODUCT.contact}`}>{PRODUCT.contact}</a></p>
    </Page>
  );
}

function Grievance() {
  return (
    <Page kicker="Compliance" title="Grievance Officer">
      <p>In compliance with the <strong>IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</strong> and the <strong>DPDP Act 2023</strong>, {ENTITY.name} ({PRODUCT.name}) designates a Grievance Officer.</p>

      <h2>Officer</h2>
      <p>
        <strong>{GRIEVANCE_OFFICER.name}</strong>, {GRIEVANCE_OFFICER.designation}<br />
        Email: <a href={`mailto:${GRIEVANCE_OFFICER.email}`}>{GRIEVANCE_OFFICER.email}</a><br />
        Address: {ENTITY.address}<br />
        Hours: {GRIEVANCE_OFFICER.hours}
      </p>

      <h2>What you can file</h2>
      <ul>
        <li>Reports of factual or computational errors in the calculators.</li>
        <li>Takedown requests under Rule 3(1)(b) of the IT Rules.</li>
        <li>DPDP complaints (access, correction, erasure, consent withdrawal).</li>
      </ul>

      <h2>How we respond</h2>
      <ul>
        <li><strong>Acknowledgement:</strong> within 24 hours.</li>
        <li><strong>Resolution:</strong> 15 days for IT-Rules grievances; 72 hours for DPDP erasure / consent-withdrawal; 7 days for other DPDP requests.</li>
        <li><strong>Calculator errors:</strong> if confirmed, we patch the formula and post a correction notice on the homepage for 30 days.</li>
      </ul>
    </Page>
  );
}

const PAGES = { privacy: Privacy, terms: Terms, grievance: Grievance };

export default function LegalPage({ kind }) {
  const params = useParams();
  const resolved = kind || params.kind;
  const Component = PAGES[resolved];
  if (!Component) {
    return (
      <Page kicker="404" title="Not found">
        <p>This legal page does not exist. Try <a href="/privacy">Privacy</a>, <a href="/terms">Terms</a>, or <a href="/grievance">Grievance</a>.</p>
      </Page>
    );
  }
  return <Component />;
}
