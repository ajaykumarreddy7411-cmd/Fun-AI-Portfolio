import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="my-4 text-cyan-300">
      <div className="text-fuchsia-400 font-bold mb-4">
        ╔══════════════════════════════════╗<br/>
        ║      CONTACT INFORMATION         ║<br/>
        ╚══════════════════════════════════╝
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <div>
          <span className="text-yellow-400 w-24 inline-block">📧 Email:</span>
          <a href="mailto:akumar23755@gmail.com" className="text-[#00ff00] hover:underline">
            akumar23755@gmail.com
          </a>
        </div>
        <div>
          <span className="text-yellow-400 w-24 inline-block">💼 LinkedIn:</span>
          <a href="https://linkedin.com/in/ajay-kumar-reddy7411" target="_blank" rel="noreferrer" className="text-[#00ff00] hover:underline">
            linkedin.com/in/ajay-kumar-reddy7411
          </a>
        </div>
        <div>
          <span className="text-yellow-400 w-24 inline-block">🐙 GitHub:</span>
          <a href="https://github.com/ajaykumarreddy7411-cmd" target="_blank" rel="noreferrer" className="text-[#00ff00] hover:underline">
            github.com/ajaykumarreddy7411-cmd
          </a>
        </div>
      </div>
      <div className="text-gray-400 border-t border-cyan-500/30 pt-4 pb-2">
        [SYSTEM MESSAGE] Communication channels open and monitored.
      </div>
      <div className="mt-1 text-sm text-cyan-400 opacity-80 border-t border-cyan-800 pt-2 text-center">
        [SYSTEM MESSAGE] Enjoying the challenges? Type <span className="text-yellow-400 font-bold">'unlock contact'</span> to play again!
      </div>
    </div>
  );
};
