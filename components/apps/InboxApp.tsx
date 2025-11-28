import React, { useState, useEffect } from 'react';
import { Lead } from '../../types';
import { Lock, Unlock, ShieldAlert, Trash2, LogOut, Download, RefreshCw } from 'lucide-react';

const CORRECT_PASSWORD = '1234567890';

export const InboxApp: React.FC = () => {
    const [isLocked, setIsLocked] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [leads, setLeads] = useState<Lead[]>([]);

    const loadLeads = () => {
        try {
            const storedLeads = JSON.parse(localStorage.getItem('puli_os_leads') || '[]');
            // Sort by most recent first
            storedLeads.sort((a: Lead, b: Lead) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            setLeads(storedLeads);
        } catch (e) {
            console.error("Could not parse leads from localStorage", e);
            setLeads([]);
        }
    };

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            loadLeads();
            setIsLocked(false);
            setError('');
            setPassword('');
        } else {
            setError('ACCESS DENIED: Incorrect password.');
            setPassword('');
        }
    };

    const handleLock = () => {
        setIsLocked(true);
        setLeads([]);
    };
    
    const handleClearLeads = () => {
        if(window.confirm("Are you sure you want to permanently delete all leads? This action cannot be undone.")){
            localStorage.removeItem('puli_os_leads');
            setLeads([]);
        }
    }
    
    const handleDownloadCSV = () => {
        if (leads.length === 0) {
            alert("Inbox is empty. Nothing to download.");
            return;
        }

        const headers = ["Timestamp", "Name", "Email", "WhatsApp", "Brief"];
        const csvRows = [headers.join(",")];

        const escapeCSV = (str: string) => `"${str.replace(/"/g, '""')}"`;

        for (const lead of leads) {
            const values = [
                escapeCSV(new Date(lead.timestamp).toLocaleString()),
                escapeCSV(lead.name),
                escapeCSV(lead.email),
                escapeCSV(lead.whatsapp),
                escapeCSV(lead.brief)
            ];
            csvRows.push(values.join(","));
        }

        const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `PulidevanOS_Leads_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };


    // Refresh leads when the component becomes visible
    useEffect(() => {
      if (!isLocked) {
        loadLeads();
      }
    }, [isLocked]);


    if (isLocked) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-black text-green-400 font-mono p-4 text-center">
                <ShieldAlert size={48} className="mb-4 text-red-500 animate-pulse" />
                <h2 className="text-xl font-bold uppercase mb-2">Secure Inbox Locked</h2>
                <p className="text-xs text-gray-400 mb-6 max-w-xs">This area contains sensitive lead information and requires authentication.</p>
                <form onSubmit={handleUnlock} className="flex flex-col gap-4 w-full max-w-sm">
                    <div className="flex flex-col items-start">
                        <label htmlFor="password-input" className="text-xs mb-1">Enter Password:</label>
                        <input
                            id="password-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-200 border-2 border-black text-black p-2 focus:outline-none focus:border-blue-500 placeholder-gray-600"
                            placeholder="**********"
                            autoFocus
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs animate-pulse">{error}</p>}
                    <button type="submit" className="flex items-center justify-center gap-2 bg-green-700 text-black font-bold p-2 hover:bg-green-400 transition-colors border-2 border-green-400">
                        <Unlock size={16} /> AUTHENTICATE
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-200 text-black">
            {/* Toolbar */}
            <div className="flex justify-between items-center p-2 bg-gray-300 border-b-2 border-black shrink-0 flex-wrap gap-2">
                <h3 className="font-bold text-sm">Leads Inbox ({leads.length})</h3>
                <div className="flex gap-2">
                     <button onClick={loadLeads} className="flex items-center gap-1 text-xs px-2 py-1 bg-blue-500 text-white border border-black hover:bg-blue-700">
                        <RefreshCw size={12} /> Refresh
                    </button>
                     <button onClick={handleDownloadCSV} className="flex items-center gap-1 text-xs px-2 py-1 bg-green-500 text-white border border-black hover:bg-green-700">
                        <Download size={12} /> Download CSV
                    </button>
                    <button onClick={handleClearLeads} className="flex items-center gap-1 text-xs px-2 py-1 bg-red-500 text-white border border-black hover:bg-red-700">
                        <Trash2 size={12} /> Clear All
                    </button>
                    <button onClick={handleLock} className="flex items-center gap-1 text-xs px-2 py-1 bg-black text-white border border-white hover:bg-gray-700">
                        <Lock size={12} /> Lock Inbox
                    </button>
                </div>
            </div>
            
            {/* Leads Table */}
            <div className="flex-grow overflow-auto">
                 {leads.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 font-mono">
                        The inbox is currently empty.
                    </div>
                 ) : (
                    <table className="w-full text-xs font-mono border-collapse">
                        <thead className="sticky top-0 bg-black text-white z-10">
                            <tr>
                                <th className="p-2 border border-gray-500 text-left">Timestamp</th>
                                <th className="p-2 border border-gray-500 text-left">Name</th>
                                <th className="p-2 border border-gray-500 text-left">Email</th>
                                <th className="p-2 border border-gray-500 text-left">WhatsApp</th>
                                <th className="p-2 border border-gray-500 text-left">Brief</th>
                            </tr>
                        </thead>
                        <tbody className="text-black">
                            {leads.map((lead, index) => (
                                <tr key={index} className="bg-white even:bg-gray-100 hover:bg-yellow-100">
                                    <td className="p-2 border border-gray-300 align-top whitespace-nowrap">
                                        {new Date(lead.timestamp).toLocaleString()}
                                    </td>
                                    <td className="p-2 border border-gray-300 align-top font-bold">{lead.name}</td>
                                    <td className="p-2 border border-gray-300 align-top break-all">{lead.email}</td>
                                    <td className="p-2 border border-gray-300 align-top">
                                        {lead.whatsapp ? (
                                            <a href={`https://wa.me/${lead.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {lead.whatsapp}
                                            </a>
                                        ) : '-'}
                                    </td>
                                    <td className="p-2 border border-gray-300 align-top whitespace-pre-wrap break-words min-w-[200px]">{lead.brief}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 )}
            </div>
        </div>
    );
};