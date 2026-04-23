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
  const [severity, setSeverity] = useState(2); // 1: Mild, 2: Moderate, 3: Severe, 4: Catastrophic
  const [fault, setFault] = useState(0); // 0% to 50%

  const result = useMemo(() => {
    const multipliers = { 1: 1.5, 2: 3, 3: 5, 4: 8 };
    const painAndSuffering = medicalBills * multipliers[severity as keyof typeof multipliers];
    const totalEconomic = medicalBills + lostWages;
    const grossValue = totalEconomic + painAndSuffering;
    
    const netValue = grossValue * (1 - (fault / 100));
    
    return {
      economic: totalEconomic,
      painAndSuffering,
      total: netValue,
      max: netValue * 1.3,
      min: netValue * 0.7
    };
  }, [medicalBills, lostWages, severity, fault]);

  const chartData = [
    { name: 'Economic', value: result.economic, color: '#e4e4e7' }, // zinc-200
    { name: 'General Damages', value: result.painAndSuffering, color: '#a3e635' }, // primary
  ];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex flex-col gap-6 h-full text-zinc-950">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight uppercase">Claim Value Estimator</h3>
          <p className="text-xs text-zinc-500">Estimate your potential claim value</p>
        </div>
        <button 
           onClick={() => {
              setMedicalBills(5000);
              setLostWages(1000);
              setSeverity(2);
              setFault(0);
           }}
           className="text-zinc-300 hover:text-primary p-2 transition-colors"
        >
          <RefreshCcw size={18} />
        </button>
      </div>

      <div className="space-y-4 flex-grow">
        {/* Medical Bills */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-400 tracking-wider">
            <span>Medical Bills</span>
            <span className="text-zinc-900">{formatCurrency(medicalBills)}</span>
          </div>
          <input 
            type="range" 
            min="500" 
            max="100000" 
            step="500"
            value={medicalBills}
            onChange={(e) => setMedicalBills(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Lost Wages */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-400 tracking-wider">
            <span>Lost Wages</span>
            <span className="text-zinc-900">{formatCurrency(lostWages)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="50000" 
            step="500"
            value={lostWages}
            onChange={(e) => setLostWages(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-zinc-900"
          />
        </div>

        {/* Injury Severity */}
        <div className="space-y-2">
           <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Severity</label>
           <div className="grid grid-cols-4 gap-1.5">
              {[
                { v: 1, l: 'Minor' },
                { v: 2, l: 'Mod' },
                { v: 3, l: 'Major' },
                { v: 4, l: 'Severe' }
              ].map((s) => (
                <button
                  key={s.v}
                  onClick={() => setSeverity(s.v)}
                  className={`py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                    severity === s.v 
                      ? "bg-zinc-950 text-white border-zinc-950" 
                      : "bg-white text-zinc-400 border-zinc-100 hover:border-zinc-200"
                  }`}
                >
                  {s.l}
                </button>
              ))}
           </div>
        </div>

        {/* Estimate Display */}
        <div className="p-4 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
           <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Estimated Range</div>
           <div className="text-3xl font-black text-primary">
             {formatCurrency(result.min)} - {formatCurrency(result.max)}*
           </div>
        </div>

        {/* Likely Outcome Action */}
        <div className="bg-zinc-900 rounded-2xl p-4 text-white flex items-center justify-between group cursor-pointer hover:bg-primary hover:text-black transition-colors">
          <div>
            <div className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-0.5">Likely Outcome</div>
            <div className="text-sm font-bold">
              {severity === 1 ? "Settled Quickly" : severity === 2 ? "Standard Litigation" : "High-Value Case"}
            </div>
          </div>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <button className="w-full bg-zinc-950 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform uppercase text-xs tracking-widest">
        Calculate Full Payout
      </button>

      <p className="text-[8px] text-zinc-400 text-center font-medium leading-relaxed italic mt-2">
        *Disclaimer: Estimation tool only. Actual values vary significantly by case details.
      </p>
    </div>
  );
}
