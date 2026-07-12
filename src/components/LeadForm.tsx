import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useRef } from 'react';
import { trackEvent } from '../lib/analytics';

type FormData = {
  name: string;
  phone: string;
  email: string;
  accidentType: string;
  message: string;
  consent: boolean;
};

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const started = useRef(false);
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<FormData>({ mode: 'onChange' });

  const trackStart = () => {
    if (started.current) return;
    started.current = true;
    trackEvent('lead_form_start', { form_name: 'website_callback_request' });
  };
  
  const onSubmit = async (data: FormData) => {
    setSubmitError('');
    trackEvent('lead_form_submit_attempt', { form_name: 'website_callback_request', accident_type: data.accidentType });
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: window.location.href, website: '' }),
      });
      if (!response.ok) throw new Error('Submission failed');
      trackEvent('generate_lead', { form_name: 'website_callback_request', accident_type: data.accidentType });
      setSubmitted(true);
    } catch {
      trackEvent('lead_form_error', { form_name: 'website_callback_request' });
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
         <h3 className="text-2xl font-black mb-2 tracking-tight uppercase">Request received</h3>
         <p className="text-black/80 text-sm font-medium">Your information was sent. AZ Accident Help or a participating attorney or law firm may contact you.</p>
         <a href="tel:+14803840398" className="mt-4 font-black underline">Call or text 480-384-0398</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={trackStart} className="space-y-4 text-black">
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
              {...register("accidentType", { required: true, onChange: (event) => trackEvent('accident_type_select', { accident_type: event.target.value }) })}
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

      <label className="flex items-start gap-3 rounded-xl bg-white/65 p-3 text-[10px] font-semibold leading-relaxed">
        <input
          type="checkbox"
          {...register('consent', { required: true })}
          className="mt-0.5 h-4 w-4 shrink-0 accent-black"
        />
        <span>
          I consent to calls, texts, and emails about my request from AZ Accident Help and participating attorneys or law firms, including through automated technology where permitted. Consent is not a condition of purchasing services. Message and data rates may apply. Reply STOP to opt out.
        </span>
      </label>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full bg-accent text-black font-black uppercase tracking-tight py-4 rounded-xl active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group border border-accent/20"
      >
        {isSubmitting ? 'Sending securely…' : 'Request my callback'}
      </motion.button>

      {submitError && <p role="alert" className="text-sm font-bold text-red-900 bg-white/70 rounded-lg p-3">{submitError}</p>}

      <p className="text-[8px] opacity-70 text-center font-medium leading-tight">
        AZ Accident Help is not a law firm and does not provide legal advice. Your information may be shared with participating attorneys or law firms. Submission does not create an attorney-client relationship or stop any legal deadline.
      </p>
    </form>
  );
}
