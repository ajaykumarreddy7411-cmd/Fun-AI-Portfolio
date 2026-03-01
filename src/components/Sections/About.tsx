import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="my-4 text-cyan-300">
      <div className="text-fuchsia-400 font-bold mb-2">
        ╔══════════════════════════════════╗<br/>
        ║         ABOUT AJAY KUMAR         ║<br/>
        ╚══════════════════════════════════╝
      </div>
      <div className="mb-2">
        <span className="text-yellow-400">Role:</span> Engineering Student | AI Enthusiast | Full Stack Developer<br/>
        <span className="text-yellow-400">Status:</span> Available for opportunities
      </div>
      <div className="text-gray-400 mb-2">
        [Passionate about building impactful software]<br/>
        [Strong interest in AI and emerging tech]<br/>
        [Continuous learner | Curious builder]
      </div>
      <div>
        Skills accessible via: <span className="text-fuchsia-400">skills</span> command<br/>
        Projects locked. Type <span className="text-fuchsia-400">unlock projects</span> to solve challenge.
      </div>
    </div>
  );
};
