import React from 'react';
import { Tv, ShieldAlert, X } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

interface YoutubeSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  registeredEmail?: string;
}

export const YoutubeSignInModal: React.FC<YoutubeSignInModalProps> = ({
  isOpen,
  onClose,
  registeredEmail
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] border border-[#333] rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-scaleIn relative">
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-red-500/20">
          <Tv className="w-7 h-7 text-red-500" />
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-xl font-black text-white">Sign In to YouTube</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            PBS Masterclass videos are securely hosted as Private YouTube streams. You must be authenticated to view them.
          </p>
        </div>

        <div className="bg-[#2a2a2a] p-4 rounded-xl border border-[#3a3a3a] text-center space-y-2">
          <div className="flex justify-center mb-1">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Required Account Access</div>
          {registeredEmail ? (
            <div className="text-sm font-mono font-bold text-emerald-400 break-all bg-emerald-500/10 py-1.5 px-3 rounded-lg inline-block border border-emerald-500/20">
              {registeredEmail}
            </div>
          ) : (
            <div className="text-xs font-semibold text-rose-400 bg-rose-500/10 py-1 px-2 rounded border border-rose-500/20">
              No Google account linked. Please update your profile.
            </div>
          )}
          <p className="text-[11px] text-slate-500 pt-1">
            You must use this exact email address to view the private YouTube streams.
          </p>
        </div>
        
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
