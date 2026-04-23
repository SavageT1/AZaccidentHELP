import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { 
  Car, 
  Bike, 
  Truck, 
  MessageCircle, 
  ShieldCheck, 
  Scale, 
  Star,
  ChevronRight,
  Menu,
  X,
  Phone,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Trophy,
  AlertOctagon,
  Gavel
} from 'lucide-react';
import { BLOG_POSTS, TESTIMONIALS } from './constants';
import { cn } from './lib/utils';
import SettlementCalculator from './components/SettlementCalculator';
import LeadForm from './components/LeadForm';
import CaseAssessment from './components/CaseAssessment';
import SuccessStories from './components/SuccessStories';
import ChatWidget from './components/ChatWidget';
import PracticeAreaDetail from './components/PracticeAreaDetail';

export type Page = 'home' | 'car' | 'bike' | 'truck' | 'injury';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Wait for re-render before scrolling
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  if (currentPage !== 'home') {
    return <PracticeAreaDetail slug={currentPage} onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 p-3 sm:p-5 flex flex-col selection:bg-primary selection:text-black">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setCurrentPage('home')}>
          <div className="w-10 h-10 bg-primary flex items-center justify-center font-black text-black italic rounded-lg group-hover:rotate-6 transition-transform">AZ</div>
          <span className="text-xl font-bold tracking-tight uppercase">AZ ACCIDENT HELP<span className="text-primary">.COM</span></span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-4 mr-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <button onClick={() => setCurrentPage('car')} className="hover:text-primary transition-colors">Car Accidents</button>
            <button onClick={() => setCurrentPage('bike')} className="hover:text-primary transition-colors">Motorcycles</button>
            <button onClick={() => setCurrentPage('truck')} className="hover:text-primary transition-colors">Commercial</button>
          </div>
          <div className="text-sm font-medium text-zinc-400">Claims Won: <span className="text-zinc-100">15k+ Verified</span></div>
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-accent hover:bg-accent-dark text-black px-6 py-2.5 rounded-full font-bold shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-widest"
          >
            FREE CONSULTATION
          </button>
        </div>

        <button className="md:hidden p-2 text-zinc-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Chat Widget */}
      <ChatWidget />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 absolute top-20 left-4 right-4 z-50 shadow-2xl"
          >
            <div className="flex flex-col gap-4 text-center">
              <button onClick={() => setCurrentPage('car')} className="text-lg font-bold p-2 text-primary">Car Accidents</button>
              <button onClick={() => setCurrentPage('bike')} className="text-lg font-bold p-2 text-primary">Motorcycles</button>
              <button onClick={() => setCurrentPage('truck')} className="text-lg font-bold p-2 text-primary">Commercial Trucks</button>
              <div className="h-px bg-zinc-800 my-2" />
              <button onClick={() => scrollToSection('assessment')} className="text-lg font-bold p-2 text-zinc-400 hover:text-white">Assess Case</button>
              <button onClick={() => scrollToSection('calculator')} className="text-lg font-bold p-2 text-zinc-400 hover:text-white">Simulator</button>
              <button onClick={() => scrollToSection('stories')} className="text-lg font-bold p-2 text-zinc-400 hover:text-white">Stories</button>
              <button onClick={() => scrollToSection('contact')} className="bg-primary text-black py-4 rounded-xl font-bold">Free Evaluation</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-5 max-w-[1400px] mx-auto w-full">
        
        {/* Main Hero Card */}
        <motion.div 
          id="hero"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.005 }}
          className="col-span-12 lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 lg:p-10 relative overflow-hidden flex flex-col justify-center"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Scale className="w-64 h-64 text-primary" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Arizona's Top Rated Recovery Team
            </div>
            <h1 className="text-5xl md:text-[80px] font-black leading-[0.9] tracking-tight mb-5 uppercase">
              INJURED IN AZ?<br/>
              <span className="text-primary underline decoration-primary/30 decoration-8 underline-offset-8">WE FIGHT FOR YOU.</span>
            </h1>
            <p className="text-zinc-400 text-xl max-w-lg mb-8 font-medium leading-relaxed">
              We specialize in complex car, motorcycle, and commercial accidents. Serving all of Arizona, we fight for maximum recovery in every personal injury case.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('assessment')}
              className="bg-accent text-black px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-2xl shadow-accent/30 flex items-center gap-3 mb-10 group"
            >
              Start Free Case Review
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <div className="flex flex-wrap gap-4">
              <div className="bg-zinc-800/50 backdrop-blur px-6 py-3 rounded-2xl border border-zinc-700/50 flex items-center gap-3 transition-colors hover:border-primary/50 group">
                 <ShieldCheck className="text-primary group-hover:scale-110 transition-transform" size={24} />
                 <div>
                    <span className="text-[10px] block font-bold uppercase tracking-widest text-zinc-500">Total Recovered:</span>
                    <span className="text-lg font-black text-white">$500M+</span>
                 </div>
              </div>
              <div className="bg-zinc-800/50 backdrop-blur px-6 py-3 rounded-2xl border border-zinc-700/50 flex items-center gap-3 transition-colors hover:border-primary/50 group">
                 <MapPin className="text-primary group-hover:scale-110 transition-transform" size={24} />
                 <div>
                    <span className="text-[10px] block font-bold uppercase tracking-widest text-zinc-500">Main Office:</span>
                    <span className="text-lg font-black text-white">Scottsdale, AZ</span>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Case Assessment Tool Card */}
        <motion.div 
          id="assessment"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.01 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 lg:col-span-4"
        >
          <CaseAssessment />
        </motion.div>

        {/* Practice Specialties Box - NEW */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.005 }}
          viewport={{ once: true }}
          className="col-span-12 bg-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden text-zinc-950"
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Our Specialties</h2>
              <p className="text-zinc-500 font-medium">Arizona's focused representation for high-impact collisions and catastrophic injuries.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
              {[
                { label: 'Car Accidents', icon: <Car />, slug: 'car' as Page },
                { label: 'Motorcycles', icon: <Bike />, slug: 'bike' as Page },
                { label: 'Commercial Truck', icon: <Truck />, slug: 'truck' as Page },
                { label: 'Severe Injury', icon: <AlertOctagon />, slug: 'injury' as Page },
              ].map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(item.slug)}
                  className="flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-primary transition-all group"
                >
                  <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:bg-primary group-hover:text-black transition-colors mb-3">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-center">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <Gavel size={300} />
          </div>
        </motion.div>

        {/* Claim Value Estimator Card */}
        <motion.div 
          id="calculator"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.01 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-5 bg-primary rounded-[2rem] p-6 shadow-primary-glow relative"
        >
          <SettlementCalculator />
        </motion.div>

        {/* Quick Contact Card - Interactive Bubble */}
        <div className="col-span-12 md:col-span-2 flex items-center justify-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.3, zIndex: 50 }}
            viewport={{ once: true }}
            className="w-28 h-28 md:w-32 md:h-32 bg-primary rounded-full flex flex-col items-center justify-center text-black shadow-primary-glow border-4 border-zinc-950 relative group cursor-pointer transition-shadow hover:shadow-2xl hover:shadow-primary/40"
          >
             <div className="text-center relative z-10 px-2 select-none">
                <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-1">
                   <Phone size={16} />
                </div>
                <h4 className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-0.5 leading-none">Human Help</h4>
                <a href="tel:1800AZHELP" className="text-[10px] font-black tracking-tighter block mb-2 px-1">1-800-AZ-HELP</a>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToSection('contact');
                  }}
                  className="bg-accent text-black font-black px-3 py-1 rounded-full text-[7px] uppercase tracking-widest shadow-lg shadow-accent/20 active:scale-90 transition-transform"
                >
                  CALL NOW
                </button>
             </div>
          </motion.div>
        </div>

        {/* Lead Gen Form Card */}
        <motion.div 
          id="contact"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.01 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-5 bg-primary rounded-[2rem] p-6 shadow-primary-glow relative"
        >
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-black">Free Evaluation</h3>
          <LeadForm />
          <div className="absolute bottom-4 right-8 opacity-20 pointer-events-none">
            <MessageCircle size={100} className="text-white" />
          </div>
        </motion.div>

        {/* Resource Blog Card */}
        <motion.div 
          id="blog"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.005 }}
          viewport={{ once: true }}
          className="col-span-12 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 group overflow-hidden relative"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h4 className="text-3xl font-black uppercase tracking-tight text-white underline decoration-primary decoration-4 underline-offset-8">Victory Strategies</h4>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] mt-3">Protecting your rights across all of Arizona</p>
            </div>
            <span className="bg-primary text-black text-[12px] px-3 py-1 rounded font-black tracking-widest">2026 UPDATE</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 relative z-10">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <div key={post.id} className="flex flex-col gap-3 p-5 rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer group/item border border-zinc-700/30">
                <div className="text-[10px] font-black text-primary tracking-widest uppercase">{post.category}</div>
                <div className="text-lg font-bold text-zinc-100 group-hover/item:text-primary transition-colors uppercase leading-tight">{post.title}</div>
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 group-hover/item:gap-3 transition-all">
                  Read Analysis <ArrowRight size={14} className="text-primary" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories Card - Full Width Now */}
        <motion.div 
          id="stories"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.005 }}
          viewport={{ once: true }}
          className="col-span-12 bg-zinc-950 border border-zinc-800 rounded-[2rem] p-8 relative overflow-hidden"
        >
          <SuccessStories />
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <Trophy size={200} />
          </div>
        </motion.div>

      </div>

      {/* Footer Bar */}
      <footer className="mt-8 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4">
        <div className="text-center md:text-left">© 2026 AZ Accident Help. Not a law firm. Case management partner.</div>
        <div className="flex gap-6">
          <span className="hover:text-red-500 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-red-500 cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-red-500 cursor-pointer transition-colors">AZ Bar Compliance</span>
        </div>
      </footer>
    </div>
  );
}
