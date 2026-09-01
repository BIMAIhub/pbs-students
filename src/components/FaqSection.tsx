import React, { useState } from 'react';
import { FAQS } from '../data/pbsData';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Courses', 'Enrollment', 'Certificates', 'BIM Services', 'Career'];

  const filteredFaqs = FAQS.filter(faq => selectedCategory === 'All' || faq.category === selectedCategory);

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>NEED ANY HELP?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Here are some <span className="text-emerald-600">frequently asked questions</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Everything you need to know about our training programs, BIM services, and certification.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIdx(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA for unhandled questions */}
        <div className="mt-10 bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">Couldn't find an answer to your question?</h3>
          <p className="text-xs text-slate-600">
            Our team is available 24/7 on WhatsApp to clear your doubts regarding syllabus, software, or enrollment.
          </p>
          <a
            href="https://wa.me/918208918726?text=Hi%20Pragmatic%20BIM%20Solution,%20I%20have%20a%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp (+91 8208918726)</span>
          </a>
        </div>

      </div>
    </section>
  );
};
