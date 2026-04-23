import { motion } from 'motion/react';
import { SUCCESS_STORIES } from '../constants';
import { 
  Car, 
  Bike, 
  Truck, 
  ChevronRight, 
  ShieldCheck, 
  Trophy,
  ArrowRight
} from 'lucide-react';

export default function SuccessStories() {
  const getIcon = (type: string) => {
    switch(type) {
      case 'car': return <Car size={24} />;
      case 'bike': return <Bike size={24} />;
      case 'truck': return <Truck size={24} />;
      default: return <Car size={24} />;
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold uppercase tracking-tight">Success Stories</h3>
        <span className="text-[10px] font-black bg-primary text-black px-2 py-0.5 rounded tracking-widest">VERIFIED</span>
      </div>

      <div className="space-y-4 flex-grow overflow-y-auto pr-2" style={{ scrollbarWidth: 'none' }}>
        {SUCCESS_STORIES.map((story) => (
          <motion.div 
            key={story.id} 
            className="rounded-[2rem] bg-zinc-900 border border-zinc-800 hover:border-primary transition-all group flex flex-col overflow-hidden"
            whileHover={{ scale: 0.98 }}
          >
            <div className="h-32 w-full overflow-hidden">
              <img 
                src={story.imageUrl} 
                alt={story.type} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-primary">
                    {getIcon(story.icon)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{story.type}</div>
                    <div className="text-lg font-black text-primary">{story.settlementAmount} RECOVERED</div>
                  </div>
                </div>
                <Trophy size={20} className="text-zinc-700 group-hover:text-yellow-500 transition-colors" />
              </div>

              <div className="space-y-2">
                <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">The Challenges</div>
                <ul className="text-xs space-y-1">
                  {story.challenges.map((c, i) => (
                    <li key={i} className="flex gap-2 text-zinc-400">
                      <span className="text-primary">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1 italic">Client Testimonial</div>
                <p className="text-xs text-zinc-400 font-medium leading-relaxed italic">"{story.testimonial}"</p>
                <div className="text-[10px] font-bold text-primary mt-2">— {story.clientName}</div>
              </div>

              <button className="flex items-center justify-between p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors group/btn">
                <span className="text-xs font-bold uppercase tracking-widest">Case Resolution Detail</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-zinc-800 pt-6">
        <button 
           className="w-full bg-white text-zinc-950 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-black transition-all shadow-xl hover:shadow-primary/40"
           onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
           }}
        >
          Begin Your Own Victory
        </button>
      </div>
    </div>
  );
}
