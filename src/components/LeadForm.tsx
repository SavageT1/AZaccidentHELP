import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

type FormData = {
  name: string;
  phone: string;
  email: string;
  accidentType: string;
  message: string;
};

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<FormData>({ mode: 'onChange' });
  
  const onSubmit = async (data: FormData) => {
    setSubmitError('');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: window.location.href, website: '' }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setSubmitError('We could not send your request. Please call or text 480-384-0398 now.');
    }
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
         <p className="text-black/80 text-sm font-medium">Your request was sent. We will contact you as soon as possible.</p>
         <a href="tel:+14803840398" className="mt-4 font-black underline">Call or text 480-384-0398</a>
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
              type="tel"
              autoComplete="tel"
              {...register("phone", { required: true, pattern: /^\+?[\d\s().-]{10,}$/ })}
              className={`w-full px-4 py-2.5 rounded-xl bg-white border border-black/10 transition-all outline-none font-semibold placeholder:text-black/30 focus:border-black/30 ${
                errors.phone ? "border-red-500" : ""
              }`}
              placeholder="(480) 384-0398"
           />
        </div>

        <div>
           <label className="text-[10px] font-bold uppercase tracking-widest opacity-80 block mb-1">Email Address</label>
           <input
              type="email"
              autoComplete="email"
              {...register("email", { required: true })}
              className={`w-full px-4 py-2.5 rounded-xl bg-white border border-black/10 transition-all outline-none font-semibold placeholder:text-black/30 focus:border-black/30 ${errors.email ? "border-red-500" : ""}`}
              placeholder="you@example.com"
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
        disabled={!isValid || isSubmitting}
        className="w-full bg-accent text-black font-black uppercase tracking-tight py-4 rounded-xl active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group border border-accent/20"
      >
        {isSubmitting ? 'Sending Securely…' : 'Get My Free Case Review'}
      </motion.button>

      {submitError && <p role="alert" className="text-sm font-bold text-red-900 bg-white/70 rounded-lg p-3">{submitError}</p>}

      <p className="text-[8px] opacity-70 text-center font-medium leading-tight">
        By submitting, you agree to be contacted about your request by phone, text, or email. Message and data rates may apply. Submission does not create an attorney-client relationship.
      </p>
    </form>
  );
}
