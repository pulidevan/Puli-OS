import React, { useState } from 'react';
import { Send, Mail, Loader2, CheckCircle, AlertTriangle, User, Phone, AtSign, Inbox } from 'lucide-react';
import { Lead, WindowId } from '../../types';

interface ContactAppProps {
    onOpenWindow: (id: WindowId) => void;
}

export const ContactApp: React.FC<ContactAppProps> = ({ onOpenWindow }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    brief: ''
  });
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only digits and enforce a max length of 10
    if (/^\d*$/.test(value) && value.length <= 10) {
      setFormData(prev => ({ ...prev, whatsapp: value }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.brief) return;

    setStatus('SENDING');

    setTimeout(() => {
        try {
            const existingLeads: Lead[] = JSON.parse(localStorage.getItem('puli_os_leads') || '[]');
            const newLead: Lead = {
                ...formData,
                timestamp: new Date().toISOString()
            };
            existingLeads.push(newLead);
            localStorage.setItem('puli_os_leads', JSON.stringify(existingLeads));
            
            setStatus('SUCCESS');
            setTimeout(() => {
                setFormData({ name: '', email: '', whatsapp: '', brief: '' });
                setStatus('IDLE');
            }, 3000);

        } catch (error) {
            console.error("Failed to save lead to localStorage", error);
            setStatus('ERROR');
        }
    }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] font-sans text-sm relative">
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-1 bg-[#c0c0c0] border-b border-white shadow-[0_1px_0_#808080] select-none">
        <div className="relative">
            <span className="underline cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>F</span>ile
            {menuOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black p-1 shadow-lg z-10">
                    <button 
                        onClick={() => { onOpenWindow(WindowId.INBOX); setMenuOpen(false); }}
                        className="w-full text-left px-2 py-1 hover:bg-black hover:text-white flex items-center gap-2"
                    >
                       <Inbox size={14}/> Open Inbox
                    </button>
                </div>
            )}
        </div>
        <span className="underline cursor-pointer opacity-50">E</span>dit
        <span className="underline cursor-pointer opacity-50">V</span>iew
        <span className="underline cursor-pointer opacity-50">H</span>elp
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 p-2 border-b border-[#808080] shadow-[0_1px_0_white]">
        <button 
          onClick={handleSubmit}
          disabled={status === 'SENDING' || status === 'SUCCESS'}
          className="flex flex-col items-center justify-center w-16 h-14 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white disabled:opacity-50"
        >
          <Send size={24} className={status === 'SUCCESS' ? 'text-green-600' : 'text-black'} />
          <span className="text-xs mt-1">Send</span>
        </button>
      </div>

      {/* Form Area */}
      <div className="flex-grow p-4 bg-white m-2 border-2 border-[#808080] shadow-[inset_2px_2px_0_black] overflow-hidden">
        {status === 'SUCCESS' ? (
            <div className="h-full flex flex-col items-center justify-center text-green-700 animate-in fade-in zoom-in duration-300">
                <CheckCircle size={48} className="mb-4" />
                <h3 className="text-xl font-bold font-mono">ENQUIRY SAVED!</h3>
                <p className="text-gray-500 mt-2 text-center max-w-xs">Your enquiry has been saved to the secure local Inbox.</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 h-full">
                {/* To Field (Fixed) */}
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 shrink-0">
                    <label className="text-gray-500 font-bold text-right">To:</label>
                    <div className="flex items-center gap-2 bg-gray-100 p-1 border border-gray-300">
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">P</div>
                        <span className="font-mono">itspuli@proton.me (via Inbox)</span>
                    </div>
                </div>

                {/* Name Field */}
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 shrink-0">
                    <label className="text-gray-500 font-bold text-right flex items-center justify-end gap-1">
                        <User size={12} /> Name<span className="text-red-500">*</span>:
                    </label>
                    <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full p-1 border border-gray-400 focus:outline-none focus:border-black font-mono bg-gray-200 text-black placeholder-gray-600"
                    />
                </div>

                {/* Email Field */}
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 shrink-0">
                    <label className="text-gray-500 font-bold text-right flex items-center justify-end gap-1">
                        <AtSign size={12} /> Email<span className="text-red-500">*</span>:
                    </label>
                    <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full p-1 border border-gray-400 focus:outline-none focus:border-black font-mono bg-gray-200 text-black placeholder-gray-600"
                    />
                </div>

                {/* WhatsApp Field */}
                <div className="grid grid-cols-[80px_1fr] items-center gap-2 shrink-0">
                    <label className="text-gray-500 font-bold text-right flex items-center justify-end gap-1">
                        <Phone size={12} /> WhatsApp:
                    </label>
                    <input 
                        type="tel" 
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleWhatsappChange}
                        placeholder="10-digit number"
                        maxLength={10}
                        pattern="\d{10}"
                        className="w-full p-1 border border-gray-400 focus:outline-none focus:border-black font-mono bg-gray-200 text-black placeholder-gray-600"
                    />
                </div>

                <div className="h-[1px] bg-gray-300 w-full my-1 shrink-0"></div>

                {/* Brief Textarea */}
                <div className="grid grid-cols-[80px_1fr] items-start gap-2 flex-grow min-h-0">
                     <label className="text-gray-500 font-bold text-right pt-1">Brief<span className="text-red-500">*</span>:</label>
                     <textarea 
                        required
                        name="brief"
                        value={formData.brief}
                        onChange={handleChange}
                        className="h-full w-full p-2 border border-gray-400 resize-none font-mono focus:outline-none focus:border-black bg-gray-200 text-black placeholder-gray-600"
                        placeholder="Enter your project brief or message here..."
                    ></textarea>
                </div>

                <div className="bg-yellow-100 border border-yellow-400 p-2 text-xs flex gap-2 items-start text-yellow-800 shrink-0">
                    <AlertTriangle size={14} className="mt-0.5 shrink-0"/>
                    <p>This form saves enquiries to a local, password-protected inbox instead of sending an email.</p>
                </div>
            </form>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-2 py-1 bg-[#c0c0c0] border-t border-white text-xs text-gray-600 flex justify-between">
        <span>{status === 'SENDING' ? 'Saving to local inbox...' : 'Ready'}</span>
        {status === 'SENDING' && <Loader2 size={12} className="animate-spin" />}
      </div>
    </div>
  );
};