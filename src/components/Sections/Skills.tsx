import React from 'react';

const SKILLS = [
  { category: 'LANGUAGES', items: ['Java', 'JavaScript', 'Python', 'C'] },
  { category: 'FRONTEND', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { category: 'BACKEND', items: ['Node.js', 'Express', 'Spring Boot'] },
  { category: 'DATABASES', items: ['MongoDB', 'PostgreSQL', 'MySQL'] },
  { category: 'AI/ML', items: ['scikit-learn', 'TensorFlow'] }
];

export const Skills: React.FC = () => {
  return (
    <div className="my-2 text-cyan-300">
      <div className="text-fuchsia-400 font-bold mb-2">
        ╔══════════════════════════════════╗<br/>
        ║         TECH STACK LOADED        ║<br/>
        ╚══════════════════════════════════╝
      </div>
      
      <div className="space-y-4">
        {SKILLS.map((section) => (
          <div key={section.category}>
            <div className="text-yellow-400 mb-2 font-semibold">❯ {section.category}</div>
            <div className="flex flex-wrap gap-2 pl-4">
              {section.items.map((item) => (
                <span 
                  key={item} 
                  className="px-3 py-1 border border-cyan-500/30 text-cyan-200 bg-cyan-900/20 text-sm hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 opacity-70">Type 'skills --detail [category]' for more info</div>
    </div>
  );
};
