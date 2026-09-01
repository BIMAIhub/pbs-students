import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Code, 
  Layers, 
  AlertCircle, 
  HelpCircle,
  Lightbulb,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { soundFx } from '../../utils/soundEffects';

interface BimAiCopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  codeSnippet?: string;
  suggestedActions?: string[];
  timestamp: string;
}

export const BimAiCopilotDrawer: React.FC<BimAiCopilotDrawerProps> = ({
  isOpen,
  onClose,
  studentName,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello ${studentName}! I am your PBS BIM AI Academic Assistant. How can I help you today with Revit modeling, Dynamo visual scripts, Navisworks clash matrices, or ISO 19650 guidelines?`,
      timestamp: 'Just now',
      suggestedActions: [
        'How to fix Revit Duct System Disconnected error?',
        'Provide Dynamo Python Script for batch renaming sheets',
        'Explain ISO 19650 Container Naming Convention',
        'Navisworks Clash Grouping by Grid Location rule'
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    soundFx.playClick();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Generate intelligent academic BIM response
    setTimeout(() => {
      soundFx.playSuccess();
      let replyText = '';
      let codeSnippet: string | undefined = undefined;
      let actions: string[] | undefined = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('duct') || lower.includes('disconnect')) {
        replyText = `### Troubleshooting Revit Duct Disconnects & System Calculations:\n\n1. **Check System Type Match**: Verify that both the AHU discharge connector and the duct fitting share the same System Classification (*Supply Air*).\n2. **Connector Flow Direction**: Ensure the connector direction on your custom family is set to **'Out'** for source equipment and **'In'** for terminal diffusers.\n3. **Use Duct Inspect Tool**: Navigate to the *Analyze* tab > *Show Disconnects* > Check **Duct** to display yellow highlight warnings on open ends.\n4. **Align Centerlines**: Use the 'Align' (AL) command to lock horizontal & vertical centerlines before drawing transition reducers.`;
        actions = ['Generate Dynamo Auto-Connector Node', 'View Revit MEP Masterclass Lesson 12'];
      } else if (lower.includes('dynamo') || lower.includes('sheet') || lower.includes('rename') || lower.includes('python')) {
        replyText = `Here is a production-grade Dynamo Python Script (Revit API) to batch-rename and auto-number sheets according to ISO 19650 Project Standards:`;
        codeSnippet = `# Dynamo 2026 Python Script - ISO 19650 Sheet Batch Renamer
import clr
clr.AddReference('RevitAPI')
clr.AddReference('RevitServices')
from Autodesk.Revit.DB import *
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager

doc = DocumentManager.Instance.CurrentDBDocument
sheets = FilteredElementCollector(doc).OfClass(ViewSheet).ToElements()

prefix = IN[0] or "PBS-DRW"
startIndex = IN[1] or 100

TransactionManager.Instance.EnsureInTransaction(doc)
updated_sheets = []

for index, sheet in enumerate(sheets):
    new_number = f"{prefix}-{startIndex + index}"
    sheet.SheetNumber = new_number
    updated_sheets.append(f"{sheet.Name} -> {new_number}")

TransactionManager.Instance.TransactionTaskDone()
OUT = updated_sheets`;
        actions = ['Download .dyn Script File', 'Learn Dynamo Visual Scripting in Module 4'];
      } else if (lower.includes('iso') || lower.includes('naming') || lower.includes('19650')) {
        replyText = `### ISO 19650-2 National Annex File Naming Convention:\n\nStandard String Syntax:\n\`[Project]-[Originator]-[Volume]-[Level]-[Type]-[Role]-[Number]\`\n\nExample Breakdown:\n- **PBS** : Project Code\n- **ARV** : Originator (Architectural Consultant)\n- **ZZ** : All Volumes / Whole Building\n- **02** : Level 02 Floor Plan\n- **M3** : 3D Model Container\n- **M** : Mechanical / MEP Discipline\n- **0001** : Sequential Sheet Number\n\nResulting Container Name: \`PBS-ARV-ZZ-02-M3-M-0001.rvt\``;
        actions = ['Download Master Information Delivery Plan (MIDP)', 'View BEP Protocol Template'];
      } else {
        replyText = `I have analyzed your query: "${query}". Based on PBS Academic Curriculum, this concept is covered in depth with live instructor mentorship and hands-on BIM datasets. Here are recommended steps to achieve mastery:`;
        codeSnippet = `// Revit API / Dynamo Automation Rule
Filter: System.Category == "OST_DuctCurves"
Action: ValidateParam("LOD_Level", Expected: 400)
Result: Pass (0 Coordination Warnings)`;
        actions = ['Ask Pravin Yadav in Next Live Class', 'Open Download Vault for Example Model'];
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        codeSnippet,
        suggestedActions: actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const copyToClipboard = (code: string, id: string) => {
    soundFx.playClick();
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200"
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white">PBS Smart BIM AI Co-Pilot</h3>
                <span className="bg-emerald-400/30 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-emerald-100">Live academic assistance & error troubleshooter</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-4 text-xs space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white rounded-tr-xs shadow'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-xs'
              }`}>
                <div className="whitespace-pre-line leading-relaxed">
                  {msg.text}
                </div>

                {/* Code Snippet Box */}
                {msg.codeSnippet && (
                  <div className="relative mt-2 rounded-xl bg-slate-900 text-slate-200 p-3 font-mono text-[11px] overflow-x-auto border border-slate-800">
                    <div className="flex items-center justify-between pb-1 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                      <span>Python / Dynamo API</span>
                      <button
                        onClick={() => copyToClipboard(msg.codeSnippet!, msg.id)}
                        className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-sans cursor-pointer"
                      >
                        {copiedCodeId === msg.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCodeId === msg.id ? 'Copied' : 'Copy Code'}</span>
                      </button>
                    </div>
                    <pre className="text-emerald-300">{msg.codeSnippet}</pre>
                  </div>
                )}

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Suggested Questions:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(action)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold border border-emerald-200 transition-colors text-left flex items-center gap-1 cursor-pointer"
                        >
                          <ChevronRight className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{action}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`text-[9px] ${msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'} text-right`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic bg-white p-3 rounded-2xl border border-slate-200 w-fit">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>PBS AI Assistant is analyzing BIM formulas...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything (e.g. Revit errors, Dynamo, ISO 19650)..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className={`p-2.5 rounded-xl text-white font-bold transition-all cursor-pointer ${
                inputQuery.trim() ? 'bg-emerald-600 hover:bg-emerald-700 shadow-md' : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
            <span>Powered by Pragmatic BIM Academic Knowledge Base</span>
            <span className="text-emerald-600 font-bold">LOD 500 AI Assistant</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
