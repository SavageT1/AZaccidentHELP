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
  FileText,
  Brain,
  Bone,
  Zap,
  Activity
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
    <div className="w-full max-w-[620px] bg-primary rounded-[2rem] p-7 sm:p-8 text-black flex flex-col relative overflow-hidden shadow-primary-glow">
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
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-primary">
                <Scale size={20} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950">Case Assessment</h3>
            </div>
            
            <p className="text-zinc-950/80 font-bold text-sm tracking-tight">What type of accident were you involved in?</p>
            
            <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
              {['Car Accident', 'Motorcycle Accident', 'Trucking Accident', 'Pedestrian / Bicycle', 'Slip & Fall', 'Medical Malpractice', 'Wrongful Death', 'Construction'].map((t) => (
                <motion.button
                  key={t}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setData({ ...data, type: t });
                    next('date');
                  }}
                  className="w-full text-left p-3 rounded-xl bg-white border border-black/10 hover:border-black/20 hover:bg-zinc-50 transition-all flex items-center justify-between group text-zinc-950"
                >
                  <span className="font-bold text-[11px] uppercase tracking-tight text-zinc-950">{t}</span>
                  <ChevronRight size={14} className="text-zinc-600 group-hover:text-zinc-950 transition-colors" />
                </motion.button>
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
            <button onClick={() => back('type')} className="flex items-center gap-2 text-zinc-950/60 hover:text-zinc-950 transition-colors text-xs font-bold uppercase tracking-widest mb-4">
              <ChevronLeft size={14} /> Back
            </button>
            <h4 className="text-lg font-black text-zinc-950">When did the accident occur?</h4>
            <div className="grid grid-cols-1 gap-2.5">
              {['Within 48 hours', 'Past week', '1-6 months ago', 'Over 6 months ago'].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setData({ ...data, date: d });
                    next('injuries');
                  }}
                  className="w-full text-left p-3.5 rounded-2xl bg-white border border-black/10 hover:bg-zinc-50 transition-all flex items-center justify-between text-zinc-950"
                >
                  <span className="font-bold text-zinc-950">{d}</span>
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
            <button onClick={() => back('date')} className="flex items-center gap-2 text-zinc-950/60 hover:text-zinc-950 transition-colors text-xs font-bold uppercase tracking-widest mb-4">
              <ChevronLeft size={14} /> Back
            </button>
            <h4 className="text-lg font-black text-zinc-950">What injuries were sustained?</h4>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Head/Neck', icon: <Brain size={18} /> },
                { label: 'Back/Spinal', icon: <Zap size={18} /> },
                { label: 'Broken Bones', icon: <Bone size={18} /> },
                { label: 'Internal/Other', icon: <Activity size={18} /> }
              ].map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleInjury(item.label)}
                  className={`p-3.5 rounded-2xl border transition-all text-sm font-bold flex flex-col items-center gap-2 ${
                    data.injuries.includes(item.label) 
                      ? "bg-zinc-950 text-white border-zinc-950 shadow-lg shadow-black/20" 
                      : "bg-white border-black/5 text-zinc-950 hover:border-black/20"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => next('insurance')}
              disabled={data.injuries.length === 0}
              className="w-full bg-accent text-zinc-950 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-accent/20 disabled:opacity-30 mt-3"
            >
              Continue Case Review
            </motion.button>
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
            <button onClick={() => back('injuries')} className="flex items-center gap-2 text-zinc-950/60 hover:text-zinc-950 transition-colors text-xs font-bold uppercase tracking-widest mb-4">
              <ChevronLeft size={14} /> Back
            </button>
            <h4 className="text-lg font-black text-zinc-950 text-center leading-tight">Do you have the responsible party's insurance info?</h4>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setData({ ...data, insuranceKnown: 'yes' });
                  next('results');
                }}
                className="flex-1 p-5 rounded-2xl bg-zinc-950 text-white hover:bg-zinc-800 transition-all font-black text-xl shadow-lg shadow-black/20"
              >
                YES
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setData({ ...data, insuranceKnown: 'no' });
                  next('results');
                }}
                className="flex-1 p-5 rounded-2xl bg-white border border-black/10 hover:bg-zinc-50 transition-all font-black text-xl text-zinc-950"
              >
                NO
              </motion.button>
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
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg shadow-black/20">
                <ShieldAlert size={32} className="text-primary" />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-1 italic leading-none text-zinc-950">Status: Action Required</h3>
              <p className="text-zinc-950/60 text-xs font-bold uppercase tracking-wider mb-4">Immediate local review recommended</p>
            </div>
 
            <div className="bg-white rounded-2xl p-3 border-l-4 border-black">
               <div className="text-[10px] font-black text-zinc-950 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <AlertOctagon size={14} /> Recommended Actions
               </div>
               <ul className="text-[11px] font-bold space-y-1.5 text-zinc-950/85">
                 <li className="flex gap-2"><CheckCircle2 className="text-zinc-950 flex-shrink-0" size={14} /> Immediate medical documentation</li>
                 <li className="flex gap-2"><CheckCircle2 className="text-zinc-950 flex-shrink-0" size={14} /> No recorded insurance statements</li>
                 <li className="flex gap-2"><CheckCircle2 className="text-zinc-950 flex-shrink-0" size={14} /> Secure evidence/dashcam footage</li>
               </ul>
            </div>
 
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-accent text-zinc-950 py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl shadow-accent/40"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FileText size={16} /> Request Expert Help
            </motion.button>
 
            <p className="text-[7px] text-zinc-950/50 italic text-center leading-tight font-bold uppercase tracking-tighter">
              Disclaimer: AZ Bar Compliance Review Pending Engagement. This is not medical or legal advice.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
