import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { track } from '../lib/analytics';

type FormData = { fullName:string; phone:string; email:string; preferredLanguage:string; accidentType:string; city:string; caseDetails:string; needAttorney:string; consent:boolean; website:string };

export default function LeadForm() {
  const [submitted,setSubmitted]=useState(false);
  const [submitError,setSubmitError]=useState('');
  const {register,handleSubmit,formState:{errors,isValid,isSubmitting}}=useForm<FormData>({mode:'onChange'});
  const onSubmit=async(data:FormData)=>{
    setSubmitError('');
    const p=new URLSearchParams(window.location.search);
    try {
      const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,submissionId:crypto.randomUUID(),pageUrl:window.location.href,referrer:document.referrer,utmSource:p.get('utm_source')||'',utmMedium:p.get('utm_medium')||'',utmCampaign:p.get('utm_campaign')||'',gclid:p.get('gclid')||'',fbclid:p.get('fbclid')||'',leadSource:'Website Form'})});
      if(!response.ok) throw new Error('Delivery failed');
      track('generate_lead',{lead_source:'website_form'});
      setSubmitted(true);
    } catch {
      track('lead_submit_error',{lead_source:'website_form'});
      setSubmitError('Your request was not delivered. Please try again or use the phone option on this page.');
    }
  };
  if(submitted)return <div className="flex flex-col items-center justify-center py-12 text-center h-full text-black" role="status"><motion.div initial={{scale:0}} animate={{scale:1}} className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-primary mb-6"><CheckCircle2 size={32}/></motion.div><h3 className="text-2xl font-black mb-2 uppercase">Request Received</h3><p className="text-black/80 text-sm font-medium">Your information was securely delivered for intake review.</p></div>;
  const field='w-full px-4 py-2.5 rounded-xl bg-white border border-black/10 outline-none font-semibold focus:border-black/40';
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
    <input {...register('website')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/>
    <div className="grid sm:grid-cols-2 gap-3">
      <label className="text-[10px] font-bold uppercase">Full Name*<input {...register('fullName',{required:true,minLength:2})} className={field} autoComplete="name"/></label>
      <label className="text-[10px] font-bold uppercase">Phone*<input {...register('phone',{required:true,pattern:/[0-9].*[0-9].*[0-9].*[0-9].*[0-9].*[0-9].*[0-9].*[0-9].*[0-9].*[0-9]/})} className={field} type="tel" autoComplete="tel"/></label>
      <label className="text-[10px] font-bold uppercase">Email<input {...register('email')} className={field} type="email" autoComplete="email"/></label>
      <label className="text-[10px] font-bold uppercase">Arizona City<input {...register('city')} className={field} autoComplete="address-level2"/></label>
      <label className="text-[10px] font-bold uppercase">Preferred Language<select {...register('preferredLanguage')} className={field}><option>English</option><option>Spanish</option></select></label>
      <label className="text-[10px] font-bold uppercase">Accident Type*<select {...register('accidentType',{required:true})} className={field}><option value="">Select one</option><option>Car Accident</option><option>Motorcycle Accident</option><option>Commercial Truck</option><option>Other Injury</option></select></label>
    </div>
    <label className="text-[10px] font-bold uppercase block">Case Details<textarea {...register('caseDetails')} rows={3} className={field} placeholder="Briefly tell us what happened."/></label>
    <label className="text-[10px] font-bold uppercase block">Would you like help finding an attorney?<select {...register('needAttorney')} className={field}><option>Yes</option><option>Maybe</option><option>No</option></select></label>
    <label className="flex gap-3 items-start text-[10px] font-semibold leading-relaxed normal-case"><input type="checkbox" {...register('consent',{required:true})} className="mt-1 h-4 w-4"/><span>I agree that AZ Accident Help and participating legal service providers may contact me at the number provided, including by call or text using automated technology. Consent is not a condition of receiving services. Message and data rates may apply. Reply STOP to opt out. Submitting this form does not create an attorney-client relationship.</span></label>
    {(errors.fullName||errors.phone||errors.accidentType||errors.consent)&&<p className="text-xs font-bold text-red-800">Complete all required fields and check the consent box.</p>}
    {submitError&&<div role="alert" className="flex gap-2 text-xs font-bold text-red-900 bg-red-100 p-3 rounded-xl"><AlertCircle size={16}/>{submitError}</div>}
    <motion.button type="submit" disabled={!isValid||isSubmitting} className="w-full bg-accent text-black font-black uppercase py-4 rounded-xl disabled:opacity-50">{isSubmitting?'Securely Sending…':'Request My Free Case Review'}</motion.button>
    <p className="text-[9px] text-center font-semibold">AZ Accident Help is not a law firm. Information may be shared with participating attorneys for intake review.</p>
  </form>;
}
