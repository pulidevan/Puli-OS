import React from 'react';
import { Download, Printer, ExternalLink } from 'lucide-react';

export const ResumeApp: React.FC = () => {
  const handlePrint = () => {
    // In a real scenario, this would link to a PDF file.
    // For this portfolio, we can trigger the browser print dialog which allows "Save as PDF".
    const printContent = document.getElementById('resume-content');
    if (printContent) {
        // Create a temporary iframe or window to print specific content would be the advanced way,
        // but for a simple OS simulacrum, we will just simulate the download action with a download alert 
        // or actually open the print dialog.
        alert("Downloading 'Pulidevan_Resume_2024.pdf'...");
    }
  };

  return (
    <div className="bg-black text-white font-mono h-full flex flex-col relative overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-100 text-black border-b-2 border-black p-2 flex justify-between items-center shrink-0 z-10 sticky top-0">
        <span className="font-bold text-xs md:text-sm uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            PDF_Viewer_v2.4
        </span>
        <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-black text-white px-3 py-1 hover:bg-gray-800 transition-colors text-xs md:text-sm font-bold border border-transparent active:border-black active:bg-white active:text-black"
        >
            <Download size={14} /> DOWNLOAD PDF
        </button>
      </div>

      {/* Scrollable Content */}
      <div id="resume-content" className="flex-grow overflow-y-auto p-4 md:p-8 space-y-12 selection:bg-white selection:text-black">
        
        {/* Header */}
        <header className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-gray-200">
                Pulidevan<br/>
                <span className="text-gray-500">Prabakaran</span>
            </h1>
            
            <div className="border-l-2 border-gray-700 pl-4 py-1 space-y-1">
                <p className="text-lg md:text-xl font-bold">Brand Strategist & Creative Technologist.</p>
                <p className="text-gray-400 text-sm max-w-md">Fixing broken brand stories & training the next gen in AI.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 text-xs text-gray-500 mt-4 font-mono">
                <span className="hover:text-white cursor-pointer">— itspuli@proton.me</span>
                <span className="hover:text-white cursor-pointer">— +91 7401 781 784</span>
                <span className="hover:text-white cursor-pointer">— linkedin.com/in/pulidevan</span>
                <span>— Chennai, India</span>
            </div>
        </header>

        {/* Quote */}
        <section>
            <blockquote className="text-xl md:text-2xl font-serif italic text-white leading-relaxed">
                “Smarter machines are controlled by curious machines.”
            </blockquote>
            <p className="mt-4 text-sm text-gray-400 max-w-2xl leading-relaxed">
                I treat narratives like products: shaped by insights, refined through iteration, and guided by user understanding. My approach unites data, research, and psychology to create positioning and messaging that truly connects with the target audience.
            </p>
            <div className="mt-6 flex gap-8 text-[10px] tracking-widest uppercase text-gray-600">
                <span>Branding</span>
                <span>Brand TVC</span>
                <span>Performance Marketing</span>
            </div>
        </section>

        {/* Key Metrics Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b border-gray-800 py-8">
            <div>
                <h3 className="text-2xl md:text-3xl font-bold">2,000+</h3>
                <p className="text-[10px] uppercase text-gray-500 mt-1">People Trained</p>
            </div>
            <div>
                <h3 className="text-2xl md:text-3xl font-bold">800+</h3>
                <p className="text-[10px] uppercase text-gray-500 mt-1">Ads Written & Shot</p>
            </div>
            <div>
                <h3 className="text-2xl md:text-3xl font-bold">60M+</h3>
                <p className="text-[10px] uppercase text-gray-500 mt-1">Organic & Paid Reach</p>
            </div>
            <div>
                <h3 className="text-2xl md:text-3xl font-bold">₹12 Cr+</h3>
                <p className="text-[10px] uppercase text-gray-500 mt-1">EdTech Revenue</p>
            </div>
        </section>

        {/* Experience */}
        <section className="space-y-8">
            <div className="flex justify-between items-baseline border-b border-gray-800 pb-2">
                <h2 className="text-xl font-bold uppercase text-gray-400">Selected Experience</h2>
                <span className="text-xs text-gray-600">2015 — Present</span>
            </div>

            <div className="space-y-6">
                <div className="relative pl-6 border-l border-gray-800 hover:border-white transition-colors">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-gray-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-white">Brand Manager → AI & EdTech Product Enablement Manager</h3>
                    <div className="flex justify-between text-xs text-gray-500 mt-1 mb-2">
                        <span>UPTOR | Chennai</span>
                        <span>MAY 2024 - PRESENT</span>
                    </div>
                    <p className="text-sm text-gray-400">Upgraded from Brand Manager to AI Enabler. Trained 2,000+ humans to command Gen AI & Agentic workflows. Built 100+ internal tools to automate the boring parts of VFX & Video.</p>
                </div>

                <div className="relative pl-6 border-l border-gray-800 hover:border-white transition-colors">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-gray-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-white">Brand Manager</h3>
                    <div className="flex justify-between text-xs text-gray-500 mt-1 mb-2">
                        <span>LMES Academy</span>
                        <span>NOV 2023 - PRESENT</span>
                    </div>
                    <p className="text-sm text-gray-400">Driving brand consistency and educational narratives for one of India's leading science education platforms.</p>
                </div>

                <div className="relative pl-6 border-l border-gray-800 hover:border-white transition-colors">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-gray-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-white">Digital Marketing Manager</h3>
                    <div className="flex justify-between text-xs text-gray-500 mt-1 mb-2">
                        <span>Whoa Mama</span>
                        <span>JUN 2022 - NOV 2023</span>
                    </div>
                    <p className="text-sm text-gray-400">Managed digital presence and marketing funnels for lifestyle and retail consumer engagement.</p>
                </div>

                <div className="relative pl-6 border-l border-gray-800 hover:border-white transition-colors">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-gray-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-white">Aerial Cinematographer</h3>
                    <div className="flex justify-between text-xs text-gray-500 mt-1 mb-2">
                        <span>Freelance (Kollywood)</span>
                        <span>DEC 2017 - NOV 2023</span>
                    </div>
                    <p className="text-sm text-gray-400">Drone pilot and cinematographer for over 10 feature films and leading real estate/tourism companies.</p>
                </div>
            </div>

            <div className="border border-gray-800 p-4 text-xs text-gray-500 uppercase tracking-wide">
                PREVIOUSLY: MARKETING ASSOCIATE @ XR LABS (AR/VR) • BUSINESS ANALYST @ DEEPSENSE DIGITAL • FLEET COORDINATOR @ UTOO CABS
            </div>
        </section>

        {/* Education & Certs */}
        <section className="grid md:grid-cols-2 gap-8 pt-4">
            <div>
                <h2 className="text-xl font-bold uppercase text-gray-400 mb-4 border-b border-gray-800 pb-2">Education</h2>
                <div>
                    <h3 className="font-bold">St. Joseph's Institute of Technology</h3>
                    <p className="text-sm text-gray-400">B.E. Electronics & Communications</p>
                    <p className="text-xs text-gray-600 mt-1">2012 - 2016</p>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-bold uppercase text-gray-400 mb-4 border-b border-gray-800 pb-2">Certifications</h2>
                <ul className="space-y-2 text-sm text-gray-300">
                    <li>[+] Metaverse & NFTs</li>
                    <li>[+] Apple Search Ads</li>
                    <li>[+] Design Thinking</li>
                    <li>[+] Advanced Branding</li>
                    <li>[+] Web3 for Leaders</li>
                </ul>
            </div>
        </section>
        
        <footer className="pt-12 text-center text-xs text-gray-700">
            BASED IN CHENNAI • FOREVER CURIOUS
        </footer>

      </div>
    </div>
  );
};