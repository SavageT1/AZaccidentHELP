import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  Scale, 
  ShieldCheck, 
  MessageCircle,
  Car,
  Bike,
  Truck,
  AlertOctagon,
  ChevronRight,
  Star
} from 'lucide-react';
import LeadForm from './LeadForm';

interface Props {
  slug: string;
  onBack: () => void;
}

const CONTENT: Record<string, any> = {
  car: {
    title: 'Car Accident Representation',
    subtitle: 'Strategic Litigation for complex Arizona road collisions.',
    icon: <Car size={40} />,
    color: 'bg-primary',
    keywords: ['Disputed Liability', 'Multiple Insurers', 'High-Speed Impact', 'Underinsured Claims'],
    analysis: 'Arizona car accidents are increasingly complex due to aggressive insurance defense tactics and comparative negligence laws. Our team focuses on data-backed litigation, utilizing accident reconstruction and black-box data analysis to secure maximum compensation.',
    process: [
      { t: 'Evidence Seizure', d: 'We immediately secure dashcam, traffic cam, and black-box data before it is erased.' },
      { t: 'Medical Mapping', d: 'Our medical experts document long-term internal trauma that standard ER visits often miss.' },
      { t: 'Direct Negotiation', d: 'We bypass adjusters and deal directly with insurance litigation departments.' }
    ]
  },
  bike: {
    title: 'Motorcycle Victory Team',
    subtitle: 'Protecting riders from legal bias and catastrophic loss.',
    icon: <Bike size={40} />,
    color: 'bg-accent',
    keywords: ['Left-Turn Collisions', 'Road Hazards', 'Helmet Law Compliance', 'Severe Road Rash'],
    analysis: 'Motorcyclists often face a "biker bias" in Arizona courts. We dismantle this prejudice using expert testimony and forensic evidence that proves rider safety compliance. We handle the unique challenges of orthopedic trauma and neural recovery.',
    process: [
      { t: 'Bias Dismantling', d: 'We use human factors experts to prove the car driver likely never looked for a motorcycle.' },
      { t: 'Specialized Orthopedics', d: 'Connection with top AZ surgeons specialized in complex compound fractures.' },
      { t: 'Life Care Planning', d: 'Meticulous calculation of future medical needs for spinal or limb injuries.' }
    ]
  },
  truck: {
    title: 'Commercial Truck Defense',
    subtitle: 'Fighting multi-billion dollar trucking conglomerates.',
    icon: <Truck size={40} />,
    color: 'bg-zinc-100',
    keywords: ['FMCSA Violations', 'Driver Fatigue', 'Broker Liability', 'Weight Limit Breaches'],
    analysis: 'Commercial trucking cases aren\'t just big car accidents—they are regulatory battles. We investigate federal logbook violations, maintenance failures, and corporate negligence to hold large shipping fleets accountable.',
    process: [
      { t: 'Deep Investigation', d: 'Audit of driver work hours, maintenance logs, and corporate hiring practices.' },
      { t: 'Multi-Party Litigation', d: 'Identifying liability for the driver, the fleet owner, and the cargo loader.' },
      { t: 'Aggressive Discovery', d: 'Forced disclosure of GPS data and internal corporate communication.' }
    ]
  },
  injury: {
    title: 'Catastrophic Injury Focus',
    subtitle: 'Exposing the true cost of permanent life changes.',
    icon: <AlertOctagon size={40} />,
    color: 'bg-red-500',
    keywords: ['TBI Recovery', 'Spinal Cord Trauma', 'Burn Injury', 'Pedestrian Rights'],
    analysis: 'When an injury changes your life forever, a standard settlement is an insult. We specialize in proving "invisible" injuries like Traumatic Brain Injury (TBI) and permanent neurological damage through advanced imaging and psychiatric evaluation.',
    process: [
      { t: 'Neurological Mapping', d: 'Utilization of DTI and functional MRI to prove structural brain damage.' },
      { t: 'Vocational Analysis', d: 'Determining the true loss of lifetime earning potential.' },
      { t: '24/7 Support', d: 'Dedicated case managers to handle your immediate care coordination.' }
    ]
  }
};

