import React from 'react';
import { User, MapPin, Mail, Link as LinkIcon } from 'lucide-react';

export const ProfileApp: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-shrink-0 flex flex-col items-center space-y-4">
        <div className="w-40 h-40 bg-gray-200 border-2 border-black relative overflow-hidden group">
            {/* Placeholder for pixelated portrait */}
            <img 
                src="https://i.ibb.co/sL6KVk0/08f6402cb95237ef72e64d32dc38691c.png" 
                alt="Pulidevan" 
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZHRoPSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-50 pointer-events-none"></div>
        </div>
        <div className="w-full bg-black text-white text-center py-1 text-xs font-bold animate-pulse">
          STATUS: ONLINE
        </div>
      </div>

      <div className="flex-grow space-y-4">
        <div>
          <h1 className="text-2xl font-bold bg-yellow-300 inline-block px-2 border-2 border-black mb-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Pulidevan Prabakaran
          </h1>
          <h2 className="text-lg font-bold text-gray-600">
            Creative Technologist & Brand Strategist
          </h2>
        </div>

        <p className="text-sm leading-relaxed border-l-4 border-black pl-4 italic">
          "Fixing broken brand stories & training the next gen in AI."
        </p>

        <div className="space-y-2 text-sm mt-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Chennai, India</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <a href="mailto:itspuli@proton.me" className="hover:bg-black hover:text-white px-1 transition-colors">itspuli@proton.me</a>
          </div>
          <div className="flex items-center gap-2">
            <LinkIcon size={16} />
            <a href="#" className="hover:bg-black hover:text-white px-1 transition-colors">linkedin.com/in/pulidevan</a>
          </div>
        </div>

        <div className="mt-6 p-3 bg-gray-100 border border-black border-dashed">
            <p className="text-xs uppercase tracking-widest font-bold mb-2">Core Modules:</p>
            <div className="flex flex-wrap gap-2">
                {['Brand Strategy', 'Generative AI', 'Drone Piloting', 'React/Three.js', 'Creative Direction'].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-white border border-black text-xs font-bold hover:bg-black hover:text-white cursor-crosshair">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};