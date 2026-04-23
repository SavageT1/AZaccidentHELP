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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow" style={{ scrollbarWidth: 'none' }}>
        {SUCCESS_STORIES.map((story) => (
          <motion.div 
            key={story.id} 
            className="rounded-[2rem] bg-zinc-900 border border-zinc-800 hover:border-primary transition-all group flex flex-col overflow-hidden h-full"
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-28 w-full overflow-hidden">
              <img 
                src={story.imageUrl} 
                alt={story.type} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 flex flex-col gap-4 text-center items-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-primary mb-1">
                  {getIcon(story.icon)}
                </div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{story.type}</div>
                <div className="text-2xl font-black text-primary leading-tight">{story.settlementAmount} RECOVERED</div>
                <Trophy size={20} className="text-zinc-700 group-hover:text-yellow-500 transition-colors mt-1" />
              </div>

              <div className="space-y-2 w-full text-left bg-black/20 p-4 rounded-2xl border border-zinc-800">
                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest text-center mb-2">The Challenges</div>
                <ul className="text-xs space-y-1">
                  {story.challenges.map((c, i) => (
                    <li key={i} className="flex gap-2 text-zinc-400">
                      <span className="text-primary">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-zinc-800/30 rounded-2xl border border-zinc-700/30 w-full">
                <div className="text-[9px] font-black text-white uppercase tracking-widest mb-2 italic opacity-60">Client Outcome</div>
                <p className="text-xs text-zinc-400 font-medium leading-relaxed italic mb-2">"{story.testimonial}"</p>
                <div className="text-[10px] font-bold text-primary">— {story.clientName}</div>
              </div>

              <button className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors group/btn">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Case Resolution Detail</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform text-primary" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-zinc-800 pt-6">
        <motion.button 
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           className="w-full bg-accent text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-accent/20"
           onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
           }}
        >
          Begin Your Own Victory - More Info
        </motion.button>
      </div>
    </div>
  );
}
