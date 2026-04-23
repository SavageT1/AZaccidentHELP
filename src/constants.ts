/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SuccessStory {
  id: string;
  type: string;
  challenges: string[];
  resolution: string;
  testimonial: string;
  clientName: string;
  settlementAmount: string;
  icon: 'car' | 'bike' | 'truck';
  imageUrl: string;
}

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 's1',
    type: 'Multi-Vehicle Pileup',
    challenges: [
      'Disputed liability among 4 drivers',
      'Severe spinal injuries requiring surgery',
      'Insurance company denied majority of medical bills'
    ],
    resolution: 'Successfully proved liability of the lead commercial vehicle through dashcam recovery. Secured a policy-limit settlement for our client.',
    testimonial: 'They saved my family from financial ruin after my surgery. I cannot thank the team enough.',
    clientName: 'Robert M.',
    settlementAmount: '$1.2M',
    icon: 'car',
    imageUrl: 'https://images.unsplash.com/photo-1590559063737-0207cd4f014e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 's2',
    type: 'Motorcycle Left-Turn Accident',
    challenges: [
      'Victim blamed for "speeding" by eyewitnesses',
      'Complex fractured pelvis',
      'Lost 6 months of specialist income'
    ],
    resolution: 'Used accident reconstruction experts to prove the car turned illegally into the motorcycle\'s path. Eyewitness reports were debunked by forensic evidence.',
    testimonial: 'Everyone told me it was my fault because I was on a bike. AZ Accident Help proved them wrong.',
    clientName: 'Jake T.',
    settlementAmount: '$850k',
    icon: 'bike',
    imageUrl: 'https://images.unsplash.com/photo-1625066396744-8a9a2444ae12?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 's3',
    type: 'Commercial Truck Jackknife',
    challenges: [
      'Trucking company hid driver logbooks',
      'Permanent disability for the passenger',
      'Attempted low-ball offer of $50k'
    ],
    resolution: 'Subpoenaed GPS and telematics data that proved driver fatigue. Forced a major settlement during the third week of deposition.',
    testimonial: 'The trucking company had 10 lawyers. AZ Accident Help had better ones.',
    clientName: 'Linda S.',
    settlementAmount: '$3.4M',
    icon: 'truck',
    imageUrl: 'https://images.unsplash.com/photo-1454165833767-1330067c57fb?auto=format&fit=crop&q=80&w=800',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah J.',
    location: 'Phoenix, AZ',
    text: 'After my motorcycle accident, I was overwhelmed. AZ Accident Help made the process so much easier. The calculator was surprisingly accurate!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael R.',
    location: 'Scottsdale, AZ',
    text: 'Found them through their blog. The resources are top-notch. They handled my car accident case with extreme professionalism.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Elena G.',
    location: 'Tucson, AZ',
    text: 'Strategic, bold, and helpful. They got me a settlement far beyond what the insurance company initially offered.',
    rating: 5,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Steps to Take Immediately After a Car Accident in Arizona',
    excerpt: 'Your actions in the first 30 minutes can make or break your case. Here is what you need to know.',
    date: 'Oct 12, 2023',
    category: 'Legal Tips',
    imageUrl: 'https://images.unsplash.com/photo-1579309313175-985698f2441c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'Understanding Arizona Motorcycle Helmet Laws and Your Injury Claim',
    excerpt: 'Does wearing a helmet affect your ability to collect damages? We dive into the legal specifics.',
    date: 'Nov 5, 2023',
    category: 'Motorcycle Safety',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527ba8479c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    title: 'What is the Statute of Limitations for Personal Injury in AZ?',
    excerpt: 'Time is ticking. Learn about the crucial deadlines you must meet to file your claim.',
    date: 'Jan 20, 2026',
    category: 'Legal FAQ',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'How much does it cost to hire a personal injury lawyer?',
    answer: 'Most personal injury lawyers work on a contingency fee basis. This means you pay nothing up front, and we only get paid if we win your case.',
  },
  {
    question: 'How long do I have to file a claim in Arizona?',
    answer: 'Generally, the statute of limitations for personal injury in Arizona is two years from the date of the accident. However, certain exceptions apply, so it is best to consult with an expert early.',
  },
  {
    question: 'What is my case actually worth?',
    answer: 'Every case is unique. Factors include medical bills, lost wages, pain and suffering, and insurance limits. Use our Claim Value Estimator to get an initial estimate.',
  },
];
