import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Bike,
  Car,
  CheckCircle2,
  Clock,
  FileText,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
  UserRoundCheck,
  X,
} from 'lucide-react';
import LeadForm from './components/LeadForm';
import { trackEvent } from './lib/analytics';

const PHONE_DISPLAY = '480-384-0398';
const PHONE_HREF = 'tel:+14803840398';

const practiceAreas = [
  { title: 'Car Accidents', description: 'Rear-end, intersection, rideshare, uninsured-driver, and multi-vehicle collisions.', icon: Car },
  { title: 'Motorcycle Accidents', description: 'Crashes involving visibility disputes, roadway hazards, and serious rider injuries.', icon: Bike },
  { title: 'Commercial Trucks', description: 'Collisions involving delivery vehicles, tractor-trailers, and commercial insurance.', icon: Truck },
  { title: 'Other Injuries', description: 'Pedestrian, bicycle, premises, wrongful-death, and other personal-injury matters.', icon: ShieldCheck },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  const scrollToContact = (source: string) => {
    trackEvent('cta_click', { cta_location: source, cta_type: 'contact_form' });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const trackPhone = (location: string) => {
    trackEvent('phone_click', { click_location: location });
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-primary selection:text-black">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3" aria-label="AZ Accident Help home">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-black italic text-black">AZ</span>
            <span className="text-lg font-black uppercase tracking-tight">AZ Accident Help<span className="text-primary">.com</span></span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            <a href="#how-it-works" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white">How it works</a>
            <a href="#accident-types" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white">Accident types</a>
            <a href={PHONE_HREF} onClick={() => trackPhone('header')} className="font-black text-primary hover:text-white">{PHONE_DISPLAY}</a>
            <button onClick={() => scrollToContact('header')} className="rounded-full bg-accent px-6 py-3 text-xs font-black uppercase tracking-widest text-black">Request a callback</button>
          </div>

          <button className="rounded-lg p-2 text-zinc-300 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-zinc-800 bg-zinc-900 px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a href={PHONE_HREF} onClick={() => trackPhone('mobile_menu')} className="text-center text-xl font-black text-primary">Call {PHONE_DISPLAY}</a>
              <button onClick={() => scrollToContact('mobile_menu')} className="rounded-xl bg-accent py-4 font-black uppercase text-black">Request a callback</button>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-zinc-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(249,115,22,0.22),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-center">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-primary">
                <Clock size={15} /> Arizona accident intake
              </div>
              <h1 className="mb-6 text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Injured in Arizona?<br /><span className="text-primary">Request a callback.</span>
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-zinc-300">
                Tell us what happened. AZ Accident Help can share your request with a participating attorney or law firm that may contact you about a consultation.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button onClick={() => scrollToContact('hero')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-accent px-8 py-5 font-black uppercase tracking-wider text-black">
                  Request my callback <ArrowRight size={20} />
                </button>
                <a href={PHONE_HREF} onClick={() => trackPhone('hero')} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-zinc-700 px-8 py-5 font-black text-primary hover:border-primary">
                  <Phone size={20} /> Call or text {PHONE_DISPLAY}
                </a>
              </div>
              <p className="mt-6 max-w-2xl text-xs leading-relaxed text-zinc-500">
                AZ Accident Help is a legal marketing and intake service, not a law firm. We do not provide legal advice or determine the value or merits of a claim.
              </p>
            </motion.div>

            <motion.div id="contact" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[2rem] bg-primary p-6 shadow-primary-glow sm:p-8">
              <h2 className="mb-2 text-3xl font-black uppercase tracking-tight text-black">Request a callback</h2>
              <p className="mb-5 text-sm font-bold text-black/70">No fee to submit. A participating attorney or law firm may contact you.</p>
              <LeadForm />
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-16 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-primary">What happens next</p>
            <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">A clear three-step process</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: FileText, title: 'Share the basics', text: 'Provide your contact information, accident type, and a short description.' },
              { icon: UserRoundCheck, title: 'Information is routed', text: 'Your request may be shared with a participating attorney or law firm.' },
              { icon: MessageCircle, title: 'Receive a response', text: 'If a participating provider is available, they may contact you to discuss next steps.' },
            ].map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">
                <div className="mb-5 flex items-center justify-between">
                  <step.icon className="text-primary" size={32} />
                  <span className="text-4xl font-black text-zinc-800">0{index + 1}</span>
                </div>
                <h3 className="mb-3 text-xl font-black uppercase">{step.title}</h3>
                <p className="leading-relaxed text-zinc-400">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="accident-types" className="border-y border-zinc-800 bg-zinc-900/60">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:py-20">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-primary">Accident types</p>
              <h2 className="mb-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">Start with the details you know</h2>
              <p className="text-lg text-zinc-400">You do not need to diagnose your legal situation before requesting contact.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {practiceAreas.map((area) => (
                <button key={area.title} onClick={() => scrollToContact(`accident_type_${area.title}`)} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-left transition hover:-translate-y-1 hover:border-primary">
                  <area.icon className="mb-5 text-primary" size={32} />
                  <h3 className="mb-3 text-lg font-black uppercase">{area.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{area.description}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 text-center lg:py-20">
          <CheckCircle2 className="mx-auto mb-5 text-accent" size={44} />
          <h2 className="mx-auto mb-5 max-w-3xl text-4xl font-black uppercase tracking-tight sm:text-5xl">Ready to request contact?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-400">Send the form or call directly. Submitting information does not create an attorney-client relationship.</p>
          <button onClick={() => scrollToContact('bottom_cta')} className="rounded-2xl bg-accent px-8 py-5 font-black uppercase tracking-wider text-black">Request a callback</button>
        </section>
      </main>

      <footer className="border-t border-zinc-800 bg-black">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="mb-7 grid gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-3 font-black uppercase">AZ Accident Help</div>
              <p className="max-w-3xl text-xs leading-relaxed text-zinc-500">
                AZ Accident Help is a privately owned legal marketing and intake service, not a law firm or lawyer-referral service. We do not provide legal advice, recommend a particular attorney, or determine the value or merits of a claim. Information submitted may be shared with participating attorneys or law firms that may contact you. Submission does not create an attorney-client relationship. Attorney participation may constitute paid advertising.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm font-bold md:text-right">
              <a href={PHONE_HREF} onClick={() => trackPhone('footer')} className="text-primary">{PHONE_DISPLAY}</a>
              <button onClick={() => setPolicyOpen(true)} className="text-left text-zinc-400 hover:text-white md:text-right">Privacy & Terms</button>
            </div>
          </div>
          <div className="border-t border-zinc-900 pt-5 text-xs text-zinc-600">© 2026 AZ Accident Help. All rights reserved.</div>
        </div>
      </footer>

      {policyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-label="Privacy and terms">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7 text-zinc-900 sm:p-10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black uppercase">Privacy & Terms</h2>
                <p className="mt-2 text-sm text-zinc-500">Effective July 12, 2026</p>
              </div>
              <button onClick={() => setPolicyOpen(false)} className="rounded-full bg-zinc-100 p-2" aria-label="Close privacy policy"><X /></button>
            </div>
            <div className="space-y-6 text-sm leading-relaxed text-zinc-700">
              <section><h3 className="mb-2 font-black uppercase text-zinc-950">Who we are</h3><p>AZ Accident Help is a legal marketing and intake service. It is not a law firm, does not provide legal advice, and does not establish an attorney-client relationship.</p></section>
              <section><h3 className="mb-2 font-black uppercase text-zinc-950">Information we collect</h3><p>We may collect the information you submit, including your name, phone number, email address, accident type, and description, plus basic website analytics such as device, browser, pages viewed, referral source, and interactions.</p></section>
              <section><h3 className="mb-2 font-black uppercase text-zinc-950">How information is used and shared</h3><p>We use submitted information to respond to your request, operate and improve the website, measure marketing performance, prevent abuse, and share your request with participating attorneys or law firms that may contact you. Those providers use information under their own privacy practices.</p></section>
              <section><h3 className="mb-2 font-black uppercase text-zinc-950">Contact consent</h3><p>By submitting the form, you consent to calls, texts, and emails about your request from AZ Accident Help and participating attorneys or law firms, including through automated technology where permitted. Consent is not a condition of purchasing services. Message and data rates may apply. You may opt out of texts by replying STOP.</p></section>
              <section><h3 className="mb-2 font-black uppercase text-zinc-950">No guarantee or legal relationship</h3><p>Submitting information does not guarantee that an attorney will accept or evaluate your matter, does not create an attorney-client relationship, and does not stop any legal deadline. Do not submit confidential information beyond what is needed for initial contact.</p></section>
              <section><h3 className="mb-2 font-black uppercase text-zinc-950">Analytics and cookies</h3><p>We may use Google Analytics and similar tools to understand traffic and conversions. These tools may use cookies or comparable technologies. You can limit cookies through your browser settings.</p></section>
              <section><h3 className="mb-2 font-black uppercase text-zinc-950">Contact</h3><p>Questions about this policy may be directed to {PHONE_DISPLAY}.</p></section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
