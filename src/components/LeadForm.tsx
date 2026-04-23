import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

type FormData = {
  name: string;
  phone: string;
  accidentType: string;
  message: string;
};

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    console.log('Lead submitted:', data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center h-full text-black">
         <motion.div 
           initial={{ scale: 0 }} 
           animate={{ scale: 1 }} 
           className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-primary mb-6 shadow-lg shadow-black/20"
         >
           <CheckCircle2 size={32} />
         </motion.div>
         <h3 className="text-2xl font-black mb-2 tracking-tight uppercase">Case Received</h3>
         <p className="text-black/80 text-sm font-medium italic">We'll call you <span className="underline font-black">within 1 hour.</span></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
      <div className="space-y-3">
        <div>
           <label className="text-[10px] font-bold uppercase tracking-widest opacity-80 block mb-1">Full Name</label>
           <input 
              {...register("name", { required: true })}
              className={`w-full px-4 py-2.5 rounded-xl bg-white border border-black/10 transition-all outline-none font-semibold placeholder:text-black/30 focus:border-black/30 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="John Doe"
           />
        </div>

        <div>
           <label className="text-[10px] font-bold uppercase tracking-widest opacity-80 block mb-1">Phone Number</label>
           <input 
              {...register("phone", { required: true })}
              className={`w-full px-4 py-2.5 rounded-xl bg-white border border-black/10 transition-all outline-none font-semibold placeholder:text-black/30 focus:border-black/30 ${
                errors.phone ? "border-red-500" : ""
              }`}
              placeholder="(602) 555-0123"
           />
        </div>

        <div>
           <label className="text-[10px] font-bold uppercase tracking-widest opacity-80 block mb-1">Accident Type</label>
           <select 
              {...register("accidentType", { required: true })}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/10 transition-all outline-none font-semibold focus:border-black/30 appearance-none cursor-pointer"
           >
               <option value="car">Car Accident</option>
               <option value="motorcycle">Motorcycle</option>
               <option value="truck">Comm. Truck</option>
               <option value="injury">Other Injury</option>
           </select>
        </div>

        <div>
           <label className="text-[10px] font-bold uppercase tracking-widest opacity-80 block mb-1">Case Details</label>
           <textarea 
              {...register("message")}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/10 transition-all outline-none font-semibold placeholder:text-black/30 focus:border-black/30 resize-none text-sm"
              placeholder="What happened?..."
           />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!isValid}
        className="w-full bg-accent text-black font-black uppercase tracking-tight py-4 rounded-xl active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group border border-accent/20"
      >
        Send My Case Details
      </motion.button>

      <p className="text-[8px] opacity-70 text-center font-medium leading-tight">
        By clicking, you agree to our privacy policy and consent to contact via automated systems.
      </p>
    </form>
  );
}
