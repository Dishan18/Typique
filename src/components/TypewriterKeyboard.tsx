import React from 'react';

const LAYOUT = [
  [
    { code: 'Digit1', label: '1' }, { code: 'Digit2', label: '2' }, { code: 'Digit3', label: '3' },
    { code: 'Digit4', label: '4' }, { code: 'Digit5', label: '5' }, { code: 'Digit6', label: '6' },
    { code: 'Digit7', label: '7' }, { code: 'Digit8', label: '8' }, { code: 'Digit9', label: '9' },
    { code: 'Digit0', label: '0' }, { code: 'Minus', label: '-' }, { code: 'Equal', label: '=' },
    { code: 'Backspace', label: '←', width: 'w-[10vw] sm:w-16', shape: 'rounded-full' }
  ],
  [
    { code: 'KeyQ', label: 'Q' }, { code: 'KeyW', label: 'W' }, { code: 'KeyE', label: 'E' },
    { code: 'KeyR', label: 'R' }, { code: 'KeyT', label: 'T' }, { code: 'KeyY', label: 'Y' },
    { code: 'KeyU', label: 'U' }, { code: 'KeyI', label: 'I' }, { code: 'KeyO', label: 'O' },
    { code: 'KeyP', label: 'P' }, { code: 'BracketLeft', label: '[' }, { code: 'BracketRight', label: ']' }
  ],
  [
    { code: 'KeyA', label: 'A' }, { code: 'KeyS', label: 'S' }, { code: 'KeyD', label: 'D' },
    { code: 'KeyF', label: 'F' }, { code: 'KeyG', label: 'G' }, { code: 'KeyH', label: 'H' },
    { code: 'KeyJ', label: 'J' }, { code: 'KeyK', label: 'K' }, { code: 'KeyL', label: 'L' },
    { code: 'Semicolon', label: ';' }, { code: 'Quote', label: '\'' },
    { code: 'Enter', label: 'RETURN', width: 'w-[14vw] sm:w-24', shape: 'rounded-full' }
  ],
  [
    { code: 'KeyZ', label: 'Z' }, { code: 'KeyX', label: 'X' }, { code: 'KeyC', label: 'C' },
    { code: 'KeyV', label: 'V' }, { code: 'KeyB', label: 'B' }, { code: 'KeyN', label: 'N' },
    { code: 'KeyM', label: 'M' }, { code: 'Comma', label: ',' }, { code: 'Period', label: '.' },
    { code: 'Slash', label: '/' }, { code: 'ShiftRight', label: 'SHIFT', width: 'w-[14vw] sm:w-20', shape: 'rounded-full' }
  ],
  [
    { code: 'Space', label: '', width: 'w-[50vw] sm:w-96', shape: 'rounded-xl' }
  ]
];

export function TypewriterKeyboard({ pressedKeys }: { pressedKeys: Set<string> }) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-auto p-2 sm:p-8 bg-yellow-200 rounded-t-[2rem] sm:rounded-t-3xl shadow-[0_-10px_40px_rgba(250,204,21,0.3)] border-t-8 border-yellow-300 flex flex-col items-center gap-1 sm:gap-3 relative z-30 overflow-hidden pb-6 sm:pb-8">
      {/* Inner mechanical details illusion */}
      <div className="absolute top-0 left-4 right-4 h-3 sm:h-4 bg-yellow-400 rounded-b-lg opacity-50"></div>

      {LAYOUT.map((row, i) => (
        <div
          key={i}
          className="flex justify-center gap-0.5 sm:gap-2 w-full"
          style={{ marginLeft: i === 1 ? '3%' : i === 2 ? '6%' : i === 3 ? '9%' : '0' }}
        >
          {row.map((key) => {
            const isPressed = pressedKeys.has(key.code) || (key.code === 'ShiftRight' && pressedKeys.has('ShiftLeft'));
            const widthClass = key.width || 'w-[7.5vw] sm:w-12';
            const shapeClass = key.shape || 'rounded-full';

            return (
              <div
                key={key.code}
                className={`
                  relative flex items-center justify-center
                  ${shapeClass} ${widthClass} h-[8vw] sm:h-12
                  bg-white border border-blue-200
                  transition-all duration-75
                  ${isPressed ? 'translate-y-1 sm:translate-y-2 shadow-none' : 'shadow-[0_3px_0_#93c5fd] sm:shadow-[0_6px_0_#93c5fd] -translate-y-0.5 sm:-translate-y-1'}
                `}
              >
                {/* Inner keycap */}
                <div className={`
                  absolute inset-[1px] sm:inset-[3px] ${shapeClass}
                  border border-white/60
                  flex items-center justify-center
                  ${isPressed ? 'bg-blue-100' : 'bg-white'}
                `}>
                   <span className="text-[2.5vw] sm:text-xs font-bold text-blue-500 font-mono tracking-tighter">{key.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
