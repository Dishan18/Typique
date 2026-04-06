import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';

interface PageManagerProps {
  pages: string[];
  currentPageIndex: number;
  onBack: () => void;
  onSelectPage: (index: number) => void;
  onNewPage: () => void;
  font: string;
  inkColor: string;
  paperColor: string;
}

export function PageManager({ pages, currentPageIndex, onBack, onSelectPage, onNewPage, font, inkColor, paperColor }: PageManagerProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-black/5 backdrop-blur-sm z-40 relative">
      <div className="p-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-blue-200 shadow-sm sticky top-0 z-10">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Typing
        </button>
        <button 
          onClick={onNewPage} 
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl font-bold shadow-md hover:bg-blue-600 transition-colors hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" /> New Page
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col gap-8 items-center pb-32">
        {pages.map((pageText, index) => (
          <div key={index} className="w-full max-w-2xl flex flex-col gap-2">
            <div className="flex justify-between items-center px-2">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Page {index + 1}</span>
              {index === currentPageIndex && <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Current</span>}
            </div>
            <div 
              onClick={() => { onSelectPage(index); onBack(); }}
              className={`w-full min-h-[400px] shadow-xl p-8 sm:p-12 cursor-pointer transition-all hover:scale-[1.02] ${index === currentPageIndex ? 'ring-4 ring-blue-400 shadow-blue-200/50' : 'hover:shadow-2xl'}`}
              style={{ 
                backgroundColor: paperColor,
                color: inkColor,
                fontFamily: font,
                fontSize: '1.125rem',
                lineHeight: '28px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {pageText || <span className="text-black/20 italic">Blank page...</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}