import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Clock, 
  User, 
  Check,
  ChevronRight
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am the AZ Accident Help assistant. Are you asking about a recent accident or a current legal case?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isBusinessHours, setIsBusinessHours] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock check for business hours (8am - 6pm MST)
    const now = new Date();
    const hours = now.getHours();
    setIsBusinessHours(hours >= 8 && hours < 18);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Quick bot response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: isBusinessHours 
          ? "I'm connecting you with a local legal specialist right now. One moment..." 
          : "Our offices are currently closed, but a specialist is available for call-back. Would you like to leave your number?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-3 bg-primary text-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-black/10 rounded-xl flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-tight">Live Help</div>
                  <div className="flex items-center gap-1.5">
                    <div className={isBusinessHours ? "w-2 h-2 bg-green-600 rounded-full animate-pulse" : "w-2 h-2 bg-yellow-600 rounded-full"} />
                    <span className="text-[9px] font-bold opacity-80">
                      {isBusinessHours ? "Specialists Online" : "Currently Offline"}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-black/10 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              className="flex-grow overflow-y-auto p-3 space-y-3 scroll-smooth" 
              ref={scrollRef}
              style={{ scrollbarWidth: 'thin' }}
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm font-medium ${
                    msg.sender === 'user' 
                      ? "bg-primary text-black rounded-br-none" 
                      : "bg-zinc-800 text-zinc-100 rounded-bl-none"
                  }`}>
                    {msg.text}
                    <div className={`text-[8px] mt-1 opacity-50 flex items-center justify-end gap-1`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {msg.sender === 'user' && <Check size={8} />}
                    </div>
                  </div>
                </div>
              ))}
              {!isBusinessHours && (
                <div className="flex flex-col gap-2 p-2 bg-zinc-900 rounded-2xl border border-zinc-800">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-1">Quick Actions</div>
                  <button className="flex items-center justify-between p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors group">
                    <div className="flex items-center gap-2">
                       <Phone size={14} className="text-primary" />
                       <span className="text-xs font-bold">Request Immediate Callback</span>
                    </div>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="flex items-center justify-between p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors group text-left">
                    <div className="flex items-center gap-2">
                       <Clock size={14} className="text-primary" />
                       <span className="text-xs font-bold">Schedule for Tomorrow Morning</span>
                    </div>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-zinc-900 border-t border-zinc-800">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your question..."
                  className="flex-grow bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors text-white"
                />
                <button 
                  onClick={handleSend}
                  className="w-9 h-9 bg-primary text-black rounded-xl flex items-center justify-center hover:bg-primary-dark transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-2 text-[8px] text-zinc-500 text-center uppercase tracking-widest font-black">
                Attorney-Client Privilege Appears On Signed Document
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-black shadow-2xl shadow-primary/40 relative"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-zinc-950 rounded-full" />
        )}
      </motion.button>
    </div>
  );
}
