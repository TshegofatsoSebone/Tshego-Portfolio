import React from 'react';
import { SKILLS, EXPERIENCE } from '../constants';
import { Briefcase, User, Cpu, Sparkles } from 'lucide-react';
import { Skill } from '../types';

const Skills: React.FC = () => {
  const categoryOrder = [
    'Languages',
    'Frontend',
    'Backend & DB',
    'Cloud & Platforms',
    'AI/ML',
    'Tools'
  ];

  const renderIcon = (skill: Skill) => {
    // Custom Handlers for AI tools that might not be in Devicon
    if (skill.icon === 'custom-gemini') {
      return (
        <div className="relative">
          <Sparkles className="w-10 h-10 text-indigo-500 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full blur-[2px]"></div>
        </div>
      );
    }
    
    if (skill.icon === 'custom-huggingface') {
      return <span className="text-4xl filter saturate-150 drop-shadow-sm" role="img" aria-label="Hugging Face">🤗</span>;
    }

    // Standard Devicon Handler
    if (skill.icon && skill.icon.includes('devicon-')) {
      return (
        <i className={`${skill.icon} text-4xl block transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-md`}></i>
      );
    }

    // Fallback for missing icons
    return <Cpu className="w-9 h-9 text-slate-400 opacity-60" />;
  };

  return (
    <>
      {/* About Section */}
      <section id="about" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 dark:bg-slate-800/10 -skew-x-12 transform origin-top-right -z-10"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-4 mb-12">
              <div className="p-3.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl shadow-sm">
                <User className="text-indigo-600 dark:text-indigo-400" size={32} />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">About Me</h2>
                <div className="w-20 h-1.5 bg-indigo-600 rounded-full mt-4"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Bio */}
              <div className="space-y-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                <p>
                  I am a <span className="text-slate-900 dark:text-white font-bold">Software Developer</span> with strong foundations in Java, Kotlin, C#, and full-stack web development. My passion lies in bridging the gap between complex backend logic and seamless user experiences.
                </p>
                <p>
                  I've recently pivoted into <span className="text-indigo-600 dark:text-indigo-400 font-bold">AI and Machine Learning</span>, completing specialized tracks in Generative AI, LLMs, and Responsible AI. 
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700`}></div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-500">Currently interning at Capaciti</span>
                </div>
              </div>

              {/* Experience Card */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm backdrop-blur-sm">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                  <Briefcase className="text-indigo-500" size={24} /> Professional Journey
                </h3>
                <div className="space-y-10">
                  {EXPERIENCE.map((exp, idx) => (
                    <div key={idx} className="relative pl-8 border-l-2 border-indigo-200 dark:border-indigo-900/50">
                      <div className="absolute w-4 h-4 bg-indigo-600 rounded-full -left-[9px] top-1 ring-4 ring-white dark:ring-slate-800"></div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{exp.role}</h4>
                      <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-4 mt-1 uppercase tracking-wider">
                        {exp.company} • {exp.period}
                      </p>
                      {Array.isArray(exp.description) ? (
                        <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                          {exp.description.map((point, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-indigo-500 mt-1">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-950 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
             <div className="flex flex-col md:flex-row items-start gap-4 mb-16">
              <div className="p-3.5 bg-purple-100 dark:bg-purple-900/30 rounded-2xl shadow-sm">
                <Cpu className="text-purple-600 dark:text-purple-400" size={32} />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Technical Arsenal</h2>
                <div className="w-20 h-1.5 bg-purple-600 rounded-full mt-4"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryOrder.map(category => {
                const skillsInCategory = SKILLS.filter(s => s.category === category);
                if (skillsInCategory.length === 0) return null;

                return (
                  <div 
                    key={category} 
                    className="group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-900/50 transition-all duration-500"
                  >
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 pb-4 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                      {category}
                      <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full uppercase tracking-tighter">
                        {skillsInCategory.length} tools
                      </span>
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-y-8 gap-x-4">
                      {skillsInCategory.map(skill => (
                        <div 
                          key={skill.name}
                          className="group/skill flex flex-col items-center justify-center transition-all duration-300"
                        >
                          <div className="mb-3 flex items-center justify-center h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-800/80 group-hover/skill:bg-white dark:group-hover/skill:bg-slate-700 shadow-none group-hover/skill:shadow-lg transition-all duration-300">
                            {renderIcon(skill)}
                          </div>
                          <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 text-center leading-tight uppercase tracking-tight group-hover/skill:text-indigo-600 dark:group-hover/skill:text-indigo-400 transition-colors">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;