export default function PracticeAreaDetail({ slug, onBack }: Props) {
  const page = CONTENT[slug] || CONTENT.car;

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 p-3 sm:p-5">
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-black uppercase text-xs tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </button>
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary flex items-center justify-center font-black text-black italic rounded text-sm">AZ</div>
            <span className="text-sm font-bold tracking-tight uppercase">AZ ACCIDENT HELP</span>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-5">
        {/* Header Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 lg:p-16 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className={`p-4 rounded-2xl inline-flex mb-8 text-black ${page.color} shadow-lg shadow-black/20`}>
                {page.icon}
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter mb-6">
              {page.title.split(' ').map((word: string, i: number) => (
                <span key={i} className={i === page.title.split(' ').length - 1 ? 'text-primary' : ''}>{word} </span>
              ))}
            </h1>
            <p className="text-2xl font-bold text-zinc-400 max-w-2xl leading-tight mb-8">
              {page.subtitle}
            </p>
            <div className="flex flex-wrap gap-2">
              {page.keywords.map((k: string) => (
                <span key={k} className="px-4 py-2 rounded-full border border-zinc-700 bg-zinc-800/50 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  {k}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            {page.icon}
          </div>
        </motion.div>

        {/* Lead Sidebar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 lg:col-span-4 bg-primary rounded-[3rem] p-8 shadow-primary-glow flex flex-col justify-center relative overflow-hidden"
        >
          <div className="relative z-10">
             <h3 className="text-3xl font-black uppercase tracking-tight text-black mb-6">Strategy Session</h3>
             <LeadForm />
          </div>
          <div className="absolute bottom-0 right-0 p-8 opacity-10 pointer-events-none">
             <MessageCircle size={100} className="text-white" />
          </div>
        </motion.div>

        {/* Deep Analysis Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-7 bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 lg:p-12"
        >
          <div className="flex items-center gap-3 mb-8">
             <ShieldAlert className="text-primary" size={32} />
             <h3 className="text-3xl font-black uppercase tracking-tight">Legal Analysis</h3>
          </div>
          <p className="text-xl font-medium text-zinc-400 leading-relaxed mb-10 first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left uppercase first-letter:not-italic italic">
            {page.analysis}
          </p>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-6 border-b border-zinc-800 pb-2">The Winning Protocol</h4>
            {page.process.map((step: any, i: number) => (
              <div key={i} className="flex gap-6 group">
                <div className="text-4xl font-black text-zinc-800 group-hover:text-primary transition-colors">0{i+1}</div>
                <div>
                   <div className="text-lg font-black uppercase tracking-tight mb-1">{step.t}</div>
                   <p className="text-sm font-medium text-zinc-500 leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust/Social Proof */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-5 flex flex-col gap-5"
        >
          <div className="bg-white rounded-[3rem] p-8 text-zinc-950 flex-grow relative overflow-hidden group">
             <div className="flex justify-between items-start mb-10">
                <ShieldCheck size={48} className="text-primary group-hover:rotate-12 transition-transform" />
                <div className="text-right">
                   <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Success Rate</div>
                   <div className="text-4xl font-black italic">98.4%</div>
                </div>
             </div>
             <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Arizona Bar Certified Litigation Partners</h3>
             <p className="text-zinc-500 font-medium leading-relaxed mb-8">
               We don't just process claims. We build iron-clad legal cases that insurance adjusters fear to take to trial.
             </p>
             <div className="flex items-center gap-4 border-t border-zinc-100 pt-8">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-black">AZ</div>
                <div>
                   <div className="text-sm font-black uppercase tracking-tight">Scottsdale Justice Center</div>
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic leading-none mt-1">Verified Legal Nexus</div>
                </div>
             </div>
             <div className="absolute bottom-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                <Scale size={200} />
             </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 flex flex-col justify-center gap-6">
             <div className="flex gap-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#a3e635" className="text-primary" />)}
             </div>
             <p className="text-lg font-bold italic leading-tight">
               "The level of expert analysis they brought to my motorcycle claim changed everything. They saw the details others missed."
             </p>
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-black italic text-primary">MT</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Michael T. • Chandler, AZ</div>
             </div>
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <div className="col-span-12 flex justify-between items-center bg-zinc-900/50 backdrop-blur border border-zinc-800 p-6 rounded-[2rem] mt-10">
           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">Exploring AZ Accident Help Resources</div>
           <button 
            onClick={onBack}
            className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary hover:gap-6 transition-all"
           >
             Return Home <ArrowRight size={16} />
           </button>
        </div>
      </div>

      <footer className="mt-20 mb-8 border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest px-4">
        <div>© 2026 AZ Accident Help. Dedicated Injury Recovery Services.</div>
        <div className="flex gap-6">
          <span className="hover:text-primary cursor-pointer transition-colors">Compliance Detail</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy Protocal</span>
        </div>
      </footer>
    </div>
  );
}
