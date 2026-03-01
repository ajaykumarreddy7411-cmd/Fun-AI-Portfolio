import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="my-4 text-cyan-300 max-w-2xl">
      <div className="text-fuchsia-400 font-bold mb-4">
        ╔══════════════════════════════════╗<br/>
        ║         ABOUT AJAY KUMAR         ║<br/>
        ╚══════════════════════════════════╝
      </div>
      
      <div className="mb-6 space-y-2">
        <div className="flex">
          <span className="text-yellow-400 w-32 font-bold select-none">&gt; ROLE:</span>
          <span>Engineering Student | AI Enthusiast | Full Stack Developer</span>
        </div>
        <div className="flex">
          <span className="text-yellow-400 w-32 font-bold select-none">&gt; DOB:</span>
          <span>20-10-2005</span>
        </div>
        <div className="flex">
          <span className="text-yellow-400 w-32 font-bold select-none">&gt; STATUS:</span>
          <span className="text-[#00ff00]">Available for opportunities</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-fuchsia-400 font-bold mb-2 border-b border-fuchsia-900/50 pb-1">
          [ACADEMIC_RECORDS]
        </div>
        <div className="space-y-3 pl-2 border-l-2 border-cyan-800">
          <div>
            <div className="text-yellow-400 font-bold">B.E. in Engineering</div>
            <div className="text-cyan-100">MS Ramaiah Institute of Technology</div>
            <div className="text-[#00ff00] text-sm">GPA: 9.17</div>
          </div>
          <div>
            <div className="text-yellow-400 font-bold">Diploma</div>
            <div className="text-cyan-100">RL Jalappa Polytechnic</div>
            <div className="text-[#00ff00] text-sm">GPA: 9.94</div>
          </div>
          <div>
            <div className="text-yellow-400 font-bold">High School</div>
            <div className="text-cyan-100">Narayana E-Techno School</div>
            <div className="text-[#00ff00] text-sm">Percentage: 54% <span className="text-gray-400 italic">(I know it is bad 😔)</span></div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-fuchsia-400 font-bold mb-2 border-b border-fuchsia-900/50 pb-1">
          [PERSONAL_LOG]
        </div>
        <div className="text-gray-300 italic pl-2">
          "Passionate about building impactful software, with a strong interest in AI and emerging tech. 
          Beyond coding, I love to make friends, connect with new people, and just enjoy being myself!"
        </div>
      </div>

      <div className="mt-8 border-t border-cyan-900 pt-2 text-sm opacity-80">
        <span className="text-yellow-400">Available commands:</span> <br/>
        - Type <span className="text-fuchsia-400">skills</span> to view technical proficiencies<br/>
        - Type <span className="text-fuchsia-400">projects</span> to view portfolio (Locked)<br/>
        - Type <span className="text-fuchsia-400">contact</span> to view communication channels<br/><br/>
        <div className="text-cyan-400 border-t border-cyan-800 pt-2 text-center mt-2">
          [SYSTEM MESSAGE] Enjoying the challenges? Type <span className="text-yellow-400 font-bold">'test system_design'</span> to play!
        </div>
      </div>
    </div>
  );
};
