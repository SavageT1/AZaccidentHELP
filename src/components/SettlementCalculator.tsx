import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Minus, 
  Info, 
  TrendingUp, 
  ShieldAlert,
  ChevronRight,
  RefreshCcw,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function SettlementCalculator() {
  const [medicalBills, setMedicalBills] = useState(5000);
  const [lostWages, setLostWages] = useState(1000);
  const [injuryType, setInjuryType] = useState('soft_tissue');
  const [fault, setFault] = useState(0);

  const INJURY_PROFILES = {
    'soft_tissue': { label: 'Soft Tissue', mult: 2, desc: 'Whiplash, strains, bruising' },
    'fractures': { label: 'Broken Bones', mult: 4, desc: 'Fractures requiring casting/surgery' },
    'spinal': { label: 'Spinal / Disc', mult: 6.5, desc: 'Herniations, nerve damage' },
    'tbi': { label: 'Brain Injury', mult: 10, desc: 'Concussions, cognitive impact' },
    'catastrophic': { label: 'Catastrophic', mult: 15, desc: 'Life-altering permanent injury' },
  };

  const result = useMemo(() => {
    const profile = INJURY_PROFILES[injuryType as keyof typeof INJURY_PROFILES];
    const painAndSuffering = medicalBills * profile.mult;
    const totalEconomic = medicalBills + lostWages;
    const grossValue = totalEconomic + painAndSuffering;
    
    const netValue = grossValue * (1 - (fault / 100));
    
    return {
      economic: totalEconomic,
      painAndSuffering,
      total: netValue,
      max: netValue * 1.25,
      min: netValue * 0.75
    };
  }, [medicalBills, lostWages, injuryType, fault]);

  const chartData = [
    { name: 'Economic', value: result.economic, color: '#000000' }, // Black
    { name: 'General Damages', value: result.painAndSuffering, color: '#FFFFFF' }, // White
  ];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex flex-col gap-5 text-black">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight uppercase leading-tight">Claim Value<br/>Estimator</h3>
          <p className="text-[10px] opacity-60 font-medium">Arizona Legal Standard Presets</p>
        </div>
        <button 
           onClick={() => {
              setMedicalBills(5000);
              setLostWages(1000);
              setInjuryType('soft_tissue');
              setFault(0);
           }}
           className="text-black/30 hover:text-black p-2 transition-colors"
        >
          <RefreshCcw size={18} />
        </button>
      </div>

      <div className="space-y-4 flex-grow">
        {/* Specific Injury Type */}
        <div className="space-y-2">
           <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Injury Category</label>
           <div className="grid grid-cols-1 gap-1.5 max-h-[140px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
              {Object.entries(INJURY_PROFILES).map(([key, profile]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setInjuryType(key)}
                  className={`px-3 py-2 rounded-xl text-left transition-all border flex flex-col gap-0.5 ${
                    injuryType === key
                      ? "bg-black text-white border-black shadow-lg shadow-black/20" 
                      : "bg-white text-black border-black/5 hover:border-black/10"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-bold text-xs uppercase">{profile.label}</span>
                    <span className={`text-[9px] font-black ${injuryType === key ? "text-primary" : "text-black/40"}`}>
                      {profile.mult}x MULTIPLIER
                    </span>
                  </div>
                  <span className={`text-[9px] font-medium leading-none ${injuryType === key ? "text-white/60" : "text-black/50"}`}>
                    {profile.desc}
                  </span>
                </motion.button>
              ))}
           </div>
        </div>

        {/* Medical Bills */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase opacity-60 tracking-wider">
            <span>Medical Costs</span>
            <span className="text-black">{formatCurrency(medicalBills)}</span>
          </div>
          <input 
            type="range" 
            min="500" 
            max="250000" 
            step="500"
            value={medicalBills}
            onChange={(e) => setMedicalBills(Number(e.target.value))}
            className="w-full h-1.5 bg-white border border-black/5 rounded-lg appearance-none cursor-pointer accent-black"
          />
        </div>

        {/* Lost Wages */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase opacity-60 tracking-wider">
            <span>Lost Wages (Monthly)</span>
            <span className="text-black">{formatCurrency(lostWages)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="50000" 
            step="500"
            value={lostWages}
            onChange={(e) => setLostWages(Number(e.target.value))}
            className="w-full h-1.5 bg-white border border-black/5 rounded-lg appearance-none cursor-pointer accent-black"
          />
        </div>

        {/* Fault Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase opacity-60 tracking-wider">
            <span>Comparative Fault</span>
            <span className={fault > 0 ? "text-red-600 font-bold" : "text-black"}>{fault}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="50" 
            step="5"
            value={fault}
            onChange={(e) => setFault(Number(e.target.value))}
            className="w-full h-1.5 bg-white border border-black/5 rounded-lg appearance-none cursor-pointer accent-black"
          />
        </div>

        {/* Estimate Display */}
        <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-black/10">
           <div className="text-[10px] font-bold text-black/50 uppercase tracking-widest mb-1">Estimated Range</div>
           <div className="text-3xl font-black text-black">
             {formatCurrency(result.min)} - {formatCurrency(result.max)}*
           </div>
        </div>

        {/* Likely Outcome Action */}
        <div className="bg-black text-white rounded-2xl p-3 flex items-center justify-between group cursor-pointer hover:bg-white hover:text-black transition-colors">
          <div>
            <div className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-0.5">Likely Outcome</div>
            <div className="text-sm font-bold">
              {injuryType === 'soft_tissue' ? "Settled Quickly" : injuryType === 'catastrophic' ? "Life-Long Benefits" : "Standard Litigation"}
            </div>
          </div>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-accent text-black font-black py-4 rounded-2xl transition-transform uppercase text-xs tracking-widest shadow-lg shadow-accent/20"
      >
        Calculate Full Payout
      </motion.button>

      <p className="text-[8px] opacity-40 text-center font-medium leading-relaxed italic mt-2">
        *Disclaimer: Estimation tool only. Actual values vary significantly by case details.
      </p>
    </div>
  );
}
