import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, CornerDownLeft, Settings, Download, X } from 'lucide-react';

export function TutorialModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTypewriterTutorial');
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = (dontShowAgain: boolean) => {
    if (dontShowAgain) {
      localStorage.setItem('hasSeenTypewriterTutorial', 'true');
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden border-4 border-blue-200"
          >
            <div className="p-6 border-b border-blue-100 flex justify-between items-center bg-blue-50">
              <h2 className="text-xl font-bold text-blue-600">Welcome to Typique!</h2>
              <button
                onClick={() => handleClose(false)}
                className="text-blue-300 hover:text-blue-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border-2 border-blue-200">
                  <Keyboard className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Start Typing</h3>
                  <p className="text-sm text-gray-600 mt-1">Just start typing on your keyboard. The paper will catch your words!</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0 border-2 border-green-200">
                  <CornerDownLeft className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Carriage Return</h3>
                  <p className="text-sm text-gray-600 mt-1">Press Enter to move to the next line with a satisfying animation.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0 border-2 border-purple-200">
                  <Settings className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Customize</h3>
                  <p className="text-sm text-gray-600 mt-1">Use the top toolbar to change paper color, ink color, and fonts.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border-2 border-orange-200">
                  <Download className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Export</h3>
                  <p className="text-sm text-gray-600 mt-1">Download your masterpiece as a plain text file or a styled PDF.</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-blue-100 bg-blue-50 flex items-center justify-between">
              <button
                onClick={() => handleClose(true)}
                className="text-sm font-medium text-blue-400 hover:text-blue-600 transition-colors"
              >
                Don't show again
              </button>
              <button
                onClick={() => handleClose(false)}
                className="px-6 py-2.5 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Start Typing!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
