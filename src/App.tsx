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
  Trophy
} from 'lucide-react';
import { BLOG_POSTS, TESTIMONIALS } from './constants';
import { cn } from './lib/utils';
import SettlementCalculator from './components/SettlementCalculator';
import LeadForm from './components/LeadForm';
import CaseAssessment from './components/CaseAssessment';
import SuccessStories from './components/SuccessStories';
import ChatWidget from './components/ChatWidget';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 p-3 sm:p-5 flex flex-col selection:bg-primary selection:text-black">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('hero')}>
          <div className="w-10 h-10 bg-primary flex items-center justify-center font-black text-black italic rounded-lg group-hover:rotate-6 transition-transform">AZ</div>
          <span className="text-xl font-bold tracking-tight uppercase">AZ ACCIDENT HELP<span className="text-primary">.COM</span></span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="text-sm font-medium text-zinc-400">Claims Won: <span className="text-zinc-100">15k+ Verified</span></div>
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-primary hover:bg-primary-dark text-black px-6 py-2.5 rounded-full font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-widest"
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
              <button onClick={() => scrollToSection('assessment')} className="text-lg font-bold p-2 text-zinc-400 hover:text-white">Assess Case</button>
              <button onClick={() => scrollToSection('calculator')} className="text-lg font-bold p-2 text-zinc-400 hover:text-white">Simulator</button>
              <button onClick={() => scrollToSection('stories')} className="text-lg font-bold p-2 text-zinc-400 hover:text-white">Stories</button>
              <button onClick={() => scrollToSection('contact')} className="bg-primary text-black py-4 rounded-xl font-bold">Free Evaluation</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-3 flex-grow max-w-[1400px] mx-auto w-full">
        
        {/* Main Hero Card */}
        <motion.div 
          id="hero"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
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
              We specialize in complex car, motorcycle, and commercial accidents. Don't settle for less than your recovery is worth.
            </p>
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
          transition={{ delay: 0.1 }}
          className="col-span-12 lg:col-span-4"
        >
          <CaseAssessment />
        </motion.div>

        {/* Claim Value Estimator Card */}
        <motion.div 
          id="calculator"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-[2rem] p-6 shadow-2xl relative"
        >
          <SettlementCalculator />
        </motion.div>

        {/* Success Stories Card */}
        <motion.div 
          id="stories"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-6 lg:col-span-4 bg-zinc-950 border border-zinc-800 rounded-[2rem] p-6 relative overflow-hidden"
        >
          <SuccessStories />
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <Trophy size={150} />
          </div>
        </motion.div>

        {/* Lead Gen Form Card */}
        <motion.div 
          id="contact"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="col-span-12 lg:col-span-4 bg-primary rounded-[2rem] p-6 shadow-primary-glow relative"
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
          viewport={{ once: true }}
          className="col-span-12 md:col-span-8 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 group overflow-hidden relative"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h4 className="text-3xl font-black uppercase tracking-tight text-white underline decoration-primary decoration-4 underline-offset-8">Resource Library</h4>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] mt-3">Essential legal guides for accident victims</p>
            </div>
            <span className="bg-primary text-black text-[12px] px-3 py-1 rounded font-black tracking-widest">2024 UPDATE</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4 relative z-10">
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

        {/* Quick Contact Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-4 bg-zinc-100 rounded-[2rem] p-8 flex flex-col justify-center text-zinc-950 border border-zinc-200"
        >
           <div className="mb-4">
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">Speak with a human</h4>
              <div className="text-3xl font-black italic">Available 24/7</div>
           </div>
           
           <div className="space-y-3">
              <a href="tel:1800AZHELP" className="flex items-center justify-between p-4 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black">
                       <Phone size={20} />
                    </div>
                    <span className="text-lg font-black tracking-tight">1-800-AZ-HELP</span>
                 </div>
                 <ChevronRight className="text-primary group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-4 p-6 rounded-2xl bg-white shadow-sm">
                 <div className="w-10 h-10 bg-zinc-950 rounded-full flex items-center justify-center text-white">
                    <MapPin size={20} />
                 </div>
                 <div>
                    <span className="text-lg font-black tracking-tight block">Scottsdale, AZ</span>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Serving All of Arizona</span>
                 </div>
              </div>
           </div>
        </motion.div>

      </div>

      {/* Footer Bar */}
      <footer className="mt-8 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4">
        <div className="text-center md:text-left">© 2024 AZ Accident Help. Not a law firm. Case management partner.</div>
        <div className="flex gap-6">
          <span className="hover:text-red-500 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-red-500 cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-red-500 cursor-pointer transition-colors">AZ Bar Compliance</span>
        </div>
      </footer>
    </div>
  );
}
