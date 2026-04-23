import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  ShieldAlert, 
  Stethoscope, 
  Calendar, 
  Scale,
  CheckCircle2,
  AlertOctagon,
  FileText
} from 'lucide-react';

type Step = 'type' | 'date' | 'injuries' | 'insurance' | 'results';

export default function CaseAssessment() {
  const [step, setStep] = useState<Step>('type');
  const [data, setData] = useState({
    type: '',
    date: '',
    injuries: [] as string[],
    insuranceKnown: '',
  });

  const next = (nextStep: Step) => setStep(nextStep);
  const back = (prevStep: Step) => setStep(prevStep);

  const toggleInjury = (injury: string) => {
    setData(prev => ({
      ...prev,
      injuries: prev.injuries.includes(injury) 
        ? prev.injuries.filter(i => i !== injury) 
        : [...prev.injuries, injury]
    }));
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 text-white h-full flex flex-col relative overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 'type' && (
          <motion.div
            key="type"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 flex-grow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-black">
                <Scale size={20} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">Case Assessment</h3>
            </div>
            
            <p className="text-zinc-400 font-medium">What type of accident were you involved in?</p>
            
            <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
              {['Car Accident', 'Motorcycle Accident', 'Trucking Accident', 'Pedestrian / Bicycle', 'Slip & Fall', 'Medical Malpractice', 'Wrongful Death', 'Construction'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setData({ ...data, type: t });
                    next('date');
                  }}
                  className="w-full text-left p-3 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-primary hover:bg-zinc-700/50 transition-all flex items-center justify-between group"
                >
                  <span className="font-bold text-[11px] uppercase tracking-tight">{t}</span>
                  <ChevronRight size={14} className="text-zinc-500 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'date' && (
          <motion.div
            key="date"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 flex-grow"
          >
            <button onClick={() => back('type')} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-4">
              <ChevronLeft size={14} /> Back
            </button>
            <h4 className="text-lg font-bold">When did the accident occur?</h4>
            <div className="grid grid-cols-1 gap-2.5">
              {['Within 48 hours', 'Past week', '1-6 months ago', 'Over 6 months ago'].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setData({ ...data, date: d });
                    next('injuries');
                  }}
                  className="w-full text-left p-3.5 rounded-2xl bg-zinc-800 border border-zinc-700 hover:border-primary transition-all flex items-center justify-between"
                >
                  <span className="font-bold">{d}</span>
                  <Calendar size={16} className="text-zinc-500" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'injuries' && (
          <motion.div
            key="injuries"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 flex-grow"
          >
            <button onClick={() => back('date')} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-4">
              <ChevronLeft size={14} /> Back
            </button>
            <h4 className="text-lg font-bold">What injuries were sustained?</h4>
            <div className="grid grid-cols-2 gap-2.5">
              {['Head/Neck', 'Back/Spinal', 'Broken Bones', 'Internal/Other'].map((i) => (
                <button
                  key={i}
                  onClick={() => toggleInjury(i)}
                  className={`p-3.5 rounded-2xl border transition-all text-sm font-bold flex flex-col items-center gap-2 ${
                    data.injuries.includes(i) 
                      ? "bg-primary border-primary text-black shadow-lg shadow-primary/40" 
                      : "bg-zinc-800 border-zinc-700 text-zinc-400"
                  }`}
                >
                  <Stethoscope size={18} />
                  {i}
                </button>
              ))}
            </div>
            <button 
              onClick={() => next('insurance')}
              disabled={data.injuries.length === 0}
              className="w-full bg-white text-zinc-950 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest disabled:opacity-30 mt-3"
            >
              Continue Case Review
            </button>
          </motion.div>
        )}

        {step === 'insurance' && (
          <motion.div
            key="insurance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 flex-grow"
          >
            <button onClick={() => back('injuries')} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-4">
              <ChevronLeft size={14} /> Back
            </button>
            <h4 className="text-lg font-bold text-center">Do you have the responsible party's insurance information?</h4>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setData({ ...data, insuranceKnown: 'yes' });
                  next('results');
                }}
                className="flex-1 p-5 rounded-2xl bg-zinc-800 border border-zinc-700 hover:border-primary transition-all font-bold text-xl"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setData({ ...data, insuranceKnown: 'no' });
                  next('results');
                }}
                className="flex-1 p-5 rounded-2xl bg-zinc-800 border border-zinc-700 hover:border-primary transition-all font-bold text-xl"
              >
                No
              </button>
            </div>
          </motion.div>
        )}

        {step === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 flex-grow"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40">
                <ShieldAlert size={32} className="text-black" />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-2 italic">Urgent Status: Action Required</h3>
              <p className="text-zinc-400 text-sm mb-6">Based on your {data.type} profile, your case requires immediate professional oversight.</p>
            </div>

            <div className="bg-zinc-800 rounded-2xl p-3 border-l-4 border-primary">
               <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                 <AlertOctagon size={14} /> Recommended Actions
               </div>
               <ul className="text-xs font-medium space-y-1.5 text-zinc-300">
                 <li className="flex gap-2"><CheckCircle2 className="text-primary flex-shrink-0" size={14} /> See a medical professional within 24hrs for {data.injuries.join(', ')} documentation.</li>
                 <li className="flex gap-2"><CheckCircle2 className="text-primary flex-shrink-0" size={14} /> Do NOT provide a recorded statement to insurance adjusters.</li>
                 <li className="flex gap-2"><CheckCircle2 className="text-primary flex-shrink-0" size={14} /> Secure dashcam or black-box data immediately.</li>
               </ul>
            </div>

            <button 
              className="w-full bg-primary text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FileText size={16} /> Request Professional Review
            </button>

            <p className="text-[10px] text-zinc-500 italic text-center leading-tight">
              DISCLAIMER: This tool provides high-level informational overview based on general trends. This is NOT legal advice. An attorney-client relationship is only established via a signed engagement letter.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
