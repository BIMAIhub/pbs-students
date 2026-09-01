import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Calendar, 
  CreditCard, 
  ChevronRight, 
  Building2,
  PhoneCall,
  Activity,
  Lightbulb,
  MessageSquareText,
  UserCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AskPbsAiChatbotProps {
  courseContext?: string;
  onOpenRegistration?: () => void;
  onOpenCounselling?: () => void;
}

export const AskPbsAiChatbot: React.FC<AskPbsAiChatbotProps> = ({
  courseContext,
  onOpenRegistration,
  onOpenCounselling
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Greetings! I am **ASK PBS**, your AI BIM Career Advisor & Course Assistant at Pragmatic BIM Solution. 🎓\n\nHow can I help guide your BIM engineering journey today?\n\n• **BIM Career Path Roadmaps** for Civil, Mechanical, Electrical Engineers & Architects\n• **Saturday & Sunday Offline Weekend Batches** at our Pune Campus\n• Detailed Course Syllabus (Revit, Navisworks, Dynamo, Civil 3D)\n• Part-Payment Installments & Verified Certification`,
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ask-pbs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          courseContext: courseContext || 'General Inquiry'
        })
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "I am glad to help! Please check out our Saturday-Sunday weekend offline batches or schedule a 1:1 call with Er. Pravin Yadav (+91 8208918726).",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('ASK PBS Chatbot Error:', err);
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "I am having a slight network issue, but you can explore our **Saturday & Sunday Offline Weekend Batches** in Pune or book a 1:1 Counselling session directly with Er. Pravin Yadav (+91 8208918726)!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const PRESET_PROMPTS = [
    {
      label: '🛣️ Civil Engineer Career Path',
      text: 'I am a Civil Engineer. What is my step-by-step BIM career path to become a BIM Coordinator?'
    },
    {
      label: '📅 Offline Saturday & Sunday Batches',
      text: 'Tell me details about your Offline Weekend Batches held on Saturdays and Sundays in Pune.'
    },
    {
      label: '💳 Part-Payment & Fees',
      text: 'How does the Part-Payment installment system work for PBS online and offline courses?'
    },
    {
      label: '⚡ Revit vs Navisworks vs Dynamo',
      text: 'Which software should I learn first: Revit, Navisworks Manage, or Dynamo Visual Scripting?'
    }
  ];

  return (
    <>
      {/* Floating Widget Launcher Button */}
      <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-3 border-2 border-emerald-300/80 group"
          aria-label="Ask PBS AI Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-black leading-none text-white flex items-center gap-1">
              ASK PBS <span className="bg-amber-400 text-slate-900 text-[9px] px-1.5 py-0.2 rounded font-black">AI</span>
            </div>
            <div className="text-[10px] text-emerald-100 font-medium leading-tight">
              BIM Career Path Assistant
            </div>
          </div>
        </motion.button>
      </div>

      {/* Expandable Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[430px] h-[600px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border-2 border-emerald-500 flex flex-col overflow-hidden"
          >
            {/* Clean Light Header Bar */}
            <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-green-800 text-white p-4 flex items-center justify-between border-b border-emerald-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 flex-shrink-0">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-extrabold text-sm flex items-center gap-1.5">
                    ASK PBS AI Assistant
                    <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                      <Activity className="w-2.5 h-2.5 animate-pulse text-amber-300" />
                      Active
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-emerald-300" />
                    <span>Pragmatic BIM Solution, Pune</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-600/50 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Offline Weekend Notice Banner */}
            <div className="bg-amber-50 text-amber-900 border-b border-amber-200 px-4 py-2 text-[11px] font-bold flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                <span>Offline Batches: Sat & Sun (Pune Campus)</span>
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenCounselling) onOpenCounselling();
                }}
                className="text-emerald-700 hover:underline text-[10px] font-black flex items-center gap-0.5"
              >
                Book 1:1
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Messages Body (Clean Light Palette) */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50 text-slate-800 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-2xs space-y-1 ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none font-medium'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.text.split('\n').map((line, lIdx) => (
                        <p key={lIdx} className="mb-1 last:mb-0">
                          {line.split('**').map((part, pIdx) =>
                            pIdx % 2 === 1 ? (
                              <strong key={pIdx} className={msg.sender === 'user' ? 'text-white font-black' : 'text-slate-900 font-extrabold'}>
                                {part}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      ))}
                    </div>
                    <div className={`text-[9px] text-right ${msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[10px] text-slate-500 font-medium ml-1">ASK PBS is thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Preset Prompt Pills */}
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto">
              {PRESET_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.text)}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full px-3 py-1 text-[11px] font-bold whitespace-nowrap transition-colors flex-shrink-0"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Action Buttons Row */}
            <div className="px-3 py-1.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px]">
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenRegistration) onOpenRegistration();
                }}
                className="text-emerald-700 font-extrabold hover:text-emerald-800 flex items-center gap-1"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Register & Part-Pay Online</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenCounselling) onOpenCounselling();
                }}
                className="text-amber-800 font-extrabold hover:text-amber-900 flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Talk to Er. Pravin</span>
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask ASK PBS about career path, weekend batches..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-slate-100 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-2.5 rounded-xl transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
