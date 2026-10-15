import React, { useState } from 'react';
import { Bot, X, Sparkles } from 'lucide-react';
import { WadhwaniAIChatbot } from './WadhwaniAIChatbot';

interface FloatingChatButtonProps {
  onOpenFullTab: () => void;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onOpenFullTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-full shadow-lg flex items-center space-x-2 transition transform hover:scale-105 group"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-bold">Ask Wadhwani AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[460px] z-50 p-2 sm:p-0 animate-scale-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden h-[90vh] sm:h-[620px] flex flex-col">
            <WadhwaniAIChatbot
              onClose={() => setIsOpen(false)}
              isModal={true}
            />
          </div>
        </div>
      )}
    </>
  );
};